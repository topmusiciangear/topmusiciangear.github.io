# -*- coding: utf-8 -*-
"""Quickfacts for the interfaces category (23 products).

The category holds three kinds of box, so the facts follow whichever table the
product actually lives in:

  Standard interfaces (13: Scarlett, Apollo Twin, Babyface, SSL 2+, iD14, MOTU M2,
  Volt 2/276, EVO 4, UMC1820, MiniFuse 2 / 2 OTG, AXE I/O)
      Inputs / Outputs / Preamps / Connectivity
      Type is "Audio interface" for every single one of them, so it would waste a
      card. I/O count says how much you can plug in, preamp count and gain says
      what the mics will sound like, connectivity says whether your computer can
      take it.

  Premium interfaces (6: MT 48, ORIA, Apollo x8p, UFX III, Horizon 8P, Orion Studio)
      Conversion / Preamps / Connectivity
      Above a certain price the conversion specs are the story (dynamic range,
      clocking) and those tables carry a Conversion / Clock row instead of an I/O
      count.

  Streaming consoles (3: Rodecaster Duo, Bridge Cast X, URX44V)
      Type / Mic Inputs / Loopback
      These are bought for a broadcast workflow, so the type (console, mixer with
      HDMI capture, interface with capture) and the loopback path matter more than
      a preamp gain figure.

MOTU M2 (54) already carried a hand-made set from an early batch (icon arrowLeft on
the channel count, tone "tradeoff"). It is rewritten here to match the rest: the
arrow icon means nothing next to "2-in / 2-out" and the tone flag is decorative
only.

Apollo x16 Gen 2 (182) is in no comparison table, so its three facts come from its
own product description (16x20 I/O, 167 dB dynamic range, Thunderbolt 3).

Run:  python temp/apply_qf_interfaces.py
"""
import json

P_PATH = 'data/products.json'

IO = ('Inputs / Outputs', 'Entradas / Salidas', 'layers')
PRE = ('Preamps', 'Preamps', 'microphone')
CON = ('Connectivity', 'Conectividad', 'signal')
CVR = ('Conversion', 'Conversión', 'gauge')
TYP = ('Type', 'Tipo', 'chip')
MIC = ('Mic Inputs', 'Entradas de micro', 'microphone')
LPB = ('Loopback', 'Loopback', 'signal')

# id -> (guide, column, [three values], [three label tuples], bestFor en/es)
DATA = {
    # --- standard interfaces -------------------------------------------------
    15: ('best-interface', 0, ['2-in / 2-out', '2, +69 dB gain', 'USB-C'],
         [IO, PRE, CON],
         ('Best all-around entry interface', 'La mejor entrada al mundo de las interfaces')),
    16: ('best-interface', 2, ['10-in / 6-out', '2 Unison', 'Thunderbolt 3'],
         [IO, PRE, CON],
         ('Pro UAD plugin tracking', 'Grabación profesional con plugins UAD')),
    17: ('best-interface', 3, ['4-in / 4-out (12 total)', '2, +65 dB', 'USB 2.0'],
         [IO, PRE, CON],
         ('Pro mobile recording', 'Grabación móvil profesional')),
    18: ('best-interface', 1, ['2-in / 4-out', '2, 64 dB gain', 'USB-C'],
         [IO, PRE, CON],
         ('High-headroom recording and MIDI', 'Grabación con mucho headroom y MIDI')),
    53: ('best-interface', 4, ['2-in / 4-out (+ ADAT)', '2, 58 dB gain', 'USB-C'],
         [IO, PRE, CON],
         ('Warm console preamps at home', 'Preamps cálidos de consola en casa')),
    54: ('best-interface', 5, ['2-in / 2-out', '2, 60 dB gain', 'USB-C (USB 2.0)'],
         [IO, PRE, CON],
         ('Clear metering for beginners', 'Medición clara para empezar')),
    55: ('best-interface', 6, ['2-in / 2-out', '2, 55 dB gain', 'USB-C'],
         [IO, PRE, CON],
         ('Vintage tone at home', 'Sonido vintage para casa')),
    263: ('best-interface', 7, ['2-in / 2-out', '2, 55 dB gain', 'USB-C'],
          [IO, PRE, CON],
          ('Compression on the way in', 'Compresión al grabar')),
    679: ('best-interface', 8, ['2-in / 5-out', '2 Hi-Z + 2 mic pres', 'USB 2.0'],
          [IO, PRE, CON],
          ('Guitar and bass recording', 'Grabación de guitarra y bajo')),
    262: ('budget-interfaces', 5, ['2-in / 2-out', '2 EVO, 58 dB gain', 'USB-C'],
          [IO, PRE, CON],
          ('Simple smart-gain recording', 'Grabación sencilla con smart gain')),
    550: ('budget-interfaces', 6, ['18-in / 20-out (+ ADAT)', '8, MIDAS-designed',
                                   'USB 2.0 (Type-B)'],
          [IO, PRE, CON],
          ('18-in/20-out on a budget', '18 entradas y 20 salidas sin gastar')),
    551: ('budget-interfaces', 8, ['2-in / 2-out', '2', 'USB-C plus USB-A hub'],
          [IO, PRE, CON],
          ('Compact USB-C starter', 'USB-C compacta para empezar')),
    328: ('portable-interfaces', 2, ['2-in / 2-out', '2, +56 dB',
                                     'USB-C + OTG USB-C + USB-A hub'],
          [IO, PRE, CON],
          ('Phone and tablet recording', 'Grabación con móvil y tableta')),

    # --- premium interfaces --------------------------------------------------
    512: ('premium-interfaces', 0, ['A/D 136 dBA', '2× Neumann, 78 dB',
                                    'USB-C + AES67/RAVENNA'],
          [CVR, PRE, CON],
          ('Reference conversion, 2 pres', 'Conversión de referencia con 2 pres')),
    515: ('premium-interfaces', 1, ['D/A 126.5 dB', '2× Console', 'USB-C + ADAT/AES'],
          [CVR, PRE, CON],
          ('Immersive monitoring control', 'Control de monitorización inmersiva')),
    513: ('premium-interfaces', 2, ['D/A 130 dB', '8× Unison', 'Thunderbolt/USB-C'],
          [CVR, PRE, CON],
          ('8 Unison pres and DSP', '8 pres Unison y DSP')),
    183: ('premium-interfaces', 3, ['D/A 135 dB', 'Transparent', 'USB 3.0 + MADI'],
          [CVR, PRE, CON],
          ('Pro studio, 188 channels', 'Estudio profesional, 188 canales')),
    676: ('premium-interfaces', 4, ['32-bit/192kHz ESS', '8x console, 75dB',
                                    'Thunderbolt 3'],
          [CVR, PRE, CON],
          ('Console sound, 8 pres', 'Sonido de consola con 8 pres')),
    677: ('premium-interfaces', 5, ['130 dB, AFC clock', '12x discrete, 75dB',
                                    'Thunderbolt 3 + USB'],
          [CVR, PRE, CON],
          ('12 pres with Thunderbolt', '12 pres con Thunderbolt')),

    # --- streaming consoles --------------------------------------------------
    239: ('streaming-interfaces', 0, ['All-in-one production console',
                                      '2 Revolution preamps', 'Yes — hardware buses'],
          [TYP, MIC, LPB],
          ('Podcasting and streaming', 'Pódcast y streaming')),
    240: ('streaming-interfaces', 1, ['Streaming mixer + HDMI capture',
                                      '1 XLR with phantom', 'Yes — hardware dual-bus'],
          [TYP, MIC, LPB],
          ('Console streaming with HDMI', 'Streaming de consola con HDMI')),
    678: ('streaming-interfaces', 6, ['USB-C interface with HDMI capture',
                                      '4 URX pres, 78dB', 'Yes — Multi-Stream ×3'],
          [TYP, MIC, LPB],
          ('Streaming with HDMI capture', 'Streaming con captura HDMI')),

    # --- no comparison table: facts from the product description -------------
    182: (None, None, ['16 in / 20 out', '167 dB dynamic range', 'Thunderbolt 3'],
          [IO, CVR, CON],
          ('Studio centerpiece, 16x20', 'Centro del estudio, 16x20')),
}

LABEL_OVERRIDE = {182: ['Inputs / Outputs', 'Conversion', 'Connectivity']}


def main():
    prods = json.load(open(P_PATH, encoding='utf-8'))
    by_id = {p['id']: p for p in prods}

    ids = [p['id'] for p in prods if p.get('category') == 'interfaces']
    missing = [i for i in ids if i not in DATA]
    extra = [i for i in DATA if i not in ids]
    if missing or extra:
        raise SystemExit('uncovered: %s / unknown: %s' % (missing, extra))

    for pid, (_gid, _col, vals, label3, best) in DATA.items():
        p = by_id[pid]
        p['bestFor'] = {'en': best[0], 'es': best[1]}
        p['facts'] = [{'icon': icon, 'value': v,
                       'label': {'en': le, 'es': ls}, 'tone': 'good'}
                      for v, (le, ls, icon) in zip(vals, label3)]

    open(P_PATH, 'w', encoding='utf-8', newline='').write(
        json.dumps(prods, ensure_ascii=False, indent=2) + '\n')

    print('quickfacts set:', len(DATA))
    for pid in sorted(DATA):
        p = by_id[pid]
        print('  %4d %-42s %s' % (pid, p['title'][:42],
                                  ' | '.join('%s=%s' % (f['label']['en'], f['value'])
                                             for f in p['facts'])))


main()
