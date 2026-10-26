# -*- coding: utf-8 -*-
"""Quickfacts for the drum-machine category (14 products).

Three groups, each read from the table it actually lives in:

  Drum machines / grooveboxes (4, best-drum-machine)
      Type / Tracks / Sound Engine
      The three questions at this price: what shape is it, how much can it run at
      once, and above all whether it makes its drums from samples, analog
      circuits or digital synthesis.

  Battery portables (7, compact-rhythm-devices)
      Type / Sound Engine / Battery
      These are bought to be carried, so the battery run time is a spec, not a
      footnote ("6xAA", "up to 8 hours", "USB powered").

  Samplers (3)
      Storage / Effects / Connectivity
      188 and 255 are read from best-samplers-drum-computers, 257 from
      best-hardware-samplers column 1. See the note below for why they are not
      all read from the same guide.

WHY THE SPLIT: `best-hardware-samplers` columns 4, 5 and 6 (EP-133 K.O. II,
MPC Live III, Polyphony Tracker Mini) have their Pads / Screen / Effects /
Storage / Polyphony / Working RAM rows filled with values from a different
schema (Type / Tracks / Sample Memory / Sequencer / Effects / Weight). Only
Connectivity and Battery are trustworthy on those three columns. The values are
not wrong, the row labels are shifted, so those products are read from
best-samplers-drum-computers, whose labels match, and column 1 (MPC Sample) is
clean and read from best-hardware-samplers directly.

Run:  python temp/apply_qf_drummachine.py
"""
import json

P_PATH = 'data/products.json'

TYP = ('Type', 'Tipo', 'chip')
TRK = ('Tracks', 'Pistas', 'layers')
SND = ('Sound Engine', 'Motor de sonido', 'wave')
BAT = ('Battery', 'Batería', 'battery')
STO = ('Storage', 'Almacenamiento', 'chip')
FX = ('Effects', 'Efectos', 'sliders')
CON = ('Connectivity', 'Conectividad', 'signal')

# id -> (guide, column, [three values], [three label tuples], bestFor en/es)
DATA = {
    # --- drum machines / grooveboxes -----------------------------------------
    129: ('best-drum-machine', 1,
          ['Groovebox (8-track)', '2 synth + 4 drum + 2 MIDI',
           'digital synth + samples'],
          [TYP, TRK, SND],
          ('First groovebox, no screen', 'Primer groovebox, sin pantalla')),
    33: ('best-drum-machine', 3,
          ['Rhythm performer', '11 parts + trigger', 'ACB + FM + samples'],
          [TYP, TRK, SND],
          ('Live techno and 808/909', 'Techno en directo y 808/909')),
    256: ('best-drum-machine', 4,
          ['Standalone sampler/sequencer', '32 plugin + 16 audio',
           'MPC sampler + plugins'],
          [TYP, TRK, SND],
          ('Standalone hip-hop brain, perfected',
           'El cerebro de hip-hop autónomo, afinado')),
    127: ('best-drum-machine', 5,
          ['Drum computer + sampler', '16 stereo/MIDI', 'Stereo samples + machines'],
          [TYP, TRK, SND],
          ('Stereo sampling god', 'Sampling estéreo de referencia')),

    # --- battery portables ----------------------------------------------------
    621: ('compact-rhythm-devices', 2,
          ['Bar workstation', 'AWM2 + FM + sampling', 'Built-in Li-ion, 3-4 hours'],
          [TYP, SND, BAT],
          ('Backpack all-in-one studio', 'Estudio completo de mochila')),
    622: ('compact-rhythm-devices', 3,
          ['Groovebox', 'Sampling', 'USB powered'],
          [TYP, SND, BAT],
          ('Affordable Elektron sequencing', 'Secuenciación Elektron asequible')),
    623: ('compact-rhythm-devices', 5,
          ['Groovebox', '12-bit sampling', 'Battery powered'],
          [TYP, SND, BAT],
          ('12-bit lo-fi nostalgia', 'Nostalgia lo-fi de 12 bits')),
    624: ('compact-rhythm-devices', 6,
          ['Pocket sampler', 'Sampling', '6xAA batteries'],
          [TYP, SND, BAT],
          ('Cheapest hardware sampling', 'El sampling hardware más barato')),
    625: ('compact-rhythm-devices', 7,
          ['Handheld tracker', 'Sampling + 5 synth engines',
           'Built-in Li-ion, up to 8 hours'],
          [TYP, SND, BAT],
          ('Tracker composing anywhere', 'Componer con tracker en cualquier sitio')),
    144: ('compact-rhythm-devices', 8,
          ['Groovebox', 'FM synthesis', 'USB powered'],
          [TYP, SND, BAT],
          ('FM groove sketching', 'Bocetos de groove con FM')),
    128: ('compact-rhythm-devices', 9,
          ['Compact drum machine', 'ACB + FM + samples', 'AA / USB'],
          [TYP, SND, BAT],
          ('ACB classics to go', 'Los clásicos ACB, para llevar')),

    # --- samplers -------------------------------------------------------------
    255: ('best-samplers-drum-computers', 3,
          ['16 GB internal + SD card', '41 multi-FX + 17 input FX',
           'USB-C audio/MIDI, MIDI I/O, SD slot'],
          [STO, FX, CON],
          ('Live performance, resampling and lo-fi beats',
           'Directo, resampling y beats lo-fi')),
    188: ('best-samplers-drum-computers', 2,
          ['8 GB RAM / 128 GB storage', 'MPC3 Pro FX pack, XYFX',
           'USB-C, MIDI, WiFi, Bluetooth'],
          [STO, FX, CON],
          ('Mobile production with Stems and 3D expression',
           'Producción móvil con Stems y expresión 3D')),
    257: ('best-hardware-samplers', 1,
          ['8GB internal + microSD', '60 FX types across 4 processors',
           'Built-in mic, TRS, USB-C'],
          [STO, FX, CON],
          ('Portable MPC pads at the best value',
           'Los pads MPC portátiles con mejor precio')),
}


def main():
    prods = json.load(open(P_PATH, encoding='utf-8'))
    by_id = {p['id']: p for p in prods}

    ids = [p['id'] for p in prods if p.get('category') == 'drum-machine']
    missing = [i for i in ids if i not in DATA]
    extra = [i for i in DATA if i not in ids]
    if missing or extra:
        raise SystemExit('uncovered: %s / unknown: %s' % (missing, extra))

    for pid, (_gid, _col, vals, label3, best) in DATA.items():
        p = by_id[pid]
        p['bestFor'] = {'en': best[0], 'es': best[1]}
        p['facts'] = [{'icon': icon, 'value': v,
                       'label': {'en': le, 'es': ls}, 'tone': 'good'}
                      for v, (le, ls, icon) in zip(vals, label3)]

    open(P_PATH, 'w', encoding='utf-8', newline='').write(
        json.dumps(prods, ensure_ascii=False, indent=2) + '\n')

    print('quickfacts set:', len(DATA))
    for pid in sorted(DATA):
        p = by_id[pid]
        print('  %4d %-40s %s' % (pid, p['title'][:40],
                                  ' | '.join('%s=%s' % (f['label']['en'], f['value'])
                                             for f in p['facts'])))


main()
