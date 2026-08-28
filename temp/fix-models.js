var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Correct casing for product model names
var models = {
  'sm57': 'SM57', 'sm58': 'SM58', 'sm7b': 'SM7B', 'sm7db': 'SM7dB',
  'xm8500': 'XM8500', 'q2u': 'Q2U', 'k688': 'K688', 'k669': 'K669',
  'k669b': 'K669B', 'pd200x': 'PD200X',
  'nt1': 'NT1', 'nt1-a': 'NT1-A', 'nt1 signature': 'NT1 Signature',
  'podmic': 'PodMic', 'podmic usb': 'PodMic USB',
  're20': 'RE20', 'md421': 'MD421', 'md441': 'MD441', 'm201': 'M201',
  'e906': 'e906', 'e835': 'e835', 'e845': 'e845', 'e935': 'e935',
  'at2020': 'AT2020', 'at2035': 'AT2035', 'at4040': 'AT4040', 'at4050': 'AT4050',
  'ath-m50x': 'ATH-M50x', 'ath-m40x': 'ATH-M40x', 'ath-m30x': 'ATH-M30x', 'ath-r70x': 'ATH-R70x',
  'dt770': 'DT770', 'dt880': 'DT880', 'dt990': 'DT990',
  'dt770 pro': 'DT770 Pro', 'dt990 pro': 'DT990 Pro',
  'k371': 'K371', 'k240': 'K240', 'k701': 'K701', 'k712': 'K712',
  'mdr-7506': 'MDR-7506',
  '305p': '305P', '306p': '306P', '308p': '308P',
  'lp-6': 'LP-6', 'lp-6 v2': 'LP-6 V2',
  't5v': 'T5V', 't7v': 'T7V', 't8v': 'T8V',
  'hs5': 'HS5', 'hs7': 'HS7', 'hs8': 'HS8', 'hs8s': 'HS8S',
  'sc205': 'SC205', 'sc208': 'SC208',
  '2i2': '2i2', '4i4': '4i4', '8i6': '8i6',
  'ssl2': 'SSL2', 'ssl2+': 'SSL2+',
  'babyface': 'Babyface', 'fireface': 'Fireface',
  'twin': 'Twin', 'duet': 'Duet',
  'volt': 'Volt', 'volt 1': 'Volt 1', 'volt 2': 'Volt 2', 'volt 276': 'Volt 276',
  'clarett': 'Clarett', 'gxl': 'GXL', 'gx-d1': 'GX-D1', 'gx-d2': 'GX-D2',
  'mv7': 'MV7', 'mv7+': 'MV7+',
  'goxlr': 'GoXLR', 'wave xlr': 'Wave XLR', 'wave:3': 'Wave:3',
  'ntk': 'NTK', 'ntg': 'NTG', 'ntg2': 'NTG2', 'ntg3': 'NTG3', 'ntg5': 'NTG5',
  'tlm': 'TLM', 'tlm103': 'TLM103', 'tlm102': 'TLM102',
  'u87': 'U87', 'u67': 'U67',
  'c414': 'C414', 'c414 xlii': 'C414 XLII', 'c414 xls': 'C414 XLS',
  'v67': 'V67', '990': '990', '991': '991', '770': '770',
  'wa-2a': 'WA-2A', 'wa-47': 'WA-47', 'wa-87': 'WA-87', 'wa-67': 'WA-67',
  'la-2a': 'LA-2A', '1176': '1176', 'rmx-16': 'RMX-16',
  'ls-208': 'LS-208', 'fc-357': 'FC-357',
  'k669b': 'K669B',
  // Also fix "fifine" -> "FIFINE"
  'fifine': 'FIFINE',
  // Fix "nT1" -> "NT1"
  'nt1': 'NT1',
  // Fix "aT2020" -> "AT2020", "aT2035" -> "AT2035"
  'at2020': 'AT2020', 'at2035': 'AT2035',
};

function fixModelsInText(text){
  if(!text) return text;
  var result = text;
  // Replace each wrong-cased model with correct one
  Object.keys(models).forEach(function(key){
    // Case-insensitive replace
    var re = new RegExp('\\b' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
    result = result.replace(re, models[key]);
  });
  return result;
}

var fixes = 0;
g.forEach(function(guide){
  if(guide.title_es){
    var orig = guide.title_es;
    guide.title_es = fixModelsInText(guide.title_es);
    if(orig !== guide.title_es) fixes++;
  }
  (guide.sections||[]).forEach(function(s){
    if(s.heading_es){
      var orig = s.heading_es;
      s.heading_es = fixModelsInText(s.heading_es);
      if(orig !== s.heading_es) fixes++;
    }
  });
});

console.log('Fixed ' + fixes + ' model names');
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
