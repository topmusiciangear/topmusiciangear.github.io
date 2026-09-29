const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
(async () => {
  await new Promise(r => setTimeout(r, 75000));
  const r = await fetch('https://topmusiciangear.com/js/shop-buttons.js?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
  const t = await r.text();
  const block = id => { const i = t.indexOf('\n  ' + id + ': {'); return t.slice(i, t.indexOf('\n  },', i) + 4); };
  console.log('shop-buttons.js status ' + r.status + ' bytes ' + t.length);
  console.log(block(311));
  console.log(block(313));
})();
