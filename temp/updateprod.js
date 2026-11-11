const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const prod = d.find(x => x.id === 9010);
prod.desc = "The absolute industry disrupter for real-time noise restoration. Powered by advanced neural networks, it instantly isolates dialogue from heavy background noise—like traffic, wind, air conditioning, or construction—with a single control knob while keeping the vocal performance perfectly natural.";
prod.desc_es = "El disruptor absoluto de la industria para la restauración de ruido en tiempo real. Impulsado por redes neuronales avanzadas, aísla los diálogos de ruidos de fondo pesados—como tráfico, viento, aire acondicionado o construcción—con una sola perilla mientras mantiene la actuación vocal perfectamente natural.";
prod.img = "https://banners.pluginboutique.com/wbgbxuhoe151qk90xwraw60414kz";
prod.facts = [
  { "icon": "sliders", "value": "VST3/AU/AAX", "label": { "en": "Format", "es": "Formato" } },
  { "icon": "cpu", "value": "High", "label": { "en": "CPU", "es": "CPU" } }
];
fs.writeFileSync(p, JSON.stringify(d, null, 2));
console.log('done');
