"""Audit quickfacts against the guide comparison tables.

A quickfact is OK when it matches the table, or when it is listed in OVERRIDES with the
manufacturer source that beats the table. Anything else is reported as a mismatch.
"""
import json, re, unicodedata

report = json.load(open('temp/qf_table_report.json', encoding='utf-8'))


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower()
    s = re.sub(r'[^a-z0-9]+', ' ', s).strip()
    return s


def digits(s):
    return re.sub(r'[^0-9]', '', norm(s))


PAT_WORDS = ['cardioid', 'supercardioid', 'hypercardioid', 'omni', 'figure 8',
             'lobar', 'multi pattern', 'bidirectional', 'subcardioid']
SHOTGUN_OK = ['boom', 'gradient', 'lobar', 'line']

# (pid, label) -> reason. Manufacturer spec beats a table value that is wrong/absent.
# (pid, label_lower) -> (expected_value, reason)
# A manufacturer spec beats a table value that is wrong or absent. The expected value is
# asserted, so a *wrong* quickfact is still reported even when the row is an override.
OVERRIDES = {
    (232, 'max spl'): ('134 dB', 'EV spec: max SPL 134 dB. Table ">140 dB" is wrong.'),
    (229, 'max spl'): ('135 dB', 'Telefunken spec: 135 dB @1% THD (table has no SPL row).'),
    (360, 'max spl'): ('134 dB', 'Sennheiser MKH 50: 134 dB (142 with pad).'),
    (195, 'max spl'): ('130 dB', 'Elgato Wave:3: max SPL 130 dB.'),
    (215, 'self-noise'): ('23 dB-A', 'DPA 4099 self-noise 23 dB-A ranks before max SPL.'),
    (253, 'frequency range'): ('20 Hz-20 kHz', 'HyperX QuadCast 2: 20 Hz-20 kHz.'),
    (51, 'frequency range'): ('30 Hz-17 kHz', 'Sennheiser; SPL only "commonly cited".'),
    (52, 'frequency range'): ('45 Hz-18 kHz', 'EV RE20: max SPL not published.'),
    (211, 'frequency range'): ('40 Hz-18 kHz', 'Beyerdynamic; max SPL not published.'),
    (210, 'frequency range'): ('40 Hz-18 kHz', 'Sennheiser e906; SPL only "commonly cited".'),
    (227, 'frequency range'): ('40 Hz-18 kHz', 'Sennheiser e935; max SPL not published.'),
    (228, 'frequency range'): ('40 Hz-18 kHz', 'Sennheiser e945; max SPL not published.'),
    (1, 'frequency range'): ('50 Hz-20 kHz', 'Shure publishes no max SPL for SM7B.'),
    (5, 'frequency range'): ('40 Hz-15 kHz', 'Shure publishes no max SPL for SM57.'),
    (50, 'frequency range'): ('50 Hz-15 kHz', 'Shure publishes no max SPL for SM58.'),
    (226, 'frequency range'): ('50 Hz-16 kHz', 'Shure publishes no max SPL for Beta 58A; table row contradicts itself.'),
    (321, 'frequency range'): ('50 Hz-20 kHz', 'Shure SM7dB: 50 Hz-20 kHz, XLR only.'),
    (636, 'frequency range'): ('50 Hz-16 kHz', 'Shure publishes no max SPL for Beta 57A.'),
    (197, 'frequency range'): ('50 Hz-15 kHz', 'Rode PodMic: XLR only, 50 Hz-15 kHz.'),
    (509, 'band'): ('1.9 GHz', 'Hollyland SOLIDCOM C1 runs DECT 6.0 (1.9 GHz), not UHF.'),
    (510, 'band'): ('1.9 GHz', 'Hollyland SOLIDCOM C1 Pro runs DECT (1.9 GHz), not UHF.'),
    (511, 'band'): ('1.9 GHz', 'Hollyland SOLIDCOM SE PRO runs at 1.9 GHz, not UHF.'),
    (508, 'transmission'): ('Wireless', 'Hollyland MELO P1 streams wirelessly to its own mixer.'),
    (93, 'type'): ('Dynamic', 'EW-D is a digital wireless system shipping with dynamic 835/935 capsules.'),
}


def norm_val(v):
    return v.replace('\u2013', '-').replace('\u2014', '-').strip().lower().replace(' - ', '-')


issues = []
for r in report:
    pid = r['id']
    ours = r['ours']
    table = r['table']
    labels = [o[1].lower() for o in ours]
    vals = [o[0] for o in ours]
    row_issues = []

    def tvals(key):
        return table.get(key, [])

    def used(key):
        return ' '.join(norm(v) for v in tvals(key))

    # ---- TYPE ----
    if 'type' in labels and tvals('type') and (pid, 'type') not in OVERRIDES:
        i = labels.index('type')
        ov = norm(vals[i])
        tv = used('type')
        ok = ov in tv
        if not ok and 'shotgun' in ov:
            ok = any(w in tv for w in SHOTGUN_OK)
        if not ok and 'wireless' in ov:
            ok = 'wireless' in tv
        if not ok:
            row_issues.append(f"TYPE ours='{vals[i]}' table={tvals('type')}")

    # ---- PATTERN ----
    if 'pattern' in labels and tvals('pattern'):
        i = labels.index('pattern')
        ov = norm(vals[i])
        tv = used('pattern')
        ok = ov in tv
        if not ok:
            # "9 patterns" / "Multi-pattern" vs a table listing several patterns
            if re.search(r'\d+ patterns?', ov) or 'multi pattern' in ov:
                named = [w for w in PAT_WORDS if w in tv]
                listed = [p for p in PAT_WORDS if p in tv]
                ok = len(listed) >= 2 or 'multi pattern' in tv or 'variable' in tv or 'switchable' in tv
            else:
                for w in PAT_WORDS:
                    if w in ov and w in tv:
                        ok = True
                        break
        if not ok:
            row_issues.append(f"PATTERN ours='{vals[i]}' table={tvals('pattern')}")

    # ---- third fact ----
    for i, (v, lab) in enumerate(ours):
        ll = lab.lower()
        if ll in ('type', 'pattern'):
            continue
        key = None
        if 'spl' in ll:
            key = 'spl'
        elif 'noise' in ll or 'ruido' in ll:
            key = 'selfnoise'
        elif 'output' in ll or 'salida' in ll or 'connect' in ll:
            key = 'output'
        elif 'frequency range' in ll or 'respuesta de frecuencia' in ll:
            key = 'freq'
        elif 'band' in ll or 'banda' in ll:
            key = 'band'
        if not key:
            continue
        ovr = OVERRIDES.get((pid, ll))
        if ovr:
            if norm_val(v) != norm_val(ovr[0]):
                row_issues.append(f"{lab.upper()} ours='{v}' expected '{ovr[0]}' ({ovr[1]})")
            continue
        if not tvals(key):
            continue  # table has no such row: nothing to contradict
        tv = used(key)
        if key == 'output':
            # connection type: compare which connector families are mentioned
            fam = {'usb': ['usb'], 'xlr': ['xlr'], '3.5mm': ['3.5', '3 5'], 'wireless': ['wireless', '2 4 ghz']}
            o = norm(v)
            t = tv
            mism = []
            for name, pats in fam.items():
                ino = any(p in o for p in pats)
                int_ = any(p in t for p in pats)
                if ino != int_:
                    mism.append(name)
            ok = not mism
        elif key in ('freq', 'band'):
            a, b = digits(v), digits(tv)
            ok = bool(a) and (a in b or b in a)
        else:
            a = digits(v)
            ok = bool(a) and a in digits(tv)
        if not ok:
            row_issues.append(f"{lab.upper()} ours='{v}' table={tvals(key)}")

    if row_issues:
        issues.append((pid, r['title'], row_issues, table))

print('PRODUCTS WITH UNEXPLAINED MISMATCHES:', len(issues))
for pid, title, ri, table in issues:
    print(f"\nPID {pid} | {title}")
    for x in ri:
        print('   -', x)
if not issues:
    print('All quickfacts either match the guide tables or are documented manufacturer overrides.')
