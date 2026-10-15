const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
console.log('=== usos restantes de "mas silencioso" (deben ser legitimos) ===');
s.sections.forEach((sec, i) => {
  ['content', 'content_es'].forEach(k => {
    const v = sec[k] || '';
    const m = v.match(/[^<]{0,100}más silencioso[^<]{0,100}/);
    if (m) console.log('  sec[' + i + '].' + k + ': ...' + m[0].trim() + '...');
  });
  if (/más silencioso/.test(sec.heading_es || '')) console.log('  sec[' + i + '].heading_es: ' + sec.heading_es);
});
