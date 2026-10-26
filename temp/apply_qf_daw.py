# -*- coding: utf-8 -*-
"""Quickfacts for the daw category (6 DAWs).

Scheme: Platforms / Free Trial / Standout Feature

Type was rejected: all six cells say "DAW", so the card would read "Type: DAW" on
every DAW and tell nobody anything. System Requirements is a paragraph, which
does not fit a card. What actually separates these six is which machines they run
on, whether you can try one before paying, and the one thing that makes people
pick it (Session View, the step sequencer, 512 elastic tracks, notation...).

All six are pinned to daw-guide. best-daw-for-beginners carries the same six
columns in a different order (Logic and Reason swap places) and agrees on
Platforms (Logic is "macOS only" in both). Its Free Trial cell for Logic says
"Free with new Macs" where daw-guide says "90-day trial" - not a conflict, both
are true, but only one guide is the source here so the data cannot drift.

Run:  python temp/apply_qf_daw.py
"""
import json

P_PATH = 'data/products.json'

PLT = ('Platforms', 'Plataformas', 'chip')
TRL = ('Free Trial', 'Prueba gratuita', 'clock')
STD = ('Standout Feature', 'Función destacada', 'star')

# id -> (guide, column, [three values], bestFor en/es)
DATA = {
    110: ('daw-guide', 0,
          ['macOS & Windows', '90 days', 'Session View, Max for Live'],
          ('Electronic music and live performance',
           'Música electrónica y directo')),

    112: ('daw-guide', 1,
          ['macOS & Windows', 'Free forever (limited)',
           'Step sequencer, free updates'],
          ('Beat-makers and lifetime updates',
           'Productores de beats y actualizaciones de por vida')),

    113: ('daw-guide', 2,
          ['macOS & Windows', '30 days', 'Elastic audio, 512 tracks'],
          ('Post and audio-to-picture pros',
           'Profesionales de post y audio para imagen')),

    114: ('daw-guide', 3,
          ['macOS & Windows', '60 days', 'Studio to pro features, notation'],
          ('MIDI and scoring workflows', 'Flujos MIDI y partituras')),

    111: ('daw-guide', 4,
          ['macOS only', '90-day trial', 'Included instruments, Flex Time'],
          ('All-in-one Mac production', 'Producción completa en Mac')),

    115: ('daw-guide', 5,
          ['macOS & Windows', '30 days', 'Rack plugin, CV patching'],
          ('Rack-based creative patching', 'Patching creativo basado en rack')),
}


def main():
    prods = json.load(open(P_PATH, encoding='utf-8'))
    by_id = {p['id']: p for p in prods}

    ids = [p['id'] for p in prods if p.get('category') == 'daw']
    missing = [i for i in ids if i not in DATA]
    extra = [i for i in DATA if i not in ids]
    if missing or extra:
        raise SystemExit('uncovered: %s / unknown: %s' % (missing, extra))

    for pid, (_gid, _col, vals, best) in DATA.items():
        p = by_id[pid]
        p['bestFor'] = {'en': best[0], 'es': best[1]}
        p['facts'] = [{'icon': icon, 'value': v,
                       'label': {'en': le, 'es': ls}, 'tone': 'good'}
                      for v, (le, ls, icon) in zip(vals, [PLT, TRL, STD])]

    open(P_PATH, 'w', encoding='utf-8', newline='').write(
        json.dumps(prods, ensure_ascii=False, indent=2) + '\n')

    print('quickfacts set:', len(DATA))
    for pid in sorted(DATA):
        p = by_id[pid]
        print('  %4d %-32s %s' % (pid, p['title'][:32],
                                  ' | '.join('%s=%s' % (f['label']['en'], f['value'])
                                             for f in p['facts'])))


main()
