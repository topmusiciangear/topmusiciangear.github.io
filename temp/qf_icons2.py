# -*- coding: utf-8 -*-
"""Dump every branch of the quickfacts icon renderer."""
import re

s = open('build-guides.js', encoding='utf-8').read()
start = s.find('function _qfIcon')
end = s.find('_cardBase', start)
seg = s[start:end]
print('segment length:', len(seg))
names = re.findall(r"name === '([a-zA-Z]+)'", seg)
print('branches:', names)
print('unique   :', sorted(set(names)))
# default / unknown handling
tail = seg[-600:]
print()
print('TAIL:')
print(tail)
