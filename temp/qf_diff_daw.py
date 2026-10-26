# -*- coding: utf-8 -*-
"""Audit the daw quickfacts (6 DAWs).

Scheme: Platforms -> "Platforms", Free Trial -> "Free Trial",
        Standout Feature -> "Standout Feature"

All six come from daw-guide, one column each. Two checks beyond the usual subset
test:

  * Type is "DAW" in all six columns, so a fact labelled Type is rejected
    outright: it would be identical on every card and carries no information.
  * Platforms must stay platform-complete. "macOS" from "macOS & Windows" passes
    the subset test but would read as Mac-only, which is the opposite of what the
    table says, so a Platforms value must contain every platform word of its cell.

Values are shortened only by dropping words. When a value states figures, the
cell's first figure must survive.

The other table, best-daw-for-beginners, holds the same six products; the audit
also checks that its Platforms cells agree with daw-guide, because a disagreement
there would mean one of the two guides is wrong.

Run:  python temp/qf_diff_daw.py
Exit: number of problems (0 = clean).
"""
import json
import re
import sys
import unicodedata

P_PATH = 'data/products.json'

WANT = ['Platforms', 'Free Trial', 'Standout Feature']
ROWMAP = {'Platforms': 'Platforms', 'Free Trial': 'Free Trial',
          'Standout Feature': 'Standout Feature'}

ASSIGN = {
    110: ('daw-guide', 0),
    112: ('daw-guide', 1),
    113: ('daw-guide', 2),
    114: ('daw-guide', 3),
    111: ('daw-guide', 4),
    115: ('daw-guide', 5),
}

CROSS = ('best-daw-for-beginners', 'Platforms')

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


def col_of(g, title):
    for i, c in enumerate(g['productTable']['columns']):
        if c.get('title') == title:
            return i
    return None


def audit(prods, guides, icons):
    gmap = {g['id']: g for g in guides}
    by_id = {p['id']: p for p in prods}
    problems = []
    checked = 0
    seen = set()

    for pid, (gid, col) in sorted(ASSIGN.items()):
        seen.add(pid)
        p = by_id.get(pid)
        if not p:
            problems.append('%s: missing product' % pid)
            continue
        facts = p.get('facts') or []
        checked += 3

        bf = p.get('bestFor') or {}
        if not bf.get('en') or not bf.get('es'):
            problems.append('%s %s: bestFor missing en/es' % (pid, p['title'][:40]))
        if len(facts) != 3:
            problems.append('%s %s: %d facts (expected 3)'
                            % (pid, p['title'][:40], len(facts)))
            continue
        labels = [(f.get('label') or {}).get('en') for f in facts]
        if labels != WANT:
            problems.append('%s %s: labels %s != %s'
                            % (pid, p['title'][:40], labels, WANT))
            continue

        g = gmap.get(gid)
        if not g:
            problems.append('%s: guide %s missing' % (pid, gid))
            continue

        ok = True
        for f in facts:
            lab = f['label']['en']
            val = f.get('value')
            icon = f.get('icon')
            if not icon or icon not in icons:
                problems.append('%s %s: bad icon %r' % (pid, lab, icon))
            if not val or val in DEAD:
                problems.append('%s %s: empty value' % (pid, lab))
                ok = False
                continue
            if re.search(r'[áéíóúñÁÉÍÓÚÑ]', val):
                problems.append('%s %s: accented text in EN value %r'
                                % (pid, lab, val))

            c = cell(g, col, ROWMAP[lab])
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
            elif cell_nums and not val_nums and norm(c).split()[0] == cell_nums[0]:
                # the cell opens with a figure ("90 days"), so a value with no
                # figure at all ("days") has lost the specification entirely
                problems.append('%s %s %r states no figure but %r opens with one'
                                % (pid, lab, val, c))
            if lab == 'Platforms':
                for plat in ('macos', 'windows'):
                    if plat in toks(c) and plat not in toks(val):
                        problems.append('%s Platforms %r drops %r from %r'
                                        % (pid, val, plat, c))
        if ok:
            pass

    # a fact labelled Type would be "DAW" on all six cards
    for pid in sorted(ASSIGN):
        p = by_id.get(pid)
        if not p:
            continue
        for f in p.get('facts') or []:
            if (f.get('label') or {}).get('en') == 'Type':
                problems.append('%s: Type fact on a DAW (identical on every card)'
                                % pid)

    # the two tables must agree on Platforms
    bg = gmap.get(CROSS[0])
    if not bg:
        problems.append('guide %s missing' % CROSS[0])
    else:
        for pid, (gid, _col) in sorted(ASSIGN.items()):
            g = gmap.get(gid)
            if not g:
                continue
            title = g['productTable']['columns'][_col].get('title')
            ccol = col_of(bg, title)
            if ccol is None:
                problems.append('%s: %s has no column for %r'
                                % (pid, CROSS[0], title))
                continue
            a = cell(g, _col, CROSS[1])
            b = cell(bg, ccol, CROSS[1])
            if norm(a) != norm(b):
                problems.append('%s Platforms disagree: %s says %r, %s says %r'
                                % (pid, gid, a, CROSS[0], b))

    for p in prods:
        if p.get('category') == 'daw' and p['id'] not in seen:
            problems.append('%s %s: not covered by the scheme'
                            % (p['id'], p['title'][:40]))

    return problems, checked


def main():
    guides = json.load(open('data/guides.json', encoding='utf-8'))
    prods = json.load(open(P_PATH, encoding='utf-8'))
    problems, checked = audit(prods, guides, icon_allowlist())

    n = len([p for p in prods if p.get('category') == 'daw'])
    print('daw products   :', n)
    print('facts checked  :', checked)
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
