import json
path='data/guides.json'
data=json.load(open(path,encoding='utf-8'))
guide=next(g for g in data if g['id']=='budget-mics')

# Fix verdict: replace with clean summary
guide['verdict']= """<p><strong>If you have to watch the spending, <span class="product-name">Rode NT1 Signature Series</span> is the safe pick.</strong> It is the classic NT1 studio condenser with the extras stripped out — just a 1-inch HF6 capsule, a cardioid pattern and 4 dBA of self-noise, making it one of the quietest large-diaphragm condensers at any price.</p><p><strong><span class="product-name">Shure SM57</span></strong> — The most recorded instrument microphone in history. Indestructible, affordable and incredible on guitar cabs, snares and horns.</p><p><strong><span class="product-name">Shure SM58</span></strong> — The world's most popular vocal microphone. Used by presidents, pop stars and pub singers alike.</p><p><strong><span class="product-name">Audio-Technica AT2020</span></strong> — The entry-level condenser professionals recommend for clean vocals and acoustic instruments.</p><p><strong><span class="product-name">Audio-Technica AT2035</span></strong> — The step up from the AT2020 that most home studios actually take, with pad and high-pass filter.</p><p><strong><span class="product-name">sE Electronics X1 S</span></strong> — A large-diaphragm condenser for home vocals with switchable pads and filters.</p><p><strong><span class="product-name">Lewitt LCT 240 PRO</span></strong> — A detailed small-diaphragm condenser with low self-noise for vocals and instruments.</p><p><strong><span class="product-name">sE Electronics sE7</span></strong> — A budget small-diaphragm condenser for acoustic instruments and overheads.</p><p><strong><span class="product-name">Sennheiser e935</span></strong> — A high-output cardioid vocal microphone engineered to cut through the mix.</p><p><strong><span class="product-name">AKG P120</span></strong> — An affordable medium-diaphragm condenser with switchable bass-cut and -20 dB pad.</p>"""

guide['verdict_es']= """<p><strong>Si tienes que ajustar el gasto, la <span class="product-name">Rode NT1 Signature Series</span> es la apuesta segura.</strong> Es el clásico condensador de estudio NT1 sin accesorios de más — solo una cápsula HF6 de 1 pulgada, patrón cardioide y 4 dBA de ruido propio — uno de los condensadores de diafragma grande más silenciosos que puedes comprar a cualquier precio.</p><p><strong><span class="product-name">Shure SM57</span></strong> — El micrófono de instrumento más grabado de la historia. Indestructible, asequible e increíble en cajas de guitarra, cajas y metales.</p><p><strong><span class="product-name">Shure SM58</span></strong> — El micrófono vocal más popular del mundo. Usado por presidentes, estrellas pop y cantantes de bar.</p><p><strong><span class="product-name">Audio-Technica AT2020</span></strong> — El condensador de entrada que recomiendan los profesionales para voces e instrumentos acústicos.</p><p><strong><span class="product-name">Audio-Technica AT2035</span></strong> — El paso adelante del AT2020 que la mayoría de los estudios caseros dan, con pad y filtro high-pass.</p><p><strong><span class="product-name">sE Electronics X1 S</span></strong> — Un condensador de diafragma grande para voces en casa con pads y filtros conmutables.</p><p><strong><span class="product-name">Lewitt LCT 240 PRO</span></strong> — Un condensador de diafragma pequeño detallado con bajo ruido propio para voces e instrumentos.</p><p><strong><span class="product-name">sE Electronics sE7</span></strong> — Un condensador de diafragma pequeño económico para instrumentos acústicos y overheads.</p><p><strong><span class="product-name">Sennheiser e935</span></strong> — Un micrófono vocal cardioide de alta salida diseñado para destacar en la mezcla.</p><p><strong><span class="product-name">AKG P120</span></strong> — Un condensador de diafragma medio asequible con filtro de corte de graves conmutable y pad de -20 dB.</p>"""

# Ensure verdictProsCons has 10 items
existing_names={v['name'] for v in guide['verdictProsCons']}
# Add Lewitt
if 'Lewitt LCT 240 PRO' not in existing_names:
    guide['verdictProsCons'].append({
      "name": "Lewitt LCT 240 PRO",
      "name_es": "Lewitt LCT 240 PRO",
      "pros": [
        "Low self-noise 14 dBA for clean recordings in quiet rooms",
        "Switchable 80Hz high-pass filter and -10 dB pad",
        "Cardioid pattern focuses source and rejects room noise",
        "Solid metal construction with good shockmount compatibility"
      ],
      "cons": [
        "Requires 48V phantom power",
        "More sensitive to room acoustics than dynamics",
        "No included accessories",
        "Price near top of budget range"
      ],
      "pros_es": [
        "Ruido propio bajo 14 dBA para grabaciones limpias en salas silenciosas",
        "Filtro high-pass 80Hz conmutable y pad -10 dB",
        "Patrón cardioide enfoca la fuente y rechaza ruido de sala",
        "Construcción metálica sólida con buena compatibilidad de shockmount"
      ],
      "cons_es": [
        "Requiere alimentación phantom 48V",
        "Más sensible a la acústica de la sala que un dinámico",
        "Sin accesorios incluidos",
        "Precio cerca del tope del rango presupuestario"
      ]
    })

# Add sE7
if 'sE Electronics sE7' not in existing_names:
    guide['verdictProsCons'].append({
      "name": "sE Electronics sE7",
      "name_es": "sE Electronics sE7",
      "pros": [
        "Small-diaphragm condenser with detailed transient response",
        "Cardioid pattern good for instruments and vocals",
        "Low self-noise for budget tier",
        "Compact size fits small desks"
      ],
      "cons": [
        "Requires phantom power",
        "Sensitive to room reflections",
        "No pad or filter switches",
        "Limited low-end for large instruments"
      ],
      "pros_es": [
        "Condensador de diafragma pequeño con respuesta transitoria detallada",
        "Patrón cardioide bueno para instrumentos y voces",
        "Bajo ruido propio para su gama",
        "Tamaño compacto para escritorios pequeños"
      ],
      "cons_es": [
        "Requiere alimentación phantom",
        "Sensible a reflexiones de sala",
        "Sin pad ni filtros conmutables",
        "Bajo limitado para instrumentos grandes"
      ]
    })

# Fix FAQs in featuredSnippet
fs=guide.get('featuredSnippet',{})
# q3 about X1 S podcasting
fs['faq_q3_en']="Is the sE Electronics X1 S good for podcasting?"
fs['faq_q3_es']="¿Es el sE Electronics X1 S bueno para podcasting?"
fs['faq_a3_en']="Yes, it works well for home podcasting. The large-diaphragm capsule gives warm vocals, the -10/-20 dB pads handle close speech, and the 80/160 Hz filters reduce room rumble. It requires 48V phantom power and an interface, but delivers condenser clarity at a budget price."
fs['faq_a3_es']="Sí, funciona bien para podcasting en casa. La cápsula de diafragma grande da voces cálidas, los pads -10/-20 dB controlan la voz cercana y los filtros 80/160 Hz reducen el ruido de sala. Necesita alimentación phantom 48V e interfaz, pero ofrece claridad de condensador a precio ajustado."

# q9 about Lewitt
fs['faq_q9_en']="Is the Lewitt LCT 240 PRO a good budget microphone?"
fs['faq_q9_es']="¿Es el Lewitt LCT 240 PRO un buen micrófono económico?"
fs['faq_a9_en']="Yes, it is a strong budget choice for home studio vocals and acoustic instruments. Low self-noise, switchable pad and high-pass filter, and a detailed cardioid capsule make it versatile. It needs phantom power and a treated room to shine, but offers quality above its price."
fs['faq_a9_es']="Sí, es una buena opción económica para voces e instrumentos acústicos en estudio casero. Bajo ruido propio, pad y filtro high-pass conmutables y una cápsula cardioide detallada lo hacen versátil. Necesita phantom y una sala tratada para brillar, pero ofrece calidad por encima de su precio."

guide['featuredSnippet']=fs

json.dump(data, open(path,'w',encoding='utf-8'), ensure_ascii=False, indent=2)
print('updated')
