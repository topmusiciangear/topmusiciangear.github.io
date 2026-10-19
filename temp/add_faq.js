const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-headphones-for-mixing');

g.faq.push(
  {
    q: 'Is the Sennheiser HD 490 Pro Plus the modern reference pick?',
    q_es: '¿Es el Sennheiser HD 490 Pro Plus la referencia moderna?',
    a: 'Yes, for neutrality with modern low-end extension. The frequency response is virtually flat with no coloration, and unlike the old 300-ohm classics it adds deep, defined low end at an easy-to-drive 130 ohms, so no headphone amp is required. Two switchable ear pad sets tune the presentation and the included dearVR MIX-SE plugin adds a virtual-room translation check. The trade is price: at $499 it is nearly triple the DT 770 Pro, and like all open-backs it leaks sound.',
    a_es: 'Sí, por neutralidad con extensión de graves moderna. La respuesta de frecuencia es prácticamente plana, sin coloración, y a diferencia de los clásicos de 300 ohms añade graves profundos y definidos con 130 ohms fáciles de alimentar, así que no hace falta amplificador. Dos juegos de almohadillas ajustan la presentación y el plugin dearVR MIX-SE incluido añade una comprobación de traducción en sala virtual. La contrapartida es el precio: a $499 es casi el triple que el DT 770 Pro, y como todos los abiertos fuga sonido.',
  },
  {
    q: 'Is the Sennheiser HD 600 the sweet-spot flat reference?',
    q_es: '¿Es el Sennheiser HD 600 la referencia plana de punto ideal?',
    a: 'Yes, for the mixer who finds the DT 990 Pro fatiguing. It has been the mixing yardstick since 1997: a flat midrange that reports vocals, guitars and snares without the DT 990 treble peak that fatigues ears and triggers harsh EQ cuts. Mixes built here translate because nothing was flattered. The open-back design breathes like a treated room and every wearable part is replaceable. The honest catch is 300 ohms: it demands a real headphone amp, and a weak laptop jack leaves it quiet and dull.',
    a_es: 'Sí, para el mezclador que encuentra cansado el DT 990 Pro. Es el patrón de mezcla desde 1997: un rango medio plano que informa de voces, guitarras y cajas sin el pico de agudos del DT 990 que fatiga los oídos y provoca recortes de EQ duros. Las mezclas hechas aquí se traducen porque nada se adornó. El diseño abierto respira como una sala tratada y cada parte ponible es reemplazable. El problema honesto son 300 ohms: pide un amplificador de auriculares de verdad, y un conector de portátil débil lo deja bajo y apagado.',
  },
  {
    q: 'Is the Audio-Technica ATH-M50x the best all-purpose headphone?',
    q_es: '¿Es el Audio-Technica ATH-M50x el mejor auricular polivalente?',
    a: 'For one pair that has to do everything, yes. It offers a balanced, detailed sound with slightly enhanced low-end that is versatile for both mixing and casual listening, and the collapsible design makes it the best portable option for producers who work in multiple locations. The sound has a slightly forward midrange with detailed highs and punchy bass; the bass is more present than the DT 770, which some mixers love and others find misleading. The ear pads are pleather and can get warm in long sessions — aftermarket velour pads are a worthwhile upgrade.',
    a_es: 'Para una sola pareja que tenga que hacerlo todo, sí. Ofrece un sonido equilibrado y detallado con graves ligeramente realzados que lo hace versátil tanto para mezclar como para escucha casual, y el diseño plegable lo convierte en la mejor opción portátil para productores que trabajan en varias ubicaciones. El sonido tiene un rango medio ligeramente adelantado con agudos detallados y graves contundentes; los graves están más presentes que en el DT 770, lo que algunos mezcladores aman y otros encuentran engañoso. Las almohadillas son de polipiel y pueden dar calor en sesiones largas; las de terciopelo de terceros son una mejora que merece la pena.',
  },
  {
    q: 'Is the Sony MDR-7506 the broadcast editing standard?',
    q_es: '¿Es el Sony MDR-7506 el estándar de edición broadcast?',
    a: 'For editing and broadcast, yes. It has served since 1991 as a closed-back, collapsible workhorse: 40mm drivers, 63 ohms, 106dB sensitivity, a 10Hz–20kHz response, a fixed 3m coiled cable and 230 grams. Those traits explain long sessions and reliable tracking cues: isolation, foldable transport and a familiar midrange that exposes edits. The honest limit for mixing is perspective: the closed presentation and accentuated upper register inform decisions but rarely replace open-back cross-checks or monitor confirmation.',
    a_es: 'Para edición y broadcast, sí. Lleva desde 1991 como caballo de batalla cerrado y plegable: drivers de 40 mm, 63 ohms, 106 dB de sensibilidad, respuesta de 10 Hz a 20 kHz, cable enrollado fijo de 3 m y 230 gramos. Esas características explican sesiones largas y señales de grabación fiables: aislamiento, transporte plegable y un rango medio conocido que deja al descubierto las ediciones. El límite honesto para mezclar es la perspectiva: la presentación cerrada y el registro superior acentuado sirven para tomar decisiones, pero rara vez sustituyen las comprobaciones con abiertos o la confirmación con monitores.',
  }
);

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('FAQs totales: ' + g.faq.length);
