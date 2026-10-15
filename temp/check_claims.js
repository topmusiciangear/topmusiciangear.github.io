// Verificar CADA afirmacion del usuario contra el texto actual
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const g = guides.find(x=>x.id==='starter-studio');
const texto = JSON.stringify(g);

const CHECK = [
  ['A) KRK: "woofer de 8 pulgadas"', /woofer de 8 pulgadas/i],
  ['A) KRK: "de 7 pulgadas" o "7\"', /woofer de 7 pulgadas|7" Woven/i],
  ['B) "es la misma interfaz"', /es la misma interfaz/i],
  ['C) "La 2i2 y la SSL 2+ dan"', /La 2i2 y la SSL 2\+ dan/i],
  ['C) "4K Legacy de la SSL 2+" (sin MKII)', /4K Legacy de la SSL 2\+ MKII/i],
  ['D) "$485" en el texto', /\$485/],
  ['D) "$475"', /\$475/],
  ['E) "que quepan cuatro"', /que quepan cuatro/i],
  ['E) "cinco quepan"', /cinco quepan/i],
  ['F) "qué compra de verdad" (calco)', /¿?Qué compra de verdad/i],
  ['F) "qué se compra de verdad con" (arreglado)', /qué se compra de verdad con/i],
  ['G) "un soporte para que el micro no esté en tu mano"', /para que el micro no esté en tu mano/i],
  ['H) "la que nadie presupuesta"', /la que nadie presupuesta/i],
  ['H) "la que casi nadie presupuesta"', /la que casi nadie presupuesta/i],
  ['I) "Monitores que no puedes saltarte"', /no puedes saltarte/i],
  ['J) "el más con autoridad"', /el más con autoridad/i],
  ['K) "trapping de graves"', /trapping de graves/i],
  ['L) "deshace el micrófono"', /deshace el micrófono/i],
  ['M) "dan las dos dos"', /las dos dos/i],
  ['N) "para dar forma tú"', /para dar forma tú/i],
  ['O) "Un micrófono dinámico como el SM57 no le importa"', /Un micrófono dinámico como el SM57 no le importa/i],
  ['O) "A un micrófono dinámico"', /A un micrófono dinámico/i],
  ['P) "volverá rebotando"', /volverá rebotando/i],
  ['Q) MKII en el veredicto', /SSL 2\+ MKII/]
];

console.log('=== VERIFICACION DE CADA AFIRMACION ===');
CHECK.forEach(([label, re])=>{
  const m = texto.match(re);
  console.log((m ? 'PRESENTE ' : 'AUSENTE  ') + label);
});

// contexto de los problemas confirmados
console.log('\n=== CONTEXTO ===');
const ctx = (re, n=90) => {
  const m = texto.match(re);
  if(!m) return;
  let i = texto.indexOf(m[0]);
  console.log('\n["' + m[0] + '"]');
  console.log('  ...' + texto.slice(Math.max(0,i-n), i+m[0].length+n).replace(/\\n/g,' ').replace(/<[^>]+>/g,' ') + '...');
};
[/woofer de 8 pulgadas/i, /la que nadie presupuesta/i, /Monitores que no puedes saltarte/i,
 /el más con autoridad/i, /trapping de graves/i, /deshace el micrófono/i, /las dos dos/i,
 /para dar forma tú/i, /volverá rebotando/i, /para que el micro no esté en tu mano/i]
 .forEach(r=>ctx(r));

// precio real del M20x en el catalogo
console.log('\n=== PRECIO REAL M20x (id 609) ===');
const m20 = list.find(x=>x.id===609);
console.log('  price canonico: $' + m20.price);
console.log('  precio del Aston Shield GN (id 39): $' + list.find(x=>x.id===39).price);
console.log('  426 + 59 = ' + (426+59) + '   |   426 + 49 = ' + (426+49));

//KRK en catalogo
const krk = list.find(x=>/Rokit 7 G5/.test(x.title));
console.log('\n=== KRK Rokit 7 G5 en catalogo ===');
console.log('  ' + krk.title + '  $' + krk.price);
console.log('  desc: ' + krk.desc);
console.log('  desc_es: ' + krk.desc_es);