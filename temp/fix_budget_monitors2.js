const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'budget-monitors');

// Fix conclusion
g.conclusion = "Ultra-tight budget? The JBL 305P MkII each beats everything near its price. Best value overall? The Kali LP-6 V2 each adds boundary EQ room correction that no other budget monitor offers. The KRK Rokit 7 G5 each is the DSP option with built-in tuning. And if you can stretch each, the Yamaha HS8 gives you the brutal honesty that legendary mixes are made on. Need real 3-way accuracy without crossing $500 each? The Kali IN-8 2nd Wave coaxial point source gets you there. Need 8-inch bass on a budget? PreSonus Eris Studio 8. Six monitors, six price points — every one will dramatically improve your mixing compared to headphones or consumer speakers. Learn them well. <p><a href=\"/guides/best-monitors.html\" class=\"guide-link-btn\">Best Studio Monitors </a> <a href=\"/guides/monitor-setup.html\" class=\"guide-link-btn\">Best Monitor Setup & Room Calibration</a> <a href=\"/guides/hs8-vs-rokit-7.html\" class=\"guide-link-btn\">HS8 vs Rokit 7 G5</a></p>";

g.conclusion_es = "¿Presupuesto ultra ajustado? El JBL 305P MkII cada uno bate a todo lo que está cerca de su precio. ¿Mejor relación calidad-precio? El Kali LP-6 V2 cada uno añade corrección de sala Boundary EQ que ningún otro monitor económico ofrece. El KRK Rokit 7 G5 cada uno es la opción DSP con ajuste integrado. Y si puedes estirar el presupuesto, el Yamaha HS8 te da la honestidad brutal con la que se hacen las mezclas legendarias. ¿Necesitas precisión real de 3 vías sin pasar de $500 cada uno? El Kali IN-8 2nd Wave con fuente puntual coaxial te lleva ahí. ¿Necesitas graves de 8 pulgadas con presupuesto ajustado? PreSonus Eris Studio 8. Seis monitores, seis puntos de precio — todos mejorarán drásticamente tus mezclas frente a auriculares o altavoces de consumo. Domínalos bien. <p><a href=\"/guides/best-monitors_es.html\" class=\"guide-link-btn\">Mejores Monitores de Estudio </a> <a href=\"/guides/monitor-setup_es.html\" class=\"guide-link-btn\">Mejor Configuración y Calibración de Monitores</a> <a href=\"/guides/hs8-vs-rokit-7_es.html\" class=\"guide-link-btn\">HS8 vs Rokit 7 G5</a></p>";

// Fix verdict
g.verdict = "The JBL 305P is the ultra-budget pick that still sounds shockingly good. Kali LP-6 adds value and detail, and the KRK Rokit 7 brings DSP room correction when you want to dial out your room. Kali IN-8 2nd Wave is the 3-way stretch goal that stays under $500 each. Need 8-inch bass on a budget? PreSonus Eris Studio 8.";
g.verdict_es = "El JBL 305P es la opción ultra-económica que sigue sonando sorprendentemente bien. Kali LP-6 añade valor y detalle, y el KRK Rokit 7 aporta corrección de sala DSP cuando quieres ecualizar tu sala. Kali IN-8 2nd Wave es la meta de 3 vías que se queda bajo $500 cada uno. ¿Necesitas graves de 8 pulgadas con presupuesto? PreSonus Eris Studio 8.";

// Fix description
g.description = g.description.replace('IN-8 V2', 'IN-8 2nd Wave');
g.description_es = g.description_es.replace('IN-8 V2', 'IN-8 2nd Wave');

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('Guide texts fixed');