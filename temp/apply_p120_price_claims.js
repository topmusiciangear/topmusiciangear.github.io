const fs = require('fs');
const p = 'data/guides.json';
const g = JSON.parse(fs.readFileSync(p, 'utf8'));
const x = g.find(v => v.id === 'at2020-vs-p120');
if (!x) throw new Error('guide not found');

function rep(obj, key, from, to) {
  const s = obj[key];
  if (typeof s !== 'string' || !s.includes(from)) throw new Error(`NOT FOUND in ${key}: ${from}`);
  obj[key] = s.split(from).join(to);
}

// Intro: same bracket, not "about the same"
rep(x, 'intro', 'cost about the same and use a similar-sized capsule', 'sit in the same price bracket and use a similar-sized capsule');
rep(x, 'intro_es', 'cuestan casi lo mismo y montan una cápsula', 'están en la misma franja de precio y montan una cápsula');

// Room section: drop blanket "costs less"
const room = x.sections.find(s => (s.heading_es || '').includes('Entonces'));
if (!room) throw new Error('room section not found');
rep(room, 'content', 'solve problems the AT2020 makes you fix in the DAW — and it costs less.', 'solve problems the AT2020 makes you fix in the DAW.');
rep(room, 'content_es', 'arreglas en el DAW, y además cuesta menos.', 'arreglas en el DAW.');

// Verdict: no price claim
rep(x, 'verdict', 'the P120 does more for less money.', 'the P120 is the tool for the job.');
rep(x, 'verdict_es', 'el P120 hace más por menos dinero.', 'el P120 es la herramienta adecuada.');

// P120 pro: neutral, defensible
const p120 = x.verdictProsCons.find(v => v.name === 'AKG P120');
if (!p120) throw new Error('P120 verdict not found');
p120.pros = p120.pros.map(s => s.replace('Costs less than the AT2020 in most stores, with the same 20 Hz–20 kHz range', 'Street price sits close to the AT2020, with the same 20 Hz–20 kHz range'));
p120.pros_es = p120.pros_es.map(s => s.replace('Cuesta menos que el AT2020 en casi todas las tiendas, con la misma respuesta de 20 Hz a 20 kHz', 'Su precio de calle ronda el del AT2020, con la misma respuesta de 20 Hz a 20 kHz'));

// Snippet + FAQ
rep(x.featuredSnippet, 'text_en', 'The P120 costs less and adds a pad and bass cut', 'The P120 adds a pad and bass cut');
rep(x.featuredSnippet, 'text_es', 'El P120 cuesta menos y añade atenuador (pad)', 'El P120 añade atenuador (pad)');
rep(x.featuredSnippet, 'faq_a5_en', 'if you need the pad and bass cut and want to spend less.', 'if you need the pad and bass cut.');
rep(x.featuredSnippet, 'faq_a5_es', 'si necesitas el atenuador (pad) y el corte de graves y quieres gastar menos.', 'si necesitas el atenuador (pad) y el corte de graves.');

fs.writeFileSync(p, JSON.stringify(g, null, 2));
console.log('OK: price claims neutralized');
