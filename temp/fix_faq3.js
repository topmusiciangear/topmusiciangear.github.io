const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'usb-mics');
const f = g.featuredSnippet;

f.faq_a3_en = "The <strong>Sennheiser Profile Streaming Set</strong> has physical gain, mix and headphone knobs plus a mute button with LED ring. The <strong>sE Electronics NEOM USB</strong> goes further with three independent analog knobs: Gain, Headphone Volume and Playback Mix. The <strong>Rode NT-USB+</strong> has gain and headphone volume. The <strong>Audio-Technica AT2020USB-X</strong> has a headphone level knob plus a mix knob, but no gain control in hardware. The <strong>Samson Q2U</strong> has no hardware controls at all; it leans on a mute switch, and everything else lives in your DAW.";
f.faq_a3_es = "El <strong>Sennheiser Profile Streaming Set</strong> tiene perillas físicas de ganancia, mezcla y auriculares más un botón de mute con anillo LED. El <strong>sE Electronics NEOM USB</strong> va más allá con tres perillas analógicas independientes: Ganancia, Volumen de Auriculares y Mezcla de Reproducción. El <strong>Rode NT-USB+</strong> tiene ganancia y volumen de auriculares. El <strong>Audio-Technica AT2020USB-X</strong> tiene perilla de nivel de auriculares y perilla de mezcla, pero sin control de ganancia en hardware. El <strong>Samson Q2U</strong> no tiene ningún control físico; se apoya en un interruptor de mute y todo lo demás vive en tu DAW.";

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

const t = JSON.stringify(g);
console.log('faq_a3 G-Track refs left:', (t.match(/G-Track Pro/g) || []).length);
console.log('faq_q3_en:', f.faq_q3_en);
console.log('faq_q3_es:', f.faq_q3_es);