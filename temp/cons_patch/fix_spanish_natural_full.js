var fs=require('fs');
var P='data/guides.json';
var A=JSON.parse(fs.readFileSync(P,'utf8'));
var g=A.find(x=>x.id==='premium-interfaces');

// Helper to ensure natural phrasing
// Fix section headings: lower case "mejor"
g.sections.forEach(s=>{
  if(s.h_es){
    s.h_es=s.h_es.replace(/Mejor/g,'mejor').replace(/Mejor/g,'mejor');
    // Fix the specific awkward heading
    s.h_es=s.h_es.replace('¿Es la Neumann MT 48 la mejor interfaz premium de sobremesa para audio en red?','¿Merece la pena la Neumann MT 48 si buscas una interfaz premium de sobremesa con audio en red?');
    s.h_es=s.h_es.replace('¿Es la Audient ORIA el mejor controlador inmersivo para Dolby Atmos?','¿Es la Audient ORIA el controlador ideal para mezclar en Dolby Atmos?');
    s.h_es=s.h_es.replace('¿Es la Universal Audio Apollo x8p Gen 2 la mejor interfaz para grabar con UAD?','¿Es la Apollo x8p Gen 2 la mejor opción para grabar con el ecosistema UAD?');
    s.h_es=s.h_es.replace('¿Es la RME Fireface UFX III la interfaz más fiable para giras?','¿Es la RME Fireface UFX III la interfaz más fiable para salir de gira?');
    s.h_es=s.h_es.replace('¿Es la Apogee Symphony I\/O Mk II 16×16 SE la mejor interfaz modular para estudios que crecen?','¿Es la Apogee Symphony I/O Mk II 16×16 SE la mejor base modular si tu estudio no para de crecer?');
    s.h_es=s.h_es.replace('¿Es la Lynx Aurora-n 16 \(USB\) el mejor conversor para mastering transparente?','¿Es la Lynx Aurora-n 16 (USB) el conversor más transparente para mastering?');
  }
});

// Fix section contents natural
// Section 1 Neumann
let s1=g.sections.find(s=>s.products&&s.products.includes(512));
if(s1){
  s1.content_es='<p><strong>La Neumann MT 48 (U) es la única interfaz de sobremesa que reúne controlador de monitores con pantalla táctil y audio en red AES67/Dante en el mismo chasis.</strong> Dos previos Neumann de hasta 78 dB con conversión de 136 dB-A, cuatro salidas de monitor, dos salidas de auriculares de impedancia ultrabaja con crossfeed y DSP de Merging (EQ de 4 bandas + dinámica + reverb) te permiten grabar, crear mezclas de cue y monitorizar sin abrir otra aplicación. Suma ADAT/S/PDIF, MIDI/GPIO y Monitor Mission (hasta 22.2, 32×16 por USB y 128 fuentes AoIP) y podrás llevar la misma unidad de la cabina vocal a una sala pequeña o a una grabación en exteriores sin recablear. Su límite son dos previos: si necesitas ocho micros a la vez, tendrás que añadir previos externos.</p>';
}

// Section 3 Apollo - fix "cuando vives en UAD" and "Pide Thunderbolt"
let s3=g.sections.find(s=>s.products&&s.products.includes(513));
if(s3){
  s3.content_es='<p><strong>La Apollo x8p Gen 2 es la elegida para grabar si trabajas dentro del ecosistema UAD.</strong> 16×22 E/S, ocho previos Unison que adaptan impedancia y ganancia para sonar como Neve/API/Manley, HEXA Core (6 SHARC) para plugins en tiempo real por debajo de 2 ms, conversión de 130 dB D/A con reloj Dual-Crystal y corrección de monitores de Sonarworks integrada en el propio DSP. Sus conexiones DB25, ADAT/S/PDIF y el surround 7.1 con gestión de graves, junto al Auto-Gain y las escenas de plugins en Console, hacen que grabar una batería o una banda completa sea fluido. Requiere Thunderbolt 3 y los mejores plugins UAD se venden aparte, así que tenlo en cuenta al calcular el presupuesto.</p>';
}

// Fix productTable natural
g.productTable.rows.forEach(r=>{
  r.values.forEach(v=>{
    if(!v.value_es) return;
    v.value_es=v.value_es.replace('Grabación de conjunto con 8 previos Unison y DSP HEXA Core','Grabación de banda completa con 8 previos Unison y DSP HEXA Core');
    v.value_es=v.value_es.replace('Thunderbolt/USB-C \\(imprescindible para el DSP\\)','Thunderbolt/USB-C (necesario para el DSP)');
  });
});

// Fix verdict natural
g.verdict_es='¿Buscas el color analógico de UAD al grabar? Apollo x8p Gen 2. ¿Necesitas un controlador de sobremesa con audio en red? Neumann MT 48. ¿Quieres mezclar en Atmos sin añadir otro controlador? Audient ORIA. ¿Dependes de MADI y de una grabación DURec que no puede fallar? RME UFX III. ¿Una conversión modular de referencia para una sala que vive alquilada? Apogee Symphony Mk II. ¿Transparencia absoluta para mastering durante años? Lynx Aurora-n 16. En la mayoría de estudios profesionales, lo más sensato es usar UAD o RME como núcleo de grabación y dejar la conversión y la monitorización en manos de Lynx, Apogee o Neumann: elige según el trabajo, no según el logo.';

// Fix conclusion natural
g.conclusion_es='<p>Las seis se han ganado un hueco fijo en el rack; la cuestión es para qué la necesitas tú. La Neumann MT 48 (U) es imbatible en sobremesa cuando necesitas audio en red y un controlador de monitores serio al alcance de la mano. La Audient ORIA brilla en inmersivo si tu sala ya está pensada para Atmos desde el primer día. La Apollo x8p Gen 2 es la compañera ideal si grabas dentro del universo Unison de UAD. La RME Fireface UFX III es tu seguro cuando sales de gira, tiras de MADI en remoto o no te puedes permitir ni un cuelgue. La Apogee Symphony I/O Mk II encaja en el estudio modular que crece de 16 a 32 canales. Y la Lynx Aurora-n 16 es la referencia cuando prima la transparencia más absoluta para mastering.</p><p>Piensa en tu cuello de botella: ¿previos y DSP? Apollo. ¿Estabilidad y ruteo? RME. ¿Red y pantalla táctil? Neumann. ¿Atmos? ORIA. ¿Crecimiento por módulos? Apogee. ¿Conversión pura? Lynx.</p><p><a href="/guides/best-interface_es.html" class="guide-link-btn">Mejor Interfaz para Grabación Casera</a> <a href="/guides/portable-interfaces_es.html" class="guide-link-btn">Mejores Interfaces Portátiles</a> <a href="/guides/budget-interfaces_es.html" class="guide-link-btn">Mejores Interfaces por Menos de 300 $</a></p>';

// Fix FAQ natural - the complained one and others
let f0=g.faq.find(f=>f.q.includes('UAD plugin ecosystem'));
if(f0){
  f0.q_es='Voy a renovar la interfaz principal del estudio: ¿apuesto por el ecosistema UAD o por la fiabilidad legendaria de RME?';
  f0.a_es='Si tu día a día gira en torno a los plugins UAD, Apollo es la elección natural; si lo que más valoras es una estabilidad a toda prueba, con drivers blindados y la posibilidad de grabar sin ordenador durante años, el Fireface te dará más tranquilidad.';
}
let f1=g.faq.find(f=>f.q.includes('Which pro interface wins'));
if(f1){
  f1.q_es='Apollo x8p Gen 2 frente a Fireface UFX III: ¿cuál me conviene más?';
  f1.a_es='La Apollo x8p Gen 2 destaca por su integración con el ecosistema UAD y la emulación Unison (167 dB de rango dinámico). La Fireface UFX III lo hace por su estabilidad ejemplar, el ruteo TotalMix y la grabación autónoma DURec con MADI de 188 canales.';
}
// FAQ about Thunderbolt - make more conversational
let f4=g.faq.find(f=>f.q.includes('Thunderbolt'));
if(f4){
  f4.q_es='¿Necesito Thunderbolt o me basta con USB para una interfaz profesional?';
  f4.a_es='En la mayoría de sesiones, con USB vas más que bien. Interfaces actuales como la Fireface UFX III ofrecen latencia mínima y E/S multicanal estable tanto por USB como por Thunderbolt. Thunderbolt solo marca la diferencia cuando necesitas muchos canales con búferes muy pequeños en macOS y tiras del DSP de la gama Apollo. Para grabar una banda de menos de 16 canales, USB lo resuelve sin problemas.';
}
// Also fix featuredSnippet FAQ
if(g.featuredSnippet && g.featuredSnippet.faq_q1_es){
  g.featuredSnippet.faq_q1_es='Voy a renovar la interfaz principal: ¿apuesto por UAD o por la fiabilidad de RME?';
  g.featuredSnippet.faq_a1_es='Si trabajas a diario con plugins UAD, Apollo; si buscas unos drivers blindados y grabación autónoma que aguante años sin fallar, el Fireface es la apuesta segura.';
}

fs.writeFileSync(P, JSON.stringify(A,null,2),'utf8');
console.log('done natural pass');
