# -*- coding: utf-8 -*-
"""Quickfacts for the basses category (23 electric basses).

Three tables carry them and none of them agree on which rows exist, so the facts
follow the table each bass actually lives in:

  Compact / headless / travel basses (9, best-bass-home-office)
      Type / Scale Length / Pickups
      These are bought because of the shape: headless, travel, micro-scale,
      short-scale. Scale is what decides whether the low B or the E string still
      behaves, and the pickups say what voice it has.

  5-strings (12, best-5-string-basses)
      Pickups / Scale Length / Body
      Same trio as the electric guitars (pickups, scale, body) so the two
      categories read consistently. That guide carries no weight row, which is
      why weight cannot be the third fact here.

  Beginner basses (2, beginner-bass-guitars)
      Pickups / Scale Length / Weight
      For someone buying a first bass, how heavy it is matters more than what
      wood the body is, and that table happens to publish real weights.

Weight is deliberately NOT used for the compact group: the home-office table says
"Not published (varies by unit)" for six of its ten columns, which would print six
identical useless cards.

Squier Sonic Bronco (536) appears in both the beginner and the home-office table;
it is checked against the beginner one, where its weight is actually published.

Run:  python temp/apply_qf_basses.py
"""
import json

P_PATH = 'data/products.json'

TYP = ('Type', 'Tipo', 'chip')
SCL = ('Scale Length', 'Longitud de escala', 'ruler')
PUP = ('Pickups', 'Pastillas', 'sineWave')
BDY = ('Body', 'Cuerpo', 'wood')
WGT = ('Weight', 'Peso', 'weight')

# id -> (guide, column, [three values], [three label tuples], bestFor en/es)
DATA = {
    # --- compact / headless / travel basses ----------------------------------
    528: ('best-bass-home-office', 0,
          ['Headless solid-body', '34 in (864 mm)', '2x Bartolini BH2'],
          [TYP, SCL, PUP],
          ('Pro headless with a full 34-inch scale',
           'Headless profesional con escala completa de 34 pulgadas')),
    529: ('best-bass-home-office', 1,
          ['Headless multi-scale', '33-34.5 in (838-876 mm)',
           '2x Marcus Pure-H humbuckers'],
          [TYP, SCL, PUP],
          ('Multiscale headless with studio preamp',
           'Headless multiescala con previo de estudio')),
    530: ('best-bass-home-office', 2,
          ['Travel solid-body', '30 in', 'Under-saddle piezo'],
          [TYP, SCL, PUP],
          ('Lightest honest bass for flights', 'El bajo más ligero para volar de verdad')),
    531: ('best-bass-home-office', 3,
          ['Headless solid-body', '34 in', '2x Steinberger humbuckers'],
          [TYP, SCL, PUP],
          ('Headless travel classic with full 34-inch scale',
           'Clásico headless de viaje con escala de 34 pulgadas')),
    532: ('best-bass-home-office', 4,
          ['Solid-body short-scale', '23.5 in', 'Passive split-coil'],
          [TYP, SCL, PUP],
          ('Ukulele-size bass with real low end',
           'Bajo tamaño ukelele con graves de verdad')),
    533: ('best-bass-home-office', 5,
          ['Short-scale solid-body', '30 in (762 mm)', 'Alnico 5 split P + single J'],
          [TYP, SCL, PUP],
          ('Short-scale groove for home jams', 'Groove de escala corta para tocar en casa')),
    534: ('best-bass-home-office', 6,
          ['Short-scale single-cut', '30.3 in (770 mm)', '2x single-coil'],
          [TYP, SCL, PUP],
          ('Short-scale riffs for beginners', 'Riffs de escala corta para principiantes')),
    535: ('best-bass-home-office', 7,
          ['Micro-scale solid-body', '28.6 in (726 mm)', 'P + J passive'],
          [TYP, SCL, PUP],
          ('Cheapest micro-scale bass for the desk',
           'El bajo micro más barato para el escritorio')),
    537: ('best-bass-home-office', 9,
          ['Micro-scale solid-body', '28.6 in (726 mm)', 'Dynamix P + J'],
          [TYP, SCL, PUP],
          ('Compact groove for beginners', 'Groove compacto para principiantes')),

    # --- 5-strings ------------------------------------------------------------
    538: ('best-5-string-basses', 0,
          ['2x Dynamix H (passive)', '34 in (864 mm)', 'Okoume'],
          [PUP, SCL, BDY],
          ('First five-string for beginners',
           'Primer bajo de cinco cuerdas para principiantes')),
    539: ('best-5-string-basses', 1,
          ['H-1 ceramic humbucker', '34 in (86.4 cm)', 'Basswood'],
          [PUP, SCL, BDY],
          ('Funk punch for gigging bassists', 'Punch de funk para bajistas de directo')),
    540: ('best-5-string-basses', 2,
          ['2x M3 ceramic humbuckers', '34 in', 'Solid mahogany'],
          [PUP, SCL, BDY],
          ('Versatile active five for gigging',
           'Cinco cuerdas activo y versátil para directos')),
    541: ('best-5-string-basses', 3,
          ['2x ceramic single-coil J', '34 in (864 mm)', 'Poplar'],
          [PUP, SCL, BDY],
          ('Classic Jazz tone for beginners', 'Sonido Jazz clásico para principiantes')),
    542: ('best-5-string-basses', 4,
          ['Diamond SuperRock MM + Diamond P', '35 in (889 mm)', 'Basswood'],
          [PUP, SCL, BDY],
          ('Modern punch for rock and metal', 'Punch moderno para rock y metal')),
    543: ('best-5-string-basses', 5,
          ['YGD Custom V5 Alnico V PJ', '34 in', 'Solid alder'],
          [PUP, SCL, BDY],
          ('Gigging workhorse for rock and funk',
           'Todo terreno de directo para rock y funk')),
    544: ('best-5-string-basses', 6,
          ['Bartolini BH2', '34 in', 'Okoume'],
          [PUP, SCL, BDY],
          ('Fast neck for prog and fusion', 'Mástil rápido para prog y fusión')),
    545: ('best-5-string-basses', 7,
          ['Fender alnico single-coils', '34 in (864 mm)', 'Poplar / soft maple'],
          [PUP, SCL, BDY],
          ('Vintage groove for blues and soul', 'Groove vintage para blues y soul')),
    546: ('best-5-string-basses', 8,
          ['V-Mod II x2', '34 in (864 mm)', 'Alder (roasted pine select)'],
          [PUP, SCL, BDY],
          ('The pro session standard', 'El estándar de sesión profesional')),
    547: ('best-5-string-basses', 9,
          ['Ultra II Noiseless Vintage J', '34 in (86.4 cm)', 'Select alder'],
          [PUP, SCL, BDY],
          ('Flagship five for session pros',
           'El buque insignia de cinco cuerdas para sesiones')),
    548: ('best-5-string-basses', 10,
          ['Bartolini BH2', '33-35 in multiscale (G33-B35)',
           'Chambered American basswood'],
          [PUP, SCL, BDY],
          ('Ergonomic headless multiscale for prog',
           'Headless multiescala ergonómico para prog')),
    549: ('best-5-string-basses', 11,
          ['2-3 FD-3N neodymium', '34-37 in multiscale (G34-B37)', 'Swamp ash'],
          [PUP, SCL, BDY],
          ('Fanned-fret clarity for prog metal',
           'Claridad de trastes en abanico para prog metal')),

    # --- beginner basses ------------------------------------------------------
    1051: ('beginner-bass-guitars', 0,
           ['Split P + J (Dynamix)', '34" (864 mm)', '~3.6 kg (7.9 lbs)'],
           [PUP, SCL, WGT],
           ('First P/J grooves', 'Primeros grooves con pastillas P/J')),
    536: ('beginner-bass-guitars', 7,
          ['Short-scale ceramic single-coil', '30" (762 mm)', '~2.9 kg (6.4 lbs)'],
          [PUP, SCL, WGT],
          ('Short-scale starter', 'Bajo de escala corta para empezar')),
}


def main():
    prods = json.load(open(P_PATH, encoding='utf-8'))
    by_id = {p['id']: p for p in prods}

    ids = [p['id'] for p in prods if p.get('category') == 'basses']
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
        print('  %4d %-42s %s' % (pid, p['title'][:42],
                                  ' | '.join('%s=%s' % (f['label']['en'], f['value'])
                                             for f in p['facts'])))


main()
