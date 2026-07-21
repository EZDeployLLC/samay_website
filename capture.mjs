import { chromium } from 'playwright';
const out = './public/images';
const browser = await chromium.launch();
const base = 'https://samay-round5-mvp.netlify.app';

async function snap(path, file) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${base}${path}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${out}/${file}`, type: 'png' });
  await page.close();
  console.log('OK:', file);
}

await snap('/web/filled', 'feature-timesheet.png');
await snap('/proxy/single-filled', 'feature-proxy.png');
await snap('/channels/slack-connected', 'feature-channels.png');
await snap('/web/filed', 'hero-app.png');
await browser.close();
console.log('All done');
