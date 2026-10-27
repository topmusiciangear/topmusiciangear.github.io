import json
path = 'data/guides.json'
with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for guide in data:
    if guide.get('id') == 'budget-mics':
        fs = guide.get('featuredSnippet', {})
        # Update title_es and text
        fs['title_es'] = 'Los mejores micrófonos XLR económicos por menos de $200'
        fs['title_en'] = 'Best Budget XLR Microphones Under $200'
        fs['text_en'] = 'The best budget XLR mics under $200 include the Rode NT1 Signature for quiet studio vocals, the Audio-Technica AT2035 for versatile recording, the sE Electronics X1 S for warm home vocals, the Shure SM57 for instruments and live work, the Lewitt LCT 240 PRO for detailed home studio recordings, the Audio-Technica AT2020 for condenser clarity, the sE Electronics sE7 for acoustic instruments and overheads, the Sennheiser e935 for live vocals, the Shure SM58 for broadcast vocals, and the AKG P120 for affordable medium-diaphragm versatility.'
        fs['text_es'] = 'Los mejores micrófonos XLR económicos por menos de $200 incluyen la Rode NT1 Signature para voces de estudio silenciosas, la Audio-Technica AT2035 para grabación versátil, la sE Electronics X1 S para voces cálidas en casa, la Shure SM57 para instrumentos y directo, la Lewitt LCT 240 PRO para grabaciones detalladas en estudio casero, la Audio-Technica AT2020 para claridad de condensador, la sE Electronics sE7 para instrumentos acústicos y overheads, la Sennheiser e935 para voces en vivo, la Shure SM58 para voces de broadcast y el AKG P120 para versatilidad asequible de diafragma medio.'
        # Clean FAQ placeholders
        # FAQ a2
        fs['faq_a2_en'] = 'For clean vocals and acoustics, yes. The AT2020 uses a 16mm low-mass diaphragm — the same design class as studio condensers costing several times more — so it captures clean, detailed audio with a smooth, uncoloured response. It needs phantom power from your interface, but no other budget condenser offers this level of clarity at the price. If your budget is strict and your room is untreated, a dynamic like the SM57 is more forgiving, but for detail and air, the AT2020 is the best condenser you can buy.'
        fs['faq_a2_es'] = 'Para voces e instrumentos acústicos limpios, sí. El AT2020 utiliza un diafragma de baja masa de 16 mm — la misma clase de diseño que condensadores de estudio que cuestan varias veces más — así que captura audio limpio y detallado con una respuesta suave y sin coloración. Necesita alimentación fantasma de tu interfaz, pero ningún otro condensador económico ofrece este nivel de claridad al precio. Si tu presupuesto es estricto y tu sala no está tratada, un dinámico como el SM57 es más tolerante, pero para detalle y aire, el AT2020 es el mejor condensador que puedes comprar.'
        # FAQ a4
        fs['faq_a4_en'] = 'Yes for pure XLR mics — you need an audio interface or mixer with XLR inputs, and 48V phantom power for the condensers. The dynamics (SM57, SM58) work without phantom power, while the condensers (AT2020, NT1 Signature, AT2035, X1 S, LCT 240 PRO, sE7) require it. All mics in this guide are XLR only. If you want more plug-and-play options, check our Best Budget USB Microphones guide.'
        fs['faq_a4_es'] = 'Sí para los micros puramente XLR — necesitas una interfaz de audio o mezclador con entradas XLR, y alimentación fantasma de 48V para los condensadores. Los dinámicos (SM57, SM58) funcionan sin alimentación fantasma, mientras que los condensadores (AT2020, NT1 Signature, AT2035, X1 S, LCT 240 PRO, sE7) la requieren. Todos los micrófonos de esta guía son solo XLR. Si quieres más opciones conectar y usar, mira nuestra guía de Mejores Micrófonos USB Económicos.'
        # FAQ a5
        fs['faq_a5_en'] = 'It depends on your room. In a treated or naturally dead room, a large-diaphragm condenser like the AT2020 captures the detail and air vocals need. In an untreated room with traffic noise, fan hum or echo, a dynamic like the SM58 rejects background noise far better and you will get cleaner takes without needing acoustic treatment.'
        fs['faq_a5_es'] = 'Depende de tu habitación. En una sala tratada o naturalmente muerta, un condensador de diafragma grande como el AT2020 captura el detalle y el aire que las voces necesitan. En una habitación sin tratamiento con ruido de tráfico, zumbido de ventilador o eco, un dinámico como el SM58 rechaza el ruido de fondo mucho mejor y obtendrás tomas más limpias sin necesitar tratamiento acústico.'
        # FAQ q7 and a7 remove placeholders
        fs['faq_q7_en'] = 'Which XLR microphone offers the best value under $100?'
        fs['faq_a7_en'] = 'The Shure SM57 at around $99 is the best value under $100 for instruments and live vocals. For home studio vocals, the Audio-Technica AT2020 around $99 is the classic entry condenser. Both offer professional results without exceeding the budget.'
        fs['faq_q7_es'] = '¿Qué micrófono XLR ofrece la mejor relación calidad-precio por menos de $100?'
        fs['faq_a7_es'] = 'El Shure SM57 por unos $99 es la mejor relación calidad-precio para instrumentos y voces en vivo. Para voces en estudio casero, el Audio-Technica AT2020 por unos $99 es el condensador de entrada clásico. Ambos ofrecen resultados profesionales sin superar el presupuesto.'
        # Update featuredProducts to include all 10 products
        guide['featuredProducts'] = [297, 298, 1055, 5, 672, 196, 1056, 227, 50, 434]
        guide['featuredSnippet'] = fs
        break

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('done')
