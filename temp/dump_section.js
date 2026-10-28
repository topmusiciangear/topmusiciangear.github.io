const fs = require('fs');
const s = fs.readFileSync('guides/best-nylon-guitars-for-beginners_es.html', 'utf8');
const i = s.indexOf('store-buttons guide-section-buy');
const anchors = [];
let pos = i;
while (true) {
  const a = s.indexOf('<a ', pos);
  if (a < 0) break;
  const close = s.indexOf('</a>', a);
  if (close < 0) break;
  const tag = s.slice(a, s.indexOf('>', a) + 1);
  if (tag.includes('data-store')) {
    const store = (tag.match(/data-store="([^"]*)"/) || [])[1];
    const href = (tag.match(/href="([^"]*)"/) || [])[1] || '';
    const body = s.slice(a, close).replace(/<svg[\s\S]*?<\/svg>/g, '[icon]').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    anchors.push({ store, href, cls: (tag.match(/class="([^"]*)"/) || [])[1], body });
  }
  pos = close + 4;
  if (anchors.length > 14) break;
}
anchors.forEach((a, n) => console.log(n + 1, '[' + a.cls + ']', a.store, '|', a.href.slice(0, 60), '|', a.body.slice(0, 90)));
