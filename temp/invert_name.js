const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'rodecaster-pro2-vs-bridgecast-x');
const log = [];
const P = s => log.push(s);

// helper: swap two properties of an object in place
function sw(o, a, b) {
  if (!(a in o) || !(b in o)) return false;
  const t = o[a]; o[a] = o[b]; o[b] = t;
  return true;
}

// ============================================================
// 1) PORTADA -> Roland Bridge Cast X
// ============================================================
const oldImg = g.image;
g.image = 'https://r2.gear4music.com/media/103/1038820/1200/preview.jpg';
P('1) Portada: ' + oldImg.split('/').slice(-3)[0] + ' -> 1038820 (Roland Bridge Cast X)');

// ============================================================
// 2) TITULOS invertidos
// ============================================================
g.title = 'Bridge Cast X vs RØDECaster Pro II: Best Streaming Mixer?';
g.title_es = 'Bridge Cast X vs RØDECaster Pro II: ¿mejor mezclador de streaming?';
g.titleTag = 'Bridge Cast X vs RØDECaster Pro II: Which Wins?';
g.titleTag_es = 'Bridge Cast X vs RØDECaster Pro II: ¿cuál gana?';
P('2) Títulos EN+ES invertidos (Bridge Cast X primero)');

// ============================================================
// 3) DESCRIPCIONES
// ============================================================
g.description = 'Roland Bridge Cast X vs RØDECaster Pro II for streamers and creators: gamer capture and dual-bus mixing in one compact box against radio-studio voice quality and guests.';
g.description_es = 'Roland Bridge Cast X vs RØDECaster Pro II para streamers y creadores: captura gamer y mezcla de doble bus en una caja compacta contra calidad de voz de estudio de radio e invitados.';
P('3) description / description_es invertidas');

// ============================================================
// 4) featuredSnippet: cabecera + columnas de la comparativa
// ============================================================
const fsx = g.featuredSnippet;
fsx.title_en = 'Roland Bridge Cast X vs RØDECaster Pro II: Best Streaming Mixer Compared';
fsx.title_es = 'Roland Bridge Cast X vs RØDECaster Pro II: comparativa del mejor mezclador de streaming';
fsx.text_en = 'The Roland Bridge Cast X merges HDMI video capture and dual-bus audio mixing in one compact gamer box. The RØDECaster Pro II runs a four-mic broadcast studio on its own hardware with 76dB Revolution preamps, APHEX processing and multitrack recording.';
fsx.text_es = 'El Roland Bridge Cast X fusiona captura de vídeo HDMI y mezcla de audio de doble bus en una sola caja gamer compacta. El RØDECaster Pro II corre un estudio de broadcast de cuatro micros en su propio hardware con previos Revolution de 76dB, procesado APHEX y grabación multitrack.';

[['name1_en', 'name2_en'], ['name1_es', 'name2_es'], ['price1', 'price2'], ['type1', 'type2'],
 ['key1', 'key2'], ['key1_es', 'key2_es'], ['best1_en', 'best2_en'], ['best1_es', 'best2_es'],
 ['brand1', 'brand2'], ['rating1', 'rating2']].forEach(([a, b]) => sw(fsx, a, b));

// specs: specs[] val1<->val2
let n = 0;
(fsx.specs || []).forEach(s => { if (sw(s, 'val1', 'val2')) n++; if (sw(s, 'val1_es', 'val2_es')) n++; });
P('4) featuredSnippet: cabecera + 10 pares de campos + ' + n + ' valores de spec invertidos');

// ============================================================
// 5) comparison.rows
// ============================================================
let m = 0;
(g.comparison && g.comparison.rows || []).forEach(r => { if (sw(r, 'val1', 'val2')) m++; if (sw(r, 'val1_es', 'val2_es')) m++; });
P('5) comparison.rows: ' + m + ' valores invertidos en ' + (g.comparison.rows.length) + ' filas');

// ============================================================
// 6) Orden de productos: featuredProducts, sections, verdictProsCons
// ============================================================
const oldFp = JSON.stringify(g.featuredProducts);
g.featuredProducts = g.featuredProducts.map(id => (id === 248 ? 240 : id === 240 ? 248 : id));
P('6a) featuredProducts: ' + oldFp + ' -> ' + JSON.stringify(g.featuredProducts));

// sections: mover la del Bridge Cast X (id 240) delante de la del RØDECaster (248)
const secs = g.sections.slice();
const iA = secs.findIndex(s => s.products.length === 1 && s.products[0] === 248);
const iB = secs.findIndex(s => s.products.length === 1 && s.products[0] === 240);
if (iA > -1 && iB > -1 && iA < iB) {
  const [bSec] = secs.splice(iB, 1);
  secs.splice(iA, 0, bSec);
  g.sections = secs;
  P('6b) Sections: "Bridge Cast X Rules Small Desks" ahora va antes que "Four Mics, Zero Fear"');
}
// en las secciones comparativas, el orden de productos tambien se invierte
g.sections.forEach(s => {
  if (s.products.length === 2 && s.products.indexOf(248) > -1 && s.products.indexOf(240) > -1) {
    s.products = [240, 248];
  }
});
P('6c) Secciones comparativas: products [248,240] -> [240,248]');

// verdictProsCons: intercambiar las dos entradas
if (g.verdictProsCons.length === 2) {
  g.verdictProsCons = [g.verdictProsCons[1], g.verdictProsCons[0]];
  P('6d) verdictProsCons: Bridge Cast X ahora es el veredicto #1');
}

// ============================================================
// 7) VERDICT + CONCLUSIONES: invertir el orden de los dos
// ============================================================
g.verdict = 'The Roland Bridge Cast X is the space-saving pick for solo gamers who want capture and mixing in one box. The RØDECaster Pro II is the voice-first pick for shows, interviews and guests with pro preamps built in.';
g.verdict_es = 'El Roland Bridge Cast X es la opción que ahorra espacio para gamers en solitario que quieren captura y mezcla en una sola caja. El RØDECaster Pro II es la opción centrada en la voz para programas, entrevistas e invitados, con previos profesionales integrados.';
P('7) Veredicto EN+ES: orden invertido');

g.conclusion = 'The Roland Bridge Cast X wins on space and versatility — HDMI capture plus dual-bus mixing in one compact gamer box. The RØDECaster Pro II wins on voice quality, guests and reliability — four XLR inputs, 76dB Revolution preamps, hardware APHEX and multitrack recording that outlives a crashed PC.';
g.conclusion_es = 'El Roland Bridge Cast X gana en espacio y versatilidad — captura HDMI más mezcla de doble bus en una sola caja gamer compacta. El RØDECaster Pro II gana en calidad de voz, invitados y fiabilidad — cuatro entradas XLR, previos Revolution de 76dB, APHEX en hardware y grabación multitrack que sobrevive a un PC caído.';
P('8) Conclusión EN+ES: orden invertido');

// ============================================================
// 9) FAQ 1: invertir la pregunta para que coincida con el título
// ============================================================
fsx.faq_q1_en = 'Which is better for streaming, the Roland Bridge Cast X or the RØDECaster Pro II?';
fsx.faq_q1_es = '¿Cuál es mejor para streaming, el Roland Bridge Cast X o el RØDECaster Pro II?';
P('9) FAQ 1 EN+ES: orden de la pregunta invertido');

// ============================================================
// 10) FAQ 5 ( "¿qué debería comprar un principiante?" ): invertir para
//     que la respuesta empiece por el producto que va primero
// ============================================================
fsx.faq_a5_en = 'A solo gamer on a small desk should buy the Roland Bridge Cast X: fewer boxes, fewer cables and gaming-tuned presets from day one. A creator growing toward interviews, guests or the best possible vocal sound should buy the RØDECaster Pro II: four mics, real faders and multitrack recording leave headroom to grow.';
fsx.faq_a5_es = 'Un gamer en solitario con escritorio pequeño debería comprar el Roland Bridge Cast X: menos cajas, menos cables y presets de gaming desde el primer día. Un creador que crece hacia entrevistas, invitados o el mejor sonido vocal posible debería comprar el RØDECaster Pro II: cuatro micros, faders reales y grabación multitrack dejan espacio para crecer.';
P('10) FAQ 5 EN+ES: la respuesta ya empezaba por el Bridge Cast X (sin cambios de texto)');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('INVERSION APLICADA (' + log.length + ' pasos):');
log.forEach(l => console.log('  - ' + l));