const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const g = G.find(x => x.id === 'portable-interfaces');
g.sections.push({
  heading: 'Universal Audio Volt 276: A Closer Look',
  heading_es: 'Universal Audio Volt 276: análisis detallado',
  content: '<strong>The Volt 2 with a compressor riding shotgun.</strong> Same bus-powered portable body and Vintage 610 tube-emulation mode, plus a built-in 76-style FET compressor with three presets that tames peaks before they hit the converters. Ideal for mobile vocal sessions where no one wants to babysit levels.</p><p>The compressor is fixed-character — preset ratios only, no deep tweaking — and it adds size over the Volt 2. For creators recording alone on the move, tracking through gentle compression means fewer ruined takes and less fixing later.',
  content_es: '<strong>El Volt 2 con un compresor de copiloto.</strong> Mismo cuerpo portable alimentado por bus y modo Vintage 610 de emulación valvular, más compresor FET estilo 76 con tres presets que doma picos antes de los conversores. Ideal para sesiones vocales móviles donde nadie quiere vigilar niveles.</p><p>El compresor es de carácter fijo — solo presets de ratio, sin ajuste profundo — y suma tamaño sobre el Volt 2. Para creadores que graban solos en movimiento, pasar por compresión suave significa menos tomas arruinadas y menos retoques después.',
  products: [263]
}, {
  heading: 'Audient iD14 MkII: A Closer Look',
  heading_es: 'Audient iD14 MkII: análisis detallado',
  content: '<strong>Console-grade preamps in a backpack footprint.</strong> Two Class-A Audient console preamps with 58 dB of gain, JFET DI input and ADAT expandability for ten total inputs when sessions grow. ScrollControl turns the volume knob into a DAW controller, and dual headphone outputs cover artist plus engineer.</p><p>At 96 kHz maximum it concedes the numbers race to 192 kHz rivals, and bus power demands a solid USB port. For location recording where preamp quality decides the take, few portable boxes bring this much console DNA.',
  content_es: '<strong>Previos de consola en formato mochila.</strong> Dos previos Audient Clase A con 58 dB de ganancia, entrada DI JFET y expansión ADAT hasta diez entradas totales cuando las sesiones crecen. ScrollControl convierte el mando de volumen en controlador DAW, y la doble salida de auriculares cubre artista e ingeniero.</p><p>Con 96 kHz máximos cede la carrera de números ante rivales de 192 kHz, y la alimentación por bus pide un puerto USB sólido. Para grabación en exteriores donde el previo decide la toma, pocas cajas portables traen tanto ADN de consola.',
  products: [53]
});
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('added 2');