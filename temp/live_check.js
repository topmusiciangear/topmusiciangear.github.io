const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
(async () => {
  const r = await fetch('https://topmusiciangear.com/js/shop-buttons.js?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
  const t = await r.text();
  console.log('status ' + r.status + ' bytes ' + t.length);
  const block = id => { const i = t.indexOf('\n  ' + id + ': {'); if (i < 0) return '(not found)'; return t.slice(i, t.indexOf('\n  },', i) + 4); };
  [6, 126, 309, 310, 311, 312, 313, 317, 318, 319].forEach(id => { console.log('--- id ' + id + '\n' + block(id)); });
})();
