var fs = require('fs');
var src = fs.readFileSync('build-guides.js', 'utf8');

// Extract TEST_SHOP_BTN block
var btnStart = src.indexOf('const TEST_SHOP_BTN = {');
var btnEnd = src.indexOf('\n};', btnStart);
if (btnEnd === -1) btnEnd = src.indexOf('\n}\n', btnStart);
var btnBlock = src.substring(btnStart, btnEnd + 2);

// Extract SHOP_LOGO_TEXT
var logoMatch = src.match(/const SHOP_LOGO_TEXT = \{[^}]+\};/);
var logoBlock = logoMatch ? logoMatch[0] : '';

// Extract SHOP_LOGO_STYLE
var logoStyleMatch = src.match(/const SHOP_LOGO_STYLE = \{[\s\S]*?\};/);
var logoStyleBlock = logoStyleMatch ? logoStyleMatch[0] : '';

// Extract SHOP_FLAG (simplified)
var flagMatch = src.match(/const SHOP_FLAG = \{[^}]+\};/);
var flagBlock = flagMatch ? flagMatch[0] : '';

// Extract flagSVG functions (flagBadge through euFlag, before globeIcon)
var flagStart = src.indexOf('function flagBadge(');
var euFlagEnd = src.indexOf('\n}', src.indexOf('function euFlag'));
euFlagEnd = src.indexOf('\n}', euFlagEnd + 3);
var flagFuncs = src.substring(flagStart, euFlagEnd + 2);

// Extract shortTitle function
var shortTitleStart = src.indexOf('function shortTitle(');
var shortTitleEnd = src.indexOf('\nfunction ', shortTitleStart + 10);
var shortTitleFn = src.substring(shortTitleStart, shortTitleEnd);

// Extract ensurePbAff function
var pbAffStart = src.indexOf('function ensurePbAff(');
var pbAffEnd = src.indexOf('\nfunction ', pbAffStart + 10);
var pbAffFn = src.substring(pbAffStart, pbAffEnd);

// Extract wrapAffiliate function
var wrapStart = src.indexOf('function wrapAffiliate(');
var wrapEnd = src.indexOf('\nfunction ', wrapStart + 10);
var wrapFn = src.substring(wrapStart, wrapEnd);

// Extract normalizeMusicStore + normalizeMusicStoreInner functions
var nmsInnerStart = src.indexOf('function normalizeMusicStoreInner(');
var nmsInnerEnd = src.indexOf('\nfunction ', nmsInnerStart + 10);
var nmsInnerFn = src.substring(nmsInnerStart, nmsInnerEnd);
var nmsStart = src.indexOf('function normalizeMusicStore(');
var nmsEnd = src.indexOf('\nfunction ', nmsStart + 10);
var nmsFn = src.substring(nmsStart, nmsEnd);

// Extract getResolvedStores function
var grsStart = src.indexOf('function getResolvedStores(');
var grsEnd = src.indexOf('\nfunction ', grsStart + 10);
var grsFn = src.substring(grsStart, grsEnd);

// Extract shopButtonsTest function
var shopFnStart = src.indexOf('function shopButtonsTest(');
var shopFnEnd = src.indexOf('\nfunction ', shopFnStart + 10);
if (shopFnEnd === -1) shopFnEnd = src.indexOf('\nconst ', shopFnStart + 10);
var shopFn = src.substring(shopFnStart, shopFnEnd);

// Build shop-buttons.js
var output = `/* Botones nuevos de tiendas (TEST_SHOP_BTN) - compartido por el SPA. Generado desde build-guides.js */

let FLAG_UID = 0;

function flagBadge(inner) {
  const cid = 'flgc' + (++FLAG_UID);
  return '<svg viewBox="0 0 24 16" width="19" height="13" style="display:inline-block;vertical-align:-2px;flex-shrink:0;margin-right:5px">' +
    '<defs><clipPath id="' + cid + '"><rect width="24" height="16" rx="3.2"/></clipPath></defs>' +
    '<g clip-path="url(#' + cid + ')">' + inner + '</g>' +
    '<rect x=".5" y=".5" width="23" height="15" rx="2.7" fill="none" stroke="#ffffff" stroke-opacity=".35"/>' +
    '</svg>';
};

function usaFlag() {
  let s = '<rect width="24" height="16" fill="#fff"/><g fill="#B22234">';
  [0, 2.46, 4.92, 7.38, 9.85, 12.31, 14.77].forEach(function (y) { s += '<rect y="' + y + '" width="24" height="1.23"/>'; });
  s += '</g><rect width="10" height="8.62" fill="#3C3B6E"/><g fill="#fff">';
  [[1.9, 1.8], [4.1, 1.8], [6.3, 1.8], [8.5, 1.8], [3, 3.1], [5.2, 3.1], [7.4, 3.1], [1.9, 4.4], [4.1, 4.4], [6.3, 4.4], [8.5, 4.4], [3, 5.7], [5.2, 5.7], [7.4, 5.7]].forEach(function (p) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r=".42"/>'; });
  return flagBadge(s + '</g>');
};

function ukFlag() {
  let s = '<rect width="24" height="16" fill="#012169"/><g stroke="#fff" stroke-width="2">';
  s += '<line x1="0" y1="0" x2="24" y2="16"/><line x1="24" y1="0" x2="0" y2="16"/>';
  s += '</g><g stroke="#C8102E" stroke-width="1.2">';
  s += '<line x1="0" y1="0" x2="24" y2="16"/><line x1="24" y1="0" x2="0" y2="16"/>';
  s += '</g><g fill="#fff"><rect x="10" y="0" width="4" height="16"/><rect x="0" y="6" width="24" height="4"/></g>';
  s += '<g fill="#C8102E"><rect x="11" y="0" width="2" height="16"/><rect x="0" y="7" width="24" height="2"/></g>';
  return flagBadge(s);
};

function euFlag() {
  var scx = 12, scy = 8, sr = 5.5, ssr = 1.35, pts = [];
  for (var i = 0; i < 12; i++) {
    var a = (i * 30 - 90) * Math.PI / 180;
    var cx = scx + sr * Math.cos(a), cy = scy + sr * Math.sin(a);
    var sp = '';
    for (var j = 0; j < 5; j++) {
      var ao = ((j * 72 - 90) * Math.PI / 180), ai = (((j * 72 + 36) - 90) * Math.PI / 180);
      sp += (cx + ssr * Math.cos(ao)).toFixed(2) + ',' + (cy + ssr * Math.sin(ao)).toFixed(2) + ' ';
      sp += (cx + ssr * 0.38 * Math.cos(ai)).toFixed(2) + ',' + (cy + ssr * 0.38 * Math.sin(ai)).toFixed(2) + ' ';
    }
    pts.push(sp.trim());
  }
  var cid = 'flgc' + (++FLAG_UID);
  return '<svg viewBox="0 0 24 16" width="19" height="16" style="display:inline-block;vertical-align:-2px;flex-shrink:0;margin-right:5px">' +
    '<defs><clipPath id="' + cid + '"><rect width="24" height="16" rx="3.2"/></clipPath></defs>' +
    '<g clip-path="url(#' + cid + ')">' +
    '<rect width="24" height="16" fill="#003399"/>' +
    pts.map(function(p) { return '<polygon points="' + p + '" fill="#FFCC00"/>'; }).join('') +
    '</g>' +
    '<rect x=".5" y=".5" width="23" height="15" rx="2.7" fill="none" stroke="#ffffff" stroke-opacity=".35"/>' +
    '</svg>';
}

function globeIcon() {
  return flagBadge('<circle cx="12" cy="8" r="5.5" fill="none" stroke="#fff" stroke-width="1"/>' +
    '<ellipse cx="12" cy="8" rx="2.5" ry="5.5" fill="none" stroke="#fff" stroke-width=".8"/>' +
    '<line x1="6.5" y1="8" x2="17.5" y2="8" stroke="#fff" stroke-width=".7"/>' +
    '<path d="M7.5 5.5h9M7.5 10.5h9" stroke="#fff" stroke-width=".5"/>');
};

const SHOP_LOGO_TEXT = ${logoBlock.replace('const SHOP_LOGO_TEXT = ', '')};

${logoStyleBlock}

const SHOP_FLAG = { zzounds: usaFlag, reverb: globeIcon, gear4music: globeIcon, musicstore: euFlag, andertons: ukFlag };

${btnBlock}

${shortTitleFn}

${pbAffFn}

${wrapFn}

${nmsFn}

${nmsInnerFn}

${grsFn}

${shopFn}

window.tmgStoreButtons = function(p) {
  var lang = document.documentElement.lang || 'en';
  var isEs = lang.indexOf('es') === 0;
  var cat = (window.currentGuideCategory || '').toLowerCase();
  if (cat === 'daw') return '';
  try { return shopButtonsTest(p, isEs); } catch(e) { return ''; }
};
`;

fs.writeFileSync('js/shop-buttons.js', output, 'utf8');
console.log('shop-buttons.js regenerated (' + output.length + ' bytes)');
