const fs = require('fs');
const html = fs.readFileSync('guides/best-microphone.html', 'utf8');
const start = html.indexOf('class="guide-content"');
const end = html.indexOf('class="guide-related"');
const content = html.substring(start, end);
const links = [...content.matchAll(/<a [^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)];
let noBtn = 0;
links.forEach(m => {
  if (!m[0].includes('guide-link-btn')) {
    noBtn++;
    console.log(m[0].substring(0, 150));
  }
});
console.log('Content links without guide-link-btn:', noBtn);
