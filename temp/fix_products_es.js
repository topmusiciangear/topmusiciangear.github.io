const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
let products = JSON.parse(fs.readFileSync(path, 'utf8'));

console.log('=== AGREGANDO pros_es y cons_es A PRODUCTOS ===\n');

function setProsCons(id, pros_es, cons_es) {
  const p = products.find(x => x.id === id);
  if (p) {
    p.pros_es = pros_es;
    p.cons_es = cons_es;
    console.log('OK: ' + p.name + ' (id ' + id + ')');
    return true;
  } else {
    console.log('NO ENCONTRADO: id ' + id);
    return false;
  }
}

// JBL 305P MkII (id 116)
setProsCons(116, [
  'Image Control Waveguide brinda zona de escucha amplia y tolerante',
  'Imagen estereo precisa y tridimensional',
  'Precio muy accesible para home studios',
  'Diseño compacto para escritorios pequeños'
], [
  'Respuesta de graves limitada a 49 Hz',
  'Puede sonar brillante en habitaciones sin tratar',
  'Construccion de plastico menos robusta que gamas superiores',
  'Sin calibracion de sala ni DSP'
]);

// KRK Rokit 7 G5 (id 20)
setProsCons(20, [
  'Drivers Kevlar para medios claros y contundentes',
  'Puerto frontal permite colocacion pegada a la pared',
  'EQ DSP con correccion de sala para habitaciones no tratadas',
  'Buen SPL maximo (110 dB) para su precio'
], [
  'Respuesta de frecuencia menos plana que monitores de referencia',
  'Graves pueden resultar enfatizados en habitaciones pequeñas',
  'DSP de correccion de sala basico (no automatico)',
  'Calidad de construccion inferior a monitores profesionales'
]);

// Yamaha HS8 (id 19)
setProsCons(19, [
  'Respuesta de frecuencia plana y honesta, estandar de la industria',
  'Woofer de 8" con cono de Kevlar para graves autoritarios',
  'Room Control y High Trim para adaptacion basica a la sala',
  'Construccion robusta y fiabilidad legendaria'
], [
  'Puede resultar fatigante en sesiones largas por su honestidad',
  'Requiere habitacion tratada para brillar',
  'Sin calibracion DSP ni correccion automatica de sala',
  'Precio elevado respecto a alternativas con mas funciones'
]);

// Adam Audio A7V (id 21)
setProsCons(21, [
  'Tweeter X-ART de cinta plegada para transitorios excepcionales',
  'Imagen estereo 3D precisa y holografica',
  'Respuesta de graves profunda para monitor de 2 vias de 7"',
  'Controles traseros precisos (High/Mid/Low shelf)'
], [
  'Precio significativamente superior a rivales de 7"',
  'Requiere habitacion bien tratada para aprovechar el detalle',
  'Curva de aprendizaje para ajustar los 3 controles de ecualizacion',
  'Menos SPL maximo que monitores de 8"'
]);

// Kali Audio IN-8 V2 (id 199)
setProsCons(199, [
  'Diseno coaxial de 3 vias genuino (punto de fuente unico)',
  'Excelente imagen estereo y localizacion precisa',
  'Boundary EQ compensa colocacion pegada a pared/esquinas',
  'Relacion calidad-precio sobresaliente para diseno de 3 vias'
], [
  'Requiere espacio para radiacion posterior del driver coaxial',
  'Boundary EQ requiere ajuste manual (no automatico)',
  'Menos refinado en agudos que diseños coaxiales de gama alta',
  'Calidad de construccion inferior a Genelec/Neumann'
]);

// Genelec 8010A (id 331)
setProsCons(331, [
  'Precision de referencia en formato ultracompacto (+-2,5 dB)',
  'Construccion de aluminio fundido, robusta y resonancia cero',
  'ISS auto-standby ahorra energia y prolonga vida util',
  'Ideal para broadcast, post-produccion y salas diminutas'
], [
  'Respuesta de graves limitada a 74 Hz (requiere subwoofer)',
  'SPL maximo moderado (96 dB) para monitoreo a bajo volumen',
  'Precio elevado para su tamano',
  'Sin controles de ecualizacion ni calibracion DSP'
]);

// Neumann KH 80 DSP (id 305)
setProsCons(305, [
  'Waveguide MMD de la serie 800 para dispersion controlada',
  'Calibracion automatica MA 1 aplana respuesta en minutos',
  'DSP integrado con ecualizacion parametrica completa',
  'Construccion alemana, calidad de referencia absoluta'
], [
  'Requiere kit MA 1 (costo extra) para calibracion automatica',
  'Respuesta de graves limitada a 57 Hz (requiere subwoofer)',
  'Curva de aprendizaje en software de control DSP',
  'Precio muy elevado para monitor de 4"'
]);

// Genelec 8351B (id 304)
setProsCons(304, [
  'Fuente puntual coaxial de 3 vias con imagen holografica',
  'Woofers acusticamente ocultos eliminan difraccion de borde',
  'GLM AutoCal calibra automaticamente a la sala',
  'SPL maximo de 113 dB para salas grandes y mastering'
], [
  'Precio de gama muy alta (inversion profesional)',
  'Requiere kit GLM (microfono + software) para calibracion completa',
  'Curva de aprendizaje en software GLM',
  'Tamano y peso considerables para monitor de campo cercano'
]);

// Kali Audio IN-UNF (buscar por nombre)
const inunf = products.find(x => x.name && x.name.includes('IN-UNF'));
if (inunf) {
  inunf.pros_es = [
    'Unico sistema disenado especificamente para ultra-nearfield (50-80 cm)',
    'Subwoofer de escritorio con woofers opuestos cancela vibraciones',
    'Satelites coaxiales a altura de oido para imagen perfecta',
    'Boundary EQ adapta respuesta a entorno de escritorio'
  ];
  inunf.cons_es = [
    'Configuracion de 3 piezas ocupa mas espacio en escritorio',
    'Respuesta de graves limitada por subwoofer compacto',
    'Solo para uso a distancia muy cercana (no campo cercano estandar)',
    'Precio elevado para sistema de escritorio'
  ];
  console.log('OK: ' + inunf.name + ' (id ' + inunf.id + ')');
}

// Kali Audio LP-UNF (id 307)
setProsCons(307, [
  'Diseno compacto para colocacion pegada a pared y pantallas',
  'Boundary EQ con 4 posiciones compensa colocacion cercana',
  'Guia de onda 3-D amplía zona de escucha en escritorio',
  'Puerto frontal permite apoyo contra pared sin afectar graves'
], [
  'Woofer de solo 4,5" limita extension de graves (54 Hz)',
  'SPL maximo moderado (108 dB) para monitoreo a bajo volumen',
  'Solo amplificacion Clase D (menos musical que Clase AB)',
  'Sin calibracion automatica de sala'
]);

// Focal Shape 65 (id 1054)
setProsCons(1054, [
  'Radiadores pasivos laterales permiten colocacion pegada a la pared sin graves descontrolados',
  'Cono Flax ofrece graves organicos, detallados y naturales',
  'Amplificacion Clase AB para sonido musical y sin fatiga auditiva',
  'Tweeter de cupula invertida de 1" con dispersion amplia y suave'
], [
  'Requiere espacio lateral para los radiadores pasivos',
  'Se vende individualmente; el par estereo supera los 1.300',
  'Respuesta de graves limitada a 40 Hz (menos que monitores con puerto de 8")',
  'Sin calibracion DSP ni correccion de sala integrada'
]);

// Guardar
fs.writeFileSync(path, JSON.stringify(products, null, 2));
console.log('\nproducts.json guardado con pros_es y cons_es para todos los monitores');