var fs = require('fs');
var src = fs.readFileSync('AGENTS.md', 'utf8');
var idx = src.indexOf('REGLA IVA Music Store');
if (idx < 0) { console.log('NOT FOUND'); process.exit(1); }
var lineStart = src.lastIndexOf('\n', idx) + 1;
var lineEnd = src.indexOf('\n', idx);
var oldLine = src.substring(lineStart, lineEnd);
var newLine = '- **REGLA IVA Music Store**: mostrar precios SIN IVA (internacional en_OT/en_OE), que es lo que el usuario ve al hacer clic en el link afiliado. NO multiplicar por 1.19. Si la pagina de_DE muestra precio con IVA (ej. 105), dividir entre 1.19 para obtener el precio internacional (88.24). El link afiliado apunta a en_OT/EUR donde el precio es SIN IVA.';
src = src.substring(0, lineStart) + newLine + src.substring(lineEnd);
fs.writeFileSync('AGENTS.md', src, 'utf8');
console.log('AGENTS.md IVA rule updated');
