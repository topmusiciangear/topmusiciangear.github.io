const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const p=JSON.parse(fs.readFileSync(B+'data/products.json','utf8'));

const esFix = {
  51: "Micrófono dinámico cardioide fabricado en EE. UU. para escenarios y pantallas a todo volumen, soporta más de 140 dB sin distorsionar. Reproducción clara y contundente sin ecualizar, respuesta de 50 Hz a 16 kHz: la alternativa obrera al SM57 para guitarras pesadas.",
  72: "Combo de modelado de 50 W con 55 modelos de amplificador, Bluetooth y tres canales. El Katana 50 Gen 3 lleva el sonido de la serie Katana a dormitorios y ensayos pequeños, con la opción de añadir un pedal de expresión para wah y volumen.",
  76: "Combo de bajo de 500 W con altavoz de 15 pulgadas, tweeter y compresor integrado. El Rumble 500 V3 ofrece graves profundos y punch para ensayos y escenarios medianos, con salida XLR para la mesa.",
  110: "DAW completo de Ableton con todos los instrumentos, efectos y sonidos, además de Max for Live y 70 GB de biblioteca. La Suite es el paquete definitivo para producción, mezcla y actuación en directo.",
  112: "Edición Producer de FL Studio con piano roll, mezclador y plugins incluidos. Grabación de audio ilimitada, automatización y exportación a todos los formatos, sin suscripción.",
  128: "Caja de ritmos portátil con motores ACB de TR-606, 707, 808 y 909, más un motor FM. Seis pistas, secuenciador por pasos, efectos y batería interna para producir en cualquier lugar.",
  133: "Overdrive clásico de Boss con dos modos: el crunch cálido del Blues Driver y el boost limpio del modo Custom. Responde al ataque y al volumen de la guitarra, ideal para blues y rock.",
  144: "Groovebox de seis pistas con cuatro sintetizadores FM y dos pistas de samples. Secuenciador por pasos con parameter locks, efectos y batería recargable, perfecto para ritmos electrónicos.",
  153: "Altavoz activo de PA de 12 pulgadas con 1100 W pico y mezclador de dos canales. El TS412 ofrece sonido potente y claro para eventos medianos, con Bluetooth y app de control.",
  176: "Sintetizador analógico de ocho voces con secuenciador, arpegiador y memoria de presets. El Muse combina osciladores analógicos clásicos con modulación moderna y conectividad MIDI/USB.",
  186: "Bajo de cuatro cuerdas con cuerpo de fresno, mástil de arce y pastillas humbucker. El StingRay Special ofrece el sonido StingRay clásico con menos peso y un previo activo de 18 V.",
  188: "Estación de producción autónoma con 16 pads RGB, pantalla táctil de 7 pulgadas y motor MPC. Graba, secuencia y mezcla sin ordenador, con sampling y efectos integrados.",
  205: "Procesador multiefectos y looper para guitarra con pantalla táctil, amp modeling, looper de 20 minutos y conectividad Bluetooth/USB. Ideal para práctica y directo.",
  216: "Altavoz activo de PA de 12 pulgadas con 1500 W pico, DSP y app de control. El NX 912-SMA ofrece sonido profesional para instalaciones y eventos en directo.",
  218: "Altavoz activo de PA de 12 pulgadas con 1000 W pico, mezclador de dos canales y DSP. El MON 12 A G3 es una opción económica y fiable para sonido en vivo.",
  243: "Controlador de streaming con 8 botones LCD personalizables, perillas táctiles y pantalla táctil. El Stream Deck+ permite controlar apps, mezclas y automatizaciones con un toque.",
  250: "Sistema de micrófono inalámbrico de dos canales con transmisores compactos, receptor de cámara y estuche de carga. El Rode Wireless PRO ofrece audio de 32 bits, timecode y alcance de 260 m.",
  254: "Micrófono inalámbrico ultracompacto con dos transmisores, receptor y estuche de carga. El DJI Mic Mini 2 ofrece audio de 24 bits, alcance de 250 m y hasta 11 horas de autonomía.",
  262: "Interfaz de audio USB de 2 entradas y 2 salidas con previos de calidad, loopback y software incluido. El EVO 4 es ideal para podcasting, streaming y grabación casera.",
  270: "Guitarra eléctrica inteligente con cuerpo de carbono, pastillas y conectividad Bluetooth. El Donner HUSH-I EVO2 ofrece práctica silenciosa y grabación directa sin amplificador.",
  284: "Micrófono USB cardioide con brazo de mesa, filtro antipop y soporte. El Maono PM461 ofrece sonido claro para podcasting, streaming y grabación casera a un precio accesible.",
  295: "Guitarra eléctrica inteligente con cuerpo de carbono, pastillas y conectividad Bluetooth. La Enya Nova Go Sonic ofrece práctica silenciosa, efectos y grabación directa.",
  296: "Guitarra inteligente con cuerpo de carbono, pastillas y conectividad Bluetooth. La Lava ME 4 ofrece práctica silenciosa, efectos y grabación directa con app integrada.",
  329: "Micrófono dinámico cardioide para broadcast y podcast, con respuesta de 75 Hz a 18 kHz y filtro antipop integrado. El Procaster ofrece sonido cálido y profesional a un precio accesible.",
  331: "Monitor de estudio de 3 vías coaxial con DSP SAM, tweeter y midrange coaxiales y woofer de 8 pulgadas. El 8351B ofrece imagen estéreo precisa y respuesta lineal en salas tratadas.",
  371: "Monitor de estudio de 5 pulgadas con DSP, puerto frontal, LCD trasera con 25 combinaciones Boundary/EQ y tres modos (Mix, Focus, Create). Woofer de Kevlar, 55W en Clase-D, hecho para pegarlo a la pared.",
  466: "Guitarra eléctrica de cuerpo de caoba con pastillas humbucker y mástil de arce. La Jet JS-300 ofrece sustain y tono cálido a un precio accesible, ideal para rock y metal.",
  474: "Plugin de referencia para comparar tu mezcla con pistas comerciales. REFERENCE 3 analiza niveles, dinámica y espectro, y aplica corrección para que tu mezcla compita con los estándares del sector.",
  489: "Amplificador de práctica de 10 W con altavoz de 4 pulgadas, efectos y conectividad Bluetooth. El Spark MINI es un ampli portátil para practicar y grabar en cualquier lugar.",
  511: "Sistema de intercom inalámbrico de 4 canales con auriculares y base. El SOLIDCOM SE PRO ofrece comunicación clara en sets y escenarios, con alcance de 300 m y batería recargable.",
  550: "Interfaz de audio USB de 18 entradas y 20 salidas con 8 previos Midas, 24-bit/192kHz y MIDI. El UMC1820 es ideal para grabar baterías y grupos completos.",
  602: "Auriculares abiertos de estudio con drivers STELLAR.45 de 48 ohmios que suenan alto y limpio desde cualquier laptop, tablet o interfaz, sin amplificador. Sonido detallado y espacioso, cables mini-XLR desmontables y almohadillas de velour.",
  632: "El monitor de referencia de 5 pulgadas estándar de la industria, con un rango medio brutalmente honesto que hace que tus mezclas se traduzcan en todas partes. Bi-amplificado a 70 W, con controles Room Control y HIGH TRIM para domar los graves cerca de la pared.",
  636: "El SM57 más caliente y cerrado: el imán de neodimio entrega unos 5 dB más de señal para que las interfaces económicas no siseen. Aislamiento supercardioide más calidez y agudos extendidos para tonos de ampli cortantes.",
  679: "Interfaz USB 2-in/5-out pensada para guitarra con Hi-Z de triple topología (JFET/PURE/ACTIVE), impedancia Z-TONE, afinador a bordo y Amp Out sin ruido. Incluye 2 previos con phantom, MIDI, 24-bit/192kHz, AmpliTube 5 SE y TONEX SE.",
  684: "Monitor de estudio de 5,25 pulgadas con woofer de compuesto trenzado y cúpula de seda ultraligera de 1 pulgada, sobre 80 W en Clase AB bi-amplificados. La guía de ondas EBM ofrece 120 grados horizontales y solo 60 verticales, para que las reflexiones del escritorio desaparezcan, y el puerto frontal llega a 48 Hz.",
  1051: "Bajo inicial con cuerpo de agathis, mástil de arce y diapasón de palisandro, 22 trastes, ecualizador PHAT-II y pastillas Dynamix PJ. Un bajo inicial excelente, con tono versátil para rock y metal."
};

const products=JSON.parse(fs.readFileSync(B+'data/products.json','utf8'));
let changed=0;
for(const pr of products){
  if(esFix[pr.id]){
    pr.desc_es=esFix[pr.id];
    changed++;
  }
}
fs.writeFileSync(B+'data/products.json', JSON.stringify(products,null,2),'utf8');
console.log('products updated:', changed);