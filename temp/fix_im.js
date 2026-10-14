const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/im_reviews.js';
let s = fs.readFileSync(f, 'utf8');
// detectar y limpiar caracteres no latinos/CJK colgantes antes de ejecutar
const m = s.match(/[\u4e00-\u9fff]/g);
console.log('CJK encontrados: ' + (m ? JSON.stringify([...new Set(m)]) : 'ninguno'));
s = s.split('输出').join(' salida');
s = s.split('violonchelista Violationista').join('violonchelista');
s = s.split('el pad cubre los casos、糖尿病').join('el pad cubre los casos más ruidosos');
s = s.split('En batería es-landmarks;').join('En batería es imprescindible;');
s = s.split('Al ir Subject a attached en vez de orientado').join('Al ir sujeto al instrumento en vez de orientado');
s = s.split('conmicrófonos de varilla').join('con micrófonos de varilla');
s = s.split('y tienes que sacar monitores y monitores de escenario de ese punto').join('y tienes que sacar los monitores y las pantallas de escenario de ese punto');
// quitar el bloque de "fixes" muerto que queda
s = s.replace(/const fixes = \[[\s\S]*?\];\n/, '');
s = s.replace(/NEW\[1\]\.content = NEW\[1\]\.content\.replace\('<p><strong> pasan dos cosas', '<p><strong>Pasan dos cosas'\);\n/, "NEW[1].content = NEW[1].content.replace('<p><strong> pasan dos cosas', '<p><strong>Pasan dos cosas');\n");
s = s.replace(/NEW\[2\]\.content_es = NEW\[2\]\.content_es\.replace\('En batería es-landmarks; como micrófono', 'En batería esaltz'\); \/\/ se sustituye mas abajo\n/, '');
s = s.replace(/NEW\[2\]\.content_es = NEW\[2\]\.content_es\.replace\('En batería es-landmarks; como micrófono', 'En batería esHn; como micrófono'\);\n/, '');
s = s.replace(/NEW\[2\]\.content_es = NEW\[2\]\.content_es\.replace\('En batería esHn; como micrófono', 'En batería es Landmarks; como micrófono'\);\n/, '');
s = s.replace(/NEW\[2\]\.content_es = NEW\[2\]\.content_es\.replace\('En batería es Landmarks; como micrófono', 'En batería eslandmark; como micrófono'\);\n/, '');
s = s.replace(/NEW\[2\]\.content_es = NEW\[2\]\.content_es\.replace\('En batería eslandmark; como micrófono', 'En batería es imprescindible; como micrófono'\);\n/, '');
s = s.replace(/NEW\[2\]\.content_es = NEW\[2\]\.content_es\.replace\('el pad cubre los casos、糖尿病', 'el pad cubre los casos más ruidosos'\);\n/, '');
s = s.replace(/NEW\[6\]\.content_es = NEW\[6\]\.content_es\.replace\('el pad cubre los casos más ruidosos, y el carácter', 'el pad cubre los casos más ruidosos, y el carácter'\);\n/, '');
s = s.replace(/^\/\/ correccion de erratas accidentales del bloque de arriba\n/m, '');
fs.writeFileSync(f, s, 'utf8');
const m2 = s.match(/[\u4e00-\u9fff]/g);
console.log('CJK tras limpiar: ' + (m2 ? JSON.stringify([...new Set(m2)]) : 'ninguno'));
console.log('--- lineas de limpieza restantes ---');
s.split('\n').forEach((l, i) => { if (/content_es = NEW|content = NEW|const fixes/.test(l)) console.log('  ' + (i + 1) + ': ' + l.trim().slice(0, 110)); });