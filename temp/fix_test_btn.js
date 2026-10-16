const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');

// Remove the wrongly inserted entries (lines 6240-6275 area)
const wrongBlock = `    { q: "What do I need for a two-host podcast setup?", q_es: "¿Qué necesito para un podcast con dos presentadores?", a: "For two mics, the simplest solution is a dual-XLR interface or mixer like the Elgato Wave XLR Pro ($350) handling two microphones, or two USB mics into a laptop. The Rode Streamer X and BEACN Mix Create also route multiple audio sources. The Elgato Stream Deck+ ($160) makes mute and scene switching one press.", a_es: "Para dos micros, la solución más simple es una interfaz o mezcladora de doble XLR como el Elgato Wave XLR Pro ($350) gestionando dos micrófonos, o dos micros USB a un portátil. El Rode Streamer X y el BEACN Mix Create también enrutan múltiples fuentes de audio. El Elgato Stream Deck+ ($160) hace que silenciar o cambiar de escena sea un solo toque." } ]\n  1001: {prices:{pluginboutique:"$199.00"}},\n  1002: {prices:{pluginboutique:"$179.00"}},\n  1003: {prices:{pluginboutique:"$199.00"}},\n  1004: {prices:{pluginboutique:"$249.00"}},\n  1005: {prices:{pluginboutique:"$189.00"}},\n  1006: {prices:{pluginboutique:"$199.00"}},\n  1007: {prices:{pluginboutique:"$99.00"}},\n  1008: {prices:{pluginboutique:"$99.00"}},\n  1009: {prices:{pluginboutique:"€130.08"}},\n  1010: {prices:{pluginboutique:"$89.00"}},\n  1011: {prices:{pluginboutique:"$99.00"}},\n  1012: {prices:{pluginboutique:"$149.00"}},\n  1013: {prices:{pluginboutique:"$399.00"}},\n  1014: {prices:{pluginboutique:"$299.00"}},\n  1015: {prices:{pluginboutique:"$699.00"}},\n  1016: {prices:{pluginboutique:"$99.00"}},\n  1017: {prices:{pluginboutique:"€399.00"}},\n  1018: {prices:{pluginboutique:"$149.00"}},\n  1019: {prices:{pluginboutique:"$199.99"}},\n  1020: {prices:{pluginboutique:"$299.00"}},\n  1021: {prices:{pluginboutique:"$149.00"}},\n  1022: {prices:{pluginboutique:"$269.00"}},\n  1023: {prices:{pluginboutique:"$99.00"}},\n  1024: {prices:{pluginboutique:"$199.00"}},\n  1025: {prices:{pluginboutique:"$199.00"}},\n  1026: {prices:{pluginboutique:"$249.00"}},\n  1027: {prices:{pluginboutique:"$129.00"}},\n  1028: {prices:{pluginboutique:"$99.00"}},\n  1029: {prices:{pluginboutique:"$249.00"}},\n  1030: {prices:{pluginboutique:"$269.00"}},\n  1031: {prices:{pluginboutique:"$250.00"}},\n  1032: {prices:{pluginboutique:"$99.00"}},\n  1033: {prices:{pluginboutique:"$499.00"}},\n  1034: {prices:{pluginboutique:"$519.00"}},\n  1035: {prices:{pluginboutique:"$249.00"}},\n  1036: {prices:{pluginboutique:"$499.00"}},\n`;

if (bg.includes(wrongBlock)) {
  bg = bg.replace(wrongBlock, '    { q: "What do I need for a two-host podcast setup?", q_es: "¿Qué necesito para un podcast con dos presentadores?", a: "For two mics, the simplest solution is a dual-XLR interface or mixer like the Elgato Wave XLR Pro ($350) handling two microphones, or two USB mics into a laptop. The Rode Streamer X and BEACN Mix Create also route multiple audio sources. The Elgato Stream Deck+ ($160) makes mute and scene switching one press.", a_es: "Para dos micros, la solución más simple es una interfaz o mezcladora de doble XLR como el Elgato Wave XLR Pro ($350) gestionando dos micrófonos, o dos micros USB a un portátil. El Rode Streamer X y el BEACN Mix Create también enrutan múltiples fuentes de audio. El Elgato Stream Deck+ ($160) hace que silenciar o cambiar de escena sea un solo toque." } ]\n');
  console.log('Removed wrongly inserted entries');
} else {
  console.log('Wrong block not found - checking partial match...');
  // Try to find the pattern more loosely
  const startIdx = bg.indexOf('  1001: {prices:{pluginboutique:"$199.00"}}');
  const endIdx = bg.indexOf('  1036: {prices:{pluginboutique:"$499.00"}}');
  if (startIdx !== -1 && endIdx !== -1) {
    const endOfLine = bg.indexOf('\n', endIdx) + 1;
    const removed = bg.substring(startIdx, endOfLine);
    bg = bg.replace(removed, '');
    console.log('Removed via index search: ' + removed.length + ' chars');
  } else {
    console.log('Could not find entries to remove');
  }
}

// Now insert before the REAL TEST_SHOP_BTN closing (line 5936: };function hollyDefaultRegion)
const realClose = '};function hollyDefaultRegion()';
const realCloseIdx = bg.indexOf(realClose);
if (realCloseIdx !== -1) {
  const entriesStr = `  1001: {prices:{pluginboutique:"$199.00"}},\n  1002: {prices:{pluginboutique:"$179.00"}},\n  1003: {prices:{pluginboutique:"$199.00"}},\n  1004: {prices:{pluginboutique:"$249.00"}},\n  1005: {prices:{pluginboutique:"$189.00"}},\n  1006: {prices:{pluginboutique:"$199.00"}},\n  1007: {prices:{pluginboutique:"$99.00"}},\n  1008: {prices:{pluginboutique:"$99.00"}},\n  1009: {prices:{pluginboutique:"€130.08"}},\n  1010: {prices:{pluginboutique:"$89.00"}},\n  1011: {prices:{pluginboutique:"$99.00"}},\n  1012: {prices:{pluginboutique:"$149.00"}},\n  1013: {prices:{pluginboutique:"$399.00"}},\n  1014: {prices:{pluginboutique:"$299.00"}},\n  1015: {prices:{pluginboutique:"$699.00"}},\n  1016: {prices:{pluginboutique:"$99.00"}},\n  1017: {prices:{pluginboutique:"€399.00"}},\n  1018: {prices:{pluginboutique:"$149.00"}},\n  1019: {prices:{pluginboutique:"$199.99"}},\n  1020: {prices:{pluginboutique:"$299.00"}},\n  1021: {prices:{pluginboutique:"$149.00"}},\n  1022: {prices:{pluginboutique:"$269.00"}},\n  1023: {prices:{pluginboutique:"$99.00"}},\n  1024: {prices:{pluginboutique:"$199.00"}},\n  1025: {prices:{pluginboutique:"$199.00"}},\n  1026: {prices:{pluginboutique:"$249.00"}},\n  1027: {prices:{pluginboutique:"$129.00"}},\n  1028: {prices:{pluginboutique:"$99.00"}},\n  1029: {prices:{pluginboutique:"$249.00"}},\n  1030: {prices:{pluginboutique:"$269.00"}},\n  1031: {prices:{pluginboutique:"$250.00"}},\n  1032: {prices:{pluginboutique:"$99.00"}},\n  1033: {prices:{pluginboutique:"$499.00"}},\n  1034: {prices:{pluginboutique:"$519.00"}},\n  1035: {prices:{pluginboutique:"$249.00"}},\n  1036: {prices:{pluginboutique:"$499.00"}},\n`;
  bg = bg.substring(0, realCloseIdx) + entriesStr + bg.substring(realCloseIdx);
  console.log('Inserted 36 entries into real TEST_SHOP_BTN block');
} else {
  console.log('ERROR: Could not find real TEST_SHOP_BTN closing');
}

fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('Done. File size: ' + bg.length);
