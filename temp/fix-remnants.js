const fs = require('fs');
const guidesPath = './data/guides.json';
const guides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));
const guide = guides.find((g) => g.id === 'studio-subwoofers-setup');

// ---------- 1. INTRO (six subwoofers still correct; no product names) ----------
// No change needed to intro/intro_es since it doesn't name old products.

// ---------- 2. DESCRIPTION / DESCRIPTION_ES ----------
guide.description =
  'BEST studio subwoofers setup guide 2026. Position your sub with the crawl, set the crossover and align the phase. High-end subs: Neumann KH 810 II, ATC SCS120 Pro, Focal Sub12, Genelec 7370A SAM, Barefoot MicroSub45, Neumann KH 750 DSP.';
guide.description_es =
  'MEJOR guía de configuración de subwoofer de estudio 2026. Posiciona tu sub con el crawl, ajusta el cruce y alinea la fase. Subs de alta gama: Neumann KH 810 II, ATC SCS120 Pro, Focal Sub12, Genelec 7370A SAM, Barefoot MicroSub45 y Neumann KH 750 DSP.';

// ---------- 3. VERDICT / VERDICT_ES ----------
guide.verdict =
  'If your monitoring chain already has room correction, the Neumann KH 810 II is the biggest step up: about twice the output of the KH 750 DSP and multichannel bass management to 7.1.4. If you want an analogue reference and your room is big enough, the ATC SCS120 Pro is the one. The Focal Sub12 delivers the raw power for bass-heavy rooms, the Barefoot MicroSub45 is the distortion-free choice, and the Genelec 7370A SAM handles multichannel and immersive setups. The KH 750 DSP remains the smart compact pick.';
guide.verdict_es =
  'Si tu cadena de monitoreo ya tiene corrección de sala, el Neumann KH 810 II supone el mayor salto: aproximadamente el doble de salida que el KH 750 DSP y gestión de graves multicanal hasta 7.1.4. Si quieres una referencia analógica y tu sala es grande, el ATC SCS120 Pro es el indicado. El Focal Sub12 aporta la potencia bruta para salas con mucho grave, el Barefoot MicroSub45 es la opción sin distorsión y el Genelec 7370A SAM se encarga de los montajes multicanal e inmersivos. El KH 750 DSP sigue siendo la apuesta inteligente y compacta.';

// ---------- 4. CONCLUSION / CONCLUSION_ES ----------
guide.conclusion =
  '<p>Buy the Neumann KH 810 II when immersive formats and serious headroom are the brief, and the KH 750 DSP when MA 1 calibration should do the thinking. Choose the ATC SCS120 Pro for pure analogue power in large rooms, the Focal Sub12 when you need brutal bass dynamics for bass-heavy work, the Genelec 7370A SAM for smart multichannel and immersive rooms, and the Barefoot MicroSub45 for reference-level, distortion-free monitoring. Start with the crawl, then the crossover, then the phase — three steps separate a great sub from a great-sounding room.</p> <a href="/guides/studio-subwoofers.html" class="guide-link-btn">best studio subwoofers under $700</a> <a href="/guides/kh750-vs-7050c.html" class="guide-link-btn">KH 750 DSP vs Genelec 7050C</a> <a href="/guides/pro-monitors.html" class="guide-link-btn">pro monitor comparisons</a>';
guide.conclusion_es =
  '<p>Compra el Neumann KH 810 II si el proyecto pide formatos inmersivos y margen de sobra, y el KH 750 DSP si prefieres que la calibración MA 1 piense por ti. Elige el ATC SCS120 Pro para potencia puramente analógica en salas grandes, el Focal Sub12 cuando necesites una dinámica de graves brutal para trabajo con mucho bajo, el Genelec 7370A SAM para salas multicanal e inmersivas inteligentes, y el Barefoot MicroSub45 para un monitoreo de referencia sin distorsión. Empieza por el crawl, sigue con el cruce y termina con la fase: tres pasos separan un buen subwoofer de una sala que suena de verdad bien.</p> <a href="/guides/studio-subwoofers_es.html" class="guide-link-btn">mejores subwoofers de estudio por menos de $700</a> <a href="/guides/kh750-vs-7050c_es.html" class="guide-link-btn">KH 750 DSP vs Genelec 7050C</a> <a href="/guides/pro-monitors_es.html" class="guide-link-btn">comparativas de monitores pro</a>';

// ---------- 5. SECTION 7 (Crossover) - replace Dynaudio 9S example with Barefoot/Focal ----------
const sec7 = guide.sections.find((s) => s.heading === 'Crossover Frequency: Where to Set the Low-Pass Filter');
if (sec7) {
  sec7.content =
    '<p><strong>The crossover hands the low end from your monitors to the sub — and both need to be strong where they pass the baton.</strong> Set the sub\'s low-pass one small step above your monitor\'s low-frequency limit so the driver does the heavy lifting in its most linear region, typically 80 Hz for desktop mains and 80–100 Hz for small nearfields.</p><p><strong>Match it with a high-pass if you have one.</strong> Subs like the Focal Sub12 and the Barefoot MicroSub45 feed a high-passed output back to your satellites, so your mains stop reproducing the bass the sub already handles — less excursion, lower distortion, more headroom. If your sub has no high-pass, let the monitors run full range and let the sub\'s overlap do the work.</p><p><strong>Listen for the seam.</strong> On a full-range sweep the level should stay even across the crossover region. If the bass dips, lower the crossover or move the sub; if it bumps, blend with level, not with EQ.</p>';
  sec7.content_es =
    '<p><strong>El cruce entrega el grave de tus monitores al sub — y ambos deben sonar bien donde se cruzan.</strong> Ajusta el paso bajo del sub justo por encima del límite de graves de tus monitores, para que el driver haga el trabajo pesado en su región más lineal: normalmente 80 Hz para monitores principales de escritorio y 80–100 Hz para nearfields pequeños.</p><p><strong>Acompáñalo con un paso alto si dispones de uno.</strong> Subs como el Focal Sub12 y el Barefoot MicroSub45 devuelven a tus satélites una salida con paso alto, así tus monitores dejan de reproducir el grave que el sub ya maneja — menos excursión, menos distorsión, más margen. Si tu sub no tiene paso alto, deja los monitores a rango completo y deja que la superposición del sub haga el trabajo.</p><p><strong>Escucha la zona de unión.</strong> En un barrido de rango completo el nivel debe mantenerse uniforme a través de la región del cruce. Si el grave baja, reduce el cruce o mueve el sub; si sube, empareja con nivel, no con EQ.</p>';
}

// ---------- 5.5. VERDICT CON for KH 750 DSP - remove 7050C comparison ----------
const kh750 = guide.verdictProsCons.find((x) => x.name === 'Neumann KH 750 DSP');
if (kh750) {
  kh750.cons = kh750.cons.map((c) => (c === 'Costs more than the Genelec 7050C' ? 'Premium price for a compact, single-sub role' : c));
  kh750.cons_es = kh750.cons_es.map((c) => (c === 'Cuesta más que el Genelec 7050C' ? 'Precio premium para el rol de un sub compacto único' : c));
}

// ---------- 6. FEATURED SNIPPET - update FAQs that mention removed products ----------
const fs2 = guide.featuredSnippet;
if (fs2) {
  fs2.faq_a2_en =
    'Not always. The Neumann KH 750 DSP and KH 810 II calibrate with MA 1, and the Genelec 7370A SAM applies GLM AutoCal across the whole network. The ATC SCS120 Pro and Barefoot MicroSub45 take the analog path — placement, crossover and phase do all the work, which suits engineers who prefer measured rooms and manual control.';
  fs2.faq_a2_es =
    'No siempre. El Neumann KH 750 DSP y el KH 810 II se calibran con MA 1, y el Genelec 7370A SAM aplica GLM AutoCal en toda la red. El ATC SCS120 Pro y el Barefoot MicroSub45 toman el camino analógico — la colocación, el cruce y la fase hacen todo el trabajo, ideal para ingenieros que prefieren medir la sala y controlarlo a mano.';
  fs2.faq_a3_en =
    'Yes. Any sub accepts a line-level signal: the Focal Sub12, ATC SCS120 Pro and Barefoot MicroSub45 work with any brand\'s monitors using their crossovers and phase switches. The Neumann and Genelec smart subs give full system calibration only when paired with their own monitor ecosystems, but they still integrate with other brands.';
  fs2.faq_a3_es =
    'Sí. Cualquier sub acepta señal de línea: el Focal Sub12, el ATC SCS120 Pro y el Barefoot MicroSub45 funcionan con monitores de cualquier marca usando sus cruces e interruptores de fase. Los subs inteligentes de Neumann y Genelec solo dan la calibración completa de sistema emparejados con sus propios ecosistemas de monitores, pero igual se integran con otras marcas.';
}

fs.writeFileSync(guidesPath, JSON.stringify(guides, null, 2));
console.log('guides.json updated (remnant removal).');

// ---------- RE-CHECK stale references ----------
const full = JSON.stringify(guide);
console.log('\n--- STALE CHECK AFTER FIX ---');
['PMC 8 SUB', 'Dynaudio 9S', 'Genelec 7050C', 'PMC 8', 'Dynaudio', '7050C'].forEach((n) => {
  const count = full.split(n).length - 1;
  console.log('"' + n + '" occurrences:', count);
});
