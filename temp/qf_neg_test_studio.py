# -*- coding: utf-8 -*-
"""Negative test for temp/qf_diff_studio.py.

  * the two mixers swapping values (TF3's 20 aux on the SQ-6+)
  * a wrong track count, a wrong channel count
  * a value that drops the leading figure ("channels (up to 48)")
  * label in the wrong slot, unknown icon, accent in an English value, empty
    bestFor translation
  * a column of the table whose product has no facts (completeness check)
  * a column with a third layout the table does not use

Run:  python temp/qf_neg_test_studio.py
Exit: 0 when every injected error is caught.
"""
import copy
import importlib.util
import json
import sys

spec = importlib.util.spec_from_file_location('qfst', 'temp/qf_diff_studio.py')
qf = importlib.util.module_from_spec(spec)
spec.loader.exec_module(qf)

GUIDES = json.load(open('data/guides.json', encoding='utf-8'))
PRODS = json.load(open('data/products.json', encoding='utf-8'))
ICONS = qf.icon_allowlist()


def fact(pid, idx, field, new, desc):
    def mutate(prods):
        p = [x for x in prods if x['id'] == pid][0]
        if field == 'bestFor_es':
            p['bestFor']['es'] = new
        elif field == 'label':
            p['facts'][idx]['label']['en'] = new
        else:
            p['facts'][idx][field] = new
    return pid, desc, mutate


CASES = [
    fact(414, 1, 'value', '20 aux + LR', 'TF3 has 20 aux, the SQ-6+ has 44 buses'),
    fact(418, 1, 'value', '44-bus architecture', 'TF3 has 20 aux + LR'),
    fact(418, 2, 'value', 'USB 32-track (SQ-Drive)', 'TF3 records 34 tracks'),
    fact(414, 0, 'value', '32 channels (up to 40)', 'SQ-6+ is 24 channels (up to 48)'),
    fact(418, 0, 'value', 'channels (up to 48)', 'drops the leading 24 of the cell'),
    fact(414, 2, 'label', 'Mix Buses', 'label in the wrong slot'),
    fact(418, 0, 'icon', 'bogusIcon', 'unknown icon name'),
    fact(414, 0, 'value', 'M\\u00e1quinas de 24 canales',
         'Spanish text leaking into an English value'),
    fact(418, 0, 'bestFor_es', '', 'empty Spanish bestFor'),
]


def run(prods):
    return qf.audit(prods, GUIDES, ICONS)


problems, checked = run(copy.deepcopy(PRODS))
print('control (real data): %d problems, %d facts' % (len(problems), checked))
print('RESULT:', 'PASS' if not problems else 'FAIL - real data already fails')
if problems:
    for x in problems:
        print('   ', x)
    sys.exit(1)

print()
failed = 0
for pid, desc, mutate in CASES:
    prods = copy.deepcopy(PRODS)
    mutate(prods)
    probs, _ = run(prods)
    hit = [x for x in probs if str(pid) == x.split(' ')[0]]
    good = bool(hit)
    if not good:
        failed += 1
    print('%-4s %-52s %s' % ('PASS' if good else 'FAIL', desc,
                             ('-> ' + hit[0]) if hit else '(not caught)'))

# a table column whose product has no facts must be reported
prods = copy.deepcopy(PRODS)
for p in prods:
    if p['id'] == 413:            # StudioLive 32SC, column 8
        p['facts'] = []
probs, _ = run(prods)
hit = [x for x in probs if 'no facts' in x or '0 facts' in x]
good = bool(hit)
if not good:
    failed += 1
CASES.append((413, 'table column with no facts reported'))
print('%-4s %-52s %s' % ('PASS' if good else 'FAIL',
                         'table column with no facts reported',
                         ('-> ' + hit[0]) if hit else '(not caught)'))

# a third layout in the table must be reported
prods = copy.deepcopy(PRODS)
for p in prods:
    if p['id'] == 402:            # Behringer X32, column 0
        p['facts'][2]['label']['en'] = 'Recording'
probs, _ = run(prods)
hit = [x for x in probs if 'unexpected layout' in x]
good = bool(hit)
if not good:
    failed += 1
CASES.append((402, 'third layout in the table reported'))
print('%-4s %-52s %s' % ('PASS' if good else 'FAIL',
                         'third layout in the table reported',
                         ('-> ' + hit[0]) if hit else '(not caught)'))

print()
print('cases: %d   caught: %d   missed: %d' % (len(CASES), len(CASES) - failed, failed))
sys.exit(0 if failed == 0 else 1)
