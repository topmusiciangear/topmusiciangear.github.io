const fs = require('fs');
const html = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-drum-machine_es.html', 'utf8');
const ldMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
ldMatch.forEach((block, i) => {
  const content = block.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
  if (content.includes('euro')) {
    const idx = content.indexOf('euro');
    console.log('Block ' + i + ' has euro:', content.slice(idx - 120, idx + 20));
  }
});
