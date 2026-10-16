const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const porId = {};
g.forEach(x => { porId[x.id] = x; });

const norm = s => (s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const R = { rotos: [], viejos: [], distintos: [], sinLinks: [] };

g.forEach(gg => {
  const links = [];
  (function rec(o, campo) {
    if (typeof o === 'string') {
      [...o.matchAll(/<a[^>]*href="(\/guides\/([^"]+?)(_es)?\.html)"[^>]*>([\s\S]*?)<\/a>/g)].forEach(m => {
        links.push({ slug: m[2], es: !!m[3] || campo.endsWith('_es'), texto: norm(m[4]), campo });
      });
      return;
    }
    if (Array.isArray(o)) return o.forEach((v, i) => rec(v, campo + '[' + i + ']'));
    if (o && typeof o === 'object') Object.keys(o).forEach(k => rec(o[k], k));
  })(gg, '');

  if (!links.length) { R.sinLinks.push(gg.id); return; }

  links.forEach(L => {
    const dest = porId[L.slug];
    if (!dest) {
      // ¿existe el HTML aunque no este en guides.json? (stub)
      const existe = fs.existsSync(B + 'guides/' + L.slug + (L.es ? '_es' : '') + '.html');
      R.rotos.push(gg.id + ' -> /guides/' + L.slug + (existe ? ' (slug fuera de guides.json, solo stub)' : ' (NO EXISTE)') + '  texto: "' + L.texto.slice(0, 60) + '"');
      return;
    }
    const oficial = norm(L.es ? (dest.title_es || dest.title) : (dest.title || dest.title_es));
    if (!L.texto) { R.distintos.push(gg.id + ' -> ' + L.slug + '  anchor VACIO'); return; }
    if (/\d+ Best |\(\d{4}\)|versión|version/i.test(L.texto) && !new RegExp(L.texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(oficial)) {
      R.viejos.push(gg.id + ' -> ' + L.slug + '  texto viejo: "' + L.texto.slice(0, 70) + '"  actual: "' + oficial.slice(0, 70) + '"');
      return;
    }
    // ¿coincide o es etiqueta corta?
    const t = L.texto.toLowerCase(), o = oficial.toLowerCase();
    if (t !== o && !o.includes(t) && !t.includes(o)) {
      R.distintos.push(gg.id + ' -> ' + L.slug + '  texto: "' + L.texto.slice(0, 60) + '"  vs titulo: "' + oficial.slice(0, 60) + '"');
    }
  });
});

console.log('=== LINKS ROTOS: ' + R.rotos.length + ' ===');
[...new Set(R.rotos)].slice(0, 20).forEach(x => console.log('  - ' + x));
console.log('\n=== TEXTOS VIEJOS: ' + R.viejos.length + ' ===');
[...new Set(R.viejos)].slice(0, 20).forEach(x => console.log('  - ' + x));
console.log('\n=== TEXTOS DISTINTOS AL TITULO: ' + R.distintos.length + ' (etiquetas cortas, revisar) ===');
[...new Set(R.distintos)].slice(0, 30).forEach(x => console.log('  - ' + x));
console.log('\n=== GUIAS SIN LINKS A OTRAS GUIAS: ' + R.sinLinks.length + ' ===');
R.sinLinks.forEach(x => console.log('  - ' + x));
fs.writeFileSync(B + 'temp/audit_links_internos.json', JSON.stringify(R, null, 1));
