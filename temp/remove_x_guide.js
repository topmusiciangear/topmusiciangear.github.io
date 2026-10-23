const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = "            <button type=\"button\" id=\"topSearchClose\" class=\"top-search-btn\" aria-label=\"${isEs ? 'Cerrar' : 'Close'}\">&times;</button>\r\n";
const neu = "";
if (!s.includes(old)) { console.log('NOT FOUND close btn'); } else {
  s = s.replace(old, neu);
  fs.writeFileSync('build-guides.js', s);
  console.log('done');
}