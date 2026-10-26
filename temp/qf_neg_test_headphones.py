# -*- coding: utf-8 -*-
"""Negative test for temp/qf_diff_headphones.py.

A clean audit proves nothing unless it can fail, so each case injects one
deliberate error into a deep copy of the real data, runs the audit's own
`audit()` on it, and requires that the product id shows up in the problems.
The untouched data must stay at zero problems (control case).

Cases cover every way a quickfact can go wrong: a wrong impedance, driver size,
weight, frequency range, type, a label in the wrong slot, an emptied bestFor
translation, an unknown icon, a value that only exists in a manual entry, and a
Spanish accent smuggled into an English value.

Run:  python temp/qf_neg_test_headphones.py
Exit: 0 when every injected error is caught.
"""
import copy
import importlib.util
import json
import sys

spec = importlib.util.spec_from_file_location('qf_hp', 'temp/qf_diff_headphones.py')
qf = importlib.util.module_from_spec(spec)
spec.loader.exec_module(qf)

GUIDES = json.load(open('data/guides.json', encoding='utf-8'))
PRODS = json.load(open('data/products.json', encoding='utf-8'))
ICONS = qf.icon_allowlist()


def fact(pid, idx, field, new, desc):
    """(pid, fact index, fact field, replacement, description)."""
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
    fact(23, 1, 'value', '250 Ω', 'DT 770 impedance 250 (it is the 80 Ohm SKU)'),
    fact(25, 2, 'value', '50mm', 'M50x driver size 50 mm (it is 45 mm)'),
    fact(57, 1, 'value', '64 Ω', 'K371 impedance 64 (it is 32 Ω)'),
    fact(606, 2, 'value', '250 g', 'HD 300 Pro weight 250 g (it is 297 g)'),
    fact(269, 1, 'value', '4 dynamic', 'SE846 driver type (it is balanced armature)'),
    fact(268, 2, 'value', '5 Hz – 40 kHz', 'IE 900 top end 40 kHz (it is 48 kHz)'),
    fact(177, 1, 'value', '32 Ω', 'LCD-MX4 impedance against its manual value'),
    fact(24, 0, 'value', 'Closed-back', 'HD 490 Pro type (it is open-back)'),
    fact(1053, 0, 'label', 'Driver size', 'HD 490 Pro Plus label in wrong slot'),
    fact(57, 0, 'bestFor_es', '', 'bestFor Spanish translation emptied'),
    fact(428, 0, 'icon', 'bogusIcon', 'unknown icon name'),
    fact(422, 0, 'value', 'Open-back vía', 'Spanish accent inside an English value'),
    fact(419, 1, 'value', '120 Ω', 'HD 280 PRO II impedance (it is 64 Ω)'),
]

# control: the real data must be clean
problems, checked = qf.audit(copy.deepcopy(PRODS), GUIDES, ICONS)
ok = not problems
print('control (real data): %d problems, %d facts' % (len(problems), checked))
print('RESULT:', 'PASS' if ok else 'FAIL - real data already fails')
if not ok:
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
print('cases: %d   caught: %d   missed: %d'
      % (len(CASES), len(CASES) - failed, failed))
sys.exit(0 if failed == 0 else 1)
