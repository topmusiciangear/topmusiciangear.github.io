const u = 'https://www.amazon.co.uk/dp/B0CP6C4J5W';
(async () => {
  const t = await (await fetch(u)).text();
  const m = t.match(/<title>([^<]+)<\/title>/);
  console.log('TITLE:', m && m[1]);
  console.log('has Plus:', /plus/i.test(m && m[1] ? m[1] : ''));
})();
