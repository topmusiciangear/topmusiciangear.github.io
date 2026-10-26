# -*- coding: utf-8 -*-
"""Realign the two Best For / Standout Feature rows of the reverb-delay table.

A Chase Bliss Habit column was removed from the table at some point, but its
cells stayed in the row arrays. Everything after it slid one position to the
left, so from the Eventide TimeFactor onward each pedal showed its neighbour's
text (the Habit itself appeared under TimeFactor) and the Boss RV-200 cell was
pushed out of the table.

Rows 10-12 of Standout Feature were already repaired in a previous pass, so only
the contaminated positions are rewritten here. The corrected order keeps every
existing phrase attached to the pedal it was written for; only the two cells the
shift destroyed are new (RV-200 Best For and Del-Verb Standout).

EN and ES are edited together so the page stays bilingual.
"""
import json

PATH = 'data/guides.json'
GID = 'best-reverb-delay'

BEST_FOR = [
    ('Versatile digital delay & looper', 'Delay digital versátil y looper'),
    ('Endless reverb sounds in one pedal', 'Sonidos de reverb infinitos en un pedal'),
    ('Massive, lush reverbs', 'Reverbs masivas de nivel estudio'),
    ('Ambient delays for live and studio', 'Delays ambientales para directo y estudio'),
    ('Modular reverb/delay workstation', 'Workstation reverb/delay modular'),
    ('Compact looper for practice and live', 'Looper compacto para práctica y directo'),
    ('Rhythmic delays for gigging', 'Delays rítmicos para el escenario'),
    ('Stereo ambience for studio mixing', 'Ambiente estéreo para mezclar en estudio'),
    ('Mid-range delay+reverb combo', 'Combo delay+reverb de calidad media'),
    ('Studio-grade hybrid ambience', 'Ambiente híbrido de estudio'),
    ('Warm analog slapback', 'Slapback analógico cálido'),
    ('Classic spring/plate/hall verbs', 'Reverbs clásicas spring/plate/hall'),
    ('Twelve verbs, 127 memories', 'Doce reverbs, 127 memorias'),
]

STANDOUT = [
    ('11 delay modes + 40s looper', '11 modos de delay + looper 40s'),
    ('Toneprint, 11 reverb types', 'Toneprint, 11 tipos de reverb'),
    ('300 presets, 12 algorithms', '300 presets, 12 algoritmos'),
    ('12 delay machines, 200 presets, MIDI', '12 máquinas delay, 200 presets, MIDI'),
    ('Structures: combine reverb+delay', 'Structures: combinar reverb+delay'),
    ('13 h stereo, 99 memories, 57 rhythms, MIDI I/O',
     '13 h estéreo, 99 memorias, 57 ritmos, MIDI I/O'),
    ('10 delay types, looper, MIDI', '10 tipos delay, looper, MIDI'),
    ('26 delay engines, MIDI, 128 presets, Neuro app',
     '26 motores delay, MIDI, 128 presets, app Neuro'),
    ('Magnetic tape delay + Spring/Mod/Shimmer',
     'Delay magnético + Spring/Mod/Shimmer'),
    ('Three reverbs, three classic delays', 'Tres reverbs y tres delays clásicos'),
    ('100% analog BBD, 600 ms + modulation', 'BBD 100% analógico, 600 ms + modulación'),
    ('Spring 65, Plate 140, Hall 224', 'Spring 65, Plate 140, Hall 224'),
    ('Spring/plate/hall + A/B/C memories', 'Spring/plate/hall + memorias A/B/C'),
]

guides = json.load(open(PATH, encoding='utf-8'))
g = [x for x in guides if x['id'] == GID][0]
pt = g['productTable']
ncols = len(pt['columns'])
assert ncols == 13, ncols

for row in pt['rows']:
    if row['label'] == 'Best For':
        want = BEST_FOR
    elif row['label'] == 'Standout Feature':
        want = STANDOUT
    else:
        continue
    assert len(row['values']) == len(want), (row['label'], len(row['values']))
    for i, (en, es) in enumerate(want):
        cell = row['values'][i]
        if isinstance(cell, dict):
            before = (cell.get('value'), cell.get('value_es'))
            cell['value'] = en
            cell['value_es'] = es
            if before != (en, es):
                print('%-17s %2d  %-42s' % (row['label'], i, pt['columns'][i]['title'][:42]))
                print('     was EN %r' % (before[0],))
                print('     now EN %r' % en)
        else:
            print('plain string cell at', row['label'], i)

open(PATH, 'w', encoding='utf-8', newline='').write(
    json.dumps(guides, ensure_ascii=False, indent=2) + '\n')
print('saved')
