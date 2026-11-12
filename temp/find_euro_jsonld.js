const fs = require('fs');
const html = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-drum-machine_es.html', 'utf8');
const ldMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
ldMatch.forEach((block, i) => {
  const content = block.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
  try {
    const json = JSON.parse(content);
    // Check all string values recursively
    function findEuro(obj, path) {
      if (typeof obj === 'string') {
        if (obj.includes('euro')) {
          console.log('Block ' + i + ' path=' + path + ': ' + obj.slice(0, 120));
        }
      } else if (Array.isArray(obj)) {
        obj.forEach((v, idx) => findEuro(v, path + '[' + idx + ']'));
      } else if (obj && typeof obj === 'object') {
        Object.keys(obj).forEach(k => findEuro(obj[k], path + '.' + k));
      }
    }
    findEuro(json, '');
  } catch (e) {}
});
console.log('Done');
