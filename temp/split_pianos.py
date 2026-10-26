import json, pathlib
p = pathlib.Path('data/guides.json')
data = json.loads(p.read_text(encoding='utf-8'))
guide = next((g for g in data if g.get('id')=='best-digital-pianos'), None)
sections = guide['sections']
# mid-range
idx = next(i for i,s in enumerate(sections) if s.get('heading')=='Best Mid-Range Portable digital Pianos')
s = sections[idx]
sections[idx] = {
    'heading': s['heading'],
    'heading_es': s['heading_es'],
    'content': '<p><strong>Roland FP-30X</strong> is the pick if touch comes first. The PHA-4 Standard action has escapement, triple-sensor detection and ivory-textured keytops, so pianissimo and fast repeats feel honest; 256-note polyphony means dense sustains never clip. SuperNATURAL modeling responds to velocity instead of playing flat samples, the 22W stereo system fills a room, and Bluetooth audio plus USB audio/MIDI cover play-along and recording. It has no display — deep editing lives in the Roland app — and at 14.8 kg it is the heaviest portable here.</p>',
    'content_es': '<p><strong>Roland FP-30X</strong> es la elección si lo primero es el tacto. La acción PHA-4 Standard lleva escape, detección de triple sensor y tapas con textura de marfil, así que el pianísimo y los pasajes rápidos se sienten fieles; sus 256 notas de polifonía evitan que las notas acumuladas con pedal se corten. El modelado SuperNATURAL responde a la velocidad en lugar de reproducir muestras planas, el sistema estéreo de 22 W llena una habitación y el Bluetooth audio junto al USB audio/MIDI sirven para acompañar y grabar. No tiene pantalla — la edición profunda vive en la app de Roland — y con 14,8 kg es el portátil más pesado de esta selección.</p>',
    'products': [141],
    'verdict': '', 'verdict_es': '', 'pros': [], 'pros_es': [], 'cons': [], 'cons_es': [], 'specs': {}
}
sections.insert(idx+1, {
    'heading': '', 'heading_es': '',
    'content': '<p><strong>Yamaha P-225</strong> is the compact alternative: GHC action, CFX concert grand samples with VRM Lite resonance, 192-note polyphony and 24 voices in an 11.5 kg slab. Bluetooth MIDI and USB audio/MIDI make it a clean controller for a DAW, and the dual headphone jacks suit lessons. The speaker system is softer than the FP-30X’s, and the sound engine keeps to piano-focused voices rather than a big general palette.</p>',
    'content_es': '<p><strong>Yamaha P-225</strong> es la alternativa compacta: acción GHC, muestras del gran concierto CFX con resonancia VRM Lite, 192 notas de polifonía y 24 voces en un cuerpo de 11,5 kg. El Bluetooth MIDI y el USB audio/MIDI lo convierten en un controlador limpio para tu DAW, y los dos jacks de auriculares vienen bien para clases. El sistema de altavoces rinde menos que el del FP-30X y el motor de sonido se centra en el piano en vez de ofrecer una paleta enorme de voces.</p>',
    'products': [140],
    'verdict': '', 'verdict_es': '', 'pros': [], 'pros_es': [], 'cons': [], 'cons_es': [], 'specs': {}
})
# console
idx2 = next(i for i,s in enumerate(sections) if s.get('heading')=='Best Console digital Pianos with Furniture')
s2 = sections[idx2]
sections[idx2] = {
    'heading': s2['heading'],
    'heading_es': s2['heading_es'],
    'content': '<p><strong>Roland RP107</strong> is the cheapest real console here: fixed cabinet, integrated three-pedal unit, sliding key cover, and the same PHA-4 Standard action with escapement as the FP-30X. 256-note polyphony and Bluetooth audio/MIDI are unusual at this price; what you give up is speaker power — the 8W+8W system is polite — and the front panel offers just 15 tones.</p>',
    'content_es': '<p><strong>Roland RP107</strong> es el mueble más barato de esta selección: mueble fijo, unidad de tres pedales integrada, tapa deslizante y la misma acción PHA-4 Standard con escape que el FP-30X. Sus 256 notas de polifonía y el Bluetooth audio/MIDI no son frecuentes a este precio; lo que se sacrifica es la potencia de altavoz — el sistema de 8 W+8 W es discreto — y el panel frontal ofrece solo 15 tonos.</p>',
    'products': [565],
    'verdict': '', 'verdict_es': '', 'pros': [], 'pros_es': [], 'cons': [], 'cons_es': [], 'specs': {}
}
sections.insert(idx2+1, {
    'heading': '', 'heading_es': '',
    'content': '<p><strong>Yamaha Arius YDP-146</strong> is the most affordable way into a furniture console here: fixed cabinet, sliding key cover and three-pedal unit with half-pedal support around Yamaha’s GHS hammer action — no escapement simulation, but honest graded weight. CFX sampling with VRM Lite, 192-note polyphony, 10 voices and Bluetooth audio plus MIDI cover home practice, and the 8W+8W system with diffuser grilles is tuned for the living room, not the stage.</p>',
    'content_es': '<p><strong>Yamaha Arius YDP-146</strong> es la forma más asequible de entrar en un mueble: mueble fijo, tapa deslizante y triple pedalera con medio pedal construido sobre la conocida acción de martillo GHS de Yamaha — sin simulación de escape, pero con peso graduado honesto. Muestras del CFX con VRM Lite, 192 notas de polifonía, 10 voces y Bluetooth audio más MIDI cubren la práctica en casa, y el sistema de 8W+8W con rejillas difusoras está pensado para el salón, no para el escenario.</p>',
    'products': [573],
    'verdict': '', 'verdict_es': '', 'pros': [], 'pros_es': [], 'cons': [], 'cons_es': [], 'specs': {}
})
sections.insert(idx2+2, {
    'heading': '', 'heading_es': '',
    'content': '<p><strong>Yamaha Arius YDP-166</strong> is the classic living-room choice: GrandTouch-E action with escapement and synthetic ebony/ivory keytops, CFX sample with VRM Lite, 192-note polyphony, and Bluetooth audio plus MIDI in the cabinet that has defined the Arius line for years. It keeps 10 voices and 20W×2 amplification and has no line output, so recording goes through USB audio.</p>',
    'content_es': '<p><strong>Yamaha Arius YDP-166</strong> es la opción clásica para el salón: acción GrandTouch-E con escape y tapas sintéticas de marfil y ébano, muestreo del CFX con VRM Lite, 192 notas de polifonía y Bluetooth audio más MIDI en el mueble que ha definido la gama Arius durante años. Mantiene 10 voces y 20 W×2 de amplificación y no tiene salida de línea, así que la grabación externa se realiza directamente a través de su puerto de audio USB.</p>',
    'products': [567],
    'verdict': '', 'verdict_es': '', 'pros': [], 'pros_es': [], 'cons': [], 'cons_es': [], 'specs': {}
})
p.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
print('done')
