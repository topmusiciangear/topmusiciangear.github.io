const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = B + 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');

// 1) scoreBadge(p) -> scoreBadge(p, lang) con texto bilingue
const oldFn = `function scoreBadge(p) {
  if (p.score === undefined || p.score === null) return '';
  var score = Number(p.score).toFixed(1);
  var pct = (Number(p.score) - 5) / 5 * 100;
  if (pct < 0) pct = 0;
  if (pct > 100) pct = 100;
  var aria = 'Nuestra nota: ' + score + ' sobre 10 (escala de 5 a 10)';`;

const newFn = `function scoreBadge(p, lang) {
  if (p.score === undefined || p.score === null) return '';
  var score = Number(p.score).toFixed(1);
  var pct = (Number(p.score) - 5) / 5 * 100;
  if (pct < 0) pct = 0;
  if (pct > 100) pct = 100;
  var isEs = lang === 'es';
  var label = isEs ? 'Nota' : 'Score';
  var aria = isEs
    ? 'Nuestra nota: ' + score + ' sobre 10 (escala de 5 a 10)'
    : 'Our score: ' + score + ' out of 10 (scale 5 to 10)';`;

if (s.indexOf(oldFn) >= 0) {
  s = s.replace(oldFn, newFn);
  console.log('scoreBadge: added lang parameter');
} else {
  console.log('ERROR: oldFn not found');
  process.exit(1);
}

// 2) Replace "Nota" text inside badge with dynamic label
s = s.replace(
  "text-transform:uppercase;margin-top:.06em;\">Nota</div>'",
  "text-transform:uppercase;margin-top:.06em;\">' + label + '</div>'"
);

// 3) Update call site: scoreBadge(p) -> scoreBadge(p, lang)
s = s.replace('${scoreBadge(p)}', '${scoreBadge(p, lang)}');

fs.writeFileSync(f, s, 'utf8');
console.log('build-guides.js actualizado: badge bilingue');