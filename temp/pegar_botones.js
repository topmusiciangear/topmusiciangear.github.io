const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
const MAPA = { 2: 'scarlett-vs-ssl', 10: 'budget-interfaces', 4: 'best-interface', 12: 'best-microphone', 13: 'budget-mics', 3: 'best-monitors-for-small-rooms', 17: 'budget-monitors', 14: 'best-headphones', 5: 'best-condenser-mics', 18: 'studio-furniture' };

Object.entries(MAPA).forEach(([sec, dest]) => {
  [['content', '.html'], ['content_es', '_es.html']].forEach(([campo, suf]) => {
    const html = s.sections[sec][campo];
    const re = new RegExp('</p><p>(<a href="/guides/' + dest + suf.replace('.', '\\.') + '" class="guide-link-btn">.*?</a>)</p>$');
    if (!re.test(html)) { console.log('  FALLA sec[' + sec + '].' + campo); return; }
    s.sections[sec][campo] = html.replace(re, ' $1</p>');
    console.log('  ok  sec[' + sec + '].' + campo + ' (boton dentro del ultimo parrafo)');
  });
});
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
