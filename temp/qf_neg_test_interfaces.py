# -*- coding: utf-8 -*-
"""Negative test for temp/qf_diff_interfaces.py.

Injects one error per case into a deep copy of the real data and requires the
audit to name that product. Covers the three sub-schemes plus the no-table
product:

  * wrong I/O count, wrong preamp gain, wrong connection type (standard)
  * wrong conversion figure, wrong preamp character (premium)
  * wrong mic input count, wrong loopback claim (streaming)
  * a label in the wrong slot, an unknown icon, an accent in an English value,
    an emptied bestFor translation
  * Apollo x16: a value that does not match its pinned description figures, and a
    figure that appears nowhere in the description (invented number)

Run:  python temp/qf_neg_test_interfaces.py
Exit: 0 when every injected error is caught.
"""
import copy
import importlib.util
import json
import sys

spec = importlib.util.spec_from_file_location('qfi', 'temp/qf_diff_interfaces.py')
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
    fact(15, 0, 'value', '4-in / 4-out', 'Scarlett 2i2 is 2-in / 2-out'),
    fact(16, 0, 'value', '2-in / 2-out', 'Apollo Twin X is 10-in / 6-out'),
    fact(15, 1, 'value', '2, +80 dB gain', 'Scarlett gain is +69 dB'),
    fact(17, 2, 'value', 'USB-C', 'Babyface Pro FS is USB 2.0'),
    fact(550, 0, 'value', '8-in / 8-out', 'UMC1820 is 18-in / 20-out'),
    fact(512, 0, 'value', 'A/D 120 dBA', 'MT 48 A/D is 136 dBA'),
    fact(513, 1, 'value', '4x Unison', 'Apollo x8p has 8 Unison pres'),
    fact(239, 1, 'value', '4 Revolution preamps', 'Rodecaster Duo has 2'),
    fact(240, 2, 'value', 'No', 'Bridge Cast X has hardware dual-bus loopback'),
    fact(678, 1, 'value', '2 URX pres', 'URX44V has 4 URX pres'),
    fact(53, 0, 'label', 'Preamps', 'iD14 label in the I/O slot'),
    fact(679, 2, 'icon', 'bogusIcon', 'unknown icon name'),
    fact(551, 2, 'value', 'USB-C vía hub', 'accent in an English value'),
    fact(262, 0, 'bestFor_es', '', 'empty Spanish bestFor'),
    fact(182, 1, 'value', '160 dB dynamic range', 'x16 pinned value disagrees'),
    fact(182, 0, 'value', '32 in / 20 out', 'invented figure not in the desc'),
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
    print('%-4s %-50s %s' % ('PASS' if good else 'FAIL', desc,
                             ('-> ' + hit[0]) if hit else '(not caught)'))

print()
print('cases: %d   caught: %d   missed: %d' % (len(CASES), len(CASES) - failed, failed))
sys.exit(0 if failed == 0 else 1)
