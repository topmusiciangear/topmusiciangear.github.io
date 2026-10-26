# -*- coding: utf-8 -*-
"""Negative test: inject known-bad guitar quickfacts and confirm the audit fails."""
import json
import shutil
import subprocess

src = 'data/products.json'
bak = 'temp/products.backup.json'
shutil.copyfile(src, bak)

p = json.load(open(src, encoding='utf-8'))
pm = {x['id']: x for x in p}

# 1) wrong pickup essence
for f in pm[103]['facts']:
    if f['label']['en'] == 'Pickups':
        f['value'] = 'SSS'          # Pacifica is HSS
# 2) wrong scale
for f in pm[6]['facts']:
    if f['label']['en'] == 'Scale':
        f['value'] = '24 in'
# 3) wrong wood token
for f in pm[311]['facts']:
    if f['label']['en'] == 'Body':
        f['value'] = 'Basswood'     # Classic Vibe is pine
# 4) wrong weight
for f in pm[272]['facts']:
    if f['label']['en'] == 'Weight':
        f['value'] = '9.9 lb'

open(src, 'w', encoding='utf-8', newline='').write(
    json.dumps(p, ensure_ascii=False, indent=2) + '\n')

r = subprocess.run(['python', '-X', 'utf8', 'temp/qf_diff_guitars.py'],
                   capture_output=True, text=True, encoding='utf-8')
print('exit code:', r.returncode, '(expected 1)')
print(r.stdout)

shutil.copyfile(bak, src)
print('restored products.json')
