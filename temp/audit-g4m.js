const fs = require('fs');
const https = require('https');
const http = require('http');
const url = require('url');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Extract ALL gear4music URLs (the main problem store based on user report)
const g4mUrls = [];
products.forEach(p => {
  if (!p.stores || !p.stores.gear4music) return;
  g4mUrls.push({
    id: p.id,
    title: p.title,
    brand: p.brand,
    category: p.category,
    url: p.stores.gear4music
  });
});

console.log('Gear4music URLs to verify:', g4mUrls.length);

// Decode Awin URLs to get actual target
function decodeAwinUrl(awinUrl) {
  try {
    const parsed = new URL(awinUrl);
    const ued = parsed.searchParams.get('ued');
    if (ued) return decodeURIComponent(ued);
  } catch(e) {}
  return awinUrl;
}

// Check each URL - follow redirects to get final URL
function checkUrl(item, callback) {
  const targetUrl = decodeAwinUrl(item.url);
  
  const parsed = new URL(targetUrl);
  const mod = parsed.protocol === 'https:' ? https : http;
  
  const req = mod.get(targetUrl, {
    timeout: 15000,
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    followRedirects: false
  }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      // Got redirect - this is the actual target
      callback(null, { ...item, decodedUrl: targetUrl, finalUrl: res.headers.location, statusCode: res.statusCode });
    } else if (res.statusCode === 200) {
      // Direct hit - check title
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        const titleMatch = body.match(/<title[^>]*>([^<]+)<\/title>/i);
        const pageTitle = titleMatch ? titleMatch[1].trim() : 'NO TITLE';
        callback(null, { ...item, decodedUrl: targetUrl, finalUrl: targetUrl, statusCode: 200, pageTitle });
      });
    } else {
      callback(null, { ...item, decodedUrl: targetUrl, finalUrl: targetUrl, statusCode: res.statusCode });
    }
  });
  
  req.on('error', (e) => callback(null, { ...item, decodedUrl: targetUrl, error: e.message }));
  req.on('timeout', () => { req.destroy(); callback(null, { ...item, decodedUrl: targetUrl, error: 'TIMEOUT' }); });
}

// Process in batches of 5
let idx = 0;
const results = [];
const BATCH = 5;

function processNext() {
  if (idx >= g4mUrls.length) {
    // Done - analyze results
    const mismatches = [];
    results.forEach(r => {
      if (r.pageTitle) {
        const titleLower = r.pageTitle.toLowerCase();
        const productLower = r.title.toLowerCase();
        const brandLower = (r.brand || '').toLowerCase();
        
        // Check if page title matches product
        const brandWords = brandLower.split(/\s+/);
        const titleWords = productLower.split(/\s+/).filter(w => w.length > 2);
        
        const brandPresent = brandWords.some(w => titleLower.includes(w));
        const modelPresent = titleWords.some(w => titleLower.includes(w) && w.length > 3);
        
        if (!brandPresent && !modelPresent) {
          mismatches.push({
            id: r.id,
            product: r.title,
            brand: r.brand,
            pageTitle: r.pageTitle,
            url: r.url.substring(0, 100)
          });
        }
      }
    });
    
    console.log('\n=== MISMATCHED PAGES (title does not match product) ===');
    if (mismatches.length === 0) {
      console.log('None found!');
    } else {
      mismatches.forEach(m => {
        console.log(`ID ${m.id} | ${m.product} (${m.brand})`);
        console.log(`  Page shows: ${m.pageTitle}`);
        console.log(`  URL: ${m.url}`);
      });
    }
    
    fs.writeFileSync('temp/g4m-audit.json', JSON.stringify({ total: results.length, mismatches, results }, null, 2));
    console.log('\nFull results saved to temp/g4m-audit.json');
    return;
  }
  
  const batch = g4mUrls.slice(idx, idx + BATCH);
  let done = 0;
  batch.forEach(item => {
    checkUrl(item, (err, result) => {
      if (result) results.push(result);
      if (++done === BATCH) {
        idx += BATCH;
        if (idx % 50 === 0) console.log('Progress:', idx + '/' + g4mUrls.length);
        processNext();
      }
    });
  });
}

processNext();
