# -*- coding: utf-8 -*-
"""Quickfacts for the streaming category (13 products).

Two groups plus two products with no comparison table:

  stream controllers (10, stream-controllers)
      Type / Controls / Connectivity
      The "Keys / Controls" row is what actually separates these boxes: eight
      LCD keys with a touch strip is a different job from nine 100 mm faders.
      Video Capture was rejected as a fact: seven of the eleven columns say
      "No"/"None", so the card would read "Video Capture: No" on most products.

  streaming interfaces (1, streaming-interfaces)
      664 Zoom PodTrak P4next: Type / Mic Inputs / Loopback, the same scheme the
      three streaming interfaces in the `interfaces` category use, so the same
      product reads identically wherever it is shown.

  no comparison table
      264 Elgato Stream Deck + XL and 265 Razer Stream Controller are not columns
      in stream-controllers (a fuzzy title match wrongly pinned the XL to the
      Stream Deck+ column, which has 8 keys against the XL's 36). Their facts
      come from their own descriptions and every figure in them must appear
      there.

Run:  python temp/apply_qf_streaming.py
"""
import json

P_PATH = 'data/products.json'

TYP = ('Type', 'Tipo', 'chip')
CTL = ('Controls', 'Controles', 'sliders')
CON = ('Connectivity', 'Conectividad', 'signal')
MIC = ('Mic Inputs', 'Entradas de micro', 'microphone')
LPB = ('Loopback', 'Loopback', 'signal')

# id -> (guide, column, [three values], [three label tuples], bestFor en/es)
DATA = {
    # --- stream controllers ---------------------------------------------------
    243: ('stream-controllers', 0,
          ['Controller with LCD keys & dials', '8 LCD keys + 4 dials + touch strip',
           'USB-C (USB 2.0)'],
          [TYP, CTL, CON],
          ('Hands-on stream control and automation',
           'Control y automatización del directo a mano')),

    244: ('stream-controllers', 1,
          ['Interface + capture + control surface', '4 customizable SMART pads',
           'Dual USB-C, HDMI, XLR combo'],
          [TYP, CTL, CON],
          ('Budget streaming with 4K capture',
           'Streaming económico con captura 4K')),

    246: ('stream-controllers', 2,
          ['Compact XLR mic interface', '1 multifunction dial + tap-to-mute',
           'USB-C host, XLR in, 3.5mm out'],
          [TYP, CTL, CON],
          ('Broadcast-grade XLR mic audio', 'Audio de micro XLR de emisión')),

    659: ('stream-controllers', 3,
          ['4-channel USB streaming mixer', '4 faders + cough/censor buttons',
           'USB (Windows only)'],
          [TYP, CTL, CON],
          ('Stream mixing with real faders + voice FX',
           'Mezcla en directo con faders reales y FX de voz')),

    661: ('stream-controllers', 4,
          ['Streaming + video capture interface', '6 programmable keys + Matrix pads',
           'Single USB-C, HDMI in, USB-C hub'],
          [TYP, CTL, CON],
          ('Video + audio streaming in one box',
           'Vídeo y audio en directo en una sola caja')),

    248: ('stream-controllers', 5,
          ['Production console + interface', '6 faders + 8 SMART pads + touchscreen',
           'Dual USB-C, BT, WiFi, microSD'],
          [TYP, CTL, CON],
          ('All-in-one broadcast console', 'Consola de emisión todo en uno')),

    247: ('stream-controllers', 7,
          ['Adaptive digital mixer + interface',
           'Nine 100mm faders + 10.1in touchscreen', 'USB-C, SD, USB drive'],
          [TYP, CTL, CON],
          ('Adaptive podcast/stream console', 'Consola de podcast y directo adaptable')),

    662: ('stream-controllers', 8,
          ['8-channel livestreaming mixer', '60 mm faders + 6 sound pads',
           'USB 8in/14out, smartphone, AUX'],
          [TYP, CTL, CON],
          ('Analog-style multi-source streaming',
           'Streaming de varias fuentes estilo analógico')),

    663: ('stream-controllers', 9,
          ['Podcast console + recorder', 'Faders + 8 lit sound pads',
           'USB, Bluetooth, TRRS call, SD'],
          [TYP, CTL, CON],
          ('4-person podcast without a computer',
           'Podcast de cuatro personas sin ordenador')),

    671: ('stream-controllers', 10,
          ['8-input digital mixer', '6 \u00d7 60mm channel faders',
           'Bluetooth app control + 10\u00d72 USB'],
          [TYP, CTL, CON],
          ('Full-featured digital mixing on a tight budget',
           'Mezcla digital completa con presupuesto ajustado')),

    # --- streaming interface ---------------------------------------------------
    664: ('streaming-interfaces', 4,
          ['Bus-powered USB-C interface', '4 XLR (70dB) + TRRS phone in', 'Built-in'],
          [TYP, MIC, LPB],
          ('Mobile streaming and compact setups',
           'Streaming móvil y montajes compactos')),

    # --- no comparison table: facts from the product description ---------------
    264: (None, None,
          ['Controller with LCD keys & dials', '36 LCD keys + dials + touch strip',
           'USB-C'],
          [TYP, CTL, CON],
          ('Biggest Stream Deck with dials', 'El Stream Deck más grande con diales')),

    265: (None, None,
          ['All-in-one keypad with LCD keys', '12 haptic keys + dials', 'USB-C'],
          [TYP, CTL, CON],
          ('Loupedeck-style control for OBS', 'Control tipo Loupedeck para OBS')),
}


def main():
    prods = json.load(open(P_PATH, encoding='utf-8'))
    by_id = {p['id']: p for p in prods}

    ids = [p['id'] for p in prods if p.get('category') == 'streaming']
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
        print('  %4d %-36s %s' % (pid, p['title'][:36],
                                  ' | '.join('%s=%s' % (f['label']['en'], f['value'])
                                             for f in p['facts'])))


main()
