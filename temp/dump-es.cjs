const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const e = g.find(x => x && x.id === 'studio-subwoofers-setup');
if (!e) { console.error('NOT FOUND'); process.exit(1); }

const out = [];
function walk(obj, path) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    obj.forEach((v,i) => walk(v, path+'['+i+']'));
    return;
  }
  for (const [k,v] of Object.entries(obj)) {
    const p = path ? path+'.'+k : k;
    if (typeof v === 'string' && v.length > 10) {
      if (k.endsWith('_es') || k.endsWith('Es')) out.push(p + '\n' + v + '\n');
    } else if (typeof v === 'object' && v !== null) {
      walk(v, p);
    }
  }
}
walk(e, '');

// also dump featuredSnippet and verdictProsCons explicitly
if (e.featuredSnippet) out.push('FEATURED_SNIPPET\n' + JSON.stringify(e.featuredSnippet, null, 2) + '\n');
if (e.verdictProsCons) out.push('PROS_CONS\n' + JSON.stringify(e.verdictProsCons, null, 2) + '\n');
if (e.sections) {
  e.sections.forEach((s,i) => {
    if (s && typeof s === 'object') {
      for (const [k,v] of Object.entries(s)) {
        if (k.endsWith('_es') && typeof v === 'string') out.push('SECTION['+i+'].' + k + '\n' + v + '\n');
      }
    }
  });
}

fs.writeFileSync('temp/guide-es-dump.txt', out.join('\n'));
console.log('written', out.length, 'blocks');