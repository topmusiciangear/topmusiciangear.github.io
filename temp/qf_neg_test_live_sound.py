# -*- coding: utf-8 -*-
"""Negative test: inject known-bad live_sound quickfacts and confirm the audit fails."""
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


# 1) wrong power figure inside a subset-checked value (K12.2 is 2000W)
setfact(106, 'Power', '1600W (peak)')
# 2) wrong max SPL (EON712 is 127 dB)
setfact(493, 'Max SPL', '130 dB')
# 3) wrong coverage (DXR12mkII is 90° x 60°)
setfact(108, 'Coverage', '90° x 50°')
# 4) wrong preamp count, exact-checked (X32 Compact has 16 MIDAS)
setfact(138, 'Preamps', '12 MIDAS')
# 5) wrong IEM range (PSM300 is 300 ft)
setfact(267, 'Range', '200 ft')
# 6) wrong subwoofer size (KS118 is 18")
setfact(233, 'Woofer', '15" long-excursion')
# 7) wrong label scheme (mixer described as a sub)
pm[137]['facts'][0]['label']['en'] = 'Woofer'

open(src, 'w', encoding='utf-8', newline='').write(
    json.dumps(p, ensure_ascii=False, indent=2) + '\n')

r = subprocess.run(['python', '-X', 'utf8', 'temp/qf_diff_live_sound.py'],
                   capture_output=True, text=True, encoding='utf-8')
print('exit code:', r.returncode, '(expected 7)')
print(r.stdout)

shutil.copyfile(bak, src)
print('restored products.json')
