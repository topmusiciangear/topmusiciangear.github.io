const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

let fixes = 0;

function fixAllStrings(obj) {
  if (!obj) return;
  if (typeof obj === 'string') {
    if (obj.includes('previolificador')) {
      obj = obj.replace(/previolificadores/g, 'previos').replace(/previolificador/g, 'previo');
      fixes++;
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const fixed = fixAllStrings(obj[i]);
      if (fixed !== obj[i]) obj[i] = fixed;
    }
    return;
  }
  if (typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      const result = fixAllStrings(obj[key]);
      if (typeof result === 'string' && result !== obj[key]) {
        obj[key] = result;
      }
    });
  }
}

guides.forEach(g => {
  fixAllStrings(g);
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('Total fixes:', fixes);
const remaining = (JSON.stringify(guides).match(/previolificador/g) || []).length;
console.log('Restantes en todo el corpus:', remaining);