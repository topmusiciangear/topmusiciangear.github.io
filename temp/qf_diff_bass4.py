# -*- coding: utf-8 -*-
"""Audit the `bass` category quickfacts (21 four-string electric basses).

Single sub-scheme:

    Pickups         -> "Pickups"
    Active / Passive-> "Active/Passive"
    Body            -> "Body Wood"

Every product is pinned to one guide+column, because the four tables carrying
these basses disagree on several models:

    157 Squier CV '60s Jazz    budget-bass-like-expensive says alder, both others
                               say poplar. Facts come from fender-bass-guide.
    159 Yamaha TRBX304         best-bass-under-700 / budget say mahogany body,
                               beginner says alder. Facts from beginner.
    160 Ibanez SR300E          three different body woods across tables.
                               Facts from beginner (nyatoh).
    161 StingRay Ray4          budget says ash, best-bass-under-700 says basswood.
                               Facts from best-bass-under-700.
    165 ESP LTD B-204SM        best-bass-under-700 says "Active" pickups; budget
                               says passive pickups with a switchable active EQ.
                               Facts from budget.
    326 Sire V5R               best-bass-under-700 carries the alder V5 body;
                               beginner has the mahogany V5R body. Facts from
                               beginner.

Values are shortened only by dropping words, so a wrong pickup model, EQ type or
body wood fails. When a value states figures, the cell's first figure must survive.

Music Man StingRay Special (186) is in no table: pinned in NO_TABLE from its own
description, and every figure in its facts must appear there.

Run:  python temp/qf_diff_bass4.py
Exit: number of problems (0 = clean).
"""
import json
import re
import sys
import unicodedata

P_PATH = 'data/products.json'

WANT = ['Pickups', 'Active / Passive', 'Body']
ROWMAP = {'Pickups': 'Pickups',
          'Active / Passive': 'Active/Passive',
          'Body': 'Body Wood'}

ASSIGN = {
    155: ('fender-bass-guide', 2),
    156: ('fender-bass-guide', 3),
    157: ('fender-bass-guide', 4),
    158: ('fender-bass-guide', 5),
    185: ('fender-bass-guide', 6),
    441: ('fender-bass-guide', 0),
    442: ('fender-bass-guide', 1),

    159: ('beginner-bass-guitars', 2),
    160: ('beginner-bass-guitars', 3),
    326: ('beginner-bass-guitars', 6),
    681: ('beginner-bass-guitars', 8),
    682: ('beginner-bass-guitars', 9),

    161: ('best-bass-under-700', 5),
    164: ('best-bass-under-700', 0),
    166: ('best-bass-under-700', 2),
    467: ('best-bass-under-700', 6),

    162: ('budget-bass-like-expensive', 9),
    163: ('budget-bass-like-expensive', 1),
    165: ('budget-bass-like-expensive', 6),
    683: ('budget-bass-like-expensive', 11),
}

NO_TABLE = {
    186: {'Pickups': 'Neodymium pickup',
          'Active / Passive': '18V active preamp',
          'Body': 'Lightweight ash'},
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


def check_common(p, facts, icons):
    pid = p['id']
    problems = []
    bf = p.get('bestFor') or {}
    if not bf.get('en') or not bf.get('es'):
        problems.append('%s %s: bestFor missing en/es' % (pid, p['title'][:40]))
    if len(facts) != 3:
        problems.append('%s %s: %d facts (expected 3)'
                        % (pid, p['title'][:40], len(facts)))
        return problems, False
    labels = [(f.get('label') or {}).get('en') for f in facts]
    if labels != WANT:
        problems.append('%s %s: labels %s != %s'
                        % (pid, p['title'][:40], labels, WANT))
        return problems, False
    for f in facts:
        lab = f['label']['en']
        if not f.get('icon') or f['icon'] not in icons:
            problems.append('%s %s: bad icon %r' % (pid, lab, f.get('icon')))
        val = f.get('value')
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

    for pid, (gid, col) in sorted(ASSIGN.items()):
        seen.add(pid)
        p = by_id.get(pid)
        if not p:
            problems.append('%s: missing product' % pid)
            continue
        facts = p.get('facts') or []
        probs, ok = check_common(p, facts, icons)
        problems += probs
        checked += 3
        if not ok:
            continue
        g = gmap.get(gid)
        if not g:
            problems.append('%s: guide %s missing' % (pid, gid))
            continue
        for f in facts:
            lab = f['label']['en']
            val = f['value']
            c = cell(g, col, ROWMAP[lab])
            if c in DEAD:
                problems.append('%s %s: empty cell in %s' % (pid, lab, gid))
                continue
            if not toks(val) <= toks(c):
                problems.append('%s %s %r not a subset of %s cell %r'
                                % (pid, lab, val, gid, c))
                continue
            val_nums = numbers(val)
            cell_nums = [w for w in norm(c).split() if re.fullmatch(r'\d+(\.\d+)?', w)]
            if val_nums and cell_nums and cell_nums[0] not in val_nums:
                problems.append('%s %s %r drops the leading figure of %r'
                                % (pid, lab, val, c))

    for pid, manual in sorted(NO_TABLE.items()):
        seen.add(pid)
        p = by_id.get(pid)
        if not p:
            problems.append('%s: missing product' % pid)
            continue
        facts = p.get('facts') or []
        probs, ok = check_common(p, facts, icons)
        problems += probs
        checked += 3
        if not ok:
            continue
        desc = p.get('desc') or ''
        for f in facts:
            lab = f['label']['en']
            if norm(f['value']) != norm(manual[lab]):
                problems.append('%s %s %r != manual %r'
                                % (pid, lab, f['value'], manual[lab]))
            missing = numbers(f['value']) - numbers(desc)
            if missing:
                problems.append('%s %s: figures %s not in the description'
                                % (pid, lab, sorted(missing)))

    for p in prods:
        if p.get('category') == 'bass' and p['id'] not in seen:
            problems.append('%s %s: not covered by the scheme'
                            % (p['id'], p['title'][:40]))

    return problems, checked


def main():
    guides = json.load(open('data/guides.json', encoding='utf-8'))
    prods = json.load(open(P_PATH, encoding='utf-8'))
    problems, checked = audit(prods, guides, icon_allowlist())

    n = len([p for p in prods if p.get('category') == 'bass'])
    print('bass products  :', n)
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
