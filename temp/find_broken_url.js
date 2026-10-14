const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
function hunt(obj, path, gid) {
  if (obj === null || obj === undefined) return;
  if (typeof obj === 'string') {
    const m = obj.match(/best-auriculares|auriculares\.html|auriculares\//g);
    if (m) console.log(gid + ' ' + path + ' :: ' + obj.slice(Math.max(0, obj.indexOf(m[0]) - 80), obj.indexOf(m[0]) + 80).replace(/\n/g, ' '));
    return;
  }
  if (Array.isArray(obj)) { obj.forEach((v, i) => hunt(v, path + '[' + i + ']', gid)); return; }
  if (typeof obj === 'object') Object.keys(obj).forEach(k => hunt(obj[k], path + '.' + k, gid));
}
guides.forEach(g => hunt(g, '', g.id));