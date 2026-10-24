const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let c = fs.readFileSync(path, 'utf8');
let obj = JSON.parse(c);
const g = obj.find(x => x.id === 'best-monitors');

if (!g) {
  console.log('Guía best-monitors NO encontrada');
  process.exit(1);
}

// featuredProducts orden correcto: JBL → Focal
g.featuredProducts = [116, 117, 20, 19, 21, 199, 303, 305, 331, 304, 307, 1054];

// Secciones 1-12
g.sections[1] = {
  heading: "JBL 305P MkII: Compact Nearfield Mixing",
  heading_es: "JBL 305P MkII: Mezcla de campo cercano compacta",
  content: "<p><strong>The JBL 305P MkII is one of the most popular budget studio monitors in existence, and for good reason.</strong> JBL's patented Image Control Waveguide creates a remarkably wide sweet spot, so you don't need to glue your head in one spot to hear the stereo image. The 5-inch woofer with JBL's Slip Stream port delivers tight, accurate bass in any room. At under $300 a pair, nothing else delivers this much soundstage and detail for the money. Before buying, note the bass rolls off around 49 Hz, so bass-heavy genres may want a subwoofer. For the price, it is the benchmark.</p>",
  content_es: "<p><strong>El JBL 305P MkII es uno de los monitores de estudio económicos más populares que existen, y con razón.</strong> La guía de onda Image Control patentada de JBL crea un punto óptimo notablemente amplio, así que no necesitas mantener la cabeza fija para escuchar la imagen estéreo. El woofer de 5 pulgadas con el puerto Slip Stream de JBL entrega graves ajustados y precisos en cualquier habitación. Por menos de $300 el par, nada más entrega esta imagen estéreo y detalle por el precio. Antes de comprar, ten en cuenta que los graves bajan hasta 49 Hz, así que géneros con mucho bajo pueden querer un subwoofer. Por el precio, es el referente.</p>",
  products: [116]
};
g.sections[2] = {
  heading: "Kali Audio LP-6 V2: Boundary EQ for Any Room",
  heading_es: "Kali Audio LP-6 V2: Boundary EQ para cualquier habitación",
  content: "<p><strong>Kali Audio was founded by former JBL engineers who wanted to push budget monitoring even further.</strong> The LP-6 V2 is the result — a 6.5-inch monitor with boundary EQ compensation that corrects for your room's bass problems. Dip switches on the back let you tell the speaker where it's placed (on a desk, near a wall, in a corner) and the DSP adjusts accordingly. No other monitor offers this level of room correction at this price. The bass extension goes surprisingly deep for a 6.5-inch driver, and the overall balance is natural and unhyped. At $398 a pair, these monitors redefine what 'budget' can deliver.</p>",
  content_es: "<p><strong>Kali Audio fue fundada por antiguos ingenieros de JBL que querían llevar la monitorización económica aún más lejos.</strong> El LP-6 V2 es el resultado — un monitor de 6,5 pulgadas con ecualización Boundary que compensa los problemas de graves de tu habitación. Los interruptores DIP en la parte trasera te permiten indicarle al altavoz dónde está colocado (en un escritorio, cerca de una pared, en una esquina) y el DSP se ajusta en consecuencia. Ningún otro monitor ofrece este nivel de corrección de sala por este precio. La extensión de graves es sorprendentemente profunda para un driver de 6,5 pulgadas, y el balance general es natural y sin exageraciones. Estos monitores redefinen lo que puede ofrecer la gama económica.</p>",
  products: [117]
};
g.sections[3] = {
  heading: "KRK Rokit 7 G5: Generous Bass for Home Studios",
  heading_es: "KRK Rokit 7 G5: Graves generosos para home studios",
  content: "<p><strong>Bedroom producers keep buying this monitor because it bends to fit awkward rooms.</strong> Kevlar drivers stay clear and punchy through the mids, the front-firing bass port breathes even close to a wall, and the DSP-driven EQ with room correction retunes the speaker to your desk instead of fighting it. That onboard processing is the standout: tell it where the speaker sits and it compensates rather than leaving you guessing. Setups inches from a bedroom wall still produce mixes that travel to bigger systems. Before buying, learn its generous low end and cross-check bass on headphones. Made for small home studios that need flexible, forgiving monitoring.</p>",
  content_es: "<p><strong>Los productores en casa siguen comprando este monitor porque se adapta a habitaciones difíciles.</strong> Los drivers de Kevlar se mantienen claros y contundentes en los medios, el puerto de graves frontal responde aunque esté pegado a la pared, y el ecualizador DSP con corrección de sala adapta el altavoz a tu escritorio en vez de pelearse con él. Ese procesamiento interno es lo que lo distingue: le dices dónde está colocado y compensa sin hacerte adivinar. Incluso montados a pocos centímetros de la pared de un dormitorio, permiten lograr mezclas que se trasladan bien a equipos grandes. Antes de comprar, conoce su grave generoso y contrasta los bajos en auriculares. Hecho para estudios caseros pequeños que necesitan una monitorización flexible y que perdone.</p>",
  products: [20]
};
g.sections[4] = {
  heading: "Yamaha HS8: The Honest Standard That Translates Your Mixes",
  heading_es: "Yamaha HS8: El estándar honesto que traducen tus mezclas",
  content: "<p><strong>When a mix has to survive every playback system, engineers reach for the honest white cones.</strong> The HS8 inherits the no-nonsense spirit of the legendary NS-10: if it sounds right here, it sounds right everywhere. Its 8-inch Kevlar-coated woofer digs genuinely deep without a subwoofer, while the 1-inch dome tweeter keeps highs clean and the room-control switches trim the response for tricky placement. Mixes finished on these often need zero revisions after car and phone checks. Before buying, measure your desk and wall distance carefully, since an 8-inch box energizes small rooms fast. Built for mixers who want translation confidence above flattery.</p>",
  content_es: "<p><strong>Cuando una mezcla debe sobrevivir a cualquier equipo, los ingenieros recurren a los honestos conos blancos.</strong> El HS8 hereda el espíritu sin contemplaciones del legendario NS-10: si suena bien aquí, suena bien en todas partes. Su woofer de 8 pulgadas con cono de Kevlar baja con autoridad sin subwoofer, mientras el tweeter de cúpula de 1 pulgada mantiene los agudos limpios y los controles de sala recortan la respuesta para colocaciones difíciles. Las mezclas terminadas en estos suelen pasar las pruebas de coche y móvil sin revisiones. Antes de comprar, mide bien tu mesa y la distancia a la pared, porque una caja de 8 pulgadas satura una sala pequeña enseguida. Hecho para quien mezcla y quiere que sus mezclas se trasladen antes que el halago.</p>",
  products: [19]
};
g.sections[5] = {
  heading: "Adam Audio A7V: X-ART Ribbon Detail for Micro-Detail",
  heading_es: "Adam Audio A7V: Detalle de cinta X-ART para microdetalle",
  content: "<p><strong>Detail lives in the transients, and that is exactly where this monitor hunts.</strong> The handmade X-ART tweeter is a folded ribbon that squeezes air like an accordion instead of pushing it like a dome, so attacks start faster and stereo placement snaps into focus with a three-dimensional feel. Beneath it, the 7-inch woofer and tuned port deliver deep, controlled bass that belies the cabinet size. A track mixed on these reveals breaths and reverb tails easily missed on main monitors. Before buying, plan for careful positioning and a little break-in time, since revealing monitors punish bad placement. Made for critical mixers chasing imaging and micro-detail.</p>",
  content_es: "<p><strong>El detalle vive en los transitorios, y justo ahí es donde brilla este monitor.</strong> El tweeter X-ART hecho a mano es una cinta plegada que exprime el aire como un acordeón en vez de empujarlo como una cúpula, así los ataques arrancan más rápido y la colocación estéreo se enfoca con sensación tridimensional. Debajo, el woofer de 7 pulgadas con puerto sintonizado ofrece graves profundos y controlados que sorprenden para el tamaño de la caja. Un tema mezclado en estos revela respiraciones y colas de reverb que pasan desapercibidas en los monitores principales. Antes de comprar, cuenta con una colocación cuidadosa y algo de rodaje, porque un monitor revelador castiga la mala posición. Hecho para quien mezcla al detalle y persigue imagen y microdetalle.</p>",
  products: [21]
};
g.sections[6] = {
  heading: "Kali Audio IN-8 V2: True 3-Way Coaxial Studio Monitor",
  heading_es: "Kali Audio IN-8 V2: Monitor coaxiual 3 vías de estudio",
  content: "<p><strong>Kali's IN-8 V2 is the 3-way coaxial monitor for critical mixing.</strong> It's a true 3-way design: an 8-inch woofer handles the low end while a 4-inch midrange driver with a 1-inch tweeter sits coaxially in its center. That coaxial point source is the magic — it places the mid and high drivers on the same acoustic axis, so you get pinpoint stereo imaging and phase coherence you don't get from standard two-ways. Each driver is powered by its own module in a 140W tri-amped system, which means clean headroom and ruler-flat response without any driver doing double duty. The low-noise port tube keeps bass punchy without chuffing. At $858 a pair, it's the most accurate monitor and the gateway to genuine pro reference accuracy.</p>",
  content_es: "<p><strong>El Kali Audio IN-8 V2 es el monitor de estudio con subwoofer compacto de 8 pulgadas y ecualización DSP de 100W de potencia.</strong> Un verdadero diseño de 3 vías: un woofer de 8 pulgadas se encarga de los graves mientras que un driver de rango medio de 4 pulgadas con un tweeter de 1 pulgada se sitúa coaxialmente en su centro. Esa fuente puntual coaxial es la magia — coloca los drivers de medios y agudos en el mismo eje acústico, ofreciendo imagen estéreo de precisión y coherencia de fase que simplemente no se consiguen con diseños de dos vías. Cada driver lo alimenta su propio módulo en un sistema triamplificado de 140 W, con headroom limpio y respuesta ultraplana sin que ningún driver trabaje de más. El puerto de baja turbulencia mantiene los graves contundentes sin ruido. Es el monitor más preciso de esta guía y la vía de entrada a la verdadera precisión de referencia profesional.</p>",
  products: [199]
};
g.sections[7] = {
  heading: "Genelec 8010A: Ultra-Compact Reference Monitor",
  heading_es: "Genelec 8010A: Monitor de referencia ultracompacto",
  content: "<p><strong>The Genelec 8010A proves that reference-grade monitoring does not need a big box.</strong> This 3-inch nearfield delivers the same die-cast aluminum build and ±2.5 dB accuracy as Genelec's larger monitors in a package that fits anywhere. The ISS auto-standby cuts power when you step away, and the sealed enclosure keeps resonances out of the sound. Genelec's unit-to-unit consistency means what you hear on your pair matches what you hear in any other 8010A-equipped studio.</p>",
  content_es: "<p><strong>El Genelec 8010A demuestra que la monitorización de referencia no necesita una caja grande.</strong> Este monitor de 3 pulgadas ofrece la misma construcción de aluminio fundido y precisión de ±2,5 dB que los monitores más grandes de Genelec en un paquete que cabe en cualquier sitio. El ISS auto-standby corta la energía cuando te alejas, y el caja sellado mantiene las resonancias a raya. La consistencia entre unidades de Genelec significa que lo que escuchas en tu par coincide con lo que escuchas en cualquier otro estudio equipado con 8010A.</p>",
  products: [303]
};
g.sections[8] = {
  heading: "Neumann KH 80 DSP: DSP-Corrected Precision Monitor",
  heading_es: "Neumann KH 80 DSP: Monitor de precisión con corrección DSP",
  content: "<p><strong>The Neumann KH 80 DSP is the most technically ambitious monitor in this guide.</strong> A 4-inch nearfield with the MMD waveguide from Neumann's 800 series and DSP that lets you tune the response to your room. With the MA 1 measurement microphone it auto-corrects itself in minutes, flattening the response at your listening position. The most effective fix for room problems short of acoustic treatment.</p>",
  content_es: "<p><strong>El Neumann KH 80 DSP es el monitor técnicamente más ambicioso de esta guía.</strong> Un nearfield de 4 pulgadas con la guía de ondas MMD de la serie 800 de Neumann y DSP que te permite ajustar la respuesta a tu sala. Con el micrófono de medición MA 1 se calibra solo en minutos, dejando plana la respuesta en tu posición de escucha: la solución más efectiva para los problemas de sala además del tratamiento acústico.</p>",
  products: [305]
};
g.sections[9] = {
  heading: "Genelec 8351B: Coaxial Master Reference Monitor",
  heading_es: "Genelec 8351B: Monitor de referencia coaxial master",
  content: "<p><strong>The Genelec 8351B is the endgame monitor of this guide.</strong> A three-way coaxial point source that adapts itself to your room. Two Acoustically Concealed Woofers work through slots at the enclosure edges while the Minimum Diffraction Coaxial driver places a 5-inch midrange and 1-inch metal-dome tweeter on the same axis, all driven by 550W of Class D power (250W + 150W + 150W). GLM AutoCal calibration tunes the response to your space, delivering 38 Hz to 20 kHz within ±1.5 dB and 113 dB short-term output.</p>",
  content_es: "<p><strong>El Genelec 8351B es el monitor definitivo de esta guía.</strong> Un monitor finlandés de 3 vías coaxial de fuente puntual con woofers acústicamente ocultos, driver coaxial de mínima difracción y calibración DSP GLM de sala.</p>",
  products: [331]
};
g.sections[10] = {
  heading: "Kali Audio IN-UNF: Ultra-Nearfield Desktop System",
  heading_es: "Kali Audio IN-UNF: Sistema ultra-nearfield de escritorio",
  content: "<p><strong>The Kali IN-UNF is the only system in this guide designed for ultra-nearfield desktop use.</strong> A bass unit with two opposed 4.5-inch woofers sits on your desk while coaxial satellites put a 4-inch midrange and 1-inch tweeter at ear level, all powered by 320W of Class D (100W per woofer channel, 60W per satellite channel). The result is 47 Hz to 21 kHz within ±3 dB with 103 dB peaks at 0.8 meters — real bass with no subwoofer and none of the room modes a traditional monitor excites. USB-C, optical and TRS inputs pairs cover computer, console and interface sources.</p>",
  content_es: "<p><strong>El Kali Audio IN-UNF es el único sistema de esta guía diseñado para uso ultra-nearfield de escritorio.</strong> Una unidad de graves con dos woofers opuestos de 4,5 pulgadas se coloca sobre tu escritorio mientras los satélites coaxiales sitúan un medio de 4 pulgadas y un tweeter de 1 pulgada a la altura de los oídos. Esa geometría fija la imagen estéreo y elimina las reflexiones tempranas de la mesa que emborronan el sonido en monitores convencionales. El DSP integrado aplica ecualización Borderline según la colocación, así que el grave se mantiene controlado incluso con la unidad de graves pegada a la pared.</p>",
  products: [304]
};
g.sections[11] = {
  heading: "Kali Audio LP-UNF: Compact Desktop Monitor Pair",
  heading_es: "Kali Audio LP-UNF: Par de monitores compactos de escritorio",
  content: "<p><strong>The Kali Audio LP-UNF is the smallest serious monitoring pair in this guide.</strong> A compact powered nearfield monitor designed to sit close to walls and screens, with a 4.5-inch woofer and 1-inch dome tweeter in a front-ported cabinet. Borderline EQ adapts to desktop placement.</p>",
  content_es: "<p><strong>El Kali Audio LP-UNF es el par de monitoreo profesional más pequeño de esta guía.</strong> Cada lado monta un woofer de 4,5 pulgadas de larga excursión y una cúpula textil de 1 pulgada en una caja con puerto frontal que puedes colocar contra la pared, con guía de onda 3-D que amplía el punto óptimo del sonido y adaptador de cruce activo para graves profundos.</p>",
  products: [307]
};
g.sections[12] = {
  heading: "Focal Shape 65: Nearfield Monitor for Small Rooms",
  heading_es: "Focal Shape 65: Monitor de campo cercano para salas pequeñas",
  content: "<p><strong>The Focal Shape 65 skips the traditional bass-reflex port entirely.</strong> Instead, it uses two passive radiators mounted laterally, so you can place it close to a wall without booming. The cone Flax of 6.5-inch offers graves bajos naturales y precisos, and the tweeter de cúpula invertida de 1 pulgada maneja los agudos con precisión y sin aspereza. La amplificación Clase AB mantiene el sonido musical y sin fatiga durante largas sesiones de mezcla.</p>",
  content_es: "<p><strong>El Focal Shape 65 prescinde del puerto bass-reflex tradicional.</strong> Prescinde del puerto bass-reflex tradicional, usando en su lugar dos radiadores pasivos laterales. Eso significa que puedes colocarlo justo contra una pared sin que los graves se vuelvan retumbantes o descontrolados, una ventaja real en salas pequeñas y escritorios. El woofer de cono Flax de 6,5 pulgadas ofrece graves bajos naturales y precisos con el carácter orgánico por el que Focal es conocida, mientras que el tweeter de cúpula invertida de 1 pulgada maneja los agudos con precisión y sin aspereza. La amplificación Clase AB mantiene el sonido musical y sin fatiga durante largas sesiones de mezcla.</p>",
  products: [1054]
};

fs.writeFileSync(path, JSON.stringify(obj, null, 2));
console.log('guides.json guardado. Verificación:');
for(let i=1; i<=12; i++) {
  const s = g.sections[i];
  console.log('Sección ' + i + ': ' + s.heading_es + ' -> id ' + s.products[0]);
}
console.log('featuredProducts:', g.featuredProducts.join(','));