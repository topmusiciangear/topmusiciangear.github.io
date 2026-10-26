# -*- coding: utf-8 -*-
"""Align Yamaha CLP-835 (570) with the rest of the digital-piano quickfacts.

It was the only keyboard that already had facts, written under a one-off scheme:
label 'Key action' instead of 'Keyboard action', the value '256 notes' instead of
the table's '256', a 'music' icon for polyphony and tone 'tradeoff' on the weight
(meaningless: the renderer colours every fact the same). Facts now use the same
three rows and wording as every other digital piano in the category.
"""
import json

P_PATH = 'data/products.json'

prods = json.load(open(P_PATH, encoding='utf-8'))
p = [x for x in prods if x['id'] == 570][0]

p['facts'] = [
    {'icon': 'keyboard', 'value': 'GrandTouch-S (escapement)',
     'label': {'en': 'Keyboard action', 'es': 'Acción del teclado'},
     'tone': 'good'},
    {'icon': 'layers', 'value': '256',
     'label': {'en': 'Polyphony', 'es': 'Polifonía'}, 'tone': 'good'},
    {'icon': 'weight', 'value': '57 kg',
     'label': {'en': 'Weight', 'es': 'Peso'}, 'tone': 'good'},
]

open(P_PATH, 'w', encoding='utf-8', newline='').write(
    json.dumps(prods, ensure_ascii=False, indent=2) + '\n')
print('updated', p['title'], '->',
      [f['value'] for f in p['facts']])
