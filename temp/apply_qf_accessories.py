# -*- coding: utf-8 -*-
"""Quickfacts for the accessories category (26 products).

The category is really four sub-groups with different spec sheets, so the facts
follow the table each product actually lives in rather than forcing one scheme:

  DI boxes (7, from the di-box table)
      Type / Connectivity / Weight
      Type decides whether the box needs phantom power, connectivity what plugs
      where, weight matters on a pedalboard. The table's Frequency Response row is
      prose for three of the seven ("Amp-tuned balance", "Flat extension..."), so
      Weight is the fact that is a real number for every model.

  DAW controllers (7, from the midi-controllers table)
      Faders / Protocol / Connectivity
      Fader count is the defining spec, protocol decides which DAWs actually talk
      to it (EUCON locks you to Pro Tools/Avid, MCU/HUI is universal), connectivity
      is what it plugs into.

  Stands, isolation and room treatment (12, from monitor-setup and
  studio-furniture plus the manufacturer data those tables omit)
      Type + two measurable specs (height, capacity, tilt, size, accuracy...)
      These tables only carry Category / Best For / Key Feature, so the numbers
      come from the Key Feature and Best For cells, from each product's catalog
      description (already published on the site, sourced from the maker), and for
      the K&M 210/2 from K&M's own spec sheet via Andertons (height 900-1,605 mm,
      800 mm boom, steel, zinc die-cast base).

Run:  python temp/apply_qf_accessories.py
"""
import json

P_PATH = 'data/products.json'

T = 'wrench'

# id -> [(label_en, label_es, icon, value)]
VALUES = {
    # --- DI boxes: Type / Connectivity / Weight (di-box table) ---------------
    445: [('Type', 'Tipo', T, 'Active (48V phantom)'),
          ('Connectivity', 'Conectividad', 'signal', '1/4" in + thru, XLR out'),
          ('Weight', 'Peso', 'weight', '1.35 lbs (612 g)')],
    446: [('Type', 'Tipo', T, 'Active (48V phantom)'),
          ('Connectivity', 'Conectividad', 'signal', '1/4" TRS in, XLR out'),
          ('Weight', 'Peso', 'weight', '1.8 lbs (816 g)')],
    447: [('Type', 'Tipo', T, 'Active preamp/DI, 9V or DC'),
          ('Connectivity', 'Conectividad', 'signal', '1/4" in; XLR + 2x 1/4" outs'),
          ('Weight', 'Peso', 'weight', '397 g')],
    448: [('Type', 'Tipo', T, 'Passive stereo transformer'),
          ('Connectivity', 'Conectividad', 'signal', '2x 1/4" in + thru, 2x XLR out'),
          ('Weight', 'Peso', 'weight', '0.54 kg')],
    449: [('Type', 'Tipo', T, 'Passive transformer (DI/LI modes)'),
          ('Connectivity', 'Conectividad', 'signal', '1/4" TRS in (stereo sum), XLR out'),
          ('Weight', 'Peso', 'weight', '370 g')],
    450: [('Type', 'Tipo', T, 'Passive transformer'),
          ('Connectivity', 'Conectividad', 'signal', '1/4" in + thru, XLR out'),
          ('Weight', 'Peso', 'weight', '250 g')],
    451: [('Type', 'Tipo', T, 'Active preamp, 9V or phantom'),
          ('Connectivity', 'Conectividad', 'signal', '1/4" in, XLR + 1/4" out, FX loop'),
          ('Weight', 'Peso', 'weight', '0.70 kg')],

    # --- DAW controllers: Faders / Protocol / Connectivity -------------------
    42: [('Faders', 'Faders', 'sliders', '8 motorized, 100mm'),
         ('Protocol', 'Protocolo', 'chip', 'MCU/HUI'),
         ('Connectivity', 'Conectividad', 'signal', 'USB-C, Ethernet')],
    395: [('Faders', 'Faders', 'sliders', '8 motorized, 100mm'),
          ('Protocol', 'Protocolo', 'chip', 'MCU/HUI'),
          ('Connectivity', 'Conectividad', 'signal', 'USB')],
    396: [('Faders', 'Faders', 'sliders', '9 motorized, 100mm'),
          ('Protocol', 'Protocolo', 'chip', 'MCU/HUI'),
          ('Connectivity', 'Conectividad', 'signal', 'USB, Ethernet')],
    397: [('Faders', 'Faders', 'sliders', '1 motorized'),
          ('Protocol', 'Protocolo', 'chip', 'MCU/HUI'),
          ('Connectivity', 'Conectividad', 'signal', 'USB-C')],
    398: [('Faders', 'Faders', 'sliders', '8 motorized'),
          ('Protocol', 'Protocolo', 'chip', 'EUCON'),
          ('Connectivity', 'Conectividad', 'signal', 'Ethernet (wired)')],
    399: [('Faders', 'Faders', 'sliders', '9 motorized'),
          ('Protocol', 'Protocolo', 'chip', 'Mackie Control/HUI'),
          ('Connectivity', 'Conectividad', 'signal', 'USB')],
    400: [('Faders', 'Faders', 'sliders', '9 motorized, 100mm'),
          ('Protocol', 'Protocolo', 'chip', 'MCU/HUI/Logic'),
          ('Connectivity', 'Conectividad', 'signal', 'USB, MIDI')],

    # --- Stands / isolation / room treatment --------------------------------
    # studio-furniture "Type" row
    39: [('Type', 'Tipo', T, 'Pop filter'),
         ('Material', 'Material', 'layers', 'Stainless steel'),
         ('Mesh', 'Rejilla', 'gauge', 'Twin-layer mesh')],
    # K&M spec sheet (Andertons): height 900-1,605 mm, 800 mm boom
    58: [('Type', 'Tipo', T, 'Boom mic stand'),
         ('Height', 'Altura', 'ruler', '900–1605 mm'),
         ('Boom', 'Brazo', 'gauge', '800 mm')],
    # monitor-setup Key Feature / Best For
    59: [('Type', 'Tipo', T, 'Floor monitor stands'),
         ('Height', 'Altura', 'ruler', '677–1132 mm'),
         ('Capacity', 'Capacidad', 'weight', '35 kg')],
    646: [('Type', 'Tipo', T, 'Desktop isolation stands'),
          ('Tilt', 'Inclinación', 'gauge', 'Up to 6.5°'),
          ('Capacity', 'Capacidad', 'weight', '34 kg')],
    647: [('Type', 'Tipo', T, 'Room correction software'),
          ('Accuracy', 'Precisión', 'gauge', '±0.5 dB'),
          ('Profiles', 'Perfiles', 'headphones', '500+ headphone profiles')],
    648: [('Type', 'Tipo', T, 'Measurement mic'),
          ('Resolution', 'Resolución', 'chip', '24-bit/48 kHz'),
          ('Pattern', 'Patrón', 'signal', 'Omni 20 Hz – 20 kHz')],
    649: [('Type', 'Tipo', T, 'Room calibration kit'),
          ('Filters', 'Filtros', 'sliders', '20+ filter groups'),
          ('Works with', 'Compatible con', 'lock', 'Genelec SAM only')],
    650: [('Type', 'Tipo', T, 'Isolation pads'),
          ('Size', 'Tamaño', 'ruler', '12 x 8.75 in'),
          ('Max load', 'Carga máx.', 'weight', 'Up to 100 lb')],
    651: [('Type', 'Tipo', T, 'Midfield monitor stands'),
          ('Height', 'Altura', 'ruler', 'Fixed 38-inch'),
          ('Capacity', 'Capacidad', 'weight', '34 kg')],
    # studio-furniture Feature row + catalog description
    167: [('Type', 'Tipo', T, 'XLR mic cable'),
          ('Shielding', 'Apantallamiento', 'layers', 'Quad-star shielded'),
          ('Connectors', 'Conectores', 'signal', 'Gold-plated XLR')],
    170: [('Type', 'Tipo', T, 'Acoustic panels'),
          ('Range', 'Rango', 'freq', '200 Hz – 4 kHz'),
          ('Contents', 'Contenido', 'layers', '4 panels')],
    173: [('Type', 'Tipo', T, 'Isolation pads'),
          ('Size', 'Tamaño', 'ruler', '263 x 380 mm'),
          ('Angles', 'Ángulos', 'gauge', 'Three angle positions')],
}

BEST = {
    39: ('Neutral pop filtering', 'Filtro antipop neutro'),
    42: ('Hands-on mixing and DAW control', 'Mezcla manual y control del DAW'),
    58: ('Steady mic placement on a budget', 'Colocación estable del micro sin gastar'),
    59: ('Monitor stands at ear level', 'Soportes de monitor a la altura del oído'),
    167: ('Clean studio connections', 'Conexiones limpias de estudio'),
    170: ('First-step room treatment', 'Primer paso para tratar la sala'),
    173: ('Decoupling monitors from the desk', 'Desacoplar los monitores de la mesa'),
    395: ('Home studio motorized faders', 'Faders motorizados para home studio'),
    396: ('Budget DAW mixing, 9 faders', 'Mezcla en DAW barata, 9 faders'),
    397: ('Single-fader pro mixing', 'Mezcla profesional con un fader'),
    398: ('Pro Tools and EUCON rigs', 'Pro Tools y sistemas EUCON'),
    399: ('Expandable budget control', 'Control económico ampliable'),
    400: ('Classic 9-fader DAW control', 'Control de DAW clásico de 9 faders'),
    445: ('Transparent DI for most rigs', 'DI transparente para casi todo'),
    446: ('Transformer character + speaker in', 'Carácter de transformador y entrada de altavoz'),
    447: ('Amp tone straight to the desk', 'Sonido de ampli directo a mesa'),
    448: ('Stereo keyboards and DJ rigs', 'Teclados estéreo y setups de DJ'),
    449: ('Transparent passive for pedalboards', 'Pasivo transparente para pedaleras'),
    450: ('Cheap and bulletproof on stage', 'Barato e irrompible en directo'),
    451: ('Acoustic guitars with built-in EQ', 'Guitarras acústicas con EQ incorporado'),
    646: ('Desktop decoupling with tilt', 'Desacople en mesa con inclinación'),
    647: ('Flatten any monitor setup', 'Aplanar cualquier configuración'),
    648: ('Accurate room measurement', 'Medición precisa de la sala'),
    649: ('Genelec SAM room calibration', 'Calibración de sala para Genelec SAM'),
    650: ('Decoupling for larger nearfields', 'Desacople para monitores grandes'),
    651: ('Heavy midfield monitor support', 'Soporte para monitores midfield pesados'),
}


def main():
    prods = json.load(open(P_PATH, encoding='utf-8'))
    by_id = {p['id']: p for p in prods}

    acc = [p['id'] for p in prods if p.get('category') == 'accessories']
    missing = [i for i in acc if i not in VALUES]
    extra = [i for i in VALUES if i not in acc]
    if missing or extra:
        raise SystemExit('uncovered: %s / unknown: %s' % (missing, extra))

    for pid, spec in VALUES.items():
        p = by_id[pid]
        en, es = BEST[pid]
        p['bestFor'] = {'en': en, 'es': es}
        p['facts'] = [{'icon': icon, 'value': value,
                       'label': {'en': len_, 'es': les},
                       'tone': 'good'}
                      for len_, les, icon, value in spec]

    open(P_PATH, 'w', encoding='utf-8', newline='').write(
        json.dumps(prods, ensure_ascii=False, indent=2) + '\n')

    print('quickfacts set:', len(VALUES))
    for pid in sorted(VALUES):
        p = by_id[pid]
        print('  %4d %-44s %s' % (pid, p['title'][:44],
                                  ' | '.join('%s=%s' % ((f['label']['en']), f['value'])
                                             for f in p['facts'])))


main()
