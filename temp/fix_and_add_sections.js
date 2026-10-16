const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// Fix duplicate brand in titles
products.forEach(p => {
  if (p.title.startsWith(p.brand + ' ' + p.brand)) {
    p.title = p.title.replace(p.brand + ' ' + p.brand, p.brand);
  }
});
products.sort((a, b) => a.id - b.id);
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Fixed duplicate brands in titles');

// Add product sections to mixing-plugins guide
const mixingGuide = guides.find(g => g.id === 'mixing-plugins');
if (mixingGuide) {
  const newSections = [
    {
      heading: 'SSL Mastering Bundle: The Console Glue That Defines Commercial Sound',
      heading_es: 'SSL Mastering Bundle: El Pegamento de Consola Que Define el Sonido Comercial',
      content: '<p>The SSL Mastering Bundle brings two legendary Solid State Logic processors to your DAW: the SSL Bus Compressor and the SSL Fusion Stereo Enhancer. The Bus Compressor is the most famous mix bus compressor in history — it is the "glue" that holds together thousands of hit records. It adds punch, cohesion, and a subtle analog warmth that makes mixes sound finished and commercial.</p><p>The SSL Fusion Stereo Enhancer adds width, depth, and presence without phase issues. Together, these two processors give you the sound of a million-dollar SSL console without the hardware. For mastering engineers and mixers who want the definitive analog finish, this bundle is the industry standard.</p>',
      content_es: '<p>El SSL Mastering Bundle trae dos procesadores legendarios de Solid State Logic a tu DAW: el SSL Bus Compressor y el SSL Fusion Stereo Enhancer. El Bus Compressor es el compresor de bus de mezcla más famoso de la historia — es el "pegamento" que mantiene unidos miles de discos exitosos. Añade pegamento, cohesión y un sutil calor analógico que hace que las mezclas suenen terminadas y comerciales.</p><p>El SSL Fusion Stereo Enhancer añade anchura, profundidad y presencia sin problemas de fase. Juntos, estos dos procesadores te dan el sonido de una consola SSL de millones de dólares sin el hardware. Para ingenieros de mastering y mezcladores que quieren el acabado analógico definitivo, este bundle es el estándar de la industria.</p>',
      pros: ['Legendary SSL Bus Compressor: the most famous mix bus compressor', 'SSL Fusion Stereo Enhancer: width, depth, and presence', 'Official SSL analog console sound in your DAW', 'Industry standard for commercial mastering'],
      pros_es: ['Legendario SSL Bus Compressor: el compresor de bus de mezcla más famoso', 'SSL Fusion Stereo Enhancer: anchura, profundidad y presencia', 'Sonido oficial de consola analógica SSL en tu DAW', 'Estándar de la industria para mastering comercial'],
      cons: ['Premium price point', 'Only two processors: not a full mastering chain', 'Bus compressor can be subtle on some material', 'Requires understanding of analog compression'],
      cons_es: ['Precio premium', 'Solo dos procesadores: no es una cadena de mastering completa', 'El compresor de bus puede ser sutil en algunos materiales', 'Requiere comprensión de la compresión analógica']
    },
    {
      heading: 'NUGEN Audio ISL 2st: The True-Peak Limiter for Broadcast and Streaming',
      heading_es: 'NUGEN Audio ISL 2st: El Limitador de Picos Verdaderos para Broadcast y Streaming',
      content: '<p>The ISL 2st is a true-peak limiter designed for broadcast, streaming, and any application where inter-sample peaks matter. Unlike basic limiters that only look at sample peaks, ISL 2st detects and controls the peaks that occur between samples — the ones that cause distortion on consumer playback devices and streaming encoders.</p><p>The result is clean, transparent loudness without the distortion that plagues lesser limiters. For engineers who need to deliver masters that sound good on every device from earbuds to stadium speakers, ISL 2st is the surgical tool for the job.</p>',
      content_es: '<p>El ISL 2st es un limitador de picos verdaderos diseñado para broadcast, streaming y cualquier aplicación donde los picos entre muestras importan. A diferencia de los limitadores básicos que solo miran los picos de muestra, ISL 2st detecta y controla los picos que ocurren entre muestras — los que causan distorsión en dispositivos de reproducción de consumo y codificadores de streaming.</p><p>El resultado es una loudness limpia y transparente sin la distorsión que plaga a los limitadores menores. Para ingenieros que necesitan entregar masters que suenen bien en cada dispositivo desde auriculares hasta altavoces de estadio, ISL 2st es la herramienta quirúrgica para el trabajo.</p>',
      pros: ['True-peak detection: controls inter-sample peaks', 'Clean, transparent loudness without distortion', 'Designed for broadcast and streaming delivery', 'Surgical precision for mastering'],
      pros_es: ['Detección de picos verdaderos: controla picos entre muestras', 'Loudness limpia y transparente sin distorsión', 'Diseñado para entrega de broadcast y streaming', 'Precisión quirúrgica para mastering'],
      cons: ['Specialized tool: not for creative limiting', 'Less character than analog-modeled limiters', 'Requires understanding of true-peak metering', 'Overkill for simple projects'],
      cons_es: ['Herramienta especializada: no para limitación creativa', 'Menos carácter que limitadores modelados analógicamente', 'Requiere comprensión de la medición de picos verdaderos', 'Excesivo para proyectos simples']
    }
  ];

  // Add sections before the verdict
  if (mixingGuide.sections && mixingGuide.sections.length > 0) {
    const insertIdx = mixingGuide.sections.length;
    newSections.forEach((s, i) => {
      mixingGuide.sections.splice(insertIdx + i, 0, s);
    });
  }

  // Add verdicts
  if (!mixingGuide.verdictProsCons) mixingGuide.verdictProsCons = [];
  mixingGuide.verdictProsCons.push(
    {
      pros: ['Legendary SSL Bus Compressor', 'SSL Fusion Stereo Enhancer', 'Official SSL console sound', 'Industry standard for commercial mastering'],
      pros_es: ['Legendario SSL Bus Compressor', 'SSL Fusion Stereo Enhancer', 'Sonido oficial de consola SSL', 'Estándar de la industria para mastering comercial'],
      cons: ['Premium price', 'Only two processors', 'Subtle on some material', 'Requires analog compression knowledge'],
      cons_es: ['Precio premium', 'Solo dos procesadores', 'Sutil en algunos materiales', 'Requiere conocimiento de compresión analógica']
    },
    {
      pros: ['True-peak detection', 'Clean transparent loudness', 'Broadcast and streaming ready', 'Surgical precision'],
      pros_es: ['Detección de picos verdaderos', 'Loudness limpia y transparente', 'Listo para broadcast y streaming', 'Precisión quirúrgica'],
      cons: ['Specialized: not creative', 'Less character than analog modelers', 'Requires true-peak knowledge', 'Overkill for simple projects'],
      cons_es: ['Especializado: no creativo', 'Menos carácter que modeladores analógicos', 'Requiere conocimiento de picos verdaderos', 'Excesivo para proyectos simples']
    }
  );

  // Add to featuredProducts
  if (!mixingGuide.featuredProducts) mixingGuide.featuredProducts = [];
  mixingGuide.featuredProducts.push(1037, 1038);

  console.log('Added 2 product sections to mixing-plugins');
}

// Add product section to vocal-plugins guide
const vocalGuide = guides.find(g => g.id === 'vocal-plugins');
if (vocalGuide) {
  const newSection = {
    heading: 'RePitch 2 + VocAlign Pro Bundle: The Complete Vocal Production Powerhouse',
    heading_es: 'RePitch 2 + VocAlign Pro Bundle: El Poder Completo de Producción Vocal',
    content: '<p>The RePitch 2 Standard + VocAlign 7 Pro Bundle combines two essential vocal production tools. RePitch 2 provides natural-sounding pitch correction that goes beyond Auto-Tune — it edits pitch, timing, and formants with surgical precision. VocAlign 7 Pro aligns doubles, harmonies, and ad-libs to your lead vocal in seconds, saving hours of manual editing.</p><p>For producers who stack vocals — pop, trap, R&B, and urban music — this bundle is the complete solution. RePitch 2 handles the tuning, VocAlign handles the timing, and together they deliver tight, natural-sounding vocal stacks that would take hours to edit manually.</p>',
    content_es: '<p>El RePitch 2 Standard + VocAlign 7 Pro Bundle combina dos herramientas esenciales de producción vocal. RePitch 2 proporciona corrección de tono de sonido natural que va más allá de Auto-Tune — edita tono, timing y formantes con precisión quirúrgica. VocAlign 7 Pro alinea dobles, armonías y ad-libs a tu voz principal en segundos, ahorrando horas de edición manual.</p><p>Para productores que apilan voces — pop, trap, R&B y música urbana — este bundle es la solución completa. RePitch 2 maneja la afinación, VocAlign maneja el timing, y juntos entregan stacks vocales ajustados y naturales que tomarían horas editar manualmente.</p>',
    pros: ['Complete vocal production: pitch + timing in one bundle', 'RePitch 2: natural pitch correction beyond Auto-Tune', 'VocAlign 7 Pro: align doubles and harmonies in seconds', 'Essential for pop, trap, and urban vocal production'],
    pros_es: ['Producción vocal completa: tono + timing en un bundle', 'RePitch 2: corrección de tono natural más allá de Auto-Tune', 'VocAlign 7 Pro: alinea dobles y armonías en segundos', 'Esencial para producción vocal pop, trap y urbana'],
    cons: ['Bundle price is significant', 'RePitch 2 has a learning curve', 'VocAlign requires clean guide tracks', 'Overkill for simple vocal arrangements'],
    cons_es: ['El precio del bundle es significativo', 'RePitch 2 tiene curva de aprendizaje', 'VocAlign requiere pistas guía limpias', 'Excesivo para arreglos vocales simples']
  };

  if (vocalGuide.sections && vocalGuide.sections.length > 0) {
    vocalGuide.sections.push(newSection);
  }

  if (!vocalGuide.verdictProsCons) vocalGuide.verdictProsCons = [];
  vocalGuide.verdictProsCons.push({
    pros: ['Complete vocal production bundle', 'RePitch 2: natural pitch correction', 'VocAlign 7 Pro: instant alignment', 'Essential for stacked vocals'],
    pros_es: ['Bundle de producción vocal completo', 'RePitch 2: corrección de tono natural', 'VocAlign 7 Pro: alineación instantánea', 'Esencial para voces apiladas'],
    cons: ['Significant bundle price', 'RePitch 2 learning curve', 'VocAlign needs clean guides', 'Overkill for simple arrangements'],
    cons_es: ['Precio del bundle significativo', 'Curva de aprendizaje de RePitch 2', 'VocAlign necesita guías limpias', 'Excesivo para arreglos simples']
  });

  if (!vocalGuide.featuredProducts) vocalGuide.featuredProducts = [];
  vocalGuide.featuredProducts.push(1039);

  console.log('Added 1 product section to vocal-plugins');
}

guides.sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Total guides: ' + guides.length);
