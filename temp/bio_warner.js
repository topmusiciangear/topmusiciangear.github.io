var fs = require('fs');
function repFile(f, pairs) {
  var s = fs.readFileSync(f, 'utf8');
  pairs.forEach(function (pr) {
    var n = s.split(pr[0]).length - 1;
    if (!n) { console.log('NOT FOUND in ' + f + ': ' + pr[0].slice(0, 60)); process.exit(1); }
    s = s.split(pr[0]).join(pr[1]);
    console.log(f + ' x' + n + ': ' + pr[0].slice(0, 50));
  });
  fs.writeFileSync(f, s);
}
var enA = 'Together we produced Regueton a lo Cubano, the first reggaeton album ever made in Cuba with a foreign label. I produced 7 of its tracks';
var enB = 'Together, in collaboration with Warner Music Sweden, we produced Regueton a lo Cubano, the first reggaeton album ever made in Cuba with a foreign label. I produced 7 of its tracks';
var esA = 'Juntos produjimos Regueton a lo Cubano, el primer disco de reguetón hecho en Cuba con un sello extranjero. Produje 7 de sus temas';
var esB = 'Juntos, en colaboración con Warner Music Sweden, produjimos Regueton a lo Cubano, el primer disco de reguetón hecho en Cuba con un sello extranjero. Produje 7 de sus temas';
repFile('js/translations.js', [[enA, enB], [esA, esB]]);
repFile('js/translations.v4.min.js', [[enA, enB], [esA, esB]]);
repFile('about.html', [
  ['Together we produced <em>Regueton a lo Cubano</em>, the first reggaeton album ever made in Cuba with a foreign label. I produced 7 of its tracks', 'Together, in collaboration with Warner Music Sweden, we produced <em>Regueton a lo Cubano</em>, the first reggaeton album ever made in Cuba with a foreign label. I produced 7 of its tracks'],
  ['Juntos produjimos <em>Regueton a lo Cubano</em>, el primer disco de reguetón hecho en Cuba con una disquera extranjera. Produje 7 pistas de ese CD', 'Juntos, en colaboración con Warner Music Sweden, produjimos <em>Regueton a lo Cubano</em>, el primer disco de reguetón hecho en Cuba con una disquera extranjera. Produje 7 pistas de ese CD']
]);
new Function(fs.readFileSync('js/translations.v4.min.js', 'utf8'));
new Function(fs.readFileSync('js/translations.js', 'utf8'));
console.log('syntax OK');
