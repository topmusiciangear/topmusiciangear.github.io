# -*- coding: utf-8 -*-
"""Negative test: inject known-bad pedal quickfacts and confirm the audit fails."""
import json
import shutil
import subprocess

src = 'data/products.json'
bak = 'temp/products.backup.pedals.json'
shutil.copyfile(src, bak)

p = json.load(open(src, encoding='utf-8'))
pm = {x['id']: x for x in p}


def setfact(pid, label_en, value):
    for f in pm[pid]['facts']:
        if f['label']['en'] == label_en:
            f['value'] = value
            return
    raise SystemExit('no %s fact on %s' % (label_en, pid))


# 1) TS9 is buffered, not true bypass
setfact(96, 'Bypass', 'True bypass')
# 2) DD-8 draws 65 mA, not 100 mA (that figure sits in the Power row)
setfact(97, 'Current draw', '100 mA')
# 3) BigSky MX is a reverb, not a delay
setfact(135, 'Type', 'Analog delay')
# 4) HX Stomp models: wrong count
setfact(202, 'Models', '500+ Helix amps, cabs')
# 5) GX-1 battery life is 7 hours, not 5
setfact(203, 'Battery', '5 hours on 4x AA')
# 6) Carbon Copy is a BBD delay, not a reverb
setfact(597, 'Type', 'Reverb (Spring/Plate/Hall)')
# 7) TONEX ONE+ type is manual (an amp modeler, not a general multi-effects)
setfact(258, 'Type', 'Multi-effects / modeler')
# 8) wrong label scheme for a regular pedal
pm[599]['facts'][2]['label']['en'] = 'Battery'

open(src, 'w', encoding='utf-8', newline='').write(
    json.dumps(p, ensure_ascii=False, indent=2) + '\n')

r = subprocess.run(['python', '-X', 'utf8', 'temp/qf_diff_pedals.py'],
                   capture_output=True, text=True, encoding='utf-8')
print('exit code:', r.returncode, '(expected 8)')
print(r.stdout)

shutil.copyfile(bak, src)
print('restored products.json')
