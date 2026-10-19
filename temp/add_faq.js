const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-headphones-for-mixing');

g.faq = [
  {
    q: 'Is the Audeze MM-500 the best headphone for mixing in this guide?',
    q_es: '¿Son los Audeze MM-500 los mejores auriculares para mezclar de esta guía?',
    a: 'Yes, if you want one reference that behaves like a nearfield monitor. The planar magnetic drivers keep the low end extended and the top end straight, so mixes made on the MM-500 hold up on speakers better than on the average headphone. The machined aluminium and spring steel chassis is lighter than the LCD-X it resembles, and the open-back design breathes like a treated room. The honest limit is the format: it leaks sound, so it will never track, and at $1,699 it is the most expensive pair here. Audeze lists it as a legacy product, so availability can be patchy.',
    a_es: 'Sí, si quieres una referencia que se comporte como un monitor de campo cercano. Los drivers planares mantienen los graves extendidos y los agudos rectos, así que las mezclas hechas en los MM-500 se sostienen en altavoces mejor que en un auricular medio. El chasis de aluminio mecanizado y acero es más ligero que el LCD-X al que se parece, y el diseño abierto respira como una sala tratada. El límite honesto es el formato: fuga sonido, así que nunca grabará, y a $1.699 es el más caro de la guía. Audeze lo lista como producto legacy, así que la disponibilidad puede ser irregular.',
  },
  {
    q: 'Is the Neumann NDH 30 the portable mastering room?',
    q_es: '¿Es el Neumann NDH 30 la sala de masterización portátil?',
    a: 'Yes, for engineers who already trust Neumann monitors. The NDH 30 resolves detail, imaging and depth the way KH-line speakers do, which makes it a portable mastering reference you can take to unfamiliar rooms. Its moderate impedance drives far more easily than classic high-impedance references, so a good interface suffices. The trade is that it wants a good amp and a quiet room, at 354 g it is no featherweight, and the silver finish shows studio wear. It will not track or commute.',
    a_es: 'Sí, para ingenieros que ya confían en los monitores Neumann. El NDH 30 resuelve detalle, imagen y profundidad como los altavoces de la línea KH, lo que lo convierte en una referencia de masterización portátil que puedes llevar a salas desconocidas. Su impedancia moderada se alimenta mucho más fácil que las referencias clásicas de alta impedancia, así que basta una buena interfaz. La contrapartida es que pide un buen amplificador y una sala tranquila, con 354 g no es un plumazo y el acabado plateado muestra el desgaste de estudio. No grabará ni servirá para moverse.',
  },
  {
    q: 'Is the Beyerdynamic DT 990 Pro good for mixing?',
    q_es: '¿Sirven los Beyerdynamic DT 990 Pro para mezclar?',
    a: 'For budget mixing, yes. The open-back design gives a wide soundstage with excellent stereo imaging, which makes EQ decisions, stereo placement and reverb levels easier to judge. The lifted treble exposes sibilance and harshness early, which is useful even if it can fatigue ears sensitive to brightness. At 250 ohms it benefits from a headphone amp, but it works with interfaces like the Focusrite Scarlett 2i2. The fixed 3 m coiled cable is not detachable, unlike the M50x.',
    a_es: 'Para mezcla de presupuesto, sí. El diseño abierto da un escenario sonoro amplio con excelente imagen estéreo, lo que facilita las decisiones de EQ, colocación estéreo y niveles de reverberación. Los agudos realzados exponen sibilancia y dureza desde el principio, lo que es útil aunque puede fatigar a quienes son sensibles al brillo. A 250 ohms se beneficia de un amplificador de auriculares, pero funciona con interfaces como la Focusrite Scarlett 2i2. El cable enrollado fijo de 3 m no es desmontable, a diferencia del M50x.',
  },
  {
    q: 'Is the Beyerdynamic DT 770 Pro good for tracking?',
    q_es: '¿Sirven los Beyerdynamic DT 770 Pro para grabar?',
    a: 'Yes, it is the closed-back workhorse. The passive isolation keeps a loud singer from bleeding into the mic, and the velour pads plus gentle clamping make it comfortable through a full album session. The bass extension is excellent, which electronic music producers need to hear sub-bass clearly. The honest trade is that a closed-back cannot tell you what a speaker will do with your low end, so a mix decision made on the 770 needs re-checking elsewhere. At $159 it is the value pick in this guide, and the 80-ohm version is the one to buy for tracking.',
    a_es: 'Sí, es el caballo de batalla cerrado. El aislamiento pasivo evita que una voz alta se cuele en el micro, y las almohadillas de terciopelo con presión suave lo hacen cómodo durante una sesión completa de álbum. La extensión de graves es excelente, lo que los productores de música electrónica necesitan para oír los subgraves con claridad. La contrapartida honesta es que un cerrado no puede decirte lo que un altavoz hará con tus graves, así que una decisión de mezcla tomada en el 770 necesita revisarse en otro sitio. A $159 es la opción de valor de esta guía, y la versión de 80 ohms es la que hay que comprar para grabar.',
  },
];

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('FAQs añadidas: ' + g.faq.length);
