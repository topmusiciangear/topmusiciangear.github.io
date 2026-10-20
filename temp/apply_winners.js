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
    .replace(/\s+Interfaz\s+Premium$/i, '')
    .replace(/\s+Interfaz\s+Inmersiva$/i, '')
    .replace(/\s+Interfaz\s+de\s+Audio\s+Premium$/i, '')
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

// Evita repetir el nombre justo después de ponerlo en negrita/azul.
// "La Rode NT1 Signature Series es el clásico..." -> "Es el clásico..."
function stripLeadName(text, name, keepVerb = true) {
  if (!text || !name) return text;
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const article = '(?:(?:El|La|Los|Las|Un|Una|The|A|An)\\s+)?';
  const VERBS = 'es|son|trae|traen|tiene|tienen|ofrece|ofrecen|incluye|incluyen|llega|llegan|sale|salen|viene|vienen|representa|representan|supone|suponen|aporta|aportan|da|dan|entrega|entregan|combina|combinan|mantiene|mantienen|usa|usan|utiliza|utilizan|añade|añaden|suma|suman|cuenta|cuentan|está|están|sigue|siguen|permite|permiten|promete|prometen|cuesta|cuestan|marca|marcan|define|definen|destaca|destacan|pone|ponen|put|puts|concentra|concentran|lleva|llevan|mete|meten|demuestra|demuestran|integra|integran|incorpora|incorporan|actualiza|actualizan|recoge|recogen|is|are|delivers|deliver|brings|bring|offers|offer|has|have|includes|include|comes|come|features|feature|uses|use|provides|provide|proves|prove|packs|pack|combines|combine|sits|sit|remains|remain|adds|add|gives|give|works|work|sounds|sound|stands|stand|represents|represent|serves|serve|makes|make|takes|take|pairs|pair|updates|update';
  const verb = keepVerb ? '(?=(?:' + VERBS + ')\\b)' : '(?:(?:' + VERBS + ')\\s+)';
  const src = text.trim();
  let out = src;
  const full = new RegExp('^' + article + esc(name) + '\\s+' + verb, 'i');
  if (full.test(out)) {
    out = out.replace(full, '');
  } else {
    const tokens = [...new Set(name.split(/\s+/).filter(t => /\d/.test(t) && t.length > 1))]
      .sort((a, b) => b.length - a.length);
    for (const t of tokens) {
      const r = new RegExp('^' + article + esc(t) + '\\s+' + verb, 'i');
      if (r.test(out)) { out = out.replace(r, ''); break; }
    }
    if (out === src) {
      const dash = new RegExp('^' + article + esc(name) + '\\s*[:—–-]\\s*', 'i');
      if (dash.test(out)) out = out.replace(dash, '');
    }
    if (out === src) {
      // Casos como "El AmpliTank K688 es..." o "El NT-USB Mini es..."
      // donde la descripción usa un nombre corto y no el título completo.
      const m = out.match(new RegExp('^(?:(?:El|La|Los|Las|Un|Una|The|A|An)\\s+)([^.;:!?—–]{2,70}?)\\s+' + verb, 'i'));
      if (m) {
        const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const nameTokens = norm(name).split(/[^a-z0-9+]+/).filter(t => t.length >= 3);
        const chunkTokens = norm(m[1]).split(/[^a-z0-9+]+/).filter(Boolean);
        if (chunkTokens.some(t => nameTokens.includes(t))) out = out.slice(m[0].length);
      }
    }
  }
  if (!out) return text;
  return out.charAt(0).toUpperCase() + out.slice(1);
}

const TIER = /(gama\s+(alta|media|baja)|de\s+élite|de\s+elite|gama\s+de\s+entrada)/gi;
const TIER_START = /^\s*(?:gama\s+(?:alta|media|baja)|de\s+élite|gama\s+de\s+entrada)\s*[:\-–—]\s*/i;
const TIER_PAREN = /\s*\((?:gama\s+(?:alta|media|baja)|de\s+élite|gama\s+de\s+entrada)\)/gi;
const TIER_MID = /\b(?:gama\s+(?:alta|media|baja)|de\s+élite|gama\s+de\s+entrada)\b/gi;

function cleanDesc(text) {
  if (!text) return '';
  let t = String(text).replace(/\s+/g, ' ').trim();
  // fuera frases con precio
  t = t.split(/(?<=[.!?])\s+/).filter(s => !/[$€]|\bUSD\b|\beuros?\b/i.test(s)).join(' ');
  t = t.replace(TIER_START, '').replace(TIER_PAREN, '').replace(TIER_MID, '').replace(/\s{2,}/g, ' ').trim();
  t = t.replace(/previolificadores/gi, 'preamplificadores');
  t = t.replace(/previolificador/gi, 'preamplificador');
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
    (n) => `Gana ${n} en el cara a cara.`,
    (n) => `Puestos uno frente al otro, ${n} sale mejor.`,
    (n) => `La comparación directa se resuelve a favor de ${n}.`,
    (n) => `El pulso se lo lleva ${n}.`,
    (n) => `${n} aguanta mejor la comparación.`,
    (n) => `Comparados punto por punto, ${n} convence más.`,
    (n) => `La balanza acaba del lado de ${n}.`,
  ],
  budget: [
    (n) => `La mejor compra de la guía es ${n}.`,
    (n) => `Por lo que cuesta, ${n} es la opción más lógica.`,
    (n) => `Dentro de este presupuesto, ${n} es el que más ofrece.`,
    (n) => `Si hay que ajustar el gasto, ${n} es la apuesta segura.`,
    (n) => `En este rango de precio, ${n} es el que mejor compensa.`,
    (n) => `${n} es la compra más sensata por este precio.`,
    (n) => `Nada en este rango da tanto como ${n}.`,
  ],
  best: [
    (n) => `El primer puesto es para ${n}.`,
    (n) => `De toda la selección, ${n} es el que más convence.`,
    (n) => `La referencia de la categoría es ${n}.`,
    (n) => `Entre todos, ${n} es la mejor opción.`,
    (n) => `El mejor de la lista es ${n}.`,
    (n) => `${n} está un paso por delante del resto.`,
    (n) => `La cima de esta selección es ${n}.`,
  ],
  def: [
    (n) => `La recomendación final es ${n}.`,
    (n) => `Si tuviera que quedarme con uno, sería ${n}.`,
    (n) => `La apuesta más clara es ${n}.`,
    (n) => `Al final, todo apunta a ${n}.`,
    (n) => `La opción que mejor encaja es ${n}.`,
    (n) => `Me quedo con ${n}.`,
    (n) => `${n} es el que más me convence.`,
  ],
};
const OPEN_EN = {
  duel: [
    (n) => `${n} wins this head-to-head.`,
    (n) => `Side by side, ${n} comes out ahead.`,
    (n) => `The direct comparison favors ${n}.`,
    (n) => `${n} takes the decision.`,
    (n) => `${n} holds up better in the comparison.`,
    (n) => `Point by point, ${n} is the stronger pick.`,
    (n) => `The scales end up on the side of ${n}.`,
  ],
  budget: [
    (n) => `The best buy in this guide is ${n}.`,
    (n) => `For the money, ${n} makes the most sense.`,
    (n) => `Within this budget, ${n} gives you the most.`,
    (n) => `If you have to watch the spending, ${n} is the safe pick.`,
    (n) => `In this price range, ${n} is the best value.`,
    (n) => `${n} is the smartest purchase at this price.`,
    (n) => `Nothing in this range delivers as much as ${n}.`,
  ],
  best: [
    (n) => `${n} takes the top spot.`,
    (n) => `Out of the whole selection, ${n} is the most convincing.`,
    (n) => `The reference in this category is ${n}.`,
    (n) => `Of all of them, ${n} is the best choice.`,
    (n) => `The best on the list is ${n}.`,
    (n) => `${n} is a step ahead of the rest.`,
    (n) => `The peak of this selection is ${n}.`,
  ],
  def: [
    (n) => `The final recommendation is ${n}.`,
    (n) => `If I had to keep one, it would be ${n}.`,
    (n) => `The clearest bet is ${n}.`,
    (n) => `In the end, everything points to ${n}.`,
    (n) => `${n} is the option that fits best.`,
    (n) => `I would go with ${n}.`,
    (n) => `${n} is the one that convinces me most.`,
  ],
};
const CLOSE_ES = {
  duel: [
    (n) => `La diferencia está en los detalles, y ahí gana ${n}.`,
    (n) => `No hay empate: ${n} ofrece más donde importa.`,
    (n) => `Con las cartas sobre la mesa, ${n} es la elección.`,
    (n) => `El resultado no deja muchas dudas: ${n}.`,
  ],
  budget: [
    (n) => `Por ese precio, ${n} es difícil de superar.`,
    (n) => `${n} es el que mejor aprovecha el presupuesto.`,
    (n) => `A este precio, ${n} es la compra que menos remordimientos deja.`,
    (n) => `Con este gasto, ${n} es la opción que más sentido tiene.`,
  ],
  best: [
    (n) => `Si solo puedes quedarte con uno, que sea ${n}.`,
    (n) => `${n} sigue siendo la referencia de la categoría.`,
    (n) => `La recomendaría sin pensarlo dos veces: ${n}.`,
    (n) => `Para mí, la elección está clara: ${n}.`,
  ],
  def: [
    (n) => `La conclusión es clara: ${n}.`,
    (n) => `Por eso me quedo con ${n}.`,
    (n) => `Al final, todo apunta a ${n}.`,
    (n) => `No hay mucho más que pensar: ${n}.`,
  ],
};
const CLOSE_EN = {
  duel: [
    (n) => `The difference is in the details, and ${n} wins there.`,
    (n) => `It is not a tie: ${n} gives you more where it matters.`,
    (n) => `With everything on the table, ${n} is the pick.`,
    (n) => `The result leaves little doubt: ${n}.`,
  ],
  budget: [
    (n) => `At that price, ${n} is hard to beat.`,
    (n) => `${n} makes the most of the budget.`,
    (n) => `For this money, ${n} is the purchase you will regret least.`,
    (n) => `At this spend, ${n} makes the most sense.`,
  ],
  best: [
    (n) => `If you can only keep one, make it ${n}.`,
    (n) => `${n} is still the reference in the category.`,
    (n) => `I would recommend it without a second thought: ${n}.`,
    (n) => `For me, the choice is clear: ${n}.`,
  ],
  def: [
    (n) => `The conclusion is clear: ${n}.`,
    (n) => `That is why I would go with ${n}.`,
    (n) => `In the end, everything points to ${n}.`,
    (n) => `There is not much more to think about: ${n}.`,
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
  const wDescEs = stripLeadName(cleanDesc(winner.desc_es || winner.desc), wNameEs);
  const wDescEn = stripLeadName(cleanDesc(winner.desc || winner.desc_es), wNameEn, false);

  // VEREDICTO
  let vEs = `<p><strong>${pick(OPEN_ES[type], guide.id)(blue(wNameEs))}</strong> ${shorten(wDescEs, 230)}</p>`;
  let vEn = `<p><strong>${pick(OPEN_EN[type], guide.id)(blue(wNameEn))}</strong> ${shorten(wDescEn, 230)}</p>`;

  for (const id of ordered) {
    if (id === winner.id) continue;
    const p = byId[id];
    if (!p) continue;
    const nEs = displayName(p, true);
    const nEn = displayName(p, false);
    const dEs = stripLeadName(cleanDesc(p.desc_es || p.desc), nEs, false);
    const dEn = stripLeadName(cleanDesc(p.desc || p.desc_es), nEn, false);
    if (dEs) vEs += `<p><strong>${blue(nEs)}</strong> — ${shorten(dEs, 170)}</p>`;
    if (dEn) vEn += `<p><strong>${blue(nEn)}</strong> — ${shorten(dEn, 170)}</p>`;
  }

  // CONCLUSION (corta, distinta del veredicto)
  const wSentEs = sentences(wDescEs);
  const wSentEn = sentences(wDescEn);
  const cEs = wSentEs[1] || '';
  const cEn = wSentEn[1] || '';
  const conclEs = `<p>${pick(CLOSE_ES[type], guide.id)(blue(wNameEs))}${cEs ? ' ' + shorten(cEs, 190) : ''}</p>`;
  const conclEn = `<p>${pick(CLOSE_EN[type], guide.id)(blue(wNameEn))}${cEn ? ' ' + shorten(cEn, 190) : ''}</p>`;

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
