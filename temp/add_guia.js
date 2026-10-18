const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rutaG = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rutaG, 'utf8'));
const base = guides.find(x => x.id === 'budget-monitors');

const P = { ERIS35: 1042, BX4: 1043, MR3: 1044, E45: 1045, CR35: 1046, R1280T: 1047, CR45: 1048 };

const guia = {
  id: 'best-home-studio-speakers',
  title: 'Best Home Studio Speakers Under $150 With Balanced Frequency Response',
  title_es: 'Mejores monitores de estudio doméstico por menos de $150 con respuesta equilibrada',
  titleTag_es: 'Mejores monitores de estudio doméstico por menos de $150',
  category: 'monitors',
  image: '',
  badge: 'bestSeller',
  intro: 'Under $150 for the pair, every monitor here is telling you something slightly different about your mix. We measured what actually changes at this budget and what does not.',
  intro_es: 'Por debajo de $150 el par, cada monitor te está diciendo algo ligeramente distinto sobre tu mezcla. Medimos lo que de verdad cambia en este presupuesto y lo que no.',
  sections: [
    {
      heading: 'What "Balanced Response" Actually Means Under $150',
      heading_es: 'Lo que significa de verdad "respuesta equilibrada" por debajo de $150',
      content: '<p><strong>No monitor under $150 is flat, and any guide that tells you otherwise is selling you something.</strong> Manufacturers publish a frequency range and often omit the attenuation, which is where the useful information usually sits. A speaker listed as 80 Hz to 20 kHz without a dB figure is claiming audible output at 80 Hz, which almost nothing this size actually delivers cleanly.</p><p><strong>The number that matters is the one with a dB attached.</strong> The PreSonus Eris E4.5 is quoted at 55 Hz to 20 kHz. The Mackie CR4.5 reaches 55 Hz. The JBL 104-BT is 60 Hz at minus 10 dB but 88 Hz at minus 3 dB, and that six-decibel gap is the difference between a speaker that produces bass and one that produces bass you can mix against.</p><p><strong>Below about 50 Hz, nothing in this price range is a mixing tool.</strong> Every pair here will stop short of the sub-bass that electronic and hip-hop production depends on. If that matters to your genre, the honest fix is a subwoofer later, not a bigger speaker now.</p><p><strong>What you do get at this budget is tone control, not perfection.</strong> Two pairs here let you trim the low end and high end; three let you flip a switch and change voicing entirely. That matters far more than the last decibel of extension, because a untreated bedroom is doing more damage to your low end than the speaker is.</p>',
      content_es: '<p><strong>Ningún monitor por debajo de $150 es plano, y cualquier guía que te diga lo contrario te está vendiendo algo.</strong> Los fabricantes publican un rango de frecuencia y a menudo omiten la atenuación, que es justo donde suele estar la información útil. Un altavoz que lista 80 Hz a 20 kHz sin cifra en dB está afirmando que tiene salida audible a 80 Hz, y casi nada de este tamaño lo entrega limpiamente.</p><p><strong>El número que importa es el que lleva los dB al lado.</strong> El PreSonus Eris E4.5 está citado como 55 Hz a 20 kHz. El Mackie CR4.5 llega a 55 Hz. El JBL 104-BT da 60 Hz a menos 10 dB pero 88 Hz a menos 3 dB, y esos seis decibelios son la diferencia entre un altavoz que produce graves y uno que produce graves con los que puedes mezclar.</p><p><strong>Por debajo de unos 50 Hz, nada de este rango es una herramienta de mezcla.</strong> Todos los pares de aquí se quedan cortos del subgrave del que dependen la producción electrónica y el hip-hop. Si eso importa en tu género, la solución honesta es un subgrave más adelante, no un altavoz más grande ahora.</p><p><strong>Lo que sí consigues a este presupuesto es control de tono, no perfección.</strong> Dos pares de esta lista te dejan ajustar graves y agudos; tres te permiten cambiar el voicing con un conmutador. Eso importa mucho más que el último decibelio de extensión, porque un dormitorio sin tratar está haciendo más daño en tu grave que el propio altavoz.</p>',
      products: []
    },
    {
      heading: 'Is the PreSonus Eris E4.5 the Best Monitor Under $150?',
      heading_es: '¿Es el PreSonus Eris E4.5 el mejor monitor por debajo de $150?',
      content: '<p><strong>This is the one to buy if you want to mix rather than just listen.</strong> A 4.5-inch woven glass-fibre composite woofer sits behind the EBM waveguide that PreSonus developed for its higher-end models, giving 120 degrees of horizontal coverage but only 60 vertically, which is deliberate: it keeps desk reflections out of the mix position without making the stereo image mushy.</p><p><strong>The inputs are the real headline.</strong> Balanced XLR and quarter-inch TRS alongside RCA means you can run this straight into a professional interface with no adaptor, at $139.99 the pair. Almost nothing else at this price offers true balanced connectivity.</p><p><strong>50W of Class AB bi-amplification</strong> behind both drivers is enough headroom to mix at a sensible level without the thin, strained quality that Class D designs give you at low volumes. Foam feet are included in the box, which is not something you can say for most of this bracket.</p><p><strong>The trade-off:</strong> at 55 Hz it will not tell you anything about the sub-bass, and there is no Bluetooth, so it is a wired monitor and nothing else. If your room is untreated, the waveguide will faithfully reproduce every early reflection your desk is producing. That is honest, not helpful, unless you fix the room first.</p>',
      content_es: '<p><strong>Este es el que compras si quieres mezclar y no solo escuchar.</strong> Un woofer de 4,5 pulgadas de fibra de vidrio trenzada va montado detrás de la guía de ondas EBM que PreSonus desarrolló para sus modelos superiores, con 120 grados de cobertura horizontal pero solo 60 en vertical, y es deliberado: mantiene las reflexiones del escritorio fuera de la posición de mezcla sin embarrar la imagen estéreo.</p><p><strong>Las entradas son la verdadera protagonista.</strong> XLR y TRS de 1/4 de pulgada balanceadas junto a RCA, así que puedes conectarlo directamente a una interfaz profesional sin adaptadores, por $139.99 el par. Casi nada más en este precio ofrece conectividad balanceada real.</p><p><strong>50 W bi-amplificados en Clase AB</strong> detrás de cada driver dan margen suficiente para mezclar a un nivel sensato sin esa cualidad fina y forzada que dan los diseños Clase D a volúmenes bajos. Los pies de espuma vienen en la caja, cosa que no puedes decir de la mayoría de esta categoría.</p><p><strong>La contrapartida:</strong> a 55 Hz no te va a decir nada del subgrave, y no tiene Bluetooth, así que es un monitor cableado y nada más. Si tu sala está sin tratar, la guía de ondas reproducirá fielmente cada reflexión temprana que produce tu escritorio. Eso es honesto, no útil, salvo que arregles la sala primero.</p>',
      products: [P.E45]
    },
    {
      heading: 'Is the Mackie CR4.5 the Best Value Monitor Under $150?',
      heading_es: '¿Es el Mackie CR4.5 el monitor con mejor relación calidad-precio por debajo de $150?',
      content: '<p><strong>A 4.5-inch woofer reaching 55 Hz for $129.99 is the deepest bass available new at this budget, and it beats the M-Audio BX4 that costs ten dollars more.</strong> Fifty watts RMS of Class A/B bi-amplification, a woven woofer and a silk dome, in a cabinet that is MDF rather than plastic.</p><p><strong>The tone knob is unusual at this price and genuinely useful.</strong> Turned fully counter-clockwise it gives a flat studio reference. Rotate it right and it progressively adds bass lift and high-end sparkle, which is where it earns its keep: the same pair can mix your track at nine at night and play it back at a party without a second system.</p><p><strong>The location switch is the clever part.</strong> It flips the voicing between desktop nearfield and bookshelf, correcting for the fact that a speaker pushed against a wall on a desk sounds nothing like one two metres away on a stand. No other pair in this guide does that with a switch.</p><p><strong>The trade-off:</strong> the tone knob is a continuous tone control, not a calibrated room correction, so you are eyeballing the curve rather than dialling in a known value. There is no Bluetooth and no isolation pads in the box, which is where the Mackie CR3.5 wins instead.</p>',
      content_es: '<p><strong>Un woofer de 4,5 pulgadas que llega a 55 Hz por $129.99 es el grave más profundo disponible nuevo en este presupuesto, y le gana al M-Audio BX4 que cuesta diez dólares más.</strong> Cincuenta vatios RMS bi-amplificados en Clase A/B, un woofer de tejido y una cúpula de seda, en un gabinete de MDF y no de plástico.</p><p><strong>El knob de tono es raro a este precio y realmente útil.</strong> Girado del todo a la izquierda da una referencia plana de estudio. Al girarlo a la derecha añade progresivamente refuerzo de graves y brillo en agudos, que es donde gana su sitio: el mismo par puede mezclar tu tema a las nueve de la noche y sonarlo en una fiesta sin un segundo sistema.</p><p><strong>El conmutador de ubicación es la parte ingeniosa.</strong> Alterna el voicing entre escritorio y estantería, corrigiendo el hecho de que un altavoz pegado a la pared del escritorio suena muy distinto de otro a dos metros sobre un soporte. Ningún otro par de esta guía hace eso con un conmutador.</p><p><strong>La contrapartida:</strong> el knob de tono es un control continuo, no una corrección de sala calibrada, así que estás estimando la curva a ojo en lugar de fijar un valor conocido. No tiene Bluetooth ni pads de aislamiento en la caja, que es donde el Mackie CR3.5 gana en su lugar.</p>',
      products: [P.CR45]
    },
    {
      heading: 'Is the PreSonus Eris 3.5 2nd Gen Still the Best-Budget Monitor?',
      heading_es: '¿Sigue siendo el PreSonus Eris 3.5 2nd Gen el mejor monitor 품질-precio?',
      content: '<p><strong>The reason this one still tops the budget charts is the rear panel, not the drivers.</strong> Three and a half inch woven composite woofer, one-inch silk dome, 50W of Class AB amplification and a crossover at 2.8 kHz, with a quoted range of 80 Hz to 20 kHz. That is all fine. What makes it stand out is a High Frequency trim of plus or minus 6 dB centred at 10 kHz and a Low Frequency trim of plus or minus 6 dB centred at 100 Hz, both continuously variable.</p><p><strong>Defined centres are the whole point.</strong> Almost every rival in this guide offers a tone control but will not tell you where it acts. Knowing the Eris cuts and boosts around 100 Hz and 10 kHz means you can actually compensate for the boundary effect of a desk pushed against a wall, instead of guessing.</p><p><strong>Balanced quarter-inch TRS and RCA, plus a front Aux input</strong> for your phone, and a headphone jack that mutes the speakers properly rather than running them and the cans at once. Studio One Prime and a bundle of plug-ins come with it, which matters to a beginner more than it does to an engineer.</p><p><strong>The trade-off:</strong> at $99.99 for the pair it is the least expensive option here and also the one that gives away the most low end. If you are mixing anything with a bass part, the extra thirty dollars for the Eris E4.5 buys you a 4.5-inch driver instead of a 3.5-inch one, and that is a more meaningful upgrade than any specification on this page.</p>',
      content_es: '<p><strong>La razón por la que este sigue cabezonear las tablas de presupuesto es el panel trasero, no los drivers.</strong> Woofer de 3,5 pulgadas de compuesto trenzado, cúpula de seda de 1 pulgada, 50 W de amplificación Clase AB y un cruce en 2,8 kHz, con un rango citado de 80 Hz a 20 kHz. Todo eso está bien. Lo que le hace destacar es un ajuste de agudos de ±6 dB centrado en 10 kHz y uno de graves de ±6 dB centrado en 100 Hz, ambos variables de forma continua.</p><p><strong>Que los centros estén definidos es justamente el punto.</strong> Casi todos los rivales de esta guía ofrecen un control de tono pero no te dicen dónde actúa. Saber que los Eris cortan y realzan alrededor de 100 Hz y 10 kHz significa que puedes compensar de verdad el efecto de proximidad de un escritorio pegado a la pared, en lugar de adivinar.</p><p><strong>TRS de 1/4 balanceada y RCA, más entrada Aux frontal</strong> para el móvil y una salida de auriculares que silencia los altavoces en lugar de hacer sonar los dos a la vez. Trae Studio One Prime y un lote de plug-ins, lo que a un principiante le importa más que a un ingeniero.</p><p><strong>La contrapartida:</strong> a $99.99 por el par es la opción más barata de esta lista y también la que más graves regala. Si vas a mezclar algo con una parte de bajo, los treinta dólares extra por el Eris E4.5 te compran un driver de 4,5 pulgadas en lugar de uno de 3,5, y esa es una mejora más significativa que cualquier especificación de esta página.</p>',
      products: [P.ERIS35]
    },
    {
      heading: 'Is the M-Audio BX4 the Best Monitor With Foam Pads?',
      heading_es: '¿Es el M-Audio BX4 el mejor monitor con pies de espuma?',
      content: '<p><strong>The M-Audio BX4 is the pick if your desk is the problem.</strong> Four and a half inch Black Kevlar woofer, one-inch natural silk dome, 69 Hz to 22 kHz, and 120W of peak power split as two times 25W RMS, with a computer-optimised tweeter waveguide for imaging.</p><p><strong>What matters here is the High-EQ and Low-EQ pair on the rear panel, plus the fact that foam feet ship in the box.</strong> Every pair in this guide can be isolated; only two of them hand you the isolation. Decoupling the cabinets from a hollow desk removes a low-mid resonance that sits right in the range where guitar and bass fundamentals live, and it costs nothing once you have the pads.</p><p><strong>At $139.00 it is the joint-second most expensive pair here</strong> and it does not reach as low as the Mackie CR4.5 at $129.99. You are paying roughly ten dollars for the isolation hardware and the Kevlar cone.</p><p><strong>The trade-off:</strong> no Bluetooth, no balanced XLR, RCA and TRS only, and at this price the M-Audio BX4BT with Bluetooth exists for about $157, which pushes it out of this guide. If you want Kevlar and Bluetooth, the Edifier MR3 gives you Bluetooth at half the price, with a smaller driver.</p>',
      content_es: '<p><strong>El M-Audio BX4 es la elección si tu escritorio es el problema.</strong> Woofer de 4,5 pulgadas de Kevlar negro, cúpula de seda natural de 1 pulgada, de 69 Hz a 22 kHz y 120 W de potencia pico repartidos en 2 x 25 W RMS, con una guía de onda del tweeter optimizada por ordenador para la imagen.</p><p><strong>Lo que importa aquí es el par de ajustes High-EQ y Low-EQ del panel trasero, más el hecho de que los pies de espuma vienen en la caja.</strong> Todos los pares de esta guía se pueden aislar; solo dos te dan el aislamiento. Desacoplar los gabinetes de un escritorio hueco elimina una resonancia de medios-grave que cae justo donde viven los fundamentales de guitarra y bajo, y no cuesta nada una vez tienes los pies.</p><p><strong>A $139.00 es el segundo más caro de esta lista junto a otro</strong> y no llega tan bajo como el Mackie CR4.5 a $129.99. Estás pagando unos diez dólares por el aislamiento y el cono de Kevlar.</p><p><strong>La contrapartida:</strong> sin Bluetooth y sin XLR balanceado, solo RCA y TRS, y a este precio el M-Audio BX4BT con Bluetooth cuesta unos $157, lo que lo saca de esta guía. Si quieres Kevlar y Bluetooth, el Edifier MR3 te da Bluetooth a mitad de precio, con un driver más pequeño.</p>',
      products: [P.BX4]
    },
    {
      heading: 'Is the Mackie CR3.5 the Best Compact Monitor Under $100?',
      heading_es: '¿Es el Mackie CR3.5 el mejor monitor compacto por debajo de $100?',
      content: '<p><strong>This is the pair to buy if your desk is small and your room is untreated, and it is the only one here that ships with isolation pads at ninety-nine dollars.</strong> Three and a half inch woven woofer, silk dome tweeter, 50W RMS of Class A/B bi-amplification.</p><p><strong>The front-panel tone knob is the reason to choose it over the PreSonus Eris 3.5 2nd Gen.</strong> At full counter-clockwise you get a flat reference; rotate right and it moves towards a warmer, more coloured sound. The rear location switch flips voicing between desktop and bookshelf. Between them, you have more adjustment in two fingers than the Eris gives you with two knobs.</p><p><strong>TRS, RCA and 3.5mm inputs, front headphone output,</strong> and pads in the box. The Bluetooth version exists and is very good, but on Amazon it sits at $159.99, which puts it outside this guide entirely.</p><p><strong>The trade-off:</strong> no Bluetooth on the wired version, and roughly 80 Hz of bass extension means this is a checking-and-editing monitor, not a mixing monitor. If your material has real low end, spend the extra thirty dollars on the PreSonus Eris E4.5 or the Mackie CR4.5 and get a 4.5-inch driver instead.</p>',
      content_es: '<p><strong>Este es el par que compras si tu escritorio es pequeño y tu sala está sin tratar, y es el único de esta lista que incluye pads de aislamiento por noventa y nueve dólares.</strong> Woofer de 3,5 pulgadas de tejido, cúpula de seda, 50 W RMS bi-amplificados en Clase A/B.</p><p><strong>El knob frontal de tono es la razón para elegirlo antes que el PreSonus Eris 3.5 2nd Gen.</strong> Del todo a la izquierda tienes una referencia plana; al girarlo a la derecha se mueve hacia un sonido más cálido y coloreado. El conmutador de ubicación trasero alterna el voicing entre escritorio y estantería. Entre los dos tienes más ajuste con dos dedos de los que el Eris te da con dos potenciómetros.</p><p><strong>Entradas TRS, RCA y 3,5 mm, salida de auriculares frontal</strong> y pads incluidos. La versión con Bluetooth existe y es muy buena, pero en Amazon está a $159.99, lo que la deja fuera de esta guía por completo.</p><p><strong>La contrapartida:</strong> la versión cableada no tiene Bluetooth, y unos 80 Hz de extensión significan que esto es un monitor de comprobación y edición, no de mezcla. Si tu material tiene graves de verdad, gasta treinta dólares más en el PreSonus Eris E4.5 o el Mackie CR4.5 y llévate un driver de 4,5 pulgadas.</p>',
      products: [P.CR35]
    },
    {
      heading: 'Is the Edifier MR3 the Most Capable Monitor Under $100?',
      heading_es: '¿Es el Edifier MR3 el monitor más completo por debajo de $100?',
      content: '<p><strong>At $99.99 the Edifier MR3 is the most capable pair per dollar here, and it is not close.</strong> Thirty-six hundred reviews, over a thousand bought in the past month, and for that money you get a balanced quarter-inch TRS input and Bluetooth 5.4 in the same pair of speakers.</p><p><strong>Everything else in the bracket takes one side of that trade.</strong> The Mackie CR3.5 has the Bluetooth in its own $159.99 version. The PreSonus Eris 3.5 2nd Gen has the balanced TRS but no wireless. The Edifier MR3 has both, plus RCA and AUX, a front headphone output, and a Hi-Res Audio 24-bit/96 kHz front end that runs the signal path bit-perfect.</p><p><strong>Room compensation lives in the Edifier ConneX app,</strong> alongside EQ presets and a sound-effects switch, and the 3.5-inch mid-low driver runs from 52 Hz with a dimpled tweeter waveguide that smooths the top end. Eighteen watts RMS per side is modest power, but at desktop distances that is not the limiting factor.</p><p><strong>The trade-off:</strong> the app is where the room correction lives, so if you do not want to deal with a phone application, you are giving up the feature that separates it from everything else in this list. It is also a 3.5-inch driver, so it shares the bass ceiling of the other compact pairs here.</p>',
      content_es: '<p><strong>A $99.99 el Edifier MR3 es el par más completo por euro de esta lista, y ni de lejos.</strong> Tres mil seiscientas reseñas, más de mil unidades compradas en el último mes, y por ese dinero tienes entrada TRS balanceada de 1/4 de pulgada y Bluetooth 5.4 en el mismo par de altavoces.</p><p><strong>Todo lo demás en esta categoría se queda con un lado de ese trato.</strong> El Mackie CR3.5 tiene el Bluetooth en su propia versión de $159.99. El PreSonus Eris 3.5 2nd Gen tiene la TRS balanceada pero nada inalámbrico. El Edifier MR3 tiene las dos, además de RCA y AUX, salida de auriculares frontal y un frontal Hi-Res Audio de 24 bits/96 kHz que mantiene la señal intacta.</p><p><strong>La compensación de sala vive en la app Edifier ConneX,</strong> junto a los presets de EQ y un conmutador de efectos, y el driver medio-grave de 3,5 pulgadas baja desde 52 Hz con una guía de onda del tweeter con hoyuelos que suaviza la zona alta. Dieciocho vatios RMS por lado es potencia modesta, pero a distancia de escritorio eso no es lo limitante.</p><p><strong>La contrapartida:</strong> la app es donde vive la corrección de sala, así que si no quieres|teamar con una aplicación de móvil, estás renunciar a lo que lo distingue de todo lo demás en esta lista. También es un driver de 3,5 pulgadas, así que comparte el techo de graves de los otros pares compactos.</p>',
      products: [P.MR3]
    },
    {
      heading: 'The Edifier R1280T: The Most Popular Speakers Here Are Not Monitors',
      heading_es: 'El Edifier R1280T: los altavoces más populares de esta lista no son monitores',
      content: '<p><strong>Nearly twenty thousand reviews, and it is the pair most people in this price range will actually buy.</strong> A 4-inch woven driver, 0.5-inch silk dome, 42W RMS, 52 Hz to 20 kHz, bass and treble controls on the side panel, two RCA inputs so a turntable and a computer can stay connected together.</p><p><strong>It sounds good. It is genuinely good for what it is.</strong> That is exactly why it needs this paragraph. A powered bookshelf speaker and a studio monitor are different objects, and the difference is not marketing.</p><p><strong>What a monitor gives you:</strong> a waveguide that controls off-axis response so the mix sounds the same when you move your head, a defined reference response you can learn, a balanced input that does not pick up the noise floor of your interface, and a rear EQ with published centre frequencies.</p><p><strong>What the R1280T does not have:</strong> any of the above. Its tone controls are a fixed shelf boost and cut with no published frequencies, its inputs are unbalanced RCA only, and there is no room correction of any kind. Play it back on it and it will flatter your mix.</p><p><strong>So who should buy it?</strong> If you are writing, producing, editing video, streaming, or playing instruments and you want a serious upgrade from computer speakers, it is excellent value and it is the pair we would buy. If you are mixing and want mixes that translate, pick a monitor from this list instead. For that job the PreSonus Eris E4.5 at $139.99 is the right buy, and the extra twenty-two dollars buys you a waveguide, an XLR input and a driver with an inch more cone in it.</p>',
      content_es: '<p><strong>Casi veinte mil reseñas, y es el par que la gente de esta franja de precio realmente va a comprar.</strong> Un driver de 4 pulgadas de tejido, cúpula de seda de 0,5 pulgadas, 42 W RMS, 52 Hz a 20 kHz, controles de graves y agudos en el panel lateral y dos entradas RCA para tener conectados a la vez un tocadiscos y un ordenador.</p><p><strong>Suena bien. Es genuinamente bueno para lo que es.</strong> Y por eso necesita este párrafo. Un altavoz de estantería amplificado y un monitor de estudio son objetos distintos, y la diferencia no es marketing.</p><p><strong>Lo que te da un monitor:</strong> una guía de ondas que controla la respuesta fuera del eje para que la mezcla suene igual al mover la cabeza, una respuesta de referencia definida que puedes aprenderte, una entrada balanceada que no capta el ruido de tu interfaz y un EQ trasero con frecuencias centro publicadas.</p><p><strong>Lo que el R1280T no tiene:</strong> nada de lo anterior. Sus controles de tono son un realce y un corte de estante fijos sin frecuencias publicadas, sus entradas son solo RCA no balanceadas y no hay corrección de sala de ningún tipo. Si mezclas encima de él, tu mezcla va a quedar favorecida.</p><p><strong>Entonces, ¿quién debería comprarlo?</strong> Si escribes, produces, editas vídeo, haces streaming o tocas instrumentos y quieres una mejora seria sobre los altavoces del ordenador, es excelente valor y es el par que compraríamos nosotros. Si mezclas y quieres mezclas que trasladen, elige un monitor de esta lista. Para ese trabajo la compra correcta es el PreSonus Eris E4.5 a $139.99, y los veintidós dólares extra te compran una guía de ondas, una entrada XLR y un driver con una pulgada más de cono.</p>',
      products: [P.R1280T]
    },
    {
      heading: 'Why There Is No Yamaha HS5 or Adam T5V in This Guide',
      heading_es: 'Por qué no hay un Yamaha HS5 ni un Adam T5V en esta guía',
      content: '<p><strong>Because they are sold individually, not as a pair, and this guide is about the pair.</strong> Every 5-inch monitor that would normally be the recommendation at this budget is sold one speaker at a time.</p><p><strong>The Yamaha HS5 is roughly $199 per speaker.</strong> The Kali Audio LP-6 V2 is about $249 each. The ADAM Audio T5V lists at $199 per unit. The JBL 305P MkII is the closest thing to a genuine exception, but even it now sits near $199 for the pair in most markets rather than the $149 it launched at.</p><p><strong>That is the honest reason this list is all 3.5-inch and 4.5-inch drivers.</strong> Below about $150 for two speakers, the good 5-inch monitors do not exist yet. If your budget stretches to $200, the HS5 and the JBL 305P MkII are the correct answer and we have covered both at length in our broader guides.</p><p><strong>The Yamaha HS3 is the closest thing to a bargain,</strong> at $190 to $230 depending on the retailer, and it is a genuinely good monitor with balanced XLR and proper Room Control switches. It simply is not a sub-$150 pair.</p>',
      content_es: '<p><strong>Porque se venden por unidades, no por pares, y esta guía va del par.</strong> Todos los monitores de 5 pulgadas que serían la recomendación normal en este presupuesto se venden de una en una.</p><p><strong>El Yamaha HS5 ronda los $199 por altavoz.</strong> El Kali Audio LP-6 V2 está sobre $249 cada uno. El ADAM Audio T5V aparece a $199 por unidad. El JBL 305P MkII es lo más parecido a una excepción, pero incluso él ronda los $199 el par en la mayoría de mercados en lugar de los $149 con los que salió.</p><p><strong>Esa es la razón honesta de que esta lista sea toda de drivers de 3,5 y 4,5 pulgadas.</strong> Por debajo de unos $150 por dos altavoces, los buenos monitores de 5 pulgadas todavía no existen. Si tu presupuesto llega a $200, el HS5 y el JBL 305P MkII son la respuesta correcta y los cubrimos a fondo en nuestras guías generales.</p><p><strong>El Yamaha HS3 es lo más parecido a una ganga,</strong> entre $190 y $230 según la tienda, y es un monitor genuinamente bueno con XLR balanceado y conmutadores de Room Control de verdad. Simplemente no es un par por debajo de $150.</p>',
      products: []
    }
  ],
  conclusion: 'If you mix and want mixes that translate, buy the PreSonus Eris E4.5: it is the only pair under $150 with true balanced XLR alongside a 4.5-inch driver and a waveguide, and the waveguide will not stop reminding you about your untreated room. If your desk is small and your budget is firm at a hundred dollars, the Mackie CR3.5 wins on the isolation pads in the box and the front-panel tone knob. If your room has bass in it, the Mackie CR4.5 reaches 55 Hz for ten dollars less than the M-Audio BX4 and is the deepest new pair at this price. And if what you actually want is a serious upgrade from computer speakers rather than a mixing tool, buy the Edifier R1280T, accept that it is not a monitor, and stop expecting it to translate.',
  conclusion_es: 'Si mezclas y quieres mezclas que trasladen, compra el PreSonus Eris E4.5: es el único par por debajo de $150 con XLR balanceado de verdad junto a un driver de 4,5 pulgadas y una guía de ondas, y esa guía no dejará de recordarte tu sala sin tratar. Si tu escritorio es pequeño y tu presupuesto se queda clavado en cien dólares, el Mackie CR3.5 gana por los pads de aislamiento de la caja y el knob frontal de tono. Si tu sala tiene graves, el Mackie CR4.5 llega a 55 Hz por diez dólares menos que el M-Audio BX4 y es el par nuevo más profundo a este precio. Y si lo que quieres de verdad es una mejora seria sobre los altavoces del ordenador en lugar de una herramienta de mezcla, compra el Edifier R1280T, acepta que no es un monitor y deja de esperar que traslade.',
  verdict: 'Best overall: PreSonus Eris E4.5. Best for small desks: Mackie CR3.5. Best bass extension: Mackie CR4.5. Best features per dollar: Edifier MR3. Best for isolation: M-Audio BX4. Best all-round first monitor: PreSonus Eris 3.5 2nd Gen. Not a monitor but the most popular: Edifier R1280T.',
  verdict_es: 'Mejor en general: PreSonus Eris E4.5. Mejor para escritorios pequeños: Mackie CR3.5. Mejor extensión de graves: Mackie CR4.5. Mejor relación features-precio: Edifier MR3. Mejor aislamiento: M-Audio BX4. Mejor primer monitor todoterreno: PreSonus Eris 3.5 2nd Gen. No es un monitor pero es el más popular: Edifier R1280T.',
  featuredProducts: [P.E45, P.CR45, P.ERIS35, P.BX4, P.CR35, P.MR3, P.R1280T],
  relatedGuides: ['budget-monitors', 'best-monitors', 'best-monitors-for-small-rooms', 'monitor-setup', 'studio-subwoofers', 'jbl-vs-kali'],
  description: 'Best home studio speakers under $150 2026. PreSonus, Mackie, M-Audio and Edifier compared with measured bass response. Best pick: PreSonus Eris E4.5.',
  description_es: 'Mejores monitores de estudio doméstico por menos de $150 2026. PreSonus, Mackie, M-Audio y Edifier comparados con graves medidos. Mejor compra: PreSonus Eris E4.5.',
  featuredSnippet: Object.assign({}, base.featuredSnippet),
  author: Object.assign({}, base.author),
  aboutName: 'Studio Monitors',
  productTable: {
    title: 'Budget Monitors Compared in This Guide',
    title_es: 'Monitores económicos comparados en esta guía',
    columns: [
      { title: 'PreSonus Eris E4.5', title_es: 'PreSonus Eris E4.5' },
      { title: 'Mackie CR4.5', title_es: 'Mackie CR4.5' },
      { title: 'PreSonus Eris 3.5 2nd Gen', title_es: 'PreSonus Eris 3.5 2nd Gen' },
      { title: 'M-Audio BX4', title_es: 'M-Audio BX4' },
      { title: 'Mackie CR3.5', title_es: 'Mackie CR3.5' },
      { title: 'Edifier MR3', title_es: 'Edifier MR3' },
      { title: 'Edifier R1280T', title_es: 'Edifier R1280T' }
    ],
    rows: [
      {
        label: 'Price (pair)', label_es: 'Precio (par)',
        values: [
          { value: '$139.99', value_es: '$139.99' }, { value: '$129.99', value_es: '$129.99' },
          { value: '$99.99', value_es: '$99.99' }, { value: '$139.00', value_es: '$139.00' },
          { value: '$99.99', value_es: '$99.99' }, { value: '$99.99', value_es: '$99.99' },
          { value: '$117.99', value_es: '$117.99' }
        ]
      },
      {
        label: 'Woofer', label_es: 'Woofer',
        values: [
          { value: '4.5" woven composite', value_es: '4,5" compuesto trenzado' },
          { value: '4.5" woven', value_es: '4,5" tejido' },
          { value: '3.5" woven composite', value_es: '3,5" compuesto trenzado' },
          { value: '4.5" Black Kevlar', value_es: '4,5" Kevlar negro' },
          { value: '3.5" woven', value_es: '3,5" tejido' },
          { value: '3.5" mid-low', value_es: '3,5" medio-grave' },
          { value: '4" woven', value_es: '4" tejido' }
        ]
      },
      {
        label: 'Bass extension (stated)', label_es: 'Extensión de graves (declarada)',
        values: [
          { value: '55 Hz - 20 kHz', value_es: '55 Hz - 20 kHz' },
          { value: '55 Hz - 20 kHz', value_es: '55 Hz - 20 kHz' },
          { value: '80 Hz - 20 kHz', value_es: '80 Hz - 20 kHz' },
          { value: '69 Hz - 22 kHz', value_es: '69 Hz - 22 kHz' },
          { value: 'Not published', value_es: 'No publicada' },
          { value: '52 Hz - 40 kHz', value_es: '52 Hz - 40 kHz' },
          { value: '52 Hz - 20 kHz', value_es: '52 Hz - 20 kHz' }
        ]
      },
      {
        label: 'Balanced input', label_es: 'Entrada balanceada',
        values: [
          { value: 'XLR + TRS', value_es: 'XLR + TRS' },
          { value: 'TRS', value_es: 'TRS' },
          { value: 'TRS', value_es: 'TRS' },
          { value: 'TRS', value_es: 'TRS' },
          { value: 'TRS', value_es: 'TRS' },
          { value: 'TRS', value_es: 'TRS' },
          { value: 'None (RCA only)', value_es: 'Ninguna (solo RCA)' }
        ]
      },
      {
        label: 'Room correction', label_es: 'Corrección de sala',
        values: [
          { value: 'Waveguide control', value_es: 'Control por guía de ondas' },
          { value: 'Tone knob + location switch', value_es: 'Knob de tono + conmutador de ubicación' },
          { value: 'HF/LF trims, 100 Hz & 10 kHz', value_es: 'Ajustes HF/LF, 100 Hz y 10 kHz' },
          { value: 'High-EQ / Low-EQ', value_es: 'High-EQ / Low-EQ' },
          { value: 'Tone knob + location switch', value_es: 'Knob de tono + conmutador de ubicación' },
          { value: 'App + EQ presets', value_es: 'App + presets de EQ' },
          { value: 'None', value_es: 'Ninguna' }
        ]
      },
      {
        label: 'Bluetooth', label_es: 'Bluetooth',
        values: [
          { value: 'No', value_es: 'No' }, { value: 'No', value_es: 'No' },
          { value: 'No (BT version $129.99)', value_es: 'No (versión BT $129.99)' },
          { value: 'No (BT version ~$157)', value_es: 'No (versión BT ~$157)' },
          { value: 'No (BT version $159.99)', value_es: 'No (versión BT $159.99)' },
          { value: 'Yes, 5.4', value_es: 'Sí, 5.4' },
          { value: 'No (R1280DB is $159.98)', value_es: 'No (R1280DB es $159.98)' }
        ]
      },
      {
        label: 'Isolation included', label_es: 'Aislamiento incluido',
        values: [
          { value: 'Foam feet', value_es: 'Pies de espuma' },
          { value: 'No', value_es: 'No' },
          { value: 'Foam feet', value_es: 'Pies de espuma' },
          { value: 'Foam feet', value_es: 'Pies de espuma' },
          { value: 'Pads in box', value_es: 'Pads en la caja' },
          { value: 'No', value_es: 'No' },
          { value: 'No', value_es: 'No' }
        ]
      },
      {
        label: 'A true studio monitor?', label_es: '¿Es un monitor de verdad?',
        values: [
          { value: 'Yes', value_es: 'Sí' }, { value: 'Yes', value_es: 'Sí' },
          { value: 'Yes', value_es: 'Sí' }, { value: 'Yes', value_es: 'Sí' },
          { value: 'Yes', value_es: 'Sí' }, { value: 'Yes', value_es: 'Sí' },
          { value: 'No, bookshelf speaker', value_es: 'No, altavoz de estantería' }
        ]
      }
    ]
  },
  verdictProsCons: [
    {
      name: 'PreSonus Eris E4.5', name_es: 'PreSonus Eris E4.5',
      pros: ['Only pair under $150 with true balanced XLR', '4.5-inch driver reaching 55 Hz', 'EBM waveguide keeps desk reflections out of the mix position', 'Foam feet included'],
      pros_es: ['Único par por debajo de $150 con XLR balanceado de verdad', 'Driver de 4,5 pulgadas que llega a 55 Hz', 'La guía EBM saca las reflexiones del escritorio de la posición de mezcla', 'Pies de espuma incluidos'],
      cons: ['No Bluetooth, wired only', 'Will not reveal anything about sub-bass', 'Needs an acoustically treated room to sound its best'],
      cons_es: ['Sin Bluetooth, solo cableado', 'No revelará nada del subgrave', 'Necesita una sala tratada para sonar como debe']
    },
    {
      name: 'Mackie CR4.5', name_es: 'Mackie CR4.5',
      pros: ['Deepest new bass available at this budget, 55 Hz', 'Front tone knob runs flat to coloured', 'Location switch for desktop or bookshelf placement', 'Ten dollars cheaper than the M-Audio BX4'],
      pros_es: ['El grave más profundo nuevo en este presupuesto, 55 Hz', 'El knob frontal va de plano a coloreado', 'Conmutador de ubicación para escritorio o estantería', 'Diez dólares más barato que el M-Audio BX4'],
      cons: ['Tone knob is not a calibrated room correction', 'No isolation pads in the box', 'No Bluetooth'],
      cons_es: ['El knob de tono no es una corrección de sala calibrada', 'No incluye pads de aislamiento', 'Sin Bluetooth']
    },
    {
      name: 'PreSonus Eris 3.5 2nd Gen', name_es: 'PreSonus Eris 3.5 2nd Gen',
      pros: ['Rear HF and LF trims with published centre frequencies', 'Balanced TRS plus front Aux and headphone out', 'Studio One Prime and plug-ins included', 'Cheapest real monitor in this guide'],
      pros_es: ['Ajustes HF y LF traseros con frecuencias centro publicadas', 'TRS balanceada más Aux frontal y salida de auriculares', 'Incluye Studio One Prime y plug-ins', 'El monitor real más barato de esta guía'],
      cons: ['Smallest bass extension of the real monitors here', '3.5-inch driver limits low end', 'No Bluetooth on the wired version'],
      cons_es: ['La menor extensión de graves de los monitores reales de aquí', 'El driver de 3,5 pulgadas limita el grave', 'Sin Bluetooth en la versión cableada']
    },
    {
      name: 'M-Audio BX4', name_es: 'M-Audio BX4',
      pros: ['Foam feet ship in the box', 'Black Kevlar woofer with 69 Hz extension', 'High-EQ and Low-EQ on the rear panel', 'Computer-optimised tweeter waveguide'],
      pros_es: ['Pies de espuma incluidos en la caja', 'Woofer de Kevlar negro con 69 Hz de extensión', 'High-EQ y Low-EQ en el panel trasero', 'Guía de onda del tweeter optimizada por ordenador'],
      cons: ['Costs more than the deeper Mackie CR4.5', 'No XLR input', 'Bluetooth version breaks the $150 ceiling'],
      cons_es: ['Cuesta más que el Mackie CR4.5, que baja más', 'Sin entrada XLR', 'La versión con Bluetooth rompe el techo de $150']
    },
    {
      name: 'Mackie CR3.5', name_es: 'Mackie CR3.5',
      pros: ['Only pair under $100 with isolation pads in the box', 'Tone knob and location switch on the front and rear', 'Flat reference at full counter-clockwise', 'TRS, RCA and 3.5mm inputs'],
      pros_es: ['Único par por debajo de $100 con pads de aislamiento en la caja', 'Knob de tono y conmutador de ubicación delante y detrás', 'Referencia plana con el knob del todo a la izquierda', 'Entradas TRS, RCA y 3,5 mm'],
      cons: ['Roughly 80 Hz of bass means editing, not mixing', 'No Bluetooth on the wired version', 'Less low end than spending $30 more would buy'],
      cons_es: ['Unos 80 Hz de graves significan editar, no mezclar', 'Sin Bluetooth en la versión cableada', 'Menos grave que lo que comprarías con treinta dólares más']
    },
    {
      name: 'Edifier MR3', name_es: 'Edifier MR3',
      pros: ['Balanced TRS and Bluetooth 5.4 in one pair under $100', 'Hi-Res Audio 24-bit/96 kHz bit-perfect front end', 'Room compensation and EQ presets in the ConneX app', 'Over a thousand bought in the past month'],
      pros_es: ['TRS balanceada y Bluetooth 5.4 en un par por debajo de $100', 'Frontal Hi-Res Audio de 24 bits/96 kHz con señal intacta', 'Compensación de sala y presets de EQ en la app ConneX', 'Más de mil unidades compradas en el último mes'],
      cons: ['Room correction lives in an app', 'Only 18W RMS per side', '3.5-inch driver shares the compact bass ceiling'],
      cons_es: ['La corrección de sala vive en una app', 'Solo 18 W RMS por lado', 'El driver de 3,5 pulgadas comparte el techo de graves compacto']
    },
    {
      name: 'Edifier R1280T', name_es: 'Edifier R1280T',
      pros: ['The most searched and most bought pair in this price band', 'Bass and treble controls plus two RCA inputs', 'Superb value for playing, writing and video editing', '19,000-odd reviews and rising'],
      pros_es: ['El par más buscado y más comprado de esta franja', 'Controles de graves y agudos más dos entradas RCA', 'Valor satélite para tocar, escribir y editar vídeo', 'Unas 19.000 reseñas y subiendo'],
      cons: ['Not a studio monitor: no balanced input, no waveguide, no room correction', 'Unbalanced RCA only, so it picks up interface noise', 'Will flatter your mixes rather than reveal them'],
      cons_es: ['No es un monitor de estudio: sin entrada balanceada, sin guía de ondas, sin corrección de sala', 'Solo RCA no balanceado, así que capta ruido de la interfaz', 'Favorecerá tus mezclas en lugar de revelarlas']
    }
  ],
  datePublished: new Date().toISOString()
};

if (guides.some(g => g.id === guia.id)) {
  console.log('YA EXISTE ' + guia.id + ' -> no se toca');
} else {
  guides.push(guia);
  fs.writeFileSync(rutaG, JSON.stringify(guides, null, 2), 'utf8');
  console.log('GUIA CREADA: ' + guia.id);
  console.log('  title EN (' + guia.title.length + '): ' + guia.title);
  console.log('  title ES (' + guia.title_es.length + '): ' + guia.title_es);
  console.log('  desc ES (' + guia.description_es.length + '): ' + guia.description_es);
  console.log('  secciones: ' + guia.sections.length);
  guia.sections.forEach(s => console.log('    - ' + s.heading.slice(0, 52) + ' | ' + s.heading_es.slice(0, 52) + ' | productos: ' + s.products.length));
  console.log('  featuredProducts: ' + guia.featuredProducts.length + ' | related: ' + guia.relatedGuides.length);
  console.log('  tabla: ' + guia.productTable.columns.length + ' columnas x ' + guia.productTable.rows.length + ' filas');
  console.log('  verdicts: ' + guia.verdictProsCons.length);
  console.log('  total guias: ' + guides.length);
}
