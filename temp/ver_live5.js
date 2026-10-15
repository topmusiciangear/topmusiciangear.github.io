const fs = require('fs');
const T = 'C:/Users/Daniel/AppData/Local/Temp/opencode/';

function tabla(f, etiqueta) {
  const d = fs.readFileSync(T + f, 'utf8');
  console.log('\n=== ' + etiqueta + ' ===');
  const tb = (d.match(/<table[\s\S]*?<\/table>/) || [''])[0];
  [...tb.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].forEach(r => {
    const c = [...r[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
    if (c.length && /Puntos fuertes|Standout/.test(c[0])) {
      console.log('  ' + c[0] + ':');
      c.slice(1).forEach((x, i) => console.log('      N' + (i + 1) + ': ' + x));
    }
  });
  console.log('\n  "alimentados" / "powered": ' + (d.match(/alimentados/g) || []).length + ' / ' + (d.match(/powered/gi) || []).length);
  console.log('  "activos" / "active"    : ' + (d.match(/activos/gi) || []).length + ' / ' + (d.match(/active/gi) || []).length);
  console.log('  mojibake                 : ' + (d.match(/â‚¬|Â£|Â°/g) || []).length);
  const t = (d.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const h1 = ((d.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, '').trim();
  console.log('  <title> (' + t.length + ')  : ' + t);
  console.log('  <h1>    (' + h1.length + ')  : ' + h1);
}
tabla('l4.html', 'EN VIVO');
tabla('l3.html', 'ES VIVO');
