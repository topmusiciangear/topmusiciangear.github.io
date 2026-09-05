const fs = require('fs');

const FILES = ['data/guides.json', 'data/products.json', 'data/deals.json', 'data/manual-deals.json'];

// pattern -> proposed fix (null = just report)
const RULES = [
  { re: /\b(?:la|una) vía más (?:rápida|fluida|sencilla|directa)\b/gi, fix: null },
  { re: /\bes la vía más\b/gi, fix: null },
  { re: /\bes la elección para\b/gi, fix: null },
  { re: /\bes la elección principal\b/gi, fix: null },
  { re: /\bsigue siendo la elección\b/gi, fix: null },
  { re: /\bpaso adelante\b/gi, fix: null },
  { re: /\bel mayor paso adelante\b/gi, fix: null },
  { re: /\bfue el mayor paso adelante\b/gi, fix: null },
  { re: /\bla vía más\b/gi, fix: null },
];

function collectStrings(obj, out, path) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) { obj.forEach((v,i)=>collectStrings(v,out,path+'['+i+']')); return; }
  for (const [k,v] of Object.entries(obj)) {
    const p = path ? path+'.'+k : k;
    if (typeof v === 'string') {
      if (/_(es|Es|ES)$/.test(k) || /es[:_]/.test(k) || k.includes('es')) out.push({path:p, v});
    } else if (typeof v === 'object' && v !== null) {
      collectStrings(v, out, p);
    }
  }
}

for (const f of FILES) {
  if (!fs.existsSync(f)) { console.log('MISSING', f); continue; }
  const data = JSON.parse(fs.readFileSync(f, 'utf8'));
  const out = [];
  collectStrings(data, out, f);
  for (const {path, v} of out) {
    for (const r of RULES) {
      const m = v.match(r.re);
      if (m) {
        fs.appendFileSync('C:\\Users\\Daniel\\AppData\\Local\\Temp\\opencode\\es-audit-out.txt', '### ' + path + '\n' + v + '\n\n');
        break;
      }
    }
  }
}
console.log('SCAN_DONE');
