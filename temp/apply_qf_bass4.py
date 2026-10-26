# -*- coding: utf-8 -*-
"""Quickfacts for the bass category (21 four-string electric basses).

Do NOT confuse with temp/apply_qf_basses.py, which owns the `basses` category
(five-strings and compact basses). This file owns `bass`.

Scheme: Pickups / Active-Passive / Body

Weight is not usable: across these four tables it is "Not published (varies by
unit)" or "-" for a third of the columns. Scale length is 34 in for 19 of the 21,
so a card repeating "34 in (864 mm)" adds nothing.

Every bass is pinned to the table whose cells match the instrument, and the four
tables disagree on several models, so the pinning is deliberate:

  159 Yamaha TRBX304   beginner-bass-guitars[2]  alder (the other two say mahogany)
  160 Ibanez SR300E    beginner-bass-guitars[3]  nyatoh (best-bass-under-700 says
                                                 okoume, budget says mahogany/maple)
  161 StingRay Ray4    best-bass-under-700[5]    basswood (budget says ash)
  326 Sire V5R         beginner-bass-guitars[6]  mahogany (V5R is the mahogany
                                                 V5; best-bass-under-700 copied
                                                 the alder V5 figure)
  165 ESP LTD B-204SM  budget-bass-like-expensive[6]  SB-4 pickups with a
                                                 switchable active EQ, which is
                                                 what that bass actually ships
  157 Squier CV '60s Jazz  fender-bass-guide[4]  poplar (budget says alder)

Music Man StingRay Special (186) is in no table; its facts come from its own
description and every figure in them must appear there.

Run:  python temp/apply_qf_bass4.py
"""
import json

P_PATH = 'data/products.json'

PUP = ('Pickups', 'Pastillas', 'sineWave')
ACT = ('Active / Passive', 'Activo / Pasivo', 'battery')
BDY = ('Body', 'Cuerpo', 'wood')

# id -> (guide, column, [pickups, active/passive, body], bestFor en/es)
DATA = {
    # --- fender-bass-guide ----------------------------------------------------
    441: ('fender-bass-guide', 0,
          ['Player split coil P', 'Passive', 'Alder'],
          ('Rock and Motown live gigging', 'Rock y Motown en directo')),
    442: ('fender-bass-guide', 1,
          ['2x Player Alnico 5 J', 'Passive', 'Alder'],
          ('Funk and fusion live playing', 'Funk y fusión en directo')),
    155: ('fender-bass-guide', 2,
          ['V-Mod II split coil', 'Passive', 'Alder'],
          ('Pro rock and session playing', 'Rock profesional y trabajo de sesión')),
    156: ('fender-bass-guide', 3,
          ['2x V-Mod II J single coils', 'Passive', 'Alder'],
          ('Pro funk and live gigging', 'Funk profesional y directos')),
    157: ('fender-bass-guide', 4,
          ['2x Fender alnico J', 'Passive', 'Poplar'],
          ('Beginner funk and rock playing', 'Funk y rock para empezar')),
    158: ('fender-bass-guide', 5,
          ['Ceramic P + J', 'Passive', 'Poplar'],
          ('Beginner P/J practice and gigs', 'Práctica P/J y primeros bolos')),
    185: ('fender-bass-guide', 6,
          ['Ultra II Noiseless P + J', 'Active/Passive (S-1 switch)', 'Alder'],
          ('Pro session and tour playing', 'Sesiones y giras profesionales')),

    # --- beginner-bass-guitars ------------------------------------------------
    159: ('beginner-bass-guitars', 2,
          ['2x YGD humbuckers', 'Active (2-band EQ)', 'Alder'],
          ('Versatile active bass', 'Bajo activo versátil')),
    160: ('beginner-bass-guitars', 3,
          ['2x PowerSpan humbuckers', 'Active (3-band EQ)', 'Nyatoh'],
          ('Lightweight speed grooves', 'Grooves rápidos y bajo ligero')),
    326: ('beginner-bass-guitars', 6,
          ['2x Marcus Revolution single-coil', 'Passive', 'Mahogany'],
          ('Roasted neck premium feel', 'Mástil tostado con tacto premium')),
    681: ('beginner-bass-guitars', 8,
          ['Split P + J bridge', 'Passive', 'Alder'],
          ('All-round PJ workhorse', 'PJ todoterreno')),
    682: ('beginner-bass-guitars', 9,
          ['Split P + J (Dynamix)', 'Passive', 'Poplar'],
          ('Compact short-scale PJ', 'PJ compacto de escala corta')),

    # --- best-bass-under-700 --------------------------------------------------
    164: ('best-bass-under-700', 0,
          ['Diamond Schecter humbuckers', 'Active', 'Swamp ash'],
          ('Modern groove for rock gigs', 'Groove moderno para bolos de rock')),
    166: ('best-bass-under-700', 2,
          ['2x vintage single coils', 'Passive', 'Maple'],
          ('Beatle bass charm and short scale',
           'El encanto del bajo de los Beatles y escala corta')),
    161: ('best-bass-under-700', 5,
          ['1x ceramic humbucker', 'Active', 'Basswood'],
          ('Iconic StingRay funk and slap tone', 'El sonido funk y slap del StingRay')),
    467: ('best-bass-under-700', 6,
          ['YGD V5 P/J (Alnico V)', 'Passive', 'Alder'],
          ('Punchy P/J for gigging bassists', 'P/J con pegada para bajistas de directo')),

    # --- budget-bass-like-expensive ------------------------------------------
    163: ('budget-bass-like-expensive', 1,
          ['2x Marcus Vintage-J Revolution', 'Passive', 'North American alder'],
          ('Best-feeling build at the price',
           'El acabado que mejor se siente a este precio')),
    165: ('budget-bass-like-expensive', 6,
          ['2x ESP SB-4 humbuckers', 'Passive + switchable active EQ',
           'Ash, spalted maple top'],
          ('Spalted maple looks, stage volume',
           'Tapa de arce spalted y volumen de escenario')),
    162: ('budget-bass-like-expensive', 9,
          ['2x ProBucker 760 humbuckers', 'Passive', '9-ply mahogany/walnut'],
          ('Iconic reverse-body look and rock growl',
           'Cuerpo invertido icónico y gruñido rock')),
    683: ('budget-bass-like-expensive', 11,
          ['2x G&L MFD humbuckers', 'Passive / active switchable',
           'Ash top over poplar'],
          ('Passive, active or boosted from one bass',
           'Pasivo, activo o con refuerzo en el mismo bajo')),

    # --- no comparison table: facts from the product description -------------
    186: (None, None,
          ['Neodymium pickup', '18V active preamp', 'Lightweight ash'],
          ('The modern StingRay', 'El StingRay moderno')),
}


def main():
    prods = json.load(open(P_PATH, encoding='utf-8'))
    by_id = {p['id']: p for p in prods}

    ids = [p['id'] for p in prods if p.get('category') == 'bass']
    missing = [i for i in ids if i not in DATA]
    extra = [i for i in DATA if i not in ids]
    if missing or extra:
        raise SystemExit('uncovered: %s / unknown: %s' % (missing, extra))

    for pid, (_gid, _col, vals, best) in DATA.items():
        p = by_id[pid]
        p['bestFor'] = {'en': best[0], 'es': best[1]}
        p['facts'] = [{'icon': icon, 'value': v,
                       'label': {'en': le, 'es': ls}, 'tone': 'good'}
                      for v, (le, ls, icon) in zip(vals, [PUP, ACT, BDY])]

    open(P_PATH, 'w', encoding='utf-8', newline='').write(
        json.dumps(prods, ensure_ascii=False, indent=2) + '\n')

    print('quickfacts set:', len(DATA))
    for pid in sorted(DATA):
        p = by_id[pid]
        print('  %4d %-46s %s' % (pid, p['title'][:46],
                                  ' | '.join('%s=%s' % (f['label']['en'], f['value'])
                                             for f in p['facts'])))


main()
