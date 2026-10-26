# -*- coding: utf-8 -*-
"""Negative test for temp/qf_lint_all.py.

Calls the real lint_products(), so the rules under test are the ones the site
lint runs - no re-implementation that could drift.

  * unknown icon, accent in an English value, accent in bestFor.en
  * an identical bestFor that is NOT a loanword the site uses in Spanish
    (the loanword case must stay quiet, or every streaming mic reports an error)
  * a fact repeated inside one card, two facts sharing an icon

Run:  python temp/qf_neg_test_lint.py
Exit: 0 when every injected error is caught.
"""
import copy
import importlib.util
import json
import sys

spec = importlib.util.spec_from_file_location('lint', 'temp/qf_lint_all.py')
lint = importlib.util.module_from_spec(spec)
spec.loader.exec_module(lint)

PRODS = json.load(open('data/products.json', encoding='utf-8'))
ICONS = lint.icon_allowlist()


def run(prods):
    return lint.lint_products(prods, ICONS)[0]


def prod(prods, pid):
    return [x for x in prods if x['id'] == pid][0]


def case(desc, fn, needle):
    prods = copy.deepcopy(PRODS)
    fn(prods)
    probs = run(prods)
    hit = [x for x in probs if needle in x]
    print('%-4s %-52s %s' % ('PASS' if hit else 'FAIL', desc,
                             ('-> ' + hit[0]) if hit else '(not caught)'))
    return 1 if hit else 0


control = run(copy.deepcopy(PRODS))
print('control (real data): %d problems' % len(control))
print('RESULT:', 'PASS' if not control else 'FAIL')
if control:
    for x in control:
        print('   ', x)
    sys.exit(1)

print()
caught = total = 0


def add(desc, fn, needle):
    global caught, total
    total += 1
    caught += case(desc, fn, needle)


add('unknown icon caught',
    lambda ps: prod(ps, 402)['facts'][0].update(icon='nopeIcon'),
    'unknown icon')

add('accent in an English value caught',
    lambda ps: prod(ps, 402)['facts'][0].update(value='32 canáles'),
    'accented text in EN value')

add('accent in bestFor.en caught',
    lambda ps: prod(ps, 402)['bestFor'].update(en='Música en directo'),
    'bestFor.en has an accent')

add('untranslated bestFor caught (not a loanword)',
    lambda ps: prod(ps, 284)['bestFor'].update(en='Studio use', es='Studio use'),
    'identical to en')

def repeat_fact(ps):
    f0 = prod(ps, 402)['facts'][0]
    prod(ps, 402)['facts'][1].update(value=f0['value'],
                                     label={'en': 'Channels', 'es': 'Canales'})


add('repeated fact caught', repeat_fact, 'repeated fact')

add('shared icon caught',
    lambda ps: prod(ps, 402)['facts'][2].update(icon='sliders'),
    'used for both')

# the loanword case must NOT be reported, or every streaming mic flags
prods = copy.deepcopy(PRODS)
for pid, word in ((280, 'Streaming'), (284, 'Podcast'), (289, 'Gaming'),
                  (298, 'Home studio')):
    prod(prods, pid)['bestFor'].update(en=word, es=word)
probs = [x for x in run(prods) if 'identical to en' in x]
total += 1
if probs:
    print('%-4s %-52s %s' % ('FAIL', 'loanwords stay quiet', '-> ' + probs[0]))
else:
    caught += 1
    print('%-4s %-52s %s' % ('PASS', 'loanwords stay quiet',
                             '(streaming/podcast/gaming/home studio)'))

print()
print('cases: %d   caught: %d' % (total, caught))
sys.exit(0 if caught == total else 1)
