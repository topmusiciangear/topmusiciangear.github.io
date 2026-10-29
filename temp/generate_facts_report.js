const products = require('../data/products.json');

const map = new Map();
for (const p of products) {
  if (!p.facts) continue;
  for (const f of p.facts) {
    const label = (f.label && f.label.en) ? f.label.en : f.label;
    const icon = f.icon;
    if (!label) continue;
    if (!map.has(label)) map.set(label, new Map());
    const iconMap = map.get(label);
    if (!iconMap.has(icon)) iconMap.set(icon, []);
    iconMap.get(icon).push({id:p.id, title:p.title, value:f.value});
  }
}

const mismatches = [];
for (const [label, iconMap] of map.entries()) {
  if (iconMap.size > 1) {
    const icons = [...iconMap.entries()].map(([ic, items]) => ({icon: ic, count: items.length, items}));
    icons.sort((a,b)=>b.count-a.count);
    const majority = icons[0];
    const others = icons.slice(1);
    mismatches.push({label, majority, others});
  }
}

const color = '#4ade80';
const svgDefs = {
  wave: `<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><path d="M1 8 C 4 2, 7 2, 10 8 S 16 14, 19 8 S 22 2, 23 8"/></svg>`,
  sineWave: `<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><path d="M1 8 C 4 2, 7 2, 10 8 S 16 14, 19 8 S 22 2, 23 8"/></svg>`,
  gauge: `<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><path d="M3 14 A 9 9 0 0 1 21 14"/><line x1="12" y1="14" x2="17" y2="6" stroke-width="2"/></svg>`,
  freq: `<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><line x1="4" y1="14" x2="4" y2="8"/><line x1="12" y1="14" x2="12" y2="3"/><line x1="20" y1="14" x2="20" y2="6"/></svg>`,
  ruler: `<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><line x1="2" y1="8" x2="22" y2="8"/><line x1="2" y1="4" x2="2" y2="12"/><line x1="22" y1="4" x2="22" y2="12"/><line x1="8" y1="5" x2="8" y2="11"/><line x1="16" y1="5" x2="16" y2="11"/></svg>`,
  wood: `<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><path d="M3 13 C 3 6, 10 2, 21 2 C 21 11, 13 14, 3 13 Z"/><path d="M5 12 L 15 4"/></svg>`,
  layers: `<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><path d="M12 2 L 21 6 L 12 10 L 3 6 Z"/><path d="M3 10 L 12 14 L 21 10"/></svg>`,
  weight: `<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><line x1="8" y1="8" x2="16" y2="8"/><rect x="4" y="4" width="3.2" height="8" rx="1"/><rect x="16.8" y="4" width="3.2" height="8" rx="1"/><line x1="1.5" y1="6" x2="1.5" y2="10"/><line x1="22.5" y1="6" x2="22.5" y2="10"/></svg>`,
  strings: `<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><line x1="5" y1="2" x2="5" y2="14"/><line x1="9" y1="3.5" x2="9" y2="12.5"/><line x1="14" y1="2" x2="14" y2="14"/><line x1="18" y1="3.5" x2="18" y2="12.5"/></svg>`,
  lock: `<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><rect x="6" y="7" width="12" height="8" rx="2"/><path d="M9 7 V 5 a 3 3 0 0 1 6 0 V 7"/></svg>`,
  chip: `<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><rect x="7" y="4" width="10" height="8" rx="1.5"/><line x1="10" y1="1.5" x2="10" y2="4"/><line x1="14" y1="1.5" x2="14" y2="4"/><line x1="10" y1="12" x2="10" y2="14.5"/><line x1="14" y1="12" x2="14" y2="14.5"/></svg>`,
  cone: `<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><path d="M3 8 L 19 3.5"/><path d="M3 8 L 19 12.5"/><path d="M19 3.5 A 9 9 0 0 1 19 12.5"/></svg>`,
  speaker: `<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="6.4"/><circle cx="12" cy="8" r="2"/></svg>`,
  signal: `<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><line x1="12" y1="14" x2="12" y2="11.5"/><path d="M9 9 A 5 5 0 0 1 15 9"/><path d="M5.8 5.5 A 9.4 9.4 0 0 1 18.2 5.5"/></svg>`,
  battery: `<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><rect x="2.5" y="4" width="15.5" height="8" rx="1.5"/><line x1="20.5" y1="6.5" x2="20.5" y2="9.5"/><line x1="6.5" y1="6" x2="6.5" y2="10"/><line x1="10.5" y1="6" x2="10.5" y2="10"/></svg>`,
  piano: `<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><rect x="2" y="6" width="20" height="8" rx="1"/><line x1="5" y1="6" x2="5" y2="14"/><line x1="10" y1="6" x2="10" y2="14"/><line x1="15" y1="6" x2="15" y2="14"/><line x1="20" y1="6" x2="20" y2="14"/><rect x="6.5" y="3" width="2" height="5" rx="0.5"/><rect x="11.5" y="3" width="2" height="5" rx="0.5"/><rect x="16.5" y="3" width="2" height="5" rx="0.5"/></svg>`,
};

let out = '# Audit de iconos quickfacts\n\n';
out += `Total labels with multiple icons: ${mismatches.length}\n\n`;

for (const m of mismatches) {
  out += `## ${m.label}\n`;
  out += `**Icono mayoritario correcto:** \`${m.majority.icon}\` (${m.majority.count} usos)\n`;
  if (svgDefs[m.majority.icon]) {
    out += `SVG verde: ${svgDefs[m.majority.icon]}\n`;
  }
  out += '\n';
  for (const o of m.others) {
    out += `### Incorrecto: \`${o.icon}\` (${o.count} usos)\n`;
    out += `Productos ejemplo: ${o.items.slice(0,5).map(i=>i.id+' '+i.title).join(' | ')}\n`;
    out += '\n';
  }
  out += '\n';
}

require('fs').writeFileSync('temp/quickfacts_icon_audit_report.md', out);
console.log('Report written to temp/quickfacts_icon_audit_report.md');
console.log('Mismatches:', mismatches.length);
