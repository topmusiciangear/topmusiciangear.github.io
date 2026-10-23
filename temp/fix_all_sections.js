const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let c = fs.readFileSync(path, 'utf8');
let obj = JSON.parse(c);
const g = obj.find(x => x.id === 'best-monitors');

console.log('=== CORRIGIENDO TÍTULOS EN INGLÉS Y DUPLICADOS ===\n');

// 1. Corregir títulos EN para secciones 1-4 (estaban en español)
g.sections[1].heading = 'Kali Audio LP-6 V2: Boundary EQ for Any Room';
g.sections[2].heading = 'KRK Rokit 7 G5: Generous Bass for Home Studios';
g.sections[3].heading = 'Yamaha HS8: The Honest Standard That Translates Your Mixes';
g.sections[4].heading = 'Adam Audio A7V: X-ART Ribbon Detail for Micro-Detail';

console.log('1-4. Títulos EN corregidos');

// 2. Sección 5 es DUPLICADO de Adam A7V (sección 4).
// Según el orden de productos, la sección 5 debería ser Genelec 8010A
// Verificar contenido actual de sección 5
console.log('Sección 5 actual:', g.sections[5].heading_es);
console.log('Sección 5 contenido ES:', g.sections[5].content_es.substring(0, 100));

// La sección 5 debería ser Genelec 8010A (título ES ya correcto en sección 6)
// Mover contenido de sección 6 a 5, y luego ajustar el resto
// Sección 6 es Genelec 8010A - mover a sección 5
g.sections[5].heading = g.sections[6].heading;
g.sections[5].heading_es = g.sections[6].heading_es;
g.sections[5].content = g.sections[6].content;
g.sections[5].content_es = g.sections[6].content_es;
console.log('5. Sección 5 <- Sección 6 (Genelec 8010A)');

// Sección 7 (Neumann KH 80 DSP) -> mover a sección 6
g.sections[6].heading = g.sections[7].heading;
g.sections[6].heading_es = g.sections[7].heading_es;
g.sections[6].content = g.sections[7].content;
g.sections[6].content_es = g.sections[7].content_es;
console.log('6. Sección 6 <- Sección 7 (Neumann KH 80 DSP)');

// Sección 8 (Genelec 8351B) -> mover a sección 7
g.sections[7].heading = g.sections[8].heading;
g.sections[7].heading_es = g.sections[8].heading_es;
g.sections[7].content = g.sections[8].content;
g.sections[7].content_es = g.sections[8].content_es;
console.log('7. Sección 7 <- Sección 8 (Genelec 8351B)');

// Sección 9 (Kali IN-UNF) -> mover a sección 8
g.sections[8].heading = g.sections[9].heading;
g.sections[8].heading_es = g.sections[9].heading_es;
g.sections[8].content = g.sections[9].content;
g.sections[8].content_es = g.sections[9].content_es;
console.log('8. Sección 8 <- Sección 9 (Kali IN-UNF)');

// Sección 10 (Kali LP-UNF) -> mover a sección 9
g.sections[9].heading = g.sections[10].heading;
g.sections[9].heading_es = g.sections[10].heading_es;
g.sections[9].content = g.sections[10].content;
g.sections[9].content_es = g.sections[9].content_es;
console.log('9. Sección 9 <- Sección 10 (Kali LP-UNF)');

// Sección 11 (Focal Shape 65) -> mover a sección 10
g.sections[10].heading = g.sections[11].heading;
g.sections[10].heading_es = g.sections[11].heading_es;
g.sections[10].content = g.sections[11].content;
g.sections[10].content_es = g.sections[11].content_es;
console.log('10. Sección 10 <- Sección 11 (Focal Shape 65)');

// Eliminar la última sección (ahora duplicada al final)
g.sections.splice(11, 1);
console.log('11. Última sección duplicada eliminada');

// 3. Corregir título EN de sección 1 (estaba en español)
g.sections[1].heading = 'Kali Audio LP-6 V2: Boundary EQ for Any Room';

// 4. Corregir título EN de sección 0 (ya está bien)
console.log('Sección 0 EN:', g.sections[0].heading);

// Guardar
fs.writeFileSync(path, JSON.stringify(obj, null, 2));
console.log('\n=== GUARDADO ===');

// Verificar
const obj2 = JSON.parse(fs.readFileSync(path, 'utf8'));
const g2 = obj2.find(x => x.id === 'best-monitors');
console.log('\n=== VERIFICACIÓN ===');
for(let i=0; i<g2.sections.length; i++) {
  console.log('Sección ' + i + ':');
  console.log('  ES:', g2.sections[i].heading_es);
  console.log('  EN:', g2.sections[i].heading);
  console.log('');
}