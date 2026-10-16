const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'mixing-plugins');
g.sections.push({
  heading: 'Pro-Q 4: The Surgical EQ Every Mix Needs',
  heading_es: 'Pro-Q 4: El EQ Quirúrgico Que Toda Mezcla Necesita',
  products: [62],
  content: '<p><strong>Pro-Q 4 is the EQ other EQs get measured against.</strong> Twenty-four bands, per-band dynamic mode, linear-phase operation and a spectrum analyzer that shows what you are cutting before you touch it. From high-passing mud to notching resonances to gentle mastering air, one instance replaces three plugins.</p><p>If the Total Bundle is more than you need, this single purchase covers EQ for mixing and mastering. It is the most-bought plugin in this guide for a reason: nobody outgrows it.</p>',
  content_es: '<p><strong>Pro-Q 4 es el EQ contra el que se miden los demás.</strong> Veinticuatro bandas, modo dinámico por banda, operación de fase lineal y un analizador que muestra lo que cortas antes de tocarlo. Desde limpiar graves con pasa-altos hasta recortar resonancias o dar aire en mastering, una instancia reemplaza tres plugins.</p><p>Si el Total Bundle es más de lo que necesitas, esta sola compra cubre el EQ de mezcla y mastering. Es el plugin más vendido de esta guía por algo: nadie lo supera con el tiempo.</p>',
  pros: ['24 bands with per-band dynamic mode', 'Linear-phase operation for mastering', 'Spectrum analyzer shows problems first', 'Replaces three EQ plugins in one'],
  pros_es: ['24 bandas con modo dinámico por banda', 'Fase lineal para mastering', 'El analizador muestra problemas primero', 'Reemplaza tres EQs en uno'],
  cons: ['No analog color or saturation', 'Feature depth overwhelms beginners', 'No bundle discount when bought alone', 'Interface rewards precision over speed'],
  cons_es: ['Sin color analógico ni saturación', 'La profundidad abruma a principiantes', 'Sin descuento de bundle al comprar solo', 'La interfaz premia precisión sobre velocidad']
});
g.featuredProducts.push(62);
g.verdictProsCons.push({ name: 'FabFilter Pro-Q 4', name_es: 'FabFilter Pro-Q 4',
  pros: ['Surgical 24-band EQ', 'Dynamic mode per band', 'Linear phase + analyzer', 'One EQ for mix and master'],
  pros_es: ['EQ quirúrgico de 24 bandas', 'Modo dinámico por banda', 'Fase lineal + analizador', 'Un EQ para mezcla y master'],
  cons: ['No analog color', 'Deep for beginners', 'No bundle discount', 'Precision over speed'],
  cons_es: ['Sin color analógico', 'Profundo para principiantes', 'Sin descuento bundle', 'Precisión sobre velocidad'] });
const t = g.productTable;
t.columns.push({ title: 'FabFilter Pro-Q 4', title_es: 'FabFilter Pro-Q 4' });
const vals = [
  ['Surgical EQ for mixing & mastering', 'EQ quirúrgico para mezcla y mastering'],
  ['Dynamic/parametric EQ', 'EQ paramétrico/dinámico'],
  ['VST2/VST3/AU/AAX', 'VST2/VST3/AU/AAX'],
  ['macOS & Windows', 'macOS y Windows'],
  ['License file', 'Archivo de licencia'],
  ['Ultra-low', 'Ultrabaja'],
  ['24 bands + dynamic EQ + linear phase', '24 bandas + EQ dinámico + fase lineal']
];
t.rows.forEach((r, i) => r.values.push({ value: vals[i][0], value_es: vals[i][1] }));
g.verdict = g.verdict + ' Pro-Q 4 on its own covers all EQ duties for a fraction of the bundle.';
g.verdict_es = g.verdict_es + ' Pro-Q 4 por sí solo cubre todo el EQ por una fracción del bundle.';
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Pro-Q 4 añadido: sec=' + g.sections.length + ' feat=' + g.featuredProducts.length + ' cols=' + t.columns.length);
