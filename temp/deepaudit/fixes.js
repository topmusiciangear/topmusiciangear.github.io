var fs = require('fs');
var path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
var g = JSON.parse(fs.readFileSync(path, 'utf8'));

var log = [];
function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function applyAll(objs, list) {
  var total = 0;
  function walk(o, leaveTags) {
    if (typeof o === 'string') {
      var s = o;
      list.forEach(function (it) {
        var from = it.re || esc(it.s);
        var re = new RegExp(from, 'g');
        var m = s.match(re);
        if (m) { var n = m.length; s = s.replace(re, it.to); total += n; log.push((it.note || it.s) + ' x' + n + ' [' + s.indexOf(it.to) + ']'); }
      });
      return s;
    }
    if (Array.isArray(o)) { return o.map(function (v) { return walk(v); }); }
    if (o && typeof o === 'object') { Object.keys(o).forEach(function (k) { o[k] = walk(o[k]); }); return o; }
    return o;
  }
  objs.forEach(walk);
  return total;
}

function byId(id) { return g.find(function (x) { return x.id === id; }); }

function scoped(replacements) {
  var n = 0;
  replacements.forEach(function (r) {
    var x = byId(r.id);
    if (!x) { console.log('NO GUIDE ' + r.id); return; }
    var f = r.f.split(/[.\[\]]+/).filter(Boolean);
    var node = x;
    for (var i = 0; i < f.length - 1; i++) node = node[f[i]];
    var key = f[f.length - 1];
    if (typeof node[key] !== 'string') { console.log('NOT-STRING ' + r.id + '.' + r.f + ' = ' + typeof node[key]); return; }
    var from = new RegExp(r.s, 'g');
    var m = node[key].match(from);
    if (!m) { console.log('NOT-FOUND ' + r.id + '.' + r.f + ' :: ' + JSON.stringify(r.s)); return; }
    node[key] = node[key].replace(from, r.to);
    n += m.length;
  });
  return n;
}

// ============ PHASE 1: GLOBAL ==============
var G1 = [
  { s: 'ththe', to: 'than the', note: 'ththe' },
  { s: 'thany', to: 'than any', note: 'thany' },
  { s: 'thalmost', to: 'than almost', note: 'thalmost' },
  { s: 'tha condenser', to: 'than a condenser' },
  { s: 'tha dynamic', to: 'than a dynamic' },
  { s: 'tha any monitor', to: 'than any monitor' },
  { s: 'cleand', to: 'clean and', note: 'cleand' },
  { re: '\\bcadd\\b', to: 'can add' },
  { re: '\\bcadjust\\b', to: 'can adjust' },
  { re: '\\bcarrange\\b', to: 'can arrange' },
  { re: '\\bcafford\\b', to: 'can afford' },
  { re: '\\bcalways\\b', to: 'can always' },
  { re: '\\bcthen\\b', to: 'then' },
  { re: '\\bc be\\b', to: 'can be' },
  { re: '\\bc boost\\b', to: 'can boost' },
  { s: 'makeshaperBox', to: 'makes ShaperBox' },
  { s: 'makescaler', to: 'makes Scaler' },
  { s: 'breaand', to: 'breathe and' },
  { s: 'PreSonustudioLive', to: 'PreSonus StudioLive' },
  { s: 'Yamahand', to: 'Yamaha and' },
  { s: 'formuland', to: 'formula and' },
  { s: "Live'session", to: "Live's Session" },
  { s: 'Itsession', to: 'Its Session' },
  { s: 'itsession', to: 'its Session' },
  { s: 'WavesSL', to: 'Waves SSL' },
  { s: 'BossD-1', to: 'Boss SD-1' },
  { s: 'vsSL', to: 'vs SSL' },
  { s: 'musici cares', to: 'musician cares' },
  { s: 'makee', to: 'make' },
  { s: 'this it.', to: 'this is it.' },
  { s: 'This the', to: 'This is the', note: 'This the' },
  { s: 'this the', to: 'this is the', note: 'this the' },
  { re: '\\. the ATH-M50x', to: '. The ATH-M50x' },
  { re: '\\. the MDR-7506', to: '. The MDR-7506' },
  { s: 'considermay ever buying', to: "you'll ever need to buy" },
  { re: '\\ba innovative\\b', to: 'an innovative' },
  { s: 'uSB-c', to: 'USB-C' },
  { s: 'MOTU m2', to: 'MOTU M2' },
  { s: 'u 87 ai', to: 'U 87 Ai' },
  { s: 'LCT1040', to: 'LCT 1040' },
  { s: 'lCT1040', to: 'LCT 1040' },
  { s: 'instantentente', to: 'instante' },
  { s: 'instantente', to: 'instante' },
  { s: 'No no es solo', to: 'No es solo' },
  { s: 'tusonidos', to: 'tus sonidos' },
  { s: 'entrado/salida', to: 'entrada/salida' },
  { s: 'puede drift', to: 'puede desviarse' },
  { s: 'emula el drift de osciladores', to: 'emula la deriva de osciladores' },
  { s: 'bD-2', to: 'BD-2' },
  { s: 'xR18', to: 'XR18' },
  { s: 'cQ-18t', to: 'CQ-18T' },
  { s: 'tR-8s', to: 'TR-8S' },
  { s: 'm32r LIVE', to: 'M32R LIVE' },
  { s: 'x32 compact', to: 'X32 Compact' },
  { s: 'sQ-5', to: 'SQ-5' },
  { s: 'Yamaha mG', to: 'Yamaha MG' },
  { s: 'Behringer xenyx', to: 'Behringer XENYX' },
  { s: 'montage m8x', to: 'Montage M8x' },
  { s: 'stage 4', to: 'Stage 4' },
  { s: 'nD86', to: 'ND86' },
  { s: 'elgato stream deck + xL', to: 'Elgato Stream Deck + XL' },
  { s: 'elgato stream deck+', to: 'Elgato Stream Deck+' },
  { s: 'elgato Wave XLR mK.2', to: 'Elgato Wave XLR MK.2' },
  { s: 'bEACN mix create', to: 'BEACN Mix Create' },
  { s: 'Squier affinity series precision bass pJ', to: 'Squier Affinity Series Precision Bass PJ' },
  { s: 'music man stingRay ray4', to: 'Music Man StingRay Ray4' },
  { s: 'nails aesthetic', to: 'nails the aesthetic' },
  { s: 'one of absolute kings', to: 'one of the absolute kings' },
  { s: 'At 599, this an investment', to: 'At $599, this is an investment' },
  { s: 'that cost.', to: 'that cost $2,000+.' },
  { s: 'costs, and it works on both Windows and Mac', to: 'costs $799, and it works on both Windows and Mac' },
  { s: 'costs — one-time purchase, and', to: 'costs $199 — a one-time purchase, and' },
  { s: 'tier system: gets you everything', to: 'tier system: one purchase gets you everything' },
  { s: 'profesional a, con una biblioteca', to: 'profesional, con una biblioteca' },
  { s: 'Komplete Kontrol de Native Instruments', to: 'Kontakt de Native Instruments' },
  { s: 'por con AI Session Players', to: 'con AI Session Players' },
  { s: 'motor warping', to: 'motor de warping' },
  { s: 'performance en vivo', to: 'actuación en vivo' },
  { s: 'dAW', to: 'DAW' },
  { s: 'Pro-Q 3', to: 'Pro-Q 4' },
  { s: 'Pro-C 2', to: 'Pro-C 3' },
  { s: '0.72 kg', to: '1.35 lbs (612 g)' },
  { s: '0.75 kg', to: '1.8 lbs (816 g)' },
  { s: 'roughly $140', to: 'unos $140' },
  { s: 'Pro Toolstudio (/year subscription or perpetual)', to: 'Pro Tools Studio ($299/year subscription or $599 perpetual)' },
  { s: 'Pro Toolstudio', to: 'Pro Tools Studio' },
  { s: 'licensing — /year or ', to: 'licensing — $299/year or $599 perpetual' },
  { s: 'perpetua — /año', to: 'perpetua — $299/año o $599' },
  { s: '(perpetual)', to: '($799 perpetual)' },
  { s: '/yr or perpetual', to: '$299/yr or $599 perpetual' },
  { s: 'es el el DAW', to: 'es el DAW' },
  { s: 'At around $699, it delivers', to: 'At $509, it delivers' },
  { s: 'Por alrededor de $699, ofrece', to: 'Por $509, ofrece' },
  { s: 'The Shure BLX288/PG58 ()', to: 'The Shure BLX288/PG58 ($599)' },
  { s: 'The Sennheiser EW-D (,099–,499)', to: 'The Sennheiser EW-D ($1,099–$1,299)' },
  { s: 'two vocalists on stage for.', to: 'two vocalists on stage for one price.' },
  { s: 'at nearly the same price point ().', to: 'at nearly the same price point ($3,499).' },
  { s: 'at a lower price ().', to: 'at a competitive price.' },
  { s: 'a un precio más bajo. Sin embargo', to: 'a un precio competitivo. Sin embargo' },
  { s: 'more each', to: 'for $50 more each' },
  { s: 'more a pair', to: 'for $240 more a pair' },
  { s: 'por más cada una', to: 'por $50 más cada una' },
  { s: 'por más el par', to: 'por $240 más el par' },
  { s: 'Ningún otro monitor por ofrece', to: 'Ningún otro monitor ofrece' },
  { s: 'en lugar con mandos', to: 'en lugar de con mandos' },
  { s: 'Los extra compran', to: 'El precio extra compra' },
  { s: 'a A diferencia del KRK Rokit', to: 'a diferencia del KRK Rokit' },
  { s: 'adds British console mojo more', to: 'adds British console mojo for $100 more' },
  { s: 'añade el toque de consola británica por más', to: 'añade el toque de consola británica por $100 más' },
  { s: ' and 13 lb (5.9 kg), making it the cheapest', to: '8-inch speaker and 13 lb (5.9 kg), making it the cheapest' },
  { s: 'Solo y 5,9 kg, el ampli', to: 'Altavoz de 8 pulgadas y solo 5,9 kg, el ampli' },
  { s: 'offers much deeper control more', to: 'offers much deeper control via its companion app' },
  { s: 'ofrece control mucho más profundo por más', to: 'ofrece un control mucho más profundo con su app' },
  { s: 'options each — a pair costs ', to: 'options — a pair costs around $800.' },
  { s: 'más económicas a cada uno — un par cuesta', to: 'más económicas — un par cuesta alrededor de $800.' },
  { s: 'at ~ the pair', to: 'at ~$350 for the pair' },
  { s: 'a ~ el par', to: 'a ~$350 el par' },
  { s: 'Premium price: for the pair', to: 'Premium price: $1,600 for the pair' },
  { s: 'Precio premium: el par', to: 'Precio premium: $1,600 el par' },
  { s: "Each, there's no excuse", to: "At around $99 each, there's no excuse" },
  { s: 'Aim -.', to: 'Aim for $200–$500.' },
  { s: 'a - bass can sound', to: 'a budget bass can sound' },
  { s: 'PJ Bass It is the best starter', to: 'PJ Bass is the best starter' },
  { s: 'need to + to get', to: 'need to spend over $1,000 to get' },
  { s: 'basses costing +.', to: 'basses costing over $2,000.' },
  { s: 'see on + basses.', to: 'see on $2,000+ basses.' },
  { s: 'without +.', to: 'without spending over $1,000.' },
  { s: 'interruptor activo de 5 posiciones Performance EQ', to: 'EQ activo de 3 bandas' },
  { s: 'humbucker de Alnico', to: 'humbucker de cerámica' },
  { s: 'con EQ activo te dan', to: 'te dan' },
  { s: 'te dan un sonido más grosero y contundente', to: 'te dan un sonido grosero y contundente' },
  { s: 'pegan muy por encima de su precio', to: 'rinden muy por encima de su precio' },
  { s: '<strong> the ATH-M50x', to: '<strong>The ATH-M50x' },
  { s: '</strong> the MDR-7506', to: '</strong>The MDR-7506' },
  { s: 'the M50x or the MDR-7506', to: 'the ATH-M50x or the MDR-7506' },
  { s: 'las M50x o las MDR-7506', to: 'las ATH-M50x o las MDR-7506' },
  { s: 'most accurate monitor ?', to: 'most accurate monitor in this guide?' },
  { s: 'delivers accurate sound for per speaker', to: 'delivers accurate sound for around $149 per speaker' },
  { s: 'the JBL 305P MkII have the Image', to: 'the JBL 305P MkII has the Image' },
  { s: 'En En portabilidad', to: 'En portabilidad' },
  { s: 'ambos es la jugada', to: 'ambos son la jugada' },
  { s: 'Each, they\'re excellent for beginners and small rooms', to: "At around $298 a pair, they're excellent for beginners and small rooms" },
  { s: 'Each, these are the monitors that made me rethink what \'budget\' even means', to: "At $398 a pair, these are the monitors that made me rethink what 'budget' even means" },
  { s: 'the sub- monitor', to: 'the sub-$1,000 monitor' },
  { s: 'Each, it\'s the most accurate monitor and the gateway to genuine pro reference accuracy', to: "At $858 a pair, it's the most accurate monitor and the gateway to genuine pro reference accuracy" },
  { s: 'Each, it\'s the best value in powered PA speakers', to: "At $599, it's the best value in powered PA speakers" },
  { s: 'Each, it\'s the professional standard', to: "At $999, it's the professional standard" },
  { s: 'Each, it\'s the premium choice for those who hear the difference', to: "At $899, it's the premium choice for those who hear the difference" },
  { s: ' each — more than the ZLX-12P-G2 for small-venue budgets', to: 'Costs $999 each — $400 more than the ZLX-12P-G2 for small-venue budgets' },
  { s: ' cada uno — más que el ZLX-12P-G2 para presupuestos de venues pequeños', to: 'Cuesta $999 cada uno — $400 más que el ZLX-12P-G2 para presupuestos de venues pequeños' },
  { s: 'the Scarlett 2i2 is the safest bet for beginners.', to: 'The Scarlett 2i2 is the safest bet for beginners.' },
  { s: 'nothing It is easier', to: 'nothing is easier' },
  { s: 'the Scarlett less is the smarter buy', to: 'the Scarlett 2i2 is the smarter buy' },
  { s: 'At yes — if you want', to: 'Yes — if you want' },
  { s: 'the best compact condenser at.', to: 'the best compact condenser at this price.' },
  { s: 'best build at the mark,', to: 'best build for the money,' },
  { s: 'Everything above stays — if you can stretch', to: 'Everything above stays relevant — if you can stretch' },
  { s: 'For the Samson Q2U is', to: 'The Samson Q2U is' },
  { s: 'if consider a reliable', to: 'if you consider a reliable' },
  { s: 'saves you accessory', to: 'saves you an accessory' },
  { s: 'that stays the NT-USB Mini', to: 'that stays reliable, the NT-USB Mini' },
  { s: 'budget is and you want', to: 'budget is tight and you want' },
  { s: 'unlike the original, the 2 adds', to: 'unlike the original, the SoloCast 2 adds' },
  { s: 'everything consider buyinging anything extra', to: 'everything you need without buying anything extra' },
  { s: 'At the Q2U is', to: 'The Samson Q2U is' },
  { s: 'At the PD200X is', to: 'The Maono PD200X is' },
  { s: 'At the SoloCast 2 is', to: 'The HyperX SoloCast 2 is' },
  { s: 'For the AmpliTank K688 gives', to: 'The FIFINE AmpliTank K688 gives' },
  { s: 'At the AM8 is the dynamic that ignores your keyboard', to: 'The FIFINE AM8 is the dynamic that ignores your keyboard' },
  { s: 'At the Seiren V3 Mini is', to: 'The Razer Seiren V3 Mini is' },
  { s: 'At the AmpliGame A6V is', to: 'The FIFINE AmpliGame A6V is' },
  { s: 'At the NT-USB Mini is the premium pick at the top of this guide\'s budget — Rode\'s compact', to: 'The Rode NT-USB Mini is the premium pick at the top of this guide\'s budget — a compact' },
  { s: 'At the Yeti Nano is', to: 'The Blue Yeti Nano is' },
  { s: 'At the TC-777 is', to: 'The TONOR TC-777 is' },
  { s: 'At the PM461 is', to: 'The Maono PM461 is' },
  { s: 'At the FIFINE T669 is', to: 'The FIFINE T669 is' },
  { s: 'The best-selling monitor for beginners as a pair', to: 'The best-selling beginner monitor at a great price per pair' },
  { s: 'El monitor más vendido para principiantes por par', to: 'El monitor más vendido entre principiantes, con un gran precio por par' }
];

var n1 = applyAll(g, G1);

// ============ PHASE 2: SCOPED price fills ==============
function S(x) { return { r: function (g) { return g; } }; }
var n2 = 0;
var scopedList = [
  { id: 'best-monitors', f: 'featuredSnippet.faq_a3_en', s: 'The KRK Rokit 7 G5 \\( per pair\\) combines', to: 'The KRK Rokit 7 G5 (around $538 a pair) combines' },
  { id: 'best-monitors', f: 'featuredSnippet.faq_a3_es', s: 'El KRK Rokit 7 G5 \\(el par\\) combina', to: 'El KRK Rokit 7 G5 (unos $538 el par) combina' },
  { id: 'best-monitors', f: 'featuredSnippet.faq_a4_en', s: 'The Yamaha HS8 \\( per pair\\) delivers', to: 'The Yamaha HS8 (around $798 a pair) delivers' },
  { id: 'best-monitors', f: 'featuredSnippet.faq_a4_es', s: 'Las Yamaha HS8 \\(el par\\) entregan', to: 'Las Yamaha HS8 (unos $798 el par) entregan' },
  { id: 'best-monitors', f: 'featuredSnippet.faq_a5_en', s: 'The Adam A7V \\( each\\) uses', to: 'The Adam A7V (around $799 each) uses' },
  { id: 'best-monitors', f: 'featuredSnippet.faq_a5_es', s: 'El Adam A7V \\(cada uno\\) usa', to: 'El Adam A7V (a unos $799 cada uno) usa' },
  { id: 'best-monitors', f: 'featuredSnippet.faq_a6_en', s: 'The Kali IN-8 V2 \\( per pair\\) is', to: 'The Kali IN-8 V2 (around $858 a pair) is' },
  { id: 'best-monitors', f: 'featuredSnippet.faq_a6_es', s: 'El Kali IN-8 V2 \\(el par\\) es', to: 'El Kali IN-8 V2 (unos $858 el par) es' },
  { id: 'best-monitors', f: 'featuredSnippet.faq_a6_en', s: 'unlike a \\+ monitor', to: 'unlike a $1,000+ monitor' },
  { id: 'starter-studio', f: 'featuredSnippet.faq_a4_en', s: 'The KRK Rokit 7 G5 \\( per pair\\) has', to: 'The KRK Rokit 7 G5 (around $538 a pair) has' },
  { id: 'starter-studio', f: 'featuredSnippet.faq_a4_es', s: 'El KRK Rokit 7 G5 \\(el par\\) tiene', to: 'El KRK Rokit 7 G5 (unos $538 el par) tiene' },
  { id: 'monitor-setup', f: 'featuredSnippet.faq_a1_en', s: 'The Yamaha HS8 \\( per pair\\) delivers', to: 'The Yamaha HS8 (around $798 a pair) delivers' },
  { id: 'monitor-setup', f: 'featuredSnippet.faq_a1_es', s: 'Las Yamaha HS8 \\(el par\\) entregan', to: 'Las Yamaha HS8 (unos $798 el par) entregan' },
  { id: 'sm57-vs-sm58', f: 'featuredSnippet.faq_a3_en', s: 'two SM57 and SM58 \\( each\\) are', to: 'two SM57 and SM58 (around $99 each) are' },
  { id: 'adam-vs-genelec', f: 'featuredSnippet.faq_a1_en', s: 'Buy the Adam A7V \\( each\\) for detailed', to: 'Buy the Adam A7V ($799 each) for detailed' },
  { id: 'adam-vs-genelec', f: 'featuredSnippet.faq_a1_en', s: 'Buy the Genelec 8040B \\( per pair\\) for a more accurate', to: 'Buy the Genelec 8040B (around $2,396 a pair) for a more accurate' },
  { id: 'jbl-vs-kali', f: 'featuredSnippet.faq_a1_en', s: 'JBL 305P MkII \\( each\\) for the widest', to: 'JBL 305P MkII (around $149 each) for the widest' },
  { id: 'jbl-vs-kali', f: 'featuredSnippet.faq_a1_en', s: 'Kali LP-6 V2 \\( each\\) if you have', to: 'Kali LP-6 V2 (around $199 each) if you have' },
  { id: 'jbl-vs-kali', f: 'featuredSnippet.faq_a3_en', s: 'The Kali LP-6 V2 \\( each\\) is the better', to: 'The Kali LP-6 V2 (around $199 each) is the better' },
  { id: 'atc-vs-genelec', f: 'featuredSnippet.faq_a1_en', s: 'ATC SCM25A Pro Mk2 \\( each\\) if you mix', to: 'ATC SCM25A Pro Mk2 (around $4,995 each) if you mix' },
  { id: 'atc-vs-genelec', f: 'featuredSnippet.faq_a1_en', s: 'Genelec 8351B \\( each\\) if you want', to: 'Genelec 8351B ($4,195 each) if you want' },
  { id: 'budget-interfaces', f: 'conclusion', s: '\\( each\\) deliver console-quality', to: '(around $299 each) deliver console-quality' },

  // budget-monitors verdict fills
  { id: 'budget-monitors', f: 'verdictProsCons[0].pros[0]', s: ' each \\( a pair\\) — beats', to: '$149 each ($298 a pair) — beats' },
  { id: 'budget-monitors', f: 'verdictProsCons[0].pros_es[0]', s: ' cada uno \\( el par\\) — supera', to: '$149 cada uno ($298 el par) — supera' },
  { id: 'budget-monitors', f: 'verdictProsCons[1].pros[0]', s: ' each \\( a pair\\) — the monitors', to: '$199 each ($398 a pair) — the monitors' },
  { id: 'budget-monitors', f: 'verdictProsCons[1].pros_es[0]', s: ' cada uno \\( el par\\) — los monitores', to: '$199 cada uno ($398 el par) — los monitores' },
  { id: 'budget-monitors', f: 'verdictProsCons[1].cons[0]', s: ' a pair — more than the JBL 305P pair', to: 'Costs $398 a pair — $100 more than the JBL 305P pair' },
  { id: 'budget-monitors', f: 'verdictProsCons[1].cons_es[0]', s: ' el par — más que el par de JBL 305P', to: '$398 el par — $100 más que el par de la JBL 305P' },
  { id: 'budget-monitors', f: 'verdictProsCons[2].pros[3]', s: ' a pair — exceptional value', to: 'Around $538 a pair — exceptional value' },
  { id: 'budget-monitors', f: 'verdictProsCons[2].pros_es[3]', s: ' el par — valor excepcional', to: 'Alrededor de $538 el par — valor excepcional' },
  { id: 'budget-monitors', f: 'verdictProsCons[2].cons[1]', s: ' a pair — more than the Kali LP-6 pair', to: 'Costs around $538 a pair — $140 more than the Kali LP-6 pair' },
  { id: 'budget-monitors', f: 'verdictProsCons[2].cons_es[1]', s: ' el par — más que el par de Kali LP-6', to: 'Cuesta unos $538 el par — $140 más que el par de Kali LP-6' },
  { id: 'budget-monitors', f: 'verdictProsCons[3].cons[0]', s: ' a pair — it stretches', to: 'Costs around $798 a pair — it stretches' },
  { id: 'budget-monitors', f: 'verdictProsCons[3].cons_es[0]', s: ' el par — supera el presupuesto', to: 'Cuesta unos $798 el par — se sale del presupuesto' }
];
n2 = scoped(scopedList);

// ============ PHASE 3: FIELD ASSIGNMENTS ==============
function setPath(id, field, value) {
  var x = byId(id);
  if (!x) { console.log('NO GUIDE ' + id); return; }
  var f = field.split(/[.\[\]]+/).filter(Boolean);
  var node = x;
  for (var i = 0; i < f.length - 1; i++) node = node[f[i]];
  var old = node[f[f.length - 1]];
  node[f[f.length - 1]] = value;
  console.log('SET [' + id + '].' + field + ' : ' + JSON.stringify(old) + ' => ' + JSON.stringify(value));
}
var n3 = 0;

setPath('pro-daw', 'featuredSnippet.price1', '$799 (perpetual)'); n3++;
setPath('pro-daw', 'featuredSnippet.price2', '$299/yr or $599 perpetual'); n3++;
setPath('budget-pa-systems', 'featuredSnippet.price1', '400'); n3++;
setPath('budget-pa-systems', 'featuredSnippet.price2', '399'); n3++;
setPath('budget-pa-systems', 'featuredSnippet.rating1', 4.0); n3++;
setPath('budget-pa-systems', 'featuredSnippet.rating2', 4.0); n3++;
setPath('budget-bass-like-expensive', 'featuredSnippet.price1', '450'); n3++;
setPath('budget-bass-like-expensive', 'featuredSnippet.price2', '280'); n3++;
setPath('ts9-vs-bd2', 'featuredSnippet.price1', '100'); n3++;
setPath('xr18-vs-m32r', 'featuredSnippet.price1', '509'); n3++;
setPath('xr18-vs-cq18t', 'featuredSnippet.price1', '509'); n3++;
setPath('best-monitors', 'featuredSnippet.title_es', 'Mejores Monitores de Estudio Económicos'); n3++;

// best-in-ear-monitors: drop stray verdictProCons
(function () {
  var x = byId('best-in-ear-monitors');
  var dropped = false;
  Object.keys(x).forEach(function (k) {
    if (/^verdictProCon[s]?$/.test(k) && Object.keys(x[k] || {}).length === 0) { delete x[k]; dropped = true; }
  });
  console.log('best-in-ear-monitors stray verdict key dropped: ' + dropped);
})();

// j48-vs-rndi cons[3] factual fix by index
(function () {
  var x = byId('j48-vs-rndi');
  (x.verdictProsCons || []).forEach(function (v, vi) {
    (v.cons || []).forEach(function (c, ci) {
      if (c.indexOf('No built-in pad or ground lift switch') >= 0) {
        v.cons[ci] = 'Minimal tone controls — just a -15dB pad, polarity reverse and ground lift';
        console.log('j48 cons[' + vi + '][' + ci + '] fixed EN');
      }
    });
    var es = v.cons_es || [];
    es.forEach(function (c, ci) {
      if (/pad|ground lift|built-in|integrado/i.test(c) && ci < 4 && es.length === v.cons.length) {
        if (v.cons[ci] && v.cons[ci].indexOf('Minimal tone controls') >= 0) {
          v.cons_es[ci] = 'Controles de sonido mínimos — solo pad de -15 dB, inversión de polaridad y ground lift';
        }
      }
    });
  });
})();

// best-microphone description_es teclado -> micrófono ; productTable.title
(function () {
  var x = byId('best-microphone');
  if (x.description_es && x.description_es.indexOf('teclado') >= 0) {
    console.log('best-microphone description_es(before): ' + JSON.stringify(x.description_es).slice(0, 160));
    x.description_es = x.description_es.replace(/teclado/g, 'micrófono');
    console.log('best-microphone description_es(after): ' + JSON.stringify(x.description_es).slice(0, 160));
  }
  if (x.productTable && x.productTable.title && x.productTable.title.indexOf('Podcast Microphones') >= 0) {
    console.log('best-microphone productTable.title: ' + JSON.stringify(x.productTable.title) + ' => "Microphones Compared in This Guide"');
    x.productTable.title = 'Microphones Compared in This Guide';
  }
})();

// ============ PHASE 4: YEAR REMOVAL ==============
var YEAR_KEYS = {
  title: true, title_es: true, description: true, description_es: true,
  'featuredSnippet.title_en': true, 'featuredSnippet.title_es': true,
  'productTable.title': true, 'productTable.title_es': true
};
var n4 = 0;
function yearWalk(o, path) {
  if (typeof o === 'string') { return o; }
  if (Array.isArray(o)) { o.forEach(function (v, i) { yearWalk(v, path + '[' + i + ']'); }); return; }
  if (o && typeof o === 'object') {
    Object.keys(o).forEach(function (k) {
      var child = o[k];
      if (typeof child === 'string' && YEAR_KEYS[k]) {
        var m = child.match(/\(2026\)/g);
        if (m) { n4 += m.length; o[k] = child.replace(/\(2026\)/g, '').replace(/  +/g, ' '); }
      }
      yearWalk(child, path + '.' + k);
    });
  }
}
g.forEach(function (x, i) { yearWalk(x, '[' + i + ']'); });

// ============ SAVE ==============
fs.writeFileSync(path, JSON.stringify(g, null, 2), 'utf8');
console.log('\nSaved.');
console.log('PH1 global changes: ' + n1);
console.log('PH2 scoped changes: ' + n2);
console.log('PH3 field sets: ' + n3);
console.log('PH4 (2026) removed: ' + n4);

var leftovers = ['ththe', 'thany', 'thalmost', 'cleand', 'cadd', 'cadjust', 'carrange', 'cafford', 'calways', 'cthen',
  'makeshaperBox', 'makescaler', 'breaand', 'PreSonustudioLive', 'Yamahand', 'formuland', "Live'session", 'Itsession', 'itsession',
  'WavesSL', 'BossD-1', 'vsSL', 'musici cares', 'makee', 'this it.', 'considermay ever buying', 'a innovative', 'u 87 ai', 'LCT1040',
  'instantente', 'No no es solo', 'tusonidos', 'entrado/salida', 'bD-2', 'xR18', 'cQ-18t', 'tR-8s', 'm32r LIVE', 'x32 compact', 'sQ-5',
  'Yamaha mG', 'Behringer xenyx', 'montage m8x', 'nD86', 'elgato stream deck + xL', 'elgato stream deck+', 'elgato Wave XLR mK.2',
  'bEACN mix create', 'Squier affinity series precision bass pJ', 'music man stingRay ray4', 'nails aesthetic', 'one of absolute kings',
  'At 599, this an investment', 'that cost', 'profesional a, con', 'Komplete Kontrol de Native Instruments', 'por con AI Session Players',
  'dAW', 'Pro-Q 3', 'Pro-C 2', 'roughly $140', 'Pro Toolstudio', 'licensing — /year', 'perpetua — /año', '(perpetual)', '/yr or perpetual',
  'es el el DAW', 'At around $699, it delivers', 'Por alrededor de $699, ofrece', 'The Shure BLX288/PG58 ()', ',099–,499',
  'two vocalists on stage for.', 'at nearly the same price point ().', 'at a lower price ()', 'a un precio más bajo. Sin embargo',
  'more each', 'more a pair', 'por más cada una', 'por más el par', 'Ningún otro monitor por ofrece', 'en lugar con mandos',
  'Los extra compran', 'a A diferencia del KRK Rokit', 'adds British console mojo more', 'añade el toque de consola británica por más',
  ' and 13 lb (5.9 kg)', 'Solo y 5,9 kg', 'offers much deeper control more', 'ofrece control mucho más profundo por más',
  'options each — a pair costs', 'más económicas a cada uno', 'at ~ the pair', 'a ~ el par', 'Premium price: for the pair',
  'Precio premium: el par', "Each, there's no excuse", 'Aim -.', 'a - bass can sound', 'PJ Bass It is', 'need to + to get',
  'basses costing +.', 'see on + basses.', 'without +.', 'interruptor activo de 5 posiciones', 'humbucker de Alnico',
  'con EQ activo te dan', 'pegan muy por encima', '<strong> the ATH-M50x', '</strong> the MDR-7506', 'the M50x or the MDR-7506',
  'las M50x o las MDR-7506', 'most accurate monitor ?', 'delivers accurate sound for per', 'En En portabilidad', 'ambos es la jugada',
  'the sub- monitor', "Each, it's the most accurate", "Each, it's the best value", "Each, it's the professional standard",
  "Each, it's the premium choice", ' each — more than the ZLX', ' cada uno — más que el ZLX', 'the Scarlett less is the smarter buy',
  'nothing It is easier', 'At yes —', 'at the mark', 'For the Samson Q2U is', 'if consider a reliable', 'saves you accessory',
  'that stays the NT-USB Mini', 'budget is and you want', 'unlike the original, the 2 adds', 'buyinging',
  'At the Q2U is', 'At the PD200X is', 'At the SoloCast 2 is', 'For the AmpliTank K688', 'At the AM8 is', 'At the Seiren V3 Mini is',
  'At the AmpliGame A6V is', 'At the NT-USB Mini is', 'At the Yeti Nano is', 'At the TC-777 is', 'At the PM461 is', 'At the FIFINE T669 is',
  '( per pair)', '( each)', '( a pair)', '(el par)', '(cada uno)',
  'Each, it\'s the',
  "Each, they're excellent", 'Each, these are the monitors', 'Each, it', 'the JBL 305P MkII have',
  'ambos es', 'At the Seiren'
];
var corpus = JSON.stringify(g);
var bad = leftovers.filter(function (s) { return corpus.indexOf(s) >= 0; });
console.log('\nResiduals (should be empty): ' + bad.length);
bad.forEach(function (s) { console.log('  LEFTOVER: ' + JSON.stringify(s)); });