var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// More comprehensive model/brand corrections
var corrections = {
  // Brand names
  'audio-technica': 'Audio-Technica',
  'beyerdynamic': 'Beyerdynamic',
  'sennheiser': 'Sennheiser',
  'focusrite': 'Focusrite',
  'krk': 'KRK',
  'jbl': 'JBL',
  'yamaha': 'Yamaha',
  'adam audio': 'Adam Audio',
  'adam': 'Adam',
  'kali audio': 'Kali Audio',
  'kali': 'Kali',
  'genelec': 'Genelec',
  'neumann': 'Neumann',
  'sony': 'Sony',
  'akg': 'AKG',
  'mackie': 'Mackie',
  'behringer': 'Behringer',
  'rode': 'Rode',
  'shure': 'Shure',
  'focal': 'Focal',
  'preonus': 'PreSonus',
  'presonus': 'PreSonus',
  'motu': 'MOTU',
  'rme': 'RME',
  'ssl': 'SSL',
  'zoom': 'Zoom',
  'tascam': 'Tascam',
  'pioneer': 'Pioneer',
  'akai': 'Akai',
  'elektron': 'Elektron',
  'roland': 'Roland',
  'korg': 'Korg',
  'moog': 'Moog',
  'arturia': 'Arturia',
  'novation': 'Novation',
  'nord': 'Nord',
  'alesis': 'Alesis',
  'samson': 'Samson',
  'mxl': 'MXL',
  'fender': 'Fender',
  'gibson': 'Gibson',
  'martin': 'Martin',
  'taylor': 'Taylor',
  'ibanez': 'Ibanez',
  'boss': 'Boss',
  'strymon': 'Strymon',
  'walrus': 'Walrus',
  'meris': 'Meris',
  'soundtoys': 'Soundtoys',
  'fabfilter': 'FabFilter',
  'izotope': 'iZotope',
  'waves': 'Waves',
  'native instruments': 'Native Instruments',
  'spectrasonics': 'Spectrasonics',
  'cableguys': 'Cableguys',
  'xfer': 'Xfer',
  'd16': 'D16',
  'sonnox': 'Sonnox',
  'oxford': 'Oxford',
  'kazrog': 'Kazrog',
  // Product models
  'dt 770': 'DT 770', 'dt 770 pro': 'DT 770 Pro',
  'dt 880': 'DT 880', 'dt 880 pro': 'DT 880 Pro',
  'dt 990': 'DT 990', 'dt 990 pro': 'DT 990 Pro',
  'dt770': 'DT770', 'dt880': 'DT880', 'dt990': 'DT990',
  'dt770 pro': 'DT770 Pro', 'dt990 pro': 'DT990 Pro',
  'hd 490': 'HD 490', 'hd 490 pro': 'HD 490 Pro', 'hd 490 pro plus': 'HD 490 Pro Plus',
  'hd600': 'HD600', 'hd650': 'HD650', 'hd660s': 'HD660S',
  'hd 600': 'HD 600', 'hd 650': 'HD 650', 'hd 660s': 'HD 660S',
  'kh 80': 'KH 80', 'kh 120': 'KH 120', 'kh 150': 'KH 150', 'kh 310': 'KH 310',
  'kh80': 'KH80', 'kh120': 'KH120', 'kh150': 'KH150', 'kh310': 'KH310',
  'a7v': 'A7V', 'a7h': 'A7H', 't5v': 'T5V', 't7v': 'T7V', 't8v': 'T8V',
  'a7x': 'A7X', 's2v': 'S2V', 's3h': 'S3H', 's3v': 'S3V',
  'lp-6': 'LP-6', 'lp-6 v2': 'LP-6 V2', 'lp-8': 'LP-8', 'lp-8 v2': 'LP-8 V2',
  'in-5': 'IN-5', 'in-8': 'IN-8', 'in-8 v2': 'IN-8 V2',
  'l RM': 'LRM', 'lrm': 'LRM',
  'g5': 'G5', 'mkii': 'MkII', 'mkii': 'MkII',
  '305p': '305P', '306p': '306P', '308p': '308P',
  'hs5': 'HS5', 'hs7': 'HS7', 'hs8': 'HS8', 'hs8s': 'HS8S',
  'rokit': 'Rokit',
  'sc205': 'SC205', 'sc208': 'SC208', 'sc305': 'SC305', 'sc308': 'SC308',
  '8010a': '8010A', '8020d': '8020D', '8030c': '8030C', '8040b': '8040B', '8050b': '8050B',
  'solo': 'Solo', '2i2': '2i2', '4i4': '4i4', '8i6': '8i6', '18i20': '18i20',
  'ssl2': 'SSL2', 'ssl2+': 'SSL2+', 'uac2': 'UAC2',
  'babyface': 'Babyface', 'fireface': 'Fireface', 'ucx': 'UCX', 'ultime': 'UFX',
  'twin': 'Twin', 'duet': 'Duet', 'apollo': 'Apollo',
  'volt': 'Volt', 'volt 1': 'Volt 1', 'volt 2': 'Volt 2', 'volt 276': 'Volt 276',
  'clarett': 'Clarett', 'claret': 'Clarett',
  'mv7': 'MV7', 'mv7+': 'MV7+',
  'goxlr': 'GoXLR', 'wave xlr': 'Wave XLR', 'wave:3': 'Wave:3',
  'podmic': 'PodMic', 'podmic usb': 'PodMic USB',
  'sm57': 'SM57', 'sm58': 'SM58', 'sm7b': 'SM7B', 'sm7db': 'SM7dB',
  'xm8500': 'XM8500', 'q2u': 'Q2U', 'k688': 'K688', 'k669': 'K669', 'k669b': 'K669B',
  'pd200x': 'PD200X',
  'nt1': 'NT1', 'nt1-a': 'NT1-A', 'nt1 signature': 'NT1 Signature',
  're20': 'RE20', 'md421': 'MD421', 'md441': 'MD441',
  'e906': 'e906', 'e835': 'e835', 'e845': 'e845', 'e935': 'e935',
  'at2020': 'AT2020', 'at2035': 'AT2035', 'at4040': 'AT4040', 'at4050': 'AT4050',
  'ath-m50x': 'ATH-M50x', 'ath-m40x': 'ATH-M40x', 'ath-m30x': 'ATH-M30x', 'ath-r70x': 'ATH-R70x',
  'mdr-7506': 'MDR-7506', 'mdr-7520': 'MDR-7520',
  'c414': 'C414', 'c414 xlii': 'C414 XLII', 'c414 xls': 'C414 XLS',
  'ntk': 'NTK', 'ntg': 'NTG', 'ntg2': 'NTG2', 'ntg3': 'NTG3', 'ntg5': 'NTG5',
  'tlm': 'TLM', 'tlm103': 'TLM103', 'tlm102': 'TLM102',
  'u87': 'U87', 'u67': 'U67',
  'v67': 'V67', 'wa-2a': 'WA-2A', 'wa-47': 'WA-47', 'wa-87': 'WA-87', 'wa-67': 'WA-67',
  'la-2a': 'LA-2A', '1176': '1176', 'rmx-16': 'RMX-16',
  'ls-208': 'LS-208', 'fc-357': 'FC-357',
  'gx-d1': 'GX-D1', 'gx-d2': 'GX-D2',
  'k5': 'K5', 'k7': 'K7', 'k8': 'K8', 'k10': 'K10',
  's1': 'S1', 's2': 'S2', 's3': 'S3',
  // Fix "iN" patterns
  'iN-8': 'IN-8', 'iN-8 v2': 'IN-8 V2', 'iN-5': 'IN-5',
  // Fix lowercase product letters
  'l6 v2': 'L6 V2', 'l8 v2': 'L8 V2',
  'q5v': 'Q5V', 'q7v': 'Q7V', 'q8v': 'Q8V',
  // Fix specific patterns found
  'mkii': 'MkII',
  'scarlett': 'Scarlett',
  'focusrite scarlett': 'Focusrite Scarlett',
};

function fixModelsInText(text){
  if(!text) return text;
  var result = text;
  Object.keys(corrections).forEach(function(key){
    var re = new RegExp('\\b' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
    result = result.replace(re, corrections[key]);
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

console.log('Fixed ' + fixes + ' model/brand names');
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
