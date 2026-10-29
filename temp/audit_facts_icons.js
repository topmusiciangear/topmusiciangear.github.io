const fs = require('fs');
const path = require('path');
const products = require('../data/products.json');

const map = new Map(); // label -> set of icons

// Collect per product
for (const p of products) {
  if (!p.facts) continue;
  const prodLabel = (p.title || '').slice(0, 60);
  for (const f of p.facts) {
    const labelEn = (f.label && f.label.en) ? f.label.en : f.label;
    const icon = f.icon;
    const value = f.value;
    if (!labelEn) continue;
    if (!map.has(labelEn)) map.set(labelEn, new Map());
    const iconMap = map.get(labelEn);
    if (!iconMap.has(icon)) iconMap.set(icon, { count:0, products:[], examples:[] });
    const entry = iconMap.get(icon);
    entry.count++;
    if (entry.products.length < 5) entry.products.push({id:p.id,title:prodLabel});
    if (entry.examples.length < 3) entry.examples.push({id:p.id,value});
  }
}

// Find labels with multiple icons
const mismatches = [];
for (const [label, iconMap] of map.entries()) {
  if (iconMap.size > 1) {
    const icons = [...iconMap.entries()].map(([ic, v]) => ({icon:ic,count:v.count,products:v.products}));
    // Choose majority
    icons.sort((a,b)=>b.count-a.count);
    const majority = icons[0];
    const others = icons.slice(1);
    mismatches.push({label, majority, others, totalIcons:iconMap.size});
  }
}

console.log('Labels with multiple icons:', mismatches.length);
for (const m of mismatches) {
  console.log('\n=== LABEL:', m.label, '===');
  console.log('Majority icon:', m.majority.icon, 'count', m.majority.count);
  console.log('Products example:', m.majority.products.slice(0,3).map(p=>p.id+': '+p.title).join(' | '));
  for (const o of m.others) {
    console.log('  WRONG icon:', o.icon, 'count', o.count);
    console.log('    Products:', o.products.map(p=>p.id+': '+p.title).join(' | '));
  }
}

// Also list all labels and their majority icon
const summary = [];
for (const [label, iconMap] of map.entries()) {
  let best = null, bestCount = -1;
  for (const [ic, v] of iconMap.entries()) {
    if (v.count > bestCount) { bestCount = v.count; best = ic; }
  }
  summary.push({label, icon:best, count:bestCount, variants:iconMap.size});
}
summary.sort((a,b)=>b.count-a.count);
console.log('\n=== Summary of labels and majority icons ===');
for (const s of summary) {
  console.log(`${s.label.padEnd(28)} -> ${s.icon.padEnd(12)} (${s.count} uses) variants:${s.variants}`);
}

fs.writeFileSync('facts_icon_audit.json', JSON.stringify({mismatches, summary}, null, 2));
console.log('\nReport saved to temp/facts_icon_audit.json');
