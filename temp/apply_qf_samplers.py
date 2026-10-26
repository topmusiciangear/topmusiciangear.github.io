# -*- coding: utf-8 -*-
"""Quickfacts for the samplers category (6 hardware samplers).

Scheme: Storage / Effects / Connectivity - the same trio the samplers in the
drum-machine category use, so a sampler reads identically wherever it appears.

All six are columns 4-9 of best-samplers-drum-computers (one each). That table
is used even for the three products that also appear in best-hardware-samplers,
because columns 4, 5 and 6 of that guide have their Pads / Screen / Effects /
Storage / Polyphony / Working RAM rows carrying values from a different schema.

Tracks was rejected: three of the six cells are the same "32 plugin + 16 stereo
audio" (the MPC family shares a platform), so the card would repeat itself and
say nothing about the difference between those machines.

Run:  python temp/apply_qf_samplers.py
"""
import json

P_PATH = 'data/products.json'

STO = ('Storage', 'Almacenamiento', 'chip')
FX = ('Effects', 'Efectos', 'sliders')
CON = ('Connectivity', 'Conectividad', 'signal')

# id -> (guide, column, [three values], bestFor en/es)
DATA = {
    620: ('best-samplers-drum-computers', 4,
          ['4 GB RAM / 32 GB + 64 GB SD', 'Factory FX (Raum, Phasis)',
           'USB-A/B, MIDI I/O, WiFi, Link'],
          ('Standalone integration for NI ecosystem fans',
           'Integración autónoma para el ecosistema NI')),

    615: ('best-samplers-drum-computers', 5,
          ['128 MB internal (999 slots)', '6 master FX + 12 punch-in FX',
           'USB-C, MIDI I/O, sync I/O'],
          ('Fast pocket sketching and punch-in performance FX',
           'Bocetos de bolsillo y FX de actuación')),

    616: ('best-samplers-drum-computers', 6,
          ['4 GB RAM / 64 GB storage', 'MPC FX rack insert chains',
           'USB-A/B, MIDI, WiFi, Bluetooth'],
          ('Keyboard-centric beatmakers and synth control',
           'Beatmakers de teclado y control de sintes')),

    617: ('best-samplers-drum-computers', 7,
          ['285 s mono total (140 s stereo)', 'Granular engine, 20 MFX, Vinyl Sim',
           'USB-C audio/MIDI, MIDI I/O'],
          ('Micro-sampling, granular soundscapes and travel',
           'Micro-sampling, paisajes granulares y viaje')),

    618: ('best-samplers-drum-computers', 8,
          ['228 s per pack + microSD', 'Grid FX, delay and reverb sends',
           'USB-C, MIDI In/Out/Thru, sync out'],
          ('Grid-based intuitive sampling and DAWless jams',
           'Sampling intuitivo por rejilla y jams sin DAW')),

    619: ('best-samplers-drum-computers', 9,
          ['16 GB RAM / 256 GB NVMe SSD', 'Full MPC premium FX suite',
           '2x USB-A, USB-B, 4x MIDI out'],
          ('Flagship studio centerpiece and hardware routing',
           'Centro de estudio insignia y routing hardware')),
}


def main():
    prods = json.load(open(P_PATH, encoding='utf-8'))
    by_id = {p['id']: p for p in prods}

    ids = [p['id'] for p in prods if p.get('category') == 'samplers']
    missing = [i for i in ids if i not in DATA]
    extra = [i for i in DATA if i not in ids]
    if missing or extra:
        raise SystemExit('uncovered: %s / unknown: %s' % (missing, extra))

    for pid, (_gid, _col, vals, best) in DATA.items():
        p = by_id[pid]
        p['bestFor'] = {'en': best[0], 'es': best[1]}
        p['facts'] = [{'icon': icon, 'value': v,
                       'label': {'en': le, 'es': ls}, 'tone': 'good'}
                      for v, (le, ls, icon) in zip(vals, [STO, FX, CON])]

    open(P_PATH, 'w', encoding='utf-8', newline='').write(
        json.dumps(prods, ensure_ascii=False, indent=2) + '\n')

    print('quickfacts set:', len(DATA))
    for pid in sorted(DATA):
        p = by_id[pid]
        print('  %4d %-40s %s' % (pid, p['title'][:40],
                                  ' | '.join('%s=%s' % (f['label']['en'], f['value'])
                                             for f in p['facts'])))


main()
