const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const d = guides.find(x => x.title === 'Best Samplers & Beat Making: Complete Guide');

d.description = 'Best samplers & beat-making 2026: MPC Live III vs Digitakt II vs MPC Key 37 vs EP-133. Ten standalone machines from pocket to flagship. Find your weapon. Read the verdict.';
d.description_es = 'Mejores samplers 2026: MPC Live III vs Digitakt II vs MPC Key 37 vs EP-133. Diez máquinas autónomas del bolsillo al insignia. Tu arma de beats. Lee el veredicto.';

const f = d.featuredSnippet;
f.title_en = 'Best Samplers & Beat-Making Machines';
f.title_es = 'Mejores samplers y máquinas de beats';
f.text_en = 'The Akai MPC Live III is the all-in-one workstation for modern hip-hop; the Elektron Digitakt II rules deep electronic sound design. Ten standalone machines from pocket to flagship.';
f.text_es = 'El Akai MPC Live III es la estación todo en uno del hip-hop moderno; el Elektron Digitakt II manda en diseño electrónico profundo. Diez máquinas autónomas del bolsillo al insignia.';
f.faq_q3_en = 'Why choose the Akai MPC Key 37 over a desktop MPC?';
f.faq_a3_en = 'The MPC Key 37 runs the complete standalone MPC engine with 37 full-size aftertouch keys attached — chord progressions and drum programming in one box, with massive I/O including CV/Gate. Desktop MPCs are smaller and cheaper, but keyboard players finish songs faster on the Key 37.';
f.faq_q3_es = '¿Por qué elegir el Akai MPC Key 37 frente a un MPC de escritorio?';
f.faq_a3_es = 'El MPC Key 37 corre el motor MPC autónomo completo con 37 teclas de tamaño real con aftertouch — progresiones y batería en una sola caja, con E/S masiva incluyendo CV/Gate. Los MPC de escritorio son más pequeños y baratos, pero quien toca teclado termina temas más rápido en el Key 37.';
f.faq_a4_en = 'A sampler records and plays back any audio you load or capture — samples, loops, full tracks. A drum computer generates drum sounds from synthesis or stored one-shots. The Elektron Digitakt II is a sampler-sequencer hybrid; the Roland SP-404MKII is a hands-on sampling performer. If you want to chop and manipulate audio, go sampler; for instant drum sounds, drum computer.';
f.faq_a4_es = 'Un sampler graba y reproduce cualquier audio que cargues o captures — samples, loops, canciones completas. Una caja de ritmos genera sonidos de batería por síntesis o one-shots guardados. El Elektron Digitakt II es un híbrido de sampling y secuenciación; el Roland SP-404MKII es un sampler para interpretar con las manos. Si quieres trocear y manipular audio, sampler; para batería instantánea, caja de ritmos.';
f.faq_a5_en = 'Yes — that is its defining feature. The MPC One G2 is a fully standalone beat production station with its own screen, 16 velocity-sensitive pads, 16 GB of storage, and built-in instruments. You can sample, sequence, mix, and arrange complete tracks without a laptop. It also connects to your computer as a controller and for file transfer when you want it.';
f.faq_a5_es = 'Sí — esa es su seña de identidad. La MPC One G2 es una estación de beats totalmente autónoma con pantalla propia, 16 pads con velocidad, 16 GB de almacenamiento e instrumentos integrados. Puedes samplear, secuenciar, mezclar y arreglar temas completos sin portátil. También se conecta al ordenador como controlador y para pasar archivos cuando quieras.';

fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(guides, null, 2));
const s = JSON.stringify(d);
console.log('TR-8S left:', s.includes('TR-8S'));
console.log('ordenadores de batería left:', s.includes('ordenadores de batería'));
