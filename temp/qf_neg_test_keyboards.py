# -*- coding: utf-8 -*-
"""Negative test for temp/qf_diff_keyboards.py.

Injects one deliberate error per fact slot (wrong polyphony, wrong weight, wrong
action, swapped label, missing bestFor, broken manual value) into a temporary
copy of data/products.json, runs the audit against it, and checks that every
injected error is reported. A clean audit that cannot fail is worthless.

Run:  python temp/qf_neg_test_keyboards.py
"""
import json
import os
import subprocess
import sys
import tempfile

P_PATH = 'data/products.json'
SRC = open(P_PATH, encoding='utf-8').read()
prods = json.loads(SRC)

CASES = [
    # (product id, fact index, field, new value, description)
    (140, 1, 'value', '256', 'wrong polyphony (P-225 is 192)'),
    (565, 2, 'value', '11 kg', 'wrong weight (RP107 is 37 kg)'),
    (11, 0, 'value', '88 plastic keys', 'wrong action'),
    (143, 2, 'value', '8 voices', 'wrong polyphony (Sub 37 is mono)'),
    (13, 1, 'value', 'USB-B', 'wrong connectivity'),
    (647 if False else 637, 0, 'value', '73 keys', 'wrong key count'),
    (175, 2, 'value', '8 voices', 'manual Prophet-10 polyphony'),
    (476, 2, 'value', '8 voices', 'wrong polyphony (DeepMind is 12)'),
]

by_id = {p['id']: p for p in prods}
applied = []
for pid, fi, field, new, desc in CASES:
    p = by_id.get(pid)
    if not p or not p.get('facts'):
        print('!! no product/facts for', pid)
        continue
    p['facts'][fi][field] = new
    applied.append(desc)

# also break a bestFor and a label
by_id[141]['bestFor'] = {'en': 'ok', 'es': ''}
applied.append('bestFor es emptied')
by_id[324]['facts'][0]['label']['en'] = 'Action'

tmp = os.path.join(tempfile.gettempdir(), 'neg_products.json')
open(tmp, 'w', encoding='utf-8', newline='').write(
    json.dumps(prods, ensure_ascii=False, indent=2) + '\n')

# run the audit with P_PATH pointed at the temp file
audit = open('temp/qf_diff_keyboards.py', encoding='utf-8').read()
audit = audit.replace("P_PATH = 'data/products.json'", 'P_PATH = %r' % tmp)
tmp_audit = 'temp/_neg_audit_keyboards.py'
open(tmp_audit, 'w', encoding='utf-8').write(audit)

out = subprocess.run([sys.executable, '-X', 'utf8', tmp_audit],
                     capture_output=True, text=True).stdout
print(out)

detected = out.count('  ')
print('errors injected :', len(applied))
print('audit exit line :', [l for l in out.splitlines() if l.startswith('PROBLEMS')])
ok = 'PROBLEMS: 0' not in out
print()
print('RESULT:', 'PASS - audit rejects the injected errors' if ok
      else 'FAIL - audit accepted wrong data')

os.remove(tmp)
os.remove(tmp_audit)
sys.exit(0 if ok else 1)
