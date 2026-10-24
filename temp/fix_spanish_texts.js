const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let c = fs.readFileSync(path, 'utf8');
let obj = JSON.parse(c);
const g = obj.find(x => x.id === 'best-monitors');

// Lista de correcciones ES detalladas
const fixes = {
  // Sección 5: Adam Audio A7V
  5: {
    content_es: `<p><strong>El detalle está en los transitorios, y ahí es donde brilla este monitor.</strong> El tweeter X-ART hecho a mano es una cinta plegada que mueve el aire como un acordeón en vez de empujarlo como una cúpula, así los ataques arrancan más rápido y la colocación estéreo se enfoca con profundidad tridimensional. Debajo, el woofer de 7 pulgadas con puerto sintonizado ofrece graves profundos y controlados que sorprenden para el tamaño de la caja. Un tema mezclado en estos revela respiraciones y colas de reverb que pasan desapercibidas en los monitores principales. Antes de comprar, cuenta con una colocación cuidadosa y algo de rodaje, porque un monitor revelador castiga la mala posición. Hecho para quien mezcla al detalle y persigue imagen y microdetalle.</p>`
  },
  // Sección 6: Kali Audio IN-8 V2
  6: {
    content_es: `<p><strong>El Kali Audio IN-8 V2 es el monitor de estudio compacto de 8 pulgadas con ecualización DSP de 100W de potencia.</strong> Un verdadero diseño de 3 vías: un woofer de 8 pulgadas se encarga de los graves mientras que un driver de rango medio de 4 pulgadas con un tweeter de 1 pulgada se sitúa coaxialmente en su centro. Esa fuente puntual coaxial es la magia — coloca los drivers de medios y agudos en el mismo eje acústico, ofreciendo imagen estéreo de precisión y coherencia de fase que simplemente no se consiguen con diseños de dos vías. Cada driver lo alimenta su propio módulo en un sistema triamplificado de 140 W, con headroom limpio y respuesta ultraplana sin que ningún driver trabaje de más. El puerto de baja turbulencia mantiene los graves contundentes sin ruido. Es el monitor más preciso de esta guía y la vía de entrada a la verdadera precisión de referencia profesional.</p>`
  },
  // Sección 7: Genelec 8010A
  7: {
    content_es: "<p><strong>El Genelec 8010A demuestra que la monitorización de referencia no necesita una caja grande.</strong> Este monitor de 3 pulgadas ofrece la misma construcción de aluminio fundido y precisión de ±2,5 dB que los monitores más grandes de Genelec en un paquete que cabe en cualquier sitio. El ISS auto-standby corta la energía cuando te alejas, y el caja sellado mantiene las resonancias a raya. La consistencia entre unidades de Genelec significa que lo que escuchas en tu par coincide con lo que escuchas en cualquier otro estudio equipado con 8010A.</p>"
  },
  // Sección 8: Neumann KH 80 DSP
  8: {
    content_es: "<p><strong>El Neumann KH 80 DSP es el monitor técnicamente más ambicioso de esta guía.</strong> Un nearfield de 4 pulgadas con la guía de ondas MMD de la serie 800 de Neumann y DSP que te permite ajustar la respuesta a tu sala. Con el micrófono de medición MA 1 se calibra solo en minutos, dejando plana la respuesta en tu posición de escucha: la solución más efectiva para los problemas de sala además del tratamiento acústico.</p>"
  },
  // Sección 9: Genelec 8351B
  9: {
    content_es: "<p><strong>El Genelec 8351B es el monitor definitivo de esta guía.</strong> Un monitor finlandés de 3 vías coaxial de fuente puntual con woofers acústicamente ocultos, driver coaxial de mínima difracción y calibración DSP GLM de sala.</p>"
  },
  // Sección 10: Kali Audio IN-UNF
  10: {
    content_es: "<p><strong>El Kali Audio IN-UNF es el único sistema de esta guía diseñado para uso ultra-nearfield de escritorio.</strong> Una unidad de graves con dos woofers opuestos de 4,5 pulgadas se coloca sobre tu escritorio mientras los satélites coaxiales sitúan un medio de 4 pulgadas y un tweeter de 1 pulgada a la altura de los oídos. Esa geometría fija la imagen estéreo y elimina las reflexiones tempranas de la mesa que emborronan el sonido en monitores convencionales. El DSP integrado aplica ecualización Borderline según la colocación, así que el grave se mantiene controlado incluso con la unidad de graves pegada a la pared.</p>"
  },
  // Sección 11: Kali Audio LP-UNF
  11: {
    content_es: "<p><strong>El Kali Audio LP-UNF es el par de monitoreo profesional más pequeño de esta guía.</strong> Cada lado monta un woofer de 4,5 pulgadas de larga excursión y una cúpula textil de 1 pulgada en una caja con puerto frontal que puedes colocar contra la pared, con guía de onda 3-D que amplía el punto óptimo del sonido y adaptador de cruce activo para graves profundos.</p>"
  },
  // Sección 12: Focal Shape 65
  12: {
    content_es: "<p><strong>El Focal Shape 65 prescinde del puerto bass-reflex tradicional.</strong> Prescinde del puerto bass-reflex tradicional, usando en su lugar dos radiadores pasivos laterales. Eso significa que puedes colocarlo justo contra una pared sin que los graves se vuelvan retumbantes o descontrolados, una ventaja real en salas pequeñas y escritorios. El woofer de cono Flax de 6,5 pulgadas ofrece graves bajos naturales y precisos con el carácter orgánico por el que Focal es conocida, mientras que el tweeter de cúpula invertida de 1 pulgada maneja los agudos con precisión y sin aspereza. La amplificación Clase AB mantiene el sonido musical y sin fatiga durante largas sesiones de mezcla.</p>"
  },
  // Sección 1: JBL 305P MkII
  1: {
    content_es: "<p><strong>El JBL 305P MkII es uno de los monitores de estudio económicos más populares que existen, y con razón.</strong> La guía de onda Image Control patentada de JBL crea un punto óptimo notablemente amplio, así que no necesitas mantener la cabeza fija para escuchar la imagen estéreo. El woofer de 5 pulgadas con el puerto Slip Stream de JBL entrega graves ajustados y precisos en cualquier habitación. Por menos de $300 el par, nada más entrega esta imagen estéreo y detalle por el precio. Antes de comprar, ten en cuenta que los graves bajan hasta 49 Hz, así que géneros con mucho bajo pueden querer un subwoofer. Por el precio, es el referente.</p>"
  },
  // Sección 2: Kali Audio LP-6 V2
  2: {
    content_es: "<p><strong>Kali Audio fue fundada por antiguos ingenieros de JBL que querían llevar la monitorización económica aún más lejos.</strong> El LP-6 V2 es el resultado — un monitor de 6,5 pulgadas con ecualización Boundary que compensa los problemas de graves de tu habitación. Los interruptores DIP en la parte trasera te permiten indicarle al altavoz dónde está colocado (en un escritorio, cerca de una pared, en una esquina) y el DSP se ajusta en consecuencia. Ningún otro monitor ofrece este nivel de corrección de sala por este precio. La extensión de graves es sorprendentemente profunda para un driver de 6,5 pulgadas, y el balance general es natural y sin exageraciones. Estos monitores redefinen lo que puede ofrecer la gama económica.</p>"
  },
  // Sección 3: KRK Rokit 7 G5
  3: {
    content_es: "<p><strong>Los productores en casa siguen comprando este monitor porque se adapta a habitaciones difíciles.</strong> Los drivers de Kevlar se mantienen claros y contundentes en los medios, el puerto de graves frontal responde aunque esté pegado a la pared, y el ecualizador DSP con corrección de sala adapta el altavoz a tu escritorio en vez de pelearse con él. Ese procesamiento interno es lo que lo distingue: le dices dónde está colocado y compensa sin hacerte adivinar. Incluso montados a pocos centímetros de la pared de un dormitorio, permiten lograr mezclas que se trasladan bien a equipos grandes. Antes de comprar, conoce su grave generoso y contrasta los bajos en auriculares. Hecho para estudios caseros pequeños que necesitan una monitorización flexible y que perdone.</p>"
  },
  // Sección 4: Yamaha HS8
  4: {
    content_es: "<p><strong>Cuando una mezcla debe sobrevivir a cualquier equipo, los ingenieros recurren a los honestos conos blancos.</strong> El HS8 hereda el espíritu sin contemplaciones del legendario NS-10: si suena bien aquí, suena bien en todas partes. Su woofer de 8 pulgadas con cono de Kevlar baja con autoridad sin subwoofer, mientras el tweeter de cúpula de 1 pulgada mantiene los agudos limpios y los controles de sala recortan la respuesta para colocaciones difíciles. Las mezclas terminadas en estos suelen pasar las pruebas de coche y móvil sin revisiones. Antes de comprar, mide bien tu mesa y la distancia a la pared, porque una caja de 8 pulgadas satura una sala pequeña enseguida. Hecho para quien mezcla y quiere que sus mezclas se trasladen antes que el halago.</p>"
  },
};

// Aplicar correcciones
let applied = 0;
Object.keys(fixes).forEach(key => {
  const sectionNum = parseInt(key);
  if (g.sections[sectionNum]) {
    g.sections[sectionNum].content_es = fixes[key].content_es;
    console.log('Sección ' + sectionNum + ': Focal Shape 65/Kali/LP-6/etc - Corregido');
    applied++;
  }
});

fs.writeFileSync(path, JSON.stringify(obj, null, 2));
console.log('Total correcciones aplicadas: ' + applied);