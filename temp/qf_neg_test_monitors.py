# -*- coding: utf-8 -*-
"""Negative test: inject known-bad monitors quickfacts and confirm the audit fails."""
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


# 1) wrong power figure inside a subset-checked value (HS8 is 120W)
setfact(19, 'Power', '150W (75W + 45W)')
# 2) wrong woofer size (Rokit 7 is 7")
setfact(20, 'Woofer', '8" Kevlar')
# 3) wrong frequency number, subset-checked (LP-6 V2 tops out at 21 kHz)
setfact(117, 'Frequency response', '47 Hz – 24 kHz (±3 dB)')
# 4) truncated-bass-extension cell with a wrong figure (Eris 3.5 is 80 Hz)
setfact(1042, 'Frequency response', '75 Hz – 20 kHz')
# 5) wrong sub max SPL, exact-checked (S10.4 is 117.2 dB)
setfact(191, 'Max SPL', '120 dB (peak)')
# 6) HS8S is 8", not 10"
setfact(192, 'Woofer', '10"')
# 7) wrong manual value (Genelec 8040B is 48 Hz – 20 kHz)
setfact(22, 'Frequency response', '45 Hz – 20 kHz (±2 dB)')
# 8) wrong label scheme (a subwoofer described as a monitor)
pm[193]['facts'][2]['label']['en'] = 'Frequency response'

open(src, 'w', encoding='utf-8', newline='').write(
    json.dumps(p, ensure_ascii=False, indent=2) + '\n')

r = subprocess.run(['python', '-X', 'utf8', 'temp/qf_diff_monitors.py'],
                   capture_output=True, text=True, encoding='utf-8')
print('exit code:', r.returncode, '(expected 8)')
print(r.stdout)

shutil.copyfile(bak, src)
print('restored products.json')
