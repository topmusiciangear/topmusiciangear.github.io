const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const gFile = DIR + 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const g = G.find(x => x.id === 'daw-guide');
const rep1 = (txt, from, to) => {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 70));
  return txt.split(from).join(to);
};
// ---------- TABLE ----------
const t = g.productTable;
const trow = l => t.rows.find(rr => rr.label === l);
let r = trow('Free Trial');
if (r.values[4].value !== 'Free with new Macs') throw new Error('trial changed');
r.values[4].value = '90-day trial';
r.values[4].value_es = 'Prueba de 90 d\u00edas';
r = trow('System Requirements');
if (r.values[0].value !== '4 GB RAM, multi-core' || r.values[3].value !== '8 GB RAM recommended') throw new Error('sysreq changed');
r.values[0].value = '8 GB RAM, multi-core CPU';
r.values[0].value_es = '8 GB RAM, CPU multin\u00facleo';
r.values[3].value = '8 GB min, 16 GB recommended';
r.values[3].value_es = '8 GB m\u00edn., 16 GB recomendados';
r = trow('Standout Feature');
if (r.values[5].value !== 'Virtual rack, CV patching, RE support') throw new Error('reason feat changed');
r.values[5].value = 'Rack plugin (VST3/AU/AAX), CV patching';
r.values[5].value_es = 'Rack como plugin (VST3/AU/AAX), patch CV';
console.log('table fixed');
// ---------- FAQ ----------
const f = g.featuredSnippet;
f.faq_a1_en = rep1(f.faq_a1_en, 'Ableton Live 12 Suite is the standard', 'Ableton Live Suite is the standard');
f.faq_a1_en = rep1(f.faq_a1_en, 'Logic Pro 12 is the best value', 'Logic Pro is the best value');
f.faq_a1_es = rep1(f.faq_a1_es, 'Ableton Live 12 Suite es el est\u00e1ndar', 'Ableton Live Suite es el est\u00e1ndar');
f.faq_a1_es = rep1(f.faq_a1_es, 'Logic Pro 12 es la mejor opci\u00f3n', 'Logic Pro es la mejor opci\u00f3n');
f.faq_a2_en = rep1(f.faq_a2_en, 'It is also the reason the pattern-based workflow has barely changed since 1997: they never charge you to keep it fresh.',
  'Its pattern-and-step-sequencer philosophy has stayed its core identity from the start: a one-time investment they never charge you to keep updating.');
f.faq_a2_es = rep1(f.faq_a2_es, 'Tambi\u00e9n es la raz\u00f3n por la que su flujo basado en patrones apenas ha cambiado desde 1997: nunca te cobran por seguir actualiz\u00e1ndolo.',
  'Su filosof\u00eda basada en patrones y secuenciador por pasos sigue siendo su n\u00facleo de identidad desde sus inicios: una inversi\u00f3n \u00fanica que nunca te cobran por seguir actualizando.');
f.faq_a3_en = rep1(f.faq_a3_en, 'Pro Tools Studio (/year subscription or perpetual) is what most commercial recording studios expect, post-production and collaboration,',
  'Pro Tools Studio (monthly or annual subscription) is what most commercial recording studios expect for post-production and collaboration,');
f.faq_a3_es = rep1(f.faq_a3_es, 'Pro Tools Studio (suscripci\u00f3n anual o licencia perpetua) es lo que esperan los estudios de grabaci\u00f3n profesionales comercial, postproducci\u00f3n y colaboraci\u00f3n,',
  'Pro Tools Studio (disponible mediante suscripci\u00f3n mensual o anual) es lo que esperan los estudios de grabaci\u00f3n comerciales para postproducci\u00f3n y colaboraci\u00f3n,');
f.faq_a5_en = rep1(f.faq_a5_en, 'Logic Pro 12 is a professional DAW', 'Logic Pro is a professional DAW');
f.faq_a5_es = rep1(f.faq_a5_es, 'Logic Pro 12 es un DAW profesional', 'Logic Pro es un DAW profesional');
console.log('FAQ fixed');
// ---------- VERDICT singular ----------
g.verdict = rep1(g.verdict, 'Reaper for budget recording, Logic Pro for all-round production, Ableton Live for electronic music, Pro Tools for professional studios.',
  'FL Studio for beatmakers with lifetime updates, Logic Pro for all-round Mac production, Ableton Live for electronic music and live performance, and Pro Tools for professional studios.');
g.verdict_es = rep1(g.verdict_es, 'Reaper para grabaci\u00f3n econ\u00f3mica, Logic Pro para producci\u00f3n polivalente, Ableton Live para m\u00fasica electr\u00f3nica y Pro Tools para estudios profesionales.',
  'FL Studio para beatmakers con actualizaciones de por vida, Logic Pro para producci\u00f3n polivalente en Mac, Ableton Live para m\u00fasica electr\u00f3nica y directo, y Pro Tools para estudios profesionales.');
console.log('verdict fixed');
// ---------- FL verdict cons ----------
const fl = g.verdictProsCons.find(x => x.name === 'FL Studio Producer Edition');
const n0 = fl.cons.length, n0es = fl.cons_es.length;
fl.cons = fl.cons.filter(x => x !== 'Windows-first history means the Mac version is newer');
fl.cons_es = fl.cons_es.filter(x => x !== 'La historia centrada en Windows hace que la versi\u00f3n Mac sea m\u00e1s reciente');
fl.cons = fl.cons.map(x => x === 'The permanent free version is stripped down \u2014 real work needs the Producer Edition'
  ? 'The free trial gives you everything but locks reopening saved projects until you buy a license' : x);
fl.cons_es = fl.cons_es.map(x => x === 'La versi\u00f3n gratuita permanente es muy recortada \u2014 el trabajo serio exige la Producer Edition'
  ? 'La versi\u00f3n de prueba gratuita te da acceso a todo, pero bloquea la reapertura de tus proyectos guardados hasta que adquieras una licencia' : x);
if (fl.cons.length !== n0 - 1 || fl.cons_es.length !== n0es - 1) throw new Error('FL cons count wrong');
if (!fl.cons.some(x => x.includes('locks reopening'))) throw new Error('FL trial con not replaced');
console.log('FL verdict fixed');
// ---------- SECTIONS ----------
const s0 = g.sections[0], s1 = g.sections[1], s6 = g.sections[6];
s0.content = rep1(s0.content, 'Ableton Live Lite ($99) is included with many audio interfaces and is great for electronic music.',
  'Ableton Live Lite (free with many audio interfaces) is great for electronic music.');
s0.content_es = rep1(s0.content_es, 'Ableton Live Lite ($99) viene incluida con muchas interfaces de audio y es genial para m\u00fasica electr\u00f3nica.',
  'Ableton Live Lite (gratis con muchas interfaces de audio) es genial para m\u00fasica electr\u00f3nica.');
s1.content_es = rep1(s1.content_es, 'Ableton Live ($99\u2013$749) es la opci\u00f3n principal',
  'Ableton Live (de Intro a Suite) es la opci\u00f3n principal');
s6.content = rep1(s6.content, 'and new Macs include access without extra steps.',
  'and a generous 90-day free trial lets you push it hard before buying.');
s6.content_es = rep1(s6.content_es, 'y los Mac nuevos incluyen acceso sin tr\u00e1mites.',
  'y ofrece una generosa prueba gratuita de 90 d\u00edas para exprimirlo a fondo antes de comprarlo.');
console.log('sections fixed');
fs.writeFileSync(gFile, JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
