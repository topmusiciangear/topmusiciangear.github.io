const fs = require('fs');
const path = require('path');
const files = [];
fs.readdirSync('guides').filter(f => f.endsWith('.html')).forEach(f => files.push('guides/' + f));
const rows = [];
files.forEach(f => {
  const h = fs.readFileSync(f, 'utf8');
  const tm = h.match(/<title>([\s\S]*?)<\/title>/);
  const t = tm ? tm[1].trim() : 'SIN TITULO';
  const dm = h.match(/<meta name="description" content="([\s\S]*?)">/);
  const d = dm ? dm[1] : 'SIN META';
  const flags = [];
  if (t.length > 60) flags.push('T-largo(' + t.length + ')');
  if (!/\| TopMusicianGear/.test(t)) flags.push('T-sin-marca');
  if (!/2026/.test(t)) flags.push('T-sin-año');
  if (d === 'SIN META') flags.push('SIN META');
  else {
    if (d.length > 155) flags.push('D-larga(' + d.length + ')');
    if (d.length < 100) flags.push('D-corta(' + d.length + ')');
    if (!/2026/.test(d)) flags.push('D-sin-año');
  }
  rows.push({ f: f.replace('guides/', ''), t: t.length, d: d === 'SIN META' ? 0 : d.length, flags });
});
// duplicados
const seenT = {}, seenD = {};
rows.forEach(r => {
  const h = fs.readFileSync('guides/' + r.f, 'utf8');
  const tm = h.match(/<title>([\s\S]*?)<\/title>/);
  const dm = h.match(/<meta name="description" content="([\s\S]*?)">/);
  const t = tm ? tm[1].trim() : '', d = dm ? dm[1] : '';
  seenT[t] = (seenT[t] || 0) + 1;
  seenD[d] = (seenD[d] || 0) + 1;
});
const dupT = Object.entries(seenT).filter(([k, v]) => v > 1);
const dupD = Object.entries(seenD).filter(([k, v]) => v > 1 && k !== 'SIN META');
console.log('paginas: ' + rows.length);
console.log('T>60: ' + rows.filter(r => r.t > 60).length + ' | D>155: ' + rows.filter(r => r.d > 155).length +
  ' | D<100: ' + rows.filter(r => r.d > 0 && r.d < 100).length + ' | SIN META: ' + rows.filter(r => r.d === 0).length);
console.log('T sin año: ' + rows.filter(r => /T-sin-año/.test(r.flags.join())).length +
  ' | D sin año: ' + rows.filter(r => /D-sin-año/.test(r.flags.join())).length);
console.log('titulos duplicados: ' + dupT.length);
dupT.slice(0, 10).forEach(([k, v]) => console.log('  ' + v + 'x ' + k.slice(0, 80)));
console.log('metas duplicadas: ' + dupD.length);
dupD.slice(0, 10).forEach(([k, v]) => console.log('  ' + v + 'x ' + k.slice(0, 80)));
fs.writeFileSync('temp/serp_full.json', JSON.stringify(rows, null, 1));
console.log('\n== TOP 40 peores (D larga o T largo) ==');
rows.filter(r => r.d > 155 || r.t > 60).slice(0, 40).forEach(r => console.log(' ' + r.f + ' T=' + r.t + ' D=' + r.d));
