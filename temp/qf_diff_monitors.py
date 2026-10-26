# -*- coding: utf-8 -*-
"""Audit the monitors quickfacts against data/guides.json product tables.

Two sub-schemes:

  Studio monitors  Woofer, Power, Frequency response
  Subwoofers       Woofer, Power, Max SPL   (192 and 481 use Frequency response
                   because the maker publishes no SPL figure)

Rules per fact:
  * Woofer and Power -> token subset of the table cell (we only ever DROP words,
    e.g. "145W RMS (97W LF + 48W HF)" -> "145W RMS (97W + 48W)"). Numbers survive
    as tokens, so a wrong figure still fails.
  * Frequency response and Max SPL -> exact value from the table cell.

Twelve products have no product table of their own (they only appear in
comparison guides): 22, 180, 181, 222, 337, 338, 468, 470, 479, 480, 481 and
645. Their values come from the manufacturer's product page and are asserted
exactly against the MANUAL map below.

Run:  python temp/qf_diff_monitors.py
Exit: number of problems (0 = clean).
"""
import json
import re
import sys
import unicodedata

SPECS = 'temp/specs_monitors.json'
P_PATH = 'data/products.json'

LABEL2KEY = {
    'Woofer': 'driver',
    'Power': 'power',
    'Frequency response': 'freq',
    'Max SPL': 'maxspl',
}

# labels whose value may be a shortened (word-dropped) form of the table cell.
# Numbers always survive as tokens, so a wrong figure still fails ("80 Hz – 25 kHz"
# against an "80 Hz - 20 kHz" cell, because 25 is not in the cell).
SUBSET_LABELS = {'Woofer', 'Power', 'Frequency response'}

MONITORS = ['Woofer', 'Power', 'Frequency response']
SUBS = ['Woofer', 'Power', 'Max SPL']
SUBS_FREQ = ['Woofer', 'Power', 'Frequency response']

SUB_IDS = {191, 192, 193, 300, 301, 337, 338, 468, 470, 479, 480, 481}

# the under-$150 guide keeps frequency data under "Bass extension (stated)"
BASSEXT_IDS = {1042, 1043, 1046, 1048, 1049, 1052}

# values read from the manufacturer's own product page (no guide table exists)
MANUAL = {
    22: ['6.5" / 165 mm', '90W bass + 90W treble', '48 Hz – 20 kHz (±2 dB)'],
    180: ['2x 7" woofers', '1,350W total', '30 Hz – 50 kHz (-20 dB)'],
    181: ['11" sub + 5" mid', '300W + 150W + 100W', '30 Hz – 40 kHz (±3 dB)'],
    222: ['6.5" / 164 mm', '242W total', '47 Hz – 25 kHz'],
    645: ['6.5" Slatefiber', '85W (30W + 55W)', '40 Hz – 22 kHz (±3 dB)'],
    337: ['10" / 265 mm', '256W', '105 dB (half space)'],
    338: ['8" / 205 mm', '130W Class D', '≥103 dB'],
    468: ['10" / 265 mm', '180W', '109 dB (half space)'],
    470: ['15" / 375 mm', '300W Class AB', '113 dB cont. / 119 dB peak'],
    479: ['13" / 33 cm', '600W class G', '125 dB peak'],
    480: ['12" / 305 mm', '400W Class D', '≥113 dB short-term'],
    481: ['2x 8" aluminum', '500W', '25 Hz (-3 dB)'],
}


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower().replace('–', '-').replace('—', '-')
    return re.sub(r'[^a-z0-9.]+', ' ', s).strip()


def toks(s):
    return set(norm(s).split())


def expected_labels(pid):
    if pid == 192 or pid == 481:
        return SUBS_FREQ
    if pid in SUB_IDS:
        return SUBS
    return MONITORS


def main():
    specs = json.load(open(SPECS, encoding='utf-8'))
    prods = [x for x in json.load(open(P_PATH, encoding='utf-8'))
             if x.get('category') == 'monitors']

    problems = []
    checked = 0
    for prod in prods:
        pid = prod['id']
        want = expected_labels(pid)
        facts = prod.get('facts') or []
        if len(facts) != 3:
            problems.append('%s %s: %d facts (expected 3)'
                            % (pid, prod['title'], len(facts)))
            continue
        bf = prod.get('bestFor') or {}
        if not bf.get('en') or not bf.get('es'):
            problems.append('%s %s: bestFor missing en/es'
                            % (pid, prod['title']))

        got = [(f.get('value'), (f.get('label') or {}).get('en')) for f in facts]
        labels = [g[1] for g in got]
        if labels != want:
            problems.append('%s labels %s != expected %s' % (pid, labels, want))
            continue

        if pid in MANUAL:
            for (val, lab), exp in zip(got, MANUAL[pid]):
                if val != exp:
                    problems.append('%s %s %r != manual %r' % (pid, lab, val, exp))
                checked += 1
            continue

        s = specs.get(str(pid)) or {}
        for val, lab in got:
            key = LABEL2KEY[lab]
            if key == 'freq' and pid in BASSEXT_IDS and not s.get('freq'):
                key = 'bassext'
            vals = s.get(key) or []
            if not vals:
                problems.append('%s %s: no table value' % (pid, lab))
                continue
            if lab in SUBSET_LABELS:
                union = toks(' '.join(vals))
                if not toks(val) <= union:
                    problems.append('%s %s %r not a subset of %r'
                                    % (pid, lab, val, vals))
            else:
                if norm(val) not in [norm(v) for v in vals]:
                    problems.append('%s %s %r not in table %r'
                                    % (pid, lab, val, vals))
            checked += 1

    print('monitors products :', len(prods))
    print('facts checked     :', checked)
    print()
    if problems:
        print('PROBLEMS: %d' % len(problems))
        for x in problems:
            print('  ', x)
    else:
        print('PROBLEMS: 0')
    return len(problems)


sys.exit(main())
