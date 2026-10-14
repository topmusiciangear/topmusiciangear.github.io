const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

let fixes = 0;
guides.forEach(g => {
  (g.sections || []).forEach(s => {
    if (s.heading_es) {
      const before = s.heading_es;
      s.heading_es = s.heading_es.replace(/previolificadores/g, 'previos').replace(/previolificador/g, 'previo');
      if (s.heading_es !== before) fixes++;
    }
  });
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('heading_es fixes:', fixes);
const remaining = (JSON.stringify(guides).match(/previolificador/g) || []).length;
console.log('Restantes en todo el corpus:', remaining);