// Abre paginas de guia en Chrome headless y comprueba los enlaces de Amazon reales
// (tras ejecutarse shopButtonsTest y el geo-swap): ninguno debe ser la portada ni "undefined".
// Uso: node temp/check_live_rows.js guides/adam-vs-genelec_es.html guides/best-5-string-basses.html
const { chromium } = require('playwright');

const pages = process.argv.slice(2);
(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const ctx = await browser.newContext({ locale: 'es-ES', viewport: { width: 1280, height: 900 } });
  let bad = 0;
  for (const f of pages) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(String(e).slice(0, 120)));
    await page.goto('file:///' + require('path').resolve(f).replace(/\\/g, '/'), { waitUntil: 'load' });
    await page.waitForTimeout(1200);
    const data = await page.evaluate(() => {
      const out = { amazon: 0, dp: 0, home: 0, undef: 0, urls: [] };
      document.querySelectorAll('a[href]').forEach(a => {
        const h = a.getAttribute('href') || '';
        if (h.indexOf('amazon.') < 0) return;
        out.amazon++;
        if (h === 'undefined' || h.indexOf('undefined') >= 0) out.undef++;
        if (/amazon\.[a-z.]+\/?(index\.html)?(\?[^/]*)?$/.test(h)) out.home++;
        if (/\/dp\/[A-Z0-9]{10}/.test(h)) out.dp++;
        if (out.urls.length < 6) out.urls.push(h.slice(0, 90));
      });
      return out;
    });
    const ok = data.home === 0 && data.undef === 0 && errors.length === 0;
    if (!ok) bad++;
    console.log((ok ? 'OK   ' : 'FALLO') + '  ' + f + '  amazon=' + data.amazon + ' dp=' + data.dp + ' home=' + data.home + ' undef=' + data.undef + ' erroresJS=' + errors.length);
    data.urls.forEach(u => console.log('        ' + u));
    errors.slice(0, 3).forEach(e => console.log('   JS: ' + e));
    await page.close();
  }
  await browser.close();
  console.log(bad ? '\n' + bad + ' pagina(s) con problemas' : '\nTodas las paginas OK');
})();
