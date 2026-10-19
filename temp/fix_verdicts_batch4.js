const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const fixes = {
  'best-electric-guitar': {
    verdict: "Beginner guitars from Yamaha and Squier for starting out, mid-range Fender Player and PRS SE for gigging, premium Gibson and PRS for professionals, and the Fender American Professional II and American Ultra II for the best of Fender.",
    verdict_es: "Guitarras de principiante de Yamaha y Squier para empezar, Fender Player y PRS SE de gama media para directo, Gibson y PRS premium para profesionales, y la Fender American Professional II y American Ultra II para lo mejor de Fender.",
    conclusion: "Yamaha and Squier are the best beginner guitars. Fender Player and PRS SE are the mid-range picks. Gibson and PRS are the premium picks. The Fender American Professional II and American Ultra II are the best of Fender. All are reliable enough for professional use.",
    conclusion_es: "Yamaha y Squier son las mejores guitarras para principiantes. Fender Player y PRS SE son las opciones de gama media. Gibson y PRS son las opciones premium. La Fender American Professional II y American Ultra II son lo mejor de Fender. Todas son fiables para uso profesional."
  },
  'best-beginner-electric-guitar': {
    verdict: "Start in the value tier: the Yamaha Pacifica 112V is the best all-round beginner electric, the Squier Affinity Stratocaster is the classic Strat pick, the Enya Nova Go Sonic is the smart pick.",
    verdict_es: "Empieza en el nivel de valor: la Yamaha Pacifica 112V es la mejor guitarra eléctrica para principiantes, la Squier Affinity Stratocaster es la opción Strat clásica, la Enya Nova Go Sonic es la opción inteligente.",
    conclusion: "The Yamaha Pacifica 112V is the best all-round beginner electric. The Squier Affinity Stratocaster is the classic Strat pick. The Enya Nova Go Sonic is the smart pick. All are reliable enough for professional use.",
    conclusion_es: "La Yamaha Pacifica 112V es la mejor guitarra eléctrica para principiantes. La Squier Affinity Stratocaster es la opción Strat clásica. La Enya Nova Go Sonic es la opción inteligente. Todas son fiables para uso profesional."
  },
  'best-compact-mixers': {
    verdict: "Behringer X32 Rack for IEM rigs and community support; Soundcraft Ui24R for app-free browser mixing; Behringer WING Rack for 48-channel flagship power; Allen & Heath SQ-Rack for touring; Behringer X Air XR18 for budget; Midas M32C for premium; Allen & Heath CQ-20B for compact; PreSonus StudioLive SE 24R for value.",
    verdict_es: "Behringer X32 Rack para rigs de IEM y soporte comunitario; Soundcraft Ui24R para mezcla sin app; Behringer WING Rack para potencia flagship de 48 canales; Allen & Heath SQ-Rack para giras; Behringer X Air XR18 para presupuesto; Midas M32C para premium; Allen & Heath CQ-20B para compacto; PreSonus StudioLive SE 24R para valor.",
    conclusion: "The X32 Rack is the IEM rig pick. The Ui24R is the app-free browser mixing pick. The WING Rack is the 48-channel flagship. The SQ-Rack is the touring pick. The XR18 is the budget pick. The M32C is the premium pick. The CQ-20B is the compact pick. The StudioLive SE 24R is the value pick. All are reliable enough for professional use.",
    conclusion_es: "El X32 Rack es la opción para rigs de IEM. El Ui24R es la opción de mezcla sin app. El WING Rack es el flagship de 48 canales. El SQ-Rack es la opción para giras. El XR18 es la opción económica. El M32C es la opción premium. El CQ-20B es la opción compacta. El StudioLive SE 24R es la opción de valor. Todos son fiables para uso profesional."
  },
  'best-digital-mixers': {
    verdict: "The Behringer X Air XR18 is the budget hybrid king. The Tascam Model 12 is the hands-on analog recorder. The Korg SoundLink MW-1608 is the analog-feel pick. The Soundcraft Ui24R is the app-free pick. The Soundcraft Ui16 is the compact pick. The PreSonus StudioLive 32SC is the value pick. The Yamaha DM3S is the compact digital pick. The Behringer WING Compact is the flagship pick.",
    verdict_es: "El Behringer X Air XR18 es el rey híbrido económico. El Tascam Model 12 es el grabador analógico manual. El Korg SoundLink MW-1608 es la opción de sensación analógica. El Soundcraft Ui24R es la opción sin app. El Soundcraft Ui16 es la opción compacta. El PreSonus StudioLive 32SC es la opción de valor. El Yamaha DM3S es la opción digital compacta. El Behringer WING Compact es la opción flagship.",
    conclusion: "The XR18 is the budget hybrid king. The Model 12 is the hands-on analog recorder. The MW-1608 is the analog-feel pick. The Ui24R is the app-free pick. The Ui16 is the compact pick. The StudioLive 32SC is the value pick. The DM3S is the compact digital pick. The WING Compact is the flagship pick. All are reliable enough for professional use.",
    conclusion_es: "El XR18 es el rey híbrido económico. El Model 12 es el grabador analógico manual. El MW-1608 es la opción de sensación analógica. El Ui24R es la opción sin app. El Ui16 es la opción compacta. El StudioLive 32SC es la opción de valor. El DM3S es la opción digital compacta. El WING Compact es la opción flagship. Todos son fiables para uso profesional."
  },
  'best-analog-mixers': {
    verdict: "The Yamaha MG10XU covers small gigs and beginners. The Mackie ProFX12v3 is the serious step up. The Allen & Heath ZEDi-10FX is the quality pick. The Soundcraft Signature 12 MTK is the recording pick. The SSL BiG SiX is the premium pick.",
    verdict_es: "La Yamaha MG10XU cubre pequeños directos y principiantes. La Mackie ProFX12v3 es el paso serio. La Allen & Heath ZEDi-10FX es la opción de calidad. La Soundcraft Signature 12 MTK es la opción de grabación. La SSL BiG SiX es la opción premium.",
    conclusion: "The MG10XU is the small gig pick. The ProFX12v3 is the serious step up. The ZEDi-10FX is the quality pick. The Signature 12 MTK is the recording pick. The BiG SiX is the premium pick. All are reliable enough for professional use.",
    conclusion_es: "La MG10XU es la opción para pequeños directos. La ProFX12v3 es el paso serio. La ZEDi-10FX es la opción de calidad. La Signature 12 MTK es la opción de grabación. La BiG SiX es la opción premium. Todas son fiables para uso profesional."
  },
  'best-monitors-for-small-rooms': {
    verdict: "The JBL 305P MkII is the top pick for most small rooms. The Kali LP-6 V2 adds bass. The ADAM Audio D3V is the detail pick. The Kali LP-UNF is the compact reference. The IK Multimedia iLoud Micro Monitor Pro is the desktop pick. The IK Multimedia iLoud MTM MKII is the pro pick. The ADAM Audio T5V is the value pick.",
    verdict_es: "La JBL 305P MkII es la mejor opción para la mayoría de salas pequeñas. La Kali LP-6 V2 añade graves. La ADAM Audio D3V es la opción de detalle. La Kali LP-UNF es la referencia compacta. La IK Multimedia iLoud Micro Monitor Pro es la opción de escritorio. La IK Multimedia iLoud MTM MKII es la opción pro. La ADAM Audio T5V es la opción de valor.",
    conclusion: "The JBL 305P MkII is the top pick for most small rooms. The Kali LP-6 V2 adds bass. The D3V is the detail pick. The LP-UNF is the compact reference. The iLoud Micro Monitor Pro is the desktop pick. The iLoud MTM MKII is the pro pick. The T5V is the value pick. All are reliable enough for professional mixing.",
    conclusion_es: "La JBL 305P MkII es la mejor opción para la mayoría de salas pequeñas. La Kali LP-6 V2 añade graves. La D3V es la opción de detalle. La LP-UNF es la referencia compacta. La iLoud Micro Monitor Pro es la opción de escritorio. La iLoud MTM MKII es la opción pro. La T5V es la opción de valor. Todas son fiables para mezcla profesional."
  },
  'best-ribbon-mics': {
    verdict: "The Royer R-121 is the gold standard for guitar amp recording. The sE Electronics Voodoo VR2 is the budget ribbon pick.",
    verdict_es: "El Royer R-121 es el estándar de oro para grabación de cajas de guitarra. La sE Electronics Voodoo VR2 es la opción de ribbon económica.",
    conclusion: "The Royer R-121 is the gold standard for guitar amp recording. The Voodoo VR2 is the budget ribbon pick. Both are reliable enough for professional recording.",
    conclusion_es: "El Royer R-121 es el estándar de oro para grabación de cajas de guitarra. La Voodoo VR2 es la opción de ribbon económica. Ambas son fiables para grabación profesional."
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
