#!/usr/bin/env node
/**
 * Capture hero slider images from the app-vision-3 prototype.
 * Usage: node scripts/screenshot-hero.mjs [base-url]
 *   default base-url: http://localhost:5175
 */

import { execFile } from 'node:child_process'
import { writeFile, mkdir } from 'node:fs/promises'
import http from 'node:http'

const BASE = process.argv[2] || 'http://localhost:5175'
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const OUT = new URL('../public/images/', import.meta.url).pathname

const WIDTH = 1440
const HEIGHT = 900

const SHOTS = [
  {
    name: 'hero-slack.png',
    route: '/channels/slack-thread',
    wait: 5000,
  },
  {
    name: 'hero-review.png',
    route: '/web/filled',
    wait: 5000,
  },
  {
    name: 'hero-filed.png',
    route: '/web/filed',
    wait: 5000,
  },
]

function launchChrome(port) {
  return new Promise((resolve, reject) => {
    const proc = execFile(CHROME, [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      `--window-size=${WIDTH},${HEIGHT}`,
      '--disable-gpu',
      '--no-sandbox',
      '--disable-extensions',
      '--hide-scrollbars',
      '--force-color-profile=srgb',
      'about:blank',
    ], { timeout: 120000 })
    proc.on('error', reject)
    setTimeout(() => resolve(proc), 2500)
  })
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const tryConnect = (attempt = 0) => {
      http.get(url, (res) => {
        let data = ''
        res.on('data', (d) => data += d)
        res.on('end', () => resolve(JSON.parse(data)))
      }).on('error', () => {
        if (attempt < 15) setTimeout(() => tryConnect(attempt + 1), 500)
        else reject(new Error(`Cannot connect to ${url}`))
      })
    }
    tryConnect()
  })
}

async function cdp(wsUrl) {
  const { WebSocket } = await import('ws')
  const ws = new WebSocket(wsUrl, { perMessageDeflate: false })
  await new Promise((resolve, reject) => {
    ws.on('open', resolve)
    ws.on('error', reject)
  })

  let id = 0
  const pending = new Map()

  ws.on('message', (raw) => {
    const msg = JSON.parse(raw.toString())
    if (msg.id !== undefined && pending.has(msg.id)) {
      pending.get(msg.id)(msg)
      pending.delete(msg.id)
    }
  })

  async function send(method, params = {}) {
    const myId = ++id
    return new Promise((resolve, reject) => {
      pending.set(myId, (msg) => {
        if (msg.error) reject(new Error(`${method}: ${JSON.stringify(msg.error)}`))
        else resolve(msg.result)
      })
      ws.send(JSON.stringify({ id: myId, method, params }))
    })
  }

  return { send, close: () => ws.close() }
}

async function main() {
  await mkdir(OUT, { recursive: true })

  console.log('Launching Chrome...')
  const port = 9222
  const chromeProc = await launchChrome(port)

  try {
    const targets = await httpGet(`http://127.0.0.1:${port}/json`)
    const pageTarget = targets.find(t => t.type === 'page')
    if (!pageTarget) throw new Error('No page target found')

    const client = await cdp(pageTarget.webSocketDebuggerUrl)

    await client.send('Page.enable')
    await client.send('Runtime.enable')
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: 2,
      mobile: false,
    })

    for (const shot of SHOTS) {
      const url = `${BASE}${shot.route}`
      console.log(`  Navigating to ${url} ...`)

      // Navigate and wait for network idle
      await client.send('Page.navigate', { url })

      // Wait for DOM content loaded
      await new Promise(r => setTimeout(r, 1000))

      // Check if page rendered by evaluating DOM
      const evalResult = await client.send('Runtime.evaluate', {
        expression: 'document.body.innerHTML.length',
        returnByValue: true,
      })
      console.log(`  DOM content length: ${evalResult.result.value}`)

      // Wait for animations
      console.log(`  Waiting ${shot.wait}ms for animations...`)
      await new Promise(r => setTimeout(r, shot.wait))

      console.log(`  Capturing ${shot.name} (full page, no clip)...`)
      const { data } = await client.send('Page.captureScreenshot', { format: 'png' })

      const outPath = `${OUT}${shot.name}`
      await writeFile(outPath, Buffer.from(data, 'base64'))
      console.log(`  Saved ${outPath} (${Buffer.from(data, 'base64').length} bytes)`)
    }

    client.close()
  } finally {
    chromeProc.kill()
  }

  console.log('Done! Hero images captured.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
