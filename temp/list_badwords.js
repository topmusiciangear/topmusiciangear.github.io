const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));

const ACRO = /^[A-Z0-9&]{1,5}(\+|-|\d)*$/;
const words = {};

guides.forEach(g => {
  (g.sections || []).forEach((s, i) => {
    const h = s.heading_es || '';
    const segs = h.split(/(?<=[:?!;¿¡.])\s+/);
    segs.forEach(seg => {
      const ws = seg.split(/[\s\-–—,()]+/).filter(Boolean);
      ws.forEach((w, idx) => {
        if (idx === 0) return; // skip first word of segment
        const c = w.replace(/^[¿¡"'«*[]/, '').replace(/[.,;:!?]$/, '');
        if (ACRO.test(c)) return;
        if (c.length <= 1) return;
        if (c[0] !== c[0].toUpperCase() || c[0] === c[0].toLowerCase()) return;
        words[c] = (words[c] || 0) + 1;
      });
    });
  });
});

const sorted = Object.entries(words).sort((a, b) => b[1] - a[1]);
console.log('Total unique capitalized words (non-acronym, non-first):', sorted.length);
console.log('Total occurrences:', sorted.reduce((s, e) => s + e[1], 0));
console.log('\nAll words with frequency >= 3:');
sorted.filter(e => e[1] >= 3).forEach(([w, c]) => console.log(c + '\t' + w));