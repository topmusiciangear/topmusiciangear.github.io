var fs=require('fs');
var p='data/guides.json';
var d=JSON.parse(fs.readFileSync(p,'utf8'));
var fails=[];
function assert(c,m){ if(!c) fails.push(m); }
assert(!d.some(function(x){return x.id==='best-stage-keyboards'}),'id taken');
var hub=d.find(function(x){return x.id==='best-keyboard'});
function V(en,es){ return {value:en, value_es:es}; }
function C(t){ return {title:t, title_es:t}; }

var g={
  id: 'best-stage-keyboards',
  title: 'Best Stage Keyboards for Live Performance (Pros, Cons & Buying Guide 2026)',
  title_es: 'Mejores teclados para directo: pianos de escenario y sintes',
  titleTag: 'Best Stage Keyboards for Live Performance (Pros, Cons & Buying Guide 2026)',
  titleTag_es: 'Mejores teclados para directo: pianos de escenario y sintes (pros, contras y guía de compra 2026)',
  category: 'keyboards',
  image: hub.image,
  badge: 'topQuality',
  intro: '<p><strong>On stage, the right keyboard is the one that never makes you look down.</strong> No menu diving mid-song, no cut notes between patches, no dead weight you dread carrying. We compared the 9 best stage keyboards for live performance in 2026 — from the 8.3 kg Nord Electro 7 to 28 kg flagship workstations — by what actually matters under stage lights: hands-on control, dedicated piano/organ/synth engines and seamless transitions.</p><p>Playing at home or in the studio instead? Our <a href="/guides/best-keyboard.html" class="guide-link-btn">Best Keyboards: Piano, Synth & MIDI Controllers</a> guide covers practice, production and home use.</p>',
  intro_es: '<p><strong>En directo, el teclado correcto es el que nunca te hace mirar abajo.</strong> Sin bucear en menús a mitad de tema, sin notas cortadas entre parches, sin peso muerto que temiéramos cargar. Comparamos los 9 mejores teclados para directo en 2026 —del Nord Electro 7 de 8,3 kg a workstations insignia de 28 kg— por lo que importa bajo los focos: control directo, motores dedicados de piano/órgano/sinte y transiciones sin cortes.</p><p>¿Tocas en casa o en el estudio? Nuestra guía de <a href="/guides/best-keyboard_es.html" class="guide-link-btn">Mejores teclados: piano, synth y MIDI</a> cubre práctica, producción y hogar.</p>',
  sections: [],
  conclusion: 'The Nord Stage 4 is still the reference touring keyboard, with the Roland RD-2000 EX as the pianist\u2019s alternative and the Yamaha Montage M8x and Roland Fantom 8 EX as the heavyweight workstations. Organ-driven stages belong to the Yamaha YC88 and the featherweight Nord Electro 7, the Korg Grandstage X covers every base with seven engines, the Arturia AstroLab 61 moves your plugin rig to hardware, and the Yamaha CK88 gigs anywhere on batteries. For the classic pro move, read the Two-Tier Rig Rule above. <p><a href="/guides/best-keyboard.html" class="guide-link-btn">Best Keyboards: Piano, Synth & MIDI Controllers</a> <a href="/guides/best-digital-pianos.html" class="guide-link-btn">Best Digital Pianos</a> <a href="/guides/nord-stage-4-vs-montage-m8x.html" class="guide-link-btn">Nord Stage 4 vs Montage M8x</a></p>',
  conclusion_es: 'El Nord Stage 4 sigue siendo el teclado de gira de referencia, con el Roland RD-2000 EX como alternativa del pianista y el Yamaha Montage M8x y el Roland Fantom 8 EX como workstations pesadas. Los escenarios de órgano son del Yamaha YC88 y del pluma Nord Electro 7, el Korg Grandstage X cubre todo con siete motores, el Arturia AstroLab 61 pasa tu rig de plugins a hardware, y el Yamaha CK88 toca donde sea con pilas. Para el truco clásico pro, lee arriba la regla del rig de doble piso. <p><a href="/guides/best-keyboard_es.html" class="guide-link-btn">Mejores teclados: piano, synth y MIDI</a> <a href="/guides/best-digital-pianos_es.html" class="guide-link-btn">Mejores pianos digitales</a> <a href="/guides/nord-stage-4-vs-montage-m8x_es.html" class="guide-link-btn">Nord Stage 4 vs Montage M8x</a></p>',
  verdict: 'Stage 4 is the reference. RD-2000 EX for piano realism, Montage M8x and Fantom 8 EX for workstation firepower, YC88 and Electro 7 for organ stages, Grandstage X for engine variety, AstroLab 61 for plugin players going hardware, CK88 for battery-powered budget gigs.',
  verdict_es: 'El Stage 4 es la referencia. RD-2000 EX para realismo de piano, Montage M8x y Fantom 8 EX para potencia workstation, YC88 y Electro 7 para escenarios de órgano, Grandstage X para variedad de motores, AstroLab 61 para pasar plugins a hardware, CK88 para bolos baratos con pilas.',
  featuredProducts: [11,637,638,639,640,641,642,643,644],
  relatedGuides: ['best-keyboard','best-digital-pianos','best-synthesizers','nord-stage-4-vs-montage-m8x'],
  description: 'Nord Stage 4, RD-2000 EX, Montage M8x, Fantom 8 EX, YC88, Electro 7 & more compared for 2026. The 9 best stage keyboards for live gigs by weight, engines and outputs.',
  featuredSnippet: {
    title_en: 'Best Stage Keyboards for Live Performance ',
    text_en: 'The Nord Stage 4 is the best stage keyboard for live performance: hands-on controls, dedicated piano/organ/synth engines and seamless transitions. The Yamaha CK88 is the best budget battery-powered gig keyboard.',
    title_es: 'Mejores teclados para directo ',
    text_es: 'El Nord Stage 4 es el mejor teclado para directo: controles directos, motores dedicados de piano/órgano/sinte y transiciones sin cortes. El Yamaha CK88 es el mejor barato con pilas.',
    faq_q1_en: 'How heavy should a stage keyboard be?',
    faq_a1_en: 'The sweet spot is 8–14 kg — light enough to carry in one trip with a case. Flagship 88-key workstations (Montage M8x, Fantom 8 EX) weigh 27–28 kg and need a proper stand, a flight case and a willing bandmate.',
    faq_q1_es: '¿Cuánto debe pesar un teclado de directo?',
    faq_a1_es: 'El punto ideal está entre 8 y 14 kg: bastante ligero para llevarlo en un viaje con funda. Las workstations insignia de 88 teclas (Montage M8x, Fantom 8 EX) pesan 27–28 kg y piden soporte firme, flight case y un compañero dispuesto.',
    faq_q2_en: 'Do I need XLR outputs on a stage keyboard?',
    faq_a2_en: 'They help a lot: XLR feeds go straight to the house console with no DI box and less noise over long cables. The RD-2000 EX, YC88, Montage M8x, Fantom 8 EX and Grandstage X have them; the Stage 4, Electro 7, AstroLab and CK88 need a DI box on big stages.',
    faq_q2_es: '¿Necesito salidas XLR en un teclado de directo?',
    faq_a2_es: 'Ayudan mucho: el XLR va directo a la mesa de sala sin caja DI y con menos ruido en tiradas largas. RD-2000 EX, YC88, Montage M8x, Fantom 8 EX y Grandstage X las traen; Stage 4, Electro 7, AstroLab y CK88 piden DI en escenarios grandes.',
    faq_q3_en: 'One keyboard or a two-tier rig for live shows?',
    faq_a3_en: 'One board covers most bar and club gigs. Pros playing long sets run two tiers: a weighted 88 (Stage 4, RD-2000 EX) below for piano parts and a light 61 (Electro 7, Juno-style synth) above for organ and solos. See the Two-Tier Rig Rule section in this guide.',
    faq_q3_es: '¿Un teclado o rig de doble piso en directo?',
    faq_a3_es: 'Un teclado cubre la mayoría de bolos en salas. Los profesionales en sets largos usan dos pisos: un 88 contrapesado (Stage 4, RD-2000 EX) abajo para pianos y un 61 ligero (Electro 7, sinte) arriba para órgano y solos. Mira la sección de la regla del doble piso en esta guía.'
  },
  description_es: 'Nord Stage 4, RD-2000 EX, Montage M8x, Fantom 8 EX, YC88, Electro 7 y más comparados para 2026. Los 9 mejores teclados de escenario por peso, motores y salidas.',
  author: JSON.parse(JSON.stringify(hub.author)),
  aboutName: 'Stage Keyboards',
  productTable: { title: 'Stage Keyboards Compared in This Guide', title_es: 'Comparativa de teclados de escenario en esta guía', columns: [], rows: [] },
  verdictProsCons: [],
  datePublished: '2026-10-12'
};

var order=[
  ['Nord Stage 4 88','Nord Stage 4 88'],
  ['Roland RD-2000 EX','Roland RD-2000 EX'],
  ['Yamaha YC88','Yamaha YC88'],
  ['Yamaha Montage M8x','Yamaha Montage M8x'],
  ['Roland Fantom 8 EX','Roland Fantom 8 EX'],
  ['Nord Electro 7 61','Nord Electro 7 61'],
  ['Korg Grandstage X','Korg Grandstage X'],
  ['Arturia AstroLab 61','Arturia AstroLab 61'],
  ['Yamaha CK88','Yamaha CK88']
];
order.forEach(function(c){ g.productTable.columns.push(C(c[0])); });
function R(label_es, label, vals){
  var r={label:label, label_es:label_es, values: vals.map(function(v){return V(v[0],v[1])})};
  assert(r.values.length===9,'row len '+label);
  g.productTable.rows.push(r);
}
R('Ideal para','Best For',[
  ['Pro touring & versatility','Giras pro y versatilidad'],
  ['Piano realism & hybrid rigs','Realismo de piano y rigs híbridos'],
  ['Organ & rock stages','Órgano y rock en directo'],
  ['Massive live orchestrations','Orquestaciones enormes en directo'],
  ['Live sequencing & setlists','Secuencias y setlists en directo'],
  ['Lightweight vintage tone','Sonido vintage ligero'],
  ['Multi-engine stage piano','Piano de escenario multi-motor'],
  ['Software-to-stage rigs','Del software al escenario'],
  ['Budget battery gigging','Bolos baratos con pilas']
]);
R('Precio estimado','Estimated Price',[
  ['~$5,999','~$5,999'],
  ['$2,499.99–$2,899.99','$2,499.99–$2,899.99'],
  ['$3,199.99','$3,199.99'],
  ['$4,499.99–$4,699.99','$4,499.99–$4,699.99'],
  ['$4,629.99','$4,629.99'],
  ['$3,299','$3,299'],
  ['$1,999.99','$1,999.99'],
  ['$1,599','$1,599'],
  ['$1,499.99','$1,499.99']
]);
R('Teclas y acción','Keys & Action',[
  ['88 triple-sensor hammer + AT','88 martillo triple sensor + AT'],
  ['88 PHA-50 hybrid wood','88 PHA-50 híbrida madera'],
  ['88 NW-GH3 wooden graded','88 NW-GH3 madera graduada'],
  ['88 GEX weighted + poly AT','88 GEX contrapesadas + AT polifónico'],
  ['88 PHA-50 hybrid + channel AT','88 PHA-50 híbrida + AT de canal'],
  ['61 waterfall semi-weighted','61 waterfall semipesadas'],
  ['88 RH3 hammer','88 martillo RH3'],
  ['61 semi-weighted + AT','61 semipesadas + AT'],
  ['88 GHS graded hammer','88 GHS graduadas']
]);
R('Peso','Weight',[
  ['19.6 kg (43.2 lb)','19,6 kg (43,2 lb)'],
  ['21.7 kg (47 lbs 14 oz)','21,7 kg'],
  ['18.6 kg (41 lb)','18,6 kg'],
  ['28.1 kg (61 lb 15 oz)','28,1 kg'],
  ['27.7 kg (61 lb 2 oz)','27,7 kg'],
  ['8.3 kg (18.3 lb)','8,3 kg (18,3 lb)'],
  ['25 kg (55.12 lb)','25 kg'],
  ['9.9 kg (21.8 lb)','9,9 kg (21,8 lb)'],
  ['13.1 kg (28 lb 14 oz)','13,1 kg']
]);
R('Motores de sonido','Sound Engines',[
  ['Piano + Organ + Wave 2 Synth','Piano + Órgano + Sinte Wave 2'],
  ['V-Piano + SuperNATURAL','V-Piano + SuperNATURAL'],
  ['VCM Organ + AWM2 + FM','VCM Organ + AWM2 + FM'],
  ['AN-X + AWM2 + FM-X','AN-X + AWM2 + FM-X'],
  ['ZEN-Core + V-Piano + ACB','ZEN-Core + V-Piano + ACB'],
  ['Organ 3 + Piano + new Synth','Organ 3 + Piano + Sinte nuevo'],
  ['7 engines (SGX-2 to HD-1)','7 motores (SGX-2 a HD-1)'],
  ['40+ engines, 1,800+ presets','40+ motores, 1.800+ presets'],
  ['AWM2 + organ, 363 voices','AWM2 + órgano, 363 voces']
]);
R('Funciones de directo','Live Features',[
  ['4 zones, 512 programs + 8 Live','4 zonas, 512 programas + 8 Live'],
  ['8 zones, 400 scenes, XLR','8 zonas, 400 escenas, XLR'],
  ['Splits/layers, Live Sets, XLR','Divisiones/capas, Live Sets, XLR'],
  ['Super Knob, balanced outs','Super Knob, salidas balanceadas'],
  ['16 pads, clips, touchscreen','16 pads, clips, táctil'],
  ['Splits, seamless transitions','Divisiones, transiciones fluidas'],
  ['100 favorites, 3-part split, XLR','100 favoritos, división triple, XLR'],
  ['Playlists, splits, USB-C','Listas, divisiones, USB-C'],
  ['3-zone splits, battery + speakers','Divisiones triples, pilas + altavoces']
]);
R('Salidas','Outputs',[
  ['4x 1/4 in unbalanced','4x 6,3 mm no balanceadas'],
  ['XLR + 1/4 in mains','XLR + 6,3 mm principales'],
  ['XLR balanced + 1/4 in','XLR balanceadas + 6,3 mm'],
  ['Balanced TRS + assignable','TRS balanceadas + asignables'],
  ['XLR + 1/4 in + subs','XLR + 6,3 mm + subs'],
  ['2x 1/4 in unbalanced','2x 6,3 mm no balanceadas'],
  ['XLR balanced + 1/4 in','XLR balanceadas + 6,3 mm'],
  ['Stereo TRS, no XLR','TRS estéreo, sin XLR'],
  ['1/4 in unbalanced','6,3 mm no balanceadas']
]);

d.push(g);
if(fails.length){ console.log('FAIL:\n'+fails.join('\n')); process.exit(1); }
fs.writeFileSync(p,JSON.stringify(d,null,2));
console.log('STAGE GUIDE A OK | guides now: '+d.length);
