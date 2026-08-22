/* Botones nuevos de tiendas (TEST_SHOP_BTN) - compartido por el SPA. Generado desde build-guides.js */

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
  return flagBadge('<rect width="24" height="16" fill="#012169"/>' +
    '<path d="M0,0 L24,16 M24,0 L0,16" stroke="#fff" stroke-width="3.4"/>' +
    '<path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" stroke-width="1.3"/>' +
    '<path d="M12,0 V16 M0,8 H24" stroke="#fff" stroke-width="5.6"/>' +
    '<path d="M12,0 V16 M0,8 H24" stroke="#C8102E" stroke-width="3.4"/>');
};

function globeIcon() {
  const gid = 'glg' + (++FLAG_UID);
  const gcid = 'glc' + (++FLAG_UID);
  return '<svg viewBox="0 0 20 20" width="19" height="19" style="display:inline-block;vertical-align:-5px;flex-shrink:0;margin-right:5px">' +
    '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#67c6f8"/><stop offset="1" stop-color="#2563eb"/></linearGradient>' +
    '<clipPath id="' + gcid + '"><circle cx="10" cy="10" r="8.75"/></clipPath></defs>' +
    '<circle cx="10" cy="10" r="8.75" fill="url(#' + gid + ')"/>' +
    '<g clip-path="url(#' + gcid + ')">' +
    '<path d="M2.6,6.4 Q4.4,4.2 6.6,5 Q8.5,5.7 8.2,7.5 Q7.8,9.4 5.7,9.4 Q2.9,9.3 2.6,6.4 Z" fill="#34d399"/>' +
    '<path d="M11.6,3.2 Q13.8,2.6 14.9,4.4 Q15.8,6 13.9,6.9 Q12,7.7 11.2,5.9 Q10.5,4.3 11.6,3.2 Z" fill="#34d399"/>' +
    '<path d="M11.9,11.7 Q14,10.9 15.2,12.5 Q16.3,14.2 14.6,15.5 Q12.8,16.8 11.4,15.1 Q10.2,13.5 11.9,11.7 Z" fill="#22c55e"/>' +
    '<path d="M4.2,12.3 Q5.8,11.7 6.6,13 Q7.3,14.3 6,15.3 Q4.5,16.3 3.5,15 Q2.6,13.5 4.2,12.3 Z" fill="#22c55e"/>' +
    '<ellipse cx="10" cy="10" rx="4.4" ry="8.75" fill="none" stroke="#ffffff" stroke-opacity=".35" stroke-width=".7"/>' +
    '<path d="M1.25,10 H18.75" stroke="#ffffff" stroke-opacity=".35" stroke-width=".7"/>' +
    '</g>' +
    '<circle cx="10" cy="10" r="8.75" fill="none" stroke="#ffffff" stroke-opacity=".4"/>' +
    '<ellipse cx="7.2" cy="6.2" rx="3.2" ry="1.8" fill="#ffffff" opacity=".25"/>' +
    '</svg>';
};

const SHOP_LOGO_STYLE = {
  gear4music: "font-family:'Quicksand','Segoe UI',sans-serif;font-weight:700;color:#fff;letter-spacing:-.3px;font-size:15px",
  andertons: "font-family:'Yellowtail',cursive;font-weight:400;color:#fff;font-size:19px",
  musicstore: "font-family:'Open Sans Condensed','Arial Narrow',Arial,sans-serif;font-weight:700;color:#fff;font-size:18px;letter-spacing:.5px",
  zzounds: "font-family:'Poppins',Arial,sans-serif;font-weight:800;font-style:italic;color:#fff;letter-spacing:-.5px;font-size:15px",
  reverb: "font-family:'Kaushan Script',cursive;font-weight:400;color:#fff;font-size:17px"
};

const SHOP_LOGO_TEXT = { gear4music: 'Gear4music', andertons: 'Andertons', musicstore: 'Music Store', zzounds: 'zZounds', reverb: 'Reverb' };

const SHOP_FLAG = { zzounds: usaFlag, reverb: globeIcon, gear4music: globeIcon, musicstore: globeIcon, andertons: ukFlag };

const TEST_SHOP_BTN = {
  15: { prices: { amazon: '$199.00', zzounds: '$224.99', reverb: '$199.00', gear4music: '\u00a3193.75', andertons: '\u00a3185.00', musicstore: '\u20ac172.00' } },
  16: { prices: { amazon: '$999.00', zzounds: '$999.00', reverb: '$999.00', gear4music: '\u00a3849.00', andertons: '\u00a3849.00', musicstore: '\u20ac945.00' } },
  17: { prices: { amazon: '$999.00', zzounds: '$999.00', reverb: '$999.00', gear4music: '\u00a3715.00', andertons: '\u00a3715.00', musicstore: '\u20ac911.40' } },
  18: { prices: { amazon: '$249.99', zzounds: '$299.99', reverb: '$249.99', gear4music: '\u00a3227.00', andertons: '\u00a3227.00', musicstore: '\u20ac295.00' } },
  53: { prices: { amazon: '$295.00', zzounds: '$399.99', reverb: '$295.00', gear4music: '\u00a3178.75', andertons: '\u00a3175.00', musicstore: '\u20ac214.29' } },
  54: { prices: { amazon: '$199.95', zzounds: '$199.95', reverb: '$199.95', gear4music: '\u00a3226.00', andertons: '\u00a3210.00', musicstore: '\u20ac209.20' } },
  55: { prices: { amazon: '$179.00', zzounds: '$199.00', reverb: '$179.00', gear4music: '\u00a3153.00', andertons: '\u00a3149.00', musicstore: '\u20ac133.60' } },
  328: { prices: { zzounds: '$219.00', reverb: '$219.00', andertons: '\u00a3152.00' } },
  5: { prices: { amazon: '$109.00', zzounds: '$109.00', reverb: '$109.00', gear4music: '\u00a3103.50', andertons: '\u00a3103.00', musicstore: '\u20ac105.00' } },
  3: { prices: { amazon: '$249.00', zzounds: '$214.00', reverb: '$249.00', gear4music: '\u00a3184.75', andertons: '\u00a3182.00', musicstore: '\u20ac199.00' } },
  25: { prices: { amazon: '$149.00', zzounds: '$159.00', reverb: '$149.00', gear4music: '\u00a3148.00', andertons: '\u00a3133.00', musicstore: '\u20ac149.00' } },
  4: { prices: { amazon: '$1,225.00', zzounds: '$1,199.00', reverb: '$1,225.00', gear4music: '\u00a3893.00', andertons: '\u00a3849.00', musicstore: '\u20ac772.30' } },
  2: { prices: { amazon: '$3,750.00', zzounds: '$3,750.00', reverb: '$3,750.00', andertons: '\u00a33,008.00' } },
  1: { prices: { amazon: '$439.00', zzounds: '$439.00', reverb: '$439.00', gear4music: '\u00a3381.50', andertons: '\u00a3381.00', musicstore: '\u20ac389.00' } },
  50: { prices: { amazon: '$109.00', zzounds: '$99.00', reverb: '$109.00', gear4music: '\u00a3103.50', andertons: '\u00a3103.00', musicstore: '\u20ac119.00' } },
  51: { prices: { amazon: '$265.38', zzounds: '$279.00', reverb: '$265.38', gear4music: '\u00a3225.00', musicstore: '\u20ac249.00' } },
  52: { prices: { amazon: '$449.00', zzounds: '$449.00', reverb: '$449.00', gear4music: '\u00a3539.00', andertons: '\u00a3549.00', musicstore: '\u20ac539.00' } },
  26: { prices: { amazon: '$99.99', reverb: '$99.99', gear4music: '\u00a399.00', musicstore: '\u20ac89.00' }, urls: { zzounds: 'https://www.zzounds.com/item--SNYMDR7506' }, oos: ['andertons'] },
  20: { prices: { amazon: '$269.00', zzounds: '$269.00', reverb: '$269.00', gear4music: '\u00a3199.25', musicstore: '\u20ac266.00' }, oos: ['andertons'] },
  19: { prices: { amazon: '$398.99', zzounds: '$339.14', reverb: '$398.99', gear4music: '\u00a3263.00', andertons: '\u00a3254.00', musicstore: '\u20ac289.00' } }
};

function shopButtonsTest(p, lang) {
  const cfg = TEST_SHOP_BTN[p.id] || {};
  const prices = cfg.prices || {};
  const stores = getResolvedStores(p);
  const t = (es, en) => lang === 'es' ? es : en;
  const cartSvg = '<svg viewBox="0 0 576 512" width="1em" height="1em" fill="#fff" style="flex-shrink:0"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0-5.4 21.7c-1.1 4.5-.6 9.2 1.4 13.3L482.3 320l24 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-88 0c-30.9 0-56-25.1-56-56c0-25.9 17.6-47.6 41.5-53.9L442 128l-305.6 0c-14 26-33.1 60.1-44.4 81.5c-11 20.6-36.6 28.4-57.2 17.4c-20.6-11-28.4-36.6-17.4-57.2C35.7 133 63 82.9 74.5 61.8C83.5 45.1 100.9 34 120.8 34L96 34C82.7 34 72 23.3 72 20L0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>';
  const chevSvg = '<svg viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" style="flex-shrink:0;transition:transform .3s ease"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>';
  const order = ['zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore'];
  const naList = cfg.na || [];
  const oosList = cfg.oos || [];
  const avail = order.filter(k => naList.indexOf(k) === -1 && ((cfg.urls && cfg.urls[k]) || k === 'reverb' || stores[k]));
  const revUrl = 'https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2891111&ued=' + encodeURIComponent('https://reverb.com/marketplace?query=' + encodeURIComponent(p.title));
  const rowUrl = k => (cfg.urls && cfg.urls[k]) ? cfg.urls[k] : (k === 'reverb' ? revUrl : stores[k]);
  const isPlugins = p.category === 'plugins';
  const pUrl = (isPlugins ? (stores.pluginboutique || stores.amazon) : stores.amazon) || stores[Object.keys(prices)[0]] || stores[avail[0]];
  if (!pUrl) return '';
  const pPrice = prices[isPlugins ? 'pluginboutique' : 'amazon'] || '';
  const primaryBtn =
    '<a href="' + pUrl + '" target="_blank" rel="noopener noreferrer sponsored" class="shop-btn-primary" ' +
    'style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:0 16px;height:40px;border-radius:12px;' +
    'background:#3b82f6;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none;border:none;cursor:pointer;' +
    'box-shadow:0 4px 16px rgba(59,130,246,.35);transition:box-shadow .2s ease,filter .2s ease,transform .18s ease" ' +
    'onmouseover="this.style.filter=\'brightness(1.05)\'" onmouseout="this.style.filter=\'\'">' +
    cartSvg + '<span>' + t('Comprar en ', 'Buy at ') + (isPlugins ? '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:400\'>PLUG<span style=\'color:#000\'>IN</span>BOUTIQUE</span>' : '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:800\'><span style=\'position:relative;display:inline-block\'>Amaz' + '<svg viewBox=\'86 114 320 72\' preserveAspectRatio=\'none\' style=\'position:absolute;left:17.8%;top:100%;height:7px;width:calc(80% - 1px);margin-top:-5px\'>' + '<path fill=\'#FF9900\' d=\'m 374.00642,142.18404 c -34.99948,25.79739 -85.72909,39.56123 -129.40634,39.56123 -61.24255,0 -116.37656,-22.65135 -158.08757,-60.32496 -3.2771,-2.96252 -0.34083,-6.9999 3.59171,-4.69283 45.01431,26.19064 100.67269,41.94697 158.16623,41.94697 38.774689,0 81.4295,-8.02237 120.6499,-24.67006 5.92501,-2.51683 10.87999,3.88009 5.08607,8.17965\'/>' + '<path fill=\'#FF9900\' d=\'m 388.55678,125.53635 c -4.45688,-5.71527 -29.57261,-2.70033 -40.84585,-1.36327 -3.43442,0.41947 -3.95874,-2.56925 -0.86517,-4.71905 20.00346,-14.07844 52.82696,-10.01483 56.65462,-5.2958 3.82764,4.74526 -0.99624,37.64741 -19.79373,53.35128 -2.88385,2.41195 -5.63662,1.12734 -4.35198,-2.07113 4.2209,-10.53917 13.68519,-34.16054 9.20211,-39.90203\'/>' + '</svg></span>on</span>') + (pPrice ? ' - ' + pPrice : '') + '</span></a>';
  const rows = order.map(k => {
    const nm = SHOP_LOGO_TEXT[k] || storeNames[k] || k;
    const st = SHOP_LOGO_STYLE[k] || 'font-weight:700';
    if (naList.indexOf(k) > -1 || (!(cfg.urls && cfg.urls[k]) && k !== 'reverb' && !stores[k])) {
      return '<div style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;height:40px;border-radius:12px;background:#262626;color:#777;font-size:15px;font-weight:800;cursor:default"><span style="' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span><span style="margin-left:auto;font-size:12px;font-weight:600;color:#777;font-style:italic">' + t('No disponible', 'Not Available') + '</span></div>';
    }
    if (oosList.indexOf(k) > -1) {
      return '<a href="' + rowUrl(k) + '" target="_blank" rel="noopener noreferrer sponsored" style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;height:40px;border-radius:12px;background:#262626;color:#777;font-size:15px;font-weight:800;text-decoration:none"><span style="' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span><span style="margin-left:auto;font-size:12px;font-weight:600;color:#777;font-style:italic">' + t('Agotado', 'Out of stock') + '</span></a>';
    }
    const pr = prices[k] ? '<span style="margin-left:auto;font-weight:700;color:#fff;white-space:nowrap">' + (k === 'reverb' ? '<span style="color:#555;font-size:12px;font-weight:600;margin-left:6px">' + t('aprox.', 'approx.') + '</span> ' : '') + prices[k] + '</span>' : '';
    const note = k === 'zzounds' && prices[k] ? '<span style="color:#555;font-size:12px;font-weight:600">' + t('(Env\u00edos gratis)', '(Free shipping)') + '</span>' : '';
    return '<a href="' + rowUrl(k) + '" target="_blank" rel="noopener noreferrer sponsored" ' +
      'style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;height:40px;border-radius:12px;background:#333333;transition:transform .18s ease,background .18s ease,box-shadow .18s ease;' +
      'color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;border:none"><span style="' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span>' + note + pr + '</a>';
  }).join('');
  const moreBtn =
    '<button type="button" class="shop-btn-more" ' +
    'onclick="var l=this.nextElementSibling;var open=l.style.maxHeight&&l.style.maxHeight!==\'0px\';if(open){l.style.overflow=\'hidden\';l.style.maxHeight=\'0px\';}else{l.style.maxHeight=l.scrollHeight+\'px\';setTimeout(function(){l.style.overflow=\'visible\';},330);}var s=this.querySelector(\'svg:last-of-type\');if(s)s.style.transform=open?\'\':\'rotate(180deg)\';" ' +
    'style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:0 16px;height:40px;border-radius:12px;' +
    'background:#333333;color:#ffffff;font-size:15px;font-weight:800;border:none;cursor:pointer;margin-top:8px;transition:background .2s ease,transform .18s ease" ' +
    'onmouseover="this.style.background=\'#3d3d3d\'" onmouseout="this.style.background=\'#333333\'">' +
    chevSvg + '<span style=\'margin-left:6px\'>' + t('Otras opciones de compra', 'More buying options') + ' (' + order.length + ')</span>' + '</button>' +
    '<div class="shop-more-list" style="width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:6px;margin-top:8px;overflow:hidden;max-height:0;transition:max-height .3s ease">' + rows + '</div>';
  return primaryBtn + moreBtn;
};

window.tmgStoreButtons = function (p) {
  try {
    var cat = null;
    if (typeof currentGuideId !== "undefined" && currentGuideId && typeof guides !== "undefined") {
      var g = guides.find(function (x) { return x.id === currentGuideId; });
      cat = g && g.category;
    }
    var skip = cat === "daw";
    if (!skip || TEST_SHOP_BTN[p.id]) return shopButtonsTest(p, typeof currentLang !== "undefined" ? currentLang : "en");
  } catch (e) { /* fallback a chips */ }
  return null;
};
