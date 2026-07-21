#!/usr/bin/env node
/**
 * Capture feature section images from the app-vision-3 prototype.
 * Uses CDP clip regions to crop to the most content-rich area of each page,
 * so images remain legible when displayed at ~560px on the marketing site.
 *
 * Usage: node scripts/screenshot-features.mjs [base-url]
 *   default base-url: http://localhost:5175
 *
 * Prerequisites: npm run build in app-vision-3, then serve with:
 *   npx serve /path/to/app-vision-3/dist --single -l 5175
 */

import { execFile } from 'node:child_process'
import { writeFile, mkdir } from 'node:fs/promises'
import http from 'node:http'

const BASE = process.argv[2] || 'http://localhost:5175'
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const OUT = new URL('../public/images/', import.meta.url).pathname

const VP_W = 1440
const VP_H = 900

// Each shot defines a route, output name, wait time, and clip region (1x coords).
// Clip regions focus on the content-rich center so text is readable at display size.
const SHOTS = [
  {
    name: 'feature-timesheet.png',
    route: '/web/filled',
    wait: 6000, // Framer Motion pie chart needs time to animate in
    // Full content area: left panel entries + pie chart
    clip: { x: 0, y: 55, width: 1300, height: 680, scale: 1 },
  },
  {
    name: 'feature-channels.png',
    route: '/channels/slack-thread',
    wait: 5000,
    // Slack sidebar + thread with embedded pie card
    clip: { x: 0, y: 0, width: 1300, height: 720, scale: 1 },
  },
  {
    name: 'feature-proxy.png',
    route: '/proxy/single-filled',
    wait: 6000,
    // Proxy person pills + pie chart area
    clip: { x: 0, y: 55, width: 1300, height: 680, scale: 1 },
  },
  {
    name: 'feature-catchup.png',
    route: '/catchup/progress',
    wait: 5000,
    // Catchup progress view showing multi-week filing
    clip: { x: 0, y: 55, width: 1300, height: 680, scale: 1 },
  },
  {
    name: 'feature-resource.png',
    route: '/admin/dashboard',
    wait: 5000,
    // Admin dashboard with compliance table
    clip: { x: 0, y: 55, width: 1300, height: 680, scale: 1 },
  },
]

// Ramble is a mobile screen — capture at mobile viewport
const MOBILE_SHOTS = [
  {
    name: 'feature-ramble.png',
    route: '/mobile/voice',
    wait: 4000,
    viewport: { width: 390, height: 844 },
    // No clip — capture full mobile screen
  },
]

function launchChrome(port) {
  return new Promise((resolve, reject) => {
    const proc = execFile(CHROME, [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      `--window-size=${VP_W},${VP_H}`,
      '--disable-gpu',
      '--no-sandbox',
      '--disable-extensions',
      '--hide-scrollbars',
      '--force-color-profile=srgb',
      'about:blank',
    ], { timeout: 180000 })
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

async function captureShot(client, shot, isMobile = false) {
  const url = `${BASE}${shot.route}`
  console.log(`  Navigating to ${url} ...`)

  // Set viewport
  const vp = shot.viewport || { width: VP_W, height: VP_H }
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 2,
    mobile: isMobile,
  })

  await client.send('Page.navigate', { url })
  await new Promise(r => setTimeout(r, 1000))

  const evalResult = await client.send('Runtime.evaluate', {
    expression: 'document.body.innerHTML.length',
    returnByValue: true,
  })
  console.log(`  DOM content length: ${evalResult.result.value}`)

  console.log(`  Waiting ${shot.wait}ms for animations...`)
  await new Promise(r => setTimeout(r, shot.wait))

  const captureParams = { format: 'png' }
  if (shot.clip) {
    captureParams.clip = shot.clip
  }

  console.log(`  Capturing ${shot.name}${shot.clip ? ' (clipped)' : ' (full)'}...`)
  const { data } = await client.send('Page.captureScreenshot', captureParams)

  const buf = Buffer.from(data, 'base64')
  const outPath = `${OUT}${shot.name}`
  await writeFile(outPath, buf)
  console.log(`  Saved ${outPath} (${buf.length} bytes)`)
}

async function main() {
  await mkdir(OUT, { recursive: true })

  console.log('Launching Chrome...')
  const port = 9223
  const chromeProc = await launchChrome(port)

  try {
    const targets = await httpGet(`http://127.0.0.1:${port}/json`)
    const pageTarget = targets.find(t => t.type === 'page')
    if (!pageTarget) throw new Error('No page target found')

    const client = await cdp(pageTarget.webSocketDebuggerUrl)
    await client.send('Page.enable')
    await client.send('Runtime.enable')

    // Desktop shots with clip regions
    for (const shot of SHOTS) {
      await captureShot(client, shot, false)
    }

    // Mobile shots
    for (const shot of MOBILE_SHOTS) {
      await captureShot(client, shot, true)
    }

    client.close()
  } finally {
    chromeProc.kill()
  }

  console.log('Done! Feature images captured.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
