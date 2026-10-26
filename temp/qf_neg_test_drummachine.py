# -*- coding: utf-8 -*-
"""Negative test for temp/qf_diff_drummachine.py.

  * wrong sound engine, wrong track count, wrong battery time
  * a machine given the other machine's track count (Circuit Tracks vs Digitakt)
  * the lookalike products: TR-8S vs TR-6S battery/engine, MPC One G2 vs MPC Live III
  * a storage value that drops the leading figure ("128 GB storage" from
    "8 GB RAM / 128 GB storage")
  * label in the wrong slot, unknown icon, accent in an English value, empty
    bestFor translation

Run:  python temp/qf_neg_test_drummachine.py
Exit: 0 when every injected error is caught.
"""
import copy
import importlib.util
import json
import sys

spec = importlib.util.spec_from_file_location('qfd', 'temp/qf_diff_drummachine.py')
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
    fact(129, 2, 'value', 'ACB + FM + samples', 'Circuit Tracks has no ACB engine'),
    fact(129, 1, 'value', '16 stereo/MIDI', 'Circuit Tracks has 2 synth + 4 drum'),
    fact(33, 2, 'value', 'Stereo samples + machines', 'TR-8S engine is ACB + FM'),
    fact(128, 2, 'value', 'Built-in Li-ion, 3-4 hours', 'TR-6S runs on AA / USB'),
    fact(188, 0, 'value', '8GB internal + microSD', 'MPC Live III has 8 GB RAM / 128 GB'),
    fact(257, 0, 'value', '16 GB internal + SD card', 'MPC Sample has 8GB internal'),
    fact(255, 1, 'value', 'MPC3 Pro FX pack, XYFX', 'SP-404MKII has 41 multi-FX'),
    fact(256, 1, 'value', '16 stereo/MIDI', 'MPC One G2 has 32 plugin + 16 audio'),
    fact(188, 0, 'value', '128 GB storage', 'drops the leading 8 GB RAM of the cell'),
    fact(621, 2, 'value', 'Built-in Li-ion, up to 8 hours', 'SEQTRAK is 3-4 hours'),
    fact(625, 1, 'label', 'Battery', 'label in the wrong slot'),
    fact(622, 0, 'icon', 'bogusIcon', 'unknown icon name'),
    fact(624, 1, 'value', 'Samplíng', 'accent in an English value'),
    fact(144, 0, 'bestFor_es', '', 'empty Spanish bestFor'),
    fact(623, 2, 'value', 'USB powered', 'Liven Lofi-12 is battery powered'),
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
