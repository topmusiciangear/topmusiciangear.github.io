const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-plugins');

const fixes = {
  62: {
    heading: 'FabFilter Pro-Q 4: The Definitive EQ',
    heading_es: 'FabFilter Pro-Q 4: El ecualizador definitivo',
    content: '<p><strong>The most advanced equalizer in the world — and the one you will open on every mix.</strong> Pro-Q 4 pairs up to 24 bands of surgical parametric EQ with spectral dynamics that turn problem resonances into musical opportunities instead of just cutting them. EQ Sketch lets you draw curves freehand, vintage saturation modes add analog weight when a track sounds too clean, and full Dolby Atmos support up to 9.1.6 keeps it relevant as mixes go immersive.</p><p><strong>The honest trade-off is depth versus speed.</strong> The interface stays fluid and the spectrum analyzer is the clearest in the business, but spectral dynamics take disciplined listening to master — beginners will fix things faster with a simpler EQ before graduating here. If you want one equalizer that never leaves your template, this is it.</p>',
    content_es: '<p><strong>El ecualizador más avanzado del mundo — y el que acabarás abriendo en cada mezcla.</strong> Pro-Q 4 combina hasta 24 bandas de ecualización quirúrgica con dinámica espectral que convierte las resonancias problemáticas en oportunidades musicales en lugar de limitarse a recortarlas. EQ Sketch permite dibujar curvas a mano alzada, los modos de saturación vintage aportan peso analógico cuando una pista suena demasiado limpia y el soporte completo de Dolby Atmos hasta 9.1.6 lo mantiene vigente ahora que las mezclas se vuelven inmersivas.</p><p><strong>La contrapartida honesta es profundidad frente a inmediatez.</strong> La interfaz sigue siendo fluida y su analizador de espectro es el más claro del mercado, pero la dinámica espectral exige un oído disciplinado para dominarla — al principio resolverás más rápido con un EQ sencillo antes de dar el salto aquí. Si buscas un único ecualizador que no salga nunca de tu plantilla, es este.</p>'
  },
  63: {
    heading: 'FabFilter Pro-C 3: The Definitive Compressor',
    heading_es: 'FabFilter Pro-C 3: El compresor definitivo',
    content: '<p><strong>Fourteen compression styles in one elegant box — from invisible mastering glue to aggressive pumping.</strong> Pro-C 3 covers opto warmth, VCA punch, FET bite and modern transparent leveling, with Character modes adding analog saturation when a track needs color. The advanced sidechain EQ with dynamic triggering tames harshness only when it appears, and Dolby Atmos support keeps it ready for immersive delivery.</p><p><strong>The catch is choice overload.</strong> With fourteen styles plus lookahead, knee, and channel linking options, newcomers can spend sessions auditioning instead of committing — pick one style per job and learn it deeply. For engineers who want a single compressor that handles vocals, buses and masters without compromise, nothing else covers this much ground.</p>',
    content_es: '<p><strong>Catorce estilos de compresión en una sola caja elegante — desde pegamento transparente de masterización hasta bombeo agresivo.</strong> Pro-C 3 cubre calidez opto, pegada VCA, mordiente FET y nivelación moderna transparente, con modos Character que añaden saturación analógica cuando la pista pide color. Su ecualizador de sidechain avanzado con disparo dinámico doma la aspereza solo cuando aparece, y el soporte de Dolby Atmos lo deja listo para entregas inmersivas.</p><p><strong>La pega es el exceso de opciones.</strong> Con catorce estilos más lookahead, knee y enlazado de canales, es fácil pasarse sesiones probando en lugar de decidir — elige un estilo por tarea y domínalo a fondo. Para quien quiera un único compresor que resuelva voces, buses y masters sin concesiones, nada más cubre tanto terreno.</p>'
  },
  32: {
    heading: 'Soundtoys 5.5 Bundle: 23 Iconic Effects',
    heading_es: 'Soundtoys 5.5 Bundle: 23 efectos icónicos',
    content: '<p><strong>Twenty-three effects that defined modern record color — Decapitator, EchoBoy, Little AlterBoy, SuperPlate, SpaceBlender and the Effect Rack that chains them.</strong> Where FabFilter gives you surgical precision, Soundtoys gives you character: saturation that growls, delays that wobble, pitch shifting that turns vocals into instruments. It is the creative producer toolkit — the bundle you reach for when a track sounds correct but boring.</p><p><strong>The trade-off is focus.</strong> This is a color and movement collection, not a mixing foundation: there is no EQ, no compressor, no limiter here, and the vintage-styled interfaces prize vibe over visual feedback. Pair it with a clean EQ/comp bundle and you cover both halves of production — precision and personality.</p>',
    content_es: '<p><strong>Veintitrés efectos que definieron el color de los discos modernos — Decapitator, EchoBoy, Little AlterBoy, SuperPlate, SpaceBlender y el Effect Rack que los encadena.</strong> Donde FabFilter te da precisión quirúrgica, Soundtoys te da carácter: saturación que ruge, delays que se tambalean, pitch shifting que convierte voces en instrumentos. Es la caja de herramientas del productor creativo — el paquete al que recurres cuando una pista suena correcta pero aburrida.</p><p><strong>La contrapartida es el enfoque.</strong> Es una colección de color y movimiento, no una base de mezcla: aquí no hay EQ, ni compresor, ni limitador, y sus interfaces de estética vintage premian la vibra sobre la información visual. Combínalo con un paquete limpio de EQ y compresión y cubres las dos mitades de la producción — precisión y personalidad.</p>'
  },
  121: {
    heading: 'UAD Ultimate 14: 100+ Hardware Emulations',
    heading_es: 'UAD Ultimate 14: Más de 100 emulaciones de hardware',
    content: '<p><strong>The complete UAD collection — over one hundred faithful emulations of vintage analog hardware running on dedicated UAD DSP with near-zero latency.</strong> Neve preamps, API and SSL buses, Manley vari-mu glue, Ampex and Studer tape: the signal chains behind classic records, inside your DAW, tracking through them in real time the way engineers tracked through the hardware.</p><p><strong>The price of admission is the ecosystem.</strong> These plug-ins require UAD DSP hardware — a Satellite or UA interface — so there is a hardware buy-in on top of the software, and the bundle price sits at flagship level. For engineers chasing authentic analog behavior at tracking speed with no native CPU load, it remains the reference.</p>',
    content_es: '<p><strong>La colección completa de UAD — más de cien emulaciones fieles de hardware analógico clásico corriendo en DSP dedicado con latencia casi nula.</strong> Previos Neve, buses API y SSL, pegamento vari-mu de Manley, cintas Ampex y Studer: las cadenas de señal de los discos clásicos, dentro de tu DAW, grabando a través de ellas en tiempo real como se hacía con el hardware.</p><p><strong>El peaje es el ecosistema.</strong> Estos plug-ins exigen hardware DSP de UAD — un Satellite o una interfaz UA — así que hay una inversión en hardware además del software, y el precio del paquete está en terreno insignia. Para quien busque comportamiento analógico auténtico a velocidad de grabación y sin cargar la CPU, sigue siendo la referencia.</p>'
  }
};

guide.sections.forEach(s => {
  const pid = s.products && s.products[0];
  const fix = fixes[pid];
  if (!fix) return;
  s.heading = fix.heading;
  s.heading_es = fix.heading_es;
  s.content = fix.content;
  s.content_es = fix.content_es;
  console.log('Expanded:', fix.heading, '| EN:', fix.content.length, '| ES:', fix.content_es.length);
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done.');
