const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const BASE = 'https://topmusiciangear.com';
const block = (t, id) => { const m = new RegExp('(?:^|\\n)\\s*' + id + ': \\{').exec(t); if (!m) return id + ': NOT FOUND'; let d = 0, i = m.index; for (; i < t.length; i++) { if (t[i] === '{') d++; else if (t[i] === '}') { d--; if (!d) { i++; break; } } } while (i < t.length && t[i] !== ',') i++; return t.slice(m.index + 1, i + 1); };
(async () => {
  await new Promise(r => setTimeout(r, 75000));
  const r = await fetch(BASE + '/js/shop-buttons.js?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
  const t = await r.text();
  console.log('shop-buttons.js status ' + r.status + ' bytes ' + t.length);
  for (const id of ['50', '226', '276']) console.log(block(t, id));
  for (const g of ['best-mics-for-singing', 'best-microphones-for-singing', 'budget-mics']) {
    for (const lang of ['', '_es']) {
      let p;
      try { p = await fetch(BASE + '/guides/' + g + lang + '.html?v=' + Date.now(), { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } }); } catch (e) { continue; }
      if (p.status !== 200) { console.log('--- ' + p.status + ' ' + g + lang); continue; }
      const h = await p.text();
      const c = s => (h.match(s) || []).length;
      console.log('--- ' + p.status + ' ' + g + lang + ': map?' + /shop-buttons\.js\?v=d11ea289/.test(h) + ' | old103.50=' + c(/103\.50/g) + ' | old161.50=' + c(/161\.50/g) + ' | old74.79=' + c(/74\.79/g) + ' | 105.00=' + c(/105\.00/g) + ' | 163.50=' + c(/163\.50/g) + ' | 98.00=' + c(/98\.00/g));
    }
  }
})();
