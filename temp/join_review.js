const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let s = fs.readFileSync(p, 'utf8');
const old = "' + rows + '</div>';\n  return isLogic ? primaryBtn : primaryBtn + moreBtn;";
const neu = "' + rows + reviewRow + '</div>';\n  return isLogic ? primaryBtn + reviewRow : primaryBtn + moreBtn;";
const n = s.split(old).length - 1;
console.log('ocurrencias: ' + n);
if (n !== 1) { console.log('ABORTADO'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync(p, s, 'utf8');
console.log('OK: reviewRow dentro del desplegable y en Logic como boton suelto');