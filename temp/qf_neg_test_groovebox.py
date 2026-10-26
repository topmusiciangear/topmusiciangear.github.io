# -*- coding: utf-8 -*-
"""Negative test for temp/qf_diff_groovebox.py.

  * wrong voice count, wrong engine, a machine carrying its neighbour's values
  * dropping the leading figure of a cell ("hybrid voices" from "4 hybrid voices")
  * label in the wrong slot, unknown icon, accent in an English value, empty
    bestFor translation
  * a product pinned to a column the drum-machine audit already owns
  * a groovebox product with no assignment

Run:  python temp/qf_neg_test_groovebox.py
Exit: 0 when every injected error is caught.
"""
import copy
import importlib.util
import json
import sys

spec = importlib.util.spec_from_file_location('qfg', 'temp/qf_diff_groovebox.py')
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
    fact(614, 1, 'value', '12 (8 digital + 4 analog)',
         'DrumBrute has 10 analog voices, not the Syntakt 12'),
    fact(612, 1, 'value', '4 hybrid voices', 'Syntakt has 12 voices'),
    fact(613, 2, 'value', 'Pure analog + Color drive', 'Perkons has digital filters too'),
    fact(610, 2, 'value', 'Hybrid synthesis, 37 engines', 'T-8 runs ACB + TB-303'),
    fact(610, 1, 'value', '1 bass', 'drops the six drum voices of the cell'),
    fact(613, 1, 'value', 'hybrid voices', 'drops the leading 4 of the cell'),
    fact(612, 0, 'label', 'Tracks', 'label in the wrong slot'),
    fact(614, 0, 'icon', 'bogusIcon', 'unknown icon name'),
    fact(610, 0, 'value', 'M\u00e1quina de ritmos',
         'Spanish text leaking into an English value'),
    fact(612, 0, 'bestFor_es', '', 'empty Spanish bestFor'),
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

# a product pinned to a column the drum-machine audit owns
saved = qf.ASSIGN[610]
qf.ASSIGN[610] = ('best-drum-machine', 3)
probs, _ = run(copy.deepcopy(PRODS))
qf.ASSIGN[610] = saved
hit = [x for x in probs if 'belongs to the drum-machine audit' in x]
good = bool(hit)
if not good:
    failed += 1
CASES.append((0, 'column collision with the drum-machine audit'))
print('%-4s %-52s %s' % ('PASS' if good else 'FAIL',
                         'column collision with the drum-machine audit',
                         ('-> ' + hit[0]) if hit else '(not caught)'))

# an uncovered groovebox
prods = copy.deepcopy(PRODS)
prods.append({'id': 8888, 'title': 'Unlisted Groovebox', 'category': 'groovebox'})
probs, _ = run(prods)
hit = [x for x in probs if x.startswith('8888')]
good = bool(hit)
if not good:
    failed += 1
CASES.append((8888, 'uncovered groovebox reported'))
print('%-4s %-52s %s' % ('PASS' if good else 'FAIL', 'uncovered groovebox reported',
                         ('-> ' + hit[0]) if hit else '(not caught)'))

print()
print('cases: %d   caught: %d   missed: %d' % (len(CASES), len(CASES) - failed, failed))
sys.exit(0 if failed == 0 else 1)
