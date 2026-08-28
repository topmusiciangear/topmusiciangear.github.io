var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Proper nouns that should stay capitalized
var properNouns = /^(SM|AT|NT|USB|XLR|Fifine|Shure|Rode|Audio|Behringer|Samson|AT2035|AT2020|K688|XM8500|Q2U|SM57|SM58|NT1|PodMic|Pro|Cast|Comp|FIFINE|Maono|TONOR|Yamaha|JBL|Adam|Genelec|Focal|Kali|Mackie|SSL|MOTU|RME|PreSonus|Zoom|Tascam|Boss|Strymon|Ibanez|Fender|Gibson|PRS|Martin|Taylor|Pearl|Tama|Zildjian|Meinl|Sabian|Casio|Alesis|Samson|MXL|Neumann|Sennheiser|Beyerdynamic|Sony|AKG|Crown|Crest|Midas|Allen|Heath|Soundcraft|RCF|Cranborne|Warm|Audient|Native|Instruments|K&M|On-Stage|Hosa|Mogami|Harmon|Lauten|sE|Focusrite|Ableton|Cubase|Nuendo|Reaper|Bitwig|Studio|Line|Image|Massive|Kontakt|Battery|Reaktor|FM8|Absynth|Komplete|Omnisphere|Trilian|Stylus|FabFilter|Soundtoys|iZotope|Waves|Kazrog|Sonnox|Cableguys|Xfer|D16|Plugin|Alliance|UAD|Teletronix|Manley|Shadow|Hills|Great|River|Millennia|Neve|AMS|EMT|140|Valhalla|FabFilter|Cableguys|Xfer|D16|Plugin|Alliance|UAD)$/i;

var fixes = 0;
g.forEach(function(guide){
  if(guide.productTable && guide.productTable.title_es){
    var orig = guide.productTable.title_es;
    var words = orig.split(/\s+/);
    var result = [];
    for(var i=0;i<words.length;i++){
      var w = words[i];
      // Strip punctuation for checking
      var clean = w.replace(/[¿¡?!,.:;""''\-()]/g,'');
      if(i===0 || properNouns.test(clean)){
        result.push(w);
      } else if(clean.length > 2 && /^[A-Z]/.test(w)){
        // Lowercase first letter
        result.push(w.charAt(0).toLowerCase() + w.slice(1));
      } else {
        result.push(w);
      }
    }
    guide.productTable.title_es = result.join(' ');
    // Fix "en esta Guía" → "en esta guía"
    guide.productTable.title_es = guide.productTable.title_es.replace(/en esta Guía/g, 'en esta guía');
    if(guide.productTable.title_es !== orig) fixes++;
  }
  // Also fix title_en if needed
  if(guide.productTable && guide.productTable.title){
    var orig = guide.productTable.title;
    // Fix "In This Guide" → "in This Guide" is correct for English, skip
  }
});

console.log('Fixed ' + fixes + ' productTable titles');
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
