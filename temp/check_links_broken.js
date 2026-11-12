const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const html = fs.readFileSync(B + 'guides/best-beginner-electric-guitar.html', 'utf8');

// Buscar todos los href
const links = html.match(/href="([^"]+)"/g) || [];
console.log('Total links:', links.length);

// Encontrar enlaces rotos (que no empiecen con http, /, #, o ./)
links.forEach(l => {
  const url = l.replace(/href="/, '').replace(/"/, '');
  if (!url.startsWith('http') && !url.startsWith('/') && !url.startsWith('#') && !url.startsWith('./')) {
    console.log('POSIBLEMENTE ROTO:', l);
  }
});

// Buscar texto roto o incompleto
const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
if (text.includes('...') || text.includes('...')) {
  console.log('\nPOSIBLES TEXTOS TRUNCADOS:');
  const matches = text.match(/[^.]{50,}\.\.\./g);
  if (matches) matches.forEach(m => console.log('  ' + m.trim()));
}

console.log('\nHecho');
