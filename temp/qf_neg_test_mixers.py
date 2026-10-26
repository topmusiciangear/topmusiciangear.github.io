# -*- coding: utf-8 -*-
"""Negative test for temp/qf_diff_mixers.py.

Injects one error per case into a deep copy of the real data and requires the
audit to name that product. Covers all four sub-schemes plus the no-table product:

  * wrong channel count, wrong preamp brand, wrong connection list
  * the X32 / X32 Compact trap: the channel count of the *other* console
  * a mix bus count that belongs to a different console
  * a 32-channel value that drops its leading figure
    ("16 XLR + 16 Combo" is a subset of "32 channels (16 XLR + 16 Combo)")
  * wrong type, wrong USB recording figure
  * a label in the wrong slot, an unknown icon, an accent in an English value,
    an emptied bestFor translation
  * Xenyx X1222USB: a value that disagrees with its pinned description, and an
    invented figure that appears nowhere in it

Run:  python temp/qf_neg_test_mixers.py
Exit: 0 when every injected error is caught.
"""
import copy
import importlib.util
import json
import sys

spec = importlib.util.spec_from_file_location('qfm', 'temp/qf_diff_mixers.py')
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
    fact(145, 0, 'value', '24 (20 preamps)', 'XR18 is 18 channels, not the Ui24R count'),
    fact(147, 1, 'value', '16 MIDAS', 'CQ-18T uses A&H preamps, not MIDAS'),
    fact(486, 2, 'value', 'USB 18x18, network', 'Ui16 is 2-track USB, not the DM3S figure'),
    fact(410, 0, 'value', '16 (12 preamps)', 'Ui24R has 24 channels / 20 preamps'),
    fact(402, 0, 'value', '40 (16 local XLR)', 'X32 (full size) is not the X32 Compact column'),
    fact(412, 1, 'value', '16 aux + LR', '32S has 26 mix buses, not the X32 figure'),
    fact(408, 0, 'value', '16 XLR + 16 Combo', 'DL32SE drops the leading 32 channels'),
    fact(561, 0, 'value', '4U rack digital', 'CQ-20B is a stagebox mixer'),
    fact(564, 1, 'value', '24x24 + SD', 'SE 24R records 64x64'),
    fact(146, 0, 'label', 'Connectivity', 'ProFX12v3 label in the wrong slot'),
    fact(149, 2, 'icon', 'bogusIcon', 'unknown icon name'),
    fact(482, 2, 'value', 'USB 48x48 vía SD', 'accent in an English value'),
    fact(145, 0, 'bestFor_es', '', 'empty Spanish bestFor'),
    fact(150, 1, 'value', '8 XENYX', 'Xenyx pinned value disagrees (desc says 6)'),
    fact(150, 0, 'value', '24-input, 2-bus', 'invented figure not in the desc'),
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
