# -*- coding: utf-8 -*-
"""Negative test for temp/qf_diff_bass4.py.

Injects one error per case and requires the audit to name that product:

  * wrong pickup model, wrong EQ type, wrong body wood
  * the cross-table traps: TRBX304 with the mahogany body of the other tables,
    Ray4 with the "ash" body of the budget table, Sire V5R with the alder V5 body
  * a body that drops its leading figure ("mahogany/walnut" from
    "9-ply mahogany/walnut")
  * label in the wrong slot, unknown icon, accent in an English value, empty
    bestFor translation
  * StingRay Special: a pinned value that disagrees, and an invented figure that
    appears nowhere in its description

Run:  python temp/qf_neg_test_bass4.py
Exit: 0 when every injected error is caught.
"""
import copy
import importlib.util
import json
import sys

spec = importlib.util.spec_from_file_location('qfb4', 'temp/qf_diff_bass4.py')
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
    fact(441, 0, 'value', 'V-Mod II split coil', 'Player II P has a Player split coil'),
    fact(160, 1, 'value', 'Active (2-band EQ)', 'SR300E has a 3-band EQ'),
    fact(157, 2, 'value', 'Alder', 'CV 60s Jazz is poplar in the pinned table'),
    fact(159, 2, 'value', 'Mahogany', 'TRBX304 is alder, not the other tables mahogany'),
    fact(161, 2, 'value', 'Ash', 'Ray4 is basswood, not the budget table ash'),
    fact(326, 2, 'value', 'North American alder', 'V5R is mahogany, not the V5 alder'),
    fact(442, 0, 'value', 'Player Alnico 5 J', 'drops the leading 2x of the cell'),
    fact(185, 1, 'value', 'Active/Passive (S-1 switch, push-pull)', 'invented tail words'),
    fact(165, 0, 'value', 'Diamond Schecter humbuckers', 'ESP has SB-4 pickups'),
    fact(683, 1, 'label', 'Body', 'label in the wrong slot'),
    fact(164, 0, 'icon', 'bogusIcon', 'unknown icon name'),
    fact(166, 0, 'value', '2x vintage singlé coils', 'accent in an English value'),
    fact(467, 0, 'bestFor_es', '', 'empty Spanish bestFor'),
    fact(186, 1, 'value', '9V active preamp', 'StingRay Special is 18V'),
    fact(186, 0, 'value', 'Alnico 5 pickup', 'invented pickup not in the description'),
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
    print('%-4s %-56s %s' % ('PASS' if good else 'FAIL', desc,
                             ('-> ' + hit[0]) if hit else '(not caught)'))

print()
print('cases: %d   caught: %d   missed: %d' % (len(CASES), len(CASES) - failed, failed))
sys.exit(0 if failed == 0 else 1)
