var fs = require('fs');
var p = 'data/guides.json';
var d = JSON.parse(fs.readFileSync(p, 'utf8'));
var g = d.find(function(x){return x.id==='monitor-setup'});

console.log('=== UPDATING monitor-setup ===');

// 1. Update titles (SEO optimized)
g.title = 'How to Set Up Studio Monitors So Your Mixes Translate Well';
g.title_es = 'Cómo configurar tus monitores de estudio para que tus mezclas traduzcan bien';
g.titleTag = 'How to Set Up Studio Monitors So Your Mixes Translate Well (Pros, Cons & Buying Guide 2026)';
g.titleTag_es = 'Cómo configurar tus monitores de estudio para que tus mezclas traduzcan bien (pros, contras y guía de compra 2026)';
g.aboutName = 'Monitor Setup & Room Calibration';

// 2. Update featuredProducts with all 9 products
g.featuredProducts = [19, 59, 645, 646, 647, 648, 649, 650, 651]; // HS8, K&M 26722, Focal Alpha 65 Evo, ISO-155, Sonarworks, UMIK-1, Genelec GLM, MoPADs, MS-100

// 3. Update productTable with corrected data
g.productTable = {
  "title": "Monitor Setup Gear Compared in This Guide",
  "title_es": "Comparativa del equipo de configuración de monitores en esta guía",
  "columns": [
    {"title": "Yamaha HS8", "title_es": "Yamaha HS8"},
    {"title": "K&M 26722 Monitor Stands (Each)", "title_es": "K&M 26722 Soportes de Monitor (Unidad)"},
    {"title": "Focal Alpha 65 Evo", "title_es": "Focal Alpha 65 Evo"},
    {"title": "IsoAcoustics ISO-155 (Pair)", "title_es": "IsoAcoustics ISO-155 (Par)"},
    {"title": "Sonarworks SoundID Reference", "title_es": "Sonarworks SoundID Reference"},
    {"title": "MiniDSP UMIK-1", "title_es": "MiniDSP UMIK-1"},
    {"title": "Genelec GLM Kit", "title_es": "Genelec GLM Kit"},
    {"title": "Auralex MoPADs (4-Pack)", "title_es": "Auralex MoPADs (Pack 4)"},
    {"title": "Ultimate Support MS-100 (Each)", "title_es": "Ultimate Support MS-100 (Unidad)"}
  ],
  "rows": [
    {
      "label": "Category",
      "label_es": "Categoría",
      "values": [
        {"value": "Studio Monitor", "value_es": "Monitor de estudio"},
        {"value": "Floor Monitor Stands", "value_es": "Soportes de suelo"},
        {"value": "Studio Monitor", "value_es": "Monitor de estudio"},
        {"value": "Desktop Isolation Stands", "value_es": "Soportes de aislamiento escritorio"},
        {"value": "Room Correction Software", "value_es": "SW corrección de sala"},
        {"value": "Measurement Mic", "value_es": "Micrófono de medición"},
        {"value": "Room Calibration Kit", "value_es": "Kit calibración sala"},
        {"value": "Isolation Pads", "value_es": "Almohadillas aislamiento"},
        {"value": "Heavy-Duty Monitor Stands", "value_es": "Soportes robustos monitor"}
      ]
    },
    {
      "label": "Best For",
      "label_es": "Ideal para",
      "values": [
        {"value": "Reference mixing in untreated rooms; rear port needs 30–50 cm from wall", "value_es": "Mezcla de referencia en salas sin tratar; puerto trasero exige 30–50 cm de la pared"},
        {"value": "Ear-level positioning on floor; rigid steel, 18 kg capacity", "value_es": "Posicionamiento a altura de oído en suelo; acero rígido, 18 kg capacidad"},
        {"value": "Desk against wall; front-ported, no bass buildup near walls", "value_es": "Escritorio contra la pared; bass-reflex frontal, sin acumulación de graves"},
        {"value": "Desktop decoupling; tilt -6.5° to +8.5°, 11 kg capacity", "value_es": "Desacoplo en escritorio; inclinación -6.5° a +8.5°, 11 kg capacidad"},
        {"value": "Flatten response to ±0.5 dB; includes XREF20 mic; any monitors", "value_es": "Aplanar respuesta a ±0,5 dB; incluye mic XREF20; cualquier monitor"},
        {"value": "USB measurement mic; 24-bit/48 kHz, no interface needed; REW/Sonarworks", "value_es": "Micrófono USB medición; 24-bit/48 kHz, sin interfaz; REW/Sonarworks"},
        {"value": "ONLY for Genelec SAM monitors; network adapter + GLM software", "value_es": "SOLO para monitores Genelec SAM; adaptador red + software GLM"},
        {"value": "Budget decoupling for small nearfields; 4°/8° tilt, $40 pack of 4", "value_es": "Desacoplo económico nearfields pequeños; 4°/8° inclinación, $40 pack 4"},
        {"value": "Heavy midfield/main monitors; 45 kg capacity, 91–137 cm, cable mgmt", "value_es": "Monitores midfield/principales pesados; 45 kg capacidad, 91–137 cm, gestión cables"}
      ]
    },
    {
      "label": "Key Feature",
      "label_es": "Característica clave",
      "values": [
        {"value": "8\" woofer, 120 W bi-amp, Room Control/High Trim (no mid EQ)", "value_es": "Woofer 8\", 120 W bi-amp, Room Control/High Trim (sin EQ medios)"},
        {"value": "Height 90–135 cm, 18 kg cap., cable clips, €78/unit (~€156 pair)", "value_es": "Altura 90–135 cm, 18 kg cap., clips cable, €78/unidad (~€156 par)"},
        {"value": "6.5\" Slatefiber woofer, front-ported, 85W, 40 Hz–22 kHz", "value_es": "Woofer 6.5\" Slatefiber, bass-reflex frontal, 85W, 40 Hz–22 kHz"},
        {"value": "Patented isolator, tilt -6.5° to +8.5°, 11 kg cap., ~$159 pair", "value_es": "Aislador patentado, inclinación -6.5° a +8.5°, 11 kg, ~$159 par"},
        {"value": "Flattens to ±0.5 dB, includes XREF20 mic (phantom), 500+ headphone profiles", "value_es": "Aplana a ±0,5 dB, incluye mic XREF20 (phantom), 500+ perfiles auriculares"},
        {"value": "USB plug-and-play, 24-bit/48 kHz ADC, omnidirectional, no interface needed", "value_es": "USB plug-and-play, ADC 24-bit/48 kHz, omnidireccional, sin interfaz"},
        {"value": "ONLY Genelec SAM monitors; network adapter + GLM, 20+ filter groups", "value_es": "SOLO monitores Genelec SAM; adaptador red + GLM, 20+ grupos filtro"},
        {"value": "High-density foam, 4°/8° tilt, $40/4-pack, compresses under heavy monitors", "value_es": "Espuma alta densidad, 4°/8° inclinación, $40/pack 4, se comprime bajo peso"},
        {"value": "Height 91–137 cm, 45 kg cap., cable mgmt, locking casters, ~$299/unit", "value_es": "Altura 91–137 cm, 45 kg cap., gestión cables, ruedas freno, ~$299/unidad"}
      ]
    },
    {
      "label": "Price (USD)",
      "label_es": "Precio (USD)",
      "values": [
        {"value": "$399 each", "value_es": "$399 c/u"},
        {"value": "$78 each (~$156 pair)", "value_es": "$78 c/u (~$156 par)"},
        {"value": "$499 each", "value_es": "$499 c/u"},
        {"value": "$159 pair", "value_es": "$159 par"},
        {"value": "$299 (mic included)", "value_es": "$299 (mic incluido)"},
        {"value": "$79", "value_es": "$79"},
        {"value": "$349 (adapter included)", "value_es": "$349 (adaptador incluido)"},
        {"value": "$40 (4-pack)", "value_es": "$40 (pack 4)"},
        {"value": "$299 each", "value_es": "$299 c/u"}
      ]
    }
  ]
};

console.log('productTable updated');

fs.writeFileSync(p, JSON.stringify(d, null, 2));
console.log('monitor-setup guide updated in guides.json');