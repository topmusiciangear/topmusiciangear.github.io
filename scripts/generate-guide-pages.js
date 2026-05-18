const fs = require('fs');
const path = require('path');

// Load guides
const guidesCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'guides.js'), 'utf8');
eval(guidesCode.replace('const guides', 'var guides'));

// Load products
const productsCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'products.js'), 'utf8');
eval(productsCode.replace('const products', 'var products'));
const storeNamesMatch = productsCode.match(/const storeNames = \{[\s\S]*?\};/);
const storeColorsMatch = productsCode.match(/const storeColors = \{[\s\S]*?\};/);
const storeIconsMatch = productsCode.match(/const storeIcons = \{[\s\S]*?\};/);
if (storeNamesMatch) eval(storeNamesMatch[0].replace('const storeNames', 'var storeNames'));
if (storeColorsMatch) eval(storeColorsMatch[0].replace('const storeColors', 'var storeColors'));
if (storeIconsMatch) eval(storeIconsMatch[0].replace('const storeIcons', 'var storeIcons'));

const allStoreKeys = ['thomann','pluginboutique','gear4music','sweetwater','musikproduktiv','amazon','reverb','andertons','baxmusic','musicstore','fender'];

function getResolvedStores(product) {
  const searchUrls = {
    thomann: (t) => `https://www.thomann.co.uk/search?q=${encodeURIComponent(t)}`,
    pluginboutique: (t) => `https://www.pluginboutique.com/search?q=${encodeURIComponent(t)}&a_aid=6a01e859cbe1a`,
    gear4music: (t) => `https://www.gear4music.com/search?q=${encodeURIComponent(t)}`,
    sweetwater: (t) => `https://www.sweetwater.com/store/search.php?s=${encodeURIComponent(t)}`,
    musikproduktiv: (t) => `https://www.musik-produktiv.de/`,
    amazon: (t) => `https://www.amazon.com/s?k=${encodeURIComponent(t)}&tag=topmusicg-20`,
    reverb: (t) => `https://reverb.com/marketplace?query=${encodeURIComponent(t)}`,
    andertons: (t) => `https://www.andertons.co.uk/search.php?search_query=${encodeURIComponent(t)}&irgwc=1&irpid=7292297`,
    baxmusic: (t) => `https://www.bax-shop.co.uk/complete-assortment?keyword=${encodeURIComponent(t)}`,
    musicstore: (t) => `https://www.musicstore.com/en_GB/search?SearchText=${encodeURIComponent(t)}`,
    fender: (t) => `https://www.fender.com/en-GB/search?q=${encodeURIComponent(t)}`
  };
  const s = {};
  allStoreKeys.forEach(key => {
    if (key === 'amazon' && (product.category === 'plugins' || product.category === 'tres')) return;
    const specificUrl = product.stores && product.stores[key];
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
  return s;
}

const OUT_DIR = path.join(__dirname, '..', 'guides');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderProductCard(p) {
  const name = p.title;
  const desc = (p.desc || '').substring(0, 150);
  const stores = Object.entries(getResolvedStores(p)).map(([key, url]) =>
    `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer sponsored" class="chip-store" style="background:${storeColors[key] || '#555'}"><span class="icon">${storeIcons[key] || ''}</span> ${storeNames[key] || key}</a>`
  ).join('');
  return `<div class="product-card">
    <div class="product-card-img"><img src="${esc(p.img)}" alt="${esc(name)}" width="400" height="400" loading="lazy"></div>
    <div class="product-card-body">
      <h4 class="product-card-title">${esc(name)}</h4>
      <div class="product-card-price">$${p.price}</div>
      <div class="product-card-rating">${'★'.repeat(Math.round(p.rating || 0))} (${p.reviews || 0})</div>
      <div class="product-card-desc">${esc(desc)}</div>
      <div class="guide-product-card-stores">${stores}</div>
    </div>
  </div>`;
}

function todayLocal() {
  return new Date().toLocaleDateString('en-CA');
}
function todayDisplay() {
  return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function generateSchema(g, allProductIds, products, lang) {
  const suffix = lang === 'es' ? '_es' : '';
  const url = `https://topmusiciangear.com/guides/${g.id}${suffix}.html`;
  const imgUrl = g.image || '';
  const title = lang === 'es' && g.title_es ? g.title_es : g.title;
  const desc = (lang === 'es' && g.intro_es ? g.intro_es : g.intro || '').substring(0, 300);

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": url + "#article",
    "headline": title,
    "description": desc,
    "image": imgUrl,
    "author": { "@type": "Person", "name": "Daniel Carnago", "url": "https://topmusiciangear.com" },
    "datePublished": "2026-01-15",
    "dateModified": todayLocal(),
    "mainEntityOfPage": { "@type": "WebPage", "@id": url }
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": url + "#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://topmusiciangear.com/" },
      { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://topmusiciangear.com/" },
      { "@type": "ListItem", "position": 3, "name": title, "item": url }
    ]
  };

  const productSchemas = allProductIds.map(id => {
    const p = products.find(x => x.id === id);
    if (!p) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": url + "#product-" + p.id,
      "name": p.title,
      "image": p.img || imgUrl,
      "description": (p.desc || '').substring(0, 300),
      "brand": p.brand ? { "@type": "Brand", "name": p.brand } : undefined,
      "offers": {
        "@type": "Offer",
        "price": String(p.price),
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": p.rating ? {
        "@type": "AggregateRating",
        "ratingValue": String(p.rating),
        "reviewCount": p.reviews || 0,
        "bestRating": "5"
      } : undefined
    };
  }).filter(Boolean);

  const faqItems = g.sections.map(s => {
    const heading = lang === 'es' && s.heading_es ? s.heading_es : s.heading;
    const content = lang === 'es' && s.content_es ? s.content_es : s.content;
    return {
      "@type": "Question",
      "name": heading,
      "acceptedAnswer": { "@type": "Answer", "text": content.substring(0, 500) }
    };
  });

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": url + "#faq",
    "mainEntity": faqItems
  };

  return { article, breadcrumb, productSchemas, faq };
}

function renderGuidePage(g, lang) {
  const suffix = lang === 'es' ? '_es' : '';
  const isEs = lang === 'es';
  const title = isEs && g.title_es ? g.title_es : g.title;
  const desc = (isEs && g.intro_es ? g.intro_es : g.intro || '').substring(0, 200);
  const img = g.image || '';
  const allProductIds = [...new Set(g.sections.flatMap(s => s.products || []))];
  const productsHtml = allProductIds.map(id => {
    const p = products.find(x => x.id === id);
    return p ? renderProductCard(p) : '';
  }).filter(Boolean).join('');

  const schema = generateSchema(g, allProductIds, products, lang);

  const sectionsHtml = g.sections.map(s => {
    const heading = isEs && s.heading_es ? s.heading_es : s.heading;
    const content = isEs && s.content_es ? s.content_es : s.content;
    return `<div class="guide-section">
      <h2 class="guide-section-heading">${esc(heading)}</h2>
      <div class="guide-section-content">${content}</div>
    </div>`;
  }).join('');

  const crossLinks = (g.relatedGuides || []).map(id => {
    const rg = guides.find(rg => rg.id === id);
    return rg ? `<a href="/guides/${id}${suffix}.html" data-guide="${id}">${esc(isEs && rg.title_es ? rg.title_es : rg.title)}</a>` : '';
  }).filter(Boolean);
  const crossLinksText = isEs ? 'También lee' : 'Also read';
  const crossLinksHtml = crossLinks.length ? `<p class="guide-crosslinks">${crossLinksText}: ${crossLinks.join(', ')}.</p>` : '';

  const backText = isEs ? 'Volver a Guías' : 'Back to Guides';
  const verdictLabel = isEs ? 'Veredicto' : 'Verdict';
  const productsTitle = isEs ? 'Productos en esta Guía' : 'Products in this Guide';
  const finalThoughts = isEs ? 'Pensamientos Finales' : 'Final Thoughts';
  const interactiveText = isEs ? 'Ver Guía Interactiva' : 'View Interactive Guide';
  const authorLine = isEs
    ? 'Por <strong>Daniel Carnago</strong> — Más de 20 años en el escenario y el estudio · Actualizado ' + todayDisplay()
    : 'By <strong>Daniel Carnago</strong> — 20+ years on stage and in the studio · Updated ' + todayDisplay();
  const navGuides = isEs ? 'Guías' : 'Guides';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <script>window.location.replace('/?g=${g.id}${isEs ? '&lang=es' : ''}')</script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#0d0d0d">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://thumbs.static-thomann.de">
  <link rel="preconnect" href="https://media.sweetwater.com">
  <link rel="preconnect" href="https://m.media-amazon.com">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com">
  <link rel="dns-prefetch" href="https://reverb.com">
  <link rel="dns-prefetch" href="https://www.gear4music.com">
  <link rel="dns-prefetch" href="https://www.pluginboutique.com">
  <link rel="dns-prefetch" href="https://valhalladsp.com">
  <link rel="dns-prefetch" href="https://images.unsplash.com">
  <title>${esc(title)} | TopMusicianGear</title>
  <meta name="description" content="${esc(desc)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="${esc(img)}">
  <meta property="og:url" content="https://topmusiciangear.com/guides/${g.id}${suffix}.html">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="TopMusicianGear">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="https://topmusiciangear.com/guides/${g.id}${suffix}.html">
  <link rel="alternate" hreflang="en" href="https://topmusiciangear.com/guides/${g.id}.html">
  <link rel="alternate" hreflang="es" href="https://topmusiciangear.com/guides/${g.id}_es.html">
  <link rel="alternate" hreflang="x-default" href="https://topmusiciangear.com/guides/${g.id}.html">
  <link rel="stylesheet" href="../css/style.css?v=13">
  <link rel="icon" type="image/png" sizes="48x48" href="../img/favicon.png?v=2">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    *, html, body, header { margin:0; padding:0; background:#0d0d0d; }
    .guide-detail-static { padding: 20px 0; }
    .guide-detail-static .guide-back-row { margin-bottom: 20px; }
    .guide-detail-static .guide-detail-header h1 { font-size: 28px; margin-bottom: 16px; }
    .guide-detail-static .guide-detail-img { margin-bottom: 20px; border-radius: 12px; overflow: hidden; }
    .guide-detail-static .guide-detail-img img { width: 100%; display: block; }
    .guide-detail-static .guide-detail-intro { font-size: 15px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 30px; }
    .guide-detail-static .guide-section { margin-bottom: 24px; }
    .guide-detail-static .guide-section-heading { font-size: 18px; color: var(--accent); margin-bottom: 8px; cursor: pointer; user-select: none; }
    .guide-section-heading::after { content: ' ▾'; font-size: 11px; margin-left: 6px; }
    .guide-section.collapsed .guide-section-heading::after { content: ' ▸'; }
    .guide-section.collapsed .guide-section-content { display: none; }
    .guide-detail-static .guide-section-content { font-size: 14px; line-height: 1.8; color: var(--text-secondary); }
    .guide-products-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin: 20px 0; }
    .product-card { background: var(--card-bg); border-radius: 12px; border: 1px solid var(--border); overflow: hidden; }
    .product-card-img { width: 100%; aspect-ratio: 1; overflow: hidden; }
    .product-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .product-card-title { font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
    .product-card-price { font-size: 14px; font-weight: 600; color: var(--accent); margin-bottom: 4px; }
    .product-card-rating { font-size: 12px; color: #f59e0b; margin-bottom: 6px; }
    .product-card-body { padding: 12px; display: flex; flex-direction: column; }
    .product-card-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.5; }
    .guide-product-card-stores { display: flex; gap: 4px; margin-top: auto; padding-top: 8px; flex-wrap: wrap; }
    .chip-store { display: inline-flex; align-items: center; justify-content: center; gap: 4px; min-width: 120px; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; color: white; text-decoration: none; transition: opacity 0.1s ease; -webkit-tap-highlight-color: transparent; }
    .chip-store:hover { opacity: .85; }
    .chip-store:active { transform: scale(0.9); opacity: 0.6; filter: brightness(1.4); transition: none !important; }
    .chip-store .icon { display: flex; align-items: center; }
    .store-icon-img { width: 16px; height: 16px; vertical-align: middle; display: inline-block; object-fit: contain; }
    .guide-verdict { margin: 24px 0; padding: 16px; background: var(--card-bg); border-radius: 12px; border: 1px solid var(--accent); }
    .verdict-label { font-size: 12px; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px; }
    .verdict-text { font-size: 15px; font-weight: 600; color: var(--text-primary); }
    .guide-conclusion { margin: 24px 0; padding: 20px; background: var(--card-bg); border-radius: 12px; }
    .guide-conclusion h3 { font-size: 18px; color: var(--text-primary); margin-bottom: 8px; }
    .guide-conclusion p { font-size: 14px; color: var(--text-secondary); line-height: 1.8; }
    .guide-breadcrumbs { font-size: 12px; color: var(--text-muted); margin: 8px 0 2px; }
    .breadcrumb-sep { margin: 0 6px; color: var(--text-muted); }
    .breadcrumb-current { color: var(--accent); }
    .guide-author-line { font-size: 12px; color: var(--text-muted); margin: 4px 0 12px; line-height: 1.5; }
    .guide-author-line strong { color: var(--text-primary); }
    .guide-crosslinks { margin-top: 12px; font-size: 13px; color: var(--text-secondary); line-height: 1.7; }
    .guide-crosslinks a { color: var(--accent); text-decoration: underline; }
  </style>
  <script type="application/ld+json">${JSON.stringify(schema.article)}</script>
  <script type="application/ld+json">${JSON.stringify(schema.breadcrumb)}</script>
  <script type="application/ld+json">${JSON.stringify(schema.faq)}</script>
  ${schema.productSchemas.map(ps => `<script type="application/ld+json">${JSON.stringify(ps)}</script>`).join('\n  ')}
</head>
<body style="margin:0;padding:0">
  <div id="app">
    <header class="site-header">
      <div class="header-inner">
        <a href="../" class="logo-link"><span class="logo-icon"><img src="../img/favicon.png?v=2" alt="TopMusicianGear" style="width:36px;height:36px;border-radius:8px"></span><span class="logo-text">TopMusicianGear</span></a>
        <nav>
          <a href="../" class="nav-link">${navGuides}</a>
        </nav>
        <div id="langSwitcher"></div>
      </div>
    </header>
    <main>
      <div id="guideGrid" style="display:block">
        <div id="guideContainer" class="guide-detail-open">
          <div class="guide-detail-static">
            <div class="guide-back-row">
              <a href="../" class="guide-back-btn"><i class="fa-solid fa-arrow-left"></i> ${backText}</a>
            </div>
            <div class="guide-detail-header">
              <h1 class="guide-detail-title">${esc(title)}</h1>
              <div class="guide-breadcrumbs"><a href="../">Home</a> <span class="breadcrumb-sep">›</span> <a href="../">${navGuides}</a> <span class="breadcrumb-sep">›</span> <span class="breadcrumb-current">${esc(title)}</span></div>
              <div class="guide-author-line">${authorLine}</div>
            </div>
            <div class="guide-detail-img"><img src="${esc(img)}" alt="${esc(title)}" width="2100" height="900"></div>
            <div class="guide-detail-intro"><p>${isEs ? g.intro_es || g.intro : g.intro || ''}</p></div>
            <div class="guide-detail-sections">${sectionsHtml}</div>
            ${(() => {
              const v = isEs && g.verdict_es ? g.verdict_es : g.verdict;
              return v ? `<div class="guide-verdict"><span class="verdict-label">${verdictLabel}</span><span class="verdict-text">${esc(v)}</span></div>` : '';
            })()}
            ${productsHtml ? `<div class="guide-products-grid"><h3 class="guide-products-title">${productsTitle}</h3><div class="guide-products-cards">${productsHtml}</div></div>` : ''}
            ${(() => {
              const c = isEs && g.conclusion_es ? g.conclusion_es : g.conclusion;
              return c ? `<div class="guide-conclusion"><h3>${finalThoughts}</h3><p>${c}</p>${crossLinksHtml}</div>` : '';
            })()}
            <a href="../?g=${g.id}${isEs ? '&lang=es' : ''}" class="guide-back-btn" style="display:inline-flex;align-items:center;gap:6px;margin-top:30px;padding:10px 20px;background:var(--accent);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;"><i class="fa-solid fa-arrow-left"></i> ${interactiveText}</a>
          </div>
        </div>
      </div>
    </main>
    <footer class="site-footer">
      <div class="footer-inner">
        <p style="text-align:center;font-size:12px;color:var(--text-secondary);padding:20px 0">&copy; 2026 TopMusicianGear. All rights reserved.</p>
      </div>
    </footer>
  </div>
  <script src="../js/translations.js?v=12"></script>
  <script src="../js/products.js?v=12"></script>
  <script src="../js/guides.js?v=12"></script>
  <script src="../js/app.js?v=12"></script>
</body>
</html>`;
}

let total = 0;

guides.forEach(g => {
  ['en', 'es'].forEach(lang => {
    const suffix = lang === 'es' ? '_es' : '';
    const html = renderGuidePage(g, lang);
    const filePath = path.join(OUT_DIR, `${g.id}${suffix}.html`);
    fs.writeFileSync(filePath, html, 'utf8');
    total++;
    console.log(`Generated: guides/${g.id}${suffix}.html`);
  });
});

// Generate sitemap with staggered dates
const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
function daysAgo(days) {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  local.setDate(local.getDate() - days);
  return local.toISOString().split("T")[0];
}
const guideDateMap = {
  "best-plugins": 0, "mixing-plugins": 0, "fx-plugins": 1, "channel-strip-plugins": 1, "vocal-plugins": 1,
  "best-monitors": 2, "budget-monitors": 3, "pro-monitors": 4, "monitor-setup": 4, "small-room-monitors": 5, "studio-subwoofers": 5,
  "best-microphone": 6, "budget-mics": 6, "usb-mics": 7, "stage-mics": 7, "tube-ribbon-mics": 8,
  "best-interface": 8, "budget-interfaces": 9, "portable-interfaces": 9, "pro-interfaces": 10, "starter-studio": 10,
  "best-headphones": 11, "open-headphones": 11, "budget-headphones": 12, "tracking-headphones": 12, "wireless-headphones": 13,
  "fender-guide": 13, "acoustic-guitars-guide": 14, "beginner-guitar": 14, "guitar-bass-amps": 15, "guitar-pedals": 15,
  "best-accessories": 16, "midi-controllers": 16, "studio-furniture": 17, "stage-wireless": 17,
  "live-sound-pa": 18, "daw-guide": 18, "midi-keyboards": 19, "beat-making": 20, "cuban-tres": 28,
};
const guideUrls = guides.flatMap(g => {
  const daysBack = guideDateMap[g.id] || 0;
  const en = `  <url><lastmod>${daysAgo(daysBack)}</lastmod><loc>https://topmusiciangear.com/guides/${g.id}.html</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`;
  const es = `  <url><lastmod>${daysAgo(daysBack)}</lastmod><loc>https://topmusiciangear.com/guides/${g.id}_es.html</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`;
  return [en, es];
}).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><lastmod>${daysAgo(0)}</lastmod><loc>https://topmusiciangear.com/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
${guideUrls}
  <url><lastmod>${daysAgo(90)}</lastmod><loc>https://topmusiciangear.com/privacy-policy.html</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>
  <url><lastmod>${daysAgo(90)}</lastmod><loc>https://topmusiciangear.com/terms.html</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>
  <url><lastmod>${daysAgo(60)}</lastmod><loc>https://topmusiciangear.com/cookie-policy.html</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>
  <url><lastmod>${daysAgo(45)}</lastmod><loc>https://topmusiciangear.com/affiliate-disclosure.html</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>
  <url><lastmod>${daysAgo(30)}</lastmod><loc>https://topmusiciangear.com/contact.html</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>
</urlset>`;

fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log(`Generated: sitemap.xml (${guides.length + 6} URLs)`);

// Generate footer guide links snippet for Google crawlability
const footerLinks = guides.map(g => {
  const title = g.title;
  return `          <li><a href="/guides/${g.id}.html">${esc(title)}</a></li>`;
}).join('\n');
const footerHtml = `<!-- GUIDE LINKS FOR GOOGLE CRAWLABILITY - Generated -->
<div id="guide-links" style="display:none" aria-hidden="true">
  <ul>
${footerLinks}
  </ul>
</div>
<!-- END GUIDE LINKS -->`;

const footerPath = path.join(__dirname, '..', 'guides-links-snippet.html');
fs.writeFileSync(footerPath, footerHtml, 'utf8');
console.log('Generated: guides-links-snippet.html (paste this into index.html before </body>)');

console.log(`\nDone! Generated ${total} guide pages + sitemap + snippet.`);
