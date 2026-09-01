#!/usr/bin/env node
/**
 * Complete update for AI Tools, Sidechain, Beatmaker guides:
 * 1. Add all verified store URLs + prices to TEST_SHOP_BTN
 * 2. Expand comparison tables to ALL products
 * 3. Expand verdictProsCons to 3-4 pros + 3-4 cons
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const guidesPath = path.join(ROOT, 'data', 'guides.json');
const buildPath = path.join(ROOT, 'build-guides.js');

// ============================================================
// 1. NEW TEST_SHOP_BTN entries (verified URLs + prices)
// ============================================================
const NEW_SHOP_BTN = {
  374: { // ShaperBox 3
    na: ['andertons', 'gear4music', 'musicstore'],
    prices: { pluginboutique: '$99', amazon: '$99' },
    urls: { pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/6-Action/10606-ShaperBox-3', amazon: 'https://www.amazon.com/dp/B0CM2Q8N1H' }
  },
  375: { // HalfTime
    na: ['andertons', 'gear4music', 'musicstore'],
    prices: { pluginboutique: '$12', amazon: '$12' },
    urls: { pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/6-Action/6524-HalfTime', amazon: 'https://www.amazon.com/Cableguys-HalfTime-Plugin/dp/B07QK2GMPM' }
  },
  376: { // RC-20 Retro Color
    na: ['musicstore'],
    prices: { pluginboutique: '$99', gear4music: '£29.99', amazon: '$99' },
    urls: { gear4music: 'https://www.gear4music.com/Recording-and-Computers/XLN-Audio-RC-20-Retro-Color/3NGQ', pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/6-Action/6842-RC-20-Retro-Color', amazon: 'https://www.amazon.com/XLN-Audio-RC-20-Retro-Color/dp/B08JSYBDY1' }
  },
  377: { // Transit 2
    na: [],
    prices: { pluginboutique: '$129', gear4music: '£99.00', andertons: '£109', musicstore: '€108.40', amazon: '$129' },
    urls: { gear4music: 'https://www.gear4music.com/Recording-and-Computers/Baby-Audio-Transit-2/6RY2', andertons: 'https://www.andertons.co.uk/baby-audio-transit-2-motion-effects-plugin/', pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/6-Action/10358-Transit-2', musicstore: 'https://www.musicstore.com/en_OT/EUR/Baby-Audio-Transit-2-License-Code/art-PCM0018531-000', amazon: 'https://www.amazon.com/Baby-Audio-Transit-2-Plugin/dp/B0DCJ5LPZL' }
  },
  378: { // Infiltrator 2
    na: ['andertons', 'gear4music', 'musicstore'],
    prices: { pluginboutique: '$129.99', amazon: '$129.99' },
    urls: { pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/6-Action/11148-Infiltrator-2', amazon: 'https://www.amazon.com/Devious-Machines-Infiltrator-2-Effects/dp/B0DPD778SC' }
  },
  379: { // Neutron 5
    na: [],
    prices: { pluginboutique: '$224', gear4music: '£231.00', andertons: '£252', musicstore: '€242.90', amazon: '$224' },
    urls: { gear4music: 'https://www.gear4music.com/Recording-and-Computers/iZotope-Neutron-5-Advanced/6U5K', andertons: 'https://www.andertons.co.uk/izotope-neutron-5-standard--esd/', pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/75-Studio-/12428-Neutron-5-Advanced', musicstore: 'https://www.musicstore.com/en_OT/EUR/iZotope-Neutron-5-License-Code/art-PCM0018250-000', amazon: 'https://www.amazon.com/iZotope-Neutron-5-Advanced/dp/B0DF83BWHX' }
  },
  380: { // smart:EQ 4
    na: ['andertons'],
    prices: { pluginboutique: '$129', gear4music: '£47.00', musicstore: '€105.00', amazon: '$129' },
    urls: { gear4music: 'https://www.gear4music.com/Recording-and-Computers/Sonible-SmartEQ-4/65LT', pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/16-EQ/11784-smart-EQ-4', musicstore: 'https://www.musicstore.com/en_OT/EUR/Sonible-smart-EQ-4-License-Code/art-PCM0017947-000', amazon: 'https://www.amazon.com/Sonible-smartEQ-4/dp/B0CVHRCRW2' }
  },
  381: { // smart:limit
    na: ['andertons'],
    prices: { pluginboutique: '$129', gear4music: '£66.00', musicstore: '€105.00', amazon: '$129' },
    urls: { gear4music: 'https://www.gear4music.com/Recording-and-Computers/Sonible-SmartLimit/4M4S', pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/6-Action/9008-smartlimit', musicstore: 'https://www.musicstore.com/en_OT/EUR/Sonible-Smart-limit-License-Code/art-PCM0017210-000', amazon: 'https://www.amazon.com/Sonible-smartlimit-Plugin/dp/B0C8J4WJF1' }
  },
  382: { // Scaler 3
    na: ['andertons', 'gear4music', 'musicstore'],
    prices: { pluginboutique: '$99', amazon: '$99' },
    urls: { pluginboutique: 'https://www.pluginboutique.com/product/4-Synth/11533-Scaler-3', amazon: 'https://www.amazon.com/Plugin-Boutique-Scaler-3-Software/dp/B0FKK2H83D' }
  },
  383: { // MIXROOM
    na: ['andertons', 'gear4music', 'musicstore'],
    prices: { pluginboutique: '$80', amazon: '$80' },
    urls: { pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/16-EQ/8708-MIXROOM', amazon: 'https://www.amazon.com/Mastering-Mix-MIXROOM-Plugin/dp/B09VH5YZ1D' }
  },
  384: { // Lifeline Expanse
    na: ['andertons', 'gear4music', 'musicstore'],
    prices: { pluginboutique: '$79', amazon: '$79' },
    urls: { pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/6-Action/11521-Lifeline-Expanse', amazon: 'https://www.amazon.com/Excite-Audio-Lifeline-Expanse-Plugin/dp/B0DKF74MVH' }
  },
  385: { // Trash
    na: [],
    prices: { pluginboutique: '$99', gear4music: '£62.55', andertons: '£95', musicstore: '€83.20', amazon: '$99' },
    urls: { gear4music: 'https://www.gear4music.com/Recording-and-Computers/iZotope-Trash/6AAU', andertons: 'https://www.andertons.co.uk/izotope-trash-creative-distortion-plugin/', pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/6-Action/12095-Trash', musicstore: 'https://www.musicstore.com/en_OT/EUR/iZotope-Trash-License-Code/art-PCM0018334-000', amazon: 'https://www.amazon.com/iZotope-Trash-Distortion-Plugin/dp/B0DF84C84J' }
  },
  386: { // H3000 Band Delays MKII
    na: ['andertons'],
    prices: { pluginboutique: '$99', gear4music: '£128.00', musicstore: '€146.20', amazon: '$99' },
    urls: { gear4music: 'https://www.gear4music.com/Recording-and-Computers/Eventide-H3000-Band-Delays-MKII/6EQU', pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/51-Eventide-H3000-Band-Delays-MKII', musicstore: 'https://www.musicstore.com/en_OT/EUR/Eventide-H3000-Band-Delays-MKII-License-Code/art-PCM0015205-000', amazon: 'https://www.amazon.com/Eventide-H3000-Band-Delays-MKII/dp/B0CX8883YP' }
  },
  387: { // Chorus JUN-6
    na: ['andertons', 'musicstore'],
    prices: { pluginboutique: '$99', gear4music: '£39.30', amazon: '$99' },
    urls: { gear4music: 'https://www.gear4music.com/Recording-and-Computers/Arturia-Chorus-JUN-6/5GAL', pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/53-Chorus-JUN-6', amazon: 'https://www.amazon.com/Arturia-Chorus-JUN-6-Plugin/dp/B085W5GJQF' }
  },
  388: { // Repeater
    na: ['andertons'],
    prices: { pluginboutique: '$99', gear4music: '£79.00', musicstore: '€74.80', amazon: '$99' },
    urls: { gear4music: 'https://www.gear4music.com/Recording-and-Computers/D16-Group-Repeater-Vintage-Modelled-Delay/3XWM', pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/57-Repeater', musicstore: 'https://www.musicstore.com/en_OT/EUR/D16-Group-Repeater-License-Code/art-PCM0015075-000', amazon: 'https://www.amazon.com/D16-Group-Repeater-Delay-Plugin/dp/B072QJY1VZ' }
  }
};

// ============================================================
// 2. Expanded comparison data for all products
// ============================================================
const COMPARISONS = {
  'ai-tools-plugins': {
    headers: ['Sonible smart:EQ 4', 'iZotope Neutron 5', 'XLN Audio RC-20 Retro Color', 'Baby Audio Transit 2', 'Devious Machines Infiltrator 2'],
    rows: [
      { label: 'Type', values: ['Smart EQ', 'Mixing Suite', 'Creative FX Chain', 'Motion FX', 'Multimode FX'], label_es: 'Tipo', values_es: ['EQ Inteligente', 'Suite de Mezcla', 'Cadena de FX Creativos', 'FX de Movimiento', 'FX Multimodo'] },
      { label: 'AI Features', values: ['Spectral balancing, multi-track masking detection', 'Mix Assistant, Unmask, module suggestions', 'None — manual preset-based', 'Auto-pumping, sidechain via LFO', 'Envelope-following modulation'], label_es: 'Funciones IA', values_es: ['Balance espectral, detección de enmascaramiento multitrack', 'Asistente de mezcla, Unmask, sugerencias de módulos', 'Ninguna — basado en presets manuales', 'Auto-bombeo, sidechain via LFO', 'Modulación por seguimiento de envolvente'] },
      { label: 'Tracks', values: ['Multi-track analysis', 'Single or multi-track', 'Per-instance', 'Per-instance', 'Per-instance'], label_es: 'Tracks', values_es: ['Análisis multitrack', 'Individual o multitrack', 'Por instancia', 'Por instancia', 'Por instancia'] },
      { label: 'Price', values: ['$129 / £47 / €105', '$224 / £231 / €242', '$99 / £29.99', '$129 / £99 / €108', '$129.99'], label_es: 'Precio', values_es: ['$129 / £47 / €105', '$224 / £231 / €242', '$99 / £29.99', '$129 / £99 / €108', '$129.99'] },
      { label: 'Best For', values: ['EQ across all mixing sessions', 'Individual track mixing assistance', 'Lo-fi and vintage color', 'Buildups, drops, transitions', 'Complex modulation and movement'], label_es: 'Ideal Para', values_es: ['EQ en todas las sesiones de mezcla', 'Asistencia de mezcla por pista', 'Color lo-fi y vintage', 'Buildups, drops, transiciones', 'Modulación compleja y movimiento'] }
    ]
  },
  'sidechain-modulation-plugins': {
    headers: ['Xfer Records LFO Tool', 'FabFilter Volcano 3', 'ShaperBox 3', 'Cableguys HalfTime', 'Tracktion Motion FX'],
    rows: [
      { label: 'Type', values: ['Volume Envelope', 'Filter/Saturator', 'Multimode Shaper', 'Pitch/Speed FX', 'Motion Modulator'], label_es: 'Tipo', values_es: ['Envolvente de Volumen', 'Filtro/Saturador', 'Formador Multimodo', 'FX de Velocidad/Pitch', 'Modulador de Movimiento'] },
      { label: 'LFO Shapes', values: ['Draw custom curves', 'Modulation knobs + custom curves', '300+ presets, draw custom', '2 modes: Half-speed + quarter-speed', 'Draw or randomize'], label_es: 'Formas LFO', values_es: ['Dibujar curvas personalizadas', 'Perillas de modulación + curvas', '300+ presets, curvas personalizadas', '2 modos: medio + cuarto de velocidad', 'Dibujar o aleatorizar'] },
      { label: 'Latency', values: ['Zero-latency mode available', 'Zero-latency mode', 'Low latency', 'Low latency', 'Low latency'], label_es: 'Latencia', values_es: ['Modo sin latencia disponible', 'Modo sin latencia', 'Baja latencia', 'Baja latencia', 'Baja latencia'] },
      { label: 'Price', values: ['$49', '$179', '$99', '$12', 'Free / $49'], label_es: 'Precio', values_es: ['$49', '$179', '$99', '$12', 'Gratis / $49'] },
      { label: 'Best For', values: ['Sidechain compression emulation', 'Creative filter modulation', 'Multi-effect rhythmic patterns', 'Half-speed and slow-down effects', 'Auto-pan and rhythmic motion'], label_es: 'Ideal Para', values_es: ['Emulación de sidechain compression', 'Modulación creativa de filtros', 'Patrones rítmicos multi-efecto', 'Efectos de ralentización', 'Auto-pan y movimiento rítmico'] }
    ]
  },
  'beatmaker-plugins': {
    headers: ['XLN Audio Addictive Drums 3', 'Native Instruments Battery 4', 'XLN Audio XO', 'U jam Beats', 'Develande Machine Digicat'],
    rows: [
      { label: 'Type', values: ['Drum Sampler', 'Drum Sampler', 'AI Drum Machine', 'Beat Maker', 'Drum Synth'], label_es: 'Tipo', values_es: ['Sampler de Batería', 'Sampler de Batería', 'Máquina de Ritmos IA', 'Creador de Beats', 'Sintetizador de Batería'] },
      { label: 'AI Features', values: ['None — MIDI patterns', 'None — sample slicing', 'Machine learning pattern generation', 'Genre-specific AI patterns', 'None — sound design'], label_es: 'Funciones IA', values_es: ['Ninguno — patrones MIDI', 'Ninguno — slicing de samples', 'Generación de patrones con aprendizaje automático', 'Patrones IA por género', 'Ninguno — diseño de sonido'] },
      { label: 'Sounds', values: ['8000+ samples, 2000+ MIDI', '200+ kits, 45GB library', '300 kits, 10M+ samples cloud', '10000+ sounds, 500+ kits', '500+ kits, 10000+ sounds'], label_es: 'Sonidos', values_es: ['8000+ samples, 2000+ MIDI', '200+ kits, biblioteca 45GB', '300 kits, 10M+ samples en nube', '10000+ sonidos, 500+ kits', '500+ kits, 10000+ sonidos'] },
      { label: 'Price', values: ['$299 (all-in)', '$149', '$99', '$99', '$49'], label_es: 'Precio', values_es: ['$299 (todo incluido)', '$149', '$99', '$99', '$49'] },
      { label: 'Best For', values: ['Realistic acoustic drums', 'Electronic and hip-hop production', 'Quick beat creation for any genre', 'Zero-skill beat creation', 'Affordable electronic drum sounds'], label_es: 'Ideal Para', values_es: ['Baterías acústicas realistas', 'Producción electrónica y hip-hop', 'Creación rápida de beats para cualquier género', 'Creación de beats sin experiencia', 'Sonidos de batería electrónica accesibles'] }
    ]
  }
};

// ============================================================
// 3. Expanded verdictProsCons
// ============================================================
const VERDICTS = {
  'ai-tools-plugins': [
    { id: 380, name: 'Sonible smart:EQ 4', pros: ['AI spectral balancing corrects mix issues in seconds', 'Multi-track masking detection saves hours of soloing', 'Profile-based learning adapts to any instrument or genre', 'Clean, intuitive interface with minimal learning curve'], cons: ['Single-function plugin — only handles EQ tasks', 'AI suggestions sometimes need manual fine-tuning', 'Higher price than basic EQ plugins'] },
    { id: 379, name: 'iZotope Neutron 5', pros: ['8 modules in one plugin cover most mixing tasks', 'Mix Assistant identifies frequency conflicts automatically', 'Unmask module creates space between competing tracks', 'Sculptor module shapes tone without traditional EQ'], cons: ['Steep learning curve with so many modules', 'AI suggestions can sound over-processed if pushed too hard', 'Advanced version required for full feature set', 'Resource-heavy on older systems'] },
    { id: 376, name: 'XLN Audio RC-20 Retro Color', pros: ['Six effect modules for instant vintage character', 'Rain and vinyl noise layers add authentic texture', 'Pre-delivery processing chain available', 'Huge library of genre-specific presets'], cons: ['No AI assistance — entirely manual control', 'Can muddy a mix if overused', 'Limited to lo-fi and vintage aesthetics'] },
    { id: 377, name: 'Baby Audio Transit 2', pros: ['One-knob transitions create builds and drops instantly', '250+ presets organized by genre and DAW', 'Sidechain integration for pumping effects', 'Works in any DAW with low CPU usage'], cons: ['Narrow scope — only handles transitions and builds', 'Not useful for detailed mixing or mastering', 'Some presets sound generic without customization'] },
    { id: 378, name: 'Devious Machines Infiltrator 2', pros: ['Multimode architecture handles filtering, distortion, and modulation', 'Envelope-following creates responsive, dynamic effects', '1000+ presets spanning dozens of genres', 'Intuitive macro controls for quick results'], cons: ['Steep learning curve with so many modes', 'Can overwhelm with too many options', 'Requires time to explore all features effectively'] }
  ],
  'sidechain-modulation-plugins': [
    { id: 374, name: 'ShaperBox 3', pros: ['300+ presets covering volume, filter, pan, and distortion', 'Draw custom LFO curves for total control', 'Chain multiple shapers for complex rhythmic patterns', 'Low CPU usage even on older systems'], cons: ['Requires time to master custom curve editing', 'No standalone version — plugin only', 'Some presets overlap with other ShaperBox modes'] },
    { id: 375, name: 'HalfTime', pros: ['Instant half-speed and quarter-speed effects', 'One-knob simplicity for zero learning curve', 'Lowest price of any serious sidechain plugin', 'Works on any audio source without configuration'], cons: ['Only two speed modes — no custom LFO shapes', 'Not useful beyond specific half-speed effect', 'Limited to pitch and time manipulation'] },
    { id: 390, name: 'LFO Tool', pros: ['Draw completely custom LFO curves for any purpose', 'Zero-latency mode for live use', 'Multi-output for parallel processing', 'Proven reliability in professional studios worldwide'], cons: ['Single-function plugin — volume envelope only', 'Steeper learning curve than preset-based alternatives', 'Higher price for a single-purpose tool'] },
    { id: 391, name: 'FabFilter Volcano 3', pros: ['State-of-the-art filter sound quality', 'Modulation system allows complex routing and ADSR control', 'Per-band saturation for creative tone shaping', 'Zero-latency mode available'], cons: ['Most expensive option in this category', 'Complex modulation system requires time to learn', 'Primarily a filter — not a complete sidechain solution'] },
    { id: 392, name: 'Tracktion Motion FX', pros: ['Free version available for zero-risk testing', 'Auto-pan and rhythmic motion tools built in', 'Randomize function creates happy accidents', 'Lightweight and fast on any system'], cons: ['Less refined sound quality than premium alternatives', 'Smaller preset library than competitors', 'Limited community support and tutorials'] }
  ],
  'beatmaker-plugins': [
    { id: 370, name: 'XLN Audio Addictive Drums 3', pros: ['Most realistic acoustic drum sounds available', '2000+ MIDI patterns organized by groove and feel', 'Mixer section with built-in effects for complete sound', 'Expandable with individualADpaks'], cons: ['Higher price than alternatives when fully expanded', 'Focus on acoustic drums limits electronic production', 'Large download size for full library'] },
    { id: 371, name: 'Native Instruments Battery 4', pros: ['45GB factory library covers every genre from hip-hop to metal', 'Advanced sample slicing for creative drum manipulation', 'Color effects add character without external plugins', 'Integrates with NI Komplete ecosystem'], cons: ['Steep learning curve for beginners', 'Heavy on system resources with large libraries', 'Interface feels dated compared to newer competitors'] },
    { id: 372, name: 'XLN Audio XO', pros: ['Machine learning groups similar samples automatically', '10M+ samples from Splice built in', 'Cloud-based library updates continuously', 'One-click beat generation from any sample collection'], cons: ['Cloud dependency requires internet for full functionality', 'AI patterns can sound generic without manual editing', 'Learning curve for advanced features'] },
    { id: 373, name: 'U jam Beats', pros: ['Zero skill required — just select genre and press play', '500+ kits covering every electronic genre', '10000+ sounds organized by style and mood', 'Built-in effects chain for polished output'], cons: ['Limited control for advanced producers', 'Sounds can feel generic compared to custom sound design', 'Not expandable beyond built-in library'] },
    { id: 369, name: 'Develande Machine Digicat', pros: ['10000+ sounds at budget-friendly price', '500+ kits spanning every electronic genre', 'Lightweight on CPU and RAM', 'Regular updates add new content'], cons: ['Less polished than premium competitors', 'Limited community support and tutorials', 'Interface lacks refinement of established players'] }
  ]
};

// ============================================================
// APPLY: Update guides.json
// ============================================================
console.log('Loading guides.json...');
const guides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));

let updated = 0;
for (const g of guides) {
  // Update verdictProsCons
  if (VERDICTS[g.id]) {
    g.verdictProsCons = VERDICTS[g.id];
    console.log(`  Updated verdictProsCons for ${g.id}`);
  }

  // Update comparison
  if (COMPARISONS[g.id]) {
    const comp = COMPARISONS[g.id];
    const rows = comp.rows.map(r => ({
      label: r.label,
      val: r.values[0], val2: r.values[1], val3: r.values[2], val4: r.values[3], val5: r.values[4],
      label_es: r.label_es,
      val_es: r.values_es[0], val2_es: r.values_es[1], val3_es: r.values_es[2], val4_es: r.values_es[3], val5_es: r.values_es[4]
    }));
    g.comparison = {
      headers: comp.headers,
      name1: comp.headers[0], name2: comp.headers[1], name3: comp.headers[2], name4: comp.headers[3], name5: comp.headers[4],
      rows: rows
    };
    console.log(`  Updated comparison for ${g.id} → ${comp.headers.length} products`);
  }
  updated++;
}

fs.writeFileSync(guidesPath, JSON.stringify(guides, null, 2), 'utf8');
console.log(`\nWrote guides.json (${guides.length} guides)`);

// ============================================================
// APPLY: Update build-guides.js TEST_SHOP_BTN
// ============================================================
console.log('\nLoading build-guides.js...');
let buildContent = fs.readFileSync(buildPath, 'utf8');

let count = 0;
for (const [idStr, btn] of Object.entries(NEW_SHOP_BTN)) {
  const id = parseInt(idStr);
  const regex = new RegExp(`(\\s*${id}:\\s*\\{[^}]*prices:\\s*\\{[^}]*\\}[^}]*urls:\\s*\\{[^}]*\\}[^}]*\\})`, 's');
  const match = buildContent.match(regex);

  if (match) {
    const oldBlock = match[1];
    const parts = [];
    if (btn.na && btn.na.length) parts.push(`na: ${JSON.stringify(btn.na)}`);
    parts.push(`prices: ${JSON.stringify(btn.prices)}`);
    parts.push(`urls: ${JSON.stringify(btn.urls)}`);
    const newBlock = oldBlock.replace(
      /\{[^}]*\}/,
      `{ ${parts.join(', ')} }`
    );
    // Simpler: just replace the whole object
    const simpleRegex = new RegExp(`(${id}:\\s*\\{)([^}]*\\})`, 's');
    buildContent = buildContent.replace(simpleRegex, (m, pre, post) => {
      return `${pre} ${parts.join(', ')} ${post}`;
    });
    count++;
  } else {
    console.log(`  WARN: ID ${id} not found in build-guides.js`);
  }
}

fs.writeFileSync(buildPath, buildContent, 'utf8');
console.log(`Updated ${count} TEST_SHOP_BTN entries in build-guides.js`);

console.log('\nDone! Run:');
console.log('  node temp/gen-shop-buttons.js');
console.log('  node build-guides.js');
