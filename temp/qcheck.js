const fs = require('fs');
const h = fs.readFileSync('guides/j48-vs-rndi.html', 'utf8');
const re = /guide-faq-question"\s*>\s*(.*?)<span class="guide-faq-icon"/gs;
let m, i = 0;
while ((m = re.exec(h)) && i < 8) {
  console.log('Q' + i + ': ' + m[1].replace(/<[^>]+>/g, '').trim().slice(0, 140));
  i++;
}