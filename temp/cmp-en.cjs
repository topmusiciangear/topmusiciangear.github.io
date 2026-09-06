const fs = require('fs');
const { execSync } = require('child_process');
const headRaw = execSync('git show HEAD:data/guides.json', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const gh = JSON.parse(headRaw);
const gc = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
for (const id of ['guitar-pedals', 'best-mic-for-podcasting', 'best-interface']) {
  const h = gh.find(a => a.id === id);
  const c = gc.find(a => a.id === id);
  console.log('########', id);
  console.log('--- HEAD sections[0].content (EN) ---');
  console.log(h.sections[0].content.split('guide-link-btn"').map(s => s.slice(0, 90)).join('\nGUARD:'));
  console.log('--- HEAD sections[1].content (EN) ---');
  if (h.sections[1]) console.log(h.sections[1].content.split('guide-link-btn"').map(s => s.slice(0, 90)).join('\nGUARD:'));
  console.log('--- HEAD sections[0].content_es ---');
  console.log(h.sections[0].content_es.split('guide-link-btn"').map(s => s.slice(0, 90)).join('\nGUARD:'));
}