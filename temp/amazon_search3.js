// Busqueda Amazon con diagnostico: distingue "sin resultados" de "bloqueado".
// Uso: node temp/amazon_search3.js temp/amazon_queries4.json temp/amazon_search4.json
const fs = require('fs');
const { chromium } = require('playwright');

const queries = JSON.parse(fs.readFileSync(process.argv[2] || 'temp/amazon_queries4.json', 'utf8'));
const OUT = process.argv[3] || 'temp/amazon_search4.json';
const results = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};

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
  for (const { id, q } of queries) {
    if (results[id] && results[id].items && results[id].items.length) { console.log(id + ' cached'); continue; }
    const page = await ctx.newPage();
    try {
      await page.goto('https://www.amazon.com/s?k=' + encodeURIComponent(q), { waitUntil: 'load', timeout: 45000 });
      await page.waitForSelector('[data-component-type="s-search-result"]', { timeout: 12000 }).catch(() => {});
      await page.waitForTimeout(1000);
      const info = await page.evaluate(() => {
        const cards = [...document.querySelectorAll('[data-component-type="s-search-result"]')];
        const body = document.body ? document.body.innerText : '';
        const items = cards.slice(0, 8).map(c => {
          const t = c.querySelector('[data-cy="title-recipe"]') || c.querySelector('h2');
          const img = c.querySelector('img.s-image');
          const price = c.querySelector('.a-price .a-offscreen');
          return {
            asin: c.getAttribute('data-asin') || '',
            title: (t ? t.innerText : '').trim().replace(/\s+/g, ' ').slice(0, 150),
            alt: img ? (img.getAttribute('alt') || '').slice(0, 150) : '',
            price: price ? price.textContent.trim() : '',
          };
        }).filter(x => x.asin && (x.title || x.alt));
        return {
          url: location.href,
          title: document.title,
          captcha: /Robot Check|Enter the characters you see below|api-services-support@amazon/i.test(body),
          noResults: /No results for|did not match any products|Try checking your spelling/i.test(body),
          items,
        };
      });
      results[id] = { q, url: info.url, captcha: info.captcha, noResults: info.noResults, items: info.items };
      console.log('\n' + id + '  "' + q + '"  ->  ' + info.items.length + (info.captcha ? '  [BLOQUEADO]' : '') + (info.noResults ? '  [SIN RESULTADOS]' : '') + '  ' + info.url.slice(0, 60));
      info.items.forEach(it => console.log('   ' + it.asin + '  ' + (it.price || '').padEnd(10) + '  ' + (it.title || it.alt).slice(0, 105)));
    } catch (e) {
      results[id] = { q, error: String(e).slice(0, 90) };
      console.log(id + ' ERROR ' + String(e).slice(0, 90));
    } finally {
      await page.close();
      fs.writeFileSync(OUT, JSON.stringify(results, null, 1));
    }
  }
  await browser.close();
})();
