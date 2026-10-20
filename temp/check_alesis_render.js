const fs = require('fs');
const files = ['guides/best-home-studio-speakers_es.html', 'guides/best-home-studio-speakers.html'];
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  console.log('=== ' + f + ' ===');
  console.log('ELEVATE:', (h.match(/ELEVATE/g) || []).length,
    '| Edifier:', (h.match(/Edifier/g) || []).length,
    '| ../undefined:', (h.match(/\.\.\/undefined/g) || []).length,
    '| fake ASIN:', h.includes('B00ABCDEFG'),
    '| real ASIN:', h.includes('B01IR7CFJG'));
  const i = h.indexOf('id="sec-9"');
  const seg = h.slice(i - 120, i + 1500).replace(/></g, '>\n<');
  console.log(seg.split('\n').slice(0, 16).join('\n'));
  const empty = (h.match(/<h2 class="guide-section-heading"[^>]*><\/h2>/g) || []).length;
  console.log('EMPTY HEADINGS:', empty);
  const card = h.slice(h.indexOf('Alesis ELEVATE 4 ('), h.indexOf('Alesis ELEVATE 4 (') + 900);
  console.log('--- CARD SNIP ---');
  console.log((card || 'no card').split('><').slice(0, 6).join('><'));
  console.log('');
}
