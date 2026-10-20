const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const q = g.find(x => x.id === 'beginner-bass-guitars');

// Remove ID 163 from featuredProducts
q.featuredProducts = q.featuredProducts.filter(id => id !== 163);
console.log('featuredProducts updated:', q.featuredProducts);

q.conclusion_es = '<p>Para quien busca el mejor equilibrio entre comodidad, versatilidad y precio, el <span class="product-name">Ibanez GSR200 GIO</span> es la eleccion ganadora: mastil GSR4 ultra estrecho, pastillas P/J Dynamix con Phat II EQ activo y cuerpo ligero por menos de 250 EUR.</p><p>Si prefieres un sonido mas clasico, la <span class="product-name">Squier Affinity Series Precision Bass PJ</span> entrega golpe Precision y growl Jazz en un solo instrumento. Y para quien quiera prestaciones activas de nivel superior, la <span class="product-name">Yamaha TRBX304</span> con EQ de 5 bandas y cuerpo de caoba es la referencia.</p>';

q.conclusion = '<p>For the best balance of comfort, versatility, and price, the <span class="product-name">Ibanez GSR200 GIO</span> takes the crown: ultra-narrow GSR4 neck, Dynamix P/J pickups with active Phat II EQ, and a lightweight body for under $250.</p><p>If you prefer a more classic sound, the <span class="product-name">Squier Affinity Series Precision Bass PJ</span> delivers Precision thump and Jazz growl in one instrument. And for those wanting pro-level active features, the <span class="product-name">Yamaha TRBX304</span> with its 5-band EQ and mahogany body is the benchmark.</p>';

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Done');