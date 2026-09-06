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
  const gid = 'gln' + (++FLAG_UID);
  const gcid = 'glo' + (++FLAG_UID);
  return '<svg viewBox="0 0 20 20" width="19" height="19" style="display:inline-block;vertical-align:-5px;flex-shrink:0;margin-right:5px">' +
    '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#67c6f8"/><stop offset="1" stop-color="#2563eb"/></linearGradient>' +
    '<clipPath id="' + gcid + '"><circle cx="10" cy="10" r="8.75"/></clipPath></defs>' +
    '<circle cx="10" cy="10" r="8.75" fill="url(#' + gid + ')"/>' +
    '<g clip-path="url(#' + gcid + ')">' +
    '<path d="M2.6,6.4 Q4.4,4.2 6.6,5 Q8.5,5.7 8.2,7.5 Q7.8,9.4 5.7,9.4 Q2.9,9.3 2.6,6.4 Z" fill="#34d399"/>' +
    '<path d="M11.6,3.2 Q13.8,2.6 14.9,4.4 Q15.8,6 13.9,6.9 Q12,7.7 11.2,5.9 Q10.5,4.3 11.6,3.2 Z" fill="#34d399"/>' +
    '<path d="M11.9,11.7 Q14,10.9 15.2,12.5 Q16.3,14.2 14.6,15.5 Q12.8,16.8 11.4,15.1 Q10.2,13.5 11.9,11.7 Z" fill="#22c55e"/>' +
    '<path d="M4.2,12.3 Q5.8,11.7 6.6,13 Q7.3,14.3 6,15.3 Q4.5,16.3 3.5,15 Q2.6,13.5 4.2,12.3 Z" fill="#22c55e"/>' +
    '<ellipse cx="10" cy="10" rx="4.4" ry="8.75" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width=".7"/>' +
    '<path d="M1.25,10 H18.75" stroke="#fff" stroke-opacity=".35" stroke-width=".7"/>' +
    '</g><circle cx="10" cy="10" r="8.75" fill="none" stroke="#fff" stroke-opacity=".4"/></svg>';
};

const SHOP_LOGO_TEXT = ${logoBlock.replace('const SHOP_LOGO_TEXT = ', '')};

${logoStyleBlock}

const SHOP_FLAG = { zzounds: usaFlag, reverb: globeIcon, gear4music: ukFlag, musicstore: euFlag, andertons: ukFlag, amazon: globeIcon };

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

(function() {
  function doSwap(T) {
    document.querySelectorAll('.guide-product-card-stores, .guide-section-buy, .shop-buttons-wrap').forEach(function(c) {
      var pb = c.querySelector('.shop-btn-primary');
      if (!pb) return;
      var curStore = pb.getAttribute('data-store') || '';
      if (curStore === 'pluginboutique') return;
      if (curStore === T || curStore === 'msdirect') return;
      var zRow = c.querySelector('[data-store="' + T + '"]');
      if (!zRow) return;
      if (!zRow.getAttribute('href')) return;
      var ml2 = c.querySelector('.shop-more-list');
      var zUrl = zRow.getAttribute('href');
      var zPrice = '';
      var zMatch = zRow.innerHTML.match(/font-weight:700;color:#fff[^>]*>([^<]+)/);
      if (zMatch) zPrice = zMatch[1];
      var aUrl = pb.getAttribute('href');
      var newPrimary = '<a href="' + zUrl + '" target="_blank" rel="noopener noreferrer sponsored" class="shop-btn-primary" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:0 16px;height:40px;border-radius:12px;background:#3b82f6;color:#fff;font-size:15px;font-weight:800;text-decoration:none;border:none;cursor:pointer;box-shadow:0 4px 16px rgba(59,130,246,.35);transition:box-shadow .2s ease,filter .2s ease,transform .18s ease" onmouseover="this.style.filter=\\'brightness(1.05)\\'" onmouseout="this.style.filter=\\'\\'"><span style="display:flex;align-items:center;gap:10px"><svg viewBox="0 0 576 512" width="1em" height="1em" fill="#fff" style="flex-shrink:0"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0-5.4 21.7c-1.1 4.5-.6 9.2 1.4 13.3L482.3 320l24 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-88 0c-30.9 0-56-25.1-56-56c0-25.9 17.6-47.6 41.5-53.9L442 128l-305.6 0c-14 26-33.1 60.1-44.4 81.5c-11 20.6-36.6 28.4-57.2 17.4c-20.6-11-28.4-36.6-17.4-57.2C35.7 133 63 82.9 74.5 61.8C83.5 45.1 100.9 34 120.8 34L96 34C82.7 34 72 23.3 72 20L0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg><span style="display:flex;align-items:center;gap:10px">Buy at<span style="' + (SHOP_LOGO_STYLE[T] || 'font-weight:700') + '">' + (SHOP_LOGO_TEXT[T] || T) + '</span>' + (zPrice ? ' - ' + zPrice : '') + '</span></span></a>';
      zRow.style.display = 'none';
      pb.insertAdjacentHTML('beforebegin', newPrimary);
      pb.remove();
      if (ml2 && !ml2.querySelector('[data-store="' + curStore + '"]')) {
        var dispPrice = '';
        var dispMatch = pb.innerHTML.match(/- ([$\u00a3\u20ac][0-9.,]+)/);
        if (dispMatch) dispPrice = dispMatch[1];
        var dispPriceSpan = dispPrice ? '<span style="margin-left:auto;display:flex;align-items:baseline;gap:6px;white-space:nowrap"><span style="font-weight:700;color:#fff">' + dispPrice + '</span></span>' : '';
        var dispNotes = { zzounds: ['(Planes de pago f\u00e1ciles)', '(Easy Payment Plans)'], reverb: ['(Mercado nuevo y usado)', '(New & Used Market)'], gear4music: ['(Env\u00edos r\u00e1pidos UK)', '(Fast UK Delivery)'], andertons: ['(Soporte experto)', '(Expert Support)'], musicstore: ['(Garant\u00eda de 3 a\u00f1os)', '(3-Year Warranty)'], amazon: ['(Env\u00edo Prime)', '(Prime Delivery)'] };
        var isEsPage = (document.documentElement.lang || 'en').indexOf('es') === 0;
        var dispNm = SHOP_LOGO_TEXT[curStore] || curStore;
        var dispSt = SHOP_LOGO_STYLE[curStore] || 'font-weight:700';
        var dispFlag = SHOP_FLAG[curStore] ? SHOP_FLAG[curStore]() : '';
        var dispNote = dispNotes[curStore] ? '<span style="color:#a8a8a8;font-size:12px;font-weight:600">' + (isEsPage ? dispNotes[curStore][0] : dispNotes[curStore][1]) + '</span>' : '';
        var dispRow = '<a data-store="' + curStore + '" href="' + aUrl + '" target="_blank" rel="noopener noreferrer sponsored" style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;height:40px;border-radius:12px;background:#333333;transition:transform .18s ease,background .18s ease,box-shadow .18s ease;color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;border:none"><span style="display:flex;align-items:center">' + dispFlag + '<span style="' + dispSt + '">' + dispNm + '</span></span>' + dispNote + dispPriceSpan + '</a>';
        ml2.insertAdjacentHTML('afterbegin', dispRow);
      }
    });
  }
  function quickTarget() {
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    var isUSTZ = /^America[\/](New_York|Chicago|Denver|Los_Angeles|Anchorage|Phoenix|Indiana|Detroit|Boise|Menominee|Kentucky|North_Dakota|Pangnirtung|Rankin_Inlet|Resolute|Yellowknife|Whitehorse|Dawson|Vancouver|Edmonton|Regina|Swift_Current|Winnipeg|Thunder_Bay|Nipigon|IQaluit|Moncton|St_Johns|Halifax|Glace_Bay|Blanc_Sablon|Atikokan|Goose_Bay|Nassau|Fortaleza|Bahia_Banderas|Curacao|Guadeloupe|Martinique|St_Barthelemy|St_Kitts|St_Lucia|St_Thomas|St_Vincent|Aruba|Turks_and_Caicos|Cayman|Bermuda|Puerto_Rico|Virgin)\b/.test(tz);
    if (isUSTZ) return 'zzounds';
    if (/^Europe[/]London([/]|$)/.test(tz)) return 'gear4music';
    return null;
  }
  function applyNow(T) {
    if (T === 'none') T = 'amazon';
    if (!T) return;
    try { window.__tmgGeoDone = T; window.__tmgGeoResolved = T; } catch (e) {}
    doSwap(T);
    var ev = null;
    try { ev = window.__tmgGeoHandlers; } catch (e) {}
    if (ev) {
      for (var i = 0; i < ev.length; i++) { try { ev[i](T); } catch (e) {} }
      ev.length = 0;
    }
  }
  function geoZone(c) {
    var MS = {'AT':1,'BE':1,'BA':1,'BG':1,'HR':1,'CZ':1,'DK':1,'EE':1,'FI':1,'FR':1,'DE':1,'GR':1,'HU':1,'IE':1,'IT':1,'LV':1,'LT':1,'LU':1,'NL':1,'NO':1,'PL':1,'PT':1,'RO':1,'RU':1,'RS':1,'SI':1,'ZA':1,'ES':1,'SE':1,'CH':1,'TR':1};
    c = (c || '').toUpperCase();
    return c === 'US' ? 'zzounds' : c === 'GB' ? 'gear4music' : MS[c] ? 'musicstore' : 'none';
  }
  window.tmgGeoSwap = function() {
    if (window.__tmgGeoResolved) { applyNow(window.__tmgGeoResolved); return; }
    var q = quickTarget();
    if (q) applyNow(q);
    if (window.__tmgGeoPending) return;
    try { window.__tmgGeoPending = 1; } catch (e) {}
    var gres = false;
    function gApply(c) {
      if (!c || gres) return;
      c = (c || '').toUpperCase();
      if (c === 'XX') return;
      gres = true;
      applyNow(geoZone(c));
    }
    function gFallback() {
      if (gres) return;
      var y = new XMLHttpRequest();
      y.open('GET', 'https://ipinfo.io/json', true);
      y.timeout = 4000;
      y.onload = function() {
        try {
          var r = JSON.parse(y.responseText);
          if (r && r.country) gApply(r.country);
        } catch (e) {}
        try { window.__tmgGeoPending = 0; } catch (e) {}
      };
      y.onerror = y.ontimeout = function() { try { window.__tmgGeoPending = 0; } catch (e) {} };
      y.send();
    }
    var x = new XMLHttpRequest();
    x.open('GET', 'https://1.1.1.1/cdn-cgi/trace', true);
    x.timeout = 4000;
    x.onload = function() {
      try {
        var m = /(?:^|\\n)loc=(\\S+)/.exec(x.responseText);
        if (m && m[1]) gApply(m[1]);
      } catch (e) {}
      try { window.__tmgGeoPending = 0; } catch (e) {}
      gFallback();
    };
    x.onerror = x.ontimeout = function() {
      try { window.__tmgGeoPending = 0; } catch (e) {}
      gFallback();
    };
    x.send();
  };
})();
`;

fs.writeFileSync('js/shop-buttons.js', output, 'utf8');
console.log('shop-buttons.js regenerated (' + output.length + ' bytes)');
