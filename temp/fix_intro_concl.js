const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

g.intro = `<p>There is no factory bundle that solves a home studio, and the ones that exist go out of stock every few weeks. What works is arithmetic: you have a budget, the signal chain has five parts, and every part has a price. Get the order right and the money disappears into gear that earns it.</p><p>Three builds sit below, assembled from individual products and priced from our own catalogue. The cheapest comes to <strong>$426</strong>, the middle to <strong>$816</strong>, and the one with real monitors to <strong>$905</strong>. Every one of them already pays for acoustic treatment, because that is the part that decides whether the rest works.</p>`;
g.intro_es = `<p>No hay ningún pack de fábrica que resuelva un estudio doméstico, y los que existen se agotan cada pocas semanas. Lo que funciona es aritmética: tienes un presupuesto, la cadena de señal tiene cinco partes y cada parte tiene un precio. Acierta el orden y el dinero desaparece en equipo que se lo gana.</p><p>Abajo hay tres montajes, armados con productos sueltos y con precios de nuestro propio catálogo. El más barato sale por <strong>$426</strong>, el intermedio por <strong>$816</strong> y el que lleva monitores de verdad por <strong>$905</strong>. Los tres pagan ya el tratamiento acústico, porque esa es la parte que decide si el resto funciona.</p>`;

g.conclusion = `<p>Start with the Budget build and the SM57. It is the cheapest honest way to find out whether you actually like recording yourself, and every part of it can move to the next tier without being wasted.</p><p>The Pro Producer is the one to buy if you are going to sing. The NT1 5th Generation is the quietest large-diaphragm condenser available new, and the ATH-M50x will not flatter anything you mix. That combination catches mistakes instead of hiding them, which is the only reason a mixing headphone is worth buying.</p><p>Add the Rokit 7 G5 pair only when you have treated the room and you need to judge low end. Before that, the headphones are not a compromise — they are the right tool for the hour of the day you are actually working.</p><p>And whatever you spend on the rest, do not skip the panels. The cheapest microphone in any of these builds will sound better in a treated room than the most expensive one will sound in an untreated bedroom.</p>`;
g.conclusion_es = `<p>Empieza por el montaje Básico y el SM57. Es la forma barata y honesta de averiguar si de verdad te gusta grabarte, y cada pieza se puede mover al siguiente tier sin desperdiciarse.</p><p>El Productor Profesional es el que hay que comprar si vas a cantar. El NT1 5th Generation es el condensador de diafragma grande más silencioso que hay nuevo, y los ATH-M50x no van a adular nada de lo que mezcles. Esa combinación atrapa los errores en vez de esconderlos, y esa es la única razón por la que merece la pena comprar auriculares de mezcla.</p><p>Añade el par de Rokit 7 G5 solo cuando hayas tratado la sala y necesites juzgar el grave. Antes de eso, los auriculares no son un compromiso: son la herramienta correcta para la hora del día en la que realmente trabajas.</p><p>Y whatever que gastes en lo demás, no te saltes los paneles. El micrófono más barato de cualquiera de estos montajes sonará mejor en una sala tratada que el más caro en un dormitorio sin tratar.</p>`;

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('intro y conclusion reescritas (EN + ES)');

// verificar que ninguna empieza en minuscula
function check(s, campo){
  if(!s) return 'vacio';
  const t = String(s).replace(/<[^>]+>/g,'').trim();
  const m = t.match(/[A-Za-zÁÉÍÓÚÑ]/);
  if(!m) return 'sin letras';
  return m[0]===m[0].toLowerCase() ? 'MINUSCULA: "'+t.slice(0,60)+'"' : 'ok';
}
console.log('intro:    ' + check(g.intro));
console.log('intro_es: ' + check(g.intro_es));
console.log('concl:    ' + check(g.conclusion));
console.log('concl_es: ' + check(g.conclusion_es));
console.log('\ntitulo EN: ' + g.titleTag + '  [' + g.titleTag.length + ']');
console.log('titulo ES: ' + g.titleTag_es + '  [' + g.titleTag_es.length + ']');
const cjk = (JSON.stringify(guides).match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));