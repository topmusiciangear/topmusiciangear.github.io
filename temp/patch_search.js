const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = "      <div class=\"guide-back-row\">\r\n        <a href=\"${isEs ? '/es/' : '/'}?cat=${guide.category}#guides\" class=\"guide-back-btn\">${icon('arrow-left', 'fa-solid')} ${isEs ? 'Volver a Guías' : 'Back to Guides'}</a>\r\n      </div>\r\n";
const neu = "      <div class=\"guide-back-row\">\r\n        <a href=\"${isEs ? '/es/' : '/'}?cat=${guide.category}#guides\" class=\"guide-back-btn\">${icon('arrow-left', 'fa-solid')} ${isEs ? 'Volver a Guías' : 'Back to Guides'}</a>\r\n        <div class=\"guide-search-wrap\"><input type=\"search\" id=\"guideSearch\" class=\"guide-search-input\" placeholder=\"${isEs ? 'Buscar en la guía...' : 'Search in guide...'}\" aria-label=\"${isEs ? 'Buscar en la guía' : 'Search in guide'}\"></div>\r\n      </div>\r\n";
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('build-guides.js', s);
console.log('done');