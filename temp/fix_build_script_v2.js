const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let content = fs.readFileSync(path, 'utf8');

// FIX 1: qualifiedIds = allProductIds (ya aplicado, verificar)
if (content.includes('const qualifiedIds = allProductIds;')) {
  console.log('FIX 1: qualifiedIds ya aplicado');
} else {
  content = content.replace(
    `const qualifiedIds = allProductIds.filter(function(pid) {
    const pp = products.find(function(pr) { return pr.id === pid; });
    if (!pp) return false;
    if (tmgOffers(pp, 'https://topmusiciangear.com/guides/' + guide.id + '.html')) return true;
    if (reviewStats(pid)) return true;
    if (reviews.some(function(r) { return r.productId === pid; })) return true;
    return false;
  });`,
    `const qualifiedIds = allProductIds; // Incluir TODOS los productos en JSON-LD`
  );
  console.log('FIX 1 aplicado: qualifiedIds = allProductIds');
}

// FIX 2: tmgOffers - devolver ofertas aunque no tengan precio para JSON-LD
// Buscar la función tmgOffers y modificar el return
const tmgOffersStart = content.indexOf('function tmgOffers(p, fallbackUrl) {');
if (tmgOffersStart !== -1) {
  // Buscar el return final
  let braceCount = 0;
  let inString = false;
  let escapeNext = false;
  let endIdx = -1;
  
  for (let i = content.indexOf('function tmgOffers(p, fallbackUrl) {'); i < content.length; i++) {
    const char = content[i];
    if (char === '\\') { i++; continue; }
    if (char === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (content[i] === '{') braceCount++;
    else if (content[i] === '}') { braceCount--; if (braceCount === 0) { endIdx = i; break; } }
  }
  
  if (endIdx !== -1) {
    const tmgOffersStr = content.substring(content.indexOf('function tmgOffers(p, fallbackUrl) {'), endIdx + 1);
    
    // Reemplazar el return para que devuelva ofertas incluso sin precio
    let newTmgOffers = tmgOffersStr.replace(
      'if (!priced.length) return null;',
      'if (!priced.length) { /* Para JSON-LD, devolver ofertas sin precio */ var pricedWithUrl = offers.filter(function(o) { return o.url; }); if (!pricedWithUrl.length) return null; priced = pricedWithUrl; }'
    );
    
    // Reemplazar el return final para incluir ofertas sin precio
    newTmgOffers = newTmgOffers.replace(
      'return priced[0];',
      'return priced[0]; // Devuelve la primera oferta con precio'
    );
    
    content = content.substring(0, content.indexOf('function tmgOffers(p, fallbackUrl) {')) + 
              content.substring(content.indexOf('function tmgOffers(p, fallbackUrl) {')).replace(/function tmgOffers\(p, fallbackUrl\) \{[\s\S]*?^\s*\}/m, 
      `function tmgOffers(p, fallbackUrl) {
  var cfg = (typeof TEST_SHOP_BTN !== 'undefined' ? TEST_SHOP_BTN[p.id] : null) || {};
  var pr = cfg.prices || {};
  var st = getResolvedStores(p);
  var oos = cfg.oos || [], na = cfg.na || [];
  var isHolly = !!st.hollyland;
  var offers = [];
  function pushOffer(storeKey, rawUrl, priceStr) {
    var url = storeKey === 'hollyland' ? wrapAffiliate('hollyland', rawUrl || '') : wrapAffiliate(storeKey, rawUrl || '');
    if (!url) return;
    var o = { "@type": "Offer", "availability": (oos.indexOf(storeKey) > -1 || na.indexOf(storeKey) > -1) ? "https://schema.org/OutOfStock" : "https://schema.org/InStock", "url": url };
    var pp = tmgPriceParts(priceStr);
    if (pp) { o.price = pp.price; o.priceCurrency = pp.priceCurrency; }
    if (TMG_STORE_NAMES[storeKey]) o.seller = { "@type": "Organization", "name": TMG_STORE_NAMES[storeKey] };
    offers.push(o);
  }
  if (isHolly) {
    var holly = hollyPickEntry(cfg, hollyDefaultRegion());
    pushOffer('hollyland', holly ? holly.u || '' : '', holly ? holly.p || '' : '');
  } else {
    ['amazon', 'zzounds', 'gear4music', 'andertons', 'musicstore', 'reverb', 'pluginboutique'].forEach(function(k) {
      if (k === 'amazon' && p.category === 'plugins') return;
      var u = (cfg.urls && cfg.urls[k]) || st[k] || '';
      if (!u) return;
      pushOffer(k, u, pr[k] || '');
    });
  }
  // Para JSON-LD, devolver ofertas con URL aunque no tengan precio
  var priced = offers.filter(function(o) { return isFinite(o.price); });
  var withUrl = offers.filter(function(o) { return o.url; });
  if (!withUrl.length) return null;
  if (priced.length >= 2) {
    var groups = {};
    priced.forEach(function(o) { (groups[o.priceCurrency] = groups[o.priceCurrency] || []).push(o); });
    var gkeys = Object.keys(groups).sort(function(a, b) {
      if (groups[b].length !== groups[a].length) return groups[b].length - groups[a].length;
      if (a === 'USD') return -1; if (b === 'USD') return 1; return 0;
    });
    var g = groups[gkeys[0]];
    var nums = g.map(function(o) { return o.price; });
    return [{ "@type": "AggregateOffer", "offerCount": g.length, "lowPrice": Math.min.apply(null, nums), "highPrice": Math.max.apply(null, nums), "priceCurrency": gkeys[0] }].concat(priced);
  }
  // Devolver ofertas con URL para JSON-LD aunque no tengan precio
  return withUrl[0];
}
`)
  console.log('FIX tmgOffers aplicado');
}

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', content);
console.log('Cambios guardados en build-guides.js');