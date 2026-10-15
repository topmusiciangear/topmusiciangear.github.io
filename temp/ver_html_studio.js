// Verificar en el HTML generado: SM57 fuera, tabla y totales correctos
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

['starter-studio.html', 'starter-studio_es.html'].forEach(f => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  const es = f.includes('_es');
  console.log('\n' + '='.repeat(58));
  console.log('  ' + f);
  console.log('='.repeat(58));
  console.log('  "SM57" en el HTML:        ' + (d.match(/SM57/g) || []).length);
  console.log('  "$485" en el HTML:        ' + (d.match(/\$485/g) || []).length);
  console.log('  "$545" en el HTML:        ' + (d.match(/\$545/g) || []).length);
  console.log('  "Dinámico y condensador": ' + (d.match(/entre dinámico y condensador/gi) || []).length);
  console.log('  "repuesto que te llevas":  ' + (d.match(/repuesto que te llevas/gi) || []).length);

  // fila de microfono de la tabla
  const fila = d.match(/<t[hd][^>]*>\s*(?:Microphone|Micrófono)\s*<\/t[hd]>([\s\S]{0,700}?)<\/tr>/i);
  if (fila) {
    const celdas = [...fila[0].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
    console.log('\n  TABLA · fila Micrófono:');
    celdas.forEach((c, i) => console.log('    col ' + (i + 1) + ': ' + c));
  } else console.log('\n  TABLA: no encontrada la fila del micrófono');

  // fila Total
  const ft = d.match(/<t[hd][^>]*>\s*(?:Total)\s*<\/t[hd]>([\s\S]{0,500}?)<\/tr>/i);
  if (ft) {
    const celdas = [...ft[0].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
    console.log('  TABLA · fila Total:');
    celdas.forEach((c, i) => console.log('    col ' + (i + 1) + ': ' + c));
  }

  // parrafo de presupuestos
  const p = d.match(/<(?:strong|p)>(?:<strong>)?(?:The Budget Essentials|El Básico Esencial)[^<]*(?:<[^>]+>)?[^<]{0,80}/);
  if (p) console.log('\n  PROSA: ' + p[0].replace(/<[^>]+>/g, '').trim());

  //新产品: la tarjeta del NT1 Signature y del SM57
  console.log('  tarjetas: ' + (d.match(/guide-product-card-title/g) || []).length);
  console.log('  "NT1 Signature" menciones: ' + (d.match(/NT1 Signature/g) || []).length);
});
