# -*- coding: utf-8 -*-
"""Negative test for temp/qf_diff_samplers.py.

  * wrong memory figure, wrong effect list, wrong port set
  * the MPC family trap: MPC Key 37 / MPC XL / MPC One G2 all run "32 plugin +
    16 stereo audio", so a storage or effect from a neighbouring column
  * a storage value that drops the leading figure ("256 GB NVMe SSD" from
    "16 GB RAM / 256 GB NVMe SSD")
  * a storage value with no figure at all ("internal" from "128 MB internal")
  * label in the wrong slot, unknown icon, accent in an English value, empty
    bestFor translation
  * two products pinned to the same column

Run:  python temp/qf_neg_test_samplers.py
Exit: 0 when every injected error is caught.
"""
import copy
import importlib.util
import json
import sys

spec = importlib.util.spec_from_file_location('qfsmp', 'temp/qf_diff_samplers.py')
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
    fact(619, 0, 'value', '8 GB RAM / 128 GB storage',
         'MPC XL has 16 GB RAM / 256 GB SSD'),
    fact(620, 0, 'value', '4 GB RAM / 64 GB storage',
         'Maschine+ is 32 GB + 64 GB SD'),
    fact(616, 1, 'value', 'MPC3 Pro FX pack, XYFX',
         'MPC Key 37 runs the FX rack insert chains'),
    fact(618, 2, 'value', 'USB-C, MIDI I/O, sync I/O',
         'Circuit Rhythm has MIDI In/Out/Thru'),
    fact(615, 1, 'value', 'Granular engine, 20 MFX, Vinyl Sim',
         'P-6 has the granular engine, not the EP-133'),
    fact(619, 0, 'value', '256 GB NVMe SSD',
         'drops the leading 16 GB RAM of the cell'),
    fact(615, 0, 'value', 'internal (999 slots)',
         'states no figure but the cell opens with 128 MB'),
    fact(617, 1, 'label', 'Storage', 'label in the wrong slot'),
    fact(616, 0, 'icon', 'bogusIcon', 'unknown icon name'),
    fact(618, 1, 'value', 'Grid FX, del\u00e1y and reverb sends',
         'accent in an English value'),
    fact(620, 0, 'bestFor_es', '', 'empty Spanish bestFor'),
]


def run(prods, guides=None):
    return qf.audit(prods, guides or GUIDES, ICONS)


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

# two products on one column must be reported
saved = qf.ASSIGN[619]
qf.ASSIGN[619] = ('best-samplers-drum-computers', 6)
probs, _ = run(copy.deepcopy(PRODS))
qf.ASSIGN[619] = saved
hit = [x for x in probs if 'already used' in x]
good = bool(hit)
if not good:
    failed += 1
CASES.append((0, 'two products on one column reported'))
print('%-4s %-52s %s' % ('PASS' if good else 'FAIL',
                         'two products on one column reported',
                         ('-> ' + hit[0]) if hit else '(not caught)'))

print()
print('cases: %d   caught: %d   missed: %d' % (len(CASES), len(CASES) - failed, failed))
sys.exit(0 if failed == 0 else 1)
