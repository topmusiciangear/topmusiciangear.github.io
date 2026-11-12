const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/';
const html = fs.readFileSync(path + 'guides/best-microphone.html', 'utf8');
// Buscar todos los elementos con display:none o hidden
const dnRegex = /<[^>]*style\s*=\s*"[^"]*display\s*:\s*none[^"]*"[^>]*>([\s\S]*?)<\/[^>]+>/gi;
let m;
let count = 0;
while ((m = dnRegex.exec(html)) !== null) {
  const text = m[1].replace(/<[^>]+>/g, '').trim();
  if (text.length > 10) {
    count++;
    console.log('display:none text: ' + text.slice(0, 120));
  }
}
console.log('Total display:none with text >10 chars: ' + count);
// Buscar comentarios HTML con texto
const comments = html.match(/<!--[\s\S]*?-->/g) || [];
console.log('HTML comments: ' + comments.length);
comments.forEach((c, i) => {
  const text = c.replace(/<!--|-->/g, '').trim();
  if (text.length > 20 && !text.includes('google') && !text.includes('analytics')) {
    console.log('  Comment ' + i + ': ' + text.slice(0, 100));
  }
});
// Buscar noscript
const ns = html.match(/<noscript[\s\S]*?<\/noscript>/gi) || [];
console.log('noscript tags: ' + ns.length);
ns.forEach((n, i) => console.log('  noscript ' + i + ': ' + n.slice(0, 200)));
