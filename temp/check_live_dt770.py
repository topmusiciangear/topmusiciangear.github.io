# -*- coding: utf-8 -*-
"""Check the live best-headphones Impedance row and DT 770 quickfacts block."""
import json
import re
import urllib.request

URL = 'https://topmusiciangear.com/guides/best-headphones.html?x=%s'
req = urllib.request.Request(URL % __import__('random').random(),
                             headers={'User-Agent': 'Mozilla/5.0'})
h = urllib.request.urlopen(req, timeout=60).read().decode('utf-8')

# table header
cols = re.findall(r'<th[^>]*>(.*?)</th>', h, re.S)
cols = [re.sub(r'<[^>]+>', '', c).strip() for c in cols]
print('columns:', cols)

i = cols.index('Impedance') if 'Impedance' in cols else None
rows = re.findall(r'<tr>(.*?)</tr>', h, re.S)
for r in rows:
    if 'Impedance' not in r:
        continue
    cells = [re.sub(r'<[^>]+>', '', c).strip()
             for c in re.findall(r'<td[^>]*>(.*?)</td>', r, re.S)]
    if cells:
        print('impedance cells:', cells)

# quickfacts block 1
m = re.search(r'qf-card qf-bestfor.{0,1200}?80 Ω', h, re.S)
print('DT 770 block at 80 Ω:', bool(m))
print('250 Ω occurrences on page:', h.count('250 Ω'))
