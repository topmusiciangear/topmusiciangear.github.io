const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'portable-interfaces');

guide.verdict = "RME Babyface Pro FS for uncompromising portable quality, Focusrite Scarlett 2i2 4th Gen for the best balance of features and value, Audient EVO 4 for budget travelers.";

guide.verdict_es = "RME Babyface Pro FS para calidad portátil sin concesiones, Focusrite Scarlett 2i2 4th Gen para el mejor equilibrio entre funciones y precio, Audient EVO 4 para viajeros con presupuesto ajustado.";

guide.conclusion = "The RME Babyface Pro FS is the best portable audio interface money can buy — its SteadyClock FS jitter suppression and legendary RME drivers make it the gold standard for location recording. The Focusrite Scarlett 2i2 4th Gen offers the best balance of features and value with its 120dB dynamic range and Auto Gain. The Audient EVO 4 is the best budget option. All three are bus-powered, compact, and reliable enough for professional work on the road.";

guide.conclusion_es = "El RME Babyface Pro FS es la mejor interfaz de audio portátil que puedes comprar — su supresión de jitter SteadyClock FS y los legendarios drivers RME lo convierten en el estándar de oro para grabación en movilidad. La Focusrite Scarlett 2i2 4th Gen ofrece el mejor equilibrio entre funciones y precio con su rango dinámico de 120dB y Auto Gain. La Audient EVO 4 es la mejor opción económica. Las tres son alimentadas por bus, compactas y fiables para trabajo profesional fuera del estudio.";

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2));
console.log('OK: verdict y conclusion actualizados para portable-interfaces');
