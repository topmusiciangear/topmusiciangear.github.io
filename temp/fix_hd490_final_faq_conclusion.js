const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'hd490-pro-vs-dt990');
const fsn = g.featuredSnippet;

// ES (provided)
fsn.faq_q1_es = '¿Mezclo sobre todo con auriculares de noche — quiero el preciso HD 490 Pro o el DT 990 que revela detalles para cazar problemas?';
fsn.faq_a1_es = 'Compra las HD 490 Pro para mezcla crítica: su respuesta neutra y natural muestra la verdad sin coloración, funcionan de forma eficiente desde tu interfaz a 130 ohmios y sus graves profundos significan que puedes confiar en las decisiones de bajos. Compra las DT 990 Pro si quieres un sonido abierto más grande y emocionante con gran detalle en agudos a un precio muy accesible.';
fsn.faq_q2_es = '¿Cuál es la diferencia entre las HD 490 Pro y las DT 990 Pro?';
fsn.faq_a2_es = 'Las HD 490 Pro tienen una respuesta neutra y natural con una extensión excelente, ofreciendo los graves más profundos de cualquier Sennheiser abierto gracias a su arquitectura moderna y sus dos juegos de almohadillas intercambiables. Las DT 990 Pro tienen respuesta en V con graves y agudos potenciados, escenario más amplio y más energía, pero su pico de agudos puede engañarte para cortar altos que están bien en la mezcla real. Las 490 son honestas; las 990 son emocionantes.';
fsn.faq_q3_es = '¿Necesitan las HD 490 Pro o las DT 990 Pro un amplificador de auriculares?';
fsn.faq_a3_es = 'Las HD 490 Pro (130 ohmios) son significativamente más fáciles de alimentar que los auriculares de estudio tradicionales; funcionan de forma excelente en cualquier interfaz de audio moderna o laptop de gama alta sin necesidad de un amplificador dedicado. Por su parte, las DT 990 Pro de 250 ohmios sí exigen un amplificador potente o una salida de interfaz de alta ganancia de forma obligatoria. Ninguna de las dos dará su máximo potencial conectada directo a un teléfono móvil común, pero las 490 son mucho más fáciles de mover en entornos portátiles profesionales.';
fsn.faq_q4_es = '¿Merecen las HD 490 Pro más que las DT 990 Pro para mezclar?';
fsn.faq_a4_es = 'Si tu uso principal es mezcla crítica y quieres graves reales además de una construcción moderna, sí. Las HD 490 Pro tienen una respuesta neutra y natural que muestra la verdad sin color, graves profundos y definidos, y son mucho menos cansadas en sesiones largas que las brillantes DT 990 Pro. Las 990 tienen un escenario más grande y más detalle en agudos, pero ese pico puede engañarte para cortar altos que están bien. Compra las 490 para mezcla de referencia; compra las 990 si quieres un sonido más grande con presupuesto ajustado.';
fsn.faq_q5_es = '¿Qué auriculares tienen mejor precisión en medios para mezcla vocal?';
fsn.faq_a5_es = 'Los Sennheiser HD 490 Pro son reconocidos por su reproducción neutral de medios, convirtiéndose en el estándar moderno para mezcla vocal y música acústica. Los Beyerdynamic DT 990 Pro tienen una respuesta en V con graves y agudos potenciados que pueden llegar a enmascarar los detalles de la voz. Para voces, el HD 490 Pro gana por un margen claro.';

// EN equivalents
fsn.faq_q1_en = 'I mostly mix on headphones at night — do I want the accurate HD 490 Pro or the detail-revealing DT 990 for catching problems?';
fsn.faq_a1_en = 'Buy the HD 490 Pro for critical mixing: its neutral, natural response shows the truth without coloration, it runs efficiently from your interface at 130 ohms, and its deep bass means you can trust low-end decisions. Buy the DT 990 Pro if you want a bigger, more exciting open sound with strong treble detail at a very accessible price.';
fsn.faq_q2_en = 'What is the difference between the HD 490 Pro and the DT 990 Pro?';
fsn.faq_a2_en = 'The HD 490 Pro has a neutral, natural response with excellent extension, delivering the deepest bass of any Sennheiser open-back thanks to its modern architecture and two sets of swappable ear pads. The DT 990 Pro has a V-shaped response with boosted bass and treble, a wider soundstage and more energy, but its treble peak can fool you into cutting highs that are fine in the real mix. The 490 is honest; the 990 is exciting.';
fsn.faq_q3_en = 'Do the HD 490 Pro or the DT 990 Pro need a headphone amplifier?';
fsn.faq_a3_en = 'The HD 490 Pro (130 ohms) is significantly easier to drive than traditional studio headphones; it works excellently on any modern audio interface or high-end laptop without a dedicated amplifier. The DT 990 Pro at 250 ohms does require a powerful amp or high-gain interface output. Neither will reach its full potential straight from a common phone, but the 490 is much easier to move in professional portable setups.';
fsn.faq_q4_en = 'Are the HD 490 Pro worth more than the DT 990 Pro for mixing?';
fsn.faq_a4_en = 'If your main use is critical mixing and you want real bass plus modern build, yes. The HD 490 Pro has a neutral, natural response that shows the truth without color, deep defined bass, and is far less fatiguing on long sessions than the bright DT 990 Pro. The 990 has a bigger soundstage and more treble detail, but that peak can fool you into cutting highs that are fine. Buy the 490 for reference mixing; buy the 990 if you want a bigger sound on a tight budget.';
fsn.faq_q5_en = 'Which headphones have better midrange accuracy for vocal mixing?';
fsn.faq_a5_en = 'The Sennheiser HD 490 Pro is known for its neutral midrange reproduction, becoming the modern standard for vocal mixing and acoustic music. The Beyerdynamic DT 990 Pro has a V-shaped response with boosted bass and treble that can end up masking vocal detail. For vocals, the HD 490 Pro wins by a clear margin.';

// Conclusion
g.conclusion_es = 'Con las cartas sobre la mesa, el Sennheiser HD 490 Pro es la elección definitiva para el ingeniero de sonido actual. Sus drivers de 38 mm ultraprecisos, su escenario sonoro amplio y con profundidad real, el sistema de almohadillas intercambiables de mezcla/producción y el plugin dearVR MIX-SE incluido justifican por completo su inversión, ofreciendo una herramienta en la que puedes confiar a ciegas para tomar decisiones finales de mezcla.';
g.conclusion = 'With the cards on the table, the Sennheiser HD 490 Pro is the definitive choice for today\'s audio engineer. Its ultra-precise 38 mm drivers, wide and genuinely deep soundstage, swappable mixing/producing ear pad system and included dearVR MIX-SE plugin fully justify the investment, giving you a tool you can blindly trust for final mix decisions.';

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('done');
