const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'budget-monitors');

// 1. Update Kali IN-8 V2 section to IN-8 2nd Wave
const in8Idx = g.sections.findIndex(s => s.heading.includes('IN-8 V2'));
g.sections[in8Idx].heading = 'Is the Kali IN-8 2nd Wave the Best Studio Monitor for Accurate Mixing?';
g.sections[in8Idx].heading_es = '¿Es el Kali IN-8 2nd Wave el mejor monitor de estudio para mezcla precisa?';
g.sections[in8Idx].content = g.sections[in8Idx].content.replace(/IN-8 V2/g, 'IN-8 2nd Wave');
g.sections[in8Idx].content_es = g.sections[in8Idx].content_es.replace(/IN-8 V2/g, 'IN-8 2nd Wave');

// 2. Remove Kali LP-UNF section (last section)
const lpunfIdx = g.sections.findIndex(s => s.heading.includes('LP-UNF'));
if (lpunfIdx > -1) {
    g.sections.splice(lpunfIdx, 1);
}

// 3. Add PreSonus Eris Studio 8 section at the end
g.sections.push({
    heading: "PreSonus Eris Studio 8: The Budget 8-Inch with Pro Tuning",
    heading_es: "PreSonus Eris Studio 8: El monitor de 8 pulgadas económico con ajuste pro",
    content: "<strong>PreSonus' third-gen Eris Studio 8 lands at $219.99 each with 140W biamped Class AB power, an EBM waveguide, and deep 35 Hz extension.</strong> The 8-inch woven composite woofer (75W) and 1.25-inch silk-dome tweeter (65W) are driven by Class AB amps for 106 dB peak SPL. The EBM waveguide gives 120° horizontal dispersion for a wide sweet spot while narrow vertical dispersion cuts desk reflections. Rear-panel Acoustic Tuning gives you continuous HF (±6 dB at 10 kHz), Mid (±6 dB at 1 kHz), Acoustic Space (flat/−2/−4 dB), and high-pass filter (Off/80/100 Hz). XLR, TRS, and RCA inputs. $219.99 at zzounds, £185 at PreSonus UK, €239 in EU.",
    content_es: "<strong>El PreSonus Eris Studio 8 de tercera generación llega a $219.99 cada uno con 140W biamplificados Clase AB, guía de onda EBM y extensión a 35 Hz.</strong> El woofer compuesto de 8 pulgadas (75W) y el tweeter de cúpula de seda de 1,25\" (65W) son impulsados por amplificadores Clase AB para 106 dB SPL pico. La guía de onda EBM da dispersión horizontal de 120° para un punto dulce amplio mientras la dispersión vertical estrecha reduce reflexiones del escritorio. El ajuste acústico trasero ofrece HF continuo (±6 dB a 10 kHz), Medios (±6 dB a 1 kHz), Espacio Acústico (plano/−2/−4 dB) y filtro paso-alto (Off/80/100 Hz). Entradas XLR, TRS y RCA. $219.99 en zzounds, £185 en PreSonus UK, €239 en UE.",
    products: [550]
});

// 4. Update featuredProducts to include IN-8 2nd Wave (199) and new PreSonus (550)
g.featuredProducts = [116, 117, 20, 19, 199, 550];

// 5. Update conclusion
g.conclusion = g.conclusion.replace(
    'The Kali IN-8 V2 is the giant-killer — a true 3-way coaxial at a 2-way price.',
    'The Kali IN-8 2nd Wave is the giant-killer — a true 3-way coaxial at a 2-way price.'
);
g.conclusion_es = g.conclusion_es.replace(
    'El Kali IN-8 V2 es el matagigantes — un coaxial real de 3 vías a precio de 2 vías.',
    'El Kali IN-8 2nd Wave es el matagigantes — un coaxial real de 3 vías a precio de 2 vías.'
);

// 6. Update verdict
g.verdict = g.verdict.replace('Kali IN-8 V2', 'Kali IN-8 2nd Wave');
g.verdict_es = g.verdict_es.replace('Kali IN-8 V2', 'Kali IN-8 2nd Wave');
g.verdict = g.verdict + ' Need 8-inch bass on a budget? PreSonus Eris Studio 8.';
g.verdict_es = g.verdict_es + ' ¿Necesitas graves de 8 pulgadas con presupuesto? PreSonus Eris Studio 8.';

// 7. Update description
g.description = g.description.replace('Kali IN-8 V2', 'Kali IN-8 2nd Wave');
g.description_es = g.description_es.replace('Kali IN-8 V2', 'Kali IN-8 2nd Wave');

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('Guide updated');