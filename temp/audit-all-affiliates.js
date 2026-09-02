var fs = require('fs');
var path = require('path');

var guideDir = 'guides';
var files = fs.readdirSync(guideDir).filter(f => f.endsWith('.html'));

var results = {
  zzounds: { total: 0, withAff: 0, missing: [] },
  reverb: { total: 0, withAff: 0, missing: [] },
  gear4music: { total: 0, withAff: 0, missing: [] },
  andertons: { total: 0, withAff: 0, missing: [] },
  musicstore: { total: 0, withAff: 0, missing: [] },
  pluginboutique: { total: 0, withAff: 0, missing: [] },
  amazon: { total: 0, withAff: 0, missing: [] }
};

var storeChecks = {
  zzounds: function(url) { return url.indexOf('zzounds.com') >= 0 && (url.indexOf('anrdoezrs.net') >= 0 || url.indexOf('a--925521') >= 0); },
  reverb: function(url) { return url.indexOf('reverb.com') >= 0 && url.indexOf('awin1.com') >= 0; },
  gear4music: function(url) { return url.indexOf('gear4music.com') >= 0 && url.indexOf('awin1.com') >= 0; },
  andertons: function(url) { return url.indexOf('andertons.co.uk') >= 0 && url.indexOf('irgwc=') >= 0; },
  musicstore: function(url) { return url.indexOf('musicstore.com') >= 0 && url.indexOf('awin1.com') >= 0; },
  pluginboutique: function(url) { 
    if (url.indexOf('pluginboutique.com') < 0) return false;
    if (url.indexOf('/articles/') >= 0) return true; // article links, not affiliate
    return url.indexOf('a_aid=') >= 0;
  },
  amazon: function(url) { return url.indexOf('amazon.com') >= 0 && url.indexOf('tag=') >= 0; }
};

var storeDomain = {
  zzounds: 'zzounds.com',
  reverb: 'reverb.com',
  gear4music: 'gear4music.com',
  andertons: 'andertons.co.uk',
  musicstore: 'musicstore.com',
  pluginboutique: 'pluginboutique.com',
  amazon: 'amazon.com'
};

files.forEach(function(file) {
  var h = fs.readFileSync(path.join(guideDir, file), 'utf8');
  var re = /href="(https?:\/\/[^"]+)"/g;
  var m;
  while (m = re.exec(h)) {
    var url = m[1];
    Object.keys(storeChecks).forEach(function(store) {
      if (url.indexOf(storeDomain[store]) >= 0) {
        results[store].total++;
        if (storeChecks[store](url)) {
          results[store].withAff++;
        } else if (results[store].missing.length < 5) {
          results[store].missing.push(file + ': ' + url.substring(0, 120));
        }
      }
    });
  }
});

console.log('=== AFFILIATE LINK AUDIT (ALL GUIDES - ALL STORES) ===\n');
var allOk = true;
Object.keys(results).forEach(function(store) {
  var r = results[store];
  var pct = r.total > 0 ? Math.round(r.withAff / r.total * 100) : 100;
  var status = pct === 100 ? 'OK' : 'MISSING';
  if (pct < 100) allOk = false;
  console.log(status + ' ' + store + ': ' + r.withAff + '/' + r.total + ' (' + pct + '%)');
  if (r.missing.length > 0) {
    r.missing.forEach(function(m) { console.log('  MISSING: ' + m); });
  }
});
console.log('\n' + (allOk ? 'ALL STORES OK' : 'SOME STORES HAVE MISSING AFFILIATES'));
