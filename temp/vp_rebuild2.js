const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'vocal-plugins');

// ---------- secciones: quitar Ozone(30)/SSL(119)/RX(122), mover Total Bundle al final ----------
const byProd = pid => g.sections.findIndex(s => (s.products || []).includes(pid));
[30, 119, 122].forEach(pid => {
  const i = byProd(pid);
  if (i > -1) { console.log('seccion eliminada: ' + g.sections[i].heading + ' (prod ' + pid + ')'); g.sections.splice(i, 1); }
  else console.log('!!! seccion prod ' + pid + ' NO ENCONTRADA');
});
// mover Total Bundle (29) al final
const tb = byProd(29);
const tbSec = g.sections.splice(tb, 1)[0];
tbSec.heading = 'Honorable Mention: Is the FabFilter Total Bundle Worth It for Vocals?';
tbSec.heading_es = 'Mención de honor: ¿Merece la pena el FabFilter Total Bundle para voces?';

const nectarSec = {
  heading: 'Nectar 4 Advanced: A Complete Vocal Chain With AI Assistance',
  heading_es: 'Nectar 4 Advanced: Cadena Vocal Completa Con Asistencia de IA',
  products: [1041],
  content: '<p><strong>Nectar 4 Advanced packs thirteen vocal modules plus a Vocal Assistant that sets up EQ, compression and de-essing for you.</strong> Auto-Level rides gain before any processing, Voices stacks harmonies and Backer builds background layers, all inside one window. Inter-plugin communication with other iZotope tools keeps the vocal sitting against the mix instead of fighting it.</p><p>For producers who want finished, mix-ready vocals without chaining six plugins by hand, Nectar is the shortcut. Tweakers who prefer choosing every processor themselves will still assemble Pro-Q, Pro-C and effects separately, but nobody finishes vocals faster than Nectar.</p>',
  content_es: '<p><strong>Nectar 4 Advanced concentra trece módulos vocales más un Asistente Vocal que configura EQ, compresión y de-essing por ti.</strong> Auto-Level nivela la ganancia antes de procesar, Voices apila armonías y Backer construye capas de fondo, todo en una ventana. La comunicación entre plugins de iZotope mantiene la voz sentada en la mezcla en lugar de pelear con ella.</p><p>Para productores que quieren voces terminadas y listas para mezcla sin encadenar seis plugins a mano, Nectar es el atajo. Los puristas que prefieren elegir cada procesador seguirán montando Pro-Q, Pro-C y efectos por separado, pero nadie termina voces más rápido que Nectar.</p>',
  pros: ['Thirteen vocal modules plus AI Vocal Assistant', 'Auto-Level gain riding before processing', 'Voices and Backer for harmonies and layers', 'Fastest route to mix-ready vocals'],
  pros_es: ['Trece módulos vocales más Asistente Vocal con IA', 'Nivelación Auto-Level antes de procesar', 'Voices y Backer para armonías y capas', 'La ruta más rápida a voces listas para mezcla'],
  cons: ['One-window workflow limits à-la-carte tweaking', 'Heavier on CPU than single plugins', 'Assistant results need human review', 'Advanced price over Standard tier'],
  cons_es: ['El flujo en una ventana limita ajuste pieza a pieza', 'Más pesado en CPU que plugins individuales', 'Los resultados del asistente necesitan revisión humana', 'Precio Advanced sobre el nivel Standard']
};
const smoothSec = {
  heading: 'Smooth Operator Pro: Tame Harsh Vocals With One Knob',
  heading_es: 'Smooth Operator Pro: Doma Voces Duras Con Una Perilla',
  products: [472],
  content: '<p><strong>Smooth Operator Pro finds harsh resonances in a vocal and tames them with a single threshold control.</strong> Its spectral engine spots what sticks out across the frequency range and smooths only those spots in real time, no compressor pumping. Cheap-mic harshness, sibilant edges and digital glare disappear while the body of the voice stays intact.</p><p>Every engineer buys a resonance tamer sooner or later, and this is the fastest one to learn. It will not replace surgical tools for rescue missions, but for everyday vocal harshness nothing is quicker.</p>',
  content_es: '<p><strong>Smooth Operator Pro encuentra resonancias duras en una voz y las doma con un solo control de umbral.</strong> Su motor espectral detecta lo que sobresale en el rango de frecuencia y suaviza solo esos puntos en tiempo real, sin bombeo de compresor. La dureza de micrófonos baratos, los filos sibilantes y el brillo digital desaparecen mientras el cuerpo de la voz queda intacto.</p><p>Todo ingeniero compra un domador de resonancias tarde o temprano, y este es el más rápido de aprender. No reemplazará herramientas quirúrgicas para rescates, pero para dureza vocal cotidiana nada es más veloz.</p>',
  pros: ['Single-knob spectral resonance control', 'Tames cheap-mic harshness without pumping', 'Keeps vocal body intact while smoothing edges', 'Instant results with no learning curve'],
  pros_es: ['Control espectral de resonancias de una sola perilla', 'Doma dureza de micros baratos sin bombeo', 'Conserva el cuerpo vocal suavizando filos', 'Resultados instantáneos sin curva de aprendizaje'],
  cons: ['Not a surgical repair tool', 'Single-knob design limits fine control', 'Can over-smooth aggressive performances', 'No offline spectral editing'],
  cons_es: ['No es herramienta quirúrgica de reparación', 'El diseño de una perilla limita control fino', 'Puede suavizar en exceso actuaciones agresivas', 'Sin edición espectral offline']
};
g.sections.push(nectarSec, smoothSec, tbSec);
g.featuredProducts = [62, 63, 120, 1039, 32, 378, 1041, 472, 29];

// ---------- veredictos ----------
g.verdictProsCons = g.verdictProsCons.filter(v => !/Ozone|SSL G-Master|RX 12/i.test(v.name || ''));
const tbV = g.verdictProsCons.findIndex(v => /Total Bundle/i.test(v.name || ''));
const tbVObj = g.verdictProsCons.splice(tbV, 1)[0];
g.verdictProsCons.push(
  { name: 'Nectar 4 Advanced', name_es: 'Nectar 4 Advanced',
    pros: ['13 modules + AI assistant', 'Auto-Level + Voices + Backer', 'Inter-plugin communication', 'Fastest mix-ready vocals'],
    pros_es: ['13 módulos + asistente IA', 'Auto-Level + Voices + Backer', 'Comunicación entre plugins', 'Voces listas más veloces'],
    cons: ['Less à-la-carte tweaking', 'Heavier on CPU', 'Assistant needs review', 'Advanced pricing'],
    cons_es: ['Menos ajuste pieza a pieza', 'Más pesado en CPU', 'El asistente necesita revisión', 'Precio Advanced'] },
  { name: 'Smooth Operator Pro', name_es: 'Smooth Operator Pro',
    pros: ['One-knob resonance control', 'No compressor pumping', 'Keeps vocal body intact', 'Instant results'],
    pros_es: ['Control de una perilla', 'Sin bombeo de compresor', 'Conserva el cuerpo vocal', 'Resultados instantáneos'],
    cons: ['Not surgical', 'Limited fine control', 'Can over-smooth', 'No spectral editing'],
    cons_es: ['No quirúrgico', 'Control fino limitado', 'Puede suavizar en exceso', 'Sin edición espectral'] },
  tbVObj
);
console.log('verdicts: ' + g.verdictProsCons.map(v => v.name).join(' | '));
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('PARTE 1 OK');
