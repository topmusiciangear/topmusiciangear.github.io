const fs = require('fs');
let raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/guides_head.json', 'utf16le');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const g = JSON.parse(raw);
[['repitch-vs-melodyne', 'Synchro Arts RePitch'], ['best-guitar-plugins', 'Softube Amp Room'], ['vocalign-vs-revoice-pro', 'Synchro Arts Revoice'], ['best-piano-keyboard-vsts', 'V Collection 11']].forEach(([id, pat]) => {
  const s = JSON.stringify(g.find(x => x.id === id));
  let i = -1, n = 0;
  while ((i = s.indexOf(pat, i + 1)) > -1 && n < 8) {
    n++;
    console.log(id + ': ...' + s.slice(Math.max(0, i - 60), i + pat.length + 40).replace(/\\n/g, ' '));
  }
});
