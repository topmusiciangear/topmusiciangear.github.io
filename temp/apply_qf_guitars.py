# -*- coding: utf-8 -*-
"""Quickfacts for the guitars category + factual fixes to the guide tables.

Sources
-------
Table values come from data/guides.json productTable (verified against the
manufacturer/retailer where the tables disagreed):

* Yamaha FG800  scale 650 mm (25.6 in)      -> Andertons spec sheet
* Yamaha Pacifica 112V  22 frets            -> Andertons spec sheet
* Squier Sonic Mustang  22 frets            -> Andertons spec sheet
* Squier CV '50s Strat  pine body           -> Andertons/Fender spec sheet
* Squier Affinity Strat poplar body         -> Andertons/Fender spec sheet
* Enya Nova Go Sonic    HH pickups, 24.75", tune-o-matic -> enya-music.com
* Taylor 314ce Next Gen  GA body, solid Sitka top, 25.5" -> Andertons spec sheet
* Taylor GS Mini        Sitka top, layered sapele, 23.5" -> Andertons spec sheet + guide prose
* Martin OM-42          scale 25.4"         -> Andertons spec sheet
"""
import json

P_PATH = 'data/products.json'
G_PATH = 'data/guides.json'

# ---------------------------------------------------------------- table fixes
# (guide_id, row label, column title, old, new)
TABLE_FIXES = [
    ('beginner-guitar', 'Scale Length', 'Yamaha FG800 Acoustic',
     '25.5 in (648 mm)', '25.6 in (650 mm)'),
    ('beginner-guitar', 'Neck', 'Yamaha Pacifica 112V',
     'Maple, 21 frets', 'Maple, 22 frets'),
    ('beginner-guitar', 'Frets & Fretboard', 'Yamaha Pacifica 112V',
     '21, maple', '22, maple'),
    ('beginner-guitar', 'Body Wood', 'Squier Affinity Series Stratocaster',
     'Alder / poplar', 'Poplar'),
    ('best-beginner-electric-guitar', 'Frets & Fretboard', 'Squier Sonic Mustang',
     '21 medium jumbo, maple/laurel', '22 medium jumbo, maple/laurel'),
    ('best-beginner-electric-guitar', 'Pickups', 'Enya Nova Go Sonic',
     'Single coil + humbucker', '2 humbuckers (Alnico II/V)'),
    ('best-beginner-electric-guitar', 'Scale Length', 'Enya Nova Go Sonic',
     '25.5 in (648 mm)', '24.75 in (629 mm)'),
    ('best-beginner-electric-guitar', 'Bridge', 'Enya Nova Go Sonic',
     'Fixed', 'Tune-o-matic'),
    ('best-electric-guitars-2026', 'Body Wood', "Squier Classic Vibe '50s Stratocaster",
     'Alder', 'Pine'),
    ('best-electric-guitars-2026', 'Frets & Fretboard', 'Squier Sonic Mustang',
     '21, maple, 9.5"', '22, maple, 9.5"'),
]

# ---------------------------------------------------------------- icon helper
PICK, SCALE, WOOD, LAYERS, WEIGHT, STRINGS, SHAPE = (
    'sliders', 'ruler', 'wood', 'layers', 'weight', 'strings', 'guitar')

L_PICK = {'en': 'Pickups', 'es': 'Pastillas'}
L_SCALE = {'en': 'Scale', 'es': 'Escala'}
L_WOOD = {'en': 'Top', 'es': 'Tapa'}
L_BODY = {'en': 'Body', 'es': 'Cuerpo'}
L_LAYERS = {'en': 'Back & sides', 'es': 'Aros y fondo'}
L_WEIGHT = {'en': 'Weight', 'es': 'Peso'}
L_STRINGS = {'en': 'Strings', 'es': 'Cuerdas'}
L_SHAPE = {'en': 'Body shape', 'es': 'Forma del cuerpo'}


def F(icon, value, label):
    return {'icon': icon, 'value': value, 'label': label, 'tone': 'good'}


def electric(pickups, scale, body):
    return [F(PICK, pickups, L_PICK), F(SCALE, scale, L_SCALE), F(WOOD, body, L_BODY)]


def acoustic(shape, top, scale):
    return [F(SHAPE, shape, L_SHAPE), F(WOOD, top, L_WOOD), F(SCALE, scale, L_SCALE)]


def parlor(top, back, scale):
    return [F(WOOD, top, L_WOOD), F(LAYERS, back, L_LAYERS), F(SCALE, scale, L_SCALE)]


def travel(weight, scale, strings):
    return [F(WEIGHT, weight, L_WEIGHT), F(SCALE, scale, L_SCALE),
            F(STRINGS, strings, L_STRINGS)]


# pid: (bestFor en, bestFor es, facts)
PLAN = {
    # ------------------------------------------------------------- electrics
    6: ('Studio all-rounder', 'Todo terreno de estudio',
        electric('SSS', '25.5 in', 'Alder')),
    7: ('Classic rock', 'Rock clásico',
        electric('HH', '24.75 in', 'Mahogany + maple')),
    65: ('Indie & alternative', 'Indie y alternativo',
         electric('SS', '25.5 in', 'Alder')),
    103: ('Beginner all-rounder', 'Todo terreno para empezar',
          electric('HSS', '25.5 in', 'Alder')),
    124: ('Rock & blues gigs', 'Rock y blues en directo',
          electric('HSS', '25.5 in', 'Alder')),
    126: ('Country & stage', 'Country y directo',
          electric('SS', '25.5 in', 'Alder')),
    295: ('Practice anywhere', 'Practicar donde sea',
          electric('HH', '24.75 in', 'Carbon fiber')),
    309: ('First Strat', 'Primera Strat',
          electric('SSS', '25.5 in', 'Poplar')),
    310: ('First rock riffs', 'Primeros riffs de rock',
          electric('SSS', '25.5 in', 'Poplar')),
    311: ('Vintage rock', 'Rock vintage',
          electric('SSS', '25.5 in', 'Pine')),
    312: ('Rock & blues gigs', 'Rock y blues en directo',
          electric('HH', '25 in', 'Mahogany + maple')),
    313: ('Small hands & kids', 'Manos pequeñas y niños',
          electric('SS', '24 in', 'Poplar')),
    317: ('Comfort & silence', 'Comodidad y silencio',
          electric('HH', '25–25.5 in', 'Meranti')),
    318: ('Modern rock & fusion', 'Rock moderno y fusión',
          electric('HH', '25.5 in', 'Alder')),
    319: ('High-gain metal', 'Metal de alta ganancia',
          electric('HH', '24.75 in', 'Mahogany')),
    440: ('Noiseless stage Strat', 'Strat sin ruido en directo',
          electric('SSS', '25.5 in', 'Alder')),
    444: ('Country & studio', 'Country y estudio',
          electric('SS', '25.5 in', 'Alder')),
    458: ('Humbucker rock', 'Rock con humbuckers',
          electric('HH', '24.75 in', 'Mahogany')),
    462: ('Simple first guitar', 'Primera guitarra sencilla',
          electric('SSS', '25.5 in', 'Poplar')),
    463: ('Rock, punk & metal', 'Rock, punk y metal',
          electric('HH', '25.5 in', 'Poplar')),
    464: ('Serious beginner', 'Iniciación en serio',
          electric('HH', '24.75 in', 'Chambered mahogany')),
    465: ('Heavy riffs', 'Riffs contundentes',
          electric('HH', '24.75 in', 'Mahogany')),
    466: ('Comfortable learning', 'Aprendizaje cómodo',
          electric('SSS', '25.5 in', 'Roasted poplar')),

    # ------------------------------------------------------- steel acoustics
    8: ('Fingerstyle & writing', 'Fingerstyle y composición',
        acoustic('Grand Auditorium', 'Solid Sitka spruce', '25.5 in')),
    68: ('First acoustic', 'Primera acústica',
         acoustic('Dreadnought', 'Solid spruce', '25.3 in')),
    102: ('Beginner strumming', 'Rasgueo para principiantes',
          acoustic('Dreadnought', 'Solid spruce', '25.6 in')),
    104: ('Stage flatpicking', 'Flatpicking en directo',
          acoustic('Dreadnought', 'Solid Sitka spruce', '25.4 in')),
    314: ('Electro-acoustic starter', 'Electroacústica para empezar',
          acoustic('Dreadnought cutaway', 'Solid spruce', '25.6 in')),
    315: ('Small hands & fingerstyle', 'Manos pequeñas y fingerstyle',
          acoustic('Concert', 'Solid spruce', '25 in')),
    316: ('Travel & 3/4 size', 'Viaje y tamaño 3/4',
          acoustic('Modified 0', 'Solid Sitka spruce', '23 in')),
    452: ('Pro fingerstyle & studio', 'Fingerstyle y estudio pro',
          acoustic('Dreadnought', 'Adirondack spruce', '25.4 in')),
    453: ('Studio fingerstyle', 'Fingerstyle de estudio',
          acoustic('Orchestra Model', 'Solid spruce', '25.4 in')),
    454: ('Gigging acoustic', 'Acústica para directo',
          acoustic('Grand Auditorium', 'Sinker redwood', '25.5 in')),
    455: ('Collectors & pros', 'Coleccionistas y pros',
          acoustic('Grand Auditorium', 'Sinker redwood', '25.5 in')),
    456: ('Folk & blues strumming', 'Rasgueo folk y blues',
          acoustic('Slope-shoulder', 'Adirondack spruce', '24.75 in')),
    457: ('Big stage voice', 'Gran voz en directo',
          acoustic('Super Jumbo', 'Sitka spruce', '25.5 in')),
    460: ('Big strumming', 'Rasgueo potente',
          acoustic('Dreadnought', 'Solid okoume', '25.5 in')),
    461: ('Ultra-budget acoustic', 'Acústica muy barata',
          acoustic('Dreadnought', 'Laminated spruce', '25.5 in')),

    # ----------------------------------------------------- parlour guitars
    352: ('Vintage blues', 'Blues vintage', parlor('Agathis', 'Agathis', '24 in')),
    353: ('All-round gigging', 'Todo terreno en directo',
          parlor('Solid spruce', 'Mahogany', '23.6 in')),
    354: ('Intimate fingerstyle', 'Fingerstyle íntimo',
          parlor('Solid mahogany', 'Mahogany', '24.72 in')),
    355: ('Slide & ragtime', 'Slide y ragtime',
          parlor('Solid spruce', 'Mahogany', '24.75 in')),
    356: ('First parlor', 'Primera parlor',
          parlor('Solid spruce', 'Mahogany', '24.75 in')),
    357: ('Stage presence', 'Presencia en directo',
          parlor('Solid spruce', 'Maple', '25 in')),
    361: ('Electric players', 'Guitarristas eléctricos',
          parlor('Solid mahogany', 'Chambered mahogany', '24.75 in')),

    # ------------------------------------------------ classical / nylon
    459: ('Nylon starter', 'Nylon para empezar',
          parlor('Spruce', 'Meranti', '25.6 in')),
    553: ('Nylon for small hands', 'Nylon para manos pequeñas',
          parlor('Solid spruce', 'Mahogany', '25.3 in')),
    554: ('Student classical', 'Clásica para estudiantes',
          parlor('Spruce', 'Mahogany', '25.6 in')),

    # ---------------------------- travel, silent and smart guitars
    270: ('Silent headphone practice', 'Práctica silenciosa',
          travel('3.8 lb', '24.75 in', 'Steel')),
    271: ('Compact grab-and-play', 'Compacta y a mano',
          parlor('Sitka spruce', 'Layered sapele', '23.5 in')),
    272: ('Silent steel-string', 'Silenciosa de acero',
          travel('4.6 lb', '25 in', 'Steel')),
    273: ('Silent nylon-string', 'Silenciosa de nylon',
          travel('4.5 lb', '25.6 in', 'Nylon')),
    274: ('Ultra-portable acoustic', 'Acústica ultraportátil',
          travel('2.9 lb', '24.75 in', 'Steel')),
    275: ('Silent nylon travel', 'Nylon de viaje en silencio',
          travel('3 lb', '24.75 in', 'Nylon')),
    296: ('Home practice & jamming', 'Práctica y jam en casa',
          travel('4.55 lb', '23.5 in', 'Nylon')),
    401: ('Compact grab-and-play', 'Compacta y a mano',
          travel('Under 4 lb', '23.5 in', 'Steel')),
}


def main():
    # 1) table fixes
    g = json.load(open(G_PATH, encoding='utf-8'))
    applied = 0
    for gid, row_label, col_title, old, new in TABLE_FIXES:
        if old == new:
            continue
        for guide in g:
            if guide['id'] != gid:
                continue
            pt = guide.get('productTable') or {}
            cols = [c.get('title') for c in pt.get('columns') or []]
            if col_title not in cols:
                print('  ! column not found:', gid, col_title)
                continue
            ci = cols.index(col_title)
            for row in pt.get('rows') or []:
                if (row.get('label') or '').strip() != row_label:
                    continue
                cell = row['values'][ci]
                cur = cell.get('value') if isinstance(cell, dict) else cell
                if cur == old:
                    if isinstance(cell, dict):
                        cell['value'] = new
                    else:
                        row['values'][ci] = new
                    applied += 1
                elif cur != new:
                    print('  ! unexpected cell:', gid, col_title, row_label, '->', cur)
    open(G_PATH, 'w', encoding='utf-8', newline='').write(
        json.dumps(g, ensure_ascii=False, indent=2) + '\n')
    print('table cells fixed:', applied)

    # 2) quickfacts
    p = json.load(open(P_PATH, encoding='utf-8'))
    by_id = {x['id']: x for x in p}
    missing = [i for i in PLAN if i not in by_id]
    if missing:
        raise SystemExit('unknown product ids: %s' % missing)
    n = 0
    for pid, (en, es, facts) in PLAN.items():
        prod = by_id[pid]
        assert len(facts) == 3, pid
        prod['bestFor'] = {'en': en, 'es': es}
        prod['facts'] = facts
        n += 1
    open(P_PATH, 'w', encoding='utf-8', newline='').write(
        json.dumps(p, ensure_ascii=False, indent=2) + '\n')
    print('quickfacts set:', n)


main()
