var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Product model patterns that should stay as-is
var productModels = /^(SM57|SM58|SM7B|SM7dB|MD421|MD441|M201|M50x|M40x|NT1|NT1-A|NT1 Signature|PodMic|RE20|AT2020|AT2035|AT4040|AT4050|ATH-M50x|ATH-M40x|ATH-M30x|ATH-R70x|DT770|DT880|DT990|DT770 Pro|DT990 Pro|K371|K240|K701|K712|MDR-7506|XM8500|Q2U|K688|K669|PD200X|MV7|MV7\+|e906|e835|e845|e935|305P|306P|308P|LP-6|LP-6 V2|T5V|T7V|T8V|HS5|HS7|HS8|HS8S|Rokit|V67|C414|NTK|NTG|TLM|U87|U67|LS-208|FC-357|WA-2A|WA-47|WA-87|WA-67|RMX-16|LA-2A|1176|2i2|4i4|8i6|SSL2|SSL2\+|Babyface|Fireface|Twin|x4|x6|x8|Duet|Volt|Clarett|GoXLR|Wave XLR|Wave:3|GX-D1|GX-D2|SC205|SC208|KRK|Yamaha|JBL|Adam|Genelec|Focal|Kali|Mackie|Behringer|QSC|EV|Pioneer|Akai|Elektron|Roland|Korg|Moog|Arturia|Novation|Nord|Focusrite|SSL|MOTU|RME|PreSonus|Zoom|Tascam|Boss|Strymon|Walrus|Meris|Chase|Bliss|Ibanez|Fender|Gibson|PRS|Martin|Taylor|Pearl|Tama|Zildjian|Meinl|Sabian|Casio|Alesis|Samson|MXL|Neumann|Shure|Sennheiser|Audio-Technica|AKG|Beyerdynamic|Sony|Rode|Royer|Telefunken|Crown|Crest|Midas|Allen|Heath|Soundcraft|RCF|Cranborne|Warm|Audient|Native|Instruments|K&M|On-Stage|Hosa|Mogami|Harmon|Lauten|sE|FIFINE|Maono|TONOR|XCM|PD200|FIFINE|K669B|K688|PD200X|PodMic USB|Wireless GO|Wireless PRO|SM57|SM58|SM7B|RE20|NT1|PodMic|AT2020|AT2035|ATH-M50x|DT770|DT990|K371|MDR-7506|HS5|HS8|305P|LP-6|T5V|T7V|K5|K7|K8|K10|KRK|Rokit|Yamaha|JBL|Adam|Genelec|Focal|Kali|Mackie|Behringer|QSC|EV|Pioneer|Akai|Elektron|Roland|Korg|Moog|Arturia|Novation|Nord|Focusrite|SSL|MOTU|RME|PreSonus|Zoom|Tascam|Boss|Strymon|Walrus|Meris|Chase|Bliss|Ibanez|Fender|Gibson|PRS|Martin|Taylor|Pearl|Tama|Zildjian|Meinl|Sabian|Casio|Alesis|Samson|MXL|Neumann|Shure|Sennheiser|Audio-Technica|AKG|Beyerdynamic|Sony|Rode|Royer|Telefunken|Crown|Crest|Midas|Allen|Heath|Soundcraft|RCF|Cranborne|Warm|Audient|Native|Instruments|K&M|On-Stage|Hosa|Mogami|Harmon|Lauten|sE|FIFINE|Maono|TONOR)$/i;

function fixESTitle(title){
  if(!title) return title;
  if(title.length < 5) return title;

  var words = title.split(/(\s+)/);
  var result = [];
  var isFirstWord = true;

  for(var i=0; i<words.length; i++){
    var word = words[i];
    if(!word.trim()){ result.push(word); continue; }

    if(/^[¿¡?!,.:;"'\-()\[\]]+$/.test(word)){
      result.push(word);
      continue;
    }

    if(isFirstWord){
      result.push(word);
      isFirstWord = false;
      continue;
    }

    if(productModels.test(word)){
      result.push(word);
      continue;
    }

    if(word === word.toUpperCase() && word.length > 1){
      result.push(word);
      continue;
    }

    if(/^[A-Z]/.test(word)){
      result.push(word.charAt(0).toLowerCase() + word.slice(1));
      continue;
    }

    result.push(word);
  }

  return result.join('');
}

var fixes = 0;
g.forEach(function(guide){
  if(guide.title_es){
    var orig = guide.title_es;
    guide.title_es = fixESTitle(guide.title_es);
    if(orig !== guide.title_es) fixes++;
  }
  (guide.sections||[]).forEach(function(s){
    if(s.heading_es){
      var orig = s.heading_es;
      s.heading_es = fixESTitle(s.heading_es);
      if(orig !== s.heading_es) fixes++;
    }
  });
});

console.log('Fixed ' + fixes + ' titles');
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
