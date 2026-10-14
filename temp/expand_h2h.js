const fs = require('fs');
const P = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(P, 'utf8'));
const g = guides.find(x => x.id === 'beginner-guitar');
const s = g.sections.find(x => x && x.heading && x.heading.includes('Head-to-Head'));

const oldEn = '<strong>Two nylon answers for beginners.</strong> Choose the Fender CN-60S if: you have small hands or come from electric guitar and want the most comfortable narrow neck with a premium solid wood top. Choose the Takamine GC1 if: you want a traditional, robust classical built like a tank that holds tuning and features an adjustable neck for long-term durability.';
if (!s.content.includes(oldEn)) { console.log('!! EN no coincide, no se toca'); process.exit(1); }
s.content = s.content.split(oldEn).join(
  '<strong>Two nylon answers for beginners, solving opposite problems.</strong> Choose the Fender CN-60S if you have small hands or come from electric guitar: its narrow 43 mm steel-string-style neck makes chord shapes and position shifts feel familiar instead of cramped, while the solid spruce top over mahogany back and sides gives a brighter, more projecting voice than laminate tops. The walnut fingerboard with rolled edges feels broken-in from day one, which is why it suits first-time nylon players, folk-pop strummers and songwriters best.' +
  '<br><br>Choose the Takamine GC1 if you want a traditional classical that outlives its price tag. The fan-braced spruce top with mahogany back, sides and neck is built like a tank: it holds tuning through heat and humidity swings that knock cheaper guitars out, and the adjustable two-way truss rod — rare at this level — lets a tech keep the action low for years instead of watching the neck drift. Nineteen laurel frets on a 650 mm scale complete the classic formula for students who want one guitar for the long haul.' +
  '<br><br>What they share: soft nylon strings that spare beginner fingertips, no electronics for amplification, and voices limited to classical, flamenco and fingerstyle. Pick comfort (CN-60S) or durability (GC1) — there is no wrong answer, only the one you will keep playing.'
);

const oldEs = s.content_es;
if (!oldEs.includes('Dos respuestas de nylon para empezar.')) { console.log('!! ES no coincide, no se toca'); process.exit(1); }
s.content_es = oldEs.split(
  '<strong>Dos respuestas de nylon para empezar.</strong> Elige la Fender CN-60S si: tienes manos pequeñas o vienes de la eléctrica y quieres el mástil estrecho más cómodo con tapa de madera sólida premium. Elige la Takamine GC1 si: quieres una clásica tradicional y robusta construida como un tanque que mantiene la afinación y cuenta con mástil ajustable para una durabilidad a largo plazo.'
).join(
  '<strong>Dos respuestas de nailon para empezar, que resuelven problemas opuestos.</strong> Elige la Fender CN-60S si tienes manos pequeñas o vienes de la eléctrica: su mástil estrecho de 43 mm estilo acero hace que las cejillas y los cambios de posición se sientan familiares en vez de estrechos, mientras la tapa de picea sólida sobre fondo y aros de caoba da una voz más brillante y proyectada que las tapas laminadas. El diapasón de nogal con bordes redondeados se siente usado desde el primer día, por eso conviene a debutantes del nailon, rasgueadores folk-pop y cantautores.' +
  '<br><br>Elige la Takamine GC1 si quieres una clásica tradicional que sobreviva a su precio. La tapa de picea con varetaje de abanico, fondo, aros y mástil de caoba está blindada: aguanta la afinación entre calores y humedades que descolocan a guitarras baratas, y el alma ajustable de doble acción — rara en este nivel — deja al técnico mantener la acción baja durante años en vez de ver derivar el mástil. Diecinueve trastes de laurel en escala de 650 mm completan la fórmula clásica para estudiantes que quieren una guitarra para largo recorrido.' +
  '<br><br>Lo que comparten: cuerdas blandas de nailon que perdonan las yemas, sin electrónica para amplificar y voces limitadas a clásica, flamenco y fingerstyle. Elige comodidad (CN-60S) o durabilidad (GC1): no hay respuesta mala, solo la que seguirás tocando.'
);

fs.writeFileSync(P, JSON.stringify(guides, null, 2));
console.log('cara a cara ampliado EN+ES');