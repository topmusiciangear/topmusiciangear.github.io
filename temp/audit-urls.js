const fs = require('fs');
const https = require('https');
const http = require('http');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Extract all URLs with product info
const allUrls = [];
products.forEach(p => {
  if (!p.stores) return;
  Object.entries(p.stores).forEach(([store, url]) => {
    if (!url || url === '') return;
    allUrls.push({
      id: p.id,
      title: p.title,
      brand: p.brand,
      store,
      url
    });
  });
});

console.log('Total URLs to check:', allUrls.length);
console.log('Products:', products.length);

// Group by store
const byStore = {};
allUrls.forEach(u => {
  if (!byStore[u.store]) byStore[u.store] = [];
  byStore[u.store].push(u);
});
Object.keys(byStore).sort().forEach(s => {
  console.log(s + ':', byStore[s].length, 'URLs');
});

// Check URL patterns for obvious mismatches
const issues = [];
allUrls.forEach(u => {
  const urlLower = u.url.toLowerCase();
  const titleLower = u.title.toLowerCase();
  const brandLower = (u.brand || '').toLowerCase();
  
  // Extract path segments
  let pathPart = '';
  try {
    const parsed = new URL(u.url);
    pathPart = parsed.pathname.toLowerCase();
  } catch(e) {
    issues.push({ ...u, issue: 'INVALID URL' });
    return;
  }
  
  // Check if brand appears in URL
  if (brandLower && !urlLower.includes(brandLower.toLowerCase().replace(/\s+/g, '')) && 
      !urlLower.includes(brandLower.toLowerCase().replace(/\s+/g, '-')) &&
      !urlLower.includes(brandLower.toLowerCase())) {
    // Brand not in URL at all - suspicious but could be OK for affiliate wraps
  }
  
  // Check for obvious product ID mismatches in URL slugs
  // Flag if URL contains a clearly different product name
  const titleWords = titleLower.split(/[\s\-]+/).filter(w => w.length > 3);
  const urlWords = pathPart.split(/[\s\-\/]+/).filter(w => w.length > 3);
  
  // Specific checks for known problematic patterns
  if (urlLower.includes('ath-m50') && !titleLower.includes('ath-m50') && !titleLower.includes('m50x')) {
    issues.push({ ...u, issue: 'URL contains ATH-M50x but product is ' + u.title });
  }
  if (urlLower.includes('headphone') && !titleLower.includes('headphone') && !titleLower.includes('auricular')) {
    issues.push({ ...u, issue: 'URL contains headphone but product is ' + u.title });
  }
  if (urlLower.includes('microphone') && (titleLower.includes('headphone') || titleLower.includes('monitor') || titleLower.includes('interface'))) {
    issues.push({ ...u, issue: 'URL contains microphone but product is ' + u.title });
  }
  if (urlLower.includes('speaker') && (titleLower.includes('headphone') || titleLower.includes('microphone'))) {
    issues.push({ ...u, issue: 'URL contains speaker but product is ' + u.title });
  }
  if (urlLower.includes('guitar') && (titleLower.includes('headphone') || titleLower.includes('microphone') || titleLower.includes('interface'))) {
    issues.push({ ...u, issue: 'URL contains guitar but product is ' + u.title });
  }
  if (urlLower.includes('keyboard') && (titleLower.includes('headphone') || titleLower.includes('microphone'))) {
    issues.push({ ...u, issue: 'URL contains keyboard but product is ' + u.title });
  }
  if (urlLower.includes('drum') && (titleLower.includes('headphone') || titleLower.includes('microphone') || titleLower.includes('monitor'))) {
    issues.push({ ...u, issue: 'URL contains drum but product is ' + u.title });
  }
});

console.log('\n=== POTENTIAL MISMATCHES ===');
issues.forEach(i => {
  console.log(`ID ${i.id} | ${i.title} | ${i.store} | ${i.issue}`);
  console.log(`  URL: ${i.url.substring(0, 120)}`);
});

// Save full report
fs.writeFileSync('temp/url-audit.json', JSON.stringify({ total: allUrls.length, byStore, issues, urls: allUrls }, null, 2));
console.log('\nFull report saved to temp/url-audit.json');
