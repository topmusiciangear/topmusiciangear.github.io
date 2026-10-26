# -*- coding: utf-8 -*-
"""Audit: every guitar quickfact must be backed by the guide tables (or a
verified manufacturer override).

Rules per fact label:
  pickups  -> pickup essence (SSS/HSS/HH/SS/...) must match a *determined* cell
  scale    -> first inch figure must match within 0.15 in (fraction aware)
  weight   -> lb/kg figure must match within 6 %
  wood / top / back / strings -> my tokens must be a subset of some cell
"""
import json
import re
import sys
import unicodedata

specs = json.load(open('temp/specs_guitars.json', encoding='utf-8'))
p = json.load(open('data/products.json', encoding='utf-8'))
g = json.load(open('data/guides.json', encoding='utf-8'))
pm = {x['id']: x for x in p}

# Manufacturer/retailer verified values that the tables do not carry yet.
# (pid, kind) -> (value, source)
OVERRIDES = {
    (8, 'scale'): ('25.5 in', "Andertons spec sheet (Taylor 314ce: Scale Length 25-1/2\")"),
    (8, 'body'): ('Grand Auditorium', "Taylor model name + guide prose"),
    (8, 'top'): ('Solid Sitka spruce', "Andertons (Top Wood: Sitka Spruce) + guide prose 'solid'"),
    (271, 'scale'): ('23.5 in', "Andertons spec sheet (Taylor GS Mini: 23-1/2\")"),
    (271, 'top'): ('Sitka spruce', "Andertons spec sheet (Top Wood: Sitka Spruce)"),
    (271, 'back'): ('Layered sapele', "guide prose (layered sapele back and sides)"),
    (453, 'scale'): ('25.4 in', "Andertons spec sheet (Martin OM-42: Scale Length 25.4\")"),
}

STOP = set('in mm lb kg the of and with'.split())


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower().replace('–', '-').replace('—', '-')
    return re.sub(r'[^a-z0-9./+-]+', ' ', s).strip()


def toks(s):
    return set(w for w in norm(s).split() if w not in STOP and len(w) > 1)


def pick_essence(s):
    t = norm(s)
    if not t:
        return None
    if 'piezo' in t or 'presys' in t or 'sonitone' in t or 'fishman' in t or 'fluence' in t:
        return 'PIEZO'
    if t.startswith('none') or 'no pickup' in t or 'acoustic only' in t:
        return 'NONE'
    words = t.split()
    if 'hss' in words:
        return 'HSS'
    if 'sss' in words:
        return 'SSS'
    if 'hh' in words:
        return 'HH'
    if 'ss' in words:
        return 'SS'
    if 'hs' in words:
        return 'HS'
    if ' jm' in t or 'jazzmaster' in t:
        return 'SS'

    def count(word):
        m = re.search(r'(\d+)\s*(?:x\s+)?(?:[\w-]+\s+){0,4}' + word, t)
        if m:
            return int(m.group(1))
        if word + 's' in t:
            return 2
        return 1 if word in t else 0

    h = count('humbucker') + count('burstbucker')
    if 'coil split' in t or 'coil-split' in t:
        h = max(h, 2)
    singles = count('single')
    if h and singles:
        return 'HSS' if singles >= 2 else 'HS'
    if h:
        return 'HH' if h >= 2 else 'H'
    if singles == 3:
        return 'SSS'
    if singles == 2:
        return 'SS'
    if singles == 1:
        return 'S'
    return None


FRAC = re.compile(r'(\d+(?:\.\d+)?)(?:\s+(\d+)/(\d+))?\s*(?:in\b|"|”|”)')


def inch_first(s):
    t = (s or '').replace('”', '"').replace('“', '"')
    m = FRAC.search(t)
    if not m:
        return None
    v = float(m.group(1))
    if m.group(2):
        v += float(m.group(2)) / float(m.group(3))
    return v


LB = re.compile(r'(\d+(?:\.\d+)?)\s*lb')
KG = re.compile(r'(\d+(?:\.\d+)?)\s*kg')


def weight_lb(s):
    t = norm(s)
    m = LB.search(t)
    if m:
        return float(m.group(1))
    m = KG.search(t)
    if m:
        return float(m.group(1)) * 2.20462
    return None


LABEL_KIND = {
    'pickups': 'pickups', 'pastillas': 'pickups',
    'scale': 'scale', 'escala': 'scale',
    'top': 'top', 'tapa': 'top',
    'back sides': 'back', 'aros y fondo': 'back',
    'body': 'bodywood', 'cuerpo': 'bodywood',
    'body shape': 'body', 'forma del cuerpo': 'body',
    'weight': 'weight', 'peso': 'weight',
    'strings': 'strings', 'cuerdas': 'strings',
}


def table_values(pid, kind):
    s = specs.get(str(pid)) or specs.get(pid) or {}
    vals = list(s.get(kind, []))
    if kind == 'scale' and not vals:
        # some acoustic tables fold the scale into the Neck cell ("Mahogany, 25.4 in")
        for cell in s.get('neck', []):
            v = inch_first(cell)
            if v and 20 <= v <= 30:
                vals.append(cell)
    if kind in ('top', 'back') and not vals:
        # classical tables pack both into one Body Wood cell ("Spruce / meranti")
        vals = list(s.get('bodywood', []))
    return vals


def check(pid, kind, value):
    vals = table_values(pid, kind)
    if not vals:
        return None  # no table data for this product/kind
    if kind == 'pickups':
        mine = pick_essence(value)
        theirs = set(filter(None, (pick_essence(v) for v in vals)))
        if not theirs:
            return None  # undetermined cells only
        return 'ok' if mine in theirs else 'MISMATCH %s vs %s' % (mine, sorted(theirs))
    if kind == 'scale':
        mine = inch_first(value)
        if mine is None:
            return 'MISMATCH no inch value in %r' % value
        others = [inch_first(v) for v in vals]
        others = [o for o in others if o]
        if not others:
            return None
        if any(abs(o - mine) <= 0.15 for o in others):
            return 'ok'
        return 'MISMATCH %.3f vs %s' % (mine, [round(o, 3) for o in others])
    if kind == 'weight':
        mine = weight_lb(value)
        others = [weight_lb(v) for v in vals]
        others = [o for o in others if o]
        if mine is None:
            # "Under 4 lb" style -> compare token sets
            mt = toks(value)
            return 'ok' if any(mt <= toks(v) for v in vals) else 'MISMATCH %r' % value
        if not others:
            return None
        if any(abs(o - mine) / mine <= 0.06 for o in others):
            return 'ok'
        return 'MISMATCH %.2f lb vs %s' % (mine, [round(o, 2) for o in others])
    # token subset (wood/top/back/strings/shape)
    mt = toks(value)
    for v in vals:
        if mt and mt <= toks(v):
            return 'ok'
    return 'MISMATCH %r vs %s' % (value, vals)


problems = []
checked = 0
skipped = []
for pid, prod in sorted(pm.items()):
    if prod.get('category') != 'guitars':
        continue
    facts = prod.get('facts') or []
    if len(facts) != 3:
        problems.append((pid, 'FACT COUNT', len(facts)))
        continue
    if not (prod.get('bestFor') or {}).get('en') or not (prod.get('bestFor') or {}).get('es'):
        problems.append((pid, 'BESTFOR missing', prod.get('bestFor')))
    for i, f in enumerate(facts):
        if not f.get('value'):
            problems.append((pid, 'EMPTY VALUE', i))
        if not (f.get('label') or {}).get('en') or not (f.get('label') or {}).get('es'):
            problems.append((pid, 'LABEL missing', f.get('label')))
        kind = LABEL_KIND.get(norm(f['label']['en']))
        if not kind:
            problems.append((pid, 'UNKNOWN LABEL', f['label']['en']))
            continue
        ov = OVERRIDES.get((pid, kind))
        if ov:
            if toks(ov[0]) <= toks(f['value']) or toks(f['value']) <= toks(ov[0]) \
                    or (kind == 'scale' and inch_first(ov[0]) and inch_first(f['value'])
                        and abs(inch_first(ov[0]) - inch_first(f['value'])) <= 0.15):
                checked += 1
                continue
            problems.append((pid, kind, 'OVERRIDE mismatch: %r vs %r' % (f['value'], ov[0])))
            continue
        res = check(pid, kind, f['value'])
        if res is None:
            skipped.append((pid, kind, f['value']))
        elif res == 'ok':
            checked += 1
        else:
            problems.append((pid, kind, res))

print('facts checked against tables :', checked)
print('no table data (need override):', len(skipped))
for s in skipped:
    print('   -', s)
print()
print('PROBLEMS:', len(problems))
for pr in problems:
    print('  ', pr[0], pm[pr[0]]['title'][:44], '|', pr[1], '|', pr[2])

sys.exit(1 if problems or skipped else 0)
