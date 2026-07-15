const fs = require('fs');
const path = require('path');
const { icon } = require('./js/icons.js');

function criticalCss() {
  return [
    '@font-face{font-family:Inter;src:url(/fonts/Inter.woff2) format("woff2");font-display:swap;font-weight:400 900;font-style:normal}',
    '*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}',
    ':root{--accent:#3b82f6;--accent-dark:#2563eb;--accent-light:#dbeafe;--accent-glow:rgba(59,130,246,0.2);--accent-glow-strong:rgba(59,130,246,0.35);--bg:#0d0d0d;--bg-secondary:#141414;--bg-card:#1a1a1a;--bg-card-hover:#222;--surface:#1e1e1e;--surface-light:#2a2a2a;--border:#2a2a2a;--border-light:#333;--text:#f0f0f0;--text-secondary:#a0a0a0;--text-muted:#909090;--white:#fff;--shadow-sm:0 1px 3px rgba(0,0,0,.3);--shadow:0 4px 12px rgba(0,0,0,.4);--shadow-md:0 8px 24px rgba(0,0,0,.5);--shadow-lg:0 16px 40px rgba(0,0,0,.5);--shadow-xl:0 24px 60px rgba(0,0,0,.6);--radius-sm:6px;--radius:10px;--radius-lg:14px;--radius-xl:18px;--transition:opacity .25s cubic-bezier(.4,0,.2,1),transform .25s cubic-bezier(.4,0,.2,1),filter .25s cubic-bezier(.4,0,.2,1)}',
    'html{scroll-behavior:smooth;background:#0d0d0d;margin:0!important;padding:0!important}',
    'body{margin:0!important;padding:0!important;font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--text);background:var(--bg);line-height:1.6;-webkit-font-smoothing:antialiased}',
    'a{text-decoration:none;color:inherit}',
    'img{max-width:100%;display:block}',
    '.skip-link{position:absolute;left:-9999px;top:0;z-index:9999;padding:8px 16px;background:var(--accent);color:#fff;font-size:14px;text-decoration:none;border-radius:0 0 6px 0}',
    '.skip-link:focus{left:0}',
    'header{background:#0d0d0d;border-bottom:1px solid var(--border);z-index:100;position:-webkit-sticky;position:sticky;top:0!important;margin:0!important;padding:0!important}',
    '.header-inner{max-width:100%;margin:0;padding:0 12px;display:flex;align-items:center;justify-content:space-between;height:64px;gap:16px}',
    '.header-left{display:flex;align-items:center;gap:24px;flex-shrink:0}',
    '.header-right{display:flex;align-items:center;gap:12px;flex-shrink:0}',
    '.header-social{display:flex;align-items:center;gap:4px}',
    '.logo{font-size:20px;font-weight:900;color:var(--white);text-decoration:none;display:flex;align-items:center;gap:10px;letter-spacing:-.5px;white-space:nowrap}',
    '.logo-text{display:flex;flex-direction:column;line-height:1.2}',
    '.logo-icon{width:36px;height:36px;background:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}',
    '.header-tagline-bar{text-align:center;font-size:17px;font-weight:500;color:var(--text-muted);letter-spacing:.3px;padding:6px 16px}',
    '.logo span{color:var(--accent)}',
    'nav{display:flex;gap:4px;flex:1}',
    '.lang-switcher{display:flex;gap:3px;flex-shrink:0;margin-left:8px}',
    '.header-social-link{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;color:var(--text-muted);font-size:15px;text-decoration:none}',
'.lang-btn{display:flex;align-items:center;justify-content:center;padding:5px;border-radius:5px;border:1px solid var(--border);background:transparent;color:var(--text-muted);font-size:12px;font-weight:700;font-family:inherit;cursor:pointer;transition:opacity .25s cubic-bezier(.4,0,.2,1),transform .25s cubic-bezier(.4,0,.2,1),filter .25s cubic-bezier(.4,0,.2,1)}',
'.lang-btn:hover{border-color:var(--accent)}',
'.lang-btn.active{background:rgba(255,255,255,0.1);border-color:var(--white);color:var(--white)}',
'.lang-flag{display:block;border-radius:2px;flex-shrink:0}',
    '.nav-link{padding:8px 14px;border-radius:6px;color:var(--text-secondary);font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;background:transparent;border:none;font-family:inherit;letter-spacing:.3px}',
    '.nav-link.active{color:var(--accent);background:rgba(59,130,246,.1)}',
    'body>*:not(header):not(.skip-link):not(.bg-hero):not(#cookie-banner):not(#toast){position:relative;z-index:2}',
    '.bg-hero{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;background-image:url("../img/me-600.webp");background-size:cover;background-position:center;opacity:.12}',
'.hero{position:relative;z-index:2;overflow:hidden;padding:0 32px 60px;min-height:calc(100vh - 64px);box-shadow:inset 0 0 120px 60px rgba(0,0,0,.45)}',
'.hero-inner{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;max-width:900px;margin:0 auto;position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:calc(100vh - 64px)}',
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
    '.guide-detail{content-visibility:auto;contain-intrinsic-size:auto 500px;padding:64px 32px 60px}',
    '.guide-detail .guide-back-link{display:inline-flex;align-items:center;gap:8px;color:var(--accent);margin-bottom:32px;font-weight:500;text-decoration:none}',
    '.guide-detail .guide-back-link:hover{text-decoration:underline}',

    '.guide-comp-table{width:100%;border-collapse:collapse;margin:24px 0;font-size:14px;contain:layout style}',
    '.guide-comp-table th,.guide-comp-table td{padding:12px 16px;border:1px solid var(--border);text-align:left}',
    '.guide-comp-table th{background:var(--surface);font-weight:700;color:var(--text);white-space:nowrap}',
    '.guide-comp-table td.label{font-weight:600;color:var(--accent);white-space:nowrap;width:1%}',
    '.guide-comp-table td.val{color:var(--text-secondary)}',
    '.guide-comp-title{font-size:22px;font-weight:700;margin:40px 0 16px;text-align:center}',
    '.guide-comp-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}',
    '@media(max-width:768px){.guide-comp-table{font-size:11px}.guide-comp-table th,.guide-comp-table td{padding:6px 4px}.guide-comp-title{font-size:17px;margin:24px 0 12px}}',

    '.stats-bar{background:rgba(10,10,10,0.5);border-bottom:1px solid rgba(255,255,255,0.05);padding:28px 32px}',
    '.stats-inner{max-width:none;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:24px}',
    '.stat-item{text-align:center;padding:8px;contain:layout style}',
    '.stat-number{font-size:clamp(28px,4vw,38px);font-weight:900;background:linear-gradient(135deg,var(--accent),#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.1}',
    '.stat-label{font-size:14px;color:var(--text-secondary);font-weight:500;margin-top:4px}',
    '@media(max-width:768px){.header-social{display:none}.header-tagline-bar{font-size:13px;padding:2px 12px}.hamburger{display:none}.hero{padding:12px 20px 40px;min-height:50vh}.hero h1{font-size:40px;margin-bottom:2px}.hero .hero-subtitle{font-size:40px}.hero p{margin-bottom:12px}.hero-badge{margin-bottom:4px}.hero-inner{gap:4px;min-height:auto;justify-content:flex-start;padding-top:8px}.stats-bar{padding:20px 16px}.stats-inner{grid-template-columns:repeat(3,1fr);gap:8px}.stat-number{font-size:24px;line-height:1}.stat-label{font-size:11px;margin-top:0}}',
    '.audio-eq{display:flex;align-items:flex-end;gap:2px;height:20px;opacity:0.3;transition:opacity 0.3s}.playing .audio-eq{opacity:1}.audio-eq i{display:block;width:3px;height:100%;background:var(--accent);border-radius:2px;transform-origin:bottom;animation:eq .8s ease-in-out infinite}.audio-eq i:nth-child(1){transform:scaleY(0.6);animation-delay:0s}.audio-eq i:nth-child(2){transform:scaleY(1);animation-delay:.2s}.audio-eq i:nth-child(3){transform:scaleY(0.4);animation-delay:.4s}.audio-eq i:nth-child(4){transform:scaleY(0.8);animation-delay:.6s}@keyframes eq{0%,100%{transform:scaleY(0.4)}50%{transform:scaleY(1)}}.playing .audio-mini-player{box-shadow:0 0 12px rgba(59,130,246,0.3);transition:box-shadow 0.3s}.audio-mini-player{transition:box-shadow 0.3s}#cookie-banner.cookie-visible{transform:translateY(0)!important}',
  ].join('');
}

// ===== LOAD DATA =====
const dir = __dirname;

// Load guide/product data from JSON, store meta from constants
const guides = JSON.parse(fs.readFileSync(path.join(dir, 'data', 'guides.json'), 'utf8').replace(/^\ufeff/, ''));
const products = JSON.parse(fs.readFileSync(path.join(dir, 'data', 'products.json'), 'utf8'));
eval(fs.readFileSync(path.join(dir, 'js', 'constants.js'), 'utf8').replace(/^\ufeff/, '').replace(/^const /gm, 'var '));

// Auto-increment cache busters from file modification times
const cacheVerJs = Math.floor(fs.statSync(path.join(dir, 'js', 'app.js')).mtimeMs).toString(36);
const cacheVerCss = Math.floor(fs.statSync(path.join(dir, 'css', 'style.min.css')).mtimeMs).toString(36);
const today = new Date().toISOString().split('T')[0];



function trunc(s, max) {
  if (!s || s.length <= max) return s || '';
  var i = s.lastIndexOf(' ', max);
  return s.substring(0, i > 0 ? i : max) + '...';
}

function getResolvedStores(product) {
  const allStoreKeys = ['pluginboutique','gear4music','sweetwater','musikproduktiv','amazon','reverb','andertons','baxmusic','musicstore'];
  const searchUrls = {
    pluginboutique: (t) => `https://www.pluginboutique.com/search?q=${encodeURIComponent(t)}&a_aid=6a01e859cbe1a`,
    gear4music: (t) => `https://www.gear4music.com/search?q=${encodeURIComponent(t)}`,
    sweetwater: (t) => `https://www.sweetwater.com/store/search.php?s=${encodeURIComponent(t)}`,
    musikproduktiv: (t) => `https://www.musik-produktiv.de/`,
    amazon: (t) => `https://www.amazon.com/s?k=${encodeURIComponent(t)}&tag=topmusicg-20`,
    reverb: (t) => `https://reverb.com/marketplace?query=${encodeURIComponent(t)}`,
    andertons: (t) => `https://www.andertons.co.uk/search.php?search_query=${encodeURIComponent(t)}&irgwc=1&irpid=7292297`,
    baxmusic: (t) => `https://www.bax-shop.co.uk/complete-assortment?keyword=${encodeURIComponent(t)}`,
    musicstore: (t) => `https://www.musicstore.com/en_GB/search?SearchText=${encodeURIComponent(t)}`
  };
  const s = {};
  allStoreKeys.forEach(key => {
    if (key === 'amazon' && product.category === 'plugins') return;
    if (key === 'pluginboutique' && product.category !== 'plugins') return;
    const specificUrl = product.stores[key];
    if (specificUrl) {
      if (key === 'gear4music' && specificUrl === 'https://www.gear4music.com/search') {
        s[key] = `https://www.gear4music.com/search?q=${encodeURIComponent(product.title)}`;
      } else if (key === 'musikproduktiv' && specificUrl === 'https://www.musik-produktiv.de/search') {
        s[key] = searchUrls.musikproduktiv(product.title);
      } else if (key === 'amazon' && specificUrl.startsWith('https://www.amazon.com/dp/')) {
        s[key] = specificUrl + '?tag=topmusicg-20';
      } else if (key === 'andertons' && !specificUrl.includes('irgwc=')) {
        s[key] = specificUrl + (specificUrl.includes('?') ? '&' : '?') + 'irgwc=1&irpid=7292297';
      } else {
        s[key] = specificUrl;
      }
    } else {
      s[key] = searchUrls[key](product.title);
    }
  });
  if (s.reverb) {
    s.reverb = `https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2891111&ued=${encodeURIComponent(s.reverb)}`;
  }
  if (s.musicstore && !product.stores.musicstore) {
    s.musicstore = `https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=${encodeURIComponent(s.musicstore)}`;
  }
  if (s.gear4music) {
    s.gear4music = `https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=${encodeURIComponent(s.gear4music)}`;
  }
  return s;
}

function formatPrice(price) {
  if (price >= 1000) return `$${(price / 1000).toFixed(1)}k`;
  return `$${price}`;
}

function stars(rating) {
  return "★".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "");
}

function fixIconPath(html) {
  return html.replace(/src="img\//g, 'src="../img/');
}

function productCard(p, lang) {
  const title = lang === 'es' && p.title_es ? p.title_es : p.title;
  const desc = lang === 'es' && p.desc_es ? p.desc_es : p.desc;
  const stores = Object.entries(getResolvedStores(p)).map(([key, url]) => {
    const iconHtml = storeIcons[key] ? '<span class="icon">' + fixIconPath(storeIcons[key]) + '</span>' : '';
    return `<a href="${url}" target="_blank" rel="noopener noreferrer sponsored" class="chip-store" style="background:${storeColors[key] || '#555'}">${iconHtml} ${storeNames[key] || key}</a>`;
  }).join("");
  return `<div class="guide-product-card">
    <div class="guide-product-card-img"><img src="${p.img.startsWith('http') ? p.img : '../' + p.img}" alt="${title}" loading="lazy"></div>
    <div class="guide-product-card-body">
      <h3 class="guide-product-card-title">${title}</h3>
      <div class="guide-product-card-rating">${stars(p.rating)} <span>${p.reviews.toLocaleString()}</span></div>
      <div class="guide-product-card-price">${formatPrice(p.price)} <small>USD</small></div>
      <div class="guide-product-card-desc">${desc}</div>
      <div class="guide-product-card-stores">${stores}</div>
    </div>
  </div>`;
}

function jsonLdScript(data) {
  return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>`;
}

function guideDates(guide, idx) {
  var base = new Date('2026-01-15');
  base.setDate(base.getDate() + idx * 3);
  var pub = base.toISOString().split('T')[0];
  if (pub > today) pub = today;
  var mod = guide.dateModified || pub;
  if (mod > today) mod = today;
  return { published: pub, modified: mod };
}

function guideDesc(guide, introFallback, isEs) {
  if (isEs) {
    return guide.description_es || trunc(introFallback, 155);
  }
  return guide.description || trunc(introFallback, 155);
}

function esText(esVal, enVal) {
  return esVal && esVal.length > enVal.length * 0.5 ? esVal : enVal;
}

function normImg(path) {
  return path && path.startsWith('../') ? path.substring(3) : path;
}

function buildGuidePage(guide, lang, idx) {
  const isEs = lang === 'es';
  const title = isEs && guide.title_es ? guide.title_es : guide.title;
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

  const sectionsHtml = guide.sections.map(s => {
    const h = isEs && s.heading_es ? s.heading_es : s.heading;
    const c = esText(isEs && s.content_es, s.content);
    return `<div class="guide-section">
      <h2 class="guide-section-heading">${h}</h2>
      <div class="guide-section-content">${c}</div>
    </div>`;
  }).join('');

  var dPub = guideDates(guide, idx).published, dMod = guideDates(guide, idx).modified;
  var d = guideDesc(guide, intro, isEs).replace(/"/g, '&quot;');
  ogMeta = `  <meta property="og:type" content="article">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${d}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${fullImage}">
  <meta property="og:image:width" content="600">
  <meta property="og:image:height" content="400">
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
    "author": { "@type": "Person", "name": "Daniel Carnago", "url": "https://topmusiciangear.com/about.html" },
    "publisher": { "@type": "Organization", "name": "TopMusicianGear", "url": "https://topmusiciangear.com" },
    "image": fullImage,
    "datePublished": guideDates(guide, idx).published, "dateModified": guideDates(guide, idx).modified,
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonical }
  };

  const items = [];
  const productSchemas = [];
  guide.featuredProducts.forEach((pid, idx) => {
    const p = products.find(pr => pr.id === pid);
    if (p) {
      const generatedSku = "TMG-" + (p.category || "gear").toUpperCase() + "-" + String(p.id).padStart(3, "0");
      const title = isEs && p.title_es ? p.title_es : p.title;
      items.push({
        "@type": "ListItem", "position": idx + 1,
        "item": {
          "@type": "Product",
          "name": title,
          "brand": { "@type": "Brand", "name": p.brand || "" },
          "mpn": p.mpn || generatedSku,
          "sku": generatedSku,
          "description": trunc(isEs && p.desc_es ? p.desc_es : p.desc, 155),
          "offers": { "@type": "Offer", "price": p.price, "priceCurrency": "USD", "availability": "https://schema.org/InStock", "hasMerchantReturnPolicy": { "@type": "MerchantReturnPolicy", "applicableCountry": "US", "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow", "merchantReturnDays": 30, "returnMethod": "https://schema.org/ReturnByMail", "returnFees": "https://schema.org/FreeReturn" }, "shippingDetails": { "@type": "OfferShippingDetails", "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "US" }, "shippingRate": { "@type": "MonetaryAmount", "value": 0, "currency": "USD" }, "deliveryTime": { "@type": "ShippingDeliveryTime", "handlingTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 2, "unitCode": "DAY" }, "transitTime": { "@type": "QuantitativeValue", "minValue": 3, "maxValue": 7, "unitCode": "DAY" } } } },
          "aggregateRating": p.reviews > 0 ? { "@type": "AggregateRating", "ratingValue": p.rating, "reviewCount": p.reviews } : undefined,
          "image": p.img.startsWith('http') ? p.img : `https://topmusiciangear.com/${p.img}`
        }
      });
      productSchemas.push({
        "@type": "Product",
        "name": title,
        "brand": { "@type": "Brand", "name": p.brand || "" },
        "offers": { "@type": "Offer", "price": p.price, "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
        "aggregateRating": p.reviews > 0 ? { "@type": "AggregateRating", "ratingValue": p.rating, "reviewCount": p.reviews } : undefined,
        "image": p.img.startsWith('http') ? p.img : `https://topmusiciangear.com/${p.img}`
      });
    }
  });

  function genFaq(g, es) {
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
        { q: "What are the best studio monitors for home recording?", q_es: "¿Cuáles son los mejores monitores de estudio para grabación casera?", a: "The Yamaha HS8 ($698/pair) are the industry standard for mixing — brutally honest and revealing. The KRK Rokit 7 G5 ($498/pair) offers great value with built-in DSP room correction. For smaller rooms, the Yamaha HS5 or KRK Rokit 5 G5 are excellent choices that won't overwhelm your space.", a_es: "Los Yamaha HS8 ($698/par) son el estándar de la industria para mezcla. Los KRK Rokit 7 G5 ($498/par) ofrecen gran valor con corrección de sala DSP incorporada." },
        { q: "Do I need a subwoofer for studio monitors?", q_es: "¿Necesito un subwoofer para monitores de estudio?", a: "A subwoofer is not essential for most home studios. It becomes important when mixing genres that rely on sub-bass frequencies like EDM, hip-hop, or film scoring. The Yamaha HS8S subwoofer pairs well with HS series monitors. In small rooms, a sub can create more problems than it solves due to room modes.", a_es: "Un subwoofer no es esencial para la mayoría de estudios caseros. Se vuelve importante para géneros que dependen de frecuencias sub-graves como EDM o hip-hop. En habitaciones pequeñas puede crear más problemas de los que resuelve." },
        { q: "What size studio monitors should I get?", q_es: "¿De qué tamaño deberían ser mis monitores de estudio?", a: "For small rooms under 150 sq ft, 5-inch monitors like the Yamaha HS5 are ideal. Medium rooms up to 250 sq ft work well with 6.5-7 inch monitors like the KRK Rokit 7 G5. Larger rooms benefit from 8-inch monitors like the Yamaha HS8. The key is matching monitor size to room size.", a_es: "Para habitaciones pequeñas, monitores de 5 pulgadas como los Yamaha HS5 son ideales. Habitaciones medianas funcionan bien con 6.5-7 pulgadas. Habitaciones grandes se benefician de monitores de 8 pulgadas." },
        { q: "How should I position my studio monitors?", q_es: "¿Cómo debería posicionar mis monitores de estudio?", a: "Position monitors at ear level forming an equilateral triangle with your listening position. Keep them at least 8 inches from walls to reduce bass buildup. Angle them toward your ears (toe-in). Use monitor isolation pads to decouple them from your desk. The tweeters should be at ear height when seated.", a_es: "Coloca los monitores a la altura del oído formando un triángulo equilátero con tu posición de escucha. Mantenlos al menos a 20 cm de las paredes. Usa pads de aislamiento para desacoplarlos del escritorio." },
        { q: "Are expensive studio monitors worth it?", q_es: "¿Valen la pena los monitores de estudio caros?", a: "Expensive monitors like the Genelec 8040B or Adam A7V offer more accurate frequency response, better stereo imaging, and higher SPL before distortion. For critical mixing and mastering work, they're worth the investment. For home studio enthusiasts, quality monitors in the $300-$700 range like Yamaha HS or KRK Rokit series provide excellent value.", a_es: "Los monitores caros ofrecen una respuesta de frecuencia más precisa y mejor imagen estéreo. Para mezcla crítica, valen la inversión. Para entusiastas, monitores de $300-$700 como Yamaha HS o KRK Rokit ofrecen excelente valor." }
      ],
      headphones: [
        { q: "What are the best studio headphones for mixing?", q_es: "¿Cuáles son los mejores auriculares de estudio para mezclar?", a: "The beyerdynamic DT 900 Pro X are the best open-back headphones for mixing, offering excellent soundstage and natural frequency response. The Sennheiser HD 600 series is another top choice. For closed-back options, the beyerdynamic DT 770 Pro is the industry standard for tracking and mixing.", a_es: "Los beyerdynamic DT 900 Pro X son los mejores auriculares abiertos para mezclar. Los Sennheiser HD 600 son otra excelente opción. Para auriculares cerrados, los DT 770 Pro son el estándar de la industria." },
        { q: "Open-back vs closed-back headphones for studio?", q_es: "¿Auriculares abiertos vs cerrados para estudio?", a: "Open-back headphones like the beyerdynamic DT 900 Pro X provide a wider soundstage and more natural sound, making them better for critical mixing. Closed-back headphones like the DT 770 Pro isolate sound, making them ideal for tracking vocals and instruments to prevent bleed into the microphone.", a_es: "Los auriculares abiertos como los DT 900 Pro X ofrecen un escenario sonoro más amplio, ideales para mezcla. Los cerrados como los DT 770 Pro aíslan el sonido, perfectos para grabación." },
        { q: "Can I mix with headphones instead of monitors?", q_es: "¿Puedo mezclar con auriculares en vez de monitores?", a: "Yes, but with caveats. Headphones can cause ear fatigue faster and don't translate bass frequencies as accurately as monitors. However, with open-back headphones and reference tracks, you can achieve professional results. The beyerdynamic DT 900 Pro X is excellent for headphone mixing.", a_es: "Sí, pero con precaución. Los auriculares causan fatiga auditiva más rápido y no traducen los graves con tanta precisión. Con auriculares abiertos y pistas de referencia, puedes lograr resultados profesionales." },
        { q: "What is the best budget headphones for music production?", q_es: "¿Cuáles son los mejores auriculares económicos para producción musical?", a: "The Audio-Technica ATH-M50X ($149) is the best budget headphone for music production, offering a balanced frequency response and good detail. The Sony MDR-7506 ($99) is another excellent budget option that's been an industry standard for decades.", a_es: "Los Audio-Technica ATH-M50X ($149) son los mejores auriculares económicos para producción musical. Los Sony MDR-7506 ($99) son otra excelente opción que ha sido estándar de la industria por décadas." },
        { q: "Do I need a headphone amplifier for studio headphones?", q_es: "¿Necesito un amplificador de auriculares para auriculares de estudio?", a: "High-impedance headphones like the beyerdynamic DT 770 Pro 250 Ohm benefit significantly from a dedicated headphone amplifier. Lower impedance models like the DT 770 Pro 80 Ohm or Audio-Technica ATH-M50X work well directly from most audio interfaces. If your headphones sound quiet or weak, a headphone amp will help.", a_es: "Los auriculares de alta impedancia como los DT 770 Pro 250 Ohm se benefician de un amplificador dedicado. Los modelos de menor impedancia funcionan bien directamente desde la mayoría de interfaces de audio." }
      ],
      plugins: [
        { q: "What are the essential mixing plugins for beginners?", q_es: "¿Cuáles son los plugins de mezcla esenciales para principiantes?", a: "Start with an EQ (FabFilter Pro-Q 3), a compressor (FabFilter Pro-C 2), a reverb (Valhalla Room), a limiter (FabFilter Pro-L 2), and a pitch correction tool (Celemony Melodyne 5). These five plugins cover 90% of mixing needs. The FabFilter Total Bundle is worth the investment if you can afford it.", a_es: "Comienza con un EQ (FabFilter Pro-Q 3), un compresor (FabFilter Pro-C 2), una reverberación (Valhalla Room), un limitador (FabFilter Pro-L 2) y afinación (Celemony Melodyne 5)." },
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

    };
    var faqs = faqBase[g.category] || faqBase.interfaces;
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
  <title>${title} | TopMusicianGear</title>
  <meta name="description" content="${guideDesc(guide, intro, isEs).replace(/"/g, '&quot;')}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="x-default" href="${alternateEn}">
  <link rel="alternate" hreflang="en" href="${alternateEn}">
  <link rel="alternate" hreflang="es" href="${alternateEs}">
${ogMeta}
  <style>${criticalCss()}</style>
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
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{'analytics_storage':'denied','ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','functionality_storage':'granted','security_storage':'granted'});gtag('js',new Date());gtag('config','G-0752B4SE9L',{anonymize_ip:true})</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-0752B4SE9L"></script>
</head>
<body style="margin:0;padding:0;">
  <a href="#mainContent" class="skip-link">Skip to main content</a>

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
          <a href="/#mysetup" class="nav-link">${isEs ? 'Mi Equipo' : 'My Setup'}</a>
          <a href="/#about" class="nav-link">${isEs ? 'Sobre Mí' : 'About Me'}</a>
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
          <a href="https://www.youtube.com/@Cuban3Beats" target="_blank" rel="noopener" class="header-social-link" title="YouTube">${icon('youtube', 'fa-brands')}</a>
          <a href="https://open.spotify.com/artist/3HMtcts1AYCzkI4pBQKRzX" target="_blank" rel="noopener" class="header-social-link" title="Spotify">${icon('spotify', 'fa-brands')}</a>
          <a href="https://www.tiktok.com/@cuban3beats" target="_blank" rel="noopener" class="header-social-link" title="TikTok">${icon('tiktok', 'fa-brands')}</a>
          <a href="https://www.facebook.com/Cuban3Beats/" target="_blank" rel="noopener" class="header-social-link" title="Facebook">${icon('facebook-f', 'fa-brands')}</a>
          <a href="https://www.instagram.com/cuban3beats" target="_blank" rel="noopener" class="header-social-link" title="Instagram">${icon('instagram', 'fa-brands')}</a>
          <a href="https://x.com/Cuban3Beats" target="_blank" rel="noopener" class="header-social-link" title="X">${icon('x-twitter', 'fa-brands')}</a>
          <a href="https://soundbetter.com/profiles/721440-daniel-carnago" target="_blank" rel="noopener" class="header-social-link" title="SoundBetter"><img src="https://d2p6ecj15pyavq.cloudfront.net/assets/SoundBetterBadge-c84cb3e75c4267f5bee41f7f617a81d9.svg" alt="SoundBetter" class="sb-icon"></a>
        </div>
        <a href="https://open.spotify.com/artist/3HMtcts1AYCzkI4pBQKRzX?si=hD1MDwuuQiKwP0fSCiD07w" target="_blank" rel="noopener" style="color:var(--text-muted);font-size:11px;font-weight:600;margin-top:2px;text-decoration:none;font-family:inherit;padding:0"><span style="color:var(--accent)">@</span>Cuban<span style="color:var(--white)">3</span>Beats</a>
        </div>
        <div class="lang-switcher">
          <button class="lang-btn ${isEs ? '' : 'active'}" title="English" onclick="location.href='${isEs ? `/guides/${guide.id}.html` : '#'}'"><img class="lang-flag" src="../img/flag-en.svg" alt="EN" width="20" height="15"></button>
          <button class="lang-btn ${isEs ? 'active' : ''}" title="Español" onclick="location.href='${isEs ? '#' : `/guides/${guide.id}_es.html`}'"><img class="lang-flag" src="../img/flag-es.svg" alt="ES" width="20" height="15"></button>
        </div>
        <button class="hamburger" id="hamburger" aria-label="Menu" onclick="document.getElementById('mobileNav').classList.toggle('open')">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <div class="header-tagline-bar">${isEs ? 'Encuentra las Mejores Ofertas en las Principales Tiendas de Música' : 'Find the Best Deals Across Top Music Stores'}</div>

  <div class="mobile-nav" id="mobileNav">
    <a class="nav-link" href="/#guides">${isEs ? 'Guías' : 'Guides'}</a>
    <a class="nav-link" href="/#mysetup">${isEs ? 'Mi Equipo' : 'My Setup'}</a>
    <a class="nav-link" href="/#about">${isEs ? 'Sobre Mí' : 'About Me'}</a>
  </div>

  <main id="mainContent">


    <div class="guide-detail">
      <nav class="guide-breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> / <a href="/#guides">${isEs ? 'Guías' : 'Guides'}</a> / <span>${title}</span>
      </nav>
      <div class="guide-back-row">
        <a href="/" class="guide-back-btn">${icon('arrow-left', 'fa-solid')} ${isEs ? 'Todas las Guías' : 'Back to All Guides'}</a>
      </div>
      <div class="guide-detail-header">
        <h1 class="guide-detail-title">${title}</h1>
      </div>
      <div class="guide-detail-img"><img src="${fullImage}" alt="${title}"></div>
      <div class="guide-detail-intro"><p>${intro}</p></div>
      ${guide.comparison ? `<div class="guide-comp-wrap">
        <h2 class="guide-comp-title">${isEs ? 'Comparación Rápida' : 'Quick Comparison'}</h2>
        <div class="guide-comp-scroll"><table class="guide-comp-table">
          <thead><tr><th></th><th>${isEs && guide.featuredSnippet ? guide.featuredSnippet.name1_es || guide.featuredSnippet.name1_en : (guide.featuredSnippet ? guide.featuredSnippet.name1_en : '')}</th><th>${isEs && guide.featuredSnippet ? guide.featuredSnippet.name2_es || guide.featuredSnippet.name2_en : (guide.featuredSnippet ? guide.featuredSnippet.name2_en : '')}</th></tr></thead>
          <tbody>${guide.comparison.rows.map(r => `<tr><td class="label">${isEs ? r.label_es : r.label}</td><td class="val">${isEs && r.val1_es ? r.val1_es : r.val1}</td><td class="val">${isEs && r.val2_es ? r.val2_es : r.val2}</td></tr>`).join('')}</tbody>
        </table></div>
      </div>` : ''}
      <div class="guide-detail-sections">${sectionsHtml}</div>
      <div class="guide-verdict">
        <span class="verdict-label">${isEs ? 'Veredicto' : 'Verdict'}</span>
        <span class="verdict-text">${verdict}</span>
      </div>
      ${productCards ? `<div class="guide-products-grid"><h2 class="guide-products-title">${isEs ? 'Productos en esta Guía' : 'Products in this Guide'}</h2><div class="guide-products-cards">${productCards}</div></div>` : ''}
      <div class="guide-conclusion">
        <h2 class="guide-conclusion-title">${isEs ? 'Conclusión' : 'Final Thoughts'}</h2>
        <p>${conclusion}</p>
      </div>
      <div class="guide-related">
        <h2 class="guide-related-title">${isEs ? 'Guías Relacionadas' : 'Related Guides'}</h2>
        <div class="guide-related-list">
          ${(function(){ var r = guides.filter(g => g.id !== guide.id && g.category === guide.category); if (!r.length) r = guides.filter(g => g.id !== guide.id); return r.slice(0, 6).map(g => { var gt = isEs && g.title_es ? g.title_es : g.title; return '<a href="/guides/' + g.id + (isEs ? '_es' : '') + '.html" class="guide-related-link">' + gt + '</a>'; }).join(''); })()}
        </div>
      </div>
      ${(function(){ var pidSet = new Set(guide.featuredProducts || []); var comps = guides.filter(g => g.id !== guide.id && g.id.includes('vs') && (g.featuredProducts || []).some(p => pidSet.has(p))); if (!comps.length) return ''; return '<div class="guide-related"><h2 class="guide-related-title">' + (isEs ? 'Comparativas' : 'Comparisons') + '</h2><div class="guide-related-list">' + comps.slice(0, 4).map(g => { var gt = isEs && g.title_es ? g.title_es : g.title; return '<a href="/guides/' + g.id + (isEs ? '_es' : '') + '.html" class="guide-related-link">' + gt + '</a>'; }).join('') + '</div></div>'; })()}
      <div class="guide-back-row">
        <a href="/" class="guide-back-btn">${icon('arrow-left', 'fa-solid')} ${isEs ? 'Todas las Guías' : 'Back to All Guides'}</a>
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
        </ul>
      </div>
      <div class="footer-col">
        <h3>${isEs ? 'Categorías' : 'Categories'}</h3>
        <ul>
          <li><a href="/#guides" data-cat="microphones">${isEs ? 'Micrófonos' : 'Microphones'}</a></li>
          <li><a href="/#guides" data-cat="interfaces">${isEs ? 'Interfaces' : 'Interfaces'}</a></li>
          <li><a href="/#guides" data-cat="headphones">${isEs ? 'Auriculares' : 'Headphones'}</a></li>
          <li><a href="/#guides" data-cat="monitors">${isEs ? 'Monitores' : 'Monitors'}</a></li>
          <li><a href="/#guides" data-cat="plugins">${isEs ? 'Plugins' : 'Plugins'}</a></li>
          <li><a href="/#guides" data-cat="guitars">${isEs ? 'Guitarras' : 'Guitars'}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>${isEs ? 'Legal' : 'Legal'}</h3>
        <ul>
          <li><a href="/privacy-policy.html">${isEs ? 'Política de Privacidad' : 'Privacy Policy'}</a></li>
          <li><a href="/terms.html">${isEs ? 'Términos de Servicio' : 'Terms of Service'}</a></li>
          <li><a href="/cookie-policy.html">${isEs ? 'Política de Cookies' : 'Cookie Policy'}</a></li>
          <li><a href="/cookie-policy.html">${isEs ? 'Configuración de Cookies' : 'Cookie Settings'}</a></li>
          <li><a href="/affiliate-disclosure.html">${isEs ? 'Divulgación de Afiliados' : 'Affiliate Disclosure'}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p><strong>TopMusicianGear</strong> ${isEs ? 'participa en programas de afiliados incluyendo Plugin Boutique, Musik Produktiv, Gear4Music, Amazon, Reverb, Sweetwater, Andertons, Bax Music, y Music Store. Como afiliado, ganamos comisiones por compras realizadas sin costo adicional para ti.' : 'is a participant in affiliate programs including Plugin Boutique, Musik Produktiv, Gear4Music, Amazon, Reverb, Sweetwater, Andertons, Bax Music, and Music Store. As an affiliate, we earn from qualifying purchases at no additional cost to you.'} <a href="#" onclick="showAffiliateDisclosure();return false" style="color:var(--accent);text-decoration:underline">${isEs ? 'Más info' : 'More info'}</a></p>
      <p style="margin-top:8px;">&copy; ${new Date().getFullYear()} TopMusicianGear. All rights reserved. ${isEs ? 'Hecho por un músico, para músicos.' : 'Built by a musician, for musicians.'}</p>
      <button class="back-to-top" onclick="window.scrollTo({top:0,behavior:'smooth'})"><svg data-fa="arrow-up" class="icon fa-solid fa-arrow-up" viewBox="0 0 384 512" width="1em" height="1em" fill="currentColor"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg> ${isEs ? 'Volver arriba' : 'Back to top'}</button>
    </div>
  </footer>

  <!-- Affiliate Disclosure Modal -->
  <div id="affiliate-modal" style="display:none;position:fixed!important;inset:0!important;z-index:2147483647!important;align-items:center;justify-content:center;padding:24px;background:rgba(0,0,0,.8);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)">
    <div style="background:var(--card-bg);border:1px solid var(--border);border-radius:12px;padding:32px;max-width:600px;width:100%;max-height:80vh;overflow-y:auto;position:relative;color:var(--text)">
      <button onclick="hideAffiliateDisclosure()" style="position:absolute;top:16px;right:16px;background:none;border:none;color:var(--text);font-size:24px;cursor:pointer;line-height:1;padding:4px 8px;opacity:.5">&times;</button>
      <h3 style="font-size:20px;font-weight:700;margin:0 0 16px;padding-right:30px">${isEs ? 'Divulgación de Afiliados' : 'Affiliate Disclosure'}</h3>
      <p style="font-size:14px;line-height:1.7;color:var(--text-secondary)">${isEs ? 'TopMusicianGear participa en programas de marketing de afiliados diseñados para proporcionar un medio para que los sitios ganen tarifas publicitarias mediante publicidad y enlaces a minoristas asociados, incluidos Plugin Boutique, Musik Produktiv, Gear4Music, Amazon, Reverb, Sweetwater, Andertons, Bax Music, y Music Store. Cuando haces clic en un enlace de producto en este sitio y realizas una compra, podemos ganar una pequeña comisión sin costo adicional para ti. Esto ayuda a mantener el sitio y nos permite seguir creando reseñas y recomendaciones honestas. Todas las opiniones expresadas en este sitio son nuestras. Solo recomendamos productos en los que creemos genuinamente y que hemos usado personalmente o investigado a fondo.' : 'TopMusicianGear is a participant in affiliate marketing programs designed to provide a means for sites to earn advertising fees by advertising and linking to partner retailers including Plugin Boutique, Musik Produktiv, Gear4Music, Amazon, Reverb, Sweetwater, Andertons, Bax Music, and Music Store. When you click on a product link on this site and make a purchase, we may earn a small commission at no additional cost to you. This helps support the site and allows us to continue creating honest reviews and recommendations. All opinions expressed on this site are our own. We only recommend products we genuinely believe in and have personally used or thoroughly researched.'}</p>
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

  <script defer src="/js/translations.js?v=7"></script>
  <script defer src="/js/constants.js?v=1"></script>
  <script defer src="/js/app.js?v=${cacheVerJs}"></script>
<script>(function(){var b=document.getElementById('cookie-banner');if(!b)return;var m=document.getElementById('cookie-modal');var c=null;var Y=31536000000;if(window.location.search.indexOf('reset-cookies')>-1)try{localStorage.removeItem('cookiePrefs')}catch(e){}try{c=JSON.parse(localStorage.getItem('cookiePrefs')||'null')}catch(e){}if(c&&c._ts&&Date.now()-c._ts>Y)c=null;var h=document.documentElement;var pg=h.getAttribute('lang');if(pg==='en'||pg==='es'){h.classList.add('lang-'+pg);document.querySelectorAll('.cookie-lang-en').forEach(function(e){e.style.removeProperty('display')});document.querySelectorAll('.cookie-lang-es').forEach(function(e){e.style.removeProperty('display')});if(pg==='es'){document.querySelectorAll('.cookie-lang-en').forEach(function(e){e.style.setProperty('display','none','important')})}else{document.querySelectorAll('.cookie-lang-es').forEach(function(e){e.style.setProperty('display','none','important')})}}if(!c){b.classList.add('cookie-visible')}else{b.classList.remove('cookie-visible');gtag('consent','update',{'analytics_storage':c.analytics?'granted':'denied'});if(c.affiliate)loadAffiliate()}function loadAffiliate(){if(!document.getElementById('impact-script')){var s=document.createElement('script');s.src='https://utt.impactcdn.com/P-A7292297-bda5-4465-a26a-2017d1cc16b51.js';s.id='impact-script';s.async=true;document.body.appendChild(s);window.impactStat=function(){}}}
window.cookieAccept=function(){try{var p={essential:true,analytics:true,affiliate:true,_ts:Date.now()};localStorage.setItem('cookiePrefs',JSON.stringify(p))}catch(e){}gtag('consent','update',{'analytics_storage':'granted'});if(b)b.style.display='none';if(m)m.style.display='none';if(p.affiliate)loadAffiliate()}
window.cookieDecline=function(){try{var p={essential:true,analytics:false,affiliate:false,_ts:Date.now()};localStorage.setItem('cookiePrefs',JSON.stringify(p))}catch(e){}gtag('consent','update',{'analytics_storage':'denied'});if(b)b.style.display='none';if(m)m.style.display='none'}
window.cookiePrefs=function(){if(m)m.style.display='flex';try{var s=JSON.parse(localStorage.getItem('cookiePrefs')||'null')||{essential:true,analytics:true,affiliate:true};var ca=document.getElementById('cm-analytics');if(ca)ca.checked=s.analytics;var ca3=document.getElementById('cm-affiliate');if(ca3)ca3.checked=s.affiliate}catch(e){}}
window.cookieSave=function(){try{var p={essential:true,analytics:document.getElementById('cm-analytics')?.checked??false,affiliate:document.getElementById('cm-affiliate')?.checked??false,_ts:Date.now()};localStorage.setItem('cookiePrefs',JSON.stringify(p))}catch(e){}gtag('consent','update',{'analytics_storage':p.analytics?'granted':'denied'});if(b)b.style.display='none';if(m)m.style.display='none';if(p.affiliate)loadAffiliate()};document.getElementById('cb-accept')?.addEventListener('click',window.cookieAccept);document.getElementById('cb-prefs')?.addEventListener('click',window.cookiePrefs);document.getElementById('cm-close')?.addEventListener('click',function(){if(m)m.style.display='none'});document.getElementById('cm-decline')?.addEventListener('click',window.cookieDecline);document.getElementById('cm-allow')?.addEventListener('click',window.cookieAccept}})();
window.showAffiliateDisclosure=function(){var d=document.getElementById('affiliate-modal');if(d)d.style.display='flex'};
window.hideAffiliateDisclosure=function(){var d=document.getElementById('affiliate-modal');if(d)d.style.display='none'};
</script>
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
  html = html.replace(/(css\/style\.css\?v=)[a-z0-9]+/g, '$1' + cacheVerCss);
  // Update JS cache buster
  html = html.replace(/(js\/app\.js\?v=)[a-z0-9]+/g, '$1' + cacheVerJs);
  var links = guides.map(function(g) {
    var enUrl = '/guides/' + g.id + '.html';
    var esUrl = '/guides/' + g.id + '_es.html';
    var title = g.title;
    var titleEs = g.title_es || g.title;
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
})();

// ===== GENERATE IMAGE SITEMAP =====
// Only include self-hosted images, skip external CDN (Thomann, Amazon etc.)
function buildImageSitemap() {
  const site = 'https://topmusiciangear.com';
  var imgUrls = [];
  var seen = new Set();
  // guide images that are self-hosted
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
  // always include the main hero image
  var heroImg = site + '/img/me-600.webp';
  if (!seen.has(heroImg)) { imgUrls.unshift(heroImg); }
  var xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  imgUrls.forEach(u => { xml += '\n  <url><loc>' + u + '</loc><lastmod>' + today + '</lastmod></url>'; });
  xml += '\n</urlset>';
  fs.writeFileSync(path.join(dir, 'sitemap-images.xml'), xml, 'utf8');
  console.log('Generated: sitemap-images.xml (' + imgUrls.length + ' images)');
}
buildImageSitemap();

console.log(`\nDone! Generated ${guides.length * 2} guide pages.`);
