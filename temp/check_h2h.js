const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/beginner-guitar.html', 'utf8');
// Find all guide-section divs and locate the head-to-head one
const pos = [];
const re = /<div class="guide-section">/g;
let m;
while ((m = re.exec(h))) pos.push(m.index);
console.log('secciones:', pos.length);
pos.forEach((p, i) => {
  const chunk = h.slice(p, i + 1 < pos.length ? pos[i + 1] : p + 12000);
  const t = (chunk.match(/<h2 class="guide-section-heading"[^>]*>([\s\S]*?)<\/h2>/) || [])[1] || '?';
  const title = t.replace(/<[^>]+>/g, '').trim().slice(0, 50);
  const imgs = chunk.match(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"/g) || [];
  if (title.includes('Head-to-Head')) {
    console.log('=== ' + title + ' ===');
    console.log('imgs:', imgs.length);
    imgs.forEach(x => console.log('  ' + x.slice(0, 160)));
    // show media block
    const med = chunk.indexOf('guide-section-mediabuy');
    if (med > -1) console.log('mediabuy:', chunk.slice(med, med + 600));
    else console.log('(sin bloque mediabuy)');
  }
});