var fs = require('fs');
var h = fs.readFileSync('guides/mixing-plugins_es.html', 'utf8');

// Find the smart:EQ 4 section
var idx = h.indexOf('smart-EQ-4');
if (idx < 0) { console.log('NOT FOUND'); process.exit(); }

// Get a window around it
var start = Math.max(0, idx - 500);
var end = Math.min(h.length, idx + 8000);
var section = h.substring(start, end);

// Find ALL href links in this section
var re = /href="([^"]+)"/g;
var m;
console.log('=== ALL LINKS near smart:EQ 4 ===');
while (m = re.exec(section)) {
  var url = m[1];
  if (url.length > 10 && url.indexOf('#') !== 0 && url.indexOf('javascript') < 0) {
    var hasAff = true;
    if (url.indexOf('zzounds.com') >= 0) hasAff = url.indexOf('anrdoezrs.net') >= 0 || url.indexOf('a--925521') >= 0;
    if (url.indexOf('reverb.com') >= 0) hasAff = url.indexOf('awin1.com') >= 0;
    if (url.indexOf('gear4music.com') >= 0) hasAff = url.indexOf('awin1.com') >= 0;
    if (url.indexOf('andertons.co.uk') >= 0) hasAff = url.indexOf('irgwc=') >= 0;
    if (url.indexOf('musicstore.com') >= 0) hasAff = url.indexOf('awin1.com') >= 0;
    if (url.indexOf('pluginboutique.com') >= 0 && url.indexOf('/articles/') < 0) hasAff = url.indexOf('a_aid=') >= 0;
    if (url.indexOf('amazon.com') >= 0) hasAff = url.indexOf('tag=') >= 0;
    
    var status = hasAff ? 'OK' : 'MISSING';
    console.log(status + ' | ' + url.substring(0, 130));
  }
}
