const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/';

const guides = fs.readdirSync(path + 'guides').filter(f => f.endsWith('.html'));
let totalIssues = 0;
const issuesByType = {};

function addIssue(type, file, detail) {
  if (!issuesByType[type]) issuesByType[type] = [];
  issuesByType[type].push(file + ': ' + detail);
  totalIssues++;
}

guides.forEach(file => {
  const html = fs.readFileSync(path + 'guides/' + file, 'utf8');
  const ldMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  if (!ldMatch) return;
  
  ldMatch.forEach((block, bi) => {
    const content = block.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
    let json;
    try { json = JSON.parse(content); } catch (e) { return; }
    
    // Check product names in @graph
    if (json['@graph']) {
      json['@graph'].forEach(item => {
        if (item['@type'] === 'Product' && item.name) {
          if (!html.includes(item.name)) {
            addIssue('PRODUCT_NOT_IN_HTML', file, item.name);
          }
          // Check prices
          if (item.offers) {
            const price = item.offers.price || item.offers.lowPrice || item.offers.highPrice;
            if (price && !html.includes(String(price))) {
              addIssue('PRICE_NOT_IN_HTML', file, item.name + ' price=' + price);
            }
          }
          // Check description
          if (item.description && !html.includes(item.description)) {
            addIssue('DESC_NOT_IN_HTML', file, item.name + ' desc=' + item.description.slice(0, 60));
          }
        }
      });
    }
    
    // Check ItemList
    if (json.itemListElement) {
      json.itemListElement.forEach(item => {
        if (item.name && item.name !== 'Home' && item.name !== 'Microphones' && item.name !== 'Headphones' && item.name !== 'Interfaces' && item.name !== 'Monitors' && item.name !== 'Guitars' && item.name !== 'Basses' && item.name !== 'Keyboards' && item.name !== 'Plugins' && item.name !== 'Accessories' && item.name !== 'Amps' && item.name !== 'Pedals' && item.name !== 'Live Sound' && item.name !== 'Mixers' && item.name !== 'DAW' && item.name !== 'Streaming' && item.name !== 'Drum Machines' && item.name !== 'Top Gear' && item.name !== 'Cuban Tres' && item.name !== 'Strings' && !html.includes(item.name)) {
          addIssue('ITEMLIST_NOT_IN_HTML', file, item.name);
        }
      });
    }
    
    // Check Article description
    if (json['@type'] === 'Article' && json.description) {
      if (!html.includes(json.description)) {
        addIssue('ARTICLE_DESC_NOT_IN_HTML', file, json.description.slice(0, 60));
      }
    }
    
    // Check FAQPage
    if (json['@type'] === 'FAQPage' && json.mainEntity) {
      json.mainEntity.forEach(q => {
        if (q.name && !html.includes(q.name)) {
          addIssue('FAQ_Q_NOT_IN_HTML', file, q.name.slice(0, 60));
        }
        if (q.acceptedAnswer && q.acceptedAnswer.text && !html.includes(q.acceptedAnswer.text)) {
          addIssue('FAQ_A_NOT_IN_HTML', file, q.acceptedAnswer.text.slice(0, 60));
        }
      });
    }
    
    // Check BreadcrumbList
    if (json['@type'] === 'BreadcrumbList' && json.itemListElement) {
      json.itemListElement.forEach(item => {
        if (item.name && item.name !== 'Home' && !html.includes(item.name)) {
          addIssue('BREADCRUMB_NOT_IN_HTML', file, item.name);
        }
      });
    }
  });
});

console.log('Total issues found: ' + totalIssues);
Object.keys(issuesByType).sort().forEach(type => {
  console.log('\n' + type + ' (' + issuesByType[type].length + '):');
  issuesByType[type].slice(0, 20).forEach(i => console.log('  ' + i));
  if (issuesByType[type].length > 20) console.log('  ... and ' + (issuesByType[type].length - 20) + ' more');
});
fs.writeFileSync(path + 'temp/audit_jsonld_full.txt', JSON.stringify(issuesByType, null, 2), 'utf8');
console.log('\nFull report saved to temp/audit_jsonld_full.txt');
