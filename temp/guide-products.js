const fs = require('fs');
const cwd = process.cwd();
const s = fs.readFileSync(cwd + '/data/guides.json', 'utf8');
for (const slug of ['best-32-channel-digital-mixers', 'best-digital-mixers', 'best-microphone', 'pro-live-sound', 'pro-microphones']) {
  const i = s.indexOf('"id": "' + slug + '"');
  if (i < 0) { console.log(slug + ' => NOT FOUND'); continue; }
  const j = s.indexOf('\n  {\n    "id": "', i + 10);
  const b = s.slice(i, j > 0 ? j : undefined);
  const m = b.match(/"products"\s*:\s*\[[^\]]*\]/g) || [];
  console.log(slug + ' => ' + (m.length ? m.map(x => x.replace(/\n\s*/g, '')).join('  ') : 'no products arrays'));
}