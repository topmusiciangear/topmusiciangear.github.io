const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/add_faqs.js';
let s = fs.readFileSync(f, 'utf8');

// 1. j48-vs-rndi pasa de 2 a 4 FAQs: anadir Q3 y Q4
const anchor = `      'Solo para la etapa de salida, y es un trabajo pequeño. Un bajo activo ya tiene salida a nivel de línea, así que lo que la DI hace en realidad es convertir una salida de instrumento no balanceada en una entrada balanceada a nivel de micrófono, añadir una elevación de masa para eliminar bucles de zumbido y dejar que un cable largo llegue a la mesa sin captar ruido. Aun así compensa: de un tirón de 30 metros sin balancear viene el zumbido. La alternativa radical es una DI pasiva, que no necesita alimentación y cuesta menos, pero solo funciona con un instrumento pasivo.']
  ],`;
if (!s.includes(anchor)) { console.log('!! no encuentro el bloque de j48-vs-rndi'); process.exit(1); }
const replacement = `      'Solo para la etapa de salida, y es un trabajo pequeño. Un bajo activo ya tiene salida a nivel de línea, así que lo que la DI hace en realidad es convertir una salida de instrumento no balanceada en una entrada balanceada a nivel de micrófono, añadir una elevación de masa para eliminar bucles de zumbido y dejar que un cable largo llegue a la mesa sin captar ruido. Aun así compensa: de un tirón de 30 metros sin balancear viene el zumbido. La alternativa radical es una DI pasiva, que no necesita alimentación y cuesta menos, pero solo funciona con un instrumento pasivo.'],
    ['Is a passive DI ever the better choice for bass?',
      '¿Puede ser mejor una DI pasiva para bajo?',
      'Sometimes, and it is the cheaper answer more often than engineers admit. A passive DI has no electronics between the instrument and the transformer, so there is nothing to fail and nothing to colour the signal — the only components are the transformer itself and a couple of resistors. For a passive bass, a passive DI is the most transparent option there is. It stops working the moment you need gain: an active DI takes the small instrument-level signal and boosts it to microphone level, which is what lets you use a decent passive bass straight into a small console.',
      'A veces, y es la respuesta barata más de lo que los ingenieros reconocen. Una DI pasiva no tiene electrónica entre el instrumento y el transformador, así que no hay nada que falle ni que coloree la señal: los únicos componentes son el propio transformador y un par de resistencias. Para un bajo pasivo, una DI pasiva es la opción más transparente que existe. Deja de funcionar en cuanto necesitas ganancia: una DI activa toma la pequeña señal a nivel de instrumento y la sube a nivel de micrófono, que es lo que permite conectar un bajo pasivo decente directamente a una consola pequeña.'],
    ['Do I need two DIs for a stereo or DI’d rig?',
      '¿Necesito dos DIs para un rig estéreo o con DI?',
      'One per signal, and a lot of people under-buy here. A DI is a single-channel device by design, because it converts one balanced instrument run — so an amp, an acoustic guitar and a keyboard are three DIs, not one. The exception is a stereo pedal or a DI box made specifically for stereo, which exists and costs more. The J48 and the RNDI both have a second, fully buffered pass-through output, which is not a second channel: it is there so you can split to a tuner and an amp without daisy-chaining.',
      'Uno por señal, y mucha gente compra de menos aquí. Una DI es un dispositivo de un solo canal por diseño, porque convierte una sola línea de instrumento: un amplificador, una guitarra acústica y un teclado son tres DIs, no una. La excepción es un pedal estéreo o una caja hecha específicamente para estéreo, que existe y cuesta más. Tanto el J48 como el RNDI llevan una segunda salida de paso totalmente bufferizada, que no es un segundo canal: está para poder repartir a un afinador y a un amplificador sin encadenar.']
  ],`;
s = s.replace(anchor, replacement);

// 2. "angulado ligeramente hacia abajo" en vez de "angled very slightly downward"
s = s.split('and angled very slightly downward').join('and angled very slightly downward, hacia abajo');
s = s.split('y con un ligero downward').join('y con una ligera inclinación hacia abajo');
s = s.split('con una ligera inclinaci\u00f3n hacia abajo hacia abajo').join('con una ligera inclinación hacia abajo');
s = s.split('and angled very slightly downward, hacia abajo').join('and angled very slightly downward toward the floor');

fs.writeFileSync(f, s, 'utf8');
const cjk = s.match(/[\u4e00-\u9fff]/g);
console.log('CJK: ' + (cjk ? JSON.stringify([...new Set(cjk)]) : 'ninguno'));
console.log('j48 bloque con 3 FAQs nuevas: ' + (s.split('j48-vs-rndi').length - 1) + ' refs | pasiva FAQ: ' + (s.includes('DI pasiva para bajo') ? 'ok' : 'NO'));