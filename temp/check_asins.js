// Verifica ASINs concretos contra Amazon (fusiona el resultado en temp/amazon_live.json).
// Uso: node temp/check_asins.js B0002E1P2G,B085WFXGCT,...
const fs = require('fs');
const { chromium } = require('playwright');

const list = (process.argv.slice(2).join(' ') || '').split(/[,\s]+/).filter(Boolean);
const OUT = 'temp/amazon_live.json';
const results = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};

const classify = (finalUrl, title, bodyText, productTitle) => {
  if (/\/checkpoint\/continue|ap\/signin|\/errors\/validateCaptcha/.test(finalUrl)) return 'checkpoint';
  if (/Robot Check|Enter the characters you see below/i.test(bodyText)) return 'captcha';
  if (/Page Not Found|not a functioning page/i.test(bodyText) || /Page Not Found/i.test(title)) return 'notfound';
  if (productTitle) return 'product';
  if (/^https?:\/\/[^/]*amazon\.[a-z.]+\/?(index\.html)?(\?.*)?$/i.test(finalUrl)) return 'home';
  if (/\/s\?|\/s\//.test(finalUrl)) return 'searchpage';
  return 'unknown';
};

async function read(page) {
  return page.evaluate(() => {
    const pt = document.querySelector('#productTitle');
    return {
      url: location.href,
      title: document.title,
      productTitle: pt ? pt.textContent.trim().replace(/\s+/g, ' ') : '',
      body: (document.body ? document.body.innerText : '').slice(0, 4000),
    };
  });
}

async function check(ctx, asin) {
  const page = await ctx.newPage();
  let status = 0;
  page.on('response', r => { if (r.request().isNavigationRequest() && r.status() >= 400) status = r.status(); });
  try {
    await page.goto('https://www.amazon.com/dp/' + asin, { waitUntil: 'load', timeout: 45000 });
    await page.waitForSelector('#productTitle', { timeout: 6000 }).catch(() => {});
    let info = await read(page);
    let kind = classify(info.url, info.title, info.body, info.productTitle);
    if (kind === 'unknown' || kind === 'checkpoint') {
      await page.waitForTimeout(2500);
      await page.reload({ waitUntil: 'load', timeout: 45000 }).catch(() => {});
      await page.waitForSelector('#productTitle', { timeout: 8000 }).catch(() => {});
      info = await read(page);
      kind = classify(info.url, info.title, info.body, info.productTitle);
    }
    return { asin, kind, status, finalUrl: info.url, pageTitle: info.title.slice(0, 180), productTitle: info.productTitle.slice(0, 140) };
  } catch (e) {
    return { asin, kind: 'error', status, error: String(e).slice(0, 100) };
  } finally {
    await page.close();
  }
}

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--disable-blink-features=AutomationControlled'],
  });
  const ctx = await browser.newContext({
    locale: 'en-US',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
  });
  for (const asin of list) {
    const r = await check(ctx, asin);
    r.checkedNow = true;
    results[asin] = r;
    console.log(asin + '  ' + r.kind.padEnd(10) + (r.productTitle || r.pageTitle || r.error || ''));
    fs.writeFileSync(OUT, JSON.stringify(results, null, 1));
  }
  await browser.close();
})();
