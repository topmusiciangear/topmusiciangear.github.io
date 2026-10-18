const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');

g.faq = [
  {
    q: 'What are the best studio monitors under $150 for a home studio?',
    q_es: '¿Cuáles son los mejores monitores de estudio por menos de $150 para un estudio doméstico?',
    a: 'The Mackie CR4.5 is our pick, because at $129.99 it reaches 65 Hz at minus 3 dB, the lowest figure of any real monitor here, and its location switch lets you correct for a desk against a wall. The M-Audio BX4 is the alternative if isolation matters more to you than low end, since it ships with foam feet. Under $100, the PreSonus Eris 3.5 2nd Gen wins on its rear trims, which have published centre frequencies.',
    a_es: 'El Mackie CR4.5 es nuestra elección, porque por $129.99 llega a 65 Hz a menos 3 dB, la cifra más baja de cualquier monitor real de esta lista, y su conmutador de ubicación te deja corregir el problema de un escritorio pegado a la pared. El M-Audio BX4 es la alternativa si el aislamiento te importa más que el grave, porque viene con pies de espuma. Por debajo de $100, gana el PreSonus Eris 3.5 2nd Gen por sus ajustes traseros, que tienen las frecuencias centro publicadas.'
  },
  {
    q: 'Are 3.5-inch monitors good enough to mix on?',
    q_es: '¿Son buenos monitores de 3,5 pulgadas para mezclar?',
    a: 'For editing, arranging and checking a mix, yes. For making low-end decisions, no. Everything in this guide stops short of 50 Hz, so if your material depends on sub-bass you will need to cross-check on headphones or add a subwoofer later. Note that 3.5-inch does not mean cheap: the PreSonus Eris 3.5 2nd Gen and the Mackie CR3.5 both bi-amplify their drivers, which single-amp designs at this size usually do not.',
    a_es: 'Para editar, maquetar y revisar una mezcla, sí. Para tomar decisiones de graves, no. Todo lo de esta lista se queda corto de 50 Hz, así que si tu material depende del subgrave tendrás que comprobar con auriculares o añadir un subgrave más adelante. Y ojo: 3,5 pulgadas no significa barato, porque el PreSonus Eris 3.5 2nd Gen y el Mackie CR3.5 bi-amplifican sus drivers, cosa que los diseños de un solo amplificador de ese tamaño no suelen hacer.'
  },
  {
    q: 'What is the difference between a studio monitor and a powered bookshelf speaker?',
    q_es: '¿Qué diferencia hay entre un monitor de estudio y un altavoz de estantería amplificado?',
    a: 'A monitor is built to be measured. It has a waveguide to control off-axis response, a defined reference curve you can learn, usually a balanced input, and rear EQ with published frequencies. The Edifier R1280T in this guide has none of those: unbalanced RCA only, a fixed tone control and no room correction. It is a very good speaker and the most bought pair here, but mixes will sound better on it than they really are.',
    a_es: 'Un monitor está hecho para ser medido. Lleva guía de ondas para controlar la respuesta fuera del eje, una curva de referencia definida que puedes aprenderte, normalmente entrada balanceada y un EQ trasero con frecuencias publicadas. El Edifier R1280T de esta lista no tiene nada de eso: solo RCA no balanceado, un tono fijo y ninguna corrección de sala. Es un altavoz muy bueno y el par más comprado de la lista, pero tus mezclas sonarán mejor en él de lo que son de verdad.'
  },
  {
    q: 'Do I need a subwoofer with monitors this small?',
    q_es: '¿Necesito un subgrave con monitores tan pequeños?',
    a: 'Only if your music lives below 80 Hz. For pop, rock, folk or anything with acoustic instruments, these monitors report plenty. For bass music, techno or trap, treat the subwoofer as part of the purchase rather than an upgrade, because no pair under $150 will tell you what is happening down there. Your room treatment will matter more than either.',
    a_es: 'Solo si tu música vive por debajo de 80 Hz. Para pop, rock, folk o cualquier cosa con instrumentos acústicos, estos monitores te dan de sobra. Para música electrónica, techno o trap, trata el subgrave como parte de la compra y no como una mejora, porque ningún par por debajo de $150 te dirá qué está pasando por ahí. El tratamiento de tu sala importará más que cualquiera de las dos cosas.'
  },
  {
    q: 'Is the Behringer Truth 3.5 BT worth $147 when the PreSonus Eris 3.5 is $99.99?',
    q_es: '¿Vale la pena el Behringer Truth 3.5 BT a $147 cuando el PreSonus Eris 3.5 cuesta $99.99?',
    a: 'You are paying for three things: 64 watts of continuous power, the most in this guide, the Advanced Waveguide that keeps the stereo image intact when you move your head, and Bluetooth 5.3. The Eris is the better value if you mix at moderate volume in a treated space, and its rear trims act at frequencies the Behringer does not specify for its low shelf. The Behringer is the pick if you play loud or work in an untreated room.',
    a_es: 'Pagas por tres cosas: 64 vatios de potencia continua, la mayor de esta guía, la guía de ondas avanzada que mantiene la imagen estéreo intacta al mover la cabeza, y Bluetooth 5.3. El Eris es mejor relación si mezclas a volumen moderado en una sala tratada, y sus ajustes traseros actúan en frecuencias que el Behringer no especifica en su estante de graves. El Behringer es la opción si tocas fuerte o trabajas en una sala sin tratar.'
  },
  {
    q: 'How should I place budget monitors in a small room?',
    q_es: '¿Cómo coloco monitores económicos en una sala pequeña?',
    a: 'Get them off the desk if you can and onto stands, because desk resonance sits right in the low mids where guitar and bass fundamentals live. Form an equilateral triangle with your tweeters at ear height, and angle them slightly toward you. Push them away from the wall by 20 to 30 cm, since the port needs room to breathe. The Mackie CR3.5 and CR4.5 both have a location switch that does most of this correction for you.',
    a_es: 'Sácalos del escritorio si puedes y ponlos sobre soportes, porque la resonancia del escritorio cae justo en los medios-grave donde viven los fundamentales de guitarra y bajo. Forma un triángulo equilátero con los tweeters a la altura de tus orejas y oriéntalos ligeramente hacia ti. Aléjalos de la pared entre 20 y 30 cm, que el puerto necesita sitio para respirar. El Mackie CR3.5 y el CR4.5 tienen un conmutador de ubicación que te hace casi todo esto por ti.'
  }
];

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');
console.log('=== FAQ PROPIAS DE LA GUIA ===');
console.log('preguntas: ' + g.faq.length);
g.faq.forEach((f, i) => console.log('  ' + (i + 1) + '. ' + f.q));
console.log('\nEN medio: ' + (g.featuredSnippet.faq_q1_en ? 'TIENE faq_q1 (heredado de budget-monitors)' : 'sin faqs heredadas'));
