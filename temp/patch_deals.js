var fs = require('fs');
var f = 'build-deals.js';
var s = fs.readFileSync(f, 'utf8');
function rep(a, b) {
  if (s.indexOf(a) < 0) { console.log('NOT FOUND: ' + a.slice(0, 70)); process.exit(1); }
  s = s.split(a).join(b);
}
// 1. conditional image block (only render photo when the deal has one)
rep(
  '<a class="deal-img" href="${cjz(affWrap(d.store, d.store_url))}" target="_blank" rel="noopener noreferrer sponsored"><img src="${d.img}" alt="${d.title}" loading="lazy"></a>',
  '${d.img ? `<a class="deal-img" href="${cjz(affWrap(d.store, d.store_url))}" target="_blank" rel="noopener noreferrer sponsored"><img src="${d.img}" alt="${d.title}" loading="lazy"></a>` : ``}'
);
// 2. search bar CSS
rep(
  '    .deals-grid { display: grid;',
  '    .deals-search-wrap { max-width: 560px; margin: 20px auto 0; }\n    .deals-search { width: 100%; padding: 12px 18px; border-radius: 24px; border: 1px solid var(--border); background: var(--bg-card); color: var(--white); font-size: 15px; outline: none; }\n    .deals-search:focus { border-color: var(--accent); }\n    .deals-grid { display: grid;'
);
// 3. search input above grid
rep(
  '      <div class="deals-grid">',
  '      <div class="deals-search-wrap">\n        <input id="dealsSearch" class="deals-search" type="search" placeholder="${t(\'Search deals by product name\', \'Buscar ofertas por producto\')}">\n      </div>\n      <div class="deals-grid" id="dealsGrid">'
);
// 4. live filter script (no newlines in anchor: CRLF-safe)
rep(
  'window.toggleNavDropdown=',
  '(function(){var si=document.getElementById(\'dealsSearch\');if(si){si.addEventListener(\'input\',function(){var q=si.value.toLowerCase().trim();document.querySelectorAll(\'#dealsGrid .deal-card\').forEach(function(c){c.style.display=(!q||c.textContent.toLowerCase().indexOf(q)>-1)?\'\':\'none\';});});}})();window.toggleNavDropdown='
);
fs.writeFileSync(f, s);
console.log('patch OK');
