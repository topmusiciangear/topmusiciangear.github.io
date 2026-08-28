var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var idx = g.findIndex(function(x){return x.id==='best-32-channel-digital-mixers'});
var guide = g[idx];

// EN conclusion - simple paragraph like other guides
guide.conclusion = 'The Behringer X32 remains the best overall value with its 32 MIDAS-designed preamps, 25 motorized faders and massive online community. If you need premium sound, the Midas M32 LIVE elevates everything with genuine MIDAS PRO preamps and dual SD recording. For future-proof 96 kHz processing and 36 mix buses, the Allen & Heath SQ-6 is unmatched. Churches and schools will love the Yamaha TF3 for its intuitive TouchFlow interface, while self-managed bands and bars should look at the Soundcraft Ui24R for its rack-mount simplicity and built-in Wi-Fi. Budget-conscious buyers get serious power from the PreSonus StudioLive SE 32R at the lowest price in this range. <p><a href="/guides/best-digital-mixers.html" class="guide-link-btn">Best Digital Mixers</a> <a href="/guides/best-analog-mixers.html" class="guide-link-btn">Best Analog Mixers</a> <a href="/guides/best-compact-mixers.html" class="guide-link-btn">Best Compact Mixers</a> <a href="/guides/best-live-sound-mixers.html" class="guide-link-btn">Best Live Sound Mixers</a></p>';

// ES conclusion - simple paragraph like other guides
guide.conclusion_es = 'La Behringer X32 sigue siendo la mejor en relación calidad-precio con sus 32 preamplificadores MIDAS, 25 faders motorizados y una enorme comunidad en línea. Si necesitas sonido premium, la Midas M32 LIVE eleva todo con preamplificadores MIDAS PRO genuinos y grabación dual en SD. Para procesamiento futuro a 96 kHz y 36 buses de mezcla, la Allen & Heath SQ-6 es insuperable. Las iglesias y escuelas amarán la Yamaha TF3 por su interfaz TouchFlow intuitiva, mientras que las bandas autogestionadas y bares deben mirar la Soundcraft Ui24R por su simplicidad de rack y Wi-Fi integrado. Los compradores con presupuesto limitado obtienen serio poder con la PreSonus StudioLive SE 32R al precio más bajo de esta categoría. <p><a href="/guides/best-digital-mixers.html" class="guide-link-btn">Mejores Mezcladoras Digitales</a> <a href="/guides/best-analog-mixers.html" class="guide-link-btn">Mejores Mezcladoras Analógicas</a> <a href="/guides/best-compact-mixers.html" class="guide-link-btn">Mejores Mezcladoras Compactas</a> <a href="/guides/best-live-sound-mixers.html" class="guide-link-btn">Mejores Mezcladoras para Sonido en Vivo</a></p>';

// Remove conclusion_title since we use the standard "Conclusion" / "Conclusión"
delete guide.conclusion_title;
delete guide.conclusion_title_es;

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Conclusion updated to simple paragraph format');
