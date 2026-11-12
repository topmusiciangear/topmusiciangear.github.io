// dump_unknown_endings.js — campos completos de las parejas cuyo final falta
const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const byId = {}; g.forEach(x => { byId[x.id] = x; });
const P = [];
const out = t => P.push(t);
const sect = (id, i) => byId[id].sections[i] || {};

out('=== best-bass-amps sections[2].content (EN) ===\n' + sect('best-bass-amps', 2).content);
const fb = sect('fender-bass-guide', 4);
out('=== fender-bass-guide sections[4] ===\nEN: ' + fb.heading + '\nES: ' + fb.heading_es);
out('=== pro-guitars intro (EN) ===\n' + byId['pro-guitars'].intro);
[1, 3, 4].forEach(i => out('=== budget-bass-like-expensive sections[' + i + '].content_es ===\n' + sect('budget-bass-like-expensive', i).content_es));
out('=== vocal-plugins faq[4] ===\n' + JSON.stringify((byId['vocal-plugins'].faq || [])[4], null, 1));
out('=== nx912-vs-pxm12mp intro_es ===\n' + byId['nx912-vs-pxm12mp'].intro_es);
out('=== mics-for-creators sections[7].content (EN) ===\n' + sect('mics-for-creators', 7).content);
out('=== usb-mics / budget-usb-mics: todos los campos con "workhorse"/"todoterreno" (contexto completo) ===');
['usb-mics', 'budget-usb-mics'].forEach(id => {
  const x = byId[id]; if (!x) return;
  const dump = (o, ruta) => {
    if (typeof o === 'string') {
      if (/workhorse|todoterreno/i.test(o)) out('--- ' + id + ' ' + ruta + '\n' + o);
    } else if (Array.isArray(o)) o.forEach((v, i) => dump(v, ruta + '[' + i + ']'));
    else if (o && typeof o === 'object') Object.entries(o).forEach(([k, v]) => dump(v, ruta + '.' + k));
  };
  dump(x, '');
});
fs.writeFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/unknown_endings2.txt', P.join('\n\n'));
console.log('escrito, bloques=' + P.length);
