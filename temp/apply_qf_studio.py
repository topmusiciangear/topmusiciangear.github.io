# -*- coding: utf-8 -*-
"""Quickfacts for the studio category (2 digital mixers).

Both are columns of best-32-channel-digital-mixers, and every other column of
that table uses Channels / Mix Buses / Multitrack (labels "Channels", "Mix
Buses", "Multitrack", icons sliders / layers / wave). These two follow the same
trio so the whole table reads as one set; the two columns that use a different
scheme (Soundcraft Ui24R, StudioLive 32SC) do so because they also live in a
second, preamp-oriented guide.

Category note: SQ-6+ and TF3 are digital mixers filed under `studio`, not
`mixers`. That is how the catalogue already had them; the facts do not depend on
the category, so it is left alone.

Run:  python temp/apply_qf_studio.py
"""
import json

P_PATH = 'data/products.json'

CHN = ('Channels', 'Canales', 'sliders')
BUS = ('Mix Buses', 'Buses de mezcla', 'layers')
MTR = ('Multitrack', 'Multipista', 'wave')

# id -> (guide, column, [three values], bestFor en/es)
DATA = {
    414: ('best-32-channel-digital-mixers', 2,
          ['24 channels (up to 48)', '44-bus architecture', 'USB 32-track (SQ-Drive)'],
          ('Pristine mixing for touring pros',
           'Mezcla impecable para giras profesionales')),

    418: ('best-32-channel-digital-mixers', 4,
          ['24 channels (up to 48)', '20 aux + LR', 'USB 34-track'],
          ('Churches and schools via TouchFlow',
           'Iglesias y escuelas con TouchFlow')),
}


def main():
    prods = json.load(open(P_PATH, encoding='utf-8'))
    by_id = {p['id']: p for p in prods}

    ids = [p['id'] for p in prods if p.get('category') == 'studio']
    missing = [i for i in ids if i not in DATA]
    extra = [i for i in DATA if i not in ids]
    if missing or extra:
        raise SystemExit('uncovered: %s / unknown: %s' % (missing, extra))

    for pid, (_gid, _col, vals, best) in DATA.items():
        p = by_id[pid]
        p['bestFor'] = {'en': best[0], 'es': best[1]}
        p['facts'] = [{'icon': icon, 'value': v,
                       'label': {'en': le, 'es': ls}, 'tone': 'good'}
                      for v, (le, ls, icon) in zip(vals, [CHN, BUS, MTR])]

    open(P_PATH, 'w', encoding='utf-8', newline='').write(
        json.dumps(prods, ensure_ascii=False, indent=2) + '\n')

    print('quickfacts set:', len(DATA))
    for pid in sorted(DATA):
        p = by_id[pid]
        print('  %4d %-26s %s' % (pid, p['title'][:26],
                                  ' | '.join('%s=%s' % (f['label']['en'], f['value'])
                                             for f in p['facts'])))


main()
