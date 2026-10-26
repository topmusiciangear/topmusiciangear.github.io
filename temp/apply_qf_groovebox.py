# -*- coding: utf-8 -*-
"""Quickfacts for the groovebox category (4 drum machines / grooveboxes).

These four are the remaining columns of best-drum-machine (columns 0, 2, 6, 7),
so they use the same trio as the drum machines in the drum-machine category:
Type / Tracks / Sound Engine. Keeping one scheme means the four cards already
rendering there and these four read the same way on the page.

Run:  python temp/apply_qf_groovebox.py
"""
import json

P_PATH = 'data/products.json'

TYP = ('Type', 'Tipo', 'chip')
TRK = ('Tracks', 'Pistas', 'layers')
SND = ('Sound Engine', 'Motor de sonido', 'wave')

# id -> (guide, column, [three values], bestFor en/es)
DATA = {
    610: ('best-drum-machine', 0,
          ['Pocket groovebox', '6 drum + 1 bass', 'ACB 808/909/606 + TB-303'],
          ('Pocket acid and boom', 'Acid y bombo de bolsillo')),

    614: ('best-drum-machine', 2,
          ['Analog drum machine', '10 analog voices', 'Pure analog + Color drive'],
          ('Raw analog punch', 'Pegada analógica pura')),

    612: ('best-drum-machine', 6,
          ['Drum computer + synth', '12 (8 digital + 4 analog)',
           'Hybrid synthesis, 37 engines'],
          ('Hybrid analog + digital drums',
           'Baterías híbridas analógicas y digitales')),

    613: ('best-drum-machine', 7,
          ['Hybrid drum synth', '4 hybrid voices', 'digital + analog filters'],
          ('Premium techno beast', 'Bestia techno premium')),
}


def main():
    prods = json.load(open(P_PATH, encoding='utf-8'))
    by_id = {p['id']: p for p in prods}

    ids = [p['id'] for p in prods if p.get('category') == 'groovebox']
    missing = [i for i in ids if i not in DATA]
    extra = [i for i in DATA if i not in ids]
    if missing or extra:
        raise SystemExit('uncovered: %s / unknown: %s' % (missing, extra))

    for pid, (_gid, _col, vals, best) in DATA.items():
        p = by_id[pid]
        p['bestFor'] = {'en': best[0], 'es': best[1]}
        p['facts'] = [{'icon': icon, 'value': v,
                       'label': {'en': le, 'es': ls}, 'tone': 'good'}
                      for v, (le, ls, icon) in zip(vals, [TYP, TRK, SND])]

    open(P_PATH, 'w', encoding='utf-8', newline='').write(
        json.dumps(prods, ensure_ascii=False, indent=2) + '\n')

    print('quickfacts set:', len(DATA))
    for pid in sorted(DATA):
        p = by_id[pid]
        print('  %4d %-32s %s' % (pid, p['title'][:32],
                                  ' | '.join('%s=%s' % (f['label']['en'], f['value'])
                                             for f in p['facts'])))


main()
