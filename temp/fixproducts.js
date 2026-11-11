const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
let s = fs.readFileSync(p, 'utf8');
// Remove everything after the last valid closing bracket before our bad entry
const idx = s.lastIndexOf('],');
// Actually find the last "}" before final "]"
const lastBracket = s.lastIndexOf(']');
// Truncate to before last bracket, then add clean entry
const prefix = s.slice(0, lastBracket).trim();
const clean = prefix + ',\n  {\n    "id": 9010,\n    "title": "Waves Clarity Vx Pro",\n    "title_es": "Waves Clarity Vx Pro",\n    "brand": "Waves",\n    "category": "plugins",\n    "price": 299,\n    "rating": 4.8,\n    "reviews": 0,\n    "badge": "",\n    "desc": "AI-powered noise restoration for dialogue.",\n    "desc_es": "Restauracion de ruido por IA para dialogos.",\n    "img": "img/products/placeholder.webp",\n    "stores": {\n      "pluginboutique": "https://www.pluginboutique.com/product/2-Effects/54-Vocal-Processing/13821-Clarity-Vx-Pro"\n    },\n    "affiliate": {\n      "pluginboutique": "https://www.pluginboutique.com/product/2-Effects/54-Vocal-Processing/13821-Clarity-Vx-Pro"\n    },\n    "score": 9.6,\n    "bestFor": {\n      "en": "Real-time dialogue isolation",\n      "es": "Aislamiento de dialogos en tiempo real"\n    }\n  }\n]';
fs.writeFileSync(p, clean);
console.log('done');
