const fs = require('fs');

const GUIDES = 'data/guides.json';
const PATCH_FILE = process.argv[2];
if (!PATCH_FILE) { console.error('usage: node tools/apply-proscons-patch.js <patch.json>'); process.exit(1); }

const patch = JSON.parse(fs.readFileSync(PATCH_FILE, 'utf8'));
const guides = JSON.parse(fs.readFileSync(GUIDES, 'utf8'));

function findItem(g, name) {
  return g.verdictProsCons.find(p => p.name === name);
}

let replaced = 0;
let added = 0;
let applied = 0;
const notFound = [];
const extra = [];

for (const entry of patch) {
  const g = guides.find(x => x.id === entry.guide);
  if (!g) { notFound.push(`${entry.guide} (guide)`); continue; }
  const item = entry.product ? findItem(g, entry.product) : null;
  if (entry.product && !item) { notFound.push(`${entry.guide} / ${entry.product}`); continue; }

  if (entry.replace) {
    for (const r of entry.replace) {
      const { field, from, to } = r;
      if (item[field] === undefined) { extra.push(`${entry.guide} / ${entry.product} / ${field}`); continue; }
      const idx = item[field].indexOf(from);
      if (idx === -1) { notFound.push(`${entry.guide} / ${entry.product} / [${field}] ${from.slice(0,60)}`); continue; }
      item[field][idx] = to;
      replaced++;
    }
  }
  if (entry.addCons && item) {
    for (const c of entry.addCons) {
      if (typeof c === 'string') {
        if (!item.cons.includes(c)) { item.cons.push(c); added++; }
      } else {
        if (c.en && !item.cons.includes(c.en)) { item.cons.push(c.en); added++; }
        if (c.es && !item.cons_es.includes(c.es)) { item.cons_es.push(c.es); added++; }
      }
    }
  }
  applied++;
}

fs.writeFileSync(GUIDES, JSON.stringify(guides, null, 2));
console.log(JSON.stringify({ applied, replaced, added, notFound, extra }, null, 2));
