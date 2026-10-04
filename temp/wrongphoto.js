const fs = require('fs');
const ids = ['budget-mics', 'best-5-string-basses', 'pro-drivers', 'best-guitars'];
const files = ['budget-mics', 'best-5-string-basses', 'beginner-guitar', 'pro-monitors'];
files.forEach(id => {
  const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/' + id + '.html', 'utf8');
  const parts = h.split('guide-section-heading" id="sec-');
  let wrong = 0;
  parts.slice(1).forEach(part => {
    const tm = part.match(/^\d+">([^<]+)</);
    if (!tm) return;
    const m = part.match(/guide-section-imgs"><img[^>]*alt="([^"]+)"/);
    if (!m) return;
    // photo alt should share >=1 distinctive token with heading
    const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    const ht = new Set(norm(tm[1]).split(' ').filter(w => w.length > 3));
    const at = norm(m[1]).split(' ').filter(w => w.length > 3);
    const hit = at.filter(w => ht.has(w));
    if (!hit.length) { wrong++; console.log(id, 'POSIBLE FALLO:', tm[1].slice(0, 50), '<-', m[1]); }
  });
});
console.log('revisiones hechas');