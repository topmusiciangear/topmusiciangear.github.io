const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';

['starter-studio.html', 'starter-studio_es.html'].forEach(f => {
  const d = fs.readFileSync(B + f, 'utf8');
  const es = f.endsWith('_es.html');
  console.log('\n=== ' + f + ' ===');

  // 1) totales nuevos en la tabla
  const tbl = (d.match(/<table[\s\S]*?<\/table>/) || [''])[0];
  [...tbl.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].forEach(r => {
    const c = [...r[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
    if (c.length && /Inversión|Estimated Cost/.test(c[0])) console.log('  ' + c[0] + ': ' + c.slice(1).join(' | '));
  });
  console.log('  restos $900/$1,357/$2,797: ' + (d.match(/\$900|\$1,357|\$1\.357|\$2,797|\$2\.797/g) || []).length);

  // 2) Amazon sin precio en primario y en fila
  const primarios = [...d.matchAll(/<a[^>]*class="shop-btn-primary"[^>]*>([\s\S]*?)<\/a>/g)];
  const primAmz = primarios.filter(m => /data-store="amazon"/.test(m[0]));
  const primAmzConPrecio = primAmz.filter(m => /Aprox\.|Approx\.|\$|£|€/.test(m[1]));
  console.log('  primarios Amazon: ' + primAmz.length + '  con precio: ' + primAmzConPrecio.length + ' (debe ser 0)');
  primAmz.slice(0, 2).forEach(m => console.log('    ej: ' + m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60)));

  const filasAmz = [...d.matchAll(/<a [^>]*data-store="amazon"[^>]*>([\s\S]*?)<\/a>/g)]
    .filter(m => !/shop-btn-primary/.test(m[0]));
  const filasAmzConPrecio = filasAmz.filter(m => /Aprox\.|Approx\.|\$[0-9]|£[0-9]|€[0-9]/.test(m[1]));
  const filasAmzCheck = filasAmz.filter(m => /Check price|Verificar precio/.test(m[1]));
  console.log('  filas Amazon: ' + filasAmz.length + '  con precio: ' + filasAmzConPrecio.length + ' (0)  con Check: ' + filasAmzCheck.length);
  console.log('  mojibake: ' + (d.match(/â‚¬|Â£|Â°/g) || []).length);
});

// 3) que otras tiendas SIGAN con precio (no romper nada)
const d = fs.readFileSync(B + 'starter-studio_es.html', 'utf8');
['zzounds', 'gear4music', 'andertons', 'musicstore'].forEach(k => {
  const filas = [...d.matchAll(new RegExp('<a [^>]*data-store="' + k + '"[^>]*>([\\s\\S]*?)<\\/a>', 'g'))].filter(m => !/shop-btn-primary/.test(m[0]));
  const conPrecio = filas.filter(m => /Aprox\.|\$[0-9]|£[0-9]|€[0-9]/.test(m[1]));
  console.log('  ' + k.padEnd(11) + ' filas: ' + filas.length + '  con precio: ' + conPrecio.length);
});
