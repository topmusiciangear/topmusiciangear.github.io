# -*- coding: utf-8 -*-
"""Print the icon names the quickfact renderer really supports, plus its fallback."""
import re

b = open('build-guides.js', encoding='utf-8').read()
s = b.find('function _qfIcon')
e = b.find('_cardBase', s)
seg = b[s:e]

names = sorted(set(re.findall(r"name === '([a-zA-Z]+)'", seg)))
print('in _qfIcon:', names)
print()
print('--- tail of _qfIcon (fallback):')
print(seg[-900:])
print()
print('--- names used by guide overrides / other callers:')
seg2 = b[e:e + 400]
print(seg2[:400])
