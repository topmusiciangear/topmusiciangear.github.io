const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const fixes = {
  'streaming-interfaces': {
    verdict: "The Rodecaster Duo is the full console for streamers who want everything built in. The Roland Bridge Cast X is the console gaming pick, the Audient EVO 4 is the budget pick, the Universal Audio Volt 276 adds a real compressor, and the Focusrite Scarlett 2i2 is the proven all-rounder.",
    verdict_es: "La Rodecaster Duo es la consola completa para streamers que lo quieren todo integrado. La Roland Bridge Cast X es la opción gaming, la Audient EVO 4 es la opción económica, la Universal Audio Volt 276 añade un compresor real, y la Focusrite Scarlett 2i2 es la todoterreno probada.",
    conclusion: "The Rodecaster Duo is the full broadcast-console experience. The Bridge Cast X is the best for console gaming. The EVO 4 is the budget pick with Smartgain. The Volt 276 adds a real analog compressor for voice work. The Scarlett 2i2 is the proven all-rounder. All are compact and reliable enough for professional streaming.",
    conclusion_es: "La Rodecaster Duo es la experiencia de consola de broadcast completa. La Bridge Cast X es la mejor para gaming en consola. La EVO 4 es la opción económica con Smartgain. La Volt 276 añade un compresor analógico real para trabajo de voz. La Scarlett 2i2 es la todoterreno probada. Todas son compactas y fiables para streaming profesional."
  },
  'best-headphones': {
    verdict: "The Beyerdynamic DT 770 Pro is the all-round studio workhorse. The Sennheiser HD 490 Pro Plus is the modern reference. The Audio-Technica ATH-M50x is the producing favorite. The Sony MDR-7506 is the broadcast standard. The Beyerdynamic DT 990 Pro is the open-back mixing pick. The AKG K371 is the neutral reference. The Sennheiser HD 600 is the timeless audiophile choice. The Audio-Technica ATH-R70xa is the analytical reference. The Neumann NDH 30 is the pro studio reference. The Audeze LCD-X is the planar magnetic flagship.",
    verdict_es: "El Beyerdynamic DT 770 Pro es el caballo de batalla de estudio. La Sennheiser HD 490 Pro Plus es la referencia moderna. La Audio-Technica ATH-M50x es la favorita para producción. La Sony MDR-7506 es el estándar de broadcast. La Beyerdynamic DT 990 Pro es la opción abierta para mezcla. La AKG K371 es la referencia neutral. La Sennheiser HD 600 es la elección audiófila atemporal. La Audio-Technica ATH-R70xa es la referencia analítica. La Neumann NDH 30 es la referencia de estudio profesional. La Audeze LCD-X es el flagship de magnético plano.",
    conclusion: "For all-round studio use the DT 770 Pro is the pair you'll reach for most days. The HD 490 Pro Plus is the modern reference for mixing. The ATH-M50x is the producing favorite. The MDR-7506 is the broadcast standard. The DT 990 Pro is the open-back mixing pick. The K371 is the neutral reference. The HD 600 is the timeless audiophile choice. The ATH-R70xa is the analytical reference. The NDH 30 is the pro studio reference. The LCD-X is the planar magnetic flagship.",
    conclusion_es: "Para uso de estudio general, el DT 770 Pro es el que usarás casi a diario. La HD 490 Pro Plus es la referencia moderna para mezcla. La ATH-M50x es la favorita para producción. La MDR-7506 es el estándar de broadcast. La DT 990 Pro es la opción abierta para mezcla. La K371 es la referencia neutral. La HD 600 es la elección audiófila atemporal. La ATH-R70xa es la referencia analítica. La NDH 30 es la referencia de estudio profesional. La LCD-X es el flagship de magnético plano."
  },
  'budget-headphones': {
    verdict: "The Sennheiser HD 560S is the most accurate for mixing. The Sony MDR-7506 is the tracking standard. The Audio-Technica ATH-M40x is the budget closed-back pick. The SRH440A adds detail. The ATH-R30x is the reference pick.",
    verdict_es: "La Sennheiser HD 560S es la más precisa para mezcla. La Sony MDR-7506 es el estándar de grabación. La Audio-Technica ATH-M40x es la opción cerrada económica. La SRH440A añade detalle. La ATH-R30x es la opción de referencia.",
    conclusion: "The Sennheiser HD 560S is the most accurate for mixing. The Sony MDR-7506 is the tracking standard. The Audio-Technica ATH-M40x is the budget closed-back pick. The SRH440A adds detail. The ATH-R30x is the reference pick. All are closed-back, durable, and reliable enough for professional work.",
    conclusion_es: "La Sennheiser HD 560S es la más precisa para mezcla. La Sony MDR-7506 es el estándar de grabación. La Audio-Technica ATH-M40x es la opción cerrada económica. La SRH440A añade detalle. La ATH-R30x es la opción de referencia. Todas son cerradas, duraderas y fiables para trabajo profesional."
  },
  'tracking-headphones': {
    verdict: "The Beyerdynamic DT 770 Pro is the king of comfort and tracking isolation. The Sennheiser HD 280 PRO II wins on pure noise blocking. The Shure SRH440A adds detail. The Audio-Technica ATH-M50x is the producing favorite. The AKG K371 is the neutral reference.",
    verdict_es: "El Beyerdynamic DT 770 Pro es el rey del confort y aislamiento en grabación. La Sennheiser HD 280 PRO II gana en bloqueo puro de ruido. La Shure SRH440A añade detalle. La Audio-Technica ATH-M50x es la favorita para producción. La AKG K371 es la referencia neutral.",
    conclusion: "The DT 770 Pro remains the professional's pick for tracking — comfortable for hours, excellent isolation. The HD 280 PRO II wins on pure noise blocking. The SRH440A adds detail. The ATH-M50x is the producing favorite. The K371 is the neutral reference. All are closed-back, durable, and reliable enough for professional tracking.",
    conclusion_es: "El DT 770 Pro sigue siendo la elección del profesional para grabación — cómodo durante horas, excelente aislamiento. La HD 280 PRO II gana en bloqueo puro de ruido. La SRH440A añade detalle. La ATH-M50x es la favorita para producción. La K371 es la referencia neutral. Todas son cerradas, duraderas y fiables para grabación profesional."
  },
  'best-microphone': {
    verdict: "For harsh voices on a budget, the sE X1 R smooths what condensers exaggerate. The Audio-Technica AT2020, Lewitt LCT 240 PRO and Rode NT1 models cover crisp, silent backgrounds. The Shure SM7dB is the broadcast standard. The Aston Origin is the budget condenser pick.",
    verdict_es: "Para voces duras con presupuesto, la sE X1 R suaviza lo que los condensadores exageran. La Audio-Technica AT2020, Lewitt LCT 240 PRO y Rode NT1 cubren fondos silenciosos y nítidos. La Shure SM7dB es el estándar de broadcast. La Aston Origin es la opción de condensador económica.",
    conclusion: "The sE X1 R smooths harsh voices. The AT2020, LCT 240 PRO and NT1 cover crisp, silent backgrounds. The SM7dB is the broadcast standard. The Aston Origin is the budget condenser pick. All are reliable enough for professional vocal recording.",
    conclusion_es: "La sE X1 R suaviza voces duras. La AT2020, LCT 240 PRO y NT1 cubren fondos silenciosos y nítidos. La SM7dB es el estándar de broadcast. La Aston Origin es la opción de condensador económica. Todas son fiables para grabación vocal profesional."
  },
  'best-monitors': {
    verdict: "Budget? JBL 305P MkII. Value? Kali LP-6 V2. Punch? KRK Rokit 7 G5. Reference? Yamaha HS8. Detail? The Adam A7V. Accuracy per dollar? The Kali IN-8 V2. Extended bass? The Kali WS-6.2.",
    verdict_es: "¿Económico? JBL 305P MkII. ¿Valor? Kali LP-6 V2. ¿Punch? KRK Rokit 7 G5. ¿Referencia? Yamaha HS8. ¿Detalle? La Adam A7V. ¿Precisión por dólar? La Kali IN-8 V2. ¿Graves extendidos? La Kali WS-6.2.",
    conclusion: "The JBL 305P MkII is the budget pick. The Kali LP-6 V2 adds value and detail. The KRK Rokit 7 G5 brings punch. The Yamaha HS8 is the reference. The Adam A7V adds ribbon detail. The Kali IN-8 V2 is the accuracy per dollar pick. The Kali WS-6.2 adds extended bass. All are reliable enough for professional mixing.",
    conclusion_es: "La JBL 305P MkII es la opción económica. La Kali LP-6 V2 añade valor y detalle. La KRK Rokit 7 G5 aporta punch. La Yamaha HS8 es la referencia. La Adam A7V añade detalle de ribbon. La Kali IN-8 V2 es la opción de precisión por dólar. La Kali WS-6.2 añade graves extendidos. Todas son fiables para mezcla profesional."
  },
  'budget-monitors': {
    verdict: "The JBL 305P is the ultra-budget pick. The Kali LP-6 V2 adds value and detail. The KRK Rokit 7 G5 brings DSP room correction. The Kali IN-8 V2 is the accuracy per dollar pick. The Kali LP-UNF is the compact reference. The Yamaha HS8 is the proven standard.",
    verdict_es: "La JBL 305P es la opción ultra-económica. La Kali LP-6 V2 añade valor y detalle. La KRK Rokit 7 G5 aporta corrección de sala DSP. La Kali IN-8 V2 es la opción de precisión por dólar. La Kali LP-UNF es la referencia compacta. La Yamaha HS8 es el estándar probado.",
    conclusion: "The JBL 305P MkII leads for ultra-tight budgets. The Kali LP-6 V2 adds value and detail. The KRK Rokit 7 G5 brings DSP room correction. The Kali IN-8 V2 is the accuracy per dollar pick. The Kali LP-UNF is the compact reference. The Yamaha HS8 is the proven standard. All are reliable enough for professional mixing.",
    conclusion_es: "La JBL 305P MkII lidera para presupuestos ultra-ajustados. La Kali LP-6 V2 añade valor y detalle. La KRK Rokit 7 G5 aporta corrección de sala DSP. La Kali IN-8 V2 es la opción de precisión por dólar. La Kali LP-UNF es la referencia compacta. La Yamaha HS8 es el estándar probado. Todas son fiables para mezcla profesional."
  }
};

let count = 0;
for (const [id, fix] of Object.entries(fixes)) {
  const guide = g.find(x => x.id === id);
  if (guide) {
    Object.assign(guide, fix);
    count++;
    console.log('OK', id);
  } else {
    console.log('NOT FOUND', id);
  }
}

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2));
console.log('Total:', count, 'guias corregidas');
