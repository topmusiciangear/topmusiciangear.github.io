const d=require('../data/guides.json');
const mine=['ableton-vs-fl-studio','apollo-vs-babyface','beginner-guitar','best-bass-under-700','best-digital-pianos','best-headphones','best-live-sound-mixers','best-monitors-for-small-rooms','best-practice-amps','best-wireless-iems','budget-usb-mics','dt770-vs-dt990','fix-clipping-scarlett','jbl-vs-kali','me90-vs-mx5','nx912-vs-pxm12mp','pro-guitars','pro-monitors','scarlett-vs-motu','stage-mics','studio-furniture','xr18-vs-m32r'];
const guides=d.filter(g=>mine.includes(g.id));

const enPatterns=[
  [/\bworkhorse\b/gi,'workhorse'],
  [/\b(?:industry )?standard\b/gi,'standard'],
  [/\bbenchmark\b/gi,'benchmark'],
  [/\beffortless(?:ly)?\b/gi,'effortless'],
  [/\bhassle[- ]free\b/gi,'hassle-free'],
  [/\bpro[- ]level\b/gi,'pro-level'],
  [/\bstudio[- ]grade\b/gi,'studio-grade'],
  [/\bincredible\b/gi,'incredible'],
  [/\bessential\b/gi,'essential'],
  [/\bunmatched\b/gi,'unmatched'],
  [/\bunrivaled\b/gi,'unrivaled'],
  [/\bsecond to none\b/gi,'second to none'],
  [/\bthe beast\b/gi,'the beast'],
  [/\bbeast of\b/gi,'beast of'],
  [/\bmonster\b/gi,'monster'],
  [/\bking of the budget\b/gi,'king of the budget'],
  [/\bunlocks?\b/gi,'unlock(s)'],
  [/\bholy grail\b/gi,'holy grail'],
  [/\bbulletproof\b/gi,'bulletproof'],
  [/\bdefinitely\b/gi,'definitely'],
  [/\bultimate weapon\b/gi,'ultimate weapon'],
];

const esPatterns=[
  [/\bcaballo de batalla\b/gi,'caballo de batalla'],
  [/\btodoterreno\b/gi,'todoterreno'],
  [/\best[aá]ndar de la industria\b/gi,'estandar de la industria'],
  [/\bsin esfuerzo\b/gi,'sin esfuerzo'],
  [/\bsin complicaciones\b/gi,'sin complicaciones'],
  [/\bnivel profesional\b/gi,'nivel profesional'],
  [/\bimprescindible\b/gi,'imprescindible'],
  [/\bm[aá]quina de\b/gi,'maquina de'],
  [/\bla bestia\b/gi,'la bestia'],
  [/\bbestia de\b/gi,'bestia de'],
  [/\bmonstruo de\b/gi,'monstruo de'],
  [/\bno tiene rival\b/gi,'no tiene rival'],
  [/\bincre[ií]ble\b/gi,'increible'],
  [/\ba prueba de balas\b/gi,'a prueba de balas'],
  [/\bdesbloquea\b/gi,'desbloquea'],
  [/\beleva tu\b/gi,'eleva tu'],
  [/\ba otro nivel\b/gi,'a otro nivel'],
  [/\bel rey del presupuesto\b/gi,'el rey del presupuesto'],
  [/\barma definitiva\b/gi,'arma definitiva'],
  [/\bsin igual\b/gi,'sin igual'],
  [/\bel rey de los\b/gi,'el rey de los'],
];

function scanText(text, patterns) {
  const hits=[];
  for(const [re,name] of patterns) {
    re.lastIndex=0;
    let m;
    while((m=re.exec(text))!==null) {
      const start=Math.max(0,m.index-50);
      const end=Math.min(text.length, m.index+m[0].length+50);
      hits.push({term:name, match:m[0], context:text.substring(start,end)});
    }
  }
  return hits;
}

function collectStrings(obj, prefix) {
  const strings=[];
  if(typeof obj==='string') return [{path:prefix, value:obj}];
  if(Array.isArray(obj)) {
    obj.forEach((item,i)=>strings.push(...collectStrings(item, prefix+'['+i+']')));
  } else if(obj && typeof obj==='object') {
    for(const k of Object.keys(obj)) {
      strings.push(...collectStrings(obj[k], prefix+(prefix?'.':'')+k));
    }
  }
  return strings;
}

let enTotal=0, esTotal=0;
for(const g of guides) {
  const strings=collectStrings(g,'');
  const enHits=[], esHits=[];
  for(const s of strings) {
    if(s.path.endsWith('_es')) {
      const h=scanText(s.value, esPatterns);
      if(h.length) esHits.push({path:s.path, hits:h});
    } else if(!s.path.match(/_es$/) && typeof s.value==='string' && s.value.length>10) {
      if(!s.path.match(/image|url|href|id$/i)) {
        const h=scanText(s.value, enPatterns);
        if(h.length) enHits.push({path:s.path, hits:h});
      }
    }
  }
  if(enHits.length || esHits.length) {
    console.log('\n=== '+g.id+' ===');
    if(enHits.length) {
      console.log('  EN:');
      for(const f of enHits) {
        for(const h of f.hits) {
          console.log('    ['+h.term+'] '+f.path+': ...'+h.context+'...');
        }
        enTotal+=f.hits.length;
      }
    }
    if(esHits.length) {
      console.log('  ES:');
      for(const f of esHits) {
        for(const h of f.hits) {
          console.log('    ['+h.term+'] '+f.path+': ...'+h.context+'...');
        }
        esTotal+=f.hits.length;
      }
    }
  }
}
console.log('\nTOTAL EN hits: '+enTotal);
console.log('TOTAL ES hits: '+esTotal);
