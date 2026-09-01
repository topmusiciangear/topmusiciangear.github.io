var fs = require('fs');
var src = fs.readFileSync('AGENTS.md', 'utf8');
var marker = 'Music Store SIEMPRE en euros';
var idx = src.indexOf(marker);
if (idx < 0) { console.log('NOT FOUND'); process.exit(1); }
var lineEnd = src.indexOf('\n', idx);
var addition = '\n- **Music Store SIN IVA**: los precios en TEST_SHOP_BTN deben ser SIN IVA (precio internacional en_OT/en_OE). El link afiliado apunta a la pagina internacional donde el usuario ve el precio sin IVA. NO multiplicar por 1.19. Si el precio viene de la pagina de_DE (con IVA), dividir entre 1.19.';
src = src.substring(0, lineEnd) + addition + src.substring(lineEnd);
fs.writeFileSync('AGENTS.md', src, 'utf8');
console.log('Added Music Store IVA permanent rule');
