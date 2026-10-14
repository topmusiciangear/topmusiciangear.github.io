const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-expensive');

const s0 = g.sections[0];
if ((s0.products || []).length === 1) { console.log('SEC0 ya es review de 1 producto: ' + JSON.stringify(s0.products)); }
else {
  if ((s0.products || []).length !== 2) die('SEC0 prods inesperados: ' + JSON.stringify(s0.products));
  s0.products = [157];
  console.log('SEC0 "' + s0.heading + '" -> [157]');
}

if (g.sections.some(s => s.heading === 'Ten Basses, One Idea: Spend on the Right Parts')) die('overview ya existe');
const all = g.featuredProducts.slice();
g.sections.unshift({
  heading: 'Ten Basses, One Idea: Spend on the Right Parts',
  heading_es: 'Diez bajos, una idea: gasta en las piezas correctas',
  products: all,
  content: '<p><strong>A cheap bass does not sound cheap because of the label — it sounds cheap because of three specific parts.</strong> The pickups decide the voice, the nut decides whether the strings buzz and drift, and the fretwork decides whether the neck feels fast or sticky. Everything else — body wood, binding, the finish on the headstock — is mostly appearance at this budget.</p><p><strong>That is why the list below is sorted by build, not by badge.</strong> Two Squier models earn their place because they use Fender-designed pickups and real vintage geometry; two Mexican-made Fenders earn theirs because the fit and finish sit a tier above anything else here. Pick the bass whose weak part you can live with, and spend nothing on an upgrade until you have played it for a month.</p>',
  content_es: '<p><strong>Un bajo barato no suena barato por la marca: suena barato por tres piezas concretas.</strong> Las pastillas deciden la voz, la cejuela decide si las cuerdas zumban y se desvanecen, y el estado de los trastes decide si el mástil parece rápido o pegajoso. Todo lo demás —la madera, los filetes, el acabado del clavijero— es sobre todo apariencia a este presupuesto.</p><p><strong>Por eso la lista de abajo está ordenada por construcción, no por chapa.</strong> Dos modelos Squier se ganan su sitio porque usan pastillas diseñadas por Fender y geometría vintage real; dos Fenders fabricados en México se lo ganan porque el ajuste y el acabado están un escalón por encima de todo lo demás de aquí. Elige el bajo cuya pieza floja puedas tolerar y no gastes en mejoras hasta que lo hayas tocado un mes.</p>'
});
console.log('overview inicial creado con ' + all.length + ' productos');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

const solo = g.sections.filter(s => (s.products || []).length === 1);
console.log('\nreviews de 1 producto: ' + solo.length);
console.log('cada producto con review: ' + all.every(id => solo.some(s => s.products[0] === id)));
console.log('sin duplicar en reviews: ' + new Set(solo.map(s => s.products[0])).size === solo.length);
console.log('secciones: ' + g.sections.length);
console.log('headings unicos: ' + new Set(g.sections.map(s => s.heading)).size === g.sections.length);
g.sections.forEach(s => console.log(' - ' + s.heading + ' | ' + JSON.stringify(s.products)));