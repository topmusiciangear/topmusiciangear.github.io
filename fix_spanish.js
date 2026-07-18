var fs = require('fs');
var content = fs.readFileSync('data/guides.json', 'utf8');

var replacements = [
  // Typo fixes
  [/emuln(?=[\s,\"])/g, 'emulan'],
  [/emulannn(?=[\s,\"])/g, 'emulan'],

  // Missing ñ
  [/\banyadir\b/g, 'añadir'],

  // diseno -> diseño (case-insensitive but need to keep case)
  [/\bdiseno\b/gi, function(m) { return m[0] === 'D' ? 'Diseño' : 'diseño'; }],

  // -cion -> -ción (any Spanish word ending in -cion)
  [/\b([a-zA-ZÀ-ÿ]+)cion\b/g, function(m, p1) { return p1 + 'ción'; }],

  // caracter -> carácter (only standalone word, not part of "característica" etc.)
  [/\bcaracter\b(?!ísticas?|ístico)/g, 'carácter'],

  // analogico -> analógico
  [/\banalogico\b/gi, 'analógico'],

  // Other accent fixes
  [/\brapida\b/gi, 'rápida'],
  [/\brapido\b(?=[\s,\"])/gi, 'rápido'],
  [/\beconomico\b/gi, function(m) { return m[0] === 'E' ? 'Económico' : 'económico'; }],
  [/\barmonico\b/gi, 'armónico'],
  [/\bautomatica\b/gi, 'automática'],
  [/\bcomoda\b/gi, 'cómoda'],
  [/\bsobrevivirian\b/g, 'sobrevivirían'],
  [/\belectronica\b/gi, 'electrónica'],
  [/\bmusica\b/gi, function(m) { return m[0] === 'M' ? 'Música' : 'música'; }],

  // aguda words ending in -l, -n
  [/\bportatil\b/gi, 'portátil'],
  [/\bfacil\b(?!idad)/gi, 'fácil'],

  // practica -> práctica (noun meaning "practice")
  [/\bpractica\s+(casa|silenciosa)\b/gi, function(m) { return m.replace(/\bpractica\b/i, 'práctica'); }],

  // mas -> más (comparative "more")
  [/\bmas\b/g, 'más'],
];

for (var i = 0; i < replacements.length; i++) {
  content = content.replace(replacements[i][0], replacements[i][1]);
}

fs.writeFileSync('data/guides.json', content);
console.log('Done');
