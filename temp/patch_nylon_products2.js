// Fix product-card copy (desc/desc_es) for the 10 nylon guitar products:
// factual correction (C40II scale), ES terminology, natural ES, decimal commas.
const fs = require('fs');
const FILE = 'data/products.json';
let raw = fs.readFileSync(FILE, 'utf8');

function sub(oldText, newText, label, expected) {
  const c = raw.split(oldText).length - 1;
  if (c !== (expected === undefined ? 1 : expected)) throw new Error(`[${label}] expected ${expected || 1}, got ${c}`);
  raw = raw.split(oldText).join(newText);
  console.log(`  ${label}: ${c}`);
}

// 459 C40II — "3/4-friendly scale" was wrong (it is a full 650 mm guitar)
sub('with a comfortable slim classical neck and a standard 3/4-friendly scale.',
  'with a comfortable slim classical neck and a true 650 mm scale.', '459 EN scale');
sub('con un mástil clásico fino y cómodo. Sus cuerdas de nylon son mucho más suaves para los dedos que las de acero: la forma más suave posible de empezar a tocar,',
  'con un mástil clásico fino y cómodo y una escala real de 650 mm. Sus cuerdas de nylon son mucho más suaves para los dedos que las de acero: la manera más suave de empezar a tocar,', '459 ES');

// 553 CN-60S
sub('narrow 43mm steel-string-style neck', 'narrow 43 mm steel-string-style neck', '553 EN spacing');
sub('Tapa sólida de abeto, fondo y aros de caoba, diapasón de nogal y bordes redondeados. La primera nylon más cómoda para manos pequeñas y quienes vienen de la eléctrica.',
  'Tapa maciza de abeto, fondo y aros de caoba, diapasón de nogal y bordes redondeados. La guitarra de nylon más cómoda para empezar si tienes manos pequeñas o vienes de la eléctrica.', '553 ES');

// 1058 C5 — avoid repeating "tapa maciza" twice in a row
sub('Tapa sólida de cedro sobre fondo y aros de caoba laminada ofrece un ataque suave',
  'El cedro macizo sobre fondo y aros de caoba laminada ofrece un ataque suave', '1058 ES');

// 1059 R121
sub('Es un arranque listo para tocar que suena más grande de lo que cuesta.',
  'Es una guitarra lista para tocar que suena más grande de lo que cuesta.', '1059 ES tail');

// 1060 Taylor
sub('gives a warm yet punchy tone', 'gives a warm yet lively tone', '1060 EN punchy');
sub('Una tapa sólida de abeto torrefactado', 'Una tapa maciza de abeto torrefactado', '1060 ES top');
sub('la cejuela de 1 7/8\\" mantiene el espaciado clásico',
  'la cejuela de 47,6 mm mantiene el espaciado clásico', '1060 ES nut');
sub('que buscan jugabilidad Taylor con calidez de nylon.',
  'que buscan el tacto Taylor con la calidez del nylon.', '1060 ES tail');

// 1061 CG122MSH
sub('El acabado mate se siente rápido', 'El acabado mate deja deslizar la mano', '1061 ES finish');
sub('Es un paso por encima de las principiantes laminadas sin llegar a precios profesionales.',
  'Es un paso por encima de las laminadas de iniciación sin llegar a precios profesionales.', '1061 ES tail');

// 1062 Ibanez
sub('Una electro-clásica de cuerpo fino', 'Una electroclásica de cuerpo fino', '1062 ES spelling');
sub('se conecta directo a la PA sin equipo extra.', 'se conecta directo al equipo de PA sin añadir nada más.', '1062 ES tail');

// 1064 Admira
sub('sin romper la banca', 'sin dispararse de precio', '1064 ES calco');
sub('aunque los jugadores más pequeños pueden preferir la opción 3/4.',
  'aunque los guitarristas más pequeños pueden preferir el tamaño 3/4.', '1064 ES tail');

// 1065 Takamine
sub('y cejuela de 50.8 mm se sienten tradicionales', 'y cejuela de 50,8 mm se sienten tradicionales', '1065 ES decimal');
sub('para estudiantes que quieren enchufar en clases o pequeños conciertos sin gastar mucho.',
  'para estudiantes que quieren enchufarla en clase o en pequeños conciertos sin gastar mucho.', '1065 ES tail');

fs.writeFileSync(FILE, raw, 'utf8');

const arr = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const ids = [459, 553, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065];
const bad = ['tapa sólida', 'Tapa sólida', 'punchy', 'electro-clásica', 'sin romper la banca', 'jugabilidad', 'se siente rápido', 'jugadores', 'arranque listo', '50.8'];
for (const id of ids) {
  const p = arr.find(x => x.id === id);
  const s = JSON.stringify({ d: p.desc, e: p.desc_es });
  const hits = bad.filter(n => s.includes(n));
  if (hits.length) console.log('LEFT', id, hits.join(','));
}
console.log('JSON valid, products:', arr.length);
