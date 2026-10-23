const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let c = fs.readFileSync(path, 'utf8');
let obj = JSON.parse(c);
const g = obj.find(x => x.id === 'best-monitors');

console.log('=== AGREGANDO SECCIÓN JBL 305P MkII FALTANTE ===');

// Crear la sección de JBL 305P MkII (insertar en índice 1, después de intro)
const jblSection = {
  "heading": "JBL 305P MkII: Compact Nearfield Mixing",
  "heading_es": "JBL 305P MkII: Mezcla de campo cercano compacta",
  "content": "<p><strong>The JBL 305P MkII is one of the most popular budget studio monitors in existence, and for good reason.</strong> JBL's patented Image Control Waveguide creates a remarkably wide sweet spot, so you don't need to glue your head in one spot to hear the stereo image. The 5-inch woofer with JBL's Slip Stream port delivers tight, accurate bass in any room. At under $300 a pair, nothing else delivers this much soundstage and detail for the money. Before buying, note the bass rolls off around 49 Hz, so bass-heavy genres may want a subwoofer. For the price, it is the benchmark.</p>",
  "content_es": "<p><strong>El JBL 305P MkII es uno de los monitores de estudio económicos más populares que existen, y con razón.</strong> La guía de onda Image Control patentada de JBL crea un punto óptimo notablemente amplio, así que no necesitas mantener la cabeza fija para escuchar la imagen estéreo. El woofer de 5 pulgadas con el puerto Slip Stream de JBL entrega graves ajustados y precisos en cualquier habitación. Por menos de $300 el par, nada más entrega esta imagen estéreo y detalle por el precio. Antes de comprar, ten en cuenta que los graves bajan hasta 49 Hz, así que géneros con mucho bajo pueden querer un subwoofer. Por el precio, es el referente.</p>",
  "products": [116]
};

// Insertar en índice 1 (después de la intro)
g.sections.splice(1, 0, jblSection);

console.log('Sección JBL 305P MkII agregada en índice 1');

fs.writeFileSync(path, JSON.stringify(obj, null, 2));
console.log('Guardado');

// Verificar
const obj2 = JSON.parse(fs.readFileSync(path, 'utf8'));
const g2 = obj2.find(x => x.id === 'best-monitors');
console.log('\n=== VERIFICACIÓN ===');
console.log('Total secciones:', g2.sections.length);
for(let i=0; i<=11; i++) {
  console.log(i + ': ' + g2.sections[i].heading_es);
}