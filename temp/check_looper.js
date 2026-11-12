const fs = require('fs');
const html = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-looper-pedals.html', 'utf8');
const dnRegex = /<[^>]*style\s*=\s*"[^"]*display\s*:\s*none[^"]*"[^>]*>([\s\S]*?)<\/[^>]+>/gi;
let m;
while ((m = dnRegex.exec(html)) !== null) {
  const text = m[1].replace(/<[^>]+>/g, '').trim();
  if (text.length > 20) {
    console.log('Hidden text: ' + text.slice(0, 300));
    console.log('---');
    console.log('In visible text: ' + html.replace(/<[^>]+>/g, ' ').includes(text.slice(0, 50)));
  }
}
