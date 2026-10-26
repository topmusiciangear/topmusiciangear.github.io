# -*- coding: utf-8 -*-
"""Audit the streaming quickfacts (13 products).

Two sub-schemes:

  stream controllers (stream-controllers)
      Type         -> "Type"
      Controls     -> "Keys / Controls"
      Connectivity -> "Connectivity"

  streaming interfaces (streaming-interfaces)
      Type         -> "Type"
      Mic Inputs   -> "Mic Inputs"
      Loopback     -> "Loopback"

Two products are pinned in NO_TABLE because they are not columns in any
comparison table:

  264 Elgato Stream Deck + XL
      stream-controllers column 0 is the Stream Deck+ (8 keys), and a fuzzy
      title match pins the XL there. The XL has 36 keys, so its facts come from
      its own description instead.
  265 Razer Stream Controller
      no title match at all.

For those two the audit cannot compare against a cell, so it checks the pinned
text and requires every figure in it to appear in the description.

Values are shortened only by dropping words, so a wrong key count, fader count
or port list fails. When a value states figures, the cell's first figure must
survive.

Run:  python temp/qf_diff_streaming.py
Exit: number of problems (0 = clean).
"""
import json
import re
import sys
import unicodedata

P_PATH = 'data/products.json'

CTRL = (['Type', 'Controls', 'Connectivity'],
        {'Type': 'Type', 'Controls': 'Keys / Controls',
         'Connectivity': 'Connectivity'})
IFACE = (['Type', 'Mic Inputs', 'Loopback'],
         {'Type': 'Type', 'Mic Inputs': 'Mic Inputs', 'Loopback': 'Loopback'})

GROUPS = {
    'controller': (CTRL, {
        243: ('stream-controllers', 0),
        244: ('stream-controllers', 1),
        246: ('stream-controllers', 2),
        659: ('stream-controllers', 3),
        661: ('stream-controllers', 4),
        248: ('stream-controllers', 5),
        247: ('stream-controllers', 7),
        662: ('stream-controllers', 8),
        663: ('stream-controllers', 9),
        671: ('stream-controllers', 10),
    }),
    'interface': (IFACE, {
        664: ('streaming-interfaces', 4),
    }),
}

NO_TABLE = {
    264: {'Type': 'Controller with LCD keys & dials',
          'Controls': '36 LCD keys + dials + touch strip',
          'Connectivity': 'USB-C'},
    265: {'Type': 'All-in-one keypad with LCD keys',
          'Controls': '12 haptic keys + dials',
          'Connectivity': 'USB-C'},
}

DEAD = {'', '—', '-', 'N/A', 'n/a', None}


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower().replace('–', '-').replace('—', '-')
    s = re.sub(r'(?<=[a-z])(?=\d)|(?<=\d)(?=[a-z])', ' ', s)
    return re.sub(r'[^a-z0-9.]+', ' ', s).strip()


def toks(s):
    out = set()
    for w in norm(s).split():
        w = w.strip('.')
        if w:
            out.add(w)
    return out


def numbers(s):
    return {w for w in toks(s) if re.fullmatch(r'\d+(\.\d+)?', w)}


def icon_allowlist():
    src = open('js/icons.js', encoding='utf-8').read()
    keys = set(re.findall(r'^\s{2}([A-Za-z][A-Za-z0-9]*):\s*\{\s*path:', src, re.M))
    build = open('build-guides.js', encoding='utf-8').read()
    start = build.find('function _qfIcon')
    seg = build[start:build.find('_cardBase', start)]
    return keys | set(re.findall(r"name === '([a-zA-Z]+)'", seg))


def cell(g, col, row_label):
    for row in g['productTable']['rows']:
        if row.get('label') == row_label:
            v = row['values'][col]
            return v.get('value') if isinstance(v, dict) else v
    return None


def check_common(p, want_labels, icons):
    pid = p['id']
    problems = []
    facts = p.get('facts') or []

    bf = p.get('bestFor') or {}
    if not bf.get('en') or not bf.get('es'):
        problems.append('%s %s: bestFor missing en/es' % (pid, p['title'][:40]))
    if len(facts) != 3:
        problems.append('%s %s: %d facts (expected 3)'
                        % (pid, p['title'][:40], len(facts)))
        return problems, False

    labels = [(f.get('label') or {}).get('en') for f in facts]
    if labels != want_labels:
        problems.append('%s %s: labels %s != %s'
                        % (pid, p['title'][:40], labels, want_labels))
        return problems, False

    for f in facts:
        lab = f['label']['en']
        val = f.get('value')
        icon = f.get('icon')
        if not icon or icon not in icons:
            problems.append('%s %s: bad icon %r' % (pid, lab, icon))
        if not val or val in DEAD:
            problems.append('%s %s: empty value' % (pid, lab))
        elif re.search(r'[áéíóúñÁÉÍÓÚÑ]', val):
            problems.append('%s %s: accented text in EN value %r' % (pid, lab, val))
    return problems, True


def audit(prods, guides, icons):
    gmap = {g['id']: g for g in guides}
    by_id = {p['id']: p for p in prods}
    problems = []
    checked = 0
    seen = set()

    for group, ((want_labels, rowmap), assign) in GROUPS.items():
        for pid, (gid, col) in sorted(assign.items()):
            seen.add(pid)
            p = by_id.get(pid)
            if not p:
                problems.append('%s: missing product' % pid)
                continue
            probs, ok = check_common(p, want_labels, icons)
            problems += probs
            checked += 3
            if not ok:
                continue
            g = gmap.get(gid)
            if not g:
                problems.append('%s: guide %s missing' % (pid, gid))
                continue
            for f in p['facts']:
                lab = f['label']['en']
                val = f['value']
                c = cell(g, col, rowmap[lab])
                if c in DEAD:
                    problems.append('%s %s: empty cell in %s' % (pid, lab, gid))
                    continue
                if not toks(val) <= toks(c):
                    problems.append('%s %s %r not a subset of %s cell %r'
                                    % (pid, lab, val, gid, c))
                    continue
                val_nums = numbers(val)
                cell_nums = [w for w in norm(c).split()
                             if re.fullmatch(r'\d+(\.\d+)?', w)]
                if val_nums and cell_nums and cell_nums[0] not in val_nums:
                    problems.append('%s %s %r drops the leading figure of %r'
                                    % (pid, lab, val, c))

    for pid, manual in sorted(NO_TABLE.items()):
        seen.add(pid)
        p = by_id.get(pid)
        if not p:
            problems.append('%s: missing product' % pid)
            continue
        probs, ok = check_common(p, ['Type', 'Controls', 'Connectivity'], icons)
        problems += probs
        checked += 3
        if not ok:
            continue
        desc = p.get('desc') or ''
        for f in p['facts']:
            lab = f['label']['en']
            if norm(f['value']) != norm(manual[lab]):
                problems.append('%s %s %r != manual %r'
                                % (pid, lab, f['value'], manual[lab]))
            missing = numbers(f['value']) - numbers(desc)
            if missing:
                problems.append('%s %s: figures %s not in the description'
                                % (pid, lab, sorted(missing)))

    for p in prods:
        if p.get('category') == 'streaming' and p['id'] not in seen:
            problems.append('%s %s: not covered by any sub-scheme'
                            % (p['id'], p['title'][:40]))

    return problems, checked


def main():
    guides = json.load(open('data/guides.json', encoding='utf-8'))
    prods = json.load(open(P_PATH, encoding='utf-8'))
    problems, checked = audit(prods, guides, icon_allowlist())

    n = len([p for p in prods if p.get('category') == 'streaming'])
    print('streaming products :', n)
    print('facts checked      :', checked)
    print()
    if problems:
        print('PROBLEMS: %d' % len(problems))
        for x in problems:
            print('  ', x)
    else:
        print('PROBLEMS: 0')
    return len(problems)


if __name__ == '__main__':
    sys.exit(main())
