const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'bridge-cast-x-vs-rodecaster-pro2');
if (!g) throw new Error('guia no encontrada');

const BC = g.verdictProsCons.find(v => /Bridge Cast X/.test(v.name));
const RD = g.verdictProsCons.find(v => /RØDECaster/.test(v.name));
if (!BC || !RD) throw new Error('VPC no encontrados');

const log = [];
const P = s => log.push(s);

// ============================================================
// A) CONS #4 del Bridge Cast X: el "no 70dB" -> "no hay medidor de nivel"
//
//    IMPORTANTE: NO se introduce ninguna afirmacion de "70 dB de ganancia limpia".
//    La ficha oficial de Roland sigue sin publicar cifra de ganancia (verificado
//    recorriendo las 10 apariciones de "dB" de la pagina). Ese hecho verificado
//    se mantiene intacto en la FAQ 3, que es donde aporta valor.
//    El contra del VPC se sustituye por uno mas fuerte y util.
// ============================================================
// Verificacion oficial:
//  - La ficha no contiene "Display", "Screen" ni "LCD" en ningun punto.
//  - La unica retroalimentacion visual documentada es "adjustable knob LED colors".
//  - Los conectores son: MIC, PHONES/HEADSET, AUX, LINE OUT, HDMI IN 1-2, THRU,
//    USB I, USB II, USB POWER IN -> sin pantalla.
const oldEn = BC.cons[3], oldEs = BC.cons_es[3];
console.log('CON 4 EN (antes): ' + oldEn);
console.log('CON 4 ES (antes): ' + oldEs);

BC.cons[3] = "No physical level meter — you have to read the software or the colour-changing knob LEDs to catch a clip before it is in the take";
BC.cons_es[3] = "Sin medidor de nivel físico — tienes que mirar el software o el color de los LED de las perillas para coger un clipping antes de que llegue a la toma";
P('Bridge Cast X / contra 4: eliminado el "no 70dB claim" -> "sin medidor de nivel fisico"');

// ============================================================
// B) CONS #2: detailar el "no standalone recording" con el dato oficial
//    Conectores oficiales: no hay ranura microSD en el Bridge Cast X.
// ============================================================
console.log('\nCON 2 EN (antes): ' + BC.cons[1]);
BC.cons[1] = "No standalone recording — there is no microSD slot, so a computer has to capture every single take";
BC.cons_es[1] = "Sin grabación autónoma — no tiene ranura microSD, así que un ordenador tiene que capturar cada toma";
P('Bridge Cast X / contra 2: detalle de la ausencia de microSD');

// ============================================================
// C) CONS #5: precisado con la rama de alimentacion por bus
//    Ficha oficial: "USB bus power (*15) | USB PD compatible AC adaptor (sold
//    separately)" y "(*15) Bus-powered operation when connected to USB II port
//    with a PC capable of supplying 5V/3A power".
//    Incluidos de fabrica: cable USB 3.2 Type-C + cable USB 2.0 Type-C (POWER).
// ============================================================
console.log('\nCON 5 EN (antes): ' + BC.cons[4]);
BC.cons[4] = "Heavy USB appetite — it only runs off a PC bus when you use the USB II port and the PC delivers 5V/3A; otherwise it needs a USB PD adapter (sold separately)";
BC.cons_es[4] = "Apetito USB exigente — solo se alimenta del bus del PC si usas el puerto USB II y el PC entrega 5V/3A; si no, necesita un adaptador USB PD que se vende aparte";
P('Bridge Cast X / contra 5: precisada la rama de alimentacion por bus USB');

// ============================================================
// D) El RØDECaster ya coincide con el bloque que enviaste: sin cambios.
// ============================================================
const RD_OK = [
  'No video capture', 'Overkill if you stream solo', 'Higher price tier',
  '5.5-inch touchscreen', 'No hardware sends or inserts'
];
const missing = RD_OK.filter(frag => !RD.cons.some(c => c.indexOf(frag) > -1));
P(missing.length === 0
  ? 'RØDECaster Pro II: los 5 contras que enviaste ya son identicos a los publicados (sin cambios)'
  : '[!!] RØDECaster: contras ausentes -> ' + missing.join(' | '));

// ============================================================
// E) La FAQ 3 NO se toca: sigue siendo la cita verificada de que Roland
//    no publica ganancia. Ese dato es certain y queda respaldado por la ficha.
// ============================================================
const f = g.featuredSnippet;
const faqOk = /publishes no gain figure/.test(f.faq_a3_en) && /no publica ninguna cifra de ganancia/.test(f.faq_a3_es);
P(faqOk
  ? 'FAQ 3: intacta (sigue citando que Roland no publica cifra de ganancia, ahora con la ficha completa como respaldo)'
  : '[!!] FAQ 3 alterada inesperadamente');

// ============================================================
// VERIFICACION ANTES DE ESCRIBIR
// ============================================================
const all = JSON.stringify(g);
const checks = [
  ['Bridge Cast X sigue con 5 pros / 5 cons', BC.pros.length === 5 && BC.cons.length === 5],
  ['pro_es y cons_es alineados EN/ES', BC.pros_es.length === BC.pros.length && BC.cons_es.length === BC.cons.length],
  ['RØDECaster sigue con 5 pros / 5 contras', RD.pros.length === 5 && RD.cons.length === 5],
  ['NO se introduce "70 dB de ganancia limpia"', !/70 ?dB(?!-plus)(?: (?:clean )?gain)/i.test(all)],
  ['FAQ 3 mantiene la negacion verificada', faqOk],
  ['el nuevo medidor de nivel presente EN y ES', /No physical level meter/.test(BC.cons[3]) && /medidor de nivel/.test(BC.cons_es[3])],
  ['menciona la alimentacion 5V/3A por bus', /5V\/3A/.test(BC.cons[4]) && /5V\/3A/.test(BC.cons_es[4])],
  ['microSD confirmado como ausente', /microSD/.test(BC.cons[1]) && /microSD/.test(BC.cons_es[1])]
];
let fail = 0;
console.log('');
checks.forEach(([n, ok]) => { if (!ok) fail++; console.log('  ' + (ok ? 'OK  ' : '[!!] ') + n); });
if (fail) { console.log('\nABORTADO (' + fail + ' fallo(s)). Nada escrito.'); process.exit(1); }

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nESCRITO. ' + log.length + ' cambios:');
log.forEach(l => console.log('  - ' + l));