const fs = require('fs');
const path = require('path');
const { icon } = require('./js/icons.js');

function criticalCss() {
  return [
    '@font-face{font-family:Inter;src:url(/fonts/Inter.woff2) format("woff2");font-display:optional;font-weight:400 900;font-style:normal}',
    '*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}',
    ':root{--accent:#3b82f6;--accent-dark:#2563eb;--accent-light:#dbeafe;--accent-glow:rgba(59,130,246,0.2);--accent-glow-strong:rgba(59,130,246,0.35);--bg:#0d0d0d;--bg-secondary:#141414;--bg-card:#1a1a1a;--bg-card-hover:#222;--surface:#1e1e1e;--surface-light:#2a2a2a;--border:#2a2a2a;--border-light:#333;--text:#f0f0f0;--text-secondary:#a0a0a0;--text-muted:#909090;--white:#fff;--shadow-sm:0 1px 3px rgba(0,0,0,.3);--shadow:0 4px 12px rgba(0,0,0,.4);--shadow-md:0 8px 24px rgba(0,0,0,.5);--shadow-lg:0 16px 40px rgba(0,0,0,.5);--shadow-xl:0 24px 60px rgba(0,0,0,.6);--radius-sm:6px;--radius:10px;--radius-lg:14px;--radius-xl:18px;--transition:.25s cubic-bezier(.4,0,.2,1)}',
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
    '.header-social-link{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;color:var(--text-muted);font-size:15px;text-decoration:none}',
    '.lang-btn{padding:5px 9px;border-radius:5px;border:1px solid var(--border);background:transparent;color:var(--text-muted);font-size:11px;font-weight:700;font-family:inherit;cursor:pointer;letter-spacing:.3px;text-transform:uppercase}',
    '.lang-btn.active{background:rgba(255,255,255,.1);border-color:var(--white);color:var(--white)}',
    '.nav-link{padding:8px 14px;border-radius:6px;color:var(--text-secondary);font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;background:transparent;border:none;font-family:inherit;letter-spacing:.3px}',
    '.nav-link.active{color:var(--accent);background:rgba(59,130,246,.1)}',
    'body>*:not(header):not(.bg-hero):not(#cookie-banner):not(#toast){position:relative;z-index:2}',
    '.bg-hero{display:block;position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;object-fit:cover;opacity:.18}',
    '.hero{position:relative;z-index:2;overflow:hidden;padding:0 32px 80px;min-height:80vh;box-shadow:inset 0 0 120px 60px rgba(0,0,0,.45)}',
    '.hero-inner{max-width:900px;margin:0 auto;position:relative;z-index:1;text-align:center}',
    '.hero-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(59,130,246,.12);border:1px solid rgba(59,130,246,.25);color:var(--accent);padding:6px 16px;border-radius:50px;font-size:12px;font-weight:700;margin-bottom:16px;letter-spacing:.5px;text-transform:uppercase}',
    '.hero h1{font-size:clamp(34px,6vw,64px);font-weight:900;line-height:1.05;color:var(--white);margin-bottom:20px;letter-spacing:-1.5px}',
    '.hero h1 span{background:linear-gradient(135deg,var(--accent),#60a5fa,#93c5fd);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}',
    '.hero p{font-size:clamp(16px,2vw,19px);color:var(--text-secondary);max-width:600px;margin:0 auto 32px;line-height:1.7}',
    '.hero-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}',
    '.btn-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--accent),#60a5fa);color:#fff;padding:14px 32px;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none}',
    '.btn-secondary{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);color:var(--white);padding:14px 32px;border-radius:50px;font-weight:600;font-size:15px;text-decoration:none;border:1px solid rgba(255,255,255,.1)}',
    '.hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;padding:8px;cursor:pointer;position:relative;z-index:102}',
    '.hamburger span{width:22px;height:2px;background:var(--text-secondary);border-radius:2px}',
    '.mobile-nav{display:flex;flex-direction:column;gap:4px;position:fixed;top:0;right:16px;padding-top:16px;z-index:101;opacity:0;pointer-events:none}',
    '.mobile-nav.open{opacity:1;pointer-events:auto}',
    '.static-guide{max-width:900px;margin:0 auto;padding:100px 24px 60px}',
    '.static-guide h1{font-size:2rem;margin-bottom:24px;color:var(--text)}',
    '.static-guide .guide-detail-img{margin-bottom:32px}',
    '.static-guide .guide-detail-img img{width:100%;max-height:400px;object-fit:cover;border-radius:var(--radius-lg)}',
    '.static-guide .guide-detail-intro{font-size:1.1rem;line-height:1.7;color:var(--text-secondary);margin-bottom:40px}',
    '.static-guide .guide-section{margin-bottom:40px}',
    '.static-guide .guide-back-link{display:inline-flex;align-items:center;gap:8px;color:var(--accent);margin-bottom:32px;font-weight:500;text-decoration:none}',
    '.static-guide .guide-back-link:hover{text-decoration:underline}',
    '.static-guide .lang-toggle{text-align:right;margin-bottom:16px}',
    '.static-guide .lang-toggle a{color:var(--accent);text-decoration:none;font-weight:500}',
    '.static-guide .lang-toggle a:hover{text-decoration:underline}',
    '@media(max-width:768px){.header-social{display:none}.header-tagline-bar{font-size:13px;padding:2px 12px}.hamburger{display:flex}}',
    '#cookie-banner.cookie-visible{transform:translateY(0)}',
  ].join('');
}

// ===== LOAD DATA =====
const dir = __dirname;

// Eval-import products.js and guides.js
eval(fs.readFileSync(path.join(dir, 'js', 'products.js'), 'utf8').replace(/^const /gm, 'var '));
eval(fs.readFileSync(path.join(dir, 'js', 'guides.js'), 'utf8').replace(/^const /gm, 'var '));

const storeColorsBuild = {
  thomann: "#3b82f6", pluginboutique: "#6366f1", gear4music: "#8b5cf6",
  sweetwater: "#6b7280", musikproduktiv: "#78716c", amazon: "#ff9900", reverb: "#d6562b",
  baxmusic: "#c30067", musicstore: "#1a3a5c", fender: "#000000", andertons: "#000000"
};

function trunc(s, max) {
  if (!s || s.length <= max) return s || '';
  var i = s.lastIndexOf(' ', max);
  return s.substring(0, i > 0 ? i : max) + '...';
}

function getResolvedStores(product) {
  const s = {};
  Object.entries(product.stores).forEach(([key, url]) => {
    if (key === 'gear4music' && url === 'https://www.gear4music.com/search') {
      s[key] = `https://www.gear4music.com/search?q=${encodeURIComponent(product.title)}`;
    } else if (key === 'musikproduktiv' && url === 'https://www.musik-produktiv.de/search') {
      s[key] = `https://www.musik-produktiv.de/`;
    } else if (key === 'andertons' && !url.includes('irgwc=')) {
      s[key] = url + (url.includes('?') ? '&' : '?') + 'irgwc=1&irpid=7292297';
    } else {
      s[key] = url;
    }
  });
  if (product.category !== 'plugins' && product.category !== 'tres') {
    s.amazon = `https://www.amazon.com/s?k=${encodeURIComponent(product.title)}&tag=topmusicg-20`;
    if (product.stores.amazon && product.stores.amazon.startsWith('https://www.amazon.com/dp/')) {
      s.amazon = product.stores.amazon + '?tag=topmusicg-20';
    }
  }
  s.reverb = `https://reverb.com/marketplace?query=${encodeURIComponent(product.title)}`;
  if (!s.musicstore) {
    var searchUrl = `https://www.musicstore.com/en_GB/search?SearchText=${encodeURIComponent(product.title)}`;
    s.musicstore = `https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=${encodeURIComponent(searchUrl)}`;
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

function productCard(p, lang) {
  const title = lang === 'es' && p.title_es ? p.title_es : p.title;
  const desc = lang === 'es' && p.desc_es ? p.desc_es : p.desc;
  const stores = Object.entries(getResolvedStores(p)).map(([key, url]) => {
    let iconHtml = '';
    if (key === 'thomann') iconHtml = '<span class="icon"><img src="../img/thomann-icon.png" alt="Thomann" class="store-icon-img"></span>';
    else if (key === 'sweetwater') iconHtml = '<span class="icon"><img src="../img/sweetwater-icon.png" alt="Sweetwater" class="store-icon-img"></span>';
    else if (key === 'gear4music') iconHtml = '<span class="icon"><img src="../img/gear4music-icon.png" alt="Gear4Music" class="store-icon-img"></span>';
    else if (key === 'pluginboutique') iconHtml = '<span class="icon"><img src="../img/pluginboutique-icon.png" alt="Plugin Boutique" class="store-icon-img"></span>';
    else if (key === 'musikproduktiv') iconHtml = '<span class="icon"><img src="../img/musikproduktiv-icon.png" alt="Musik Produktiv" class="store-icon-img" style="width:28px"></span>';
    else if (key === 'amazon') iconHtml = '<span class="icon" style="font-size:15px;">' + icon('amazon', 'fa-brands') + '</span>';
    else if (key === 'reverb') iconHtml = '<span class="icon"><span style="font-weight:900;font-size:14px;line-height:1;display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;background:#d6562b;color:#fff;border-radius:2px;vertical-align:middle;">R</span></span>';
    else if (key === 'musicstore') iconHtml = '<span class="icon"><img src="../img/musicstore-icon.png" alt="Music Store" class="store-icon-img"></span>';
    else if (key === 'baxmusic') iconHtml = '<span class="icon"><img src="../img/baxmusic-icon.svg" alt="Bax Music" class="store-icon-img"></span>';
    else if (key === 'fender') iconHtml = '<span class="icon"><img src="../img/fender-icon.svg" alt="Fender" class="store-icon-img" style="width:16px;height:16px"></span>';
    else if (key === 'andertons') iconHtml = '<span class="icon"><span style="font-weight:900;font-size:14px;line-height:1;display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;background:#000;color:#fff;border-radius:2px;vertical-align:middle;">A</span></span>';
    const name = key.charAt(0).toUpperCase() + key.slice(1);
    return `<a href="${url}" target="_blank" rel="noopener noreferrer sponsored" class="chip-store" style="background:${storeColorsBuild[key] || '#555'}">${iconHtml} ${name}</a>`;
  }).join("");
  return `<div class="guide-product-card">
    <div class="guide-product-card-img"><img src="${p.img.startsWith('http') ? p.img : '../' + p.img}" alt="${title}" loading="lazy"></div>
    <div class="guide-product-card-body">
      <div class="guide-product-card-title">${title}</div>
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
  var mod = guide.dateModified || pub;
  return { published: pub, modified: mod };
}

function buildGuidePage(guide, lang, idx) {
  const isEs = lang === 'es';
  const title = isEs && guide.title_es ? guide.title_es : guide.title;
  const intro = isEs && guide.intro_es ? guide.intro_es : guide.intro;
  const conclusion = isEs && guide.conclusion_es ? guide.conclusion_es : guide.conclusion;
  const verdict = isEs && guide.verdict_es ? guide.verdict_es : guide.verdict;
  const image = guide.image || '../img/og-image.png';
  const fullImage = guide.image && guide.image.startsWith('http') ? guide.image : 'https://topmusiciangear.com/' + (guide.image || 'img/og-image.png');
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
    const c = isEs && s.content_es ? s.content_es : s.content;
    const secProductIds = s.products || [];
    const secCards = secProductIds.map(pid => {
      const p = products.find(pr => pr.id === pid);
      return p ? productCard(p, lang) : '';
    }).join('');
    return `<div class="guide-section">
      <h2 class="guide-section-heading">${h}</h2>
      <div class="guide-section-content">${c}</div>
      ${secCards ? `<div class="guide-products-inline">${secCards}</div>` : ''}
    </div>`;
  }).join('');

  var dPub = guideDates(guide, idx).published, dMod = guideDates(guide, idx).modified;
  ogMeta = `  <meta property="og:type" content="article">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${trunc(intro, 200).replace(/"/g, '&quot;')}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${fullImage}">
  <meta property="og:image:width" content="600">
  <meta property="og:image:height" content="400">
  <meta property="og:site_name" content="TopMusicianGear">
  <meta property="og:locale" content="${isEs ? 'es_ES' : 'en_US'}">
  <meta property="article:published_time" content="${dPub}">
  <meta property="article:modified_time" content="${dMod}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${trunc(intro, 200).replace(/"/g, '&quot;')}">
  <meta name="twitter:image" content="${fullImage}">`;

  // JSON-LD
  const ldArticle = {
    "@context": "https://schema.org", "@type": "Article",
    "headline": title,
    "description": trunc(intro, 200),
    "author": { "@type": "Person", "name": "Daniel" },
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
          "description": trunc(isEs && p.desc_es ? p.desc_es : p.desc, 200),
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
      tres: [
        { q: "What is a Cuban tres guitar?", q_es: "¿Qué es un tres cubano?", a: "The Cuban tres is a three-course, six-string guitar that originated in eastern Cuba and is the defining instrument of son cubano and traditional Cuban music. It has three pairs of strings (courses), typically tuned GGG-EEE-CCC or in a similar open tuning, giving it a bright, rhythmic sound that cuts through a mix.", a_es: "El tres cubano es una guitarra de tres órdenes y seis cuerdas originaria del oriente de Cuba, instrumento definitorio del son cubano. Tiene tres pares de cuerdas afinadas típicamente en GGG-EEE-CCC." },
        { q: "What is the best Cuban tres for recording?", q_es: "¿Cuál es el mejor tres cubano para grabación?", a: "The best Cuban tres for recording combines good projection with stable tuning. The Thomann Tres Cubano is the most accessible quality option for most players. Handmade tres from Cuban luthiers offer superior craftsmanship but can be harder to source outside Cuba. Look for solid wood construction and reliable tuning machines.", a_es: "El mejor tres cubano para grabación combina buena proyección con afinación estable. El Thomann Tres Cubano es la opción accesible de calidad. Los tres artesanales de lutieres cubanos ofrecen artesanía superior." },
        { q: "How is a Cuban tres tuned?", q_es: "¿Cómo se afina un tres cubano?", a: "The standard Cuban tres tuning is G (low), G (low), E, E, C, C — from lowest to highest string. The three courses are: first course (C4, C4), second course (E3, E3), third course (G3, G3). Some players use variations like A-A, F-F, D-D or D-D, B-B, G-G depending on the musical style.", a_es: "La afinación estándar del tres cubano es G (grave), G (grave), E, E, C, C — de la cuerda más grave a la más aguda. Algunos músicos usan variaciones según el estilo musical." },
        { q: "Is the Cuban tres difficult to learn?", q_es: "¿Es difícil aprender a tocar el tres cubano?", a: "The Cuban tres has a learning curve, especially for guitarists who need to unlearn standard guitar techniques. The rhythmic strumming patterns (guajeos) and open tuning require practice. However, guitarists typically adapt within a few months of dedicated practice. The tres is very rewarding once you grasp its unique rhythmic vocabulary.", a_es: "El tres cubano tiene una curva de aprendizaje, especialmente para guitarristas que necesitan desaprender técnicas estándar. Los patrones rítmicos (guajeos) requieren práctica. Sin embargo, los guitarristas suelen adaptarse en pocos meses." },
        { q: "What is the difference between a tres and a guitar?", q_es: "¿Cuál es la diferencia entre un tres y una guitarra?", a: "The tres has six strings arranged as three pairs (courses), while a standard guitar has six individual strings. The tres uses open tunings (typically GGG-EEE-CCC) versus standard guitar tuning (EADGBE). The tres body is smaller, and it's played with a distinctive syncopated strumming technique called guajeo, fundamental to Cuban son music.", a_es: "El tres tiene seis cuerdas en tres pares (órdenes), mientras que la guitarra tiene seis cuerdas individuales. El tres usa afinaciones abiertas y un cuerpo más pequeño, tocado con la técnica distintiva de guajeo." }
      ]
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
  <meta name="description" content="${trunc(intro, 200).replace(/"/g, '&quot;')}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="en" href="${alternateEn}">
  <link rel="alternate" hreflang="es" href="${alternateEs}">
${ogMeta}
  <style>${criticalCss()}</style>
  <link rel="preload" as="style" href="/css/style.css?v=19" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/css/style.css?v=19"></noscript>
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
</head>
<body style="margin:0;padding:0;">
  <a href="#mainContent" class="skip-link">Skip to main content</a>

  <picture>
    <source srcset="/img/me-600.webp 600w, /img/me-900.webp 900w, /img/me.webp 1455w" sizes="100vw" type="image/webp">
    <img class="bg-hero" src="/img/me.jpg" alt="" fetchpriority="low" width="1455" height="1806">
  </picture>

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
      <div class="header-right">
        <div class="header-social">
          <a href="https://www.youtube.com/@Cuban3Beats" target="_blank" rel="noopener" class="header-social-link" title="YouTube">${icon('youtube', 'fa-brands')}</a>
          <a href="https://open.spotify.com/artist/3HMtcts1AYCzkI4pBQKRzX" target="_blank" rel="noopener" class="header-social-link" title="Spotify">${icon('spotify', 'fa-brands')}</a>
          <a href="https://www.tiktok.com/@cuban3beats" target="_blank" rel="noopener" class="header-social-link" title="TikTok">${icon('tiktok', 'fa-brands')}</a>
          <a href="https://www.facebook.com/Cuban3Beats/" target="_blank" rel="noopener" class="header-social-link" title="Facebook">${icon('facebook-f', 'fa-brands')}</a>
          <a href="https://www.instagram.com/cuban3beats" target="_blank" rel="noopener" class="header-social-link" title="Instagram">${icon('instagram', 'fa-brands')}</a>
          <a href="https://soundbetter.com/profiles/721440-daniel-carnago" target="_blank" rel="noopener" class="header-social-link" title="SoundBetter"><img src="https://d2p6ecj15pyavq.cloudfront.net/assets/SoundBetterBadge-c84cb3e75c4267f5bee41f7f617a81d9.svg" alt="SoundBetter" class="sb-icon"></a>
        </div>
        <div class="lang-switcher">
          <a href="${isEs ? `/guides/${guide.id}.html` : '#'}" class="lang-btn ${isEs ? '' : 'active'}">EN</a>
          <a href="${isEs ? '#' : `/guides/${guide.id}_es.html`}" class="lang-btn ${isEs ? 'active' : ''}">ES</a>
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
    <div class="static-guide">
      <div class="lang-toggle">
        <a href="${isEs ? `/guides/${guide.id}.html` : `/guides/${guide.id}_es.html`}">${isEs ? 'English' : 'Español'}</a>
      </div>
      <nav class="guide-breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> / <a href="/">${isEs ? 'Guías' : 'Guides'}</a> / <span>${title}</span>
      </nav>
      <a href="/" class="guide-back-link">${icon('arrow-left', 'fa-solid')} ${isEs ? 'Todas las Guías' : 'Back to All Guides'}</a>
      <h1>${title}</h1>
      <div class="guide-detail-img"><img src="${fullImage}" alt="${title}"></div>
      <div class="guide-detail-intro"><p>${intro}</p></div>
      <div class="guide-detail-sections">${sectionsHtml}</div>
      <div class="guide-verdict">
        <span class="verdict-label">${isEs ? 'Veredicto' : 'Verdict'}: </span>
        <span class="verdict-text">${verdict}</span>
      </div>
      <div class="guide-conclusion">
        <h2 class="guide-conclusion-title">${isEs ? 'Conclusión' : 'Final Thoughts'}</h2>
        <p>${conclusion}</p>
      </div>
      <div class="guide-related">
        <h2 class="guide-related-title">${isEs ? 'Guías Relacionadas' : 'Related Guides'}</h2>
        <div class="guide-related-list">
          ${(function(){ var r = guides.filter(g => g.id !== guide.id && g.category === guide.category); if (!r.length) r = guides.filter(g => g.id !== guide.id); return r.slice(0, 4).map(g => { var gt = isEs && g.title_es ? g.title_es : g.title; return '<a href="/guides/' + g.id + '.html" class="guide-related-link">' + gt + '</a>'; }).join(''); })()}
        </div>
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
        </ul>
      </div>
      <div class="footer-col">
        <h3>${isEs ? 'Categorías' : 'Categories'}</h3>
        <ul>
          <li><a href="/#guides">${isEs ? 'Guías' : 'Guides'}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>${isEs ? 'Legal' : 'Legal'}</h3>
        <ul>
          <li><a href="/privacy-policy.html">${isEs ? 'Política de Privacidad' : 'Privacy Policy'}</a></li>
          <li><a href="/terms.html">${isEs ? 'Términos de Servicio' : 'Terms of Service'}</a></li>
          <li><a href="/cookie-policy.html">${isEs ? 'Política de Cookies' : 'Cookie Policy'}</a></li>
          <li><a href="/affiliate-disclosure.html">${isEs ? 'Divulgación de Afiliados' : 'Affiliate Disclosure'}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} TopMusicianGear. All rights reserved. ${isEs ? 'Creado por un músico, para músicos.' : 'Built by a musician, for musicians.'}</p>
    </div>
  </footer>

  <script defer src="/js/translations.js?v=4"></script>
<script>(function(){var b=document.getElementById('cookie-banner');if(!b)return;var m=document.getElementById('cookie-modal');var c=null;var Y=31536000000;if(window.location.search.indexOf('reset-cookies')>-1)try{localStorage.removeItem('cookiePrefs')}catch(e){}try{c=JSON.parse(localStorage.getItem('cookiePrefs')||'null')}catch(e){}if(c&&c._ts&&Date.now()-c._ts>Y)c=null;if(!c){b.style.display='flex'}else{b.style.display='none'}function loadAnalytics(){if(!document.getElementById('ga-script')){var s=document.createElement('script');s.src='https://www.googletagmanager.com/gtag/js?id=G-0752B4SE9L';s.id='ga-script';s.async=true;document.head.appendChild(s);s.onload=function(){window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-0752B4SE9L',{anonymize_ip:true})}}}function loadAds(){if(!document.getElementById('adsense-script')){var s=document.createElement('script');s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8217554001389543';s.id='adsense-script';s.async=true;s.crossOrigin='anonymous';document.head.appendChild(s)}}
function loadAffiliate(){if(!document.getElementById('impact-script')){var s=document.createElement('script');s.src='https://utt.impactcdn.com/P-A7292297-bda5-4465-a26a-2017d1cc16b51.js';s.id='impact-script';s.async=true;document.body.appendChild(s);window.impactStat=function(){}}}
function applyPrefs(p){if(p.analytics)loadAnalytics();if(p.ads)loadAds();if(p.affiliate)loadAffiliate()}
window.cookieAccept=function(){try{var p={essential:true,analytics:true,ads:true,affiliate:true,_ts:Date.now()};localStorage.setItem('cookiePrefs',JSON.stringify(p))}catch(e){}if(b)b.style.display='none';if(m)m.style.display='none';applyPrefs(p)}
window.cookieDecline=function(){try{var p={essential:true,analytics:false,ads:false,affiliate:false,_ts:Date.now()};localStorage.setItem('cookiePrefs',JSON.stringify(p))}catch(e){}if(b)b.style.display='none';if(m)m.style.display='none'}
window.cookiePrefs=function(){if(m)m.style.display='flex';try{var s=JSON.parse(localStorage.getItem('cookiePrefs')||'null')||{essential:true,analytics:true,ads:true,affiliate:true};var ca=document.getElementById('cm-analytics');if(ca)ca.checked=s.analytics;var ca2=document.getElementById('cm-ads');if(ca2)ca2.checked=s.ads;var ca3=document.getElementById('cm-affiliate');if(ca3)ca3.checked=s.affiliate}catch(e){}}
window.cookieSave=function(){try{var p={essential:true,analytics:document.getElementById('cm-analytics')?.checked??false,ads:document.getElementById('cm-ads')?.checked??false,affiliate:document.getElementById('cm-affiliate')?.checked??false,_ts:Date.now()};localStorage.setItem('cookiePrefs',JSON.stringify(p))}catch(e){}if(b)b.style.display='none';if(m)m.style.display='none';applyPrefs(p)}})();
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

console.log(`\nDone! Generated ${guides.length * 2} guide pages.`);
