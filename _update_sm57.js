var fs = require('fs');
var g = require('./data/guides.json');
var idx = g.findIndex(function(x) { return x.id === 'sm57-vs-sm58' });

g[idx].verdictProsCons = [
  {
    name: 'Shure SM57',
    name_es: 'Shure SM57',
    pros: [
      'Flat grille design lets you place the capsule directly against a speaker grille for maximum isolation and proximity effect — critical for close-miking guitar cabinets and snare drums without bleed',
      'Handles extreme SPL up to 190dB without distorting, so you can mic a cranked tube amp or a kick drum at point-blank range with zero worry about clipping',
      'Neutral midrange with a focused presence peak at 3-6kHz helps instruments cut through a dense mix naturally without needing additional EQ sculpting',
      'Exceptional unit-to-unit consistency means you can buy multiple SM57s and expect virtually identical frequency response — important for stereo miking or matched multi-mic setups',
      'Passive dynamic design requires no phantom power or batteries — works instantly with any XLR input, even on basic mixers or interfaces with limited features'
    ],
    pros_es: [
      'La rejilla plana permite colocar la cápsula directamente contra el altavoz para máximo aislamiento y efecto de proximidad — crítico para microfonear gabinetes de guitarra y cajas sin sangrado',
      'Soporta SPL extremo de hasta 190dB sin distorsión, permitiendo microfonear un amplificador valvular al máximo volumen o un bombo a quemarropa sin preocuparse por recorte',
      'Medios neutros con un realce de presencia enfocado en 3-6kHz ayuda a que los instrumentos destaquen en mezclas densas de forma natural sin necesidad de esculpir con EQ',
      'Consistencia excepcional entre unidades — puedes comprar varios SM57s y esperar una respuesta de frecuencia virtualmente idéntica, importante para microfonía estéreo o configuraciones multi-mic',
      'El diseño dinámico pasivo no requiere phantom power ni baterías — funciona al instante con cualquier entrada XLR, incluso en mezcladores básicos o interfaces con funciones limitadas'
    ],
    cons: [
      'Frequency response caps at 15kHz — lacks the air, detail, and high-frequency shimmer that even a budget condenser microphone can provide on acoustic or delicate sources',
      'Low sensitivity of -56dBV/Pa forces you to crank your preamp gain near maximum, which can introduce audible floor noise on entry-level audio interfaces and mixers',
      'No built-in pop protection — plosive consonants like p and b are prominent on vocals without an external pop filter or windscreen accessory',
      'XLR-only connection with no built-in pad or low-cut filter — any tone shaping requires external processing or EQ at the mix stage, adding complexity for live use'
    ],
    cons_es: [
      'Respuesta en frecuencia limitada a 15kHz — carece del aire, detalle y brillo de alta frecuencia que incluso un condensador económico puede ofrecer en fuentes acústicas o delicadas',
      'Baja sensibilidad de -56dBV/Pa obliga a subir la ganancia del preamplificador cerca del máximo, lo que puede introducir ruido de piso audible en interfaces y mezcladores de gama de entrada',
      'Sin protección pop integrada — las consonantes explosivas como p y b son prominentes en voces sin un filtro pop externo o pantalla antiviento adicional',
      'Conexión exclusivamente XLR sin pad atenuador ni filtro de graves incorporado — cualquier ajuste de tono requiere procesamiento externo o EQ en la mezcla'
    ]
  },
  {
    name: 'Shure SM58',
    name_es: 'Shure SM58',
    pros: [
      'Built-in spherical steel mesh grille with internal foam pop filter eliminates the need for external pop protection — sing directly without worrying about plosives or wind noise',
      'Internal pneumatic shock mount isolates the capsule from handling noise and stand vibrations, delivering clean vocal sound even on stages with heavy movement and footfall',
      'Frequency response pre-tailored for vocals with a presence rise where the voice needs it and a controlled low-end roll-off that naturally reduces muddiness and proximity buildup',
      'Consistent off-axis rejection means the mic picks up less stage bleed and ambient room sound — critical for live monitoring with multiple sound sources on stage',
      'Same legendary die-cast body durability as the SM57 — survives drops from stage height, extreme heat, and years of heavy touring without any degradation in performance'
    ],
    pros_es: [
      'Rejilla esférica de acero con filtro pop interno de espuma elimina la necesidad de protección pop externa — puedes cantar directamente sin preocuparte por explosivas ni ruido de viento',
      'Soporte antigolpe neumático interno aísla la cápsula del ruido de manejo y vibraciones del soporte, dando un sonido vocal limpio incluso en escenarios con mucho movimiento y pisadas',
      'Respuesta en frecuencia pre-adaptada para voces con realce de presencia donde la voz lo necesita y un filtro de graves controlado que reduce naturalmente el barro y la acumulación de proximidad',
      'Rechazo fuera de eje consistente significa que el micrófono capta menos sangrado del escenario y sonido ambiente — crítico para monitoreo en vivo con múltiples fuentes sonando',
      'Misma durabilidad legendaria del SM57 — cuerpo de aleación fundida que sobrevive caídas desde el escenario, calor extremo y años de gira intensiva sin degradación en el rendimiento'
    ],
    cons: [
      'Bulbous ball grille prevents close-miking instruments — you cannot get the capsule flush against a speaker grille or drum rim, which reduces isolation and proximity effect substantially',
      'Built-in low-cut at 100Hz means kick drums, bass cabinets, and floor toms sound thin and lack weight without external EQ compensation',
      'High-frequency extension stops at 15kHz — cannot capture sibilance detail and air that a large-diaphragm condenser offers in the studio for vocals and acoustic instruments',
      'Requires 55-60dB of clean preamp gain — budget interfaces and basic mixers may introduce audible noise at those gain levels, especially with quieter vocalists'
    ],
    cons_es: [
      'La rejilla esférica abultada impide microfonear instrumentos de cerca — no puedes colocar la cápsula al ras del altavoz o aro del tambor, reduciendo el aislamiento y el efecto de proximidad',
      'El filtro de graves incorporado en 100Hz hace que bombos, bajos y timbales suenen sin peso ni cuerpo sin compensación externa de EQ',
      'La extensión de agudos termina en 15kHz — no puede capturar el detalle de sibilancia y aire que un condensador de diafragma grande ofrece en estudio',
      'Requiere 55-60dB de ganancia limpia del preamplificador — las interfaces económicas y mezcladores básicos pueden introducir ruido audible a esos niveles de ganancia'
    ]
  }
];

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Updated sm57-vs-sm58 verdictProsCons');
