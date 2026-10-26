# -*- coding: utf-8 -*-
"""Negative test for temp/qf_diff_amps.py.

Injects wrong wattage, wrong cabinet, wrong valve complement, a label in the wrong
slot, a bad icon, an accent in an English value and an emptied bestFor into a deep
copy of the data, then requires the audit to name the product each time.

Run:  python temp/qf_neg_test_amps.py
Exit: 0 when every injected error is caught.
"""
import copy
import importlib.util
import json
import sys

spec = importlib.util.spec_from_file_location('qfamps', 'temp/qf_diff_amps.py')
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
    fact(71, 1, 'value', '30W', 'Blues Junior is 15W'),
    fact(73, 1, 'value', '50W', 'AC30 is 30W'),
    fact(74, 2, 'value', '1x12" Celestion Greenback', 'DSL40CR uses V-Type'),
    fact(130, 1, 'value', '50W', 'Champion II 25 is 25W'),
    fact(488, 2, 'value', '40mm drivers', 'Waza-Air uses 50 mm drivers'),
    fact(629, 1, 'value', '22W', 'Tone Master is 100W (22W is the tube sim)'),
    fact(75, 0, 'label', 'Power', 'Ampeg type label in the power slot'),
    fact(627, 0, 'icon', 'bogusIcon', 'unknown icon'),
    fact(629, 0, 'value', 'Digital combo vía', 'accent in an English value'),
    fact(552, 0, 'bestFor_es', '', 'empty Spanish bestFor'),
]

problems, checked = qf.audit(copy.deepcopy(PRODS), GUIDES, ICONS)
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
    probs, _ = qf.audit(prods, GUIDES, ICONS)
    hit = [x for x in probs if str(pid) == x.split(' ')[0]]
    good = bool(hit)
    if not good:
        failed += 1
    print('%-4s %-52s %s' % ('PASS' if good else 'FAIL', desc,
                             ('-> ' + hit[0]) if hit else '(not caught)'))

print()
print('cases: %d   caught: %d   missed: %d' % (len(CASES), len(CASES) - failed, failed))
sys.exit(0 if failed == 0 else 1)
