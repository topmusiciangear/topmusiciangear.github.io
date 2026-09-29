const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';
const tests = [
  ['plain fetch /dp/', 'https://www.amazon.com/dp/B0002H0SYE'],
  ['plain fetch w/ UA', 'https://www.amazon.com/dp/B0002H0SYE'],
  ['?tag= affiliate', 'https://www.amazon.com/dp/B0002H0SYE?tag=topmusicg-20'],
  ['HEAD only', null]
];
(async () => {
  for (const [label, url] of tests) {
    try {
      const opts = { method: label === 'HEAD only' ? 'HEAD' : 'GET', headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml', 'Accept-Language': 'en-US,en;q=0.9' }, redirect: 'follow' };
      const t0 = Date.now();
      const r = await fetch(url, opts);
      const body = label === 'HEAD only' ? '' : await r.text();
      const title = (body.match(/<title[^>]*>([\s\S]{0,200}?)<\/title>/i) || [])[1] || '';
      console.log(label.padEnd(20) + ' -> ' + r.status + ' | ' + (Date.now() - t0) + 'ms | len=' + body.length);
      console.log('   final URL: ' + r.url);
      if (title) console.log('   title: ' + title.replace(/\s+/g, ' ').trim().slice(0, 120));
      if (/captcha|automated access|enter the characters|Sorry, we just need/i.test(body)) console.log('   >>> BLOCKED / CAPTCHA');
    } catch (e) {
      console.log(label.padEnd(20) + ' -> ERROR ' + e.message);
    }
  }
})();
