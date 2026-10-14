const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'best-interface');
const sec = g.sections.find(s => s && JSON.stringify(s.products) === '[679]');
if (!sec) die('seccion AXE no encontrada');
if (!sec.content_es.includes('flujo guitarrero lo rematan')) die('contenido AXE ES no es el esperado');

sec.heading_es = 'IK Multimedia AXE I/O: la interfaz de guitarra con afinador integrado';
sec.content_es = '<p><strong>La AXE I/O es la única interfaz aquí diseñada pensando exclusivamente en las cuerdas.</strong> Sus entradas de instrumento (Hi-Z) frontales alimentan un preamplificador con triple topología física: el modo PURE ofrece una transparencia absoluta; el circuito JFET inyecta la calidez armónica típica de los amplificadores de válvulas; y el modo ACTIVE adapta la ganancia para pastillas activas de alta salida. Todo esto se complementa con el control de impedancia variable Z-TONE y un selector de pastillas que te permite moldear el tono analógico antes de que la señal entre a cualquier plugin. Además trae dos entradas combo para micrófono/línea con alimentación Phantom, conversión a 24 bits/192 kHz con 117 dB de rango dinámico y una salida dedicada Amp Out con interruptor de tierra (ground lift) para hacer reamping directo sin necesidad de una caja DI externa.</p><p>Los añadidos específicos para guitarristas terminan de redondear el paquete: incorpora un práctico afinador visual en el chasis, un encoder asignable para navegar por los presets de AmpliTube sin tocar el ratón de la computadora, doble entrada para pedales de expresión o switches externos (ideales para controlar efectos de wah o volumen) y conectividad MIDI de 5 pines. Además, incluye de fábrica las licencias de AmpliTube 5 SE, TONEX SE y Ableton Live Lite. Por ~$399, es la mejor inversión de escritorio si tienes una guitarra de por medio, aunque resultará excesiva si tu único propósito es grabar voces.</p>';
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
const t = sec.content_es;
console.log('7QPI restante:', t.includes('7QPI'));
console.log('potenciometro restante:', t.includes('potenciómetro'));
console.log('trasero restante:', t.includes('trasero'));
console.log('única del mercado restante:', t.includes('del mercado'));
