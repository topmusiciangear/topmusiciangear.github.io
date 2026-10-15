const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/add_faqs.js';
let s = fs.readFileSync(f, 'utf8');
const pre = `// rellenar primero los ES que faltan en guias antiguas
guides.forEach(g => {
  const fq = g.featuredSnippet;
  if (!fq) return;
  for (let k = 1; k <= 8; k++) {
    if (fq['faq_q' + k + '_en'] && !fq['faq_q' + k + '_es']) {
      fq['faq_q' + k + '_es'] = fq['faq_q' + k + '_en'];
      console.log(g.id + ': Q' + k + ' ES relleno provisorio');
    }
  }
});`;
const pre2 = `// ES propio de j48-vs-rndi (las respuestas de esa guia estaban solo en ingles)
const GJ = guides.find(x => x.id === 'j48-vs-rndi').featuredSnippet;
GJ.faq_q1_es = '\u00bfCu\u00e1l es mejor para bajo en directo, el Radial J48 o el Rupert Neve RNDI?';
GJ.faq_q2_es = '\u00bfCu\u00e1l es la diferencia entre el Radial J48 y el Rupert Neve RNDI?';
GJ.faq_a1_es = 'El Radial J48 es la opci\u00f3n m\u00e1s segura en directo: es transparente, est\u00e1 construido como un tanque y todo ingeniero de sonido lo conoce. El Rupert Neve RNDI a\u00f1ade el calor de un transformador y un margen de ganancia extraordinario, lo que suena incre\u00edble pero cuyo color puede no encajar en todos los g\u00e9neros. Para la mayor\u00eda de los casos, en una gira o en un club, el J48 es el que menos te va a haceragic y el RNDI el que te va a dar el sonido de estudio con el que sue\u00f1an. Prueba los dos con el mismo bajo antes de decidir, y lleva el J48 al escenario y el RNDI al estudio si puedes.';
GJ.faq_a2_es = 'El J48 es una DI activa transparente con fuente de alimentaci\u00f3n conmutada que extrae el m\u00e1ximo margen de los 48 V de alimentaci\u00f3n fantasma. El RNDI usa transformadores Rupert Neve a medida y amplificadores FET de clase A para a\u00f1adir riqueza arm\u00f3nica y admitirse instrumentos de hasta +20,5 dBu. En la pr\u00e1ctica: el J48 reproduce lo que toca tu bajo sin a\u00f1adir nada, y el RNDI coloca su propia firma sobre la se\u00f1al, m\u00e1s como un pedal. Los dos son de un solo canal, as\u00ed que una configuraci\u00f3n est\u00e9reo necesita dos.';
console.log('j48-vs-rndi: Q1/Q2 EN+ES completos con traducci\u00f3n propia');

` + pre;
s = s.replace(pre, pre2);
fs.writeFileSync(f, s, 'utf8');
console.log('bloque ES j48 insertado: ' + (s.includes('ES propio de j48') ? 'ok' : 'NO'));