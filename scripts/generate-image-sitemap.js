const fs = require('fs');
const path = require('path');

const guidesPath = path.join(__dirname, '..', 'js', 'guides.js');
const data = fs.readFileSync(guidesPath, 'utf8');
const cleaned = data.replace(/^const /gm, 'var ');
eval(cleaned);

const baseUrl = 'https://topmusiciangear.com';
const today = new Date().toISOString().split('T')[0];

const entries = [];

guides.forEach(g => {
  const enUrl = `${baseUrl}/guides/${g.id}.html`;
  const esUrl = `${baseUrl}/guides/${g.id}_es.html`;

  if (g.image) {
    entries.push(`  <url>
    <loc>${enUrl}</loc>
    <lastmod>${today}</lastmod>
    <image:image>
      <image:loc>${g.image}</image:loc>
      <image:title>${g.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</image:title>
    </image:image>
  </url>`);

    if (g.title_es) {
      entries.push(`  <url>
    <loc>${esUrl}</loc>
    <lastmod>${today}</lastmod>
    <image:image>
      <image:loc>${g.image}</image:loc>
      <image:title>${g.title_es.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</image:title>
    </image:image>
  </url>`);
    }
  }
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>`;

const outPath = path.join(__dirname, '..', 'sitemap-images.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log(`Written ${entries.length} image entries to sitemap-images.xml`);
