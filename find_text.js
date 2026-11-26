const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-interface');

function searchObj(obj, path) {
  if (typeof obj === 'string') {
    if (obj.includes('For detailed comparisons')) {
      console.log('Found in:', path);
    }
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => searchObj(item, path + '[' + i + ']'));
    return;
  }
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      searchObj(obj[key], path + '.' + key);
    }
  }
}

searchObj(guide, 'guide');