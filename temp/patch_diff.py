"""Rewrite the OVERRIDES block in temp/qf_diff.py so each entry asserts its expected value."""
import io

p = 'temp/qf_diff.py'
s = open(p, encoding='utf-8').read()
start = s.index('OVERRIDES = {')
end = s.index('issues = []')

new = '''# (pid, label_lower) -> (expected_value, reason)
# A manufacturer spec beats a table value that is wrong or absent. The expected value is
# asserted, so a *wrong* quickfact is still reported even when the row is an override.
OVERRIDES = {
    (232, 'max spl'): ('134 dB', 'EV spec: max SPL 134 dB. Table ">140 dB" is wrong.'),
    (229, 'max spl'): ('135 dB', 'Telefunken spec: 135 dB @1% THD (table has no SPL row).'),
    (360, 'max spl'): ('134 dB', 'Sennheiser MKH 50: 134 dB (142 with pad).'),
    (195, 'max spl'): ('130 dB', 'Elgato Wave:3: max SPL 130 dB.'),
    (215, 'self-noise'): ('23 dB-A', 'DPA 4099 self-noise 23 dB-A ranks before max SPL.'),
    (253, 'frequency response'): ('20 Hz-20 kHz', 'HyperX QuadCast 2: 20 Hz-20 kHz.'),
    (51, 'frequency response'): ('30 Hz-17 kHz', 'Sennheiser; SPL only "commonly cited".'),
    (52, 'frequency response'): ('45 Hz-18 kHz', 'EV RE20: max SPL not published.'),
    (211, 'frequency response'): ('40 Hz-18 kHz', 'Beyerdynamic; max SPL not published.'),
    (210, 'frequency response'): ('40 Hz-18 kHz', 'Sennheiser e906; SPL only "commonly cited".'),
    (227, 'frequency response'): ('40 Hz-18 kHz', 'Sennheiser e935; max SPL not published.'),
    (228, 'frequency response'): ('40 Hz-18 kHz', 'Sennheiser e945; max SPL not published.'),
    (1, 'frequency response'): ('50 Hz-20 kHz', 'Shure publishes no max SPL for SM7B.'),
    (5, 'frequency response'): ('40 Hz-15 kHz', 'Shure publishes no max SPL for SM57.'),
    (50, 'frequency response'): ('50 Hz-15 kHz', 'Shure publishes no max SPL for SM58.'),
    (226, 'frequency response'): ('50 Hz-16 kHz', 'Shure publishes no max SPL for Beta 58A; table row contradicts itself.'),
    (321, 'frequency response'): ('50 Hz-20 kHz', 'Shure SM7dB: 50 Hz-20 kHz, XLR only.'),
    (636, 'frequency response'): ('50 Hz-16 kHz', 'Shure publishes no max SPL for Beta 57A.'),
    (197, 'frequency response'): ('50 Hz-15 kHz', 'Rode PodMic: XLR only, 50 Hz-15 kHz.'),
    (509, 'band'): ('1.9 GHz', 'Hollyland SOLIDCOM C1 runs DECT 6.0 (1.9 GHz), not UHF.'),
    (510, 'band'): ('1.9 GHz', 'Hollyland SOLIDCOM C1 Pro runs DECT (1.9 GHz), not UHF.'),
    (511, 'band'): ('1.9 GHz', 'Hollyland SOLIDCOM SE PRO runs at 1.9 GHz, not UHF.'),
    (508, 'transmission'): ('Wireless', 'Hollyland MELO P1 streams wirelessly to its own mixer.'),
    (93, 'type'): ('Dynamic', 'EW-D is a digital wireless system shipping with dynamic 835/935 capsules.'),
}


def norm_val(v):
    return v.replace('\\u2013', '-').replace('\\u2014', '-').strip().lower().replace(' - ', '-')


'''
s = s[:start] + new + s[end:]

s = s.replace(
    "    if 'type' in labels and tvals('type'):",
    "    ovr_t = OVERRIDES.get((pid, 'type'))\n"
    "    if ovr_t:\n"
    "        got = vals[labels.index('type')] if 'type' in labels else ''\n"
    "        if norm_val(got) != norm_val(ovr_t[0]):\n"
    "            row_issues.append(f\"TYPE ours='{got}' expected '{ovr_t[0]}' ({ovr_t[1]})\")\n"
    "    elif 'type' in labels and tvals('type'):"
)

s = s.replace(
    "        if (pid, ll) in OVERRIDES:\n            continue",
    "        ovr = OVERRIDES.get((pid, ll))\n"
    "        if ovr:\n"
    "            if norm_val(v) != norm_val(ovr[0]):\n"
    "                row_issues.append(f\"{lab.upper()} ours='{v}' expected '{ovr[0]}' ({ovr[1]})\")\n"
    "            continue"
)

open(p, 'w', encoding='utf-8').write(s)
print('patched')
