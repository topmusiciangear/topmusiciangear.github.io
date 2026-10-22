const fs = require('fs');
const h = fs.readFileSync('temp/mixvault_pb.html', 'utf8');
const urls = [...h.matchAll(/https:\/\/www\.pluginboutique\.com\/rails\/active_storage\/blobs\/redirect\/[^"'\s]+MIXVAULT[^"'\s]*/g)].map(m => m[0].replace(/&amp;/g, '&'));
const uniq = [...new Set(urls)];
console.log(uniq.join('\n'));
const og = h.match(/<meta property="og:image" content="([^"]+)"/);
console.log('OG:', og && og[1]);
fs.writeFileSync('temp/mixvault_imgs.txt', uniq.join('\n') + '\n' + (og ? og[1] : '') + '\n');
