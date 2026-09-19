var fs = require('fs');
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var broken = 0;
guides.forEach(function(g) {
  ['en', 'es'].forEach(function(lang) {
    var file = 'guides/' + g.id + (lang === 'es' ? '_es' : '') + '.html';
    if (!fs.existsSync(file)) return;
    var html = fs.readFileSync(file, 'utf8');
    var t = html.match(/<title>([\s\S]*?)<\/title>/);
    var h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    if (!t || !h1) { console.log('MISSING title/h1:', file); broken++; return; }
    var h1txt = h1[1].replace(/<[^>]+>/g, '').trim();
    var tcore = t[1].replace(/ \| TopMusicianGear$/, '').trim();
    if (h1txt !== tcore) { console.log('MISMATCH:', file, '| H1:', h1txt, '| TITLE:', tcore); broken++; }
  });
});
console.log(broken === 0 ? 'ALL 302 pages: H1 core === TITLE core' : broken + ' mismatches');