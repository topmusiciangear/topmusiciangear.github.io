const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const st = x => String(x).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const rotas = [];
let campos = 0;

function check(cont, ruta) {
  if (typeof cont !== 'string' || !cont) return;
  campos++;
  const a = (cont.match(/<p>/g) || []).length;
  const b = (cont.match(/<\/p>/g) || []).length;
  const lt = (cont.match(/<li>/g) || []).length;
  const li = (cont.match(/<\/li>/g) || []).length;
  const td = (cont.match(/<td>/g) || []).length;
  const td2 = (cont.match(/<\/td>/g) || []).length;
  if (a !== b || lt !== li || td !== td2)
    rotas.push([ruta, '<p>=' + a + '</p>=' + b + ' <li>=' + lt + '</li>=' + li + ' <td>=' + td + '</td>=' + td2]);
}

guides.forEach(g => {
  ['intro', 'conclusion', 'verdict', 'description', 'intro_es', 'conclusion_es', 'verdict_es', 'description_es']
    .forEach(k => check(g[k], g.id + '.' + k));
  (g.sections || []).forEach((s, i) => {
    check(s.content, g.id + '.sections[' + i + '].content');
    check(s.content_es, g.id + '.sections[' + i + '].content_es');
  });
  (g.faq || []).forEach((f, i) => { check(f.a, g.id + '.faq[' + i + '].a'); check(f.a_es, g.id + '.faq[' + i + '].a_es'); });
});

console.log('guias: ' + guides.length + ' | campos de texto revisados: ' + campos);
console.log('campos con HTML DESEQUILIBRADO: ' + rotas.length);
rotas.slice(0, 25).forEach(r => console.log('   ' + r[0] + '   ' + r[1]));