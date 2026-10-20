const fs = require('fs');
let s = fs.readFileSync('temp/score_overrides.js', 'utf8');
s = s.replace(/"j48-vs-rndi"[\s\S]*?\}/, '"j48-vs-rndi": {\n    "Caja Directa Activa Radial J48 MK2": 9.6,\n    "Radial J48 MK2 Active Direct Box": 9.6,\n    "Interfaz Directa Activa Rupert Neve Designs RNDI": 9.4,\n    "Rupert Neve Designs RNDI Active Direct Interface": 9.4\n  }');
fs.writeFileSync('temp/score_overrides.js', s, 'utf8');
console.log('Fixed');