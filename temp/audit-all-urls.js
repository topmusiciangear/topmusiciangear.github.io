const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

function decodeAwinUrl(awinUrl) {
  try {
    const parsed = new URL(awinUrl);
    const ued = parsed.searchParams.get('ued');
    if (ued) return decodeURIComponent(ued);
  } catch(e) {}
  return awinUrl;
}

function extractSlug(u) {
  try {
    const parsed = new URL(u);
    const path = parsed.pathname;
    // Get last segment
    const parts = path.split('/').filter(p => p);
    return parts[parts.length - 1] || '';
  } catch(e) { return ''; }
}

// Check ALL stores for ALL products
const allIssues = [];
products.forEach(p => {
  if (!p.stores) return;
  Object.entries(p.stores).forEach(([store, rawUrl]) => {
    if (!rawUrl) return;
    const decoded = decodeAwinUrl(rawUrl);
    const slug = extractSlug(decoded);
    const titleLower = p.title.toLowerCase();
    const brandLower = (p.brand || '').toLowerCase();
    
    // Check for specific product ID in slug that doesn't match
    const slugLower = slug.toLowerCase();
    
    // Extract product identifiers from title
    // Common patterns: model numbers like "HS8", "ATH-M50x", "SM7B", etc.
    const titleParts = titleLower.split(/[\s\-\/]+/).filter(w => w.length > 2);
    
    // Check if slug contains a clearly different product name
    // Focus on the most critical mismatches
    const slugWords = slugLower.split(/[\s\-]+/).filter(w => w.length > 2);
    
    // Look for known problematic patterns
    const issues = [];
    
    // Does slug contain headphone words when product is NOT a headphone?
    const isHeadphone = titleLower.includes('headphone') || titleLower.includes('headphones') || 
                        titleLower.includes('auricular') || titleLower.includes('open-back') ||
                        titleLower.includes('closed-back') || titleLower.includes('in-ear') ||
                        titleLower.includes('iems') || titleLower.includes('iem ');
    const slugHasHeadphone = slugLower.includes('headphone') || slugLower.includes('headphones');
    
    if (!isHeadphone && slugHasHeadphone) {
      issues.push('URL slug contains headphone but product is not headphones');
    }
    
    // Does slug contain microphone words when product is NOT a mic?
    const isMic = titleLower.includes('microphone') || titleLower.includes('mic ') || 
                  titleLower.includes(' mic') || titleLower.includes('shotgun') ||
                  titleLower.includes('condenser') || titleLower.includes('dynamic mic');
    const slugHasMic = slugLower.includes('microphone') || slugLower.includes('-mic-') || slugLower.includes('-mic/');
    
    if (!isMic && slugHasMic && !titleLower.includes('mic')) {
      issues.push('URL slug contains microphone but product is not a microphone');
    }
    
    // Does slug contain specific wrong model numbers?
    // Check for ATH-M50x in URL when product is NOT ATH-M50x
    if (slugLower.includes('ath-m50x') && !titleLower.includes('ath-m50x') && !titleLower.includes('m50x')) {
      issues.push('URL contains ATH-M50x but product is different');
    }
    if (slugLower.includes('ath-m40x') && !titleLower.includes('ath-m40x') && !titleLower.includes('m40x')) {
      issues.push('URL contains ATH-M40x but product is different');
    }
    if (slugLower.includes('ath-m30x') && !titleLower.includes('ath-m30x') && !titleLower.includes('m30x')) {
      issues.push('URL contains ATH-M30x but product is different');
    }
    if (slugLower.includes('ath-m20x') && !titleLower.includes('ath-m20x') && !titleLower.includes('m20x')) {
      issues.push('URL contains ATH-M20x but product is different');
    }
    if (slugLower.includes('sm7b') && !titleLower.includes('sm7b')) {
      issues.push('URL contains SM7B but product is different');
    }
    if (slugLower.includes('sm58') && !titleLower.includes('sm58')) {
      issues.push('URL contains SM58 but product is different');
    }
    if (slugLower.includes('sm57') && !titleLower.includes('sm57')) {
      issues.push('URL contains SM57 but product is different');
    }
    if (slugLower.includes('dt770') && !titleLower.includes('dt 770') && !titleLower.includes('dt770')) {
      issues.push('URL contains DT770 but product is different');
    }
    if (slugLower.includes('dt990') && !titleLower.includes('dt 990') && !titleLower.includes('dt990')) {
      issues.push('URL contains DT990 but product is different');
    }
    if (slugLower.includes('hd600') && !titleLower.includes('hd 600') && !titleLower.includes('hd600')) {
      issues.push('URL contains HD600 but product is different');
    }
    if (slugLower.includes('hd650') && !titleLower.includes('hd 650') && !titleLower.includes('hd650')) {
      issues.push('URL contains HD650 but product is different');
    }
    if (slugLower.includes('ath-r70x') && !titleLower.includes('ath-r70x') && !titleLower.includes('r70x')) {
      issues.push('URL contains ATH-R70x but product is different');
    }
    if (slugLower.includes('ath-r30x') && !titleLower.includes('ath-r30x') && !titleLower.includes('r30x')) {
      issues.push('URL contains ATH-R30x but product is different');
    }
    if (slugLower.includes('k371') && !titleLower.includes('k371')) {
      issues.push('URL contains K371 but product is different');
    }
    if (slugLower.includes('k240') && !titleLower.includes('k240')) {
      issues.push('URL contains K240 but product is different');
    }
    if (slugLower.includes('srh440') && !titleLower.includes('srh440')) {
      issues.push('URL contains SRH440 but product is different');
    }
    if (slugLower.includes('srh840') && !titleLower.includes('srh840')) {
      issues.push('URL contains SRH840 but product is different');
    }
    if (slugLower.includes('mdr-7506') && !titleLower.includes('mdr-7506') && !titleLower.includes('mdr7506')) {
      issues.push('URL contains MDR-7506 but product is different');
    }
    if (slugLower.includes('mdr-750') && !titleLower.includes('mdr-750') && !titleLower.includes('mdr750')) {
      issues.push('URL contains MDR-750x but product is different');
    }
    if (slugLower.includes('hd280') && !titleLower.includes('hd 280') && !titleLower.includes('hd280')) {
      issues.push('URL contains HD280 but product is different');
    }
    if (slugLower.includes('hs8') && !titleLower.includes('hs8') && !titleLower.includes('hs 8')) {
      issues.push('URL contains HS8 but product is different');
    }
    if (slugLower.includes('hs5') && !titleLower.includes('hs5') && !titleLower.includes('hs 5')) {
      issues.push('URL contains HS5 but product is different');
    }
    if (slugLower.includes('hs7') && !titleLower.includes('hs7') && !titleLower.includes('hs 7')) {
      issues.push('URL contains HS7 but product is different');
    }
    if (slugLower.includes('rokit') && !titleLower.includes('rokit') && !titleLower.includes('rokit')) {
      issues.push('URL contains Rokit but product is different');
    }
    if (slugLower.includes('a7v') && !titleLower.includes('a7v') && !titleLower.includes('a7 v')) {
      issues.push('URL contains A7V but product is different');
    }
    if (slugLower.includes('a7x') && !titleLower.includes('a7x') && !titleLower.includes('a7 x')) {
      issues.push('URL contains A7X but product is different');
    }
    if (slugLower.includes('8040') && !titleLower.includes('8040')) {
      issues.push('URL contains 8040 but product is different');
    }
    if (slugLower.includes('8030') && !titleLower.includes('8030')) {
      issues.push('URL contains 8030 but product is different');
    }
    if (slugLower.includes('scarlett') && !titleLower.includes('scarlett')) {
      issues.push('URL contains Scarlett but product is different');
    }
    if (slugLower.includes('focusrite') && !titleLower.includes('focusrite') && !titleLower.includes('scarlett')) {
      issues.push('URL contains Focusrite/Scarlett but product is different');
    }
    if (slugLower.includes('clipperton') && !titleLower.includes('clipperton')) {
      issues.push('URL contains Clipperton but product is different');
    }
    if (slugLower.includes('audient') && !titleLower.includes('audient')) {
      issues.push('URL contains Audient but product is different');
    }
    if (slugLower.includes('motu') && !titleLower.includes('motu')) {
      issues.push('URL contains MOTU but product is different');
    }
    if (slugLower.includes('rme') && !titleLower.includes('rme')) {
      issues.push('URL contains RME but product is different');
    }
    if (slugLower.includes('ssl2') && !titleLower.includes('ssl 2') && !titleLower.includes('ssl2')) {
      issues.push('URL contains SSL2 but product is different');
    }
    if (slugLower.includes('clarett') && !titleLower.includes('clarett')) {
      issues.push('URL contains Clarett but product is different');
    }
    if (slugLower.includes('volt') && !titleLower.includes('volt')) {
      issues.push('URL contains Volt but product is different');
    }
    if (slugLower.includes('uad') && !titleLower.includes('uad')) {
      issues.push('URL contains UAD but product is different');
    }
    if (slugLower.includes('apollo') && !titleLower.includes('apollo')) {
      issues.push('URL contains Apollo but product is different');
    }
    if (slugLower.includes('babyface') && !titleLower.includes('babyface')) {
      issues.push('URL contains Babyface but product is different');
    }
    if (slugLower.includes('x2u') && !titleLower.includes('x2u')) {
      issues.push('URL contains X2U but product is different');
    }
    if (slugLower.includes('sonic-transporter') && !titleLower.includes('sonic transporter')) {
      issues.push('URL contains Sonic Transporter but product is different');
    }
    if (slugLower.includes('zephyr') && !titleLower.includes('zephyr')) {
      issues.push('URL contains Zephyr but product is different');
    }
    if (slugLower.includes('maxx') && !titleLower.includes('maxx')) {
      issues.push('URL contains Maxx but product is different');
    }
    if (slugLower.includes('wookie') && !titleLower.includes('wookie')) {
      issues.push('URL contains Wookie but product is different');
    }
    if (slugLower.includes('big-knob') && !titleLower.includes('big knob')) {
      issues.push('URL contains Big Knob but product is different');
    }
    if (slugLower.includes('icon') && !titleLower.includes('icon')) {
      issues.push('URL contains Icon but product is different');
    }
    if (slugLower.includes('saffire') && !titleLower.includes('saffire')) {
      issues.push('URL contains Saffire but product is different');
    }
    if (slugLower.includes('liquid') && !titleLower.includes('liquid')) {
      issues.push('URL contains Liquid but product is different');
    }
    if (slugLower.includes('helix') && !titleLower.includes('helix')) {
      issues.push('URL contains Helix but product is different');
    }
    if (slugLower.includes('pod') && !titleLower.includes('pod ') && !titleLower.includes('podgo')) {
      issues.push('URL contains Pod but product is different');
    }
    if (slugLower.includes(' Kemper') && !titleLower.includes('kemper')) {
      issues.push('URL contains Kemper but product is different');
    }
    if (slugLower.includes('quad-cortex') && !titleLower.includes('quad cortex')) {
      issues.push('URL contains Quad Cortex but product is different');
    }
    if (slugLower.includes('fractal') && !titleLower.includes('fractal')) {
      issues.push('URL contains Fractal but product is different');
    }
    if (slugLower.includes('axe-fx') && !titleLower.includes('axe-fx') && !titleLower.includes('axe fx')) {
      issues.push('URL contains Axe-Fx but product is different');
    }
    if (slugLower.includes('headrush') && !titleLower.includes('headrush')) {
      issues.push('URL contains HeadRush but product is different');
    }
    if (slugLower.includes('elektron') && !titleLower.includes('elektron')) {
      issues.push('URL contains Elektron but product is different');
    }
    if (slugLower.includes('digitakt') && !titleLower.includes('digitakt')) {
      issues.push('URL contains Digitakt but product is different');
    }
    if (slugLower.includes('model-samples') && !titleLower.includes('model samples')) {
      issues.push('URL contains Model Samples but product is different');
    }
    if (slugLower.includes('model-cycles') && !titleLower.includes('model cycles')) {
      issues.push('URL contains Model Cycles but product is different');
    }
    if (slugLower.includes('octatrack') && !titleLower.includes('octatrack')) {
      issues.push('URL contains Octatrack but product is different');
    }
    if (slugLower.includes('syntakt') && !titleLower.includes('syntakt')) {
      issues.push('URL contains Syntakt but product is different');
    }
    if (slugLower.includes('mc-707') && !titleLower.includes('mc-707') && !titleLower.includes('mc 707')) {
      issues.push('URL contains MC-707 but product is different');
    }
    if (slugLower.includes('mc-101') && !titleLower.includes('mc-101') && !titleLower.includes('mc 101')) {
      issues.push('URL contains MC-101 but product is different');
    }
    if (slugLower.includes('deluge') && !titleLower.includes('deluge')) {
      issues.push('URL contains Deluge but product is different');
    }
    if (slugLower.includes('op-1') && !titleLower.includes('op-1')) {
      issues.push('URL contains OP-1 but product is different');
    }
    if (slugLower.includes('op-z') && !titleLower.includes('op-z')) {
      issues.push('URL contains OP-Z but product is different');
    }
    if (slugLower.includes('ircuit') && !titleLower.includes('ircuit')) {
      issues.push('URL contains Circuit but product is different');
    }
    if (slugLower.includes('minilogue') && !titleLower.includes('minilogue')) {
      issues.push('URL contains Minilogue but product is different');
    }
    if (slugLower.includes('prologue') && !titleLower.includes('prologue')) {
      issues.push('URL contains Prologue but product is different');
    }
    if (slugLower.includes('monologue') && !titleLower.includes('monologue')) {
      issues.push('URL contains Monologue but product is different');
    }
    if (slugLower.includes('wasp') && !titleLower.includes('wasp')) {
      issues.push('URL contains Wasp but product is different');
    }
    if (slugLower.includes('revealer') && !titleLower.includes('revealer')) {
      issues.push('URL contains Revealer but product is different');
    }
    if (slugLower.includes('cobalt') && !titleLower.includes('cobalt')) {
      issues.push('URL contains Cobalt but product is different');
    }
    if (slugLower.includes('nova') && !titleLower.includes('nova')) {
      issues.push('URL contains Nova but product is different');
    }
    if (slugLower.includes('peak') && !titleLower.includes('peak')) {
      issues.push('URL contains Peak but product is different');
    }
    if (slugLower.includes('hydrasynth') && !titleLower.includes('hydrasynth')) {
      issues.push('URL contains Hydrasynth but product is different');
    }
    if (slugLower.includes('microfreak') && !titleLower.includes('microfreak')) {
      issues.push('URL contains MicroFreak but product is different');
    }
    if (slugLower.includes('microbrute') && !titleLower.includes('microbrute')) {
      issues.push('URL contains MicroBrute but product is different');
    }
    if (slugLower.includes('minibrute') && !titleLower.includes('minibrute')) {
      issues.push('URL contains MiniBrute but product is different');
    }
    if (slugLower.includes('matrixbrute') && !titleLower.includes('matrixbrute')) {
      issues.push('URL contains MatrixBrute but product is different');
    }
    if (slugLower.includes('polybrute') && !titleLower.includes('polybrute')) {
      issues.push('URL contains PolyBrute but product is different');
    }
    if (slugLower.includes('stage') && !titleLower.includes('stage') && !titleLower.includes('nord stage')) {
      issues.push('URL contains Stage but product is different');
    }
    if (slugLower.includes('electro') && !titleLower.includes('electro')) {
      issues.push('URL contains Electro but product is different');
    }
    if (slugLower.includes('drambo') && !titleLower.includes('drambo')) {
      issues.push('URL contains Drambo but product is different');
    }
    if (slugLower.includes('koala') && !titleLower.includes('koala')) {
      issues.push('URL contains Koala but product is different');
    }
    if (slugLower.includes('rc-20') && !titleLower.includes('rc-20') && !titleLower.includes('rc 20')) {
      issues.push('URL contains RC-20 but product is different');
    }
    if (slugLower.includes('vinyl') && !titleLower.includes('vinyl')) {
      issues.push('URL contains Vinyl but product is different');
    }
    if (slugLower.includes('rc-505') && !titleLower.includes('rc-505') && !titleLower.includes('rc 505')) {
      issues.push('URL contains RC-505 but product is different');
    }
    if (slugLower.includes('loopstation') && !titleLower.includes('loopstation') && !titleLower.includes('loop station')) {
      issues.push('URL contains Loop Station but product is different');
    }
    if (slugLower.includes('dl4') && !titleLower.includes('dl4') && !titleLower.includes('dl 4')) {
      issues.push('URL contains DL4 but product is different');
    }
    if (slugLower.includes('hd500') && !titleLower.includes('hd500') && !titleLower.includes('hd 500')) {
      issues.push('URL contains HD500 but product is different');
    }
    if (slugLower.includes('hx-stomp') && !titleLower.includes('hx-stomp') && !titleLower.includes('hx stomp')) {
      issues.push('URL contains HX Stomp but product is different');
    }
    if (slugLower.includes('spark') && !titleLower.includes('spark') && !titleLower.includes('positive grid')) {
      issues.push('URL contains Spark but product is different');
    }
    if (slugLower.includes('katana') && !titleLower.includes('katana')) {
      issues.push('URL contains Katana but product is different');
    }
    if (slugLower.includes('mustang') && !titleLower.includes('mustang')) {
      issues.push('URL contains Mustang but product is different');
    }
    if (slugLower.includes('thr') && !titleLower.includes('thr')) {
      issues.push('URL contains THR but product is different');
    }
    if (slugLower.includes('acoustic') && !titleLower.includes('acoustic') && titleLower.includes('electric')) {
      issues.push('URL contains Acoustic but product is electric');
    }
    if (slugLower.includes('precision') && !titleLower.includes('precision') && !titleLower.includes('p-bass')) {
      issues.push('URL contains Precision but product is different');
    }
    if (slugLower.includes('jazz-bass') && !titleLower.includes('jazz bass') && !titleLower.includes('j-bass')) {
      issues.push('URL contains Jazz Bass but product is different');
    }
    if (slugLower.includes('les-paul') && !titleLower.includes('les paul')) {
      issues.push('URL contains Les Paul but product is different');
    }
    if (slugLower.includes('stratocaster') && !titleLower.includes('stratocaster') && !titleLower.includes('strat')) {
      issues.push('URL contains Stratocaster but product is different');
    }
    if (slugLower.includes('telecaster') && !titleLower.includes('telecaster') && !titleLower.includes('tele')) {
      issues.push('URL contains Telecaster but product is different');
    }
    if (slugLower.includes('sg ') && !titleLower.includes('sg ') && !titleLower.includes('sg-')) {
      issues.push('URL contains SG but product is different');
    }
    if (slugLower.includes('es-335') && !titleLower.includes('es-335') && !titleLower.includes('es335')) {
      issues.push('URL contains ES-335 but product is different');
    }
    if (slugLower.includes('es-339') && !titleLower.includes('es-339') && !titleLower.includes('es339')) {
      issues.push('URL contains ES-339 but product is different');
    }
    if (slugLower.includes('super-strat') && !titleLower.includes('super strat') && !titleLower.includes('super-strat')) {
      issues.push('URL contains Super Strat but product is different');
    }
    if (slugLower.includes('firefly') && !titleLower.includes('firefly')) {
      issues.push('URL contains Firefly but product is different');
    }
    if (slugLower.includes('donner') && !titleLower.includes('donner')) {
      issues.push('URL contains Donner but product is different');
    }
    if (slugLower.includes('yamaha') && !titleLower.includes('yamaha')) {
      issues.push('URL contains Yamaha but product is different brand');
    }
    if (slugLower.includes('roland') && !titleLower.includes('roland')) {
      issues.push('URL contains Roland but product is different brand');
    }
    if (slugLower.includes('korg') && !titleLower.includes('korg')) {
      issues.push('URL contains Korg but product is different brand');
    }
    if (slugLower.includes('akai') && !titleLower.includes('akai')) {
      issues.push('URL contains Akai but product is different brand');
    }
    if (slugLower.includes('novation') && !titleLower.includes('novation')) {
      issues.push('URL contains Novation but product is different brand');
    }
    if (slugLower.includes('arturia') && !titleLower.includes('arturia')) {
      issues.push('URL contains Arturia but product is different brand');
    }
    if (slugLower.includes('native-instruments') && !titleLower.includes('native instruments')) {
      issues.push('URL contains Native Instruments but product is different brand');
    }
    if (slugLower.includes('m-audio') && !titleLower.includes('m-audio') && !titleLower.includes('m audio')) {
      issues.push('URL contains M-Audio but product is different brand');
    }
    if (slugLower.includes('alesis') && !titleLower.includes('alesis')) {
      issues.push('URL contains Alesis but product is different brand');
    }
    if (slugLower.includes('alesis') && !titleLower.includes('alesis')) {
      issues.push('URL contains Alesis but product is different brand');
    }
    if (slugLower.includes('cme') && !titleLower.includes('cme')) {
      issues.push('URL contains CME but product is different brand');
    }
    if (slugLower.includes('alias') && !titleLower.includes('alias')) {
      issues.push('URL contains Alias but product is different brand');
    }
    if (slugLower.includes('stacks') && !titleLower.includes('stacks')) {
      issues.push('URL contains Stacks but product is different brand');
    }
    if (slugLower.includes('subpac') && !titleLower.includes('subpac')) {
      issues.push('URL contains SubPac but product is different brand');
    }
    if (slugLower.includes('kali') && !titleLower.includes('kali')) {
      issues.push('URL contains Kali but product is different brand');
    }
    if (slugLower.includes('jbl') && !titleLower.includes('jbl')) {
      issues.push('URL contains JBL but product is different brand');
    }
    if (slugLower.includes('krk') && !titleLower.includes('krk')) {
      issues.push('URL contains KRK but product is different brand');
    }
    if (slugLower.includes('genelec') && !titleLower.includes('genelec')) {
      issues.push('URL contains Genelec but product is different brand');
    }
    if (slugLower.includes('adam-audio') && !titleLower.includes('adam')) {
      issues.push('URL contains ADAM Audio but product is different brand');
    }
    if (slugLower.includes('neumann') && !titleLower.includes('neumann')) {
      issues.push('URL contains Neumann but product is different brand');
    }
    if (slugLower.includes('focal') && !titleLower.includes('focal')) {
      issues.push('URL contains Focal but product is different brand');
    }
    if (slugLower.includes('eve-audio') && !titleLower.includes('eve')) {
      issues.push('URL contains EVE Audio but product is different brand');
    }
    if (slugLower.includes('eventide') && !titleLower.includes('eventide')) {
      issues.push('URL contains Eventide but product is different brand');
    }
    if (slugLower.includes('universal-audio') && !titleLower.includes('universal audio')) {
      issues.push('URL contains Universal Audio but product is different brand');
    }
    if (slugLower.includes('squier') && !titleLower.includes('squier')) {
      issues.push('URL contains Squier but product is different brand');
    }
    if (slugLower.includes('fender') && !titleLower.includes('fender')) {
      issues.push('URL contains Fender but product is different brand');
    }
    if (slugLower.includes('gibson') && !titleLower.includes('gibson')) {
      issues.push('URL contains Gibson but product is different brand');
    }
    if (slugLower.includes('prs') && !titleLower.includes('prs')) {
      issues.push('URL contains PRS but product is different brand');
    }
    if (slugLower.includes('esp') && !titleLower.includes('esp')) {
      issues.push('URL contains ESP but product is different brand');
    }
    if (slugLower.includes('ibanez') && !titleLower.includes('ibanez')) {
      issues.push('URL contains Ibanez but product is different brand');
    }
    if (slugLower.includes('ackson') && !titleLower.includes('ackson')) {
      issues.push('URL contains Axson but product is different brand');
    }
    if (slugLower.includes(' cort') && !titleLower.includes('cort')) {
      issues.push('URL contains Cort but product is different brand');
    }
    if (slugLower.includes('epiphone') && !titleLower.includes('epiphone')) {
      issues.push('URL contains Epiphone but product is different brand');
    }
    if (slugLower.includes('harley-benton') && !titleLower.includes('harley-benton') && !titleLower.includes('harley benton')) {
      issues.push('URL contains Harley Benton but product is different brand');
    }
    if (slugLower.includes('orange') && !titleLower.includes('orange')) {
      issues.push('URL contains Orange but product is different brand');
    }
    if (slugLower.includes('marshall') && !titleLower.includes('marshall')) {
      issues.push('URL contains Marshall but product is different brand');
    }
    if (slugLower.includes('vox') && !titleLower.includes('vox')) {
      issues.push('URL contains Vox but product is different brand');
    }
    if (slugLower.includes('blackstar') && !titleLower.includes('blackstar')) {
      issues.push('URL contains Blackstar but product is different brand');
    }
    if (slugLower.includes('bugera') && !titleLower.includes('bugera')) {
      issues.push('URL contains Bugera but product is different brand');
    }
    if (slugLower.includes('laney') && !titleLower.includes('laney')) {
      issues.push('URL contains Laney but product is different brand');
    }
    if (slugLower.includes('fishman') && !titleLower.includes('fishman')) {
      issues.push('URL contains Fishman but product is different brand');
    }
    if (slugLower.includes('lr-baggs') && !titleLower.includes('lr baggs') && !titleLower.includes('lr-baggs')) {
      issues.push('URL contains LR Baggs but product is different brand');
    }
    if (slugLower.includes('tech21') && !titleLower.includes('tech21') && !titleLower.includes('tech 21')) {
      issues.push('URL contains Tech21 but product is different brand');
    }
    if (slugLower.includes('jhs') && !titleLower.includes('jhs')) {
      issues.push('URL contains JHS but product is different brand');
    }
    if (slugLower.includes('earthquaker') && !titleLower.includes('earthquaker')) {
      issues.push('URL contains EarthQuaker but product is different brand');
    }
    if (slugLower.includes('walrus') && !titleLower.includes('walrus')) {
      issues.push('URL contains Walrus but product is different brand');
    }
    if (slugLower.includes('strymon') && !titleLower.includes('strymon')) {
      issues.push('URL contains Strymon but product is different brand');
    }
    if (slugLower.includes('boss') && !titleLower.includes('boss')) {
      issues.push('URL contains Boss but product is different brand');
    }
    if (issues.length > 0) {
      allIssues.push({
        id: p.id,
        title: p.title,
        brand: p.brand,
        store,
        decodedUrl: decoded,
        slug,
        issues
      });
    }
  });
});

console.log('=== URL MISMATCHES FOUND ===');
console.log('Total issues:', allIssues.length);
console.log();

// Group by store
const byStore = {};
allIssues.forEach(i => {
  if (!byStore[i.store]) byStore[i.store] = [];
  byStore[i.store].push(i);
});

Object.keys(byStore).sort().forEach(store => {
  console.log(`\n--- ${store.toUpperCase()} (${byStore[store].length} issues) ---`);
  byStore[store].forEach(i => {
    console.log(`  ID ${i.id} | ${i.title} (${i.brand})`);
    i.issues.forEach(iss => console.log(`    -> ${iss}`));
    console.log(`    URL slug: ${i.slug}`);
  });
});

fs.writeFileSync('temp/url-mismatches.json', JSON.stringify(allIssues, null, 2));
console.log('\nFull report saved to temp/url-mismatches.json');
