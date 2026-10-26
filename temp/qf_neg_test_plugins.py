# -*- coding: utf-8 -*-
"""Negative test: inject known-bad plugin quickfacts and confirm the audit fails."""
import json
import shutil
import subprocess

src = 'data/products.json'
bak = 'temp/products.backup.json'
shutil.copyfile(src, bak)

p = json.load(open(src, encoding='utf-8'))
pm = {x['id']: x for x in p}


def setfact(pid, label_en, value):
    for f in pm[pid]['facts']:
        if f['label']['en'] == label_en:
            f['value'] = value
            return
    raise SystemExit('no %s fact on %s' % (label_en, pid))


# 1) wrong type (Reverb is not an EQ)
setfact(62, 'Type', 'Algorithmic Reverb')
# 2) wrong format (adds AAX, Pro-Q 4 cell has it, so drop a real one instead)
setfact(1014, 'Format', 'VST3/AU')          # Kontakt 8 also ships AAX
# 3) wrong copy protection (FabFilter uses a licence file, not iLok)
setfact(29, 'Copy protection', 'iLok')
# 4) wrong CPU load (ShaperBox is Moderate-High)
setfact(374, 'CPU load', 'Low')
# 5) wrong manufacturer format on a MANUAL product (RX Advanced)
setfact(122, 'Format', 'VST2/VST3/AU/AAX')

open(src, 'w', encoding='utf-8', newline='').write(
    json.dumps(p, ensure_ascii=False, indent=2) + '\n')

r = subprocess.run(['python', '-X', 'utf8', 'temp/qf_diff_plugins.py'],
                   capture_output=True, text=True, encoding='utf-8')
print('exit code:', r.returncode, '(expected 1)')
print(r.stdout)

shutil.copyfile(bak, src)
print('restored products.json')
