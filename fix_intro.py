import json
path = 'data/guides.json'
with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for guide in data:
    if guide.get('id') == 'budget-mics':
        guide['intro'] = 'In this guide we focus exclusively on XLR microphones, the professional option that requires an audio interface to give you maximum quality in your home studio. You don\'t need to spend a fortune to get professional sound. Every mic here is the best choice for a specific job, from ultra-budget dynamics to studio condensers that punch above their price. Pick the one that matches what you record.'
        guide['intro_es'] = 'En esta guía nos enfocamos exclusivamente en micrófonos XLR, la opción profesional que requiere una interfaz de audio para darte la máxima calidad en tu home estudio. No tienes que gastar una fortuna para conseguir sonido profesional. Cada micrófono aquí es la mejor opción para un uso específico, desde dinámicos ultra-económicos hasta condensadores de estudio que rinden por encima de su precio. Elige el que coincida con lo que grabas.'
        break

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('done')
