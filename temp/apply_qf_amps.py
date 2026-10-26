# -*- coding: utf-8 -*-
"""Quickfacts for the amps category (25 products).

Scheme, uniform across guitar combos, bass combos, desktop amps and the two
wireless headphone amps:

    Type / Power / Speaker

Type separates tube from solid-state from modeling, power decides whether it is a
bedroom or a gigging amp, and the speaker tells you what you are actually hearing.
Channels and Outputs are in the tables too, but a "1" or "2" channel count says
less than these three.

Values come from the guide table the product is listed in (ASSIGN below). Some
product types are shortened by dropping words only, because the tables write the
power into the type as well ("Solid-state, 250W (500W w/ ext. cab)") and a Type
fact that repeats Power wastes one of the three cards.

The two Waza-Air models are headphone amps: their Speaker row is the headphone
driver, and 488's Power row is "Battery (5h)" because that is how Boss rates it.

Run:  python temp/apply_qf_amps.py
"""
import json

P_PATH = 'data/products.json'

T = 'chip'

# id -> (guide, column, [Type, Power, Speaker], bestFor en/es)
DATA = {
    71: ('guitar-bass-amps', 0, ['Tube (2x EL84)', '15W', '1x12" Jensen C-12N'],
         ('Small-venue blues and rock', 'Blues y rock en salas pequeñas')),
    72: ('best-practice-amps', 1, ['Solid-state modeling', '50W', '1x12"'],
         ('Versatile home modeling amp', 'Modeling versátil para casa')),
    73: ('guitar-bass-amps', 2, ['Tube (4x EL84)', '30W', '2x12" Celestion G12M Greenback'],
         ('Live pop and rock gigging', 'Directos de pop y rock')),
    74: ('guitar-bass-amps', 3, ['Tube (2x EL34)', '40W', '1x12" Celestion V-Type'],
         ('Live rock and hard rock', 'Rock y hard rock en directo')),
    75: ('best-bass-amps', 0, ['Solid-state', '250W (500W w/ ext. cab)', '2x10" + 1" tweeter'],
         ('Classic rock tone for gigs', 'Sonido clásico de rock en directo')),
    76: ('best-bass-amps', 1, ['Solid-state', '350W (500W w/ ext. cab)', '2x10" + 1" tweeter'],
         ('Loud and portable bass combo', 'Combo de bajo potente y portátil')),
    130: ('best-practice-amps', 0, ['Solid-state modeling', '25W', '1x8"'],
          ('Simple beginner practice', 'Práctica sencilla para empezar')),
    131: ('best-practice-amps', 2, ['Solid-state', '35W', '1x10" Voice of the World'],
          ('Warm home tones with reverb', 'Sonido cálido en casa con reverb')),
    132: ('best-bass-amps', 2, ['Solid-state', '300W (500W w/ ext. cab)', '1x12" + tweeter'],
          ('Lightweight pro bass combo', 'Combo de bajo ligero y profesional')),
    293: ('best-practice-amps', 3, ['Desktop modeling', '20W (10W + 10W)', '2x 3.1" (8 cm)'],
          ('Desktop tone with Bluetooth', 'Sonido de escritorio con Bluetooth')),
    294: ('best-practice-amps', 4, ['Smart modeling combo', '50W RMS', '2x4"'],
          ('Fun practice for beginners', 'Práctica divertida para empezar')),
    484: ('best-bass-amps', 4, ['All-analog solid-state', '50W', '1x12"'],
          ('Warm bass for rehearsals', 'Bajo cálido para ensayar')),
    485: ('best-bass-practice-amps', 5, ['Analog Class-D', '500W (4Ω)', '2x10" Eminence + horn'],
          ('Modern pro stage power', 'Potencia moderna para escenario')),
    488: ('best-practice-amps', 5, ['Wireless headphone amp', 'Battery (5h)', '50mm headphone drivers'],
          ('Silent wireless practice', 'Práctica silenciosa sin cables')),
    489: ('best-bass-practice-amps', 2, ['Modeling smart amp', '10W', '2 x custom full-range'],
          ('Portable smart practice', 'Práctica inteligente y portátil')),
    490: ('best-bass-practice-amps', 0, ['Solid-state combo', '40W', '1 x 10" Special Design'],
          ('All-round practice and jamming', 'Práctica y jam para todo')),
    491: ('best-bass-practice-amps', 1, ['Solid-state analog combo', '25W', '1 x 8" Orange'],
          ('Budget analog practice', 'Práctica analógica económica')),
    492: ('best-bass-practice-amps', 4, ['Wireless modeling headphone amp', 'Headphone amp',
                                         'None (wireless)'],
          ('Silent wireless bass practice', 'Práctica de bajo silenciosa sin cables')),
    503: ('best-bass-practice-amps', 3, ['Desktop modeling', '30W stereo',
                                         '2x3.5" full-range stereo'],
          ('Desktop hi-fi practice', 'Práctica de escritorio con sonido hi-fi')),
    552: ('best-bass-amps', 3, ['Modeling combo', '60W RMS (110W peak)', '1x10" + tweeter'],
          ('Gig-ready modeling combo', 'Combo de modeling para directo')),
    556: ('guitar-bass-amps', 5, ['Solid-state Class-D', '200W (100W standalone)',
                                  '1x15" custom Lavoce'],
          ('SVT tone with 15-inch depth', 'Sonido SVT con profundidad de 15"')),
    557: ('guitar-bass-amps', 1, ['Solid-state modeling', '50W', '1x12"'],
          ('Gig-ready modeling, home + stage', 'Modeling para casa y escenario')),
    627: ('guitar-bass-amps', 8, ['Digital modeling combo', '100W', '1x12" Celestion'],
          ('Stage modeling with footswitch', 'Modeling de escenario con pedal')),
    628: ('guitar-bass-amps', 9, ['Bass combo', '300W (500W w/ ext cab)', '2x10" + piezo tweeter'],
          ('Featherweight pro bass fidelity', 'Bajo profesional ligero y fiel')),
    629: ('guitar-bass-amps', 10, ['Digital combo', '100W (22W tube sim)', '1x12" Jensen Neo'],
          ('Tube tone without tubes', 'Sonido a válvulas sin válvulas')),
}

LABELS = [('Type', 'Tipo', 'chip'),
          ('Power', 'Potencia', 'volumeHigh'),
          ('Speaker', 'Altavoz', 'speaker')]


def main():
    prods = json.load(open(P_PATH, encoding='utf-8'))
    by_id = {p['id']: p for p in prods}

    amp_ids = [p['id'] for p in prods if p.get('category') == 'amps']
    missing = [i for i in amp_ids if i not in DATA]
    extra = [i for i in DATA if i not in amp_ids]
    if missing or extra:
        raise SystemExit('uncovered: %s / unknown: %s' % (missing, extra))

    for pid, (gid, col, vals, best) in DATA.items():
        p = by_id[pid]
        p['bestFor'] = {'en': best[0], 'es': best[1]}
        p['facts'] = [{'icon': icon, 'value': v,
                       'label': {'en': le, 'es': ls}, 'tone': 'good'}
                      for v, (le, ls, icon) in zip(vals, LABELS)]

    open(P_PATH, 'w', encoding='utf-8', newline='').write(
        json.dumps(prods, ensure_ascii=False, indent=2) + '\n')

    print('quickfacts set:', len(DATA))
    for pid in sorted(DATA):
        p = by_id[pid]
        print('  %4d %-42s %s' % (pid, p['title'][:42],
                                  ' | '.join('%s=%s' % (f['label']['en'], f['value'])
                                             for f in p['facts'])))


main()
