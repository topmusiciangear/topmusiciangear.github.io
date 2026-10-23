const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let c = fs.readFileSync(path, 'utf8');
let obj = JSON.parse(c);
const g = obj.find(x => x.id === 'best-monitors');

console.log('=== CORRIGIENDO verdictProsCons ===');

const correctVerdict = [
  { 
    name: 'JBL 305P MkII', 
    name_es: 'JBL 305P MkII', 
    pros: ['Legendary budget monitor with JBL Image Control Waveguide', 'Wide sweet spot and stunning stereo imaging', '5-inch woofer with patented Slip Stream port', 'Exceptional value for home studios'], 
    cons: ['Bass rolls off at 49 Hz', 'Can sound bright in untreated rooms', 'Plastic build feels less premium', 'No room correction or DSP'], 
    pros_es: ['Guía de onda Image Control brinda zona de escucha amplia y tolerante', 'Imagen estéreo precisa y tridimensional', 'Precio muy accesible para home studios', 'Diseño compacto para escritorios pequeños'], 
    cons_es: ['Respuesta de graves limitada a 49 Hz', 'Puede sonar brillante en habitaciones sin tratar', 'Construcción de plástico menos robusta que gamas superiores', 'Sin calibración de sala ni DSP'] 
  },
  { 
    name: 'Kali Audio LP-6 V2', 
    name_es: 'Kali Audio LP-6 V2', 
    pros: ['Boundary EQ compensates for desk, wall, and corner placement', 'Exceptional bass extension for 6.5-inch driver', 'DIP switches make room correction foolproof', 'Natural, unhyped sound at unbeatable price'], 
    cons: ['Boundary EQ requires manual switching', 'Rear port limits wall placement flexibility', 'Plastic enclosure not as rigid as premium', 'No automatic room calibration'], 
    pros_es: ['Boundary EQ compensa colocación en escritorio, pared y esquina', 'Extensión de graves excepcional para driver de 6,5 pulgadas', 'Interruptores DIP hacen la corrección de sala infalible', 'Sonido natural y sin exageraciones a precio inmejorable'], 
    cons_es: ['Boundary EQ requiere cambio manual de interruptores', 'Puerto trasero limita flexibilidad cerca de pared', 'Caja de plástico menos rígida que gamas premium', 'Sin calibración automática de sala'] 
  },
  { 
    name: 'KRK Rokit 7 G5', 
    name_es: 'KRK Rokit 7 G5', 
    pros: ['Kevlar drivers deliver punchy, clear mids', 'Front-firing bass port works near walls', 'DSP room correction tunes to your desk', '110 dB SPL plenty loud for small rooms'], 
    cons: ['Less flat response than reference monitors', 'Bass can be heavy in small rooms', 'Basic room correction (not automatic)', 'Build quality below pro monitors'], 
    pros_es: ['Drivers Kevlar para medios claros y contundentes', 'Puerto frontal permite colocación pegada a la pared', 'EQ DSP con corrección de sala para habitaciones no tratadas', 'Buen SPL máximo (110 dB) para su precio'], 
    cons_es: ['Respuesta de frecuencia menos plana que monitores de referencia', 'Graves pueden resultar enfatizados en habitaciones pequeñas', 'DSP de corrección de sala básico (no automático)', 'Calidad de construcción inferior a monitores profesionales'] 
  },
  { 
    name: 'Yamaha HS8', 
    name_es: 'Yamaha HS8', 
    pros: ['Flat, honest response - industry standard', '8-inch Kevlar woofer digs deep without sub', 'Room Control and High Trim for placement', 'Legendary reliability and build quality'], 
    cons: ['Can be fatiguing in long sessions', 'Needs treated room to shine', 'No DSP or auto room correction', 'Pricey vs feature-packed alternatives'], 
    pros_es: ['Respuesta de frecuencia plana y honesta, estándar de la industria', 'Woofer de 8" con cono de Kevlar para graves autoritarios', 'Room Control y High Trim para adaptación básica a la sala', 'Construcción robusta y fiabilidad legendaria'], 
    cons_es: ['Puede resultar fatigante en sesiones largas por su honestidad', 'Requiere habitación tratada para brillar', 'Sin calibración DSP ni corrección automática de sala', 'Precio elevado respecto a alternativas con más funciones'] 
  },
  { 
    name: 'Adam Audio A7V', 
    name_es: 'Adam Audio A7V', 
    pros: ['X-ART ribbon tweeter for exceptional transients', '3D holographic stereo imaging', 'Deep bass for 7-inch 2-way monitor', 'Precise 3-band rear EQ controls'], 
    cons: ['Significantly pricier than 7-inch rivals', 'Needs well-treated room to shine', 'Learning curve for 3-band EQ', 'Less max SPL than 8-inch monitors'], 
    pros_es: ['Tweeter X-ART de cinta plegada para transitorios excepcionales', 'Imagen estéreo 3D precisa y holográfica', 'Respuesta de graves profunda para monitor de 2 vías de 7"', 'Controles traseros precisos (High/Mid/Low shelf)'], 
    cons_es: ['Precio significativamente superior a rivales de 7"', 'Requiere habitación bien tratada para aprovechar el detalle', 'Curva de aprendizaje para ajustar los 3 controles de ecualización', 'Menos SPL máximo que monitores de 8"'] 
  },
  { 
    name: 'Kali Audio IN-8 V2', 
    name_es: 'Kali Audio IN-8 V2', 
    pros: ['True 3-way coaxial = genuine point source', 'Pinpoint imaging and phase coherence', 'Boundary EQ for wall/corner placement', 'Unbeatable value for true 3-way design'], 
    cons: ['Needs space for coaxial rear radiation', 'Boundary EQ requires manual adjustment', 'Less refined highs than premium coaxials', 'Build quality below Genelec/Neumann'], 
    pros_es: ['Diseño coaxial de 3 vías genuino (punto de fuente único)', 'Excelente imagen estéreo y localización precisa', 'Boundary EQ compensa colocación pegada a pared/esquinas', 'Relación calidad-precio sobresaliente para diseño de 3 vías'], 
    cons_es: ['Requiere espacio para radiación posterior del driver coaxial', 'Boundary EQ requiere ajuste manual (no automático)', 'Menos refinado en agudos que diseños coaxiales de gama alta', 'Calidad de construcción inferior a Genelec/Neumann'] 
  },
  { 
    name: 'Genelec 8010A', 
    name_es: 'Genelec 8010A', 
    pros: ['Reference precision in ultra-compact format (±2.5 dB)', 'Die-cast aluminum, zero resonance', 'ISS auto-standby saves power', 'Perfect for broadcast, post, tiny rooms'], 
    cons: ['74 Hz bass roll-off needs subwoofer', '96 dB SPL modest for quiet listening', 'Pricey for its size', 'No EQ or DSP room correction'], 
    pros_es: ['Precisión de referencia en formato ultracompacto (±2,5 dB)', 'Construcción de aluminio fundido, robusta y resonancia cero', 'ISS auto-standby ahorra energía y prolonga vida útil', 'Ideal para broadcast, post-producción y salas diminutas'], 
    cons_es: ['Respuesta de graves limitada a 74 Hz (requiere subwoofer)', 'SPL máximo moderado (96 dB) para monitoreo a bajo volumen', 'Precio elevado para su tamaño', 'Sin controles de ecualización ni calibración DSP'] 
  },
  { 
    name: 'Neumann KH 80 DSP', 
    name_es: 'Neumann KH 80 DSP', 
    pros: ['MMD waveguide from 800-series for controlled dispersion', 'MA 1 auto-calibration flattens response in minutes', 'Full parametric EQ DSP built-in', 'German build, absolute reference quality'], 
    cons: ['MA 1 kit (extra cost) needed for auto-cal', '57 Hz bass roll-off needs subwoofer', 'DSP software learning curve', 'Very pricey for 4-inch monitor'], 
    pros_es: ['Waveguide MMD de la serie 800 para dispersión controlada', 'Calibración automática MA 1 aplana respuesta en minutos', 'DSP integrado con ecualización paramétrica completa', 'Construcción alemana, calidad de referencia absoluta'], 
    cons_es: ['Requiere kit MA 1 (costo extra) para calibración automática', 'Respuesta de graves limitada a 57 Hz (requiere subwoofer)', 'Curva de aprendizaje en software de control DSP', 'Precio muy elevado para monitor de 4"'] 
  },
  { 
    name: 'Genelec 8351B', 
    name_es: 'Genelec 8351B SAM 3-Way Coaxial Studio Monitor', 
    pros: ['True 3-way coaxial point source with holographic imaging', 'Acoustically Concealed Woofers eliminate edge diffraction', 'GLM AutoCal auto-tunes to your room', '113 dB SPL for large rooms and mastering'], 
    cons: ['Price exceeds other eight monitors combined', 'Requires GLM kit (mic + software) for full cal', 'GLM software learning curve', 'Large and heavy for nearfield'], 
    pros_es: ['Fuente puntual coaxial de 3 vías con imagen holográfica', 'Woofers acústicamente ocultos eliminan difracción de borde', 'GLM AutoCal calibra automáticamente a la sala', 'SPL máximo de 113 dB para salas grandes y mastering'], 
    cons_es: ['Precio de gama muy alta (inversión profesional)', 'Requiere kit GLM (micrófono + software) para calibración completa', 'Curva de aprendizaje en software GLM', 'Tamaño y peso considerables para monitor de campo cercano'] 
  },
  { 
    name: 'Kali Audio IN-UNF', 
    name_es: 'Kali Audio IN-UNF', 
    pros: ['Only system designed for ultra-nearfield (50-80 cm)', 'Opposed 4.5-inch woofers cancel vibration', 'Coaxial satellites at ear height', 'Boundary EQ adapts to desk placement'], 
    cons: ['3-piece config takes more desk space', 'Bass limited by compact subwoofer', 'Only for ultra-nearfield (not standard nearfield)', 'Pricey for desktop system'], 
    pros_es: ['Único sistema diseñado específicamente para ultra-nearfield (50-80 cm)', 'Subwoofer de escritorio con woofers opuestos cancela vibraciones', 'Satélites coaxiales a altura de oído para imagen perfecta', 'Boundary EQ adapta respuesta a entorno de escritorio'], 
    cons_es: ['Configuración de 3 piezas ocupa más espacio en escritorio', 'Respuesta de graves limitada por subwoofer compacto', 'Solo para uso a distancia muy cercana (no campo cercano estándar)', 'Precio elevado para sistema de escritorio'] 
  },
  { 
    name: 'Kali Audio LP-UNF', 
    name_es: 'Kali Audio LP-UNF', 
    pros: ['Compact design fits against walls and screens', '4-position Boundary EQ for near-wall placement', '3D waveguide widens desktop sweet spot', 'Front port allows wall placement without bass buildup'], 
    cons: ['4.5-inch woofer limits bass to 54 Hz', '108 dB max SPL for quiet monitoring only', 'Class D only (less musical than Class AB)', 'No auto room calibration'], 
    pros_es: ['Diseño compacto para colocación pegada a pared y pantallas', 'Boundary EQ con 4 posiciones compensa colocación cercana', 'Guía de onda 3-D amplía zona de escucha en escritorio', 'Puerto frontal permite apoyo contra pared sin afectar graves'], 
    cons_es: ['Woofer de solo 4,5" limita extensión de graves (54 Hz)', 'SPL máximo moderado (108 dB) para monitoreo a bajo volumen', 'Solo amplificación Clase D (menos musical que Clase AB)', 'Sin calibración automática de sala'] 
  },
  { 
    name: 'Focal Shape 65', 
    name_es: 'Focal Shape 65', 
    pros: ['Side passive radiators allow wall placement without bass buildup', 'Flax cone delivers organic, detailed, natural lows', 'Class AB amplification for musical, fatigue-free sound', '1-inch inverted dome tweeter with wide smooth dispersion'], 
    cons: ['Needs lateral space for passive radiators', 'Sold individually; stereo pair exceeds 1,300', '40 Hz bass limit vs ported 8-inch monitors', 'No DSP room correction built-in'], 
    pros_es: ['Radiadores pasivos laterales permiten colocación pegada a la pared sin graves descontrolados', 'Cono Flax ofrece graves orgánicos, detallados y naturales', 'Amplificación Clase AB para sonido musical y sin fatiga auditiva', 'Tweeter de cúpula invertida de 1" con dispersión amplia y suave'], 
    cons_es: ['Requiere espacio lateral para los radiadores pasivos', 'Se vende individualmente; el par estéreo supera los 1.300', 'Respuesta de graves limitada a 40 Hz (menos que monitores con puerto de 8")', 'Sin calibración DSP ni corrección de sala integrada'] 
  }
];



g.verdictProsCons = correctVerdict;
console.log('verdictProsCons actualizado:', correctVerdict.length, 'productos');

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', JSON.stringify(obj, null, 2));
console.log('Guardado');

const obj2 = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const g2 = obj2.find(x => x.id === 'best-monitors');
console.log('Verificación:', g2.verdictProsCons.length, 'productos');
g2.verdictProsCons.forEach((v, i) => console.log(i + ': ' + v.name + ' | ' + v.name_es));