const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'beginner-guitar');

const has = id => g.sections.some(s => s && JSON.stringify(s.products) === JSON.stringify([id]));
[102, 68, 459, 313, 554].forEach(id => { if (has(id)) { console.log(id + ' ya tiene seccion, aborto'); process.exit(1); } });

g.sections.push({
  heading: 'Yamaha FG800: The Solid-Top Dreadnought Everyone Recommends',
  heading_es: 'Yamaha FG800: la dreadnought de tapa sólida que todos recomiendan',
  products: [102],
  content: '<p><strong>The FG800 is the default answer when someone asks which acoustic to start on, and the reason is the solid spruce top.</strong> Solid wood vibrates more freely than laminate, so the guitar sounds rich and resonant now and opens up further the more it gets played. The nato back and sides, nato neck and rosewood fingerboard keep the price at around $229 while the traditional dreadnought body projects well for strumming and fingerpicking alike.</p>' +
    '<p><strong>Know the limits.</strong> There are no electronics, so plugging into an amp or PA means adding a pickup later. And the full-size dreadnought body can overwhelm smaller players — kids and petite beginners should look at smaller bodies or the short-scale electrics instead.</p>',
  content_es: '<p><strong>La FG800 es la respuesta por defecto cuando alguien pregunta con qué acústica empezar, y el motivo es la tapa de picea sólida.</strong> La madera sólida vibra con más libertad que la laminada, así que la guitarra suena rica y resonante ahora y se abre más cuanto más se toca. El fondo y los aros de nato, el mástil de nato y el diapasón de palo rosa mantienen el precio en unos $229 mientras el cuerpo dreadnought tradicional proyecta bien tanto rasgueo como fingerpicking.</p>' +
    '<p><strong>Conviene saber los límites.</strong> No hay electrónica, así que enchufarla a un ampli o una PA exige añadir una pastilla después. Y el cuerpo dreadnought de tamaño completo puede superar a músicos pequeños: niños y principiantes menudos miran mejor cuerpos pequeños o las eléctricas de escala corta.</p>'
});

g.sections.push({
  heading: 'Fender CD-60S: The Campfire Dreadnought That Started Millions',
  heading_es: 'Fender CD-60S: la dreadnought de fogata de millones',
  products: [68],
  content: '<p><strong>The CD-60S is the acoustic that started millions of players, and it earns that with a solid spruce top over mahogany back and sides.</strong> Scalloped X-bracing lets the top move, projecting a balanced tone that fills a room without an amp. The easy-playing neck profile, 20 walnut frets and 25.3-inch scale make first chords and transitions friendlier than the spec sheet suggests, at around $219.</p>' +
    '<p><strong>Know the limits.</strong> Laminate back and sides trade resonance for durability and price, so it will not grow with you the way a solid-wood guitar does. And it is still a full-size dreadnought — smaller players may find it a big body to wrestle.</p>',
  content_es: '<p><strong>La CD-60S es la acústica con la que empezaron millones, y se lo gana con tapa de picea sólida sobre fondo y aros de caoba.</strong> El varetaje en X scalloped deja moverse la tapa, proyectando un tono equilibrado que llena una sala sin ampli. El perfil de mástil fácil, 20 trastes de nogal y escala de 25,3 pulgadas hacen los primeros acordes y transiciones más amables de lo que sugiere la ficha, por unos $219.</p>' +
    '<p><strong>Conviene saber los límites.</strong> Fondo y aros laminados cambian resonancia por durabilidad y precio, así que no crecerá contigo como una guitarra de maderas sólidas. Y sigue siendo una dreadnought de tamaño completo: los músicos pequeños quizá la encuentren un cuerpo grande de domar.</p>'
});

g.sections.push({
  heading: 'Yamaha C40: The Classroom Classical for Sore-Free Fingers',
  heading_es: 'Yamaha C40: la clásica de clase para dedos sin dolor',
  products: [459],
  content: '<p><strong>The C40 is the world\'s favorite student classical for one reason: nylon strings are far gentler on fingertips than steel.</strong> A spruce top over meranti back and sides gives a warm, balanced voice for classical and fingerstyle, with a comfortable slim classical neck, 19 rosewood frets and a full 650 mm scale at around $169.99. Guitar teachers buy them by the classroom because they stay in tune and survive beginners.</p>' +
    '<p><strong>Know the limits.</strong> It speaks classical, flamenco and fingerstyle and little else — rock, pop strumming and steel-string tones live elsewhere. The wide classical neck takes getting used to if you are switching from steel strings, there are no electronics, and its low volume gets lost beside steel-string guitars.</p>',
  content_es: '<p><strong>La C40 es la clásica de estudiante favorita del mundo por un motivo: las cuerdas de nailon son mucho más amables con las yemas que el acero.</strong> Tapa de picea sobre fondo y aros de meranti para una voz cálida y equilibrada en clásica y fingerstyle, con mástil clásico fino y cómodo, 19 trastes de palo rosa y escala completa de 650 mm por unos $169.99. Los profesores las compran por aulas porque aguantan afinación y principiantes.</p>' +
    '<p><strong>Conviene saber los límites.</strong> Habla clásica, flamenco y fingerstyle y poco más: el rock, el rasgueo pop y los tonos de acero viven en otro lado. El mástil ancho clásico exige adaptación si vienes del acero, no hay electrónica y su volumen bajo se pierde junto a guitarras de acero.</p>'
});

g.sections.push({
  heading: 'Squier Sonic Mustang: A Real Fender for Small Hands',
  heading_es: 'Squier Sonic Mustang: una Fender de verdad para manos pequeñas',
  products: [313],
  content: '<p><strong>The Sonic Mustang is the cheapest real Fender-family guitar, and its trick is the 24-inch short scale.</strong> Shorter scale means slinkier strings and closer frets, so small hands fret cleanly where a full-size neck fights back. The compact offset poplar body stays light, the slim C-shaped maple neck carries 22 frets, and two ceramic single-coils deliver genuine Fender sparkle for indie and alternative jangle at around $209. Sealed die-cast tuners and chrome hardware keep it reliable.</p>' +
    '<p><strong>Know the limits.</strong> The short scale that helps small hands feels cramped for large hands, the thin single-coil tone needs amp help for heavy rock, and the basic hardware means planning a tuner upgrade down the road. Heavy pickers will also find it drifts out of tune faster.</p>',
  content_es: '<p><strong>La Sonic Mustang es la Fender de verdad más barata, y su truco es la escala corta de 24 pulgadas.</strong> Menos escala significa cuerdas más blandas y trastes más juntos, así que las manos pequeñas pisan limpio donde un mástil completo se resiste. El cuerpo offset compacto de álamo pesa poco, el fino mástil de arce en C lleva 22 trastes y dos single-coils cerámicos dan el brillo Fender genuino para el jangle indie y alternativo por unos $209. Clavijero sellado fundido y herrajes cromados la mantienen fiable.</p>' +
    '<p><strong>Conviene saber los límites.</strong> La escala corta que ayuda a manos pequeñas agobia a manos grandes, el fino tono single-coil pide ayuda del ampli para rock pesado y el hardware básico anticipa una mejora de clavijero más adelante. Los púas fuertes también notarán que desafina antes.</p>'
});

g.sections.push({
  heading: 'Takamine GC1: The Tank-Built Classical With a Truss Rod',
  heading_es: 'Takamine GC1: la clásica blindada con alma ajustable',
  products: [554],
  content: '<p><strong>The GC1 is the classical you buy when the C40 feels too delicate: a fan-braced spruce top with mahogany back, sides and neck, built like a tank.</strong> It holds tuning through heat and humidity swings that knock cheaper guitars out, and the adjustable two-way truss rod — rare at around $349 — lets a tech keep the action low for years instead of watching the neck drift. Nineteen laurel frets on a 650 mm scale complete the traditional formula.</p>' +
    '<p><strong>Know the limits.</strong> The traditional wide nut challenges small hands, and there is no pickup, so amplified playing needs an external solution. It costs roughly twice the C40 for durability rather than tone.</p>',
  content_es: '<p><strong>La GC1 es la clásica que compras cuando la C40 te parece delicada: tapa de picea con varetaje de abanico, fondo, aros y mástil de caoba, blindada.</strong> Aguanta la afinación entre calores y humedades que descolocan a guitarras baratas, y el alma ajustable de doble acción — rara por unos $349 — deja al técnico mantener la acción baja durante años en vez de ver derivar el mástil. Diecinueve trastes de laurel en escala de 650 mm completan la fórmula tradicional.</p>' +
    '<p><strong>Conviene saber los límites.</strong> La cejuela ancha tradicional reta a manos pequeñas y no hay pastilla, así que tocar amplificado exige solución externa. Cuesta roughly el doble que la C40 por durabilidad más que por tono.</p>'
});

// Corregir calco colado
const gc1 = g.sections[g.sections.length - 1];
gc1.content_es = gc1.content_es.split('Cuesta roughly el doble').join('Cuesta casi el doble');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// Controles
console.log('secciones:', g.sections.length);
const dup = g.sections.map(s => s.heading).filter((x, i, a) => a.indexOf(x) !== i);
console.log('headings duplicados:', dup.length ? [...new Set(dup)].join(' | ') : 'ninguno');
let nulls = 0, noBtn = 0;
g.sections.forEach(s => { if (!s) nulls++; else if (!s.products || !s.products.length) noBtn++; });
console.log('nulos:', nulls, '| sin boton:', noBtn);
console.log('roughly en ES:', gc1.content_es.includes('roughly') ? 'SIGUE' : 'no');