const fs = require('fs');
const file = process.argv[2] || 'guides/best-monitors.html';
const h = fs.readFileSync(file, 'utf8');
const secs = [...h.matchAll(/<h2 class="guide-section-heading" id="sec-(\d+)">([\s\S]*?)<\/h2>\s*<div class="guide-section-content">([\s\S]*?)(?=<\/div>\s*<\/div>\s*<div class="guide-section">|<\/div>\s*<\/div>\s*<div class="guide-faq">|<\/div>\s*<\/div>\s*<div class="guide-conclusion">)/g)];
console.log('secciones: ' + secs.length);
secs.forEach(m => {
  const body = m[3];
  const head = m[2].replace(/<[^>]+>/g, '').trim().slice(0, 60);
  const img = (body.match(/<img[^>]*guide-section-img[^>]*alt="([^"]*)"/) || body.match(/<img[^>]*alt="([^"]*)"[^>]*guide-section-img/) || [])[1] || 'SIN FOTO';
  const buy = body.includes('guide-section-buy') ? 'con compra' : 'SIN COMPRA';
  console.log('sec-' + m[1] + ' | ' + img.slice(0, 40) + ' | ' + buy + ' | ' + head);
});
