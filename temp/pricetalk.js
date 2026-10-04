const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
let hits = 0; const perGuide = {};
function scan(gid, field, t) {
  if (!t) return;
  const m = t.match(/\$|€|£|precio real|street price|La calle|cuestan|cuesta|price (hovers|is|was)|old ~\$/gi);
  if (m) { hits += m.length; perGuide[gid] = (perGuide[gid] || 0) + m.length; }
}
G.forEach(g => {
  scan(g.id, 'heading', (g.sections || []).map(s => (s.heading || '') + ' ' + (s.heading_es || '')).join(' '));
  (g.sections || []).forEach(s => { scan(g.id, 'sec', (s.content || '') + ' ' + (s.content_es || '')); });
  scan(g.id, 'intro', (g.intro || '') + ' ' + (g.intro_es || ''));
  scan(g.id, 'concl', (g.conclusion || '') + ' ' + (g.conclusion_es || ''));
  scan(g.id, 'verdict', (g.verdict || '') + ' ' + (g.verdict_es || ''));
  scan(g.id, 'desc', (g.description || '') + ' ' + (g.description_es || ''));
  (g.verdictProsCons || []).forEach(v => {
    scan(g.id, 'vpc', (v.pros || []).join(' ') + ' ' + (v.cons || []).join(' ') + ' ' + ((v.pros_es || []).join(' ')) + ' ' + ((v.cons_es || []).join(' ')));
  });
});
console.log('menciones precio en prosa:', hits);
const sorted = Object.entries(perGuide).sort((a, b) => b[1] - a[1]);
console.log('top guias:', sorted.slice(0, 20).map(([k, v]) => k + '=' + v).join(', '));
console.log('guias afectadas:', sorted.length);