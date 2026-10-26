# -*- coding: utf-8 -*-
"""Audit the live_sound quickfacts against data/guides.json product tables.

Four sub-schemes, each with its own expected labels:

  PA speakers / wedges / columns  Power, Max SPL, Coverage
  Subwoofers                     Woofer, Power, Max SPL
  Mixers                         Channels, Preamps, Connectivity
  IEM & wireless                 Range, Latency, Battery (+ 107: Type, Freq, Battery)

Rules per fact:
  * Power / Coverage / Channels / Connectivity -> token subset of the table cell
    (we only ever DROP words, e.g. "1100W dynamic (950W LF + 150W HF)" ->
    "1100W dynamic"); format-irrelevant separators are ignored
  * everything else (Max SPL, Woofer, Preamps, Range, Latency, Battery, Type,
    Frequency) -> exact value from the table cell

349 (Sennheiser EW IEM G4 Stereo) has no column of its own; its values come from
the "EW IEM G4" column of best-wireless-iems and are asserted exactly here.

Run:  python temp/qf_diff_live_sound.py
Exit: number of problems (0 = clean).
"""
import json
import re
import sys
import unicodedata

SPECS = 'temp/specs_live_sound.json'
P_PATH = 'data/products.json'

LABEL2KEY = {
    'Power': 'power',
    'Max SPL': 'maxspl',
    'Coverage': 'coverage',
    'Woofer': 'driver',
    'Channels': 'channels',
    'Preamps': 'preamps',
    'Connectivity': 'conn',
    'Range': 'range',
    'Latency': 'latency',
    'Battery': 'battery',
    'Type': 'ptype',
    'Frequency response': 'freq',
}

# labels whose value may be a shortened (word-dropped) form of the table cell.
# Numbers always survive, so a wrong figure still fails (e.g. "130 dB" against
# a "136 dB" cell, because the numeric token is not in the cell).
SUBSET_LABELS = {'Power', 'Max SPL', 'Coverage', 'Channels', 'Connectivity'}

SPEAKERS = ['Power', 'Max SPL', 'Coverage']
SUBS = ['Woofer', 'Power', 'Max SPL']
MIXERS = ['Channels', 'Preamps', 'Connectivity']
IEM = ['Range', 'Latency', 'Battery']
WIRELESS_MIC = ['Type', 'Frequency response', 'Battery']

SPEAKER_IDS = {105, 106, 108, 109, 151, 152, 153, 154, 216, 217, 218, 219,
               493, 494, 495, 496, 497, 499, 500, 501, 502, 626}
SUB_IDS = {233, 234, 235, 236, 237, 630, 631}
MIXER_IDS = {137, 138, 139, 332, 333, 334, 335, 658}
IEM_IDS = {266, 267, 347, 348, 349, 350, 362}
WIRELESS_MIC_IDS = {107}

MANUAL = {
    349: ['300 ft', '0 ms (analog)', '2x AA'],
}


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower().replace('–', '-').replace('—', '-')
    return re.sub(r'[^a-z0-9.]+', ' ', s).strip()


def toks(s):
    return set(norm(s).split())


def expected_labels(pid):
    if pid in SPEAKER_IDS:
        return SPEAKERS
    if pid in SUB_IDS:
        return SUBS
    if pid in MIXER_IDS:
        return MIXERS
    if pid in IEM_IDS:
        return IEM
    if pid in WIRELESS_MIC_IDS:
        return WIRELESS_MIC
    return None


def main():
    specs = json.load(open(SPECS, encoding='utf-8'))
    prods = [x for x in json.load(open(P_PATH, encoding='utf-8'))
             if x.get('category') == 'live_sound']

    problems = []
    checked = 0
    missing = []
    for prod in prods:
        pid = prod['id']
        want = expected_labels(pid)
        if want is None:
            missing.append(pid)
            continue
        facts = prod.get('facts') or []
        if len(facts) != 3:
            problems.append('%s %s: %d facts (expected 3)' % (pid, prod['title'], len(facts)))
            continue
        bf = prod.get('bestFor') or {}
        if not bf.get('en') or not bf.get('es'):
            problems.append('%s %s: bestFor missing en/es' % (pid, prod['title']))

        got = [(f.get('value'), (f.get('label') or {}).get('en')) for f in facts]
        labels = [g[1] for g in got]
        if labels != want:
            problems.append('%s labels %s != expected %s' % (pid, labels, want))
            continue

        if pid in MANUAL:
            for (val, lab), exp in zip(got, MANUAL[pid]):
                if val != exp:
                    problems.append('%s %s %r != table %r' % (pid, lab, val, exp))
                checked += 1
            continue

        s = specs.get(str(pid)) or {}
        for val, lab in got:
            key = LABEL2KEY[lab]
            # the IEM table calls the battery row "Power" (2x AA / Micro-USB)
            if lab == 'Battery' and pid in IEM_IDS:
                key = 'power'
            vals = s.get(key) or []
            if not vals:
                problems.append('%s %s: no table value' % (pid, lab))
                continue
            if lab in SUBSET_LABELS:
                union = toks(' '.join(vals))
                if not toks(val) <= union:
                    problems.append('%s %s %r not a subset of %r' % (pid, lab, val, vals))
            else:
                if val not in vals:
                    problems.append('%s %s %r not in table %r' % (pid, lab, val, vals))
            checked += 1

    print('live_sound products   :', len(prods))
    print('covered by a sub-scheme:', len(prods) - len(missing))
    if missing:
        print('NOT in a sub-scheme   :', missing)
    print('facts checked         :', checked)
    print()
    if problems:
        print('PROBLEMS: %d' % len(problems))
        for x in problems:
            print('  ', x)
    else:
        print('PROBLEMS: 0')
    return len(problems) + len(missing)


sys.exit(main())
