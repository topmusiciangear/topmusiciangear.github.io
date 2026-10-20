const fs = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '..', 'data');
const guides = JSON.parse(fs.readFileSync(path.join(DATA, 'guides.json'), 'utf8'));
const products = JSON.parse(fs.readFileSync(path.join(DATA, 'products.json'), 'utf8'));
const WINNERS = require('./winners.js');

const byId = {};
for (const p of products) if (p.id) byId[p.id] = p;

// Quita prefijos de categoria del nombre visible (no toca products.json)
function cleanName(raw) {
  if (!raw) return '';
  return raw
    .replace(/^Guitarra\s+Eléctrica\s+Inteligente\s+/i, '')
    .replace(/^Guitarra\s+Inteligente\s+/i, '')
    .replace(/^Guitarra\s+Parlor\s+Electroacústica\s+/i, '')
    .replace(/^Guitarra\s+Electroacústica\s+/i, '')
    .replace(/^Guitarra\s+Parlor\s+/i, '')
    .replace(/^Guitarra\s+Acústica\s+/i, '')
    .replace(/^Guitarra\s+acústica\s+/i, '')
    .replace(/^Guitarra\s+/i, '')
    .replace(/^Bajo\s+/i, '')
    .replace(/^Amplificador\s+de\s+Escritorio\s+Inalámbrico\s+/i, '')
    .replace(/^Amplificador\s+Inteligente\s+para\s+Bajo\s+y\s+Guitarra\s+/i, '')
    .replace(/^Amplificador\s+Inteligente\s+de\s+Guitarra\s+/i, '')
    .replace(/^Amplificador\s+de\s+Modelado\s+de\s+Escritorio\s+/i, '')
    .replace(/^Micrófono\s+Dinámico\s+USB\/XLR\s+/i, '')
    .replace(/^Micrófono\s+Dinámico\s+XLR\/USB\s+de\s+Broadcast\s+/i, '')
    .replace(/^Micrófono\s+Dinámico\s+XLR\s+/i, '')
    .replace(/^Micrófono\s+Dinámico\s+USB\s+/i, '')
    .replace(/^Micrófono\s+Dinámico\s+/i, '')
    .replace(/^Micrófono\s+Condensador\s+de\s+Gran\s+Diafragma\s+/i, '')
    .replace(/^Micrófono\s+Condensador\s+de\s+Estudio\s+/i, '')
    .replace(/^Micrófono\s+de\s+Condensador\s+de\s+Estudio\s+/i, '')
    .replace(/^Micrófono\s+USB\s+de\s+Condensador\s+Compacto\s+/i, '')
    .replace(/^Micrófono\s+USB\s+de\s+Condensador\s+Cardioide\s+/i, '')
    .replace(/^Micrófono\s+de\s+Condensador\s+de\s+Gran\s+Diafragma\s+/i, '')
    .replace(/^Micrófono\s+Supercardioide\s+/i, '')
    .replace(/^Micrófono\s+On-Camera\s+/i, '')
    .replace(/^Micrófono\s+Shotgun\s+Corto\s+/i, '')
    .replace(/^Micrófono\s+Shotgun\s+Compacto\s+/i, '')
    .replace(/^Micrófono\s+Shotgun\s+/i, '')
    .replace(/^Micrófono\s+USB\s+de\s+Gaming\s+/i, '')
    .replace(/^Micrófono\s+USB\s+Condensador\s+/i, '')
    .replace(/^Micrófono\s+USB\s+/i, '')
    .replace(/^Micrófono\s+/i, '')
    .replace(/^Altavoz\s+Activo\s+/i, '')
    .replace(/^Altavoz\s+Pasivo\s+/i, '')
    .replace(/^Altavoz\s+PA\s+Activo\s+/i, '')
    .replace(/^Altavoz\s+/i, '')
    .replace(/^Columna\s+PA\s+Activa\s+/i, '')
    .replace(/^Monitor\s+de\s+Escenario\s+/i, '')
    .replace(/^Caja\s+Directa\s+Activa\s+/i, '')
    .replace(/^Caja\s+Directa\s+Pasiva\s+Estéreo\s+/i, '')
    .replace(/^Interfaz\s+Directa\s+Activa\s+/i, '')
    .replace(/^Controlador\s+DAW\s+/i, '')
    .replace(/^Sistema\s+Estéreo\s+Inalámbrico\s+/i, '')
    .replace(/^Sistema\s+In-Ear\s+Inalámbrico\s+/i, '')
    .replace(/^Sistema\s+Inalámbrico\s+/i, '')
    .replace(/^Sistema\s+Estéreo\s+UHF\s+/i, '')
    .replace(/^Sistema\s+PA\s+Activo\s+/i, '')
    .replace(/^Soporte\s+de\s+Micrófono\s+/i, '')
    .replace(/^Soportes\s+de\s+Monitor\s+/i, '')
    .replace(/^Kit\s+de\s+Micrófono\s+USB\s+/i, '')
    .replace(/^Cable\s+/i, '')
    .replace(/^Shotgun\s+Compacto\s+/i, '')
    .replace(/^Kit\s+de\s+Micrófono\s+Shotgun\s+/i, '')
    .replace(/^Teclado\s+/i, '')
    .replace(/\s*\((?:Unidad|Each)\)\s*$/i, '')
    .trim();
}

function displayName(p, isEs) {
  const raw = isEs ? (p.title_es || p.title) : (p.title || p.title_es);
  return cleanName(raw || '');
}

function blue(name) {
  return `<span class="product-name">${name}</span>`;
}

const TIER = /(gama\s+(alta|media|baja)|de\s+élite|de\s+elite|gama\s+de\s+entrada)/gi;

function cleanDesc(text) {
  if (!text) return '';
  let t = String(text).replace(/\s+/g, ' ').trim();
  // fuera frases con precio
  t = t.split(/(?<=[.!?])\s+/).filter(s => !/[$€]|\bUSD\b|\beuros?\b/i.test(s)).join(' ');
  t = t.replace(TIER, '').replace(/\s{2,}/g, ' ').trim();
  t = t.replace(/previolificadores/gi, 'preamplificadores');
  t = t.replace(/\s*\((?:cada uno|each)\)/gi, '');
  return t;
}

function trimToWord(text) {
  let w = text.trim().replace(/[,;:\s]+$/, '');
  const stop = /\b(de|del|con|para|en|a|al|por|sin|y|o|que|un|una|unos|unas|el|la|los|las|tu|tus|su|sus|más|como|desde|hasta|entre|sobre|muy|pero|ni)$/i;
  let guard = 0;
  while (stop.test(w) && guard++ < 8) w = w.replace(/\s+\S+$/, '');
  return w;
}

function shorten(text, max) {
  if (!text) return '';
  if (text.length <= max) return text;
  // 1) Cortar en frase completa
  const parts = sentences(text);
  let out = '';
  for (const s of parts) {
    const next = out ? out + ' ' + s : s;
    if (next.length <= max) out = next;
    else break;
  }
  if (out) return out;
  // 2) Si la primera frase ya es demasiado larga, cortar en coma/punto y coma
  const cut = text.slice(0, max);
  const lastComma = Math.max(cut.lastIndexOf(', '), cut.lastIndexOf('; '), cut.lastIndexOf(': '));
  if (lastComma > max * 0.5) return trimToWord(cut.slice(0, lastComma)) + '.';
  const lastSpace = cut.lastIndexOf(' ');
  return trimToWord(cut.slice(0, lastSpace > 0 ? lastSpace : max)) + '.';
}

function firstSentence(text) {
  if (!text) return '';
  const m = text.match(/^.*?[.!?](?=\s|$)/);
  return (m ? m[0] : text).trim();
}

function sentences(text) {
  if (!text) return [];
  return text.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean);
}

function isDuel(guide, ids) {
  return ids.length === 2 || /-vs-/.test(guide.id);
}
function isBudget(guide) {
  return /budget|menos-de|under|economic|barat/i.test(guide.id + ' ' + (guide.title_es || '') + ' ' + (guide.title || ''));
}

const OPEN_ES = {
  duel: [
    (n) => `${n} gana este duelo.`,
    (n) => `Enfrentados cara a cara, ${n} sale mejor parado.`,
    (n) => `El duelo se decide del lado de ${n}.`,
    (n) => `${n} es el que se queda con la victoria.`,
    (n) => `Tras compararlos punto por punto, gana ${n}.`,
  ],
  budget: [
    (n) => `La mejor compra de la guía es ${n}.`,
    (n) => `Con el presupuesto ajustado, ${n} es la opción más redonda.`,
    (n) => `${n} es lo que más se acerca a lo que buscas sin pasarte de precio.`,
    (n) => `Si el precio manda, ${n} es la elección.`,
    (n) => `La compra que mejor se sostiene es ${n}.`,
  ],
  best: [
    (n) => `${n} se lleva el primer puesto.`,
    (n) => `El primer puesto es para ${n}.`,
    (n) => `${n} encabeza la lista.`,
    (n) => `Lo mejor de la selección es ${n}.`,
    (n) => `${n} es el que mejor puntúa en conjunto.`,
  ],
  def: [
    (n) => `La recomendación final es ${n}.`,
    (n) => `${n} es el nombre que nos quedamos.`,
    (n) => `Al final, la apuesta más clara es ${n}.`,
    (n) => `Si hay que mojarse, nos quedamos con ${n}.`,
    (n) => `${n} es la opción que mejor encaja.`,
  ],
};
const OPEN_EN = {
  duel: [
    (n) => `${n} wins this head-to-head.`,
    (n) => `Face to face, ${n} comes out ahead.`,
    (n) => `This duel goes to ${n}.`,
    (n) => `${n} takes the win.`,
    (n) => `Point by point, ${n} is the stronger pick.`,
  ],
  budget: [
    (n) => `The best buy in this guide is ${n}.`,
    (n) => `On a tight budget, ${n} is the roundest option.`,
    (n) => `${n} gets you closest to what you want without overspending.`,
    (n) => `If price leads, the pick is ${n}.`,
    (n) => `The purchase that holds up best is ${n}.`,
  ],
  best: [
    (n) => `${n} takes the top spot.`,
    (n) => `First place goes to ${n}.`,
    (n) => `${n} leads the list.`,
    (n) => `The best of the selection is ${n}.`,
    (n) => `${n} scores highest overall.`,
  ],
  def: [
    (n) => `The final recommendation is ${n}.`,
    (n) => `${n} is the name we keep coming back to.`,
    (n) => `In the end, the clearest bet is ${n}.`,
    (n) => `If we have to commit, we go with ${n}.`,
    (n) => `${n} is the option that fits best.`,
  ],
};
const CLOSE_ES = {
  duel: [
    (n) => `Con todo sobre la mesa, ${n} es la opción que menos concesiones exige.`,
    (n) => `Vistas las diferencias, ${n} deja menos cabos sueltos.`,
    (n) => `La balanza se inclina por ${n} sin demasiadas dudas.`,
  ],
  budget: [
    (n) => `Por lo que cuesta y lo que entrega, ${n} es la compra más sensata.`,
    (n) => `${n} estira el presupuesto mejor que el resto.`,
    (n) => `A este precio, cuesta encontrar algo que haga más que ${n}.`,
  ],
  best: [
    (n) => `Si hay que quedarse con una sola, esa es ${n}.`,
    (n) => `La referencia de la categoría sigue siendo ${n}.`,
    (n) => `${n} es la que recomendaríamos sin pensarlo dos veces.`,
  ],
  def: [
    (n) => `La conclusión es clara: ${n}.`,
    (n) => `Por eso ${n} es la que nos llevamos.`,
    (n) => `Al final, todo apunta a ${n}.`,
  ],
};
const CLOSE_EN = {
  duel: [
    (n) => `Between the two, ${n} asks for the fewest compromises.`,
    (n) => `Once the differences are clear, ${n} leaves fewer loose ends.`,
    (n) => `The scales tip toward ${n} without much doubt.`,
  ],
  budget: [
    (n) => `For the money and what it delivers, ${n} is the smartest buy.`,
    (n) => `${n} stretches the budget better than the rest.`,
    (n) => `At this price, it is hard to find anything that does more than ${n}.`,
  ],
  best: [
    (n) => `If you can only keep one, it is ${n}.`,
    (n) => `The reference in the category is still ${n}.`,
    (n) => `${n} is the one we would recommend without a second thought.`,
  ],
  def: [
    (n) => `The conclusion is clear: ${n}.`,
    (n) => `That is why ${n} is the one we take.`,
    (n) => `In the end, everything points to ${n}.`,
  ],
};

function pick(arr, seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return arr[h % arr.length];
}

let changed = 0;
const missing = [];
const used = new Set();

for (const guide of guides) {
  const ids = [];
  for (const s of (guide.sections || [])) {
    for (const pid of (s.products || [])) {
      if (typeof pid === 'number' && !ids.includes(pid)) ids.push(pid);
    }
  }
  if (!ids.length) continue;

  const wanted = WINNERS[guide.id];
  let winner = null;
  if (wanted) {
    winner = products.find(p => p.title_es === wanted || p.title === wanted)
      || products.find(p => p.title_es && p.title_es.includes(wanted))
      || products.find(p => p.title && p.title.includes(wanted));
  }
  if (!winner || !ids.includes(winner.id)) {
    missing.push(guide.id + ' -> ' + (wanted || 'SIN DEFINIR'));
    continue;
  }
  used.add(guide.id);

  const ordered = [winner.id].concat(ids.filter(i => i !== winner.id));
  const type = isDuel(guide, ids) ? 'duel' : isBudget(guide) ? 'budget' : /best|mejor/i.test(guide.id) ? 'best' : 'def';

  const wNameEs = displayName(winner, true);
  const wNameEn = displayName(winner, false);
  const wDescEs = cleanDesc(winner.desc_es || winner.desc);
  const wDescEn = cleanDesc(winner.desc || winner.desc_es);

  // VEREDICTO
  let vEs = `<p><strong>${pick(OPEN_ES[type], guide.id)(blue(wNameEs))}</strong> ${shorten(wDescEs, 230)}</p>`;
  let vEn = `<p><strong>${pick(OPEN_EN[type], guide.id)(blue(wNameEn))}</strong> ${shorten(wDescEn, 230)}</p>`;

  for (const id of ordered) {
    if (id === winner.id) continue;
    const p = byId[id];
    if (!p) continue;
    const nEs = displayName(p, true);
    const nEn = displayName(p, false);
    const dEs = cleanDesc(p.desc_es || p.desc);
    const dEn = cleanDesc(p.desc || p.desc_es);
    if (dEs) vEs += `<p><strong>${blue(nEs)}</strong> — ${shorten(dEs, 170)}</p>`;
    if (dEn) vEn += `<p><strong>${blue(nEn)}</strong> — ${shorten(dEn, 170)}</p>`;
  }

  // CONCLUSION (corta, distinta del veredicto)
  const wSentEs = sentences(wDescEs);
  const wSentEn = sentences(wDescEn);
  const cEs = (wSentEs[1] || wSentEs[0] || '');
  const cEn = (wSentEn[1] || wSentEn[0] || '');
  const conclEs = `<p>${pick(CLOSE_ES[type], guide.id)(blue(wNameEs))} ${shorten(cEs, 190)}</p>`;
  const conclEn = `<p>${pick(CLOSE_EN[type], guide.id)(blue(wNameEn))} ${shorten(cEn, 190)}</p>`;

  if (guide.verdict_es !== vEs || guide.verdict !== vEn) changed++;
  guide.verdict_es = vEs;
  guide.verdict = vEn;
  guide.conclusion_es = conclEs;
  guide.conclusion = conclEn;
}

const unused = Object.keys(WINNERS).filter(k => !used.has(k));

fs.writeFileSync(path.join(DATA, 'guides.json'), JSON.stringify(guides, null, 2), 'utf8');

console.log('Guías actualizadas:', changed);
console.log('Ganadores sin producto / no presentes:', missing.length);
if (missing.length) console.log(missing.join('\n'));
console.log('Winners definidos sin guía:', unused.length);
if (unused.length) console.log(unused.join('\n'));
