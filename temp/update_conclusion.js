const fs=require('fs');
const data=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const g=data.find(x=>x.id==='best-monitors');
if(g){
  const es = `<p>Elegir el monitor ideal depende por completo de tu presupuesto y del tamaño de tu espacio de trabajo. Si tuviéramos que elegir los ganadores absolutos de esta guía, estos serían nuestros veredictos:</p>
<ul>
<li><strong>La recomendación definitiva sin límites de presupuesto:</strong> <span class="product-name">Genelec 8351B SAM</span>. Si buscas la perfección acústica absoluta, no lo dudes. Ofrece una imagen de fuente puntual impecable con 550W de potencia Clase D y un SPL máximo de 113 dB, adaptándose automáticamente a cualquier sala gracias a su sistema de calibración inteligente GLM AutoCal.</li>
<li><strong>El mejor para espacios medianos o pegados a la pared:</strong> <span class="product-name">Focal Shape 65</span>. Una opción excepcional de campo cercano que utiliza radiadores pasivos laterales en lugar de un puerto tradicional. Esto te permite colocarlo cerca de las paredes de tu habitación sin sufrir acumulación de graves, ofreciendo un tono orgánico gracias a su cono de lino y un sonido libre de fatiga con su amplificación Clase AB.</li>
<li><strong>El rey de la gama alta profesional para salas grandes:</strong> <span class="product-name">Focal Twin6 ST6</span>. Si tienes un estudio profesional amplio o una habitación grande y necesitas el máximo detalle en medios, el Twin6 ST6 ofrece una transparencia absoluta y el revolucionario Focus Mode para tener dos monitores en uno.</li>
<li><strong>La mejor opción calidad/precio para empezar:</strong> <span class="product-name">Kali Audio LP-6 V2</span>. Si trabajas en un estudio casero con presupuesto limitado, es el monitor más equilibrado y plano que puedes conseguir por su precio.</li>
</ul>`;
  const en = `<p>Choosing the ideal monitor depends entirely on your budget and the size of your workspace. If we had to pick the absolute winners of this guide, these would be our verdicts:</p>
<ul>
<li><strong>The ultimate recommendation with no budget limits:</strong> <span class="product-name">Genelec 8351B SAM</span>. If you’re after absolute acoustic perfection, don’t hesitate. It delivers flawless point-source imaging with 550W Class D power and 113 dB max SPL, automatically adapting to any room thanks to intelligent GLM AutoCal calibration.</li>
<li><strong>Best for medium rooms or wall placement:</strong> <span class="product-name">Focal Shape 65</span>. An exceptional nearfield option that uses lateral passive radiators instead of a traditional port. You can place it close to your walls without bass buildup, offering an organic tone from its flax cone and fatigue-free sound with Class AB amplification.</li>
<li><strong>The pro high-end king for large rooms:</strong> <span class="product-name">Focal Twin6 ST6</span>. If you have a large professional studio or room and need maximum midrange detail, the Twin6 ST6 offers absolute transparency and the revolutionary Focus Mode for two monitors in one.</li>
<li><strong>Best value for money to start:</strong> <span class="product-name">Kali Audio LP-6 V2</span>. If you work in a home studio on a limited budget, it’s the most balanced and flat monitor you can get for the price.</li>
</ul>`;
  g.conclusion_es = es;
  g.conclusion = en;
  fs.writeFileSync('data/guides.json',JSON.stringify(data,null,2));
  console.log('conclusion updated');
}
