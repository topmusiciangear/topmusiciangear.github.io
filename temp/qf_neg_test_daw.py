# -*- coding: utf-8 -*-
"""Negative test for temp/qf_diff_daw.py.

  * a value from the wrong DAW (Logic's 90-day trial on Ableton, FL's step
    sequencer on Pro Tools)
  * "macOS" alone for Ableton: passes the plain subset test but reads as
    Mac-only, so the platform-completeness guard must catch it
  * a trial length that drops the leading figure ("days" from "90 days")
  * a Type fact, which would say "DAW" on all six cards
  * label in the wrong slot, unknown icon, accent in an English value, empty
    bestFor translation
  * a product not covered by the scheme

Run:  python temp/qf_neg_test_daw.py
Exit: 0 when every injected error is caught.
"""
import copy
import importlib.util
import json
import sys

spec = importlib.util.spec_from_file_location('qfdaw', 'temp/qf_diff_daw.py')
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
    fact(110, 1, 'value', '90-day trial', 'Ableton trials for 90 days, not 90-day trial'),
    fact(113, 1, 'value', '60 days', 'Cubase trials 60 days, Pro Tools 30'),
    fact(111, 2, 'value', 'Session View, Max for Live', 'Logic has no Session View'),
    fact(112, 2, 'value', 'Elastic audio, 512 tracks', 'FL has the step sequencer'),
    fact(110, 0, 'value', 'macOS', 'drops Windows, reads as Mac-only'),
    fact(110, 1, 'value', 'days', 'drops the leading 90 of the cell'),
    fact(114, 0, 'label', 'Type', 'Type is DAW on all six cards'),
    fact(115, 1, 'label', 'Standout Feature', 'label in the wrong slot'),
    fact(113, 2, 'icon', 'bogusIcon', 'unknown icon name'),
    fact(111, 2, 'value', 'Included instruments, Flex Timé',
         'accent in an English value'),
    fact(112, 0, 'bestFor_es', '', 'empty Spanish bestFor'),
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

# a DAW that no assignment covers must be reported
prods = copy.deepcopy(PRODS)
prods.append({'id': 9999, 'title': 'Unlisted DAW', 'category': 'daw'})
probs, _ = qf.audit(prods, GUIDES, ICONS)
hit = [x for x in probs if x.startswith('9999')]
good = bool(hit)
if not good:
    failed += 1
CASES.append((9999, 'uncovered DAW reported'))
print('%-4s %-52s %s' % ('PASS' if good else 'FAIL', 'uncovered DAW reported',
                         ('-> ' + hit[0]) if hit else '(not caught)'))

# a cross-table Platforms disagreement must be reported
guides = copy.deepcopy(GUIDES)
bg = [g for g in guides if g['id'] == 'best-daw-for-beginners'][0]
ccol = qf.col_of(bg, 'Logic Pro')
for row in bg['productTable']['rows']:
    if row.get('label') == 'Platforms':
        row['values'][ccol] = 'macOS & Windows'
probs, _ = qf.audit(copy.deepcopy(PRODS), guides, ICONS)
hit = [x for x in probs if 'disagree' in x]
good = bool(hit)
if not good:
    failed += 1
CASES.append((0, 'cross-table Platforms disagreement reported'))
print('%-4s %-52s %s' % ('PASS' if good else 'FAIL',
                         'cross-table Platforms disagreement reported',
                         ('-> ' + hit[0]) if hit else '(not caught)'))

print()
print('cases: %d   caught: %d   missed: %d' % (len(CASES), len(CASES) - failed, failed))
sys.exit(0 if failed == 0 else 1)
