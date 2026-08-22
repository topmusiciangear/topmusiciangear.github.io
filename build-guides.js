const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { icon } = require('./js/icons.js');

function normHead(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
const STOP_TOKENS = new Set(['audio','pro','live','series','edition','mk','the','and','vs','for','your','studio','best','what','which','with','from','how','why','es','el','la','los','las','para','una','un','mejor','del','de','y','o','a','en','que','como','cuando','donde','cual','son','se','su','this','that','are','is','do','does','should','buy','get','use']);
function prodTokens(p) {
  const t = normHead((p.title || '') + ' ' + (p.brand || ''));
  return t.split(' ').filter(function (w) { return w.length > 2 && !STOP_TOKENS.has(w); });
}
function sectionTopicProduct(s, prods) {
  const head = normHead((s.heading_es || '') + ' ' + (s.heading || ''));
  let best = null, bestCount = 0;
  prods.forEach(function (p) {
    const toks = prodTokens(p);
    const count = toks.filter(function (t) { return head.indexOf(t) > -1; }).length;
    if (count > bestCount) { best = p; bestCount = count; }
  });
  return bestCount > 0 ? best : (prods.length ? prods[0] : null);
}

function criticalCss() {
  return [
    '@font-face{font-family:Inter;src:url(/fonts/Inter.woff2) format("woff2");font-display:swap;font-weight:400 900;font-style:normal}',
    '*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}',
    ':root{--accent:#3b82f6;--accent-dark:#2563eb;--accent-light:#dbeafe;--accent-glow:rgba(59,130,246,0.2);--accent-glow-strong:rgba(59,130,246,0.35);--bg:#0d0d0d;--bg-secondary:#141414;--bg-card:#1a1a1a;--bg-card-hover:#222;--surface:#1e1e1e;--surface-light:#2a2a2a;--border:#2a2a2a;--border-light:#333;--text:#f0f0f0;--text-secondary:#a0a0a0;--text-muted:#909090;--white:#fff;--shadow-sm:0 1px 3px rgba(0,0,0,.3);--shadow:0 4px 12px rgba(0,0,0,.4);--shadow-md:0 8px 24px rgba(0,0,0,.5);--shadow-lg:0 16px 40px rgba(0,0,0,.5);--shadow-xl:0 24px 60px rgba(0,0,0,.6);--radius-sm:6px;--radius:10px;--radius-lg:14px;--radius-xl:18px;--transition:opacity .25s cubic-bezier(.4,0,.2,1),transform .25s cubic-bezier(.4,0,.2,1),filter .25s cubic-bezier(.4,0,.2,1)}',
    'html{scroll-behavior:smooth;background:#0d0d0d;margin:0!important;padding:0!important;scrollbar-width:thin;scrollbar-color:var(--accent) var(--surface)}',
    '::-webkit-scrollbar{width:10px;height:10px}::-webkit-scrollbar-track{background:var(--surface)}::-webkit-scrollbar-thumb{background:var(--accent);border-radius:6px}::-webkit-scrollbar-thumb:hover{background:var(--accent-dark)}',
    'body{margin:0!important;padding:0!important;font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--text);background:var(--bg);line-height:1.6;-webkit-font-smoothing:antialiased}',
    'a{text-decoration:none;color:inherit}',
    'img{max-width:100%;display:block}',
    '.skip-link{position:absolute;left:-9999px;top:0;z-index:9999;padding:8px 16px;background:var(--accent);color:#fff;font-size:14px;text-decoration:none;border-radius:0 0 6px 0}',
    '.skip-link:focus{left:0}',
    'header{background:#0d0d0d;border-bottom:1px solid var(--border);z-index:100;position:-webkit-sticky;position:sticky;top:0!important;margin:0!important;padding:0!important}',
    '.header-inner{max-width:100%;margin:0;padding:0 12px;display:flex;align-items:center;justify-content:space-between;height:64px;gap:16px}',
    '.header-left{display:flex;align-items:center;gap:24px;flex-shrink:0}',
    '.header-right{display:flex;align-items:center;gap:6px;flex-shrink:0}',
    '.header-social{display:flex;align-items:center;gap:2px}',
    '.logo{font-size:20px;font-weight:900;color:var(--white);text-decoration:none;display:flex;align-items:center;gap:10px;letter-spacing:-.5px;white-space:nowrap}',
    '.logo-text{display:flex;flex-direction:column;line-height:1.2}',
    '.logo-icon{width:36px;height:36px;background:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}',
    '.header-tagline-bar{text-align:center;font-size:17px;font-weight:500;color:var(--text-muted);letter-spacing:.3px;padding:6px 16px}',
    '.logo span{color:var(--accent)}',
    'nav{display:flex;gap:4px;flex:1}',
    '.lang-switcher{display:flex;gap:3px;flex-shrink:0;margin-left:8px}',
    '.header-social-link{display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;color:var(--text-muted);font-size:12px;text-decoration:none}.header-social-link .sb-icon{width:14px;height:14px;opacity:0.55;filter:brightness(0) invert(1);transition:opacity 0.2s,filter 0.2s}.header-social-link .fiverr-icon{width:16px;height:16px;opacity:0.55;filter:brightness(0) invert(1);transition:opacity 0.2s,filter 0.2s}',
'.lang-btn{display:flex;align-items:center;justify-content:center;padding:5px;border-radius:5px;border:1px solid var(--border);background:transparent;color:var(--text-muted);font-size:12px;font-weight:700;font-family:inherit;cursor:pointer;transition:opacity .25s cubic-bezier(.4,0,.2,1),transform .25s cubic-bezier(.4,0,.2,1),filter .25s cubic-bezier(.4,0,.2,1)}',
'.lang-btn:hover{border-color:var(--accent)}',
'.lang-btn.active{background:rgba(255,255,255,0.1);border-color:var(--white);color:var(--white)}',
'.lang-flag{display:block;border-radius:2px;flex-shrink:0}',
    '.nav-link{display:inline-flex;align-items:center;padding:8px 14px;border-radius:6px;color:var(--text-secondary);font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;background:transparent;border:none;font-family:inherit;letter-spacing:.3px}',
    '.nav-link.active{color:var(--accent);background:rgba(59,130,246,.1)}',
    '.nav-dd{position:relative;display:inline-flex}.nav-dd-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:6px;color:var(--text-secondary);font-size:13px;font-weight:600;cursor:pointer;transition:transform 0.25s cubic-bezier(0.34,1.56,0.64,1),opacity 0.2s;white-space:nowrap;background:transparent;border:none;font-family:inherit;letter-spacing:.3px;-webkit-tap-highlight-color:transparent}.nav-dd-btn:hover{color:var(--accent)}.nav-dd-caret{display:inline-flex;width:12px;height:12px;color:currentColor;transition:transform 0.25s cubic-bezier(0.4,0,0.2,1);flex-shrink:0}.nav-dd.open .nav-dd-caret{transform:rotate(180deg)}.nav-dd-panel{position:absolute;top:calc(100% + 8px);left:14px;transform:translateY(-6px);min-width:160px;background:rgba(30,30,30,0.95);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow-md);padding:6px;opacity:0;visibility:hidden;pointer-events:none;transition:opacity 0.2s cubic-bezier(0.4,0,0.2,1),transform 0.2s cubic-bezier(0.4,0,0.2,1),visibility 0.2s;z-index:120}.nav-dd.open .nav-dd-panel{opacity:1;visibility:visible;pointer-events:auto;transform:translateY(0)}.nav-dd-link{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:6px;color:var(--white);font-size:13px;font-weight:600;text-decoration:none;white-space:nowrap;transition:background 0.15s,color 0.15s}.nav-dd-link:hover{color:var(--accent)}.nav-dd-link-icon{width:18px;height:18px;flex-shrink:0;object-fit:contain}.nav-dd-mobile{display:none}.nav-dd-mobile .nav-dd-panel{left:14px;right:auto;transform:translateY(-6px)}.nav-dd-mobile.open .nav-dd-panel{transform:translateY(0)}',
    'body>*:not(header):not(.skip-link):not(.bg-hero):not(.crawl-guides):not(#cookie-banner):not(#toast){position:relative;z-index:2}',
    '.bg-hero{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;background-image:url("../img/me-600.webp");background-size:cover;background-position:center;opacity:.12}',
'.hero{position:relative;z-index:2;overflow:hidden;padding:0 32px 60px;min-height:calc(100vh - 64px);box-shadow:inset 0 0 120px 60px rgba(0,0,0,.45)}',
'.hero-inner{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;max-width:960px;margin:0 auto;position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:calc(100vh - 64px)}',
    '.hero-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(59,130,246,.12);border:1px solid rgba(59,130,246,.25);color:var(--accent);padding:6px 16px;border-radius:50px;font-size:12px;font-weight:700;margin-bottom:16px;letter-spacing:.5px;text-transform:uppercase}',
    '.hero .hero-subtitle{font-size:clamp(48px,8vw,80px);font-weight:900;line-height:1.1;color:var(--white);margin-bottom:20px;letter-spacing:-1px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;text-align:center;max-width:none}',
    '.hero .hero-subtitle span{background:linear-gradient(135deg,var(--accent),#60a5fa,#93c5fd);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}',
    '.hero p{font-size:clamp(16px,2vw,19px);color:var(--text-secondary);max-width:600px;margin:0 auto 32px;line-height:1.7;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;text-align:center}',
    '.hero-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}',
    '.btn-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--accent),#60a5fa);color:#fff;padding:14px 32px;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none}',
    '.btn-secondary{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);color:var(--white);padding:14px 32px;border-radius:50px;font-weight:600;font-size:15px;text-decoration:none;border:1px solid rgba(255,255,255,.1)}',
    '.hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;padding:8px;cursor:pointer;position:relative;z-index:102}',
    '.hamburger span{width:22px;height:2px;background:var(--text-secondary);border-radius:2px}',
    '.mobile-nav{display:flex;flex-direction:column;gap:4px;position:fixed;top:0;right:16px;padding-top:16px;z-index:101;opacity:0;pointer-events:none}',
    '.mobile-nav.open{opacity:1;pointer-events:auto}',
    '.audio-mini{flex:1;display:flex;justify-content:center}.audio-mini-inner{display:flex;align-items:center;gap:12px;white-space:nowrap}.audio-mini-label{font-size:10px;font-weight:500;color:var(--text-muted);letter-spacing:.3px}.audio-mini audio{width:260px;height:36px;border-radius:6px;filter:invert(1) hue-rotate(180deg)}.audio-mini-player{display:inline-flex;background:rgba(255,255,255,0.08);border-radius:6px;padding:2px}',
    '.guide-faq{margin:40px 0 20px;padding-top:8px;border-top:1px solid var(--border)}.guide-faq-title{font-size:22px;font-weight:700;margin:0 0 24px;color:var(--white)}.guide-faq-list{display:flex;flex-direction:column}.guide-faq-item{border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;background:var(--bg-card);margin-bottom:8px}.guide-faq-item:last-child{margin-bottom:0}.guide-faq-question{width:100%;padding:16px 20px;background:none;border:none;color:var(--text);font-size:15px;font-weight:600;text-align:left;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;font-family:inherit;line-height:1.4}.guide-faq-question:hover{background:var(--bg-card-hover)}.guide-faq-icon{font-size:20px;font-weight:300;color:var(--accent);flex-shrink:0;transition:transform .25s ease}.guide-faq-question.open .guide-faq-icon{transform:rotate(45deg)}.guide-faq-answer{padding:0 20px 16px;color:var(--text-secondary);font-size:14px;line-height:1.7;max-height:0;overflow:hidden;transition:max-height .3s ease}',
    '.guide-verdict{background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.2);border-radius:var(--radius);padding:14px 22px;margin-bottom:40px}.verdict-label{font-size:20px;font-weight:800;color:var(--white);margin-bottom:12px}.verdict-text{font-size:15px;color:var(--text-secondary);line-height:1.8}',
    '.guide-detail{padding:20px 32px 60px}@media(max-width:768px){.guide-detail{padding:16px 16px 40px}}@media(max-width:480px){.guide-detail{padding:12px 12px 32px}}',
    '.guide-product-card{contain:layout style;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;display:flex;flex-direction:column}.guide-product-card-img{width:100%;aspect-ratio:4/3;overflow:hidden;background:var(--bg-secondary)}.guide-product-card-img img{width:100%;height:100%;object-fit:cover}.guide-products-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}@media(max-width:900px){.guide-products-cards{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.guide-products-cards{grid-template-columns:1fr;gap:16px}.guide-products-cards .guide-product-card-img{aspect-ratio:16/9}.guide-reviews{padding:16px}}.guide-products-grid{margin-top:48px;padding-top:32px;border-top:1px solid var(--border)}',
    '.guide-section-imgs{display:flex;gap:12px;margin-top:16px;flex-wrap:wrap}.guide-section-img{width:120px;height:120px;object-fit:cover;border-radius:var(--radius-sm);background:var(--white);display:block;transition:transform .2s ease}.guide-section-img:hover{transform:scale(1.08)}',
    '.guide-detail .guide-back-link{display:inline-flex;align-items:center;gap:8px;color:var(--accent);margin-bottom:32px;font-weight:500;text-decoration:none}',
    '.guide-detail .guide-back-link:hover{text-decoration:underline}',


    '.guide-comp-table{width:auto;max-width:100%;border-collapse:separate;border-spacing:0;font-size:13px;contain:layout style}',
    '.guide-comp-table th,.guide-comp-table td{padding:8px 10px;border:1px solid var(--border);text-align:left}',
    '.guide-comp-table th{background:var(--surface);font-weight:700;color:var(--text);white-space:nowrap}',
    '.guide-comp-table th:first-child,.guide-comp-table td.label{position:sticky;left:0;z-index:2;background:var(--bg);box-shadow:1px 0 0 var(--border)}',
    '.guide-comp-table td.label{font-weight:600;color:var(--accent);white-space:nowrap;width:1%}',
    '.guide-comp-table td.val{color:var(--text-secondary)}',
    '.guide-comp-table th:not(:first-child),.guide-comp-table td:not(.label){min-width:var(--guide-col-min,0)}',
    '.guide-comp-title{font-size:22px;font-weight:700;margin:8px 0 16px;text-align:center}',
    '.guide-comp-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;min-width:0}.guide-comp-scroll::-webkit-scrollbar{display:none}.guide-comp-scroll-wrap{margin:24px 0}.guide-comp-controls{display:flex;align-items:center;gap:12px;margin:12px 0 0}.guide-comp-controls-top{margin:0 0 10px}.guide-comp-progress{flex:1;min-width:0;height:4px;background:var(--border);border-radius:99px;overflow:hidden}.guide-comp-progress-bar{height:100%;width:0;background:var(--accent);border-radius:99px;transition:width .15s ease}.guide-comp-arrow{background:none;border:none;color:#fff;cursor:pointer;font-size:22px;line-height:1;padding:6px;box-shadow:none;-webkit-tap-highlight-color:transparent;display:inline-flex;align-items:center;justify-content:center;transition:color .2s}.guide-comp-arrow:hover,.guide-comp-arrow:active{color:var(--accent)}.guide-comp-arrow svg{width:1em;height:1em;filter:drop-shadow(0 0 6px rgba(0,0,0,.6))}.guide-comp-arrow-left{margin-left:-6.7px}.guide-comp-arrow-right{margin-right:-6.7px}',
    '@media(max-width:768px){.guide-comp-table{font-size:13px}.guide-comp-table td{padding:3px 4px}.guide-comp-table th{white-space:nowrap;padding:5px 4px}.guide-comp-title{font-size:17px;margin:4px 0 8px}.guide-comp-scroll-wrap{margin:16px 0}.guide-comp-controls{gap:12px}.guide-comp-arrow{font-size:20px}}@media(max-width:480px){.guide-comp-arrow{font-size:18px}}',

    '.stats-bar{background:rgba(10,10,10,0.5);border-bottom:1px solid rgba(255,255,255,0.05);padding:28px 32px}',
    '.stats-inner{max-width:none;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:24px}',
    '.stat-item{text-align:center;padding:8px;contain:layout style}',
    '.stat-number{font-size:clamp(28px,4vw,38px);font-weight:900;background:linear-gradient(135deg,var(--accent),#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.1}',
    '.stat-label{font-size:14px;color:var(--text-secondary);font-weight:500;margin-top:4px}',
    '@media(max-width:768px){.header-social{display:none}.header-tagline-bar{font-size:13px;padding:2px 12px}.hamburger{display:none}.hero{padding:12px 20px 40px;min-height:50vh}.hero h1{font-size:40px;margin-bottom:2px}.hero .hero-subtitle{font-size:40px}.hero p{margin-bottom:12px}.hero-badge{margin-bottom:4px}.hero-inner{gap:4px;min-height:auto;justify-content:flex-start;padding-top:8px}.stats-bar{padding:20px 16px}.stats-inner{grid-template-columns:repeat(3,1fr);gap:8px}.stat-number{font-size:24px;line-height:1}.stat-label{font-size:11px;margin-top:0}.nav-dd-mobile{display:inline-flex}.nav-dd-mobile .nav-dd-panel{min-width:160px;background:var(--surface);backdrop-filter:none;-webkit-backdrop-filter:none;box-shadow:none}.cuban3-link{display:none}}',
    '.audio-eq{display:flex;align-items:flex-end;gap:2px;height:20px;opacity:0.3;transition:opacity 0.3s}.playing .audio-eq{opacity:1}.audio-eq i{display:block;width:3px;height:100%;background:var(--accent);border-radius:2px;transform-origin:bottom;animation:eq .8s ease-in-out infinite}.audio-eq i:nth-child(1){transform:scaleY(0.6);animation-delay:0s}.audio-eq i:nth-child(2){transform:scaleY(1);animation-delay:.2s}.audio-eq i:nth-child(3){transform:scaleY(0.4);animation-delay:.4s}.audio-eq i:nth-child(4){transform:scaleY(0.8);animation-delay:.6s}@keyframes eq{0%,100%{transform:scaleY(0.4)}50%{transform:scaleY(1)}}.playing .audio-mini-player{box-shadow:0 0 12px rgba(59,130,246,0.3);transition:box-shadow 0.3s}.audio-mini-player{transition:box-shadow 0.3s}#cookie-banner.cookie-visible{transform:translateY(0)!important}',
  ].join('');
}

// ===== LOAD DATA =====
const dir = __dirname;

// Load guide/product data from JSON, store meta from constants
const guides = JSON.parse(fs.readFileSync(path.join(dir, 'data', 'guides.json'), 'utf8').replace(/^\ufeff/, ''));
const products = JSON.parse(fs.readFileSync(path.join(dir, 'data', 'products.json'), 'utf8'));
const reviews = JSON.parse(fs.readFileSync(path.join(dir, 'data', 'reviews.json'), 'utf8').replace(/^\ufeff/, ''));
eval(fs.readFileSync(path.join(dir, 'js', 'constants.js'), 'utf8').replace(/^\ufeff/, '').replace(/^const /gm, 'var '));

// Pre-bake bold first sentence into guides.json so SPA gets bold regardless of app.js version
guides.forEach(g => {
  g.sections.forEach(s => {
    if (s.content) s.content = boldFirstSentence(s.content);
    if (s.content_es) s.content_es = boldFirstSentence(s.content_es);
  });
});

// Single source of truth: strip Rating rows from guides.json too so the SPA can never re-render them
guides.forEach(g => {
  if (g.comparison && Array.isArray(g.comparison.rows)) {
    g.comparison.rows = g.comparison.rows.filter(r => (r.label || '').trim().toLowerCase() !== 'rating');
  }
});

// Longest product name per table computed inline at render time so each table sizes its own columns

// Auto-increment cache busters from file content hash
// Include guides.json hash so JS cache busters change when data changes (SPA cache invalidation)
const dataVer = crypto.createHash('md5').update(fs.readFileSync(path.join(dir, 'data', 'guides.json'))).digest('hex').slice(0, 6);
const cacheVerJs = crypto.createHash('md5').update(fs.readFileSync(path.join(dir, 'js', 'app.js'))).digest('hex').slice(0, 8);
const cacheVerJsMin = crypto.createHash('md5').update(fs.readFileSync(path.join(dir, 'js', 'app.min.js'))).digest('hex').slice(0, 8);
const cacheVerConstants = crypto.createHash('md5').update(fs.readFileSync(path.join(dir, 'js', 'constants.js'))).digest('hex').slice(0, 8);
const cacheVerCss = crypto.createHash('md5').update(fs.readFileSync(path.join(dir, 'css', 'style.min.css'))).digest('hex').slice(0, 8);
const RECAPTCHA_SITE_KEY = "6Lf083QtAAAAACTzrVpmKX5_syRkkw_U1Za8K6C2";
const today = new Date().toISOString().split('T')[0];
const YEAR = new Date().getFullYear();
const Y = (s) => typeof s === 'string' ? s.replace(/2026/g, String(YEAR)) : s;



function trunc(s, max) {
  if (!s || s.length <= max) return s || '';
  var i = s.lastIndexOf(' ', max);
  return s.substring(0, i > 0 ? i : max) + '...';
}

function getResolvedStores(product) {
  const allStoreKeys = ['pluginboutique','gear4music','amazon','reverb','andertons','musicstore','zzounds','official','macappstore'];
  const searchUrls = {
    pluginboutique: (t) => `https://www.pluginboutique.com/search?q=${encodeURIComponent(t)}&a_aid=6a01e859cbe1a`,
    gear4music: (t) => `https://www.gear4music.com/search?q=${encodeURIComponent(t)}`,

    amazon: (t) => `https://www.amazon.com/s?k=${encodeURIComponent(t)}&tag=topmusicg-20`,
    reverb: (t) => `https://reverb.com/marketplace?query=${encodeURIComponent(t)}`,
    andertons: (t) => `https://www.andertons.co.uk/search.php?search_query=${encodeURIComponent(t)}&irgwc=1&irpid=7292297`,
    musicstore: (t) => `https://www.musicstore.com/en_GB/search?SearchText=${encodeURIComponent(t)}`,
    zzounds: () => 'https://www.zzounds.com/a--925521/'
  };
  const s = {};
  const isMacOnly = !!product.stores.macappstore;
  const excluded = product.excludeStores || [];
  allStoreKeys.forEach(key => {
    if (excluded.includes(key)) return;
    if (key === 'amazon' && product.category === 'plugins') return;
    if (key === 'pluginboutique' && product.category !== 'plugins' && product.category !== 'daw') return;
    const specificUrl = product.stores[key];
    if (specificUrl) {
      if (key === 'gear4music' && specificUrl === 'https://www.gear4music.com/search') {
        s[key] = `https://www.gear4music.com/search?q=${encodeURIComponent(product.title)}`;
      } else if (key === 'amazon' && (specificUrl.startsWith('https://www.amazon.com/dp/') || specificUrl.startsWith('https://www.amazon.co.uk/dp/') || specificUrl.match(/\/dp\/[A-Z0-9]+/))) {
        s[key] = (product.amazonNotag || specificUrl.includes('tag=topmusicg-20')) ? specificUrl : specificUrl + (specificUrl.includes('?') ? '&' : '?') + 'tag=topmusicg-20';
      } else if (key === 'andertons' && !specificUrl.includes('irgwc=')) {
        s[key] = specificUrl + (specificUrl.includes('?') ? '&' : '?') + 'irgwc=1&irpid=7292297';
      } else {
        s[key] = specificUrl;
      }
    } else if (!isMacOnly && key !== 'amazon' && searchUrls[key]) {
      s[key] = searchUrls[key](product.title);
    }
  });
  if (s.reverb) {
    s.reverb = `https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2891111&ued=${encodeURIComponent(s.reverb)}`;
  }
  if (s.musicstore && !s.musicstore.startsWith('https://www.awin1.com/cread.php?awinmid=63816')) {
    s.musicstore = `https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=${encodeURIComponent(s.musicstore)}`;
  }
  if (s.gear4music) {
    s.gear4music = `https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=${encodeURIComponent(s.gear4music)}`;
  }
  if (s.zzounds) {
    s.zzounds = `https://www.anrdoezrs.net/click-101857888-10422044-1779394?url=${encodeURIComponent(s.zzounds.replace('/a--925521', ''))}`;
  }
  return s;
}

function formatPrice(price) {
  if (price >= 1000) return `$${(price / 1000).toFixed(1)}k`;
  return `$${price}`;
}

function capitalizeUnit(u) {
  return u ? u.charAt(0).toUpperCase() + u.slice(1) : u;
}

function stars(rating) {
  return "★".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "");
}

function reviewStars(rating) {
  var filled = Math.round(rating);
  if (filled > 5) filled = 5;
  if (filled < 0) filled = 0;
  var s = "";
  for (var i = 0; i < filled; i++) s += '<span class="guide-star">★</span>';
  for (var j = 0; j < 5 - filled; j++) s += '<span class="guide-star-empty">★</span>';
  return s;
}

function reviewStats(pid) {
  const rv = reviews.filter(r => r.productId === pid);
  if (!rv.length) return null;
  const avg = Math.round((rv.reduce((s, r) => s + r.rating, 0) / rv.length) * 10) / 10;
  return { ratingValue: avg, reviewCount: rv.length, reviews: rv };
}

function fixIconPath(html) {
  return html.replace(/src="img\//g, 'src="../img/');
}

function productRatingLine(p, lang) {
  const st = reviewStats(p.id);
  const word = st ? (lang === 'es' ? (st.reviewCount === 1 ? 'reseña' : 'reseñas') : (st.reviewCount === 1 ? 'review' : 'reviews')) : '';
  const ratingHtml = st ? `<span class="guide-product-card-rating">${reviewStars(st.ratingValue)} <strong class="guide-product-card-rating-num">${st.ratingValue.toFixed(1)}</strong> <span class="guide-product-card-rating-count">(${st.reviewCount} ${word})</span></span>` : '<span class="guide-product-card-rating"></span>';
  const btnLabel = lang === 'es' ? 'Escribe una reseña' : 'Write a review';
  return `<div class="guide-product-card-rating-row">${ratingHtml}<button class="guide-review-write-btn" onclick="openReviewModal(${p.id})">${btnLabel}</button></div>`;
}

function storeChips(p, lang) {
  lang = lang || 'en';
  if (TEST_SHOP_BTN[p.id]) return shopButtonsTest(p, lang);
  return Object.entries(getResolvedStores(p)).map(([key, url]) => {
    const iconHtml = storeIcons[key] ? '<span class="icon">' + fixIconPath(storeIcons[key]) + '</span>' : '';
    return `<a href="${url}" target="_blank" rel="noopener noreferrer sponsored" class="chip-store" style="background:${storeColors[key] || '#555'}">${iconHtml} ${storeNames[key] || key}</a>`;
  }).join("");
}

const SHOP_LOGO_STYLE = {
  gear4music: "font-family:'Quicksand','Segoe UI',sans-serif;font-weight:700;color:#fff;letter-spacing:-.3px;font-size:15px",
  andertons: "font-family:'Yellowtail',cursive;font-weight:400;color:#fff;font-size:19px",
  musicstore: "font-family:'Open Sans Condensed','Arial Narrow',Arial,sans-serif;font-weight:700;color:#fff;font-size:18px;letter-spacing:.5px",
  zzounds: "font-family:'Poppins',Arial,sans-serif;font-weight:800;font-style:italic;color:#fff;letter-spacing:-.5px;font-size:15px",
  reverb: "font-family:'Kaushan Script',cursive;font-weight:400;color:#fff;font-size:17px"
};
const SHOP_LOGO_TEXT = { gear4music: 'Gear4music', andertons: 'Andertons', musicstore: 'Music Store', zzounds: 'zZounds', reverb: 'Reverb' };
let FLAG_UID = 0;
function flagBadge(inner) {
  const cid = 'flgc' + (++FLAG_UID);
  return '<svg viewBox="0 0 24 16" width="19" height="13" style="display:inline-block;vertical-align:-2px;flex-shrink:0;margin-right:5px">' +
    '<defs><clipPath id="' + cid + '"><rect width="24" height="16" rx="3.2"/></clipPath></defs>' +
    '<g clip-path="url(#' + cid + ')">' + inner + '</g>' +
    '<rect x=".5" y=".5" width="23" height="15" rx="2.7" fill="none" stroke="#ffffff" stroke-opacity=".35"/>' +
    '</svg>';
}
function usaFlag() {
  let s = '<rect width="24" height="16" fill="#fff"/><g fill="#B22234">';
  [0, 2.46, 4.92, 7.38, 9.85, 12.31, 14.77].forEach(function (y) { s += '<rect y="' + y + '" width="24" height="1.23"/>'; });
  s += '</g><rect width="10" height="8.62" fill="#3C3B6E"/><g fill="#fff">';
  [[1.9, 1.8], [4.1, 1.8], [6.3, 1.8], [8.5, 1.8], [3, 3.1], [5.2, 3.1], [7.4, 3.1], [1.9, 4.4], [4.1, 4.4], [6.3, 4.4], [8.5, 4.4], [3, 5.7], [5.2, 5.7], [7.4, 5.7]].forEach(function (p) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r=".42"/>'; });
  return flagBadge(s + '</g>');
}
function ukFlag() {
  return flagBadge('<rect width="24" height="16" fill="#012169"/>' +
    '<path d="M0,0 L24,16 M24,0 L0,16" stroke="#fff" stroke-width="3.4"/>' +
    '<path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" stroke-width="1.3"/>' +
    '<path d="M12,0 V16 M0,8 H24" stroke="#fff" stroke-width="5.6"/>' +
    '<path d="M12,0 V16 M0,8 H24" stroke="#C8102E" stroke-width="3.4"/>');
}
function globeIcon() {
  const gid = 'glg' + (++FLAG_UID);
  const gcid = 'glc' + (++FLAG_UID);
  return '<svg viewBox="0 0 20 20" width="17" height="17" style="display:inline-block;vertical-align:-4px;flex-shrink:0;margin-right:5px">' +
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
}
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
  const cfg = TEST_SHOP_BTN[p.id];
  if (!cfg) return '';
  const stores = getResolvedStores(p);
  const t = (es, en) => lang === 'es' ? es : en;
  const cartSvg = '<svg viewBox="0 0 576 512" width="1em" height="1em" fill="#fff" style="flex-shrink:0"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0-5.4 21.7c-1.1 4.5-.6 9.2 1.4 13.3L482.3 320l24 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-88 0c-30.9 0-56-25.1-56-56c0-25.9 17.6-47.6 41.5-53.9L442 128l-305.6 0c-14 26-33.1 60.1-44.4 81.5c-11 20.6-36.6 28.4-57.2 17.4c-20.6-11-28.4-36.6-17.4-57.2C35.7 133 63 82.9 74.5 61.8C83.5 45.1 100.9 34 120.8 34L96 34C82.7 34 72 23.3 72 20L0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>';
  const chevSvg = '<svg viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" style="flex-shrink:0;transition:transform .3s ease"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>';
  const order = ['zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore'];
  const naList = cfg.na || [];
  const oosList = cfg.oos || [];
  const avail = order.filter(k => naList.indexOf(k) === -1);
  const revUrl = 'https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2891111&ued=' + encodeURIComponent('https://reverb.com/marketplace?query=' + encodeURIComponent(p.title));
  const rowUrl = k => (cfg.urls && cfg.urls[k]) ? cfg.urls[k] : (k === 'reverb' ? revUrl : stores[k]);
  const pUrl = stores.amazon || stores[cfg && Object.keys(cfg.prices)[0]] || stores[avail[0]];
  if (!pUrl) return '';
  const pPrice = cfg.prices.amazon || '';
  const primaryBtn =
    '<a href="' + pUrl + '" target="_blank" rel="noopener noreferrer sponsored" class="shop-btn-primary" ' +
    'style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:0 16px;height:40px;border-radius:12px;' +
    'background:#3b82f6;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none;border:none;cursor:pointer;' +
    'box-shadow:0 4px 16px rgba(59,130,246,.35);transition:box-shadow .2s ease,filter .2s ease,transform .18s ease" ' +
    'onmouseover="this.style.filter=\'brightness(1.05)\'" onmouseout="this.style.filter=\'\'">' +
    cartSvg + '<span>' + t('Comprar en ', 'Buy at ') + '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:800\'><span style=\'position:relative;display:inline-block\'>Amaz' + '<svg viewBox=\'86 114 320 72\' preserveAspectRatio=\'none\' style=\'position:absolute;left:17.8%;top:100%;height:7px;width:calc(80% - 1px);margin-top:-5px\'>' + '<path fill=\'#FF9900\' d=\'m 374.00642,142.18404 c -34.99948,25.79739 -85.72909,39.56123 -129.40634,39.56123 -61.24255,0 -116.37656,-22.65135 -158.08757,-60.32496 -3.2771,-2.96252 -0.34083,-6.9999 3.59171,-4.69283 45.01431,26.19064 100.67269,41.94697 158.16623,41.94697 38.774689,0 81.4295,-8.02237 120.6499,-24.67006 5.92501,-2.51683 10.87999,3.88009 5.08607,8.17965\'/>' + '<path fill=\'#FF9900\' d=\'m 388.55678,125.53635 c -4.45688,-5.71527 -29.57261,-2.70033 -40.84585,-1.36327 -3.43442,0.41947 -3.95874,-2.56925 -0.86517,-4.71905 20.00346,-14.07844 52.82696,-10.01483 56.65462,-5.2958 3.82764,4.74526 -0.99624,37.64741 -19.79373,53.35128 -2.88385,2.41195 -5.63662,1.12734 -4.35198,-2.07113 4.2209,-10.53917 13.68519,-34.16054 9.20211,-39.90203\'/>' + '</svg></span>on</span>' + ' - ' + pPrice + '</span></a>';
  const rows = order.map(k => {
    const nm = SHOP_LOGO_TEXT[k] || storeNames[k] || k;
    const st = SHOP_LOGO_STYLE[k] || 'font-weight:700';
    if (naList.indexOf(k) > -1) {
      return '<div style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;height:40px;border-radius:12px;background:#262626;color:#777;font-size:15px;font-weight:800;cursor:default"><span style="' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span><span style="margin-left:auto;font-size:12px;font-weight:600;color:#777;font-style:italic">' + t('No disponible', 'Not Available') + '</span></div>';
    }
    if (oosList.indexOf(k) > -1) {
      return '<a href="' + rowUrl(k) + '" target="_blank" rel="noopener noreferrer sponsored" style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;height:40px;border-radius:12px;background:#262626;color:#777;font-size:15px;font-weight:800;text-decoration:none"><span style="' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span><span style="margin-left:auto;font-size:12px;font-weight:600;color:#777;font-style:italic">' + t('Agotado', 'Out of stock') + '</span></a>';
    }
    const pr = cfg.prices[k] ? '<span style="margin-left:auto;font-weight:700;color:#fff;white-space:nowrap">' + (k === 'reverb' ? '<span style="color:#555;font-size:12px;font-weight:600;margin-left:6px">' + t('aprox.', 'approx.') + '</span> ' : '') + cfg.prices[k] + '</span>' : '';
    const note = k === 'zzounds' && cfg.prices[k] ? '<span style="color:#555;font-size:12px;font-weight:600">' + t('(Env\u00edos gratis)', '(Free shipping)') + '</span>' : '';
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
}

function productCard(p, lang) {
  const title = lang === 'es' && p.title_es ? p.title_es : p.title;
  const desc = lang === 'es' && p.desc_es ? p.desc_es : p.desc;
  const stores = storeChips(p, lang);
  return `<div class="guide-product-card">
    <div class="guide-product-card-img"><img src="${p.img.startsWith('http') ? p.img : '../' + p.img}" alt="${title}" loading="lazy" class="lb-img" style="cursor:zoom-in"><button type="button" class="guide-product-card-share" aria-label="Share" title="Share" onclick="event.stopPropagation();shareProduct(this)"><svg data-fa="share-nodes" class="icon fa-solid fa-share-nodes" viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor"><path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"/></svg></button></div>
    <div class="guide-product-card-body">
      ${productRatingLine(p, lang)}
      <h3 class="guide-product-card-title">${title}</h3>
      <div class="guide-product-card-price">${formatPrice(p.price)}${p.unit ? ` <small>(${capitalizeUnit(lang === 'es' ? (p.unit_es || p.unit) : p.unit)})</small>` : ''}</div>
      <div class="guide-product-card-desc-wrap"><div class="guide-product-card-desc">${desc}</div><button class="guide-product-card-desc-toggle" onclick="var w=this.parentElement;var d=w.querySelector('.guide-product-card-desc');d.classList.toggle('expanded');this.textContent=d.classList.contains('expanded')?'\u2212':'+'">+</button></div>
      <div class="guide-product-card-stores">${stores}</div>
    </div>
  </div>`;
}

function jsonLdScript(data) {
  return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>`;
}

function guideDates(guide, idx) {
  var pub = guide.datePublished;
  if (!pub) {
    var base = new Date('2026-01-15');
    base.setDate(base.getDate() + idx * 3);
    pub = base.toISOString().split('T')[0];
  }
  if (pub > today) pub = today;
  var mod = guide.dateModified || today;
  if (mod > today) mod = today;
  return { published: pub, modified: mod };
}

function stripHtml(s) {
  return s ? s.replace(/<[^>]*>/g, '') : '';
}
function guideDesc(guide, introFallback, isEs) {
  var d = isEs ? (guide.description_es || trunc(stripHtml(introFallback), 155)) : (guide.description || trunc(stripHtml(introFallback), 155));
  return Y(d);
}

function esText(esVal, enVal) {
  return esVal && esVal.length > enVal.length * 0.1 ? esVal : enVal;
}

var faqBase = {
  microphones: [
    { q: "What is the best microphone for recording vocals?", q_es: "¿Cuál es el mejor micrófono para grabar voces?", a: "The Shure SM7B is the industry standard for professional vocal recording, used on countless hit records. For home studios on a budget, the Rode NT1-A delivers studio-quality condenser sound at $269, while the Shure SM57 at $99 is the best starting point for any home recordist.", a_es: "El Shure SM7B es el estándar de la industria para grabación vocal profesional. Para estudios caseros con presupuesto limitado, el Rode NT1-A ofrece sonido de calidad de estudio por $269, mientras que el Shure SM57 a $99 es el mejor punto de partida." },
    { q: "What microphone is best for home recording?", q_es: "¿Qué micrófono es mejor para grabación casera?", a: "For home recording, start with the Shure SM57 ($99) for instruments and the Audio-Technica AT2020 ($99) for vocals. The Focusrite Scarlett 2i2 bundle with the Rode NT1-A is an excellent all-in-one starter package that covers both microphone and audio interface needs.", a_es: "Para grabación casera, comienza con el Shure SM57 ($99) para instrumentos y el Audio-Technica AT2020 ($99) para voces. El pack Focusrite Scarlett 2i2 con Rode NT1-A es un excelente paquete completo." },
    { q: "Do I need a condenser or dynamic microphone?", q_es: "¿Necesito un micrófono de condensador o dinámico?", a: "Condenser mics like the Rode NT1-A capture more detail and high frequencies, making them ideal for studio vocals and acoustic instruments. Dynamic mics like the Shure SM7B and SM57 are more rugged, reject background noise better, and work great for loud sources like guitar amps and live vocals.", a_es: "Los micrófonos de condensador como el Rode NT1-A capturan más detalle y son ideales para voces de estudio. Los dinámicos como el Shure SM7B son más resistentes y funcionan mejor para fuentes ruidosas como amplificadores de guitarra." },
    { q: "How much should I spend on a good microphone?", q_es: "¿Cuánto debería gastar en un buen micrófono?", a: "A good starter microphone costs $99-$200. The sweet spot for home studio quality is $200-$400, where you find options like the Rode NT1-A ($269) and Shure SM7B ($399). Professional mics like the Neumann U 87 Ai cost upwards of $3,000 but are rarely necessary for home recording.", a_es: "Un buen micrófono inicial cuesta entre $99 y $200. El punto óptimo para calidad de estudio casero es $200-$400, donde encuentras opciones como el Rode NT1-A ($269) y Shure SM7B ($399)." },
    { q: "What is the best microphone under $200?", q_es: "¿Cuál es el mejor micrófono por menos de $200?", a: "The Shure SM57 ($99) is the best under-$200 microphone for its versatility, durability, and legendary status. The Audio-Technica AT2020 ($99) is the best budget condenser for vocals. The Rode NT-USB ($169) is the top choice for USB plug-and-play simplicity.", a_es: "El Shure SM57 ($99) es el mejor micrófono por menos de $200 por su versatilidad y durabilidad legendaria. El Audio-Technica AT2020 ($99) es el mejor condensador económico para voces." }
  ],
  interfaces: [
    { q: "What is the best audio interface for home recording?", q_es: "¿Cuál es la mejor interfaz de audio para grabación casera?", a: "The Focusrite Scarlett 2i2 4th Gen ($199) is the best all-around audio interface for home recording, offering pro-grade preamps, low latency, and easy setup. The Universal Audio Volt 2 ($189) is excellent if you want vintage tube preamp emulation. Both are reliable choices for beginners and experienced producers alike.", a_es: "La Focusrite Scarlett 2i2 4ta Gen ($199) es la mejor interfaz de audio para grabación casera, con prevas de grado profesional y baja latencia. La Universal Audio Volt 2 ($189) es excelente si buscas emulación de previo vintage." },
    { q: "How many inputs do I need on an audio interface?", q_es: "¿Cuántas entradas necesito en una interfaz de audio?", a: "For a solo musician recording one instrument at a time, 2 inputs is sufficient. If you record vocals and guitar simultaneously, or want to record in stereo, 2-4 inputs work well. Bands recording live should look for 8+ inputs. The Focusrite Scarlett 2i2 covers most home studio needs.", a_es: "Para un músico grabando un instrumento a la vez, 2 entradas son suficientes. Si grabas voz y guitarra simultáneamente, 2-4 entradas funcionan bien. Bandas grabando en vivo necesitan 8+ entradas." },
    { q: "Is USB or Thunderbolt better for audio interfaces?", q_es: "¿Es mejor USB o Thunderbolt para interfaces de audio?", a: "Thunderbolt offers lower latency and higher bandwidth, making it ideal for professional studios with large sessions. USB (especially USB-C) is perfectly adequate for home studios, with latency low enough for real-time monitoring. The RME Babyface Pro FS uses USB and rivals Thunderbolt performance.", a_es: "Thunderbolt ofrece menor latencia y mayor ancho de banda, ideal para estudios profesionales. USB (especialmente USB-C) es perfectamente adecuado para estudios caseros. El RME Babyface Pro FS usa USB con rendimiento comparable a Thunderbolt." },
    { q: "What is the best budget audio interface?", q_es: "¿Cuál es la mejor interfaz de audio económica?", a: "The Focusrite Scarlett Solo ($139) and Universal Audio Volt 1 ($169) are the best budget audio interfaces. Both offer excellent preamp quality, reliable drivers, and come with useful software bundles including DAWs and plugins. The Scarlett series is the most popular choice worldwide.", a_es: "La Focusrite Scarlett Solo ($139) y Universal Audio Volt 1 ($169) son las mejores interfaces económicas. Ambas ofrecen excelente calidad de previo y vienen con paquetes de software útiles." },
    { q: "Do I need a high-end audio interface as a beginner?", q_es: "¿Necesito una interfaz de audio de alta gama como principiante?", a: "No. A Focusrite Scarlett 2i2 ($199) or Universal Audio Volt 2 ($189) provides more than enough quality for beginners. High-end interfaces like the RME Babyface Pro FS or Antelope Audio interfaces are designed for professional environments where every dB of dynamic range matters.", a_es: "No. Una Focusrite Scarlett 2i2 ($199) o Universal Audio Volt 2 ($189) ofrecen más que suficiente calidad para principiantes. Las interfaces de alta gama son para entornos profesionales." }
  ],
  monitors: [
    { q: "What are the best studio monitors for home recording?", q_es: "¿Cuáles son los mejores monitores de estudio para grabación casera?", a: "The Yamaha HS8 ($698/pair) are the industry standard for mixing — brutally honest and revealing. The KRK Rokit 7 G5 ($498/pair) offers great value with built-in DSP room correction. For smaller rooms, the Yamaha HS5 or KRK Rokit 5 G5 are excellent choices that won't overwhelm your space.", a_es: "Los Yamaha HS8 ($698/par) son el estándar de la industria para mezcla — brutalmente honestos y reveladores. Los KRK Rokit 7 G5 ($498/par) ofrecen gran valor con corrección de sala DSP incorporada. Para habitaciones pequeñas, los Yamaha HS5 o KRK Rokit 5 G5 son excelentes opciones que no abrumarán tu espacio." },
    { q: "Do I need a subwoofer for studio monitors?", q_es: "¿Necesito un subwoofer para monitores de estudio?", a: "A subwoofer is not essential for most home studios. It becomes important when mixing genres that rely on sub-bass frequencies like EDM, hip-hop, or film scoring. The Yamaha HS8S subwoofer pairs well with HS series monitors. In small rooms, a sub can create more problems than it solves due to room modes.", a_es: "Un subwoofer no es esencial para la mayoría de estudios caseros. Se vuelve importante para géneros que dependen de frecuencias sub-graves como EDM o hip-hop. En habitaciones pequeñas puede crear más problemas de los que resuelve." },
    { q: "What size studio monitors should I get?", q_es: "¿De qué tamaño deberían ser mis monitores de estudio?", a: "For small rooms under 150 sq ft, 5-inch monitors like the Yamaha HS5 are ideal. Medium rooms up to 250 sq ft work well with 6.5-7 inch monitors like the KRK Rokit 7 G5. Larger rooms benefit from 8-inch monitors like the Yamaha HS8. The key is matching monitor size to room size.", a_es: "Para habitaciones pequeñas, monitores de 5 pulgadas como los Yamaha HS5 son ideales. Habitaciones medianas funcionan bien con 6.5-7 pulgadas. Habitaciones grandes se benefician de monitores de 8 pulgadas." },
    { q: "How should I position my studio monitors?", q_es: "¿Cómo debería posicionar mis monitores de estudio?", a: "Position monitors at ear level forming an equilateral triangle with your listening position. Keep them at least 8 inches from walls to reduce bass buildup. Angle them toward your ears (toe-in). Use monitor isolation pads to decouple them from your desk. The tweeters should be at ear height when seated.", a_es: "Coloca los monitores a la altura del oído formando un triángulo equilátero con tu posición de escucha. Mantenlos al menos a 20 cm de las paredes. Usa pads de aislamiento para desacoplarlos del escritorio." },
    { q: "Are expensive studio monitors worth it?", q_es: "¿Valen la pena los monitores de estudio caros?", a: "Expensive monitors like the Genelec 8040B or Adam A7V offer more accurate frequency response, better stereo imaging, and higher SPL before distortion. For critical mixing and mastering work, they're worth the investment. For home studio enthusiasts, quality monitors in the $300-$700 range like Yamaha HS or KRK Rokit series provide excellent value.", a_es: "Los monitores caros ofrecen una respuesta de frecuencia más precisa y mejor imagen estéreo. Para mezcla crítica, valen la inversión. Para entusiastas, monitores de $300-$700 como Yamaha HS o KRK Rokit ofrecen excelente valor." }
  ],
  headphones: [
    { q: "What are the best studio headphones for mixing?", q_es: "¿Cuáles son los mejores auriculares de estudio para mezclar?", a: "The beyerdynamic DT 900 Pro X are the best open-back headphones for mixing, offering excellent soundstage and natural frequency response. The Sennheiser HD 490 Pro Plus is another top choice. For closed-back options, the beyerdynamic DT 770 Pro is the industry standard for tracking and mixing.", a_es: "Los beyerdynamic DT 900 Pro X son los mejores auriculares abiertos para mezclar. Los Sennheiser HD 490 Pro Plus son otra excelente opción. Para auriculares cerrados, los DT 770 Pro son el estándar de la industria." },
    { q: "Open-back vs closed-back headphones for studio?", q_es: "¿Auriculares abiertos vs cerrados para estudio?", a: "Open-back headphones like the beyerdynamic DT 900 Pro X provide a wider soundstage and more natural sound, making them better for critical mixing. Closed-back headphones like the DT 770 Pro isolate sound, making them ideal for tracking vocals and instruments to prevent bleed into the microphone.", a_es: "Los auriculares abiertos como los DT 900 Pro X ofrecen un escenario sonoro más amplio, ideales para mezcla. Los cerrados como los DT 770 Pro aíslan el sonido, perfectos para grabación." },
    { q: "Can I mix with headphones instead of monitors?", q_es: "¿Puedo mezclar con auriculares en vez de monitores?", a: "Yes, but with caveats. Headphones can cause ear fatigue faster and don't translate bass frequencies as accurately as monitors. However, with open-back headphones and reference tracks, you can achieve professional results. The beyerdynamic DT 900 Pro X is excellent for headphone mixing.", a_es: "Sí, pero con precaución. Los auriculares causan fatiga auditiva más rápido y no traducen los graves con tanta precisión. Con auriculares abiertos y pistas de referencia, puedes lograr resultados profesionales." },
    { q: "What is the best budget headphones for music production?", q_es: "¿Cuáles son los mejores auriculares económicos para producción musical?", a: "The Audio-Technica ATH-M50X ($169) is the best budget headphone for music production, offering a balanced frequency response and good detail. The Sony MDR-7506 ($99) is another excellent budget option that's been an industry standard for decades.", a_es: "Los Audio-Technica ATH-M50X ($169) son los mejores auriculares económicos para producción musical. Los Sony MDR-7506 ($99) son otra excelente opción que ha sido estándar de la industria por décadas." },
    { q: "Do I need a headphone amplifier for studio headphones?", q_es: "¿Necesito un amplificador de auriculares para auriculares de estudio?", a: "High-impedance headphones like the beyerdynamic DT 770 Pro 250 Ohm benefit significantly from a dedicated headphone amplifier. Lower impedance models like the DT 770 Pro 80 Ohm or Audio-Technica ATH-M50X work well directly from most audio interfaces. If your headphones sound quiet or weak, a headphone amp will help.", a_es: "Los auriculares de alta impedancia como los DT 770 Pro 250 Ohm se benefician de un amplificador dedicado. Los modelos de menor impedancia funcionan bien directamente desde la mayoría de interfaces de audio." }
  ],
  plugins: [
    { q: "What are the essential mixing plugins for beginners?", q_es: "¿Cuáles son los plugins de mezcla esenciales para principiantes?", a: "Start with an EQ (FabFilter Pro-Q 3), a compressor (FabFilter Pro-C 2), a reverb (Valhalla Room), a limiter (FabFilter Pro-L 2), and a pitch correction tool (Celemony Melodyne 5). These five plugins cover 90% of mixing needs. The FabFilter Total Bundle is worth the investment if you can afford it.", a_es: "Comienza con un EQ (FabFilter Pro-Q 3), un compresor (FabFilter Pro-C 2), una reverberación (Valhalla Room), un limitador (FabFilter Pro-L 2) y afinación (Celemony Melodyne 5). Estos cinco plugins cubren el 90% de las necesidades de mezcla. El FabFilter Total Bundle vale la inversión si puedes permitírtelo." },
    { q: "Are expensive plugins better than free ones?", q_es: "¿Son los plugins caros mejores que los gratuitos?", a: "Not necessarily. Many free plugins like those from ValhallaDSP, TDR, and Analog Obsession are excellent. However, paid plugins like FabFilter offer better workflow, more intuitive interfaces, and premium sound quality. The best approach is to start with free plugins and upgrade only when you hit their limitations.", a_es: "No necesariamente. Muchos plugins gratuitos de ValhallaDSP, TDR y Analog Obsession son excelentes. Los plugins de pago como FabFilter ofrecen mejor flujo de trabajo. Empieza con gratuitos y actualiza solo cuando llegues a sus limitaciones." },
    { q: "What is the best EQ plugin for mixing?", q_es: "¿Cuál es el mejor plugin de EQ para mezclar?", a: "FabFilter Pro-Q 3 is widely considered the best EQ plugin for mixing. Its dynamic EQ mode, intuitive interface, and natural sound make it indispensable. Other excellent options include the iZotope Ozone EQ for mastering, and SSL Native Channel Strip for that classic analog console sound.", a_es: "FabFilter Pro-Q 3 es considerado el mejor plugin de EQ para mezclar. Su modo EQ dinámico, interfaz intuitiva y sonido natural lo hacen indispensable. Otras opciones excelentes incluyen iZotope Ozone EQ y SSL Native Channel Strip." },
    { q: "Do I need analog modeling plugins?", q_es: "¿Necesito plugins de modelado analógico?", a: "Analog modeling plugins add warmth, character, and color that can make digital mixes sound more musical. While not essential, plugins like the Universal Audio UAD series, SSL Native, and Waves CLA series can help achieve a more polished, professional sound. They're especially useful for adding harmonics and saturation.", a_es: "Los plugins de modelado analógico añaden calidez y carácter a las mezclas digitales. Aunque no son esenciales, plugins como Universal Audio UAD y SSL Native pueden ayudar a lograr un sonido más profesional." },
    { q: "What plugins do professional mixers use?", q_es: "¿Qué plugins usan los mezcladores profesionales?", a: "Professional mixers commonly use FabFilter Total Bundle (EQ, compression, limiting), iZotope Ozone and RX suites (mastering, repair), Celemony Melodyne (pitch correction), ValhallaDSP (reverb), Soundtoys (effects), and Universal Audio UAD (analog modeling). Many also rely on Waves and Plugin Alliance for specific tools.", a_es: "Los mezcladores profesionales usan FabFilter Total Bundle, iZotope Ozone y RX, Celemony Melodyne, ValhallaDSP, Soundtoys y Universal Audio UAD. Muchos también confían en Waves y Plugin Alliance." }
  ],
  accessories: [
    { q: "What studio accessories do I actually need?", q_es: "¿Qué accesorios de estudio realmente necesito?", a: "Essential studio accessories include a quality microphone stand (K&M), XLR cables (Mogami or Monster), pop filter, monitor isolation pads, and a sturdy desk or stand for your gear. A MIDI controller like the Arturia KeyLab Essential also helps enormously with music production workflow.", a_es: "Los accesorios esenciales incluyen un soporte de micrófono de calidad, cables XLR, filtro antipop, pads de aislamiento para monitores y un controlador MIDI como el Arturia KeyLab Essential." },
    { q: "Are expensive XLR cables worth it?", q_es: "¿Valen la pena los cables XLR caros?", a: "For most home studios, mid-range XLR cables from companies like Mogami, Monster, or Pro Co provide excellent value. Spending $20-30 per cable ensures reliable performance and noise rejection. Ultra-expensive cables offer diminishing returns — the difference between a $30 cable and a $100 cable is negligible for most applications.", a_es: "Para la mayoría de estudios caseros, cables de gama media de Mogami o Monster ofrecen excelente valor. Gastar $20-30 por cable asegura rendimiento confiable. Los cables ultra caros ofrecen rendimientos decrecientes." },
    { q: "What is the best mic stand for studio recording?", q_es: "¿Cuál es el mejor soporte de micrófono para grabación?", a: "K&M microphone stands are widely considered the best for studio recording due to their German engineering, durability, and stability. The K&M 210/9 boom stand is a classic choice. For budget options, On-Stage Stands offers decent quality at half the price.", a_es: "Los soportes K&M son considerados los mejores para grabación por su durabilidad y estabilidad. El K&M 210/9 es un clásico. Para opciones económicas, On-Stage Stands ofrece calidad decente a mitad de precio." },
    { q: "Do I need monitor stands for my studio?", q_es: "¿Necesito soportes de monitor para mi estudio?", a: "Monitor stands significantly improve sound quality by decoupling speakers from surfaces and positioning them at the correct height and angle. If your monitors sit on your desk, isolation pads are a budget-friendly alternative. For the best results, dedicated floor stands with sand-filled columns are ideal.", a_es: "Los soportes de monitor mejoran significativamente la calidad del sonido al desacoplar los altavoces. Si tus monitores están en el escritorio, los pads de aislamiento son una alternativa económica." },
    { q: "What is the best MIDI controller for beginners?", q_es: "¿Cuál es el mejor controlador MIDI para principiantes?", a: "The Arturia KeyLab Essential 49 Mk3 is the best MIDI controller for beginners, offering great keybed feel, excellent software integration, and useful controls. The Akai MPK Mini MK3 is a compact, affordable choice for smaller spaces. Both come with software bundles that include DAWs and virtual instruments.", a_es: "El Arturia KeyLab Essential 49 Mk3 es el mejor controlador MIDI para principiantes. El Akai MPK Mini MK3 es una opción compacta y económica. Ambos incluyen paquetes de software con DAWs e instrumentos virtuales." }
  ],
  basses: [
    { q: "What is the best budget bass that sounds expensive?", q_es: "¿Cuál es el mejor bajo barato que suena a caro?", a: "The Squier Classic Vibe '60s Jazz Bass ($450) is widely considered the best budget bass that sounds like a much more expensive instrument. It delivers 90% of the tone of a vintage Fender Jazz Bass at a fraction of the cost. The Sire Marcus Miller V3 ($350) is another top contender with its active EQ and premium build quality.", a_es: "El Squier Classic Vibe '60s Jazz Bass ($450) es ampliamente considerado el mejor bajo barato que suena como uno mucho más caro. Ofrece el 90% del tono de un Fender Jazz Bass vintage a una fracción del costo." },
    { q: "Which bass guitar is best for rock music on a budget?", q_es: "¿Qué bajo es mejor para rock con presupuesto ajustado?", a: "The Epiphone Thunderbird '60s Bass ($350) is the best budget bass for rock, featuring a neck-through-body construction typically found on $1,500+ basses. The Squier Affinity PJ Bass ($280) is also excellent for rock with its punchy split-coil pickup.", a_es: "El Epiphone Thunderbird '60s Bass ($350) es el mejor bajo económico para rock, con construcción neck-through-body típica de bajos de $1,500+. El Squier Affinity PJ Bass ($280) también es excelente para rock." },
    { q: "How much should I spend on a first bass guitar?", q_es: "¿Cuánto debería gastar en mi primer bajo?", a: "A budget of $250-$450 is the sweet spot for a quality beginner bass. The Squier Affinity PJ ($280) and Ibanez SR300E ($350) are excellent starters. Avoid basses under $200 as they often have playability issues. The Sterling Ray4 ($350) offers the best value for players interested in funk and slap styles.", a_es: "Un presupuesto de $250-$450 es el punto óptimo para un bajo de principiante de calidad. El Squier Affinity PJ ($280) y el Ibanez SR300E ($350) son excelentes para empezar. Evita bajos de menos de $200." },
    { q: "Should I get a 4-string or 5-string bass as a beginner?", q_es: "¿Debería comprar un bajo de 4 o 5 cuerdas como principiante?", a: "Start with a 4-string bass. It's easier to learn on, strings are cheaper, and most music is written for 4-string bass. The Squier Classic Vibe '60s Jazz Bass ($450) is an excellent 4-string choice. Upgrade to a 5-string like the Sterling Ray5 once you need that low B string for modern genres.", a_es: "Empieza con un bajo de 4 cuerdas. Es más fácil aprender, las cuerdas son más baratas y la mayoría de la música está escrita para 4 cuerdas. El Squier Classic Vibe '60s Jazz Bass ($450) es una excelente opción." },
    { q: "What is the difference between active and passive bass pickups?", q_es: "¿Cuál es la diferencia entre pastillas activas y pasivas?", a: "Active pickups use a battery-powered preamp for higher output and more tonal control via EQ. They're great for modern styles like metal and slap. Passive pickups have a warmer, more natural tone and don't need batteries. The Yamaha TRBX304 has an active EQ while the Squier Classic Vibe uses vintage-style passive pickups.", a_es: "Las pastillas activas usan un previo alimentado por batería para mayor salida y control de tono. Son ideales para estilos modernos. Las pasivas tienen un tono más cálido y natural. El Yamaha TRBX304 tiene EQ activo mientras el Squier Classic Vibe usa pastillas pasivas estilo vintage." }
  ],
  guitars: [
    { q: "What is the best electric guitar for home recording?", q_es: "¿Cuál es la mejor guitarra eléctrica para grabación casera?", a: "The Fender American Professional II Stratocaster is the most versatile studio guitar, offering pristine cleans, punchy mids, and a comfortable neck. For budget-conscious players, the Squire Classic Vibe series delivers exceptional value. The Les Paul Standard is unmatched for thick, sustained rock tones.", a_es: "La Fender American Professional II Stratocaster es la guitarra de estudio más versátil, ofreciendo limpias prístinas y medios potentes. Para presupuestos ajustados, la serie Squier Classic Vibe ofrece valor excepcional. La Les Paul Standard es insuperable para tonos rock gruesos y sostenidos." },
    { q: "Acoustic vs electric guitar for beginners?", q_es: "¿Guitarra acústica vs eléctrica para principiantes?", a: "Electric guitars are easier on the fingers, have thinner strings and lower action, making them more comfortable for beginners. Acoustic guitars build finger strength faster but can be uncomfortable at first. For home recording, an electric guitar with an audio interface offers the most versatility.", a_es: "Las guitarras eléctricas son más cómodas para los dedos, tienen cuerdas más finas y una acción más baja. Las acústicas desarrollan la fuerza de los dedos más rápido pero pueden ser incómodas al principio. Para grabación casera, una guitarra eléctrica con interfaz de audio ofrece la mayor versatilidad." },
    { q: "How much should I spend on a first guitar?", q_es: "¿Cuánto debería gastar en mi primera guitarra?", a: "A budget of $200-$500 is the sweet spot for a quality beginner guitar. The Yamaha Pacifica 112V ($349) and Squier Affinity Stratocaster ($299) are excellent starters that won't hold you back. Avoid guitars under $150 as they often have playability issues that frustrate beginners.", a_es: "Un presupuesto de $200-$500 es el punto óptimo para una guitarra de principiante de calidad. La Yamaha Pacifica 112V ($349) y Squier Affinity Stratocaster ($299) son excelentes opciones que no te limitarán. Evita guitarras de menos de $150, ya que suelen tener problemas de tocabilidad." },
    { q: "What guitar amp should a beginner buy?", q_es: "¿Qué amplificador de guitarra debería comprar un principiante?", a: "A modeling amp like the Boss Katana 50 ($259) is the best choice for beginners, offering dozens of effects and amp models in one affordable package. For practice, the Fender Mustang LT25 ($149) is excellent. Tube amps like the Marshall DSL40CR ($999) are for intermediate to advanced players.", a_es: "Un amplificador de modelado como el Boss Katana 50 ($259) es la mejor opción para principiantes, ofreciendo docenas de efectos y modelos de amplificador en un paquete asequible. Para práctica, el Fender Mustang LT25 ($149) es excelente." },
    { q: "What is the best guitar for recording and live performance?", q_es: "¿Cuál es la mejor guitarra para grabación y directo?", a: "The Fender American Professional II Stratocaster excels in both studio and stage. Its versatile pickups cover everything from clean funk to overdriven rock. The HSS configuration provides humbucking power for high-gain tones while retaining single-coil clarity for cleans.", a_es: "La Fender American Professional II Stratocaster destaca tanto en estudio como en escenario. Sus pastillas versátiles cubren desde funk limpio hasta rock saturado. La configuración HSS proporciona potencia humbucking para tonos de alta ganancia manteniendo la claridad single-coil para limpios." }
  ],
  live_sound: [
    { q: "What is the best powered PA speaker for live performances?", q_es: "¿Cuál es el mejor altavoz PA activo para presentaciones en vivo?", a: "The QSC K12.2 is the industry standard for live sound, offering 2000W of Class D power, a 12-inch woofer, and a 1.4-inch compression driver. The Electro-Voice ZLX-12P is an excellent budget-friendly alternative at half the price.", a_es: "El QSC K12.2 es el estándar de la industria para sonido en vivo, ofreciendo 2000W de potencia Clase D, un woofer de 12 pulgadas y un driver de compresión de 1.4 pulgadas. El Electro-Voice ZLX-12P es una excelente alternativa económica a la mitad del precio." },
    { q: "How many watts do I need for a PA speaker?", q_es: "¿Cuántos vatios necesito para un altavoz PA?", a: "For small to medium venues (up to 300 people), 1000-2000W peak powered speakers like the QSC K12.2 or EV ZLX-12P are sufficient. For larger venues, look for 2000W+ systems with subwoofers. SPL rating matters more than wattage.", a_es: "Para lugares pequeños y medianos (hasta 300 personas), los altavoces activos de 1000-2000W pico como el QSC K12.2 o EV ZLX-12P son suficientes. Para lugares más grandes, busca sistemas de 2000W+ con subwoofers. La clasificación SPL importa más que el vataje." },
    { q: "Do I need a subwoofer with my PA speakers?", q_es: "¿Necesito un subwoofer con mis altavoces PA?", a: "For live music with bass guitars and kick drums, a subwoofer is essential for full-range sound. For spoken word events, 12-inch or 15-inch tops alone may suffice. The QSC KS112 or EV ELX200-12S pair well with the K12.2 and ZLX-12P respectively.", a_es: "Para música en vivo con bajos y bombos, un subwoofer es esencial para sonido de rango completo. Para eventos de voz, los tops de 12 o 15 pulgadas pueden ser suficientes. El QSC KS112 o EV ELX200-12S combinan bien con el K12.2 y ZLX-12P respectivamente." },
    { q: "What is the difference between active and passive PA speakers?", q_es: "¿Cuál es la diferencia entre altavoces PA activos y pasivos?", a: "Active speakers like the QSC K12.2 have built-in amplifiers and DSP, making them easier to set up — just plug in a microphone or mixer. Passive speakers require an external amplifier and crossover but offer more customization and easier serviceability.", a_es: "Los altavoces activos como el QSC K12.2 tienen amplificadores y DSP incorporados, facilitando la configuración — solo conecta un micrófono o mezclador. Los pasivos requieren un amplificador externo y crossover pero ofrecen más personalización." },
    { q: "How do I choose between a 12-inch and 15-inch PA speaker?", q_es: "¿Cómo elijo entre un altavoz PA de 12 y 15 pulgadas?", a: "12-inch speakers like the QSC K12.2 offer a good balance of portability and low-end response, ideal for most venues. 15-inch speakers provide more bass but are heavier. For full-range sound without a sub, 15-inch is better. With a subwoofer, 12-inch tops are preferred.", a_es: "Los altavoces de 12 pulgadas como el QSC K12.2 ofrecen buen equilibrio entre portabilidad y respuesta de graves, ideales para la mayoría de lugares. Los de 15 pulgadas proporcionan más graves pero pesan más. Para sonido de rango completo sin sub, 15 pulgadas es mejor. Con subwoofer, los tops de 12 pulgadas son preferidos." }
  ],
  production: [
    { q: "What equipment do I need for making beats?", q_es: "¿Qué equipo necesito para hacer beats?", a: "Start with a DAW (Ableton Live, FL Studio), a MIDI controller like the Akai MPC or Arturia KeyLab, studio headphones like the beyerdynamic DT 770 Pro, and a good audio interface like the Focusrite Scarlett 2i2.", a_es: "Comienza con un DAW (Ableton Live, FL Studio), un controlador MIDI como Akai MPC o Arturia KeyLab, auriculares de estudio como los beyerdynamic DT 770 Pro, y una buena interfaz de audio como la Focusrite Scarlett 2i2." },
    { q: "What is the best DAW for beat-making?", q_es: "¿Cuál es el mejor DAW para hacer beats?", a: "Ableton Live is the most popular choice for beat-making due to its intuitive workflow, powerful MIDI editing, and session view. FL Studio is another top choice with its step sequencer and pattern-based approach. Both are excellent for electronic music production.", a_es: "Ableton Live es la opción más popular para hacer beats por su flujo de trabajo intuitivo, potente edición MIDI y vista de sesión. FL Studio es otra excelente opción con su secuenciador de pasos y enfoque basado en patrones. Ambos son excelentes para producción de música electrónica." },
    { q: "Do I need a drum machine or can I use software?", q_es: "¿Necesito una caja de ritmos o puedo usar software?", a: "Software drum machines and samplers in your DAW can produce professional results. However, hardware drum machines like the Roland TR-8S or Akai MPC One offer tactile control and can inspire creativity. Many producers use both.", a_es: "Las cajas de ritmos y samplers de software en tu DAW pueden producir resultados profesionales. Sin embargo, las cajas de ritmos hardware como Roland TR-8S o Akai MPC One ofrecen control táctil y pueden inspirar creatividad. Muchos productores usan ambos." }
  ],
  amps: [
    { q: "What is the best guitar amp for beginners?", q_es: "¿Cuál es el mejor amplificador de guitarra para principiantes?", a: "The Boss Katana 50 ($259) is the best modeling amp for beginners, offering dozens of effects and amp models in one affordable package. The Fender Mustang LT25 ($149) is excellent for practice. Tube amps like the Marshall DSL40CR ($999) are for intermediate to advanced players.", a_es: "El Boss Katana 50 ($259) es el mejor amplificador de modelado para principiantes. El Fender Mustang LT25 ($149) es excelente para práctica. Los amplificadores a válvulas como el Marshall DSL40CR ($999) son para niveles intermedios y avanzados." },
    { q: "Modeling vs tube amp — which is better?", q_es: "¿Amplificador de modelado vs válvulas — cuál es mejor?", a: "Modeling amps like the Boss Katana offer versatility with many amp models and effects built-in, perfect for home practice and recording. Tube amps like the Marshall DSL40CR provide dynamic response and natural compression that many guitarists prefer for live performance and studio recording.", a_es: "Los amplificadores de modelado como el Boss Katana ofrecen versatilidad con muchos modelos de amplificador y efectos incorporados. Los amplificadores a válvulas como el Marshall DSL40CR ofrecen respuesta dinámica que muchos guitarristas prefieren para directo." },
    { q: "How many watts do I need for a guitar amp?", q_es: "¿Cuántos vatios necesito para un amplificador de guitarra?", a: "For home practice, 5-20 watts is sufficient. For rehearsals with a band, 20-50 watts. For live performances without PA support, 50-100 watts. Modeling amps like the Katana have power attenuation, letting you get great tone at any volume level.", a_es: "Para práctica en casa, 5-20 vatios son suficientes. Para ensayos con banda, 20-50 vatios. Para presentaciones en vivo sin apoyo de PA, 50-100 vatios. Los amplificadores de modelado como el Katana tienen atenuación de potencia." }
  ],
  pedals: [
    { q: "What guitar pedals should every guitarist have?", q_es: "¿Qué pedales de guitarra debería tener todo guitarrista?", a: "Essential guitar pedals include a tuner, overdrive/distortion (like the Ibanez Tube Screamer), delay (like the Boss DD-8), reverb, and a volume or wah pedal. A multi-effects pedal like the Line 6 HX Stomp can replace many individual pedals.", a_es: "Los pedales esenciales incluyen afinador, overdrive/distorsión (como Ibanez Tube Screamer), delay (como Boss DD-8), reverb y un pedal de volumen o wah. Un pedal multiefectos como el Line 6 HX Stomp puede reemplazar muchos pedales individuales." },
    { q: "Are expensive guitar pedals worth it?", q_es: "¿Valen la pena los pedales de guitarra caros?", a: "Expensive pedals from brands like Strymon, Chase Bliss, and Eventide offer superior build quality, more features, and better sound quality. However, budget pedals from brands like Boss, MXR, and TC Electronic offer excellent value and are used by many professionals.", a_es: "Los pedales caros de marcas como Strymon, Chase Bliss y Eventide ofrecen calidad de construcción superior. Sin embargo, los pedales económicos de Boss, MXR y TC Electronic ofrecen excelente valor." },
    { q: "Should I buy individual pedals or a multi-effects unit?", q_es: "¿Debería comprar pedales individuales o un multiefectos?", a: "Individual pedals allow you to customize your tone and mix and match brands. Multi-effects units like the Line 6 HX Stomp or Boss GT-1000 offer convenience, presets, and cost-effectiveness. Many players start with a multi-effects unit and add individual pedals later.", a_es: "Los pedales individuales permiten personalizar tu sonido y combinar marcas. Los multiefectos como Line 6 HX Stomp o Boss GT-1000 ofrecen conveniencia y rentabilidad. Muchos músicos empiezan con un multiefectos y añaden pedales individuales después." }
  ],
  daw: [
    { q: "What is the best DAW for music production?", q_es: "¿Cuál es el mejor DAW para producción musical?", a: "Ableton Live is the best for electronic music and beat-making, Pro Tools is the industry standard for recording and mixing, Logic Pro is excellent for songwriting on Mac, and Cubase offers powerful MIDI and scoring features. The best DAW depends on your workflow and genre.", a_es: "Ableton Live es el mejor para música electrónica, Pro Tools es el estándar de la industria para grabación, Logic Pro es excelente para composición en Mac, y Cubase ofrece potentes funciones MIDI. El mejor DAW depende de tu flujo de trabajo." },
    { q: "Do I need an expensive DAW as a beginner?", q_es: "¿Necesito un DAW caro como principiante?", a: "No. GarageBand (Mac), BandLab (web), and Cakewalk (Windows) are free and capable. Ableton Live Intro, FL Studio Fruity Edition, and Logic Pro (Mac) offer professional features at reasonable prices. Start with a free option and upgrade when you need more features.", a_es: "No. GarageBand (Mac), BandLab (web) y Cakewalk (Windows) son gratuitos y capaces. Ableton Live Intro, FL Studio Fruity Edition y Logic Pro (Mac) ofrecen funciones profesionales a precios razonables. Empieza con una opción gratuita." },
    { q: "What is the difference between Ableton Live and Pro Tools?", q_es: "¿Cuál es la diferencia entre Ableton Live y Pro Tools?", a: "Ableton Live is designed for electronic music production with its session view, warping, and MIDI workflow. Pro Tools is optimized for recording, editing, and mixing audio with industry-standard editing tools and automation. Many professionals use both for different stages of production.", a_es: "Ableton Live está diseñado para producción de música electrónica. Pro Tools está optimizado para grabación, edición y mezcla de audio. Muchos profesionales usan ambos para diferentes etapas de producción." }
  ],
  keyboards: [
    { q: "What is the best MIDI keyboard for music production?", q_es: "¿Cuál es el mejor teclado MIDI para producción musical?", a: "The Arturia KeyLab Essential 49 Mk3 offers the best value with great keybed feel, DAW integration, and included software. The Novation Launchkey 49 is excellent for Ableton users. For portability, the Akai MPK Mini MK3 is a compact powerhouse.", a_es: "El Arturia KeyLab Essential 49 Mk3 ofrece el mejor valor con buen tacto de teclas e integración DAW. El Novation Launchkey 49 es excelente para usuarios de Ableton. Para portabilidad, el Akai MPK Mini MK3 es un compacto potente." },
    { q: "How many keys do I need on a MIDI keyboard?", q_es: "¿Cuántas teclas necesito en un teclado MIDI?", a: "25 keys is sufficient for basslines, leads, and chord stabs. 49 keys is the sweet spot for most producers, allowing two-handed playing. 61 or 88 keys are best for pianists and those who want to play complex arrangements. Consider your desk space and portability needs.", a_es: "25 teclas son suficientes para líneas de bajo y leads. 49 teclas es el punto óptimo para la mayoría de productores. 61 u 88 teclas son mejores para pianistas. Considera tu espacio y portabilidad." },
    { q: "Weighted vs semi-weighted keys — which is better?", q_es: "¿Teclas contrapesadas vs semi-pesadas — cuál es mejor?", a: "Weighted keys simulate the feel of an acoustic piano and are best for pianists. Semi-weighted keys offer a balance between synth-action and weighted, suitable for most production styles. Synth-action (unweighted) keys are lighter and better for fast leads and synth playing.", a_es: "Las teclas contrapesadas simulan un piano acústico. Las semi-pesadas ofrecen equilibrio entre acción de sintetizador y contrapesadas. Las teclas de acción de sintetizador son más ligeras." }
  ],
  'drum-machine': [
    { q: "What is the best drum machine for music production?", q_es: "¿Cuál es la mejor caja de ritmos para producción musical?", a: "The Roland TR-8S is the best all-around drum machine with authentic 808/909 sounds, sample import, and hands-on control. The Akai MPC One is a powerful groovebox that combines drum sampling, sequencing, and production in one unit. The Korg Volca Beats is a great budget entry point.", a_es: "La Roland TR-8S es la mejor caja de ritmos versátil con sonidos auténticos 808/909. La Akai MPC One es una groovebox potente. La Korg Volca Beats es un gran punto de entrada económico." },
    { q: "Drum machine vs drum software — which should I choose?", q_es: "¿Caja de ritmos vs software de batería — cuál elegir?", a: "Software like Battery, EZDrummer, or Superior Drummer offers unlimited sounds and deep editing. Hardware drum machines like the Roland TR-8S provide tactile control and are more inspiring for live performance and beat-making. Many producers combine both approaches.", a_es: "El software como Battery o Superior Drummer ofrece sonidos ilimitados. Las cajas de ritmos hardware como Roland TR-8S proporcionan control táctil. Muchos productores combinan ambos enfoques." },
    { q: "Can I use a drum machine without a computer?", q_es: "¿Puedo usar una caja de ritmos sin computadora?", a: "Yes. Hardware drum machines like the Roland TR-8S, Akai MPC One, and Elektron Digitakt are standalone devices that don't require a computer. They have built-in sounds, sequencers, and effects. You can record their output directly into an audio interface or mixer.", a_es: "Sí. Las cajas de ritmos hardware como Roland TR-8S y Akai MPC One son dispositivos independientes que no requieren computadora. Tienen sonidos, secuenciadores y efectos incorporados." }
  ],
  streaming: [
    { q: "What is the best microphone for streaming?", q_es: "¿Cuál es el mejor micrófono para streaming?", a: "The Shure SM7B is the industry standard for streaming and podcasting vocals, with the Electro-Voice RE20 as the classic broadcast alternative. For USB simplicity, the Shure MV7+ ($299) and Elgato Wave:3 ($150) plug straight into your PC with zero setup, while the Rode NT1 5th Generation ($269) adds studio-grade condenser detail.", a_es: "El Shure SM7B es el estándar de la industria para voces de streaming y podcast, con el Electro-Voice RE20 como la alternativa clásica de broadcast. Para simplicidad USB, el Shure MV7+ ($299) y el Elgato Wave:3 ($150) se conectan directo a tu PC sin configuración, mientras el Rode NT1 5th Generation ($269) añade detalle de condensador de estudio." },
    { q: "USB vs XLR microphone for streaming — which is better?", q_es: "¿Micrófono USB vs XLR para streaming — cuál es mejor?", a: "USB mics like the Elgato Wave:3 or Shure MV7+ are plug-and-play and perfect for beginners. XLR mics like the Shure SM7B or Electro-Voice RE20 require an audio interface but sound better and allow gain control, plus room to upgrade with a Cloudlifter. The MV7+ and NT1 5th Gen do both, giving you USB today and XLR later.", a_es: "Los micros USB como el Elgato Wave:3 o Shure MV7+ son plug-and-play y perfectos para empezar. Los micros XLR como el Shure SM7B o Electro-Voice RE20 requieren una interfaz de audio pero suenan mejor y permiten controlar la ganancia, con margen para mejorar con un Cloudlifter. El MV7+ y el NT1 5th Gen ofrecen ambos: USB hoy y XLR mañana." },
    { q: "Do I need an audio interface for streaming?", q_es: "¿Necesito una interfaz de audio para streaming?", a: "Only if you use an XLR microphone. A 2-input interface like the Focusrite Scarlett 2i2 4th Gen ($199) covers a single streamer with room to grow, and models like the SSL 2+ ($299) add high headroom and MIDI. For a solo USB setup, no interface is needed at all.", a_es: "Solo si usas un micrófono XLR. Una interfaz de 2 entradas como la Focusrite Scarlett 2i2 4th Gen ($199) cubre a un streamer con margen de crecimiento, y modelos como el SSL 2+ ($299) añaden alto margen y MIDI. Para un setup USB individual, no necesitas interfaz." },
    { q: "How do I stop microphone background noise when streaming?", q_es: "¿Cómo evito el ruido de fondo del micrófono al hacer streaming?", a: "Use a dynamic microphone like the Shure SM7B or MV7+, which rejects off-axis sound much better than condensers. Set a sensible gain level so you're not boosting room noise, position the mic close (2-6 inches), and apply a noise gate in your streaming software. USB mics like the Wave:3 include built-in clipguard and software filters.", a_es: "Usa un micrófono dinámico como el Shure SM7B o MV7+, que rechazan el sonido fuera de eje mucho mejor que los condensadores. Ajusta una ganancia sensata para no amplificar el ruido de la sala, coloca el micro cerca (5-15 cm) y aplica una puerta de ruido en tu software. Los micros USB como el Wave:3 incluyen clipguard y filtros por software." },
    { q: "What do I need for a two-host podcast setup?", q_es: "¿Qué necesito para un podcast con dos presentadores?", a: "For two mics, the simplest solution is a dual-XLR interface or mixer like the Elgato Wave XLR Pro ($350) handling two microphones, or two USB mics into a laptop. The Rode Streamer X and BEACN Mix Create also route multiple audio sources. The Elgato Stream Deck+ ($160) makes mute and scene switching one press.", a_es: "Para dos micros, la solución más simple es una interfaz o mezcladora de doble XLR como el Elgato Wave XLR Pro ($350) gestionando dos micrófonos, o dos micros USB a un portátil. El Rode Streamer X y el BEACN Mix Create también enrutan múltiples fuentes de audio. El Elgato Stream Deck+ ($160) hace que silenciar o cambiar de escena sea un solo toque." }
  ]
};

function boldFirstSentence(html) {
  let t = html.trim();
  if (/^(<p>\s*)?<strong/i.test(t)) return html;
  let prefix = '', suffix = '';
  const pOpen = t.match(/^(<p[^>]*>)/i);
  if (pOpen) {
    prefix = pOpen[1];
    t = t.slice(pOpen[1].length);
    const pClose = t.match(/(<\/p>)$/i);
    if (pClose) { suffix = pClose[1]; t = t.slice(0, -pClose[1].length); }
  }
  t = t.replace(/^((?:[^.]|\.(?=\d))*?\.(?=\s|$))/, '<strong>$1</strong>');
  return prefix + t + suffix;
}

const YEAR_TAG = String(new Date().getFullYear());

function normImg(path) {
  return path && path.startsWith('../') ? path.substring(3) : path;
}

function fmtReviewDate(iso, es) {
  var d = new Date(String(iso).replace(/-/g, '/') + ' 00:00:00');
  if (isNaN(d)) return String(iso);
  var en = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var esmo = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  var mo = es ? esmo : en;
  return es ? (d.getDate() + ' ' + mo[d.getMonth()] + ' ' + d.getFullYear()) : (mo[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear());
}

function userReviewsSection(guide, isEs) {
  var pids = [...new Set(guide.sections.flatMap(s => s.products))];
  var rv = [];
  pids.forEach(function(pid) {
    var p = products.find(pr => pr.id === pid);
    var name = p ? (isEs && p.title_es ? p.title_es : p.title) : ('#' + pid);
    reviews.filter(r => r.productId === pid).forEach(function(r) {
      rv.push({ productName: name, author: r.author, rating: r.rating, text: r.text, text_es: r.text_es, text_en: r.text_en, date: r.date });
    });
  });
  rv = rv.filter(function(r) { return isEs ? !!r.text_es : (!!r.text_en || !!r.text); });
  rv.sort(function(a, b) { return String(b.date).localeCompare(String(a.date)); });
  var sum = rv.reduce(function(s, r) { return s + r.rating; }, 0);
  var avg = rv.length ? Math.round((sum / rv.length) * 10) / 10 : 0;
  var reviewWord = rv.length === 1 ? (isEs ? 'reseña' : 'review') : (isEs ? 'reseñas' : 'reviews');
  var empty = rv.length === 0;
  var title = isEs ? 'Reseñas' : 'Reviews';
  var head = '<div class="guide-reviews-head' + (empty ? ' is-empty' : '') + '">' +
    '<h2 class="guide-reviews-title">' + title + '</h2>' +
    '<div class="guide-reviews-count">(' + rv.length + ' ' + reviewWord + ')</div>' +
  '</div>';
  if (empty) {
    return '<div class="guide-reviews" id="reviews">' + head + '</div>';
  }
  var limit = 3;
  var hiddenExtra = rv.length > limit ? rv.slice(limit) : [];
  var itemAuthor = function(r) { return isEs && String(r.author).toLowerCase() === 'anonymous' ? 'Anónimo' : r.author; };
  var items = rv.slice(0, limit).map(function(r) {
    var txt = isEs ? (r.text_es || r.text) : (r.text_en || r.text);
    return '<div class="guide-review-item">' +
      '<div class="guide-review-item-head"><span class="guide-review-author">' + itemAuthor(r) + '</span><span class="guide-review-product">' + r.productName + '</span><span class="guide-review-date">' + fmtReviewDate(r.date, isEs) + '</span></div>' +
      '<div class="guide-review-stars">' + reviewStars(r.rating) + ' <span class="guide-review-stars-num">' + r.rating.toFixed(1) + '</span></div>' +
      '<p class="guide-review-text">' + txt + '</p>' +
    '</div>';
  }).join('');
  var hiddenItems = hiddenExtra.map(function(r) {
    var txt = isEs ? (r.text_es || r.text) : (r.text_en || r.text);
    return '<div class="guide-review-item" style="display:none" data-extra>' +
      '<div class="guide-review-item-head"><span class="guide-review-author">' + itemAuthor(r) + '</span><span class="guide-review-product">' + r.productName + '</span><span class="guide-review-date">' + fmtReviewDate(r.date, isEs) + '</span></div>' +
      '<div class="guide-review-stars">' + reviewStars(r.rating) + ' <span class="guide-review-stars-num">' + r.rating.toFixed(1) + '</span></div>' +
      '<p class="guide-review-text">' + txt + '</p>' +
    '</div>';
  }).join('');
  var moreBtn = hiddenExtra.length ? '<button type="button" class="guide-reviews-more" onclick="var l=this.parentElement.querySelectorAll(\'.guide-review-item[data-extra]\');l.forEach(function(e){e.style.display=\'block\'});this.style.display=\'none\'">' + (isEs ? ('Ver ' + hiddenExtra.length + ' más reseñas') : ('See ' + hiddenExtra.length + ' more reviews')) + '</button>' : '';
  return '<div class="guide-reviews" id="reviews">' + head +
    '<div class="guide-reviews-list">' + items + hiddenItems + moreBtn + '</div>' +
  '</div>';
}

function guideCompProgress() {
  return '<div class="guide-comp-progress"><div class="guide-comp-progress-bar"></div></div>';
}

function guideCompControls(isEs, extra) {
  var l = '<button type="button" class="guide-comp-arrow guide-comp-arrow-left" onclick="var s=this.closest(\'.guide-comp-wrap\').querySelector(\'.guide-comp-scroll\');s.scrollBy({left:-Math.max(240,s.clientWidth*0.7),behavior:\'smooth\'})" aria-label="' + (isEs ? 'Desplazar a la izquierda' : 'Scroll left') + '">' + icon('chevron-left', 'fa-solid') + '</button>';
  var r = '<button type="button" class="guide-comp-arrow guide-comp-arrow-right" onclick="var s=this.closest(\'.guide-comp-wrap\').querySelector(\'.guide-comp-scroll\');s.scrollBy({left:Math.max(240,s.clientWidth*0.7),behavior:\'smooth\'})" aria-label="' + (isEs ? 'Desplazar a la derecha' : 'Scroll right') + '">' + icon('chevron-right', 'fa-solid') + '</button>';
  var cls = 'guide-comp-controls' + (extra ? ' ' + extra : '');
  return '<div class="' + cls + '">' + l + guideCompProgress() + r + '</div>';
}

function navDropdown(isEs) {
  return `<div class="nav-dd">
    <button type="button" class="nav-dd-btn" aria-haspopup="true" aria-expanded="false" onclick="toggleNavDropdown(this)">${isEs ? 'Nuevos Lanzamientos' : 'New Releases'}<svg class="nav-dd-caret" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg></button>
    <div class="nav-dd-panel" role="menu">
      <a class="nav-dd-link" href="https://www.awin1.com/cread.php?awinmid=1117&amp;awinaffid=2891111&amp;ued=https%3A%2F%2Fwww.gear4music.com%2FNew-Releases" target="_blank" rel="noopener noreferrer sponsored"><img src="../img/gear4music-icon.png" alt="" class="nav-dd-link-icon">Gear4Music</a>
      <a class="nav-dd-link" href="https://www.andertons.co.uk/browse/new/?irgwc=1&amp;irpid=7292297" target="_blank" rel="noopener noreferrer sponsored"><img src="../img/andertons-icon.png" alt="" class="nav-dd-link-icon">Andertons</a>
      <a class="nav-dd-link" href="https://www.awin1.com/cread.php?awinmid=63816&amp;awinaffid=2891111&amp;ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FNew-Products%2Fcat-NEWPRODUCTS" target="_blank" rel="noopener noreferrer sponsored"><img src="../img/musicstore-icon.png" alt="" class="nav-dd-link-icon">Music Store</a>
      <a class="nav-dd-link" href="https://www.anrdoezrs.net/click-101857888-10422044-1779394?url=https%3A%2F%2Fwww.zzounds.com%2Flp%2Fnew-products%2F219" target="_blank" rel="noopener noreferrer sponsored"><img src="../img/zzounds-icon.png" alt="" class="nav-dd-link-icon">zZounds</a>
      <a class="nav-dd-link" href="https://www.pluginboutique.com/?a_aid=65fd7463b5f28&gad_source=1&gad_campaignid=23953084266&gbraid=0AAAABBZvMhd9QWokzi5bVQA51ocA8i1cR&gclid=CjwKCAjw1vXTBhB-EiwAEKr_k7lT3Rksx6r66LkI2QwlN4Bf1lJSPE3U70tvwkq6mKXV3yO0vMhqoxoC3IQQAvD_BwE" target="_blank" rel="noopener noreferrer sponsored"><img src="../img/pluginboutique-icon.png" alt="" class="nav-dd-link-icon">Plugin Boutique</a>
      <a class="nav-dd-link" href="https://www.amazon.com/gp/new-releases/musical-instruments?tag=topmusicg-20" target="_blank" rel="noopener noreferrer sponsored"><svg data-fa="amazon" class="nav-dd-link-icon" style="font-size:18px;color:#ff9900" viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z"/></svg>Amazon</a>
    </div>
  </div>`;
}

function buildGuidePage(guide, lang, idx) {
  const isEs = lang === 'es';
  const title = Y(isEs && guide.title_es ? guide.title_es : guide.title);
  const intro = esText(isEs && guide.intro_es, guide.intro);
  const conclusion = esText(isEs && guide.conclusion_es, guide.conclusion);
  const verdict = esText(isEs && guide.verdict_es, guide.verdict);
  const image = guide.image || '../img/og-image.png';
  const fullImage = guide.image && guide.image.startsWith('http') ? guide.image : 'https://topmusiciangear.com/' + (normImg(guide.image) || 'img/og-image.png');
  const filename = isEs ? `${guide.id}_es.html` : `${guide.id}.html`;
  const canonical = `https://topmusiciangear.com/guides/${isEs ? guide.id + '_es' : guide.id}.html`;
  const alternateEn = `https://topmusiciangear.com/guides/${guide.id}.html`;
  const alternateEs = `https://topmusiciangear.com/guides/${guide.id}_es.html`;

  const allProductIds = [...new Set(guide.sections.flatMap(s => s.products))];
  const productCards = allProductIds.map(pid => {
    const p = products.find(pr => pr.id === pid);
    return p ? productCard(p, lang) : '';
  }).join('');

  const sectionsHtml = guide.sections.map((s, si) => {
    const h = isEs && s.heading_es ? s.heading_es : s.heading;
    const c = esText(isEs && s.content_es, s.content);
    const boldedC = boldFirstSentence(c);
    const sectionProducts = s.products ? s.products.map(pid => products.find(pr => pr.id === pid)).filter(Boolean) : [];
    let sectionChips = '', productImgs = '';
    if (s.splitProducts && sectionProducts.length > 1) {
      const blocks = sectionProducts.map(p => {
        const t = isEs && p.title_es ? p.title_es : p.title;
        return '<div class="guide-section-prod">' +
          '<div class="guide-section-prod-name">' + t + '</div>' +
          '<div class="guide-section-prod-imgs"><img src="' + (p.img.startsWith('http') ? p.img : '../' + p.img) + '" alt="' + t + '" class="guide-section-img lb-img" style="cursor:zoom-in"></div>' +
          '<div class="guide-section-buy">' + storeChips(p, isEs ? 'es' : 'en') + '</div>' +
        '</div>';
      }).join('');
      productImgs = '<div class="guide-section-prods">' + blocks + '</div>';
    } else {
      const firstProduct = sectionProducts.length ? sectionTopicProduct(s, sectionProducts) : null;
      sectionChips = firstProduct ? '<div class="guide-section-buy">' + storeChips(firstProduct, isEs ? 'es' : 'en') + '</div>' : '';
      if (firstProduct && s.video) {
        const vt = isEs && firstProduct.title_es ? firstProduct.title_es : firstProduct.title;
        const psrc = firstProduct.img.startsWith('http') ? firstProduct.img : '../' + firstProduct.img;
        productImgs = '<div class="guide-section-imgs">' +
          '<img src="' + psrc + '" alt="' + (isEs && firstProduct.title_es ? firstProduct.title_es : firstProduct.title) + '" class="guide-section-img lb-img" style="cursor:zoom-in">' +
          '<div class="guide-video-thumb lb-video" data-yt="' + s.video + '" role="button" aria-label="Play video" tabindex="0">' +
            '<img src="https://i.ytimg.com/vi/' + s.video + '/maxresdefault.jpg" alt="' + vt + '" class="guide-video-poster" loading="lazy" onerror="this.onerror=null;this.src=\'https://i.ytimg.com/vi/' + s.video + '/hqdefault.jpg\'">' +
            '<span class="guide-video-play"><svg viewBox="0 0 24 24" width="46" height="46" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="rgba(0,0,0,.6)" stroke="#fff" stroke-width="1.3"/><path d="M9.5 7.2v9.6l8.2-4.8z" fill="#fff"/></svg></span>' +
          '</div>' +
        '</div>';
      } else {
        productImgs = firstProduct ? '<div class="guide-section-imgs">' +
          '<img src="' + (firstProduct.img.startsWith('http') ? firstProduct.img : '../' + firstProduct.img) + '" alt="' + (isEs && firstProduct.title_es ? firstProduct.title_es : firstProduct.title) + '" class="guide-section-img lb-img" style="cursor:zoom-in">' +
        '</div>' : '';
      }
    }
    const mediaBuy = (productImgs && sectionChips)
      ? '<div class="guide-section-mediabuy">' + productImgs + sectionChips + '</div>'
      : productImgs + sectionChips;
    return `<div class="guide-section">
      <h2 class="guide-section-heading" id="sec-${si + 1}">${h}</h2>
      <div class="guide-section-content">${boldedC}${mediaBuy}</div>
    </div>`;
  }).join('');

  const tocHtml = '';

  const authorBoxHtml = `<div class="guide-author-box">
    <div class="guide-author-box-body">
      <span class="guide-author-box-name">${isEs ? 'Por Daniel Carnago · Agosto 2026' : 'By Daniel Carnago · August 2026'}</span>
      <p class="guide-author-box-bio">${isEs ? 'Músico de directo y de sesión con más de 20 años sobre los escenarios de todo el mundo. Una gran cantidad de los equipos que recomiendo los he usado yo mismo, en giras, estudios profesionales o en mi propio estudio.' : 'Touring and session musician with 20+ years on stages around the world. A great deal of the gear I recommend here I have used myself, on tours, in professional studios, or in my own studio.'}</p>
      <span class="guide-author-box-note">${isEs ? 'Cómo pruebo el equipo: seré honesto, no he probado cada producto de esta web. Gran parte lo he usado yo mismo en directos y sesiones de grabación; otros los he visto probar a músicos y técnicos de sonido de confianza; y el resto los he investigado a fondo antes de recomendarlos.' : 'How I test gear: to be honest, I have not tested every product on this site. Much of it I have used myself in live shows and recording sessions; others I have seen tested by musicians and sound techs I trust; and the rest I have researched in depth before recommending.'}</span>
    </div>
  </div>`;

  var dPub = guideDates(guide, idx).published, dMod = guideDates(guide, idx).modified;
  var d = guideDesc(guide, intro, isEs).replace(/"/g, '&quot;');
  var ogMeta = `  <meta property="og:type" content="article">
  <meta property="og:title" content="${title} | TopMusicianGear">
  <meta property="og:description" content="${d}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${fullImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="TopMusicianGear">
  <meta property="og:locale" content="${isEs ? 'es_ES' : 'en_US'}">
  <meta property="og:locale:alternate" content="${isEs ? 'en_US' : 'es_ES'}">
  <meta property="article:published_time" content="${dPub}">
  <meta property="article:modified_time" content="${dMod}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${d}">
  <meta name="twitter:image" content="${fullImage}">
  <meta name="twitter:site" content="@Cuban3Beats">
  <meta name="twitter:creator" content="@Cuban3Beats">`;

  // JSON-LD
  const ldArticle = {
    "@context": "https://schema.org", "@type": "Article",
    "headline": title,
    "description": guideDesc(guide, intro, isEs),
    "author": { "@type": "Person", "name": "Daniel Carnago", "givenName": "Daniel", "familyName": "Carnago", "alternateName": "Cuban3Beats", "jobTitle": "Professional Musician & Audio Engineer", "url": "https://topmusiciangear.com/about.html", "sameAs": ["https://www.youtube.com/@Cuban3Beats","https://open.spotify.com/artist/3HMtcts1AYCzkI4pBQKRzX","https://www.tiktok.com/@cuban3beats","https://www.facebook.com/Cuban3Beats/","https://www.instagram.com/cuban3beats","https://x.com/Cuban3Beats"], "knowsAbout": ["Audio Engineering","Music Production","Live Sound","Studio Recording","Music Gear"] },
    "publisher": { "@type": "Organization", "name": "TopMusicianGear", "url": "https://topmusiciangear.com", "logo": { "@type": "ImageObject", "url": "https://topmusiciangear.com/img/favicon.png" } },
    "image": { "@type": "ImageObject", "url": fullImage, "width": 1200, "height": 630 },
    "thumbnailUrl": fullImage,
    "datePublished": guideDates(guide, idx).published, "dateModified": guideDates(guide, idx).modified,
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
    "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".guide-detail-intro", ".verdict-label"] },
    "about": { "@type": "Thing", "name": guide.aboutName || "Music Gear" },
    "inLanguage": lang
  };

  const items = [];
  const productSchemas = [];
  guide.featuredProducts.forEach((pid, idx) => {
    const p = products.find(pr => pr.id === pid);
    if (p) {
      const generatedSku = "TMG-" + (p.category || "gear").toUpperCase() + "-" + String(p.id).padStart(3, "0");
      const title = isEs && p.title_es ? p.title_es : p.title;
      var pc = null;
      if (guide.verdictProsCons) {
        pc = guide.verdictProsCons.find(function(v) { return (isEs && v.name_es ? v.name_es : v.name) === title; });
      }
      var pn = pc ? (isEs && pc.pros_es ? pc.pros_es : pc.pros) : undefined;
      var cn = pc ? (isEs && pc.cons_es ? pc.cons_es : pc.cons) : undefined;
      var agg = (function(){ var st = reviewStats(p.id); return st ? { "@type": "AggregateRating", "ratingValue": st.ratingValue, "reviewCount": st.reviewCount, "bestRating": 5, "worstRating": 1 } : null; })();
      var reviewEnts = reviews.filter(function(r) { return r.productId === p.id; }).map(function(r) {
        var rvBody = isEs ? (r.text_es || r.text) : (r.text_en || r.text);
        return { "@type": "Review", "author": { "@type": "Person", "name": r.author }, "datePublished": r.date, "reviewBody": rvBody, "reviewRating": { "@type": "Rating", "ratingValue": r.rating, "bestRating": 5 } };
      });
      var listItem = {
        "@type": "ListItem", "position": idx + 1,
        "item": {
          "@type": "Product",
          "name": title,
          "brand": { "@type": "Brand", "name": p.brand || "" },
          "mpn": p.mpn || generatedSku,
          "sku": generatedSku,
          "description": trunc(isEs && p.desc_es ? p.desc_es : p.desc, 155),
          "offers": { "@type": "Offer", "price": p.price, "priceCurrency": "USD", "availability": "https://schema.org/InStock", "hasMerchantReturnPolicy": { "@type": "MerchantReturnPolicy", "applicableCountry": "US", "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow", "merchantReturnDays": 30, "returnMethod": "https://schema.org/ReturnByMail", "returnFees": "https://schema.org/FreeReturn" }, "shippingDetails": { "@type": "OfferShippingDetails", "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "US" }, "shippingRate": { "@type": "MonetaryAmount", "value": 0, "currency": "USD" }, "deliveryTime": { "@type": "ShippingDeliveryTime", "handlingTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 2, "unitCode": "DAY" }, "transitTime": { "@type": "QuantitativeValue", "minValue": 3, "maxValue": 7, "unitCode": "DAY" } } } },
          "image": p.img.startsWith('http') ? p.img : `https://topmusiciangear.com/${p.img}`,
          "positiveNotes": pn,
          "negativeNotes": cn
        }
      };
      if (agg) listItem.item.aggregateRating = agg;
      if (reviewEnts.length) listItem.item.review = reviewEnts;
      items.push(listItem);
      var pSchema = {
        "@type": "Product",
        "name": title,
        "brand": { "@type": "Brand", "name": p.brand || "" },
        "offers": { "@type": "Offer", "price": p.price, "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
        "image": p.img.startsWith('http') ? p.img : `https://topmusiciangear.com/${p.img}`,
        "positiveNotes": pn,
        "negativeNotes": cn
      };
      if (agg) pSchema.aggregateRating = agg;
      if (reviewEnts.length) pSchema.review = reviewEnts;
      productSchemas.push(pSchema);
    }
  });

  function guideFaqs(guide) {
    if (guide.faq) return guide.faq;
    if (guide.featuredSnippet && guide.featuredSnippet.faq_q1_en) {
      return [1,2,3,4,5,6,7,8].map(function(i) {
        return { q: guide.featuredSnippet['faq_q' + i + '_en'], q_es: guide.featuredSnippet['faq_q' + i + '_es'], a: guide.featuredSnippet['faq_a' + i + '_en'], a_es: guide.featuredSnippet['faq_a' + i + '_es'] };
      }).filter(function(f) { return f.q; });
    }
    if (guide.faq_q1) {
      return [1,2,3,4,5,6,7,8].map(function(i) {
        return { q: guide['faq_q' + i], q_es: guide['faq_q' + i + '_es'], a: guide['faq_a' + i], a_es: guide['faq_a' + i + '_es'] };
      }).filter(function(f) { return f.q; });
    }
    return faqBase[guide.category] || faqBase.interfaces;
  }
  function genFaq(g, es) {
    var faqs = guideFaqs(g);
    return { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(function(f) {
      return { "@type": "Question", "name": es && f.q_es ? f.q_es : f.q, "acceptedAnswer": { "@type": "Answer", "text": es && f.a_es ? f.a_es : f.a } };
    })};
  }
  return ko`<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#0d0d0d">
  <link rel="preload" as="font" href="/fonts/Inter.woff2" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Yellowtail&family=Quicksand:wght@700&family=Poppins:ital,wght@1,800&family=Open+Sans+Condensed:wght@700&family=Kaushan+Script&display=swap">
  <style>@media(hover:hover){.shop-btn-primary:hover{transform:scale(1.05)}.shop-btn-more:hover{transform:scale(1.05)}.shop-more-list a:hover{transform:scale(1.05);background:#34383d;box-shadow:0 4px 16px rgba(0,0,0,.5)}}</style>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <title>${title} | TopMusicianGear</title>
  <meta name="description" content="${guideDesc(guide, intro, isEs).replace(/"/g, '&quot;')}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="x-default" href="${alternateEn}">
  <link rel="alternate" hreflang="en" href="${alternateEn}">
  <link rel="alternate" hreflang="es" href="${alternateEs}">
${ogMeta}
  <style>${criticalCss()}</style><script>/*tmgLangScrollEarly*/(function(){try{var y=parseInt(sessionStorage.getItem('tmgLangScroll')||'-1',10);if(y>=0){document.documentElement.style.visibility='hidden';history.scrollRestoration='manual';}}catch(e){}})();</script>
  <link rel="preload" as="style" href="/css/style.min.css?v=${cacheVerCss}" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/css/style.min.css?v=${cacheVerCss}"></noscript>
  <link rel="icon" type="image/svg+xml" sizes="48x48" href="/img/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon.png?v=2">
  <link rel="apple-touch-icon" href="/img/favicon.png?v=2">
  ${jsonLdScript(ldArticle)}
  ${items.length ? jsonLdScript({ "@context": "https://schema.org", "@type": "ItemList", "itemListElement": items }) : ''}
  ${productSchemas.length ? jsonLdScript({ "@context": "https://schema.org", "@graph": productSchemas }) : ''}
  ${jsonLdScript({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://topmusiciangear.com/" },
    { "@type": "ListItem", "position": 2, "name": title, "item": canonical }
  ]})}
  ${jsonLdScript(genFaq(guide, isEs))}
  ${guide.steps && guide.steps.length ? jsonLdScript({ "@context": "https://schema.org", "@type": "HowTo", "name": title, "description": guideDesc(guide, intro, isEs), "step": guide.steps.map(function(s, i) { return { "@type": "HowToStep", "position": i + 1, "name": isEs && s.name_es ? s.name_es : s.name, "text": isEs && s.text_es ? s.text_es : s.text, "url": s.url || canonical }; }) }) : ''}
  ${jsonLdScript({ "@context": "https://schema.org", "@type": "Person", "name": "Daniel Carnago", "givenName": "Daniel", "familyName": "Carnago", "alternateName": "Cuban3Beats", "jobTitle": "Professional Musician & Audio Engineer", "description": "Touring musician with 20+ years of experience on world stages including Glastonbury, Broadway, and Abbey Road.", "url": "https://topmusiciangear.com/about.html", "sameAs": ["https://www.youtube.com/@Cuban3Beats","https://open.spotify.com/artist/3HMtcts1AYCzkI4pBQKRzX","https://www.tiktok.com/@cuban3beats","https://www.facebook.com/Cuban3Beats/","https://www.instagram.com/cuban3beats","https://x.com/Cuban3Beats"], "knowsAbout": ["Audio Engineering","Music Production","Live Sound","Studio Recording","Music Gear"] })}
<script>(function(){try{history.scrollRestoration='manual'}catch(e){}var a=localStorage.getItem('tmg_v');var u='https://api.github.com/repos/topmusiciangear/topmusiciangear.github.io/contents/version.txt?ref=main&v='+Date.now();function gv(){return fetch(u,{headers:{Accept:'application/vnd.github.v3.raw'}}).then(function(r){if(r.ok)return r;return fetch('/version.txt?t='+Date.now())})}gv().then(function(r){return r.text()}).then(function(b){b=b.trim();if(a===b)return;localStorage.setItem('tmg_v',b);var s=location.search.replace(/[?&]_v=[^&]*/,'');location.replace(location.pathname+s+(s?'&':'?')+'_v='+b)}).catch(function(){})})();!function(){var s=location.search.indexOf('_v=');if(s>-1&&history.replaceState)history.replaceState({},'',location.pathname+location.search.replace(/[?&]_v=[^&]*/,'')+location.hash)}()</script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{'analytics_storage':'denied','ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','functionality_storage':'granted','security_storage':'granted'});gtag('js',new Date());gtag('config','G-0752B4SE9L',{anonymize_ip:true})</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-0752B4SE9L"></script>
</head>
<body style="margin:0;padding:0;">
  <a href="#mainContent" class="skip-link">Skip to main content</a>
  <div class="bg-hero"></div>

  <header style="margin-top:0;padding-top:0;">
    <div class="header-inner">
      <div class="header-left">
        <a href="/" class="logo">
          <span class="logo-icon"><img src="/img/favicon.png?v=2" alt="TMG" style="width:36px;height:36px;border-radius:8px"></span>
          <div class="logo-text">
            <span>Top</span>MusicianGear
          </div>
        </a>
        <nav aria-label="Main navigation">
          <a href="/#guides" class="nav-link">${isEs ? 'Guías' : 'Guides'}</a>
          <a href="/deals.html" class="nav-link">${isEs ? 'Ofertas' : 'Deals'}</a>
          ${navDropdown(isEs)}
        </nav>
      </div>
      <div class="audio-mini" id="audioMini">
        <div class="audio-mini-inner">
          <span class="audio-mini-player"><audio controls preload="none"><source src="/audio/solo-tres.mp3" type="audio/mpeg"></audio></span>
          <span class="audio-eq"><i></i><i></i><i></i><i></i></span>
          <span class="audio-mini-label">${isEs ? 'Tres Cubano, Bajo y Guitarra - tocados y grabados con mi equipo personal' : 'Cuban Tres, Bass & Guitar - played and recorded with my personal gear'}</span>
        </div>
      </div>
      <div class="header-right">
        <div style="display:flex;flex-direction:column;align-items:center;gap:2px">
        <div class="header-social">
          <a href="https://www.youtube.com/@Cuban3Beats" target="_blank" rel="noopener noreferrer" class="header-social-link" title="YouTube">${icon('youtube', 'fa-brands')}</a>
          <a href="https://open.spotify.com/artist/3HMtcts1AYCzkI4pBQKRzX" target="_blank" rel="noopener noreferrer" class="header-social-link" title="Spotify">${icon('spotify', 'fa-brands')}</a>
          <a href="https://www.tiktok.com/@cuban3beats" target="_blank" rel="noopener noreferrer" class="header-social-link" title="TikTok">${icon('tiktok', 'fa-brands')}</a>
          <a href="https://www.facebook.com/Cuban3Beats/" target="_blank" rel="noopener noreferrer" class="header-social-link" title="Facebook">${icon('facebook-f', 'fa-brands')}</a>
          <a href="https://www.instagram.com/cuban3beats" target="_blank" rel="noopener noreferrer" class="header-social-link" title="Instagram">${icon('instagram', 'fa-brands')}</a>
          <a href="https://x.com/Cuban3Beats" target="_blank" rel="noopener noreferrer" class="header-social-link" title="X">${icon('x-twitter', 'fa-brands')}</a>
          <a href="https://soundbetter.com/profiles/721440-daniel-carnago" target="_blank" rel="noopener noreferrer" class="header-social-link" title="SoundBetter"><img src="https://d2p6ecj15pyavq.cloudfront.net/assets/SoundBetterBadge-c84cb3e75c4267f5bee41f7f617a81d9.svg" alt="SoundBetter" class="sb-icon"></a>
          <a href="https://t.me/topmusiciangear" target="_blank" rel="noopener noreferrer" class="header-social-link" title="Telegram"><svg data-fa="telegram" aria-hidden="true" class="icon fa-brands fa-telegram" viewBox="0 0 496 512" width="1em" height="1em" fill="currentColor"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zM362 176l-34 164c-3 13-10 16-20 10l-55-41-27 26c-3 3-5 6-10 6l5-54 98-89c4-4-1-6-6-3l-121 74-52-18c-11-4-11-11 2-16l204-79c9-3 17 2 14 16z"/></svg></a>
          <a href="https://www.fiverr.com/s/yvzbmLz" target="_blank" rel="noopener noreferrer" class="header-social-link" title="Fiverr"><img src="../img/fiverr-icon.svg?v=3" alt="Fiverr" class="fiverr-icon"></a>
        </div>
        <a href="https://open.spotify.com/artist/3HMtcts1AYCzkI4pBQKRzX?si=hD1MDwuuQiKwP0fSCiD07w" target="_blank" rel="noopener" class="cuban3-link" style="color:var(--text-muted);font-size:11px;font-weight:600;margin-top:2px;text-decoration:none;font-family:inherit;padding:0"><span style="color:var(--accent)">@</span>Cuban<span style="color:var(--white)">3</span>Beats</a>
        </div>
        <div class="nav-dd nav-dd-mobile">
          ${navDropdown(isEs)}
        </div>
        <div class="lang-switcher">
          <button class="lang-btn ${isEs ? '' : 'active'}" title="English" onclick="try{sessionStorage.setItem('tmgLangScroll',String(window.scrollY))}catch(e){};location.href='${isEs ? `/guides/${guide.id}.html` : '#'}'"><img class="lang-flag" src="../img/flag-en.svg" alt="EN" width="20" height="15"></button>
          <button class="lang-btn ${isEs ? 'active' : ''}" title="Español" onclick="try{sessionStorage.setItem('tmgLangScroll',String(window.scrollY))}catch(e){};location.href='${isEs ? '#' : `/guides/${guide.id}_es.html`}'"><img class="lang-flag" src="../img/flag-es.svg" alt="ES" width="20" height="15"></button>
        </div>
        <button class="hamburger" id="hamburger" aria-label="Menu" onclick="document.getElementById('mobileNav').classList.toggle('open')">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <div class="mobile-nav" id="mobileNav">
    <a class="nav-link" href="/#guides">${isEs ? 'Guías' : 'Guides'}</a>
    ${navDropdown(isEs)}
  </div>

  <main id="mainContent">

    <div class="guide-detail">
      <nav class="guide-breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> / <a href="/#guides">${isEs ? 'Guías' : 'Guides'}</a> / <span>${title}</span>
      </nav>
      <div class="guide-back-row">
        <a href="/?cat=${guide.category}#guides" class="guide-back-btn">${icon('arrow-left', 'fa-solid')} ${isEs ? 'Volver a Guías' : 'Back to Guides'}</a>
      </div>
      <div class="guide-detail-header">
        <h1 class="guide-detail-title">${title}</h1>
      </div>
      <div class="guide-detail-img"><img src="${fullImage}" alt="${title}" class="lb-img" style="cursor:zoom-in"></div>
      <div class="guide-detail-intro"><p>${intro}</p></div>
      ${authorBoxHtml}
      ${guide.verdict ? `<div class="guide-verdict">
        <div class="verdict-label">${isEs ? 'Veredicto' : 'Verdict'}</div>
        <div class="verdict-text">${verdict}</div>
        ${guide.verdictProsCons ? (function(){ return '<div class="guide-verdict-grid">' + guide.verdictProsCons.map(function(p){ var n=isEs&&p.name_es?p.name_es:p.name; var ps=isEs&&p.pros_es?p.pros_es:p.pros; var cs=isEs&&p.cons_es?p.cons_es:p.cons; return '<div class="verdict-col"><div class="verdict-product-name">'+n+'</div>'+(guide.verdictSideBySide ? '<div class="verdict-pros-cons">' : '')+'<div class="verdict-list-group"><span class="verdict-list-label pros">Pros</span><ul class="verdict-pros-list">'+ps.map(function(i){return '<li>'+i+'</li>'}).join('')+'</ul></div><div class="verdict-list-group"><span class="verdict-list-label cons">'+(isEs?'Contras':'Cons')+'</span><ul class="verdict-cons-list">'+cs.map(function(i){return '<li>'+i+'</li>'}).join('')+'</ul></div>'+(guide.verdictSideBySide ? '</div>' : '')+'</div>' }).join('') + '</div>'; })() : ''}
      </div>` : ''}
      ${guide.comparison ? (function(){ var fs = guide.featuredSnippet || {}; var n1 = isEs ? (fs.name1_es || fs.name1_en || '') : (fs.name1_en || ''); var n2 = isEs ? (fs.name2_es || fs.name2_en || '') : (fs.name2_en || ''); var colMin = Math.max(n1.length, n2.length) + 2; return `<div class="guide-comp-wrap">
        <h2 class="guide-comp-title">${isEs ? '¿Cómo se Comparan?' : 'How Do They Compare?'}</h2>
        ${guideCompControls(isEs, 'guide-comp-controls-top')}
        <div class="guide-comp-scroll-wrap">
          <div class="guide-comp-scroll"><table class="guide-comp-table" style="--guide-col-min:${colMin}ch"><thead><tr><th></th><th>${n1}</th><th>${n2}</th></tr></thead>
            <tbody>${guide.comparison.rows.filter(r => (r.label || '').trim().toLowerCase() !== 'rating').map(r => `<tr><td class="label">${isEs ? r.label_es : r.label}</td><td class="val">${isEs && r.val1_es ? r.val1_es : r.val1}</td><td class="val">${isEs && r.val2_es ? r.val2_es : r.val2}</td></tr>`).join('')}</tbody>
          </table></div>
          ${guideCompControls(isEs)}
        </div>
      </div>`; })() : ''}
      ${guide.productTable ? (function(){
        var rows = guide.productTable.rows || [];
        var colMin = 0;
        var headers = guide.productTable.columns.map(function(col){
          var t = isEs && col.title_es ? col.title_es : col.title;
          if (t && t.length > colMin) colMin = t.length;
          return '<th>' + t + '</th>';
        }).join('');
        colMin += 2;
        var body = rows.map(function(r){
          return '<tr><td class="label">' + (isEs && r.label_es ? r.label_es : r.label) + '</td>' + r.values.map(function(v){
            return '<td class="val">' + (isEs && v.value_es ? v.value_es : v.value) + '</td>';
          }).join('') + '</tr>';
        }).join('');
        return '<div class="guide-comp-wrap"><h2 class="guide-comp-title">' + (isEs && guide.productTable.title_es ? guide.productTable.title_es : (guide.productTable.title || (isEs ? 'Comparativa de Productos' : 'Product Comparison'))) + '</h2>' + guideCompControls(isEs, 'guide-comp-controls-top') + '<div class="guide-comp-scroll-wrap"><div class="guide-comp-scroll"><table class="guide-comp-table" style="--guide-col-min:' + colMin + 'ch"><thead><tr><th></th>' + headers + '</tr></thead><tbody>' + body + '</tbody></table></div>' + guideCompControls(isEs) + '</div></div>';
      })() : ''}
      <div class="guide-detail-sections">${sectionsHtml}</div>
      <p class="guide-product-card-currency-note">${isEs ? '<strong>⚠️ Atención:</strong><span class="shop-note-body">Los precios pueden variar según tu geolocalización; el total final se confirma en tu moneda local al pagar. Cada tienda aplica su propia política de envío: algunas envían totalmente gratis, otras cobran un costo de envío y otras ofrecen envío gratuito a partir de un importe mínimo de compra. Además, algunas tiendas solo realizan envíos dentro de EE.&nbsp;UU.</span>' : '<strong>⚠️ Attention:</strong><span class="shop-note-body">Prices may vary depending on your location; your final total is confirmed in your local currency at checkout. Each store applies its own shipping policy: some offer completely free shipping, others charge a shipping fee, and others provide free shipping above a minimum order amount. Additionally, some stores only ship within the&nbsp;U.S.</span>'}</p>
      ${conclusion ? `<div class="guide-conclusion"><h2 class="guide-conclusion-title">${isEs ? 'Conclusión' : 'Conclusion'}</h2><div class="guide-conclusion-content">${conclusion}</div></div>` : ''}
      ${(function(){ var faqs = guideFaqs(guide); if (!faqs || !faqs.length) return ''; return '<div class="guide-faq"><h2 class="guide-faq-title">' + (isEs ? 'Preguntas Frecuentes' : 'Frequently Asked Questions') + '</h2><div class="guide-faq-list">' + faqs.map(function(f){ return '<div class="guide-faq-item"><button class="guide-faq-question" onclick="var a=this.nextElementSibling;if(a.dataset.open){a.style.maxHeight=\'0px\';a.dataset.open=\'\';this.classList.remove(\'open\');setTimeout(function(){if(!a.dataset.open){a.style.display=\'none\'}},300)}else{this.classList.add(\'open\');a.style.display=\'block\';void a.offsetHeight;a.style.maxHeight=a.firstElementChild.scrollHeight+\'px\';a.dataset.open=\'1\'}">' + (isEs && f.q_es ? f.q_es : f.q) + '<span class="guide-faq-icon">+</span></button><div class="guide-faq-answer" style="display:none;max-height:0;overflow:hidden"><div class="guide-faq-answer-inner">' + (isEs && f.a_es ? f.a_es : f.a) + '</div></div></div>'; }).join('') + '</div></div>'; })()}

      ${productCards ? `<div class="guide-products-grid"><h2 class="guide-products-title">${isEs ? '¿Qué Productos Hay en Esta Guía?' : 'What Products Are in This Guide?'}</h2><div class="guide-products-cards">${productCards}</div></div>` : ''}
      ${userReviewsSection(guide, isEs)}
      <script>setTimeout(function(){document.querySelectorAll('.guide-product-card-desc').forEach(function(e){var b=e.nextElementSibling;if(b&&b.classList.contains('guide-product-card-desc-toggle')&&e.scrollHeight<=e.clientHeight)b.remove()});document.querySelectorAll('.guide-comp-wrap').forEach(function(w){var s=w.querySelector('.guide-comp-scroll');if(!s)return;if(s.scrollWidth<=s.clientWidth+1){w.querySelectorAll('.guide-comp-controls').forEach(function(c){c.style.display='none'})}});document.querySelectorAll('.guide-comp-scroll').forEach(function(s){function upd(){var w=s.closest('.guide-comp-wrap');if(!w)return;var max=s.scrollWidth-s.clientWidth;var pct=max>0?(s.scrollLeft/max*100):0;w.querySelectorAll('.guide-comp-progress-bar').forEach(function(b){b.style.width=pct+'%'})}s.addEventListener('scroll',upd);upd()})},100)</script>
      <script>(function(){var d=document,h=d.documentElement,sb=h.style.scrollBehavior;h.style.scrollBehavior='auto';function getY(){try{return parseInt(sessionStorage.getItem('tmgLangScroll')||'-1',10)}catch(e){return -1}}var y=getY();if(y<0){h.style.scrollBehavior=sb;return;}var n=0;(function st(){var yy=getY();if(yy<0){h.style.scrollBehavior=sb;return;}window.scrollTo(0,yy);h.style.visibility='';n++;if(n>90){try{sessionStorage.removeItem('tmgLangScroll')}catch(e){}h.style.scrollBehavior=sb;return;}requestAnimationFrame(st)})()})();</script>
      <div class="guide-related">
        <h2 class="guide-related-title">${isEs ? 'Guías Relacionadas' : 'Related Guides'}</h2>
        <div class="guide-related-list">
          ${(function(){ var r; if (guide.relatedGuides) { r = guide.relatedGuides.map(function(id) { return guides.find(function(g) { return g.id === id; }); }).filter(Boolean); } if (!r || !r.length) { r = guides.filter(function(g) { return g.id !== guide.id && g.category === guide.category; }); if (!r.length) r = guides.filter(function(g) { return g.id !== guide.id; }); } return r.slice(0, 6).map(function(g) { var gt = isEs && g.title_es ? g.title_es : g.title; return '<a href="/guides/' + g.id + (isEs ? '_es' : '') + '.html" class="guide-related-link">' + gt + '</a>'; }).join(''); })()}
        </div>
      </div>
      <div class="guide-back-row">
        <a href="/?cat=${guide.category}#guides" class="guide-back-btn">${icon('arrow-left', 'fa-solid')} ${isEs ? 'Volver a Guías' : 'Back to Guides'}</a>
      </div>
    </div>



    <div class="mobile-social" id="mobileSocial">
      <a href="https://www.youtube.com/@Cuban3Beats" target="_blank" rel="noopener noreferrer" class="header-social-link" title="YouTube">${icon('youtube', 'fa-brands')}</a>
      <a href="https://open.spotify.com/artist/3HMtcts1AYCzkI4pBQKRzX" target="_blank" rel="noopener noreferrer" class="header-social-link" title="Spotify">${icon('spotify', 'fa-brands')}</a>
      <a href="https://www.tiktok.com/@cuban3beats" target="_blank" rel="noopener noreferrer" class="header-social-link" title="TikTok">${icon('tiktok', 'fa-brands')}</a>
      <a href="https://www.facebook.com/Cuban3Beats/" target="_blank" rel="noopener noreferrer" class="header-social-link" title="Facebook">${icon('facebook-f', 'fa-brands')}</a>
      <a href="https://www.instagram.com/cuban3beats" target="_blank" rel="noopener noreferrer" class="header-social-link" title="Instagram">${icon('instagram', 'fa-brands')}</a>
      <a href="https://x.com/Cuban3Beats" target="_blank" rel="noopener noreferrer" class="header-social-link" title="X">${icon('x-twitter', 'fa-brands')}</a>
      <a href="https://soundbetter.com/profiles/721440-daniel-carnago" target="_blank" rel="noopener noreferrer" class="header-social-link" title="SoundBetter"><img src="https://d2p6ecj15pyavq.cloudfront.net/assets/SoundBetterBadge-c84cb3e75c4267f5bee41f7f617a81d9.svg" alt="SoundBetter" class="sb-icon"></a>
      <a href="https://t.me/topmusiciangear" target="_blank" rel="noopener noreferrer" class="header-social-link" title="Telegram">${icon('telegram', 'fa-brands')}</a>
      <a href="https://www.fiverr.com/s/yvzbmLz" target="_blank" rel="noopener noreferrer" class="header-social-link" title="Fiverr"><img src="../img/fiverr-icon.svg?v=3" alt="Fiverr" class="fiverr-icon"></a>
    </div>
    <div class="audio-mini-mobile" id="audioMiniMobile">
      <div class="audio-mini-inner">
        <span class="audio-mini-player"><audio controls preload="none"><source src="/audio/solo-tres.mp3" type="audio/mpeg"></audio></span>
        <span class="audio-eq"><i></i><i></i><i></i><i></i></span>
        <span class="audio-mini-label">${isEs ? 'Tres Cubano, Bajo y Guitarra - tocados y grabados con mi equipo personal' : 'Cuban Tres, Bass & Guitar - played and recorded with my personal gear'}</span>
      </div>
    </div>
  </main>

  <footer>
    <div class="footer-grid">
      <div class="footer-col">
        <h3>TopMusicianGear</h3>
        <ul>
          <li><a href="/">${isEs ? 'Inicio' : 'Home'}</a></li>
          <li><a href="/#about">${isEs ? 'Sobre Mí' : 'About Me'}</a></li>
          <li><a href="/contact.html"><svg data-fa="envelope" style="margin-right:4px;color:var(--accent)" class="icon fa-solid fa-envelope" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg> ${isEs ? 'Contáctanos' : 'Contact Us'}</a></li>
          <li><a href="/deals.html">${isEs ? 'Ofertas de Hoy' : "Today's Deals"}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>${isEs ? 'Categorías Principales' : 'Top Categories'}</h3>
        <ul>
          <li><a href="/?cat=microphones#guides">${isEs ? 'Micrófonos' : 'Microphones'}</a></li>
          <li><a href="/?cat=guitars#guides">${isEs ? 'Guitarras' : 'Guitars'}</a></li>
          <li><a href="/?cat=interfaces#guides">${isEs ? 'Interfaces' : 'Interfaces'}</a></li>
          <li><a href="/?cat=headphones#guides">${isEs ? 'Auriculares' : 'Headphones'}</a></li>
          <li><a href="/?cat=monitors#guides">${isEs ? 'Monitores' : 'Monitors'}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>${isEs ? 'Legal' : 'Legal'}</h3>
        <ul>
          <li><a href="/privacy-policy.html">${isEs ? 'Política de Privacidad' : 'Privacy Policy'}</a></li>
          <li><a href="/terms.html">${isEs ? 'Términos de Servicio' : 'Terms of Service'}</a></li>
          <li><a href="/cookie-policy.html">${isEs ? 'Política de Cookies' : 'Cookie Policy'}</a></li>
          <li><a href="#cookie-settings" onclick="event.preventDefault();cookiePrefs()" style="cursor:pointer">${isEs ? 'Configuración de Cookies' : 'Cookie Settings'}</a></li>
          <li><a href="/affiliate-disclosure.html">${isEs ? 'Divulgación de Afiliados' : 'Affiliate Disclosure'}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <button class="back-to-top" onclick="window.scrollTo({top:0,behavior:'smooth'})"><svg data-fa="arrow-up" class="icon fa-solid fa-arrow-up" viewBox="0 0 384 512" width="1em" height="1em" fill="currentColor"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg> ${isEs ? 'Volver arriba' : 'Back to top'}</button>
      <p style="margin-top:8px;"><strong>TopMusicianGear</strong> ${isEs ? 'participa en programas de afiliados incluyendo Plugin Boutique, Gear4Music, Amazon, Reverb, Andertons, zZounds, y Music Store. Como afiliado, ganamos comisiones por compras realizadas sin costo adicional para ti.' : 'is a participant in affiliate programs including Plugin Boutique, Gear4Music, Amazon, Reverb, Andertons, zZounds, and Music Store. As an affiliate, we earn from qualifying purchases at no additional cost to you.'} <a href="#" onclick="showAffiliateDisclosure();return false" style="color:var(--accent);text-decoration:underline">${isEs ? 'Más info' : 'More info'}</a></p>
      <p style="margin-top:8px;">&copy; ${new Date().getFullYear()} TopMusicianGear. All rights reserved. ${isEs ? 'Hecho por un músico, para músicos.' : 'Built by a musician, for musicians.'}</p>
    </div>
  </footer>

  <!-- Affiliate Disclosure Modal -->
  <div id="affiliate-modal" style="display:none;position:fixed!important;inset:0!important;z-index:2147483647!important;align-items:center;justify-content:center;padding:24px;background:rgba(0,0,0,.8);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)">
    <div style="background:var(--card-bg);border:1px solid var(--border);border-radius:12px;padding:32px;max-width:600px;width:100%;max-height:80vh;overflow-y:auto;position:relative;color:var(--text)">
      <button onclick="hideAffiliateDisclosure()" style="position:absolute;top:16px;right:16px;background:none;border:none;color:var(--text);font-size:24px;cursor:pointer;line-height:1;padding:4px 8px;opacity:.5">&times;</button>
      <h3 style="font-size:20px;font-weight:700;margin:0 0 16px;padding-right:30px">${isEs ? 'Divulgación de Afiliados' : 'Affiliate Disclosure'}</h3>
      <p style="font-size:14px;line-height:1.7;color:var(--text-secondary)">${isEs ? 'TopMusicianGear participa en programas de marketing de afiliados diseñados para proporcionar un medio para que los sitios ganen tarifas publicitarias mediante publicidad y enlaces a minoristas asociados, incluidos Plugin Boutique, Gear4Music, Amazon, Reverb, Andertons, zZounds, y Music Store. Cuando haces clic en un enlace de producto en este sitio y realizas una compra, podemos ganar una pequeña comisión sin costo adicional para ti. Esto ayuda a mantener el sitio y nos permite seguir creando reseñas y recomendaciones honestas. Todas las opiniones expresadas en este sitio son nuestras. Solo recomendamos productos en los que creemos genuinamente y que hemos usado personalmente o investigado a fondo.' : 'TopMusicianGear is a participant in affiliate marketing programs designed to provide a means for sites to earn advertising fees by advertising and linking to partner retailers including Plugin Boutique, Gear4Music, Amazon, Reverb, Andertons, zZounds, and Music Store. When you click on a product link on this site and make a purchase, we may earn a small commission at no additional cost to you. This helps support the site and allows us to continue creating honest reviews and recommendations. All opinions expressed on this site are our own. We only recommend products we genuinely believe in and have personally used or thoroughly researched.'}</p>
      <button onclick="hideAffiliateDisclosure()" style="margin-top:20px;padding:10px 28px;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:14px;background:var(--accent);color:#fff">${isEs ? 'Entendido' : 'Got it'}</button>
    </div>
  </div>

  <!-- Cookie Consent Banner -->
<div id="cookie-banner" style="position:fixed!important;bottom:0!important;left:0!important;right:0!important;background:#1a1a2e;color:#f0f0f0;padding:12px 18px;z-index:2147483647!important;flex-wrap:wrap;align-items:center;gap:8px;border-top:2px solid #3b82f6;font-size:12px;line-height:1.5;box-shadow:0 -4px 20px rgba(0,0,0,.5);font-family:sans-serif;transform:translateY(100%);transition:transform .3s ease">
  <p style="margin:0;flex:1;min-width:180px;font-size:11px"><span class="cookie-lang-en">We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience, personalise content, and analyse website traffic. For these reasons, we may share your site usage data with our social media and analytics partners. By clicking <strong>Accept</strong>, you agree to our website&#39;s cookie use as described in our <a href="/cookie-policy.html" style="color:#60a5fa;text-decoration:underline">Cookie Policy</a>. You can change your cookie settings at any time by clicking <strong>Preferences</strong>.</span><span class="cookie-lang-es">Usamos cookies esenciales para que nuestro sitio funcione. Con tu consentimiento, tambi&eacute;n podemos usar cookies no esenciales para mejorar la experiencia, personalizar contenido y analizar el tr&aacute;fico. Por estas razones, podemos compartir tus datos de uso con nuestros socios de an&aacute;lisis. Al hacer clic en <strong>Aceptar</strong>, aceptas el uso de cookies como se describe en nuestra <a href="/cookie-policy.html" style="color:#60a5fa;text-decoration:underline">Pol&iacute;tica de Cookies</a>. Puedes cambiar tu configuraci&oacute;n en cualquier momento haciendo clic en <strong>Preferencias</strong>.</span></p>
  <div style="display:flex;gap:6px;flex-shrink:0;flex-wrap:wrap">
    <button id="cb-prefs" style="padding:8px 18px;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:12px;white-space:nowrap;background:#444;color:#f0f0f0"><span class="cookie-lang-en">Preferences</span><span class="cookie-lang-es">Preferencias</span></button>
    <button id="cb-accept" style="padding:8px 18px;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:12px;white-space:nowrap;background:#2563eb;color:#fff"><span class="cookie-lang-en">Accept</span><span class="cookie-lang-es">Aceptar</span></button>
  </div>
</div>

<!-- Cookie Preferences Modal -->
<div id="cookie-modal" style="display:none;position:fixed!important;inset:0!important;z-index:2147483647!important;background:rgba(0,0,0,.85);align-items:center;justify-content:center;font-family:'Inter',sans-serif;transform:none!important">
  <div style="background:#1e1e2e;border:1px solid #333;border-radius:12px;padding:28px;max-width:500px;width:90%;max-height:80vh;overflow-y:auto;color:#f0f0f0;position:relative">
    <button id="cm-close" style="position:absolute;top:16px;right:16px;background:none;border:none;color:#aaa;font-size:20px;cursor:pointer;line-height:1;padding:4px 8px">&times;</button>
    <h3 style="font-size:18px;font-weight:700;margin:0 0 16px;color:#fff;padding-right:30px"><span class="cookie-lang-en">Cookie Preferences</span><span class="cookie-lang-es">Preferencias de Cookies</span></h3>
    <p style="font-size:13px;color:#aaa;margin-bottom:16px;line-height:1.6"><span class="cookie-lang-en">We use different types of cookies to optimise your experience. Click on the categories below to learn more about their purposes. You may choose which types of cookies to allow and can change your preferences at any time. Remember that disabling cookies may affect your experience. You can learn more by visiting our <a href="/cookie-policy.html" style="color:#60a5fa">Cookie Policy</a>.</span><span class="cookie-lang-es">Usamos diferentes tipos de cookies para optimizar tu experiencia. Haz clic en las categor&iacute;as para conocer sus prop&oacute;sitos. Puedes elegir qu&eacute; tipos de cookies permitir y cambiar tus preferencias en cualquier momento. Recuerda que deshabilitar cookies puede afectar tu experiencia. Puedes obtener m&aacute;s informaci&oacute;n visitando nuestra <a href="/cookie-policy.html" style="color:#60a5fa">Pol&iacute;tica de Cookies</a>.</span></p>
    <div style="padding:14px 0;border-bottom:1px solid #2a2a3e">
      <div style="display:flex;align-items:flex-start;gap:10px">
        <input type="checkbox" checked disabled style="margin-top:2px;accent-color:#3b82f6;width:18px;height:18px;flex-shrink:0">
        <div style="flex:1">
          <strong style="font-size:14px;color:#fff"><span class="cookie-lang-en">Essential</span><span class="cookie-lang-es">Esenciales</span></strong>
          <p style="font-size:12px;color:#aaa;margin:3px 0 0"><span class="cookie-lang-en">These cookies are necessary for the core functionality of our website and some of its features, such as access to secure areas.</span><span class="cookie-lang-es">Estas cookies son necesarias para la funcionalidad principal de nuestro sitio web y algunas de sus caracter&iacute;sticas, como el acceso a &aacute;reas seguras.</span></p>
        </div>
      </div>
    </div>
    <div style="padding:14px 0;border-bottom:1px solid #2a2a3e">
      <div style="display:flex;align-items:flex-start;gap:10px">
        <input type="checkbox" id="cm-analytics" checked aria-label="Enable analytics cookies" style="margin-top:2px;accent-color:#3b82f6;width:18px;height:18px;flex-shrink:0">
        <div style="flex:1">
          <strong style="font-size:14px;color:#fff"><span class="cookie-lang-en">Analytics</span><span class="cookie-lang-es">Anal&iacute;ticas</span></strong>
          <p style="font-size:12px;color:#aaa;margin:3px 0 0"><span class="cookie-lang-en">These cookies collect information that can help us understand how our websites are being used. This information can also be used to measure effectiveness in our marketing campaigns or to curate a personalised site experience for you.</span><span class="cookie-lang-es">Estas cookies recopilan informaci&oacute;n que nos ayuda a entender c&oacute;mo se utilizan nuestros sitios web. Tambi&eacute;n pueden usarse para medir la efectividad de nuestras campa&ntilde;as o para ofrecer una experiencia personalizada.</span></p>
        </div>
      </div>
    </div>
    
    <div style="padding:14px 0">
      <div style="display:flex;align-items:flex-start;gap:10px">
        <input type="checkbox" id="cm-affiliate" checked aria-label="Enable affiliate tracking cookies" style="margin-top:2px;accent-color:#3b82f6;width:18px;height:18px;flex-shrink:0">
        <div style="flex:1">
          <strong style="font-size:14px;color:#fff"><span class="cookie-lang-en">Affiliate Tracking</span><span class="cookie-lang-es">Seguimiento de Afiliados</span></strong>
          <p style="font-size:12px;color:#aaa;margin:3px 0 0"><span class="cookie-lang-en">These cookies track referrals to partner retailers so we may earn commissions on qualifying purchases.</span><span class="cookie-lang-es">Estas cookies rastrean referencias a tiendas asociadas para que podamos ganar comisiones en compras.</span></p>
        </div>
      </div>
    </div>
    <div style="display:flex;gap:10px;margin-top:20px;justify-content:space-between;flex-wrap:wrap">
      <button id="cm-decline" style="padding:10px 22px;border:1px solid #555;border-radius:6px;cursor:pointer;font-weight:600;font-size:13px;background:transparent;color:#f0f0f0;white-space:nowrap"><span class="cookie-lang-en">Decline All</span><span class="cookie-lang-es">Rechazar Todas</span></button>
      <button id="cm-allow" style="padding:10px 22px;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:13px;background:#3b82f6;color:#fff;white-space:nowrap"><span class="cookie-lang-en">Allow All</span><span class="cookie-lang-es">Permitir Todas</span></button>
    </div>
  </div>
</div>

  <script defer src="/js/translations.js?v=8"></script>
  <script defer src="/js/constants.js?v=${cacheVerConstants}"></script>
  <script defer src="/js/app.js?v=${cacheVerJs}${dataVer}"></script>
<script>(function(){var b=document.getElementById('cookie-banner');if(!b)return;var m=document.getElementById('cookie-modal');var c=null;var Y=31536000000;if(window.location.search.indexOf('reset-cookies')>-1)try{localStorage.removeItem('cookiePrefs')}catch(e){}try{c=JSON.parse(localStorage.getItem('cookiePrefs')||'null')}catch(e){}if(c&&c._ts&&Date.now()-c._ts>Y)c=null;var h=document.documentElement;var pg=h.getAttribute('lang');if(pg==='en'||pg==='es'){h.classList.add('lang-'+pg);document.querySelectorAll('.cookie-lang-en').forEach(function(e){e.style.removeProperty('display')});document.querySelectorAll('.cookie-lang-es').forEach(function(e){e.style.removeProperty('display')});if(pg==='es'){document.querySelectorAll('.cookie-lang-en').forEach(function(e){e.style.setProperty('display','none','important')})}else{document.querySelectorAll('.cookie-lang-es').forEach(function(e){e.style.setProperty('display','none','important')})}}if(!c){b.classList.add('cookie-visible')}else{b.classList.remove('cookie-visible');gtag('consent','update',{'analytics_storage':c.analytics?'granted':'denied'});if(c.affiliate)loadAffiliate()}function loadAffiliate(){if(!document.getElementById('impact-script')){var s=document.createElement('script');s.src='https://utt.impactcdn.com/P-A7292297-bda5-4465-a26a-2017d1cc16b51.js';s.id='impact-script';s.async=true;document.body.appendChild(s);window.impactStat=function(){}}}
window.cookieAccept=function(){try{var p={essential:true,analytics:true,affiliate:true,_ts:Date.now()};localStorage.setItem('cookiePrefs',JSON.stringify(p))}catch(e){}gtag('consent','update',{'analytics_storage':'granted'});if(b)b.style.display='none';if(m)m.style.display='none';if(p.affiliate)loadAffiliate()}
window.cookieDecline=function(){try{var p={essential:true,analytics:false,affiliate:false,_ts:Date.now()};localStorage.setItem('cookiePrefs',JSON.stringify(p))}catch(e){}gtag('consent','update',{'analytics_storage':'denied'});if(b)b.style.display='none';if(m)m.style.display='none'}
window.cookiePrefs=function(){if(m)m.style.display='flex';try{var s=JSON.parse(localStorage.getItem('cookiePrefs')||'null')||{essential:true,analytics:true,affiliate:true};var ca=document.getElementById('cm-analytics');if(ca)ca.checked=s.analytics;var ca3=document.getElementById('cm-affiliate');if(ca3)ca3.checked=s.affiliate}catch(e){}}
window.cookieSave=function(){try{var p={essential:true,analytics:document.getElementById('cm-analytics')?.checked??false,affiliate:document.getElementById('cm-affiliate')?.checked??false,_ts:Date.now()};localStorage.setItem('cookiePrefs',JSON.stringify(p))}catch(e){}gtag('consent','update',{'analytics_storage':p.analytics?'granted':'denied'});if(b)b.style.display='none';if(m)m.style.display='none';if(p.affiliate)loadAffiliate()};document.getElementById('cb-accept')?.addEventListener('click',window.cookieAccept);document.getElementById('cb-prefs')?.addEventListener('click',window.cookiePrefs);document.getElementById('cm-close')?.addEventListener('click',function(){if(m)m.style.display='none'});document.getElementById('cm-decline')?.addEventListener('click',window.cookieDecline);document.getElementById('cm-allow')?.addEventListener('click',window.cookieAccept);})();
window.showAffiliateDisclosure=function(){var d=document.getElementById('affiliate-modal');if(d)d.style.display='flex'};
window.hideAffiliateDisclosure=function(){var d=document.getElementById('affiliate-modal');if(d)d.style.display='none'};
</script>
<script src="https://www.anrdoezrs.net/am/101857888/include/allCj/impressions/page/am.js"></script>
</body>
</html>`;
}

function ko(strings, ...values) {
  return strings.reduce((acc, s, i) => acc + s + (values[i] || ''), '');
}

// ===== GENERATE =====
const outDir = path.join(dir, 'guides');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

guides.forEach((guide, idx) => {
  ['en', 'es'].forEach(lang => {
    const html = buildGuidePage(guide, lang, idx);
    const filename = lang === 'es' ? `${guide.id}_es.html` : `${guide.id}.html`;
    fs.writeFileSync(path.join(outDir, filename), html, 'utf8');
    console.log(`Generated: guides/${filename}`);
  });
});

// ===== GENERATE SITEMAP =====
function buildSitemap() {
  const site = 'https://topmusiciangear.com';
  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/about.html', priority: '0.7', changefreq: 'monthly' },
    { loc: '/contact.html', priority: '0.5', changefreq: 'monthly' },
    { loc: '/affiliate-disclosure.html', priority: '0.4', changefreq: 'monthly' },
    { loc: '/cookie-policy.html', priority: '0.4', changefreq: 'monthly' },
    { loc: '/terms.html', priority: '0.4', changefreq: 'monthly' },
    { loc: '/privacy-policy.html', priority: '0.4', changefreq: 'monthly' },
    { loc: '/404.html', priority: '0.1', changefreq: 'monthly' },
  ];
  var urls = staticPages.map(p => `<url><lastmod>${today}</lastmod><loc>${site}${p.loc}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`);
  guides.forEach((guide, idx) => {
    var d = guideDates(guide, idx).modified;
    ['', '_es'].forEach(sfx => {
      urls.push(`<url><lastmod>${d}</lastmod><loc>${site}/guides/${guide.id}${sfx}.html</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
    });
  });
  var xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.join('\n') + '\n</urlset>';
  fs.writeFileSync(path.join(dir, 'sitemap.xml'), xml, 'utf8');
  console.log('Generated: sitemap.xml (' + (urls.length) + ' URLs)');
}
buildSitemap();

// ===== UPDATE CACHE BUSTERS & INJECT CRAWLABLE GUIDE LINKS INTO INDEX.HTML =====
(function updateIndexHtml() {
  var indexFile = path.join(dir, 'index.html');
  var html = fs.readFileSync(indexFile, 'utf8');
  // Update CSS cache buster
  html = html.replace(/(css\/style\.min\.css\?v=)[a-zA-Z0-9]+/g, '$1' + cacheVerCss);
  // Update JS cache buster (min.js first to avoid partial match by app.js regex)
  // Append dataVer so JS cache busters change when guides.json data changes
  var jsVer = cacheVerJsMin + dataVer;
  html = html.replace(/(js\/app\.min\.js\?v=)[a-zA-Z0-9]+/g, '$1' + jsVer);
  html = html.replace(/(js\/app\.js\?v=)[a-zA-Z0-9]+/g, '$1' + cacheVerJs + dataVer);
  // Sync inline version check: use fetch-based check against version.txt (cache-busted)
  // so stale cached index.html still detects version changes and auto-reloads.
  var verCheck = "<script>(function(){try{history.scrollRestoration='manual'}catch(e){}var a=localStorage.getItem('tmg_v');var u='https://api.github.com/repos/topmusiciangear/topmusiciangear.github.io/contents/version.txt?ref=main&v='+Date.now();function gv(){return fetch(u,{headers:{Accept:'application/vnd.github.v3.raw'}}).then(function(r){if(r.ok)return r;return fetch('/version.txt?t='+Date.now())})}gv().then(function(r){return r.text()}).then(function(b){b=b.trim();if(a===b)return;localStorage.setItem('tmg_v',b);var s=location.search.replace(/[?&]_v=[^&]*/,'');location.replace(location.pathname+s+(s?'&':'?')+'_v='+b)}).catch(function(){})})();!function(){var s=location.search.indexOf('_v=');if(s>-1&&history.replaceState)history.replaceState({},'',location.pathname+location.search.replace(/[?&]_v=[^&]*/,'')+location.hash)}()</script>";
  html = html.replace(/<script>\(function\(\)\{try\{history\.scrollRestoration='manual'\}[\s\S]*?<\/script>/, verCheck);
  // Fallback: if pattern above did not match, replace the version literal only
  html = html.replace(/var v="[a-zA-Z0-9]+"/, 'var v="' + jsVer + '"');
  var links = guides.map(function(g) {
    var enUrl = '/guides/' + g.id + '.html';
    var esUrl = '/guides/' + g.id + '_es.html';
    var title = Y(g.title);
    var titleEs = Y(g.title_es || g.title);
    return '<a href="' + enUrl + '" hreflang="en">' + title.replace(/"/g, '&quot;') + '</a>\n<a href="' + esUrl + '" hreflang="es">' + titleEs.replace(/"/g, '&quot;') + '</a>';
  }).join('\n');
  // Always write index.html (cache busters may have changed)
  var marker = '<!-- CRAWLABLE_GUIDE_LINKS -->';
  if (html.indexOf(marker) !== -1) {
    html = html.replace(marker, '\n' + links + '\n');
    // Ensure CSS class exists
    var css = '.crawl-guides{position:absolute;overflow:hidden;clip:rect(0,0,0,0);height:1px;width:1px;margin:-1px;padding:0;border:0}';
    if (html.indexOf('.crawl-guides') === -1) {
      html = html.replace('</style>', css + '\n</style>');
    }
  }
  fs.writeFileSync(indexFile, html, 'utf8');
  // Sync version.txt with the JS cache buster hash
  try { fs.writeFileSync(path.join(dir, 'version.txt'), jsVer, 'utf8'); console.log('Updated: version.txt (' + jsVer + ')'); } catch(e) { console.log('Warning: could not update version.txt (' + e.message + ')'); }
})();

// ===== GENERATE IMAGE SITEMAP =====
// Include self-hosted images from guides, products, and the img/ folder
function buildImageSitemap() {
  const site = 'https://topmusiciangear.com';
  var imgUrls = [];
  var seen = new Set();
  var imgDir = path.join(dir, 'img');
  // All .webp files in img/ folder
  try {
    var files = fs.readdirSync(imgDir);
    files.filter(function(f) { return f.endsWith('.webp'); }).forEach(function(f) {
      var imgPath = site + '/img/' + f;
      if (!seen.has(imgPath)) { seen.add(imgPath); imgUrls.push(imgPath); }
    });
  } catch(e) {}
  // guide images that are self-hosted (not already in img/)
  guides.forEach(g => {
    if (g.image && !g.image.startsWith('http')) {
      var imgPath = site + '/' + normImg(g.image);
      if (!seen.has(imgPath)) { seen.add(imgPath); imgUrls.push(imgPath); }
    }
  });
  // product images that are self-hosted
  products.forEach(p => {
    if (p.img && !p.img.startsWith('http')) {
      var imgPath = site + '/' + normImg(p.img);
      if (!seen.has(imgPath)) { seen.add(imgPath); imgUrls.push(imgPath); }
    }
  });
  var xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  imgUrls.forEach(u => { xml += '\n  <url><loc>' + u + '</loc><lastmod>' + today + '</lastmod></url>'; });
  xml += '\n</urlset>';
  fs.writeFileSync(path.join(dir, 'sitemap-images.xml'), xml, 'utf8');
  console.log('Generated: sitemap-images.xml (' + imgUrls.length + ' images)');
}
buildImageSitemap();

// Write back pre-bolded data/guides.json for SPA consumption
fs.writeFileSync(path.join(dir, 'data', 'guides.json'), JSON.stringify(guides, null, 2), 'utf8');
console.log('Updated: data/guides.json with pre-bolded content');

console.log(`\nDone! Generated ${guides.length * 2} guide pages.`);
