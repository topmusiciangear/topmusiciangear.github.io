var fs = require('fs');
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

var fixed = 0;
guides.forEach(function(g) {
  ['conclusion', 'conclusion_es'].forEach(function(field) {
    if (!g[field]) return;
    var original = g[field];

    // 1. Remove period after last </a> in link blocks: </a>.</p> → </a></p>
    g[field] = g[field].replace(/<\/a>\.<\/p>/g, '</a></p>');

    // 2. Remove commas between links: </a>, <a href → </a> <a href
    g[field] = g[field].replace(/<\/a>,\s*<a href/g, '</a> <a href');

    if (g[field] !== original) fixed++;
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2) + '\n');
console.log('Fixed commas/periods in ' + fixed + ' guides');
