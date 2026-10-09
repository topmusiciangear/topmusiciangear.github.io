const { execSync } = require('fs');
const cp = require('child_process');
const fs = require('fs');
const raw = cp.execSync('git show HEAD:data/guides.json', { maxBuffer: 60 * 1024 * 1024 }).toString('utf8');
const oldG = JSON.parse(raw);
const oldGuide = oldG.find(x => x.id === 'best-plugins');
const oldSec = oldGuide.sections.find(s => (s.heading || '') === 'Hardware-Modeled Plugins');
if (!oldSec) { console.log('old section not found'); process.exit(1); }
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-plugins');
const idx = guide.sections.findIndex(s => (s.products || []).join(',') === '62,121');
if (idx < 0) { console.log('current section not found'); process.exit(1); }
guide.sections[idx].heading = oldSec.heading;
guide.sections[idx].heading_es = oldSec.heading_es;
guide.sections[idx].content = oldSec.content;
guide.sections[idx].content_es = oldSec.content_es;
guide.sections[idx].products = oldSec.products;
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Restored section at index', idx, ':', oldSec.heading);
