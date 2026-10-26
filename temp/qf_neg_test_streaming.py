# -*- coding: utf-8 -*-
"""Negative test for temp/qf_diff_streaming.py.

  * wrong key/fader counts, wrong port list, wrong mic input count
  * the lookalikes: Stream Deck + XL inheriting the 8-key Stream Deck+ column,
    Stream Deck+ inheriting the XL's 36, RØDECaster Pro II vs DLZ Creator faders
  * a connectivity value that drops the leading figure ("60mm channel faders"
    from "6 x 60mm channel faders")
  * label in the wrong slot, unknown icon, accent in an English value, empty
    bestFor translation
  * the two no-table products: a value that disagrees with the pinned text, and
    an invented figure that appears nowhere in the description

Run:  python temp/qf_neg_test_streaming.py
Exit: 0 when every injected error is caught.
"""
import copy
import importlib.util
import json
import sys

spec = importlib.util.spec_from_file_location('qfs', 'temp/qf_diff_streaming.py')
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
    fact(243, 1, 'value', '36 LCD keys + dials + touch strip',
         'Stream Deck+ has 8 keys, not the XL 36'),
    fact(247, 1, 'value', '6 faders + 8 SMART pads + touchscreen',
         'DLZ Creator has nine 100mm faders'),
    fact(248, 1, 'value', 'Nine 100mm faders + 10.1in touchscreen',
         'RODECaster Pro II has 6 faders + 8 pads'),
    fact(671, 1, 'value', '60mm channel faders', 'drops the leading 6 of the cell'),
    fact(662, 2, 'value', 'USB-C, SD, USB drive', 'AG08 connects over USB 8in/14out'),
    fact(664, 1, 'value', '2 XLR combo preamps', 'PodTrak P4next has 4 XLR (70dB)'),
    fact(664, 2, 'value', 'Yes \u2014 hardware buses', 'PodTrak P4next loopback is built-in'),
    fact(246, 0, 'value', 'Interface + capture + control surface',
         'Wave XLR is a compact mic interface'),
    fact(659, 2, 'value', 'USB-C (USB 2.0)', 'GoXLR Mini is USB, Windows only'),
    fact(248, 1, 'label', 'Type', 'label in the wrong slot'),
    fact(661, 0, 'icon', 'bogusIcon', 'unknown icon name'),
    fact(663, 0, 'value', 'Podcast cónsole + recorder',
         'accent in an English value'),
    fact(244, 0, 'bestFor_es', '', 'empty Spanish bestFor'),
    fact(264, 1, 'value', '8 LCD keys + dials + touch strip',
         'XL does not have 8 keys'),
    fact(265, 1, 'value', '16 haptic keys + dials',
         'invented figure not in the description'),
    fact(264, 0, 'value', 'Studio monitor controller',
         'value disagrees with the pinned text'),
]


def run(prods):
    return qf.audit(prods, GUIDES, ICONS)


def must_appear_in_desc():
    """A value that matches the pinned text but carries a figure the description
    does not contain. Both sides are patched, so only the description guard can
    catch it.

    `desc` says the Razer works over a 2-meter USB-C cable.
    """
    saved = dict(qf.NO_TABLE[265])

    def mutate(prods):
        wrong = '2-meter USB-C, 5 m cable'
        qf.NO_TABLE[265]['Connectivity'] = wrong
        p = [x for x in prods if x['id'] == 265][0]
        p['facts'][2]['value'] = wrong

    return 265, 'figure absent from the description', mutate, saved


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

pid, desc, mutate, saved = must_appear_in_desc()
prods = copy.deepcopy(PRODS)
mutate(prods)
probs, _ = run(prods)
hit = [x for x in probs if 'not in the description' in x]
qf.NO_TABLE[265] = saved
good = bool(hit)
if not good:
    failed += 1
CASES.append((pid, desc))

print('%-4s %-52s %s' % ('PASS' if good else 'FAIL', desc,
                         ('-> ' + hit[0]) if hit else '(not caught)'))

print()
print('cases: %d   caught: %d   missed: %d' % (len(CASES), len(CASES) - failed, failed))
sys.exit(0 if failed == 0 else 1)
