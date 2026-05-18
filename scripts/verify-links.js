const fs = require('fs');
const path = require('path');

eval(fs.readFileSync(path.join(__dirname, '..', 'js', 'products.js'), 'utf8').replace(/^const /gm, 'var '));

var issues = [];
var musicstoreAwin = 0, musicstoreFallback = 0;
var reverbLinks = 0, amazonLinks = 0, sweetwaterLinks = 0;
var thomannLinks = 0, pluginboutiqueLinks = 0, gear4musicLinks = 0;
var andertonsLinks = 0, baxmusicLinks = 0, musikproduktivLinks = 0;
var fenderLinks = 0;

products.forEach(function(p) {
  var stores = p.stores || {};
  
  Object.keys(stores).forEach(function(key) {
    var url = stores[key];
    if (!url) return;
    
    if (key === 'musicstore') {
      if (url.includes('awin1.com')) {
        musicstoreAwin++;
        var uedMatch = url.match(/ued=([^&]+)/);
        if (uedMatch) {
          var decoded = decodeURIComponent(uedMatch[1]);
          // Verify decoded URL is a valid musicstore.com URL
          if (decoded.indexOf('musicstore.com') === -1) {
            issues.push('MUSIC STORE [' + p.id + '] ' + p.title + ': ued does not point to musicstore.com');
          }
        }
      } else {
        musicstoreFallback++;
        issues.push('MUSIC STORE [' + p.id + '] ' + p.title + ': NOT an Awin link');
      }
    }
    
    if (key === 'reverb') {
      reverbLinks++;
      if (!url.includes('reverb.com')) {
        issues.push('REVERB [' + p.id + '] ' + p.title + ': not a reverb.com URL');
      }
    }
    
    if (key === 'amazon') {
      amazonLinks++;
      if (url.indexOf('amazon.') === -1) {
        issues.push('AMAZON [' + p.id + '] ' + p.title + ': not an amazon URL');
      }
    }
    
    if (key === 'sweetwater') {
      sweetwaterLinks++;
      if (url.indexOf('sweetwater.com') === -1) {
        issues.push('SWEETWATER [' + p.id + '] ' + p.title + ': not a sweetwater.com URL');
      }
    }
    
    if (key === 'thomann') {
      thomannLinks++;
      if (url.indexOf('thomann') === -1) {
        issues.push('THOMANN [' + p.id + '] ' + p.title + ': not a thomann URL');
      }
    }
    
    if (key === 'pluginboutique') {
      pluginboutiqueLinks++;
      if (url.indexOf('pluginboutique.com') === -1) {
        issues.push('PLUGIN BOUTIQUE [' + p.id + '] ' + p.title + ': not a pluginboutique URL');
      }
      if (url.indexOf('a_aid=6a01e859cbe1a') === -1) {
        issues.push('PLUGIN BOUTIQUE [' + p.id + '] ' + p.title + ': missing affiliate a_aid param');
      }
    }
    
    if (key === 'gear4music') {
      gear4musicLinks++;
      if (url.indexOf('gear4music.com') === -1) {
        issues.push('GEAR4MUSIC [' + p.id + '] ' + p.title + ': not a gear4music URL');
      }
    }
    
    if (key === 'andertons') {
      andertonsLinks++;
      if (url.indexOf('andertons.co.uk') === -1) {
        issues.push('ANDERTONS [' + p.id + '] ' + p.title + ': not an andertons URL');
      }
      if (url.indexOf('irgwc=') === -1 && url.indexOf('irpid=7292297') === -1) {
        issues.push('ANDERTONS [' + p.id + '] ' + p.title + ': missing affiliate params');
      }
    }
    
    if (key === 'baxmusic') {
      baxmusicLinks++;
      if (url.indexOf('bax-shop.co.uk') === -1) {
        issues.push('BAX MUSIC [' + p.id + '] ' + p.title + ': not a bax-shop URL');
      }
    }
    
    if (key === 'musikproduktiv') {
      musikproduktivLinks++;
      if (url.indexOf('musik-produktiv') === -1) {
        issues.push('MUSIK PRODUKTIV [' + p.id + '] ' + p.title + ': not a musik-produktiv URL');
      }
    }
    
    if (key === 'fender') {
      fenderLinks++;
      if (url.indexOf('fender.com') === -1) {
        issues.push('FENDER [' + p.id + '] ' + p.title + ': not a fender.com URL');
      }
    }
  });
});

// Check Shop With Confidence badge
var indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
var msBadge = indexHtml.match(/class="store-logo"[^>]*>[\s\S]*?Music Store[\s\S]*?<\/a>/);
if (msBadge) {
  var badgeUrl = msBadge[0].match(/href="([^"]+)"/);
  if (badgeUrl) {
    if (badgeUrl[1].indexOf('awin1.com/cread.php?awinmid=63816') === -1) {
      issues.push('SHOP WITH CONFIDENCE badge: Music Store link is NOT Awin: ' + badgeUrl[1]);
    } else {
      console.log('Shop With Confidence Music Store badge: Awin link OK');
    }
  }
}

console.log('\n=== COMPREHENSIVE LINK VERIFICATION ===');
console.log('Products with store links:');
console.log('  Music Store (Awin): ' + musicstoreAwin);
console.log('  Reverb: ' + reverbLinks);
console.log('  Amazon: ' + amazonLinks);
console.log('  Sweetwater: ' + sweetwaterLinks);
console.log('  Thomann: ' + thomannLinks);
console.log('  Plugin Boutique: ' + pluginboutiqueLinks);
console.log('  Gear4Music: ' + gear4musicLinks);
console.log('  Andertons: ' + andertonsLinks);
console.log('  Bax Music: ' + baxmusicLinks);
console.log('  Musik Produktiv: ' + musikproduktivLinks);
console.log('  Fender: ' + fenderLinks);

if (issues.length) {
  console.log('\n!!! ISSUES FOUND: ' + issues.length);
  issues.forEach(function(i) { console.log('  ' + i); });
} else {
  console.log('\nAll links verified OK — no issues found!');
}
