const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let s = fs.readFileSync(p, 'utf8');
const needle = `      },
      {
        "heading": "Zynaptiq Unveil: The De-Reverb Processor That Rescues Live Recordings",`;
const insert = `      },
      {
        "heading": "Waves Clarity Vx Pro: Real-Time AI Noise Isolation for Dialogue",
        "heading_es": "Waves Clarity Vx Pro: Aislamiento de Ruido por IA en Tiempo Real para Diálogos",
        "content": "<p><strong>Waves Clarity Vx Pro is the absolute industry disrupter for noise restoration.</strong> Powered by Waves' advanced Neural Networks, it isolates dialogue from complex background noise — traffic, wind, air conditioning, or even construction — in real time with a single knob. The Pro version offers multi-band processing, allowing post-production engineers to surgically clean specific frequency ranges without introducing the metallic artifacts common in older spectral tools.</p>",
        "content_es": "<p><strong>Waves Clarity Vx Pro es el disruptor absoluto de la industria para la restauración de ruido.</strong> Impulsado por las redes neuronales avanzadas de Waves, aísla los diálogos de ruidos de fondo complejos — tráfico, viento, aire acondicionado o incluso construcción — en tiempo real con una sola perilla. La versión Pro ofrece procesamiento multibanda, lo que permite a los ingenieros de postproducción limpiar quirúrgicamente rangos de frecuencia específicos sin introducir los artefactos metálicos comunes en las herramientas espectrales más antiguas.</p>",
        "pros": [
          "Real-time noise isolation with a single knob",
          "Multi-band processing for surgical cleaning",
          "Ambient gate reduces residual noise",
          "Ambience extraction mode"
        ],
        "pros_es": [
          "Aislamiento en tiempo real con una sola perilla",
          "Procesamiento multibanda para limpieza quirúrgica",
          "Compuerta de ambiente reduce ruido residual",
          "Modo de extracción de ambiente"
        ],
        "cons": [
          "Heavy CPU usage",
          "Artifacts with extreme settings",
          "Shares basic engine with standard version",
          "Does not repair digital artifacts"
        ],
        "cons_es": [
          "Consumo masivo de CPU",
          "Artefactos con configuraciones extremas",
          "Comparte motor básico con la versión estándar",
          "No repara artefactos digitales"
        ],
        "products": [
          9010
        ],
        "verdict": "",
        "verdict_es": "",
        "specs": {}
      },
      {
        "heading": "Zynaptiq Unveil: The De-Reverb Processor That Rescues Live Recordings",`;
if (s.includes(needle)) {
  s = s.replace(needle, insert);
  fs.writeFileSync(p, s);
  console.log('done');
} else {
  console.log('target not found');
}
