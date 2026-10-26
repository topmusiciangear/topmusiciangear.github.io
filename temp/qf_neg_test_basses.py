# -*- coding: utf-8 -*-
"""Negative test for temp/qf_diff_basses.py.

  * wrong scale length, wrong pickup model, wrong body wood, wrong weight
  * a compact bass given the 5-string table's values
  * a scale that drops the leading figure ("-34.5 in" style)
  * label in the wrong slot, unknown icon, accent in an English value,
    empty bestFor translation

Run:  python temp/qf_neg_test_basses.py
Exit: 0 when every injected error is caught.
"""
import copy
import importlib.util
import json
import sys

spec = importlib.util.spec_from_file_location('qfb', 'temp/qf_diff_basses.py')
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
    fact(528, 1, 'value', '30 in (762 mm)', 'EHB1000 is 34 in'),
    fact(533, 2, 'value', 'Alnico 5 split P + single J stacked', 'invented words'),
    fact(538, 2, 'value', 'Basswood', 'GSR205B is okoume (Ray5 is basswood)'),
    fact(540, 0, 'value', '2x Dynamix H (passive)', 'TRBX305 uses M3 humbuckers'),
    fact(1051, 2, 'value', '~4.2 kg (9.3 lbs)', 'GSR200 is ~3.6 kg'),
    fact(536, 1, 'value', '28.6 in (726 mm)', 'Bronco is 30-inch scale'),
    fact(546, 2, 'value', 'Basswood', 'Am Pro II body is alder'),
    fact(528, 1, 'value', '864 mm', 'drops the leading 34 of "34 in (864 mm)"'),
    fact(529, 1, 'value', '33-34.5 in (838-876 mm)', 'control value that must pass'),
    fact(538, 1, 'label', 'Body', 'label in the wrong slot'),
    fact(542, 0, 'icon', 'bogusIcon', 'unknown icon name'),
    fact(544, 2, 'value', 'Okoumé', 'accent in an English value'),
    fact(548, 0, 'bestFor_es', '', 'empty Spanish bestFor'),
    fact(543, 0, 'value', 'caballo de batalla', 'singular/plural mismatch in a pickup name'),
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
for i, (pid, desc, mutate) in enumerate(CASES):
    prods = copy.deepcopy(PRODS)
    mutate(prods)
    probs, _ = qf.audit(prods, GUIDES, ICONS)
    hit = [x for x in probs if str(pid) == x.split(' ')[0]]
    if desc.startswith('control value'):
        good = not hit
    else:
        good = bool(hit)
    if not good:
        failed += 1
    print('%-4s %-58s %s' % ('PASS' if good else 'FAIL', desc,
                             ('-> ' + hit[0]) if hit else '(not caught)'))

print()
print('cases: %d   passed: %d   failed: %d' % (len(CASES), len(CASES) - failed, failed))
sys.exit(0 if failed == 0 else 1)
