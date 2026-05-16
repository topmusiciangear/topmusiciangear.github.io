const fs = require('fs');
const path = require('path');

const { guides } = require('../js/guides.js');
const { products } = require('../js/products.js');

const OUT_DIR = path.join(__dirname, '..', 'guides');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderProductCard(p) {
  const name = p.title;
  const desc = (p.desc || '').substring(0, 150);
  return `<div class="product-card">
    <div class="product-card-img"><img src="${esc(p.img)}" alt="${esc(name)}" loading="lazy"></div>
    <div class="product-card-body">
      <h4 class="product-card-title">${esc(name)}</h4>
      <div class="product-card-price">$${p.price}</div>
      <div class="product-card-rating">${'★'.repeat(Math.round(p.rating || 0))} (${p.reviews || 0})</div>
      <div class="product-card-desc">${esc(desc)}</div>
    </div>
  </div>`;
}

let total = 0;

guides.forEach(g => {
  const title = g.title;
  const desc = (g.intro || '').substring(0, 200);
  const img = g.image || '';
  const allProductIds = [...new Set(g.sections.flatMap(s => s.products))];
  const productsHtml = allProductIds.map(id => {
    const p = products.find(x => x.id === id);
    return p ? renderProductCard(p) : '';
  }).filter(Boolean).join('');

  const sectionsHtml = g.sections.map(s => {
    const heading = s.heading;
    const content = s.content;
    return `<div class="guide-section">
      <h3 class="guide-section-heading">${esc(heading)}</h3>
      <div class="guide-section-content">${content}</div>
    </div>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)} | TopMusicianGear</title>
  <meta name="description" content="${esc(desc)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="${esc(img)}">
  <meta property="og:url" content="https://topmusiciangear.com/guides/${g.id}.html">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="TopMusicianGear">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="https://topmusiciangear.com/?g=${g.id}">
  <link rel="alternate" hreflang="en" href="https://topmusiciangear.com/guides/${g.id}.html">
  <link rel="alternate" hreflang="es" href="https://topmusiciangear.com/guides/${g.id}.html">
  <link rel="alternate" hreflang="x-default" href="https://topmusiciangear.com/guides/${g.id}.html">
  <link rel="stylesheet" href="../css/style.css?v=10">
  <link rel="icon" type="image/png" sizes="48x48" href="../img/favicon.png?v=2">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    .guide-detail-static { padding: 20px 0; }
    .guide-detail-static .guide-back-row { margin-bottom: 20px; }
    .guide-detail-static .guide-detail-header h1 { font-size: 28px; margin-bottom: 16px; }
    .guide-detail-static .guide-detail-img { margin-bottom: 20px; border-radius: 12px; overflow: hidden; }
    .guide-detail-static .guide-detail-img img { width: 100%; display: block; }
    .guide-detail-static .guide-detail-intro { font-size: 15px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 30px; }
    .guide-detail-static .guide-section { margin-bottom: 24px; }
    .guide-detail-static .guide-section-heading { font-size: 18px; color: var(--accent); margin-bottom: 8px; }
    .guide-detail-static .guide-section-content { font-size: 14px; line-height: 1.8; color: var(--text-secondary); }
    .guide-products-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin: 20px 0; }
    .product-card { background: var(--card-bg); border-radius: 12px; border: 1px solid var(--border); overflow: hidden; }
    .product-card-img { width: 100%; aspect-ratio: 1; overflow: hidden; }
    .product-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .product-card-body { padding: 12px; }
    .product-card-title { font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
    .product-card-price { font-size: 14px; font-weight: 600; color: var(--accent); margin-bottom: 4px; }
    .product-card-rating { font-size: 12px; color: #f59e0b; margin-bottom: 6px; }
    .product-card-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.5; }
    .guide-verdict { margin: 24px 0; padding: 16px; background: var(--card-bg); border-radius: 12px; border: 1px solid var(--accent); }
    .verdict-label { font-size: 12px; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px; }
    .verdict-text { font-size: 15px; font-weight: 600; color: var(--text-primary); }
    .guide-conclusion { margin: 24px 0; padding: 20px; background: var(--card-bg); border-radius: 12px; }
    .guide-conclusion h3 { font-size: 18px; color: var(--text-primary); margin-bottom: 8px; }
    .guide-conclusion p { font-size: 14px; color: var(--text-secondary); line-height: 1.8; }
  </style>
</head>
<body>
  <div id="app">
    <header class="site-header">
      <div class="header-inner">
        <a href="../" class="logo-link"><span class="logo-icon"><img src="../img/favicon.png?v=2" alt="TopMusicianGear" style="width:36px;height:36px;border-radius:8px"></span><span class="logo-text">TopMusicianGear</span></a>
        <nav>
          <a href="../" class="nav-link">Guides</a>
        </nav>
        <div id="langSwitcher"></div>
      </div>
    </header>
    <main>
      <div id="guideGrid" style="display:block">
        <div id="guideContainer" class="guide-detail-open">
          <div class="guide-detail-static">
            <div class="guide-back-row">
              <a href="../" class="guide-back-btn"><i class="fa-solid fa-arrow-left"></i> Back to Guides</a>
            </div>
            <div class="guide-detail-header">
              <h1 class="guide-detail-title">${esc(title)}</h1>
            </div>
            <div class="guide-detail-img"><img src="${esc(img)}" alt="${esc(title)}"></div>
            <div class="guide-detail-intro"><p>${g.intro || ''}</p></div>
            <div class="guide-detail-sections">${sectionsHtml}</div>
            ${g.verdict ? `<div class="guide-verdict"><span class="verdict-label">Verdict</span><span class="verdict-text">${esc(g.verdict)}</span></div>` : ''}
            ${productsHtml ? `<div class="guide-products-grid"><h3 class="guide-products-title">Products in this Guide</h3><div class="guide-products-cards">${productsHtml}</div></div>` : ''}
            ${g.conclusion ? `<div class="guide-conclusion"><h3>Final Thoughts</h3><p>${g.conclusion}</p></div>` : ''}
            <a href="../?g=${g.id}" class="guide-back-btn" style="display:inline-flex;align-items:center;gap:6px;margin-top:30px;padding:10px 20px;background:var(--accent);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;"><i class="fa-solid fa-arrow-left"></i> View Interactive Guide</a>
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
  <script src="../js/translations.js?v=9"></script>
  <script src="../js/products.js?v=9"></script>
  <script src="../js/guides.js?v=9"></script>
  <script src="../js/app.js?v=9"></script>
</body>
</html>`;

  const filePath = path.join(OUT_DIR, `${g.id}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  total++;
  console.log(`Generated: guides/${g.id}.html`);
});

// Generate sitemap
const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
const guideUrls = guides.map(g =>
  `  <url><lastmod>2026-05-18</lastmod><loc>https://topmusiciangear.com/guides/${g.id}.html</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`
).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><lastmod>2026-05-18</lastmod><loc>https://topmusiciangear.com/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
${guideUrls}
  <url><lastmod>2026-05-18</lastmod><loc>https://topmusiciangear.com/privacy-policy.html</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>
  <url><lastmod>2026-05-18</lastmod><loc>https://topmusiciangear.com/terms.html</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>
  <url><lastmod>2026-05-18</lastmod><loc>https://topmusiciangear.com/cookie-policy.html</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>
  <url><lastmod>2026-05-18</lastmod><loc>https://topmusiciangear.com/affiliate-disclosure.html</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>
  <url><lastmod>2026-05-18</lastmod><loc>https://topmusiciangear.com/contact.html</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>
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
