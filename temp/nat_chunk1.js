const fs = require('fs');
const d = require('../data/guides.json');
const mine = ['ableton-vs-fl-studio','apollo-vs-babyface','beginner-guitar','best-bass-under-700','best-digital-pianos','best-headphones','best-live-sound-mixers','best-monitors-for-small-rooms','best-practice-amps','best-wireless-iems','budget-usb-mics','dt770-vs-dt990','fix-clipping-scarlett','jbl-vs-kali','me90-vs-mx5','nx912-vs-pxm12mp','pro-guitars','pro-monitors','scarlett-vs-motu','stage-mics','studio-furniture','xr18-vs-m32r'];

const guides = d.filter(g => mine.includes(g.id));

// Deep clone
const out = JSON.parse(JSON.stringify(guides));

// Helper: replace in a specific guide's specific string fields
function rp(guideId, oldStr, newStr, lang) {
  const g = out.find(x => x.id === guideId);
  if (!g) { console.error('GUIDE NOT FOUND: ' + guideId); return; }
  let count = 0;
  function replaceInObj(obj, keyPath) {
    if (typeof obj === 'string') {
      if (obj.includes(oldStr)) {
        const replaced = obj.split(oldStr).join(newStr);
        if (replaced !== obj) count++;
        return replaced;
      }
      return obj;
    }
    if (Array.isArray(obj)) return obj.map((item, i) => replaceInObj(item, keyPath + '[' + i + ']'));
    if (obj && typeof obj === 'object') {
      const result = {};
      for (const k of Object.keys(obj)) {
        result[k] = replaceInObj(obj[k], keyPath ? keyPath + '.' + k : k);
      }
      return result;
    }
    return obj;
  }
  // Only replace in _es fields for ES, non-_es for EN
  if (lang === 'es') {
    // Walk all _es fields
    function replaceInEs(obj) {
      if (typeof obj === 'string') return obj; // skip strings
      if (Array.isArray(obj)) return obj.map(replaceInEs);
      if (obj && typeof obj === 'object') {
        const result = {};
        for (const k of Object.keys(obj)) {
          if (k.endsWith('_es') && typeof obj[k] === 'string') {
            if (obj[k].includes(oldStr)) {
              result[k] = obj[k].split(oldStr).join(newStr);
              count++;
            } else {
              result[k] = obj[k];
            }
          } else if (Array.isArray(obj[k])) {
            result[k] = obj[k].map(item => {
              if (typeof item === 'object' && item !== null) {
                const r = {};
                for (const ik of Object.keys(item)) {
                  if (ik.endsWith('_es') && typeof item[ik] === 'string') {
                    if (item[ik].includes(oldStr)) {
                      r[ik] = item[ik].split(oldStr).join(newStr);
                      count++;
                    } else {
                      r[ik] = item[ik];
                    }
                  } else {
                    r[ik] = item[ik];
                  }
                }
                return r;
              }
              return item;
            });
          } else if (obj[k] && typeof obj[k] === 'object') {
            result[k] = replaceInEs(obj[k]);
          } else {
            result[k] = obj[k];
          }
        }
        return result;
      }
      return obj;
    }
    // Merge back
    const merged = replaceInEs(g);
    Object.assign(g, merged);
  } else {
    // EN: replace in non-_es string fields, but NOT fields that are _es
    function replaceInEn(obj) {
      if (typeof obj === 'string') return obj;
      if (Array.isArray(obj)) return obj.map(replaceInEn);
      if (obj && typeof obj === 'object') {
        const result = {};
        for (const k of Object.keys(obj)) {
          if (k.endsWith('_es')) {
            result[k] = obj[k]; // skip ES fields
          } else if (typeof obj[k] === 'string') {
            if (obj[k].includes(oldStr)) {
              result[k] = obj[k].split(oldStr).join(newStr);
              count++;
            } else {
              result[k] = obj[k];
            }
          } else if (Array.isArray(obj[k])) {
            result[k] = obj[k].map(item => {
              if (typeof item === 'object' && item !== null) {
                const r = {};
                for (const ik of Object.keys(item)) {
                  if (ik.endsWith('_es')) {
                    r[ik] = item[ik];
                  } else if (typeof item[ik] === 'string') {
                    if (item[ik].includes(oldStr)) {
                      r[ik] = item[ik].split(oldStr).join(newStr);
                      count++;
                    } else {
                      r[ik] = item[ik];
                    }
                  } else {
                    r[ik] = item[ik];
                  }
                }
                return r;
              }
              return item;
            });
          } else if (obj[k] && typeof obj[k] === 'object') {
            result[k] = replaceInEn(obj[k]);
          } else {
            result[k] = obj[k];
          }
        }
        return result;
      }
      return obj;
    }
    const merged = replaceInEn(g);
    Object.assign(g, merged);
  }
  return count;
}

let enFixes = 0, esFixes = 0;
function E(guid, old, rep) { const c = rp(guid, old, rep, 'en'); enFixes += c; if(c) console.log('  EN ['+guid+']: '+c+'x "'+old+'"'); }
function S(guid, old, rep) { const c = rp(guid, old, rep, 'es'); esFixes += c; if(c) console.log('  ES ['+guid+']: '+c+'x "'+old+'"'); }

console.log('--- REWRITES ---');

// ============================================================
// best-headphones
// ============================================================
E('best-headphones', 'which makes them essential for checking mixes in any space', 'which makes them key for checking mixes in any space');
E('best-headphones', 'The DT 770 Pro is the gold standard for closed-back monitoring. ', 'The DT 770 Pro is the reference for closed-back tracking. ');
E('best-headphones', 'The 80 Ohm version has incredible detail retrieval', 'The 80 Ohm version pulls out impressively detailed retrieval');
E('best-headphones', 'tuned to the Harman target curve. The scientific gold standard for headphone frequency response', 'tuned to the Harman target curve — the target curve headphone engineers aim for');
E('best-headphones', 'the workhorse you\'ll reach for every day', 'the pair you\'ll reach for most days');
E('best-headphones', 'The gold standard for closed-back monitoring', 'The reference for closed-back tracking');
E('best-headphones', 'The broadcast standard since 1991', 'A fixture on broadcast sets since 1991');
E('best-headphones', 'the scientific gold standard for frequency response', 'the frequency response target that science backs');
E('best-headphones', 'remain the studio standard for closed-back tracking', 'remain the go-to for closed-back tracking');
E('best-headphones', 'the modern reference standard for critical listening', 'the modern reference for critical listening');
E('best-headphones', 'the broadcast standard since 1991: its forward midrange', 'a broadcast fixture since 1991: its forward midrange');

S('best-headphones', 'los DT 770 Pro son el caballo de batalla al que recurrirás todos los días', 'los DT 770 Pro son los que más usarás en el día a día');

// ============================================================
// stage-mics
// ============================================================
E('stage-mics', 'the SM58 is the world standard for live vocals', 'the SM58 is the most-used vocal mic on live stages');
E('stage-mics', 'The SM58 is still the world\'s standard for live vocals', 'The SM58 is still the most-used vocal mic for live vocals');
E('stage-mics', 'are the standard choice on loud professional stages', 'are the default choice on loud professional stages');
E('stage-mics', 'is the undisputed stage standard for guitar amps', 'is the go-to for guitar amps on stage');
E('stage-mics', 'The world standard for live vocals', 'The most-used vocal mic for live vocals');
E('stage-mics', 'the ultimate utility player', 'one of the most versatile tools you can put on a stage');

// ============================================================
// studio-furniture
// ============================================================
E('studio-furniture', 'The Mogami per cable is the gold standard', 'The Mogami Gold cable is the reference');
E('studio-furniture', 'For small rooms, this essential', 'For small rooms, this is a key upgrade');
// Leave "definitely worth adding" — it's natural conversational

// ============================================================
// beginner-guitar
// ============================================================
E('beginner-guitar', 'the standard recommendation for beginners', 'the starting point for most beginners');
E('beginner-guitar', 'a pickup swap unlocks more character later', 'a pickup swap opens up more character later');
S('beginner-guitar', 'increíble por el precio, sin discusión', 'calidad sorprendente por el precio, sin discusión');

// ============================================================
// best-bass-under-700
// ============================================================
E('best-bass-under-700', 'each offering incredible quality for their price', 'each offering seriously good build quality for the money');
E('best-bass-under-700', 'The Passive Studio Workhorse', 'The Passive Studio Go-To');
E('best-bass-under-700', 'the passive P/J workhorse that sound engineers quietly reach for', 'the passive P/J that sound engineers quietly reach for');
E('best-bass-under-700', 'the passive studio workhorse for recording', 'the passive studio go-to for recording');
E('best-bass-under-700', 'is the recording workhorse', 'is the recording go-to');
E('best-bass-under-700', 'prove incredible quality is within reach', 'prove you can get seriously good quality for well under');

S('best-bass-under-700', 'la bestia de carga pasiva de estudio', 'la favorita pasiva de estudio');
S('best-bass-under-700', 'la bestia de carga pasiva P/J que los ingenieros de sonido eligen en silencio', 'la P/J pasiva que los ingenieros de sonido eligen en silencio');
S('best-bass-under-700', 'la bestia de carga pasiva para estudio', 'la favorita pasiva para estudio');
S('best-bass-under-700', 'la bestia de carga para grabar', 'la favorita de carga para grabar');
S('best-bass-under-700', 'la bestia de carga para', 'la favorita de carga para');

// ============================================================
// best-digital-pianos
// ============================================================
// "Standard" in "PHA-4 Standard" is a product name — DO NOT TOUCH
E('best-digital-pianos', 'the stage and studio standard', 'the stage and studio reference');
// Leave "pro-level investment" — natural in context of pros vs home

// ============================================================
// best-monitors-for-small-rooms
// ============================================================
E('best-monitors-for-small-rooms', 'the ribbon tweeter detail is unmatched', 'the ribbon tweeter detail is very hard to beat');
E('best-monitors-for-small-rooms', 'the reference standard in project studios worldwide', 'the go-to reference in project studios worldwide');
E('best-monitors-for-small-rooms', 'are essential for accurate monitoring', 'are important for accurate monitoring');
E('best-monitors-for-small-rooms', 'the professional reference standard', 'the professional reference');

S('best-monitors-for-small-rooms', 'no tiene rival', 'es muy difícil de superar');

// ============================================================
// apollo-vs-babyface
// ============================================================
E('apollo-vs-babyface', 'studio-grade analog emulation', 'high-quality analog emulation');
E('apollo-vs-babyface', 'bulletproof drivers', 'rock-solid drivers');
E('apollo-vs-babyface', 'bulletproof routing', 'rock-solid routing');
E('apollo-vs-babyface', 'bulletproof routing', 'rock-solid routing');
E('apollo-vs-babyface', 'and unrivaled driver stability', 'and class-leading driver stability');

// ============================================================
// xr18-vs-m32r
// ============================================================
E('xr18-vs-m32r', 'offers incredible value', 'offers serious value');
E('xr18-vs-m32r', 'bulletproof reliability', 'road-proven reliability');

S('xr18-vs-m32r', 'construcción de nivel profesional', 'construcción de calidad profesional');

// ============================================================
// scarlett-vs-motu
// ============================================================
E('scarlett-vs-motu', 'hassle-free setup', 'straightforward setup');
E('scarlett-vs-motu', 'studio-grade metering', 'accurate metering');
E('scarlett-vs-motu', 'The Proven Standard', 'The Proven Workhorse');

S('scarlett-vs-motu', 'configuración sin complicaciones', 'configuración sencilla');
S('scarlett-vs-motu', 'medición de nivel profesional', 'medición de nivel precisa');
S('scarlett-vs-motu', 'audio de nivel profesional a un precio de entrada', 'audio de calidad profesional a un precio de entrada');
S('scarlett-vs-motu', 'obtienes una interfaz de nivel profesional que te servirá', 'obtienes una interfaz de calidad profesional que te servirá');

// ============================================================
// pro-guitars
// ============================================================
E('pro-guitars', 'The two essential electric guitars', 'The two core electric guitars');
E('pro-guitars', 'the two essential tones', 'the two core tones');
E('pro-guitars', 'Every professional guitarist needs both', 'Any working guitarist wants both');
E('pro-guitars', 'The ultimate professional Strat for any genre', 'A professional Strat that works across any genre');
E('pro-guitars', 'The ultimate rock machine', 'The definitive rock workhorse');
E('pro-guitars', 'The definitive rock machine', 'The definitive rock workhorse');
E('pro-guitars', 'The definitive rock guitar', 'The definitive rock instrument');
E('pro-guitars', 'makes complex runs feel effortless', 'makes complex runs feel smooth');
// Leave "every electric guitar tone you will ever need" — natural enough

S('pro-guitars', 'Las dos guitarras eléctricas esenciales', 'Las dos guitarras eléctricas que todo guitarrista necesita');
S('pro-guitars', 'los dos tonos esenciales', 'los dos tonos que todo guitarrista domina');
S('pro-guitars', 'la máquina de rock definitiva', 'la guitarra de rock por excelencia');
S('pro-guitars', 'La máquina de rock definitiva', 'La guitarra de rock por excelencia');
S('pro-guitars', 'La Strat profesional definitiva para cualquier género', 'Una Strat profesional que funciona en cualquier género');
S('pro-guitars', 'hace que los pasajes complejos sean sin esfuerzo', 'hace que los pasajes complejos se sientan fluidos');

// ============================================================
// me90-vs-mx5
// ============================================================
E('me90-vs-mx5', 'studio-grade modeling', 'amp modeling worthy of a studio');

// ============================================================
// nx912-vs-pxm12mp
// ============================================================
E('nx912-vs-pxm12mp', 'The RCF is a monster', 'The RCF is a powerhouse');

// ============================================================
// budget-usb-mics
// ============================================================
S('budget-usb-mics', 'un todoterreno confiable', 'un micrófono versátil y fiable');
S('budget-usb-mics', 'el mejor micrófono USB económico todoterreno', 'el mejor micrófono USB dinámico económico');
S('budget-usb-mics', 'el mejor micrófono USB todoterreno', 'el mejor micrófono USB versátil');

// ============================================================
// best-wireless-iems
// ============================================================
E('best-wireless-iems', 'to unlock what this system really delivers', 'to get the most from this system');
// "touring standard" is natural here — leave it

// ============================================================
// dt770-vs-dt990
// ============================================================
E('dt770-vs-dt990', 'The DT 770 Pro (closed-back) is the industry standard for tracking', 'The DT 770 Pro (closed-back) is what most studios reach for when tracking');
E('dt770-vs-dt990', 'different but both essential', 'different but both go-tos');
E('dt770-vs-dt990', 'is essential for recording in the same room as a mic', 'is what you need for recording in the same room as a mic');
E('dt770-vs-dt990', 'its closed design is essential when you are tracking', 'its closed design is what you want when tracking');
E('dt770-vs-dt990', 'making it the tracking standard', 'making it the tracking go-to');

S('dt770-vs-dt990', 'es el estándar de la industria para seguimiento', 'es lo que más se usa en los estudios para grabar');

// ============================================================
// fix-clipping-scarlett
// ============================================================
E('fix-clipping-scarlett', 'The industry-standard dynamic mic', 'The go-to dynamic mic');
E('fix-clipping-scarlett', 'The broadcast standard with', 'The broadcast fixture with');

// ============================================================
// jbl-vs-kali
// ============================================================
E('jbl-vs-kali', 'Both are incredible values', 'Both are seriously good buys');
// Leave "Standard silk dome tweeter" — refers to a standard design type, natural

// ============================================================
// best-practice-amps
// ============================================================
E('best-practice-amps', 'pro-level tones', 'solid tones');

// ============================================================
// best-live-sound-mixers
// ============================================================
E('best-live-sound-mixers', 'The Yamaha MG10XU is the industry standard for small-format mixing.', 'The Yamaha MG10XU is the most common choice for small-format mixing.');
E('best-live-sound-mixers', 'It\'s the benchmark that all other digital mixers are compared to.', 'It\'s the one every other digital mixer gets measured against.');
E('best-live-sound-mixers', 'pro-level audio fidelity', 'professional audio quality');
E('best-live-sound-mixers', 'It is the workhorse for medium-sized venues', 'It is the go-to for medium-sized venues');
E('best-live-sound-mixers', 'a standard rack-mountable format', 'a standard 19-inch rack format');
E('best-live-sound-mixers', 'is the industry standard for small-format mixing', 'is the most common choice for small-format mixing');

S('best-live-sound-mixers', 'una mezcla de nivel profesional para entornos exigentes', 'una mezcla de calidad profesional para entornos exigentes');
S('best-live-sound-mixers', 'fidelidad de audio de nivel profesional', 'calidad de audio profesional');
S('best-live-sound-mixers', 'Es el caballo de batalla para venues de tamaño mediano', 'Es la opción habitual para venues de tamaño mediano');

// ============================================================
// ableton-vs-fl-studio
// ============================================================
E('ableton-vs-fl-studio', 'Ableton Live 12 Suite is the industry standard', 'Ableton Live 12 Suite is the benchmark most electronic producers compare against');
E('ableton-vs-fl-studio', 'Ableton Live 12 Suite is the standard for electronic music', 'Ableton Live 12 Suite is what most electronic producers use');

S('ableton-vs-fl-studio', 'Ableton Live 12 Suite es el estándar de la industria', 'Ableton Live 12 Suite es el que más se usa en producción electrónica');
S('ableton-vs-fl-studio', 'la máquina de las actuaciones en vivo', 'la herramienta por excelencia para actuaciones en vivo');

// ============================================================
// pro-monitors
// ============================================================
E('pro-monitors', 'making treatment essential', 'making treatment non-negotiable');

// ============================================================
// Write output
// ============================================================
fs.writeFileSync(__dirname + '/_nat_chunk1.json', JSON.stringify(out, null, 2), 'utf8');

// Verify JSON parses
try {
  JSON.parse(fs.readFileSync(__dirname + '/_nat_chunk1.json', 'utf8'));
  console.log('\n✓ JSON parses correctly');
} catch(e) {
  console.error('\n✗ JSON parse error:', e.message);
}

console.log('\nTotal guides: ' + out.length);
console.log('EN fixes: ' + enFixes);
console.log('ES fixes: ' + esFixes);
console.log('Total fixes: ' + (enFixes + esFixes));
