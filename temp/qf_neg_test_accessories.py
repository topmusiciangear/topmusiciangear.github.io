# -*- coding: utf-8 -*-
"""Negative test for temp/qf_diff_accessories.py.

Each case injects one error into a deep copy of the real data and requires the
audit to name that product. Covers both check styles: the row-by-row test used by
DI boxes and controllers (wrong weight, wrong fader count, wrong protocol) and the
corpus test used by stands/isolation (invented capacity, invented frequency
range), plus label swaps, a bad icon, an accent in an English value and an empty
bestFor translation.

Run:  python temp/qf_neg_test_accessories.py
Exit: 0 when every injected error is caught.
"""
import copy
import importlib.util
import json
import sys

spec = importlib.util.spec_from_file_location('qfa', 'temp/qf_diff_accessories.py')
qfa = importlib.util.module_from_spec(spec)
spec.loader.exec_module(qfa)

GUIDES = json.load(open('data/guides.json', encoding='utf-8'))
PRODS = json.load(open('data/products.json', encoding='utf-8'))
ICONS = qfa.icon_allowlist()


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
    fact(445, 2, 'value', '900 g', 'J48 weight (table says 1.35 lbs / 612 g)'),
    fact(448, 2, 'value', '1.2 kg', 'ProD2 weight (table says 0.54 kg)'),
    fact(42, 0, 'value', '9 motorized, 100mm', 'UF8 fader count (8, not 9)'),
    fact(396, 0, 'value', '8 motorized, 100mm', 'X-Touch fader count (9, not 8)'),
    fact(398, 1, 'value', 'MCU/HUI', 'Avid S1 protocol (EUCON)'),
    fact(399, 2, 'value', 'USB-C', 'Platform M+ connectivity (USB)'),
    fact(59, 2, 'value', '45 kg', 'K&M 26722 capacity (35 kg) - invented number'),
    fact(170, 1, 'value', '100 Hz - 8 kHz', 'G4M panel range (200 Hz - 4 kHz)'),
    fact(651, 1, 'value', 'Adjustable 30-40 inch', 'MS-100 height is fixed 38 in'),
    fact(646, 1, 'value', 'Up to 12 degrees', 'ISO-200 tilt is 6.5 degrees'),
    fact(42, 0, 'label', 'Protocol', 'UF8 label in wrong slot'),
    fact(650, 0, 'icon', 'bogusIcon', 'unknown icon name'),
    fact(167, 0, 'value', 'XLR mic cable vía', 'accent inside an EN value'),
    fact(58, 0, 'bestFor_es', '', 'empty Spanish bestFor'),
]

problems, checked = qfa.audit(copy.deepcopy(PRODS), GUIDES, ICONS)
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
    probs, _ = qfa.audit(prods, GUIDES, ICONS)
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
