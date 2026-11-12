const fs = require('fs');
const html = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-microphone.html', 'utf8');
const ldMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
console.log('JSON-LD blocks: ' + (ldMatch ? ldMatch.length : 0));
if (ldMatch) {
  ldMatch.forEach((block, i) => {
    const content = block.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
    try {
      const json = JSON.parse(content);
      console.log('Block ' + i + ': @type=' + json['@type'] + ' keys=' + Object.keys(json).join(','));
      if (json['@graph']) console.log('  @graph items: ' + json['@graph'].length);
      if (json.itemListElement) console.log('  itemListElement: ' + json.itemListElement.length);
      if (json.name) console.log('  name: ' + json.name);
      if (json.description) console.log('  description: ' + json.description.slice(0, 80));
    } catch (e) {
      console.log('Block ' + i + ': parse error: ' + e.message);
    }
  });
}
// Also check title, meta description, og: tags
const title = html.match(/<title>([\s\S]*?)<\/title>/);
console.log('\nTitle: ' + (title ? title[1] : 'NONE'));
const metaDesc = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/);
console.log('Meta desc: ' + (metaDesc ? metaDesc[1].slice(0, 80) : 'NONE'));
const ogTitle = html.match(/<meta\s+property=["']og:title["']\s+content=["']([\s\S]*?)["']/);
console.log('OG title: ' + (ogTitle ? ogTitle[1] : 'NONE'));
const ogDesc = html.match(/<meta\s+property=["']og:description["']\s+content=["']([\s\S]*?)["']/);
console.log('OG desc: ' + (ogDesc ? ogDesc[1].slice(0, 80) : 'NONE'));
const twTitle = html.match(/<meta\s+name=["']twitter:title["']\s+content=["']([\s\S]*?)["']/);
console.log('Twitter title: ' + (twTitle ? twTitle[1] : 'NONE'));
