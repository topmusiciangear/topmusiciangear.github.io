const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

const rows = [];
guides.forEach(function (g) {
  const fields = ['title', 'title_es', 'titleTag', 'titleTag_es'].filter(k => g[k] && g[k].length > 60);
  if (!fields.length) return;
  // agrupar por guia: si title y titleTag son iguales, basta cambiar uno
  rows.push({
    id: g.id,
    en: g.title,
    enT: g.titleTag,
    es: g.title_es,
    esT: g.titleTag_es
  });
});

console.log('GUIAS CON TITULOS > 60: ' + rows.length + ' / ' + guides.length);
console.log('');
rows.forEach(function (r, i) {
  const fl = [];
  ['en', 'enT', 'es', 'esT'].forEach(k => { if (r[k] && r[k].length > 60) fl.push(k + '(' + r[k].length + ')'); });
  console.log((i + 1) + '. ' + r.id + '   [' + fl.join(' ') + ']');
  if (r.en && r.en.length > 60) console.log('     EN: ' + JSON.stringify(r.en));
  if (r.es && r.es.length > 60) console.log('     ES: ' + JSON.stringify(r.es));
});