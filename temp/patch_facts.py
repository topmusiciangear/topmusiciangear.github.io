import json

p = 'data/products.json'
d = json.load(open(p, encoding='utf-8'))

facts_data = {
  434: {
    "bestFor": {"en": "Drums, loud amps, boomy rooms", "es": "Baterías, amplis potentes, salas con mucho bajo"},
    "facts": [
      {"icon": "volumeHigh", "value": "-20 dB", "label": {"en": "Pad", "es": "Pad"}, "tone": "good"},
      {"icon": "sliders", "value": "300 Hz", "label": {"en": "Bass cut", "es": "Corte de graves"}, "tone": "good"},
      {"icon": "volumeHigh", "value": "150 dB", "label": {"en": "Max SPL", "es": "SPL máx."}, "tone": "good"},
    ],
  },
  570: {
    "bestFor": {"en": "Living rooms, serious practice", "es": "Salones, estudio serio"},
    "facts": [
      {"icon": "keyboard", "value": "GrandTouch-S", "label": {"en": "Key action", "es": "Mecánica"}, "tone": "good"},
      {"icon": "music", "value": "256 notes", "label": {"en": "Polyphony", "es": "Polifonía"}, "tone": "good"},
      {"icon": "wrench", "value": "57 kg", "label": {"en": "Weight", "es": "Peso"}, "tone": "tradeoff"},
    ],
  },
  54: {
    "bestFor": {"en": "Beginners and podcasters", "es": "Principiantes y podcasters"},
    "facts": [
      {"icon": "sliders", "value": "Colour LCD", "label": {"en": "Live meters", "es": "Medidores en vivo"}, "tone": "good"},
      {"icon": "microphone", "value": "60 dB", "label": {"en": "Preamp gain", "es": "Ganancia del previo"}, "tone": "good"},
      {"icon": "arrowLeft", "value": "2-in / 2-out", "label": {"en": "Channels", "es": "Canales"}, "tone": "tradeoff"},
    ],
  },
}

for prod in d:
    if prod['id'] in facts_data:
        fd = facts_data[prod['id']]
        prod['bestFor'] = fd['bestFor']
        prod['facts'] = fd['facts']

json.dump(d, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print('patched', list(facts_data.keys()))
