const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'repitch-vs-melodyne');
g.productTable.rows = [
  { label: 'Best For', label_es: 'Ideal para', values: [
    { value: 'Fast daily multi-track vocal tuning', value_es: 'Afinación vocal diaria, veloz y multipista' },
    { value: 'Transparent correction on a tight budget', value_es: 'Corrección transparente con presupuesto ajustado' } ] },
  { label: 'Editing Type', label_es: 'Tipo de edición', values: [
    { value: 'Monophonic (smart multi-track view)', value_es: 'Monofónica (vista multipista inteligente)' },
    { value: 'Basic monophonic (one track per window)', value_es: 'Monofónica básica (una sola pista por ventana)' } ] },
  { label: 'Timing Tools', label_es: 'Herramientas de tiempo', values: [
    { value: 'Automatic SmartAttack + macros', value_es: 'SmartAttack + macros automáticas' },
    { value: 'Manual note-by-note timing', value_es: 'Ajuste de tiempo manual nota por nota' } ] },
  { label: 'Formant Editing', label_es: 'Edición de formantes', values: [
    { value: 'Included: reshape vocal timbre and character', value_es: 'Incluido: remodela el timbre y carácter vocal' },
    { value: 'Not included (Assistant and higher only)', value_es: 'No incluye (solo Assistant y superiores)' } ] },
  { label: 'Audio-to-MIDI', label_es: 'Audio a MIDI', values: [
    { value: 'Not included (audio processing only)', value_es: 'No incluye (solo procesado de audio)' },
    { value: 'Not included (Assistant and higher only)', value_es: 'No incluye (solo Assistant y superiores)' } ] },
  { label: 'Multi-Track View', label_es: 'Vista multipista', values: [
    { value: 'Yes: several takes side by side', value_es: 'Sí: varias tomas lado a lado' },
    { value: 'No: one track per window (Studio only)', value_es: 'No: una pista por ventana (solo Studio)' } ] },
  { label: 'Ecosystem', label_es: 'Ecosistema integrado', values: [
    { value: 'Direct SynchroLink to VocAlign & Revoice', value_es: 'SynchroLink directo a VocAlign y Revoice' },
    { value: 'Standalone (needs ARA or manual transfer)', value_es: 'Independiente (requiere ARA o transferencia manual)' } ] }
];
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('tabla 7 filas OK');
