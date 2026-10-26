import json, io, sys

PATH = 'data/products.json'
raw = open(PATH, encoding='utf-8').read()
data = json.loads(raw)
byid = {p['id']: p for p in data}

FRQ = ('Frequency response', 'Respuesta de frecuencia', 'wave')
SPL = ('Max SPL', 'SPL m\u00e1x.', 'volumeHigh')
SN = ('Self-noise', 'Ruido propio', 'volumeHigh')
BAND = ('Band', 'Banda', 'volumeHigh')
TRANS = ('Transmission', 'Transmisi\u00f3n', 'volumeHigh')

def third(pid, value, lab):
    p = byid[pid]
    f = p['facts'][2]
    f['value'] = value
    f['label'] = {'en': lab[0], 'es': lab[1]}
    f['icon'] = lab[2]

# --- third fact: frequency range (no published self-noise / max SPL) ---
for pid, val in [
    (1, '50 Hz\u201320 kHz'),      # Shure SM7B (shure.com; max SPL not published)
    (5, '40 Hz\u201315 kHz'),      # Shure SM57 (shure.com)
    (50, '50 Hz\u201315 kHz'),     # Shure SM58 (shure.com)
    (51, '30 Hz\u201317 kHz'),     # MD 421 Kompakt (not officially rated SPL)
    (52, '45 Hz\u201318 kHz'),     # EV RE20 (SPL not published)
    (197, '50 Hz\u201315 kHz'),    # Rode PodMic
    (210, '40 Hz\u201318 kHz'),    # Sennheiser e906 (SPL only "commonly cited")
    (211, '40 Hz\u201318 kHz'),    # Beyerdynamic M 201 TG (SPL not published)
    (226, '50 Hz\u201316 kHz'),    # Shure Beta 58A (shure.com)
    (227, '40 Hz\u201318 kHz'),    # Sennheiser e935 (SPL not published)
    (228, '40 Hz\u201318 kHz'),    # Sennheiser e945 (SPL not published)
    (253, '20 Hz\u201320 kHz'),    # HyperX QuadCast 2 (hyperx.com)
    (279, '50 Hz\u201316 kHz'),
    (280, '20 Hz\u201320 kHz'),
    (284, '20 Hz\u201320 kHz'),
    (287, '100 Hz\u201316 kHz'),
    (289, '60 Hz\u201318 kHz'),
    (292, '20 Hz\u201320 kHz'),
    (321, '50 Hz\u201320 kHz'),    # Shure SM7dB (shure.com)
    (330, '50 Hz\u201315 kHz'),
    (429, '20 Hz\u201320 kHz'),
    (430, '20 Hz\u201320 kHz'),
    (431, '40 Hz\u201319 kHz'),
    (432, '50 Hz\u201315 kHz'),
    (435, '50 Hz\u201318 kHz'),
    (437, '50 Hz\u201316 kHz'),
    (636, '50 Hz\u201316 kHz'),    # Shure Beta 57A (shure.com)
]:
    third(pid, val, FRQ)

# --- third fact: max SPL ---
for pid, val in [
    (195, '130 dB'),   # Elgato Wave:3 (elgato.com)
    (229, '135 dB'),   # Telefunken M80: 135 dB @1% THD (telefunken-elektroakustik.com)
    (232, '134 dB'),   # EV ND86: 134 dB (electrovoice.com)
    (276, '148 dB'),
    (277, '130 dB'),
    (278, '130 dB'),
    (339, '130 dB'),
    (340, '130 dB'),
    (341, '130 dB'),
    (342, '132 dB'),
    (343, '129 dB'),
    (344, '130 dB'),
    (345, '120 dB'),
    (346, '132 dB'),
    (358, '126 dB'),
    (359, '120 dB'),
    (360, '134 dB'),   # Sennheiser MKH 50: 134 dB (142 with pad)
    (364, '125 dB'),   # Beyerdynamic M 160
    (433, '140 dB'),
    (436, '127 dB'),
    (438, '136 dB'),
    (635, '140 dB'),
    (656, '140 dB'),
]:
    third(pid, val, SPL)

# --- third fact: self-noise ---
for pid, val in [
    (215, '23 dB-A'),  # DPA 4099 CORE (Loud SPL)
    (655, '15 dB-A'),
    (657, '8 dB-A'),   # sE2200 (seelectronics.com: equiv. noise 8 dB)
    (672, '19 dB-A'),
    (673, '18 dB-A'),
    (674, '12 dB-A'),
    (675, '23 dB-A'),
]:
    third(pid, val, SN)

# --- band / transmission ---
for pid in (509, 510, 511):
    third(pid, '1.9 GHz', BAND)   # DECT 6.0 / 1.9 GHz, not UHF
third(508, 'Wireless', TRANS)     # MELO P1 streams to its own mixer

# --- label-only normalisation ---
byid[196]['facts'][2]['value'] = '20 dB-A'   # AT2020

# --- type / pattern fixes ---
def fact(pid, idx, value=None, label=None, icon=None):
    f = byid[pid]['facts'][idx]
    if value is not None:
        f['value'] = value
    if label is not None:
        f['label'] = {'en': label[0], 'es': label[1]}
    if icon is not None:
        f['icon'] = icon

fact(364, 1, value='Hypercardioid')                 # M 160 is hypercardioid (beyerdynamic.com)
fact(675, 0, value='Ribbon')                        # X1 R is a ribbon mic
fact(675, 1, value='Figure-8')
fact(508, 0, value='Condenser')                     # MELO P1 = 1-inch large-diaphragm condenser

# --- AKG P120: replace Pad/Bass-cut/SPL trio with standard Type/Pattern/SPL ---
byid[434]['facts'] = [
    {'icon': 'microphone', 'value': 'Condenser', 'label': {'en': 'Type', 'es': 'Tipo'}},
    {'icon': 'wave', 'value': 'Cardioid', 'label': {'en': 'Pattern', 'es': 'Patr\u00f3n'}},
    {'icon': 'volumeHigh', 'value': '130 dB', 'label': {'en': 'Max SPL', 'es': 'SPL m\u00e1x.'}},
]

# sanity: every mic product must have bestFor + exactly 3 facts
bad = []
for p in data:
    if p.get('category') != 'microphones':
        continue
    if not p.get('bestFor') or not p.get('facts') or len(p['facts']) != 3:
        bad.append((p['id'], p['title']))
if bad:
    print('PROBLEM', bad)
    sys.exit(1)

open(PATH, 'w', encoding='utf-8', newline='').write(
    json.dumps(data, ensure_ascii=False, indent=2) + '\n'
)
print('written', len(data))
