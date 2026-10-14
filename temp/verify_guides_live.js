const https = require('https');
https.get('https://topmusiciangear.com/data/guides.json?v=' + Date.now(), (res) => {
  let d = ''; res.on('data', c => d += c); res.on('end', () => {
    try {
      const g = JSON.parse(d);
      let nulls = 0, sections = 0;
      g.forEach(x => { (x.sections || []).forEach(s => { if (!s) nulls++; else sections++; }); });
      console.log('guias:', g.length);
      console.log('secciones reales:', sections);
      console.log('secciones null:', nulls);
      const sc = g.find(x => x.id === 'stream-controllers');
      console.log('FLOW8 en vivo:', sc && sc.sections.some(s => s && s.products && s.products.includes(671)));
      const st = g.find(x => x.id === 'starter-studio');
      const s0 = st && st.sections[0];
      console.log('starter-studio sec0 heading:', s0 ? String(s0.heading).slice(0, 50) : 'NULL');
    } catch (e) { console.log('Parse error:', e.message, '| len:', d.length); }
  });
}).on('error', e => console.log('Error:', e.message));