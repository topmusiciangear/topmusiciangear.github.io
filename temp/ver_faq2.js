const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

function bloque(path, desde) {
  const s = fs.readFileSync(B + path, 'utf8');
  const i = s.search(/class="[^"]*faq/i);
  if (i < 0) return '(sin bloque)';
  const trozo = s.slice(i, i + 2600);
  const txt = trozo.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, '\n').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
  return txt;
}

console.log('=== FAQ EN LA PAGINA NUEVA (EN) ===');
console.log(bloque('guides/best-home-studio-speakers.html'));
console.log('\n\n=== FAQ EN LA PAGINA NUEVA (ES) ===');
console.log(bloque('guides/best-home-studio-speakers_es.html'));
console.log('\n\n=== FAQ EN budget-monitors (referencia, EN) ===');
console.log(bloque('guides/budget-monitors.html').slice(0, 1200));
