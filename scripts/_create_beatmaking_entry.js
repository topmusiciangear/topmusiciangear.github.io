var fs = require('fs');

// Read both HTML files
var html = fs.readFileSync('guides/beat-making.html', 'utf8');
var htmlEs = fs.readFileSync('guides/beat-making_es.html', 'utf8');

// Extract content
function g(re, str) {
  var m = str.match(re);
  return m ? m[1].trim() : '';
}

// Helper to strip HTML tags
function strip(s) { return s.replace(/<[^>]+>/g, '').trim(); }

// Extract sections from HTML
function extractSections(html) {
  // Split by guide-section divs
  var secs = [];
  var re = /<h2 class="guide-section-heading">([\s\S]*?)<\/h2>\s*<div class="guide-section-content">([\s\S]*?)<\/div>\s*<div class="guide-products/g;
  var m;
  while ((m = re.exec(html)) !== null) {
    secs.push({
      heading: strip(m[1]),
      content: m[2].trim()
    });
  }
  return secs;
}

var sections = extractSections(html);
var sectionsEs = extractSections(htmlEs);

// Extract intro
var intro = strip(g(/<div class="guide-detail-intro">([\s\S]*?)<\/div>/, html));
var introEs = strip(g(/<div class="guide-detail-intro">([\s\S]*?)<\/div>/, htmlEs));

// Extract verdict
var verdictHeader = strip(g(/<div class="guide-verdict-header">([^<]+)<\/div>/, html));
var verdictHeaderEs = strip(g(/<div class="guide-verdict-header">([^<]+)<\/div>/, htmlEs));
var verdictText = strip(g(/<div class="verdict-text">([\s\S]*?)<\/div>/, html));
var verdictTextEs = strip(g(/<div class="verdict-text">([\s\S]*?)<\/div>/, htmlEs));

// Extract FAQ
function extractFAQs(html) {
  var faqs = [];
  var qs = html.match(/<button class="guide-faq-question"[^>]*>([^<]+)<span class="guide-faq-icon">[^<]+<\/span><\/button>/g);
  var ans = html.match(/<div class="guide-faq-answer-inner">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g);
  if (qs && ans) {
    qs.forEach(function(q, i) {
      var qText = g(/<button class="guide-faq-question"[^>]*>([^<]+)</, q);
      var aText = '';
      if (ans[i]) {
        var am = ans[i].match(/<div class="guide-faq-answer-inner">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/);
        if (am) aText = am[1].trim();
      }
      faqs.push({ q: strip(qText), a: aText });
    });
  }
  return faqs;
}

var faqs = extractFAQs(html);
var faqsEs = extractFAQs(htmlEs);

// Get featured products from JSON-LD
var jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
var products = [];
if (jsonLdMatch) {
  jsonLdMatch.forEach(function(block) {
    var json = block.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
    try {
      var data = JSON.parse(json);
      var items = data['@graph'] || data.itemListElement || [];
      if (Array.isArray(items)) {
        items.forEach(function(item) {
          if (item['@type'] === 'Product' || (item.item && item.item['@type'] === 'Product')) {
            var p = item['@type'] === 'Product' ? item : item.item;
            if (p.name) products.push(p.name);
          }
        });
      }
    } catch(e) {}
  });
}

console.log('Guide: beat-making');
console.log('Title: ' + g(/<title>([^<]+)<\/title>/, html));
console.log('Title ES: ' + g(/<title>([^<]+)<\/title>/, htmlEs));
console.log('Intro: ' + intro.substring(0, 100));
console.log('Products found in JSON-LD: ' + products.join(', '));
console.log('Sections EN: ' + sections.length);
console.log('Sections ES: ' + sectionsEs.length);
console.log('FAQs EN: ' + faqs.length);
console.log('FAQs ES: ' + faqsEs.length);
console.log('Verdict Header: ' + verdictHeader);
console.log('Verdict Header ES: ' + verdictHeaderEs);
sections.forEach(function(s, i) {
  console.log('Sec[' + i + '] EN heading: ' + s.heading.substring(0, 60));
});
