const p = require('../data/products.json');
const x = p.find(z => z.id === 303);
console.log('NAME:', x.title_es);
const d = x.desc_es;
console.log('DESC:', d.slice(0, 200));

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const article = '(?:(?:El|La|Los|Las|Un|Una)\\s+)?';
const VERBS = 'es|son|trae|traen|tiene|tienen|ofrece|ofrecen|incluye|incluyen|llega|llegan|sale|salen|viene|vienen|representa|representan|supone|suponen|aporta|aportan|da|dan|entrega|entregan|combina|combinan|mantiene|mantienen|usa|usan|utiliza|utilizan|anade|anaden|suma|suman|cuenta|cuentan|esta|estan|sigue|siguen|permite|permiten|promete|prometen|cuesta|cuestan|marca|marcan|define|definen|destaca|destacan|pone|ponen|concentra|concentran|lleva|llevan|mete|meten|demuestra|demuestran|integra|integran|incorpora|incorporan|actualiza|actualizan|recoge|recogen|is|are|delivers|deliver|brings|bring|offers|offer|has|have|includes|include|comes|come|features|feature|uses|use|provides|provide|packs|pack|combines|combine|sits|sit|remains|remain|adds|add|gives|give|works|work|sounds|sound|stands|stand|represents|represent|serves|serve|makes|make|takes|take|pairs|pair|updates|update';
const verb = '(?=(?:' + VERBS + ')\\b)';
const name = 'Genelec 8010A';
const full = new RegExp('^' + article + esc(name) + '\\s+' + verb, 'i');
console.log('full test:', full.test(d));
if (full.test(d)) console.log('MATCH:', d.replace(full, '').slice(0, 150));