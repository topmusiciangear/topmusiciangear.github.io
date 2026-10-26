# -*- coding: utf-8 -*-
"""Quickfacts for the mixers category (23 products).

Four kinds of mixer share the category, and each one carries different rows in the
table it was taken from:

  Analog mixers (3: ProFX12v3, Signature 12 MTK, MG16XU)
      Channels / Preamps / Connectivity
      Type is "Analog mixer" for all of them, so it would say nothing. Channel
      count, which preamps and how the thing talks to a computer is what separates
      an analog desk from the next one.

  Tabletop / rack digitals (8: XR18, CQ-18T, M32R LIVE, Ui24R, DM3S, 32SC,
  WING Compact, Ui16)
      Channels / Preamps / Connectivity
      Same trio, and it travels well because those guides all carry those rows.

  32-channel consoles (5: X32, M32 LIVE, SE 32R, DL32SE, 32S)
      Channels / Mix Buses / Multitrack
      At this size the interesting questions are how many channels it can actually
      run, how many mixes you can feed to the band, and how many tracks you can
      record. Network Protocol was the obvious third candidate until Mackie DL32SE
      turned out to be "None" in that row, which is a useless card.

  Compact rack / stagebox (6: X32 Rack, WING Rack, M32C, CQ-20B, SQ-Rack, SE 24R)
      Type / USB Recording / Mix Buses
      Local Preamps would print "0 (stagebox)" for the M32C, so form factor and
      recording instead.

Behringer Xenyx X1222USB (150) is in no comparison table at all. Its three facts
come from its own catalog description (16-input 2/2-bus, 6 XENYX preamps, USB
interface) and the audit requires every figure in them to appear there.

Run:  python temp/apply_qf_mixers.py
"""
import json

P_PATH = 'data/products.json'

CH = ('Channels', 'Canales', 'sliders')
PRE = ('Preamps', 'Preamps', 'microphone')
CON = ('Connectivity', 'Conectividad', 'signal')
BUS = ('Mix Buses', 'Buses de mezcla', 'layers')
MTK = ('Multitrack', 'Multipista', 'wave')
TYP = ('Type', 'Tipo', 'chip')
USB = ('USB Recording', 'Grabación USB', 'wave')

# id -> (guide, column, [three values], [three label tuples], bestFor en/es)
DATA = {
    # --- analog mixers -------------------------------------------------------
    146: ('best-analog-mixers', 2, ['12 (7 mic)', '7 Onyx', 'USB 2x4 24-bit/192kHz'],
          [CH, PRE, CON],
          ('Affordable analog with FX for gigs',
           'Analógico asequible con efectos para directos')),
    487: ('best-analog-mixers', 4, ['12 (8 mic)', '8 Ghost', 'USB 14-in/12-out'],
          [CH, PRE, CON],
          ('Live + multitrack USB recording', 'Directos y grabación multipista por USB')),
    149: ('best-live-sound-mixers', 4, ['16 line, 10 mic', '10x D-PRE', 'USB, 4 groups'],
          [CH, PRE, CON],
          ('Analog mixer for more channels', 'Mezclador analógico con más canales')),

    # --- tabletop / rack digitals --------------------------------------------
    145: ('best-digital-mixers', 0, ['18 (16 preamps)', '16 MIDAS', 'Wi-Fi, USB, 6 aux'],
          [CH, PRE, CON],
          ('Full digital rack mixer you control with a tablet',
           'Mezclador digital de rack que controlas con una tableta')),
    147: ('best-digital-mixers', 4, ['18 (16 preamps)', '16 A&H', 'USB, Wi-Fi, app control'],
          [CH, PRE, CON],
          ('Easy-to-use digital mixer for new bands',
           'Mezclador digital sencillo para bandas que empiezan')),
    148: ('best-digital-mixers', 5, ['40 (16 local XLR)', '16 MIDAS PRO',
                                     'AES50, USB, 16 out'],
          [CH, PRE, CON],
          ('Powerful touring-grade digital mixer',
           'Mezclador digital potente de nivel gira')),
    410: ('best-digital-mixers', 6, ['24 (20 preamps)', '20 Studer',
                                     'Wi-Fi, Ethernet, USB multitrack'],
          [CH, PRE, CON],
          ('Tablet-controlled rack mixer for bands',
           'Mezclador de rack controlado por tableta para bandas')),
    411: ('best-digital-mixers', 9, ['22 (16 preamps)', '16 D-PRE',
                                     'USB 18x18, network'],
          [CH, PRE, CON],
          ('Compact Yamaha console with touchscreen',
           'Consola Yamaha compacta con pantalla táctil')),
    413: ('best-digital-mixers', 7, ['32 (16 preamps)', '16 XMAX-R',
                                     'USB 64x64, AVB, SD'],
          [CH, PRE, CON],
          ('32 channels with motorized faders', '32 canales con faders motorizados')),
    482: ('best-digital-mixers', 10, ['48 (24 preamps)', '24 Midas PRO',
                                      'USB 48x48, AES50, SD'],
          [CH, PRE, CON],
          ('48-channel flagship in compact size',
           'Buque insignia de 48 canales en formato compacto')),
    486: ('best-digital-mixers', 8, ['16 (12 preamps)', '12 Soundcraft',
                                     'Wi-Fi, Ethernet, USB 2-track'],
          [CH, PRE, CON],
          ('Cheapest tablet mixer for small gigs',
           'El mezclador de tableta más barato para bolos pequeños')),

    # --- 32-channel consoles -------------------------------------------------
    402: ('best-32-channel-digital-mixers', 0,
          ['32 channels (up to 40)', '16 aux + LR', 'USB 32-track'],
          [CH, BUS, MTK],
          ('Best overall value & church/house bands',
           'La mejor relación calidad-precio para iglesias y bandas residentes')),
    403: ('best-32-channel-digital-mixers', 1,
          ['32 channels (up to 40)', '16 aux + LR', 'Dual SD 32-track'],
          [CH, BUS, MTK],
          ('Premium sound for touring FOH', 'Sonido premium para FOH de gira')),
    406: ('best-32-channel-digital-mixers', 5,
          ['32 channels (up to 40)', '16 FlexMix + LR', 'USB 64x64 + SD'],
          [CH, BUS, MTK],
          ('Budget 32-channel studios', 'Estudios con 32 canales y presupuesto ajustado')),
    408: ('best-32-channel-digital-mixers', 7,
          ['32 channels (16 XLR + 16 Combo)', '15 mix buses', 'USB 32-track'],
          [CH, BUS, MTK],
          ('Wireless rack-mount mixing', 'Mezcla inalámbrica de rack')),
    412: ('best-32-channel-digital-mixers', 6,
          ['32 channels (up to 40)', '26 mix buses', 'USB 64x64 + SD'],
          [CH, BUS, MTK],
          ('Hands-on mixing for live bands', 'Mezcla manual para bandas en directo')),

    # --- compact rack / stagebox --------------------------------------------
    559: ('best-compact-mixers', 0, ['3U rack digital', '32x32 USB', '16 mix + 6 matrix'],
          [TYP, USB, BUS],
          ('Multi-musician IEM rigs', 'Rigs de IEM para varios músicos')),
    558: ('best-compact-mixers', 2, ['4U rack digital', '48x48 + SD', '24 mix + 8 matrix'],
          [TYP, USB, BUS],
          ('48-channel flagship power', 'La potencia del buque insignia de 48 canales')),
    563: ('best-compact-mixers', 3, ['4U rack digital', '32x32 USB', '12 mix + 8 matrix'],
          [TYP, USB, BUS],
          ('96kHz pro engineering', 'Ingeniería profesional a 96 kHz')),
    560: ('best-compact-mixers', 5, ['1U rack digital', '32x32 USB', '16 mix + 6 matrix'],
          [TYP, USB, BUS],
          ('1U touring fly-rigs', 'Rigs de gira de 1U')),
    561: ('best-compact-mixers', 6, ['Stagebox mixer', '24x24 + SD', '12 mix + 4 subgroups'],
          [TYP, USB, BUS],
          ('Fast automated mixing', 'Mezcla automática rápida')),
    564: ('best-compact-mixers', 7, ['2U rack digital', '64x64 + SD', '16 FlexMixes + 4 FX'],
          [TYP, USB, BUS],
          ('Studio One studios', 'Estudios que trabajan con Studio One')),

    # --- no comparison table: facts from the product description -------------
    150: (None, None, ['16-input, 2-bus', '6 XENYX', 'USB interface'],
          [CH, PRE, CON],
          ('Analog mixer with USB and FX', 'Mezclador analógico con USB y efectos')),
}


def main():
    prods = json.load(open(P_PATH, encoding='utf-8'))
    by_id = {p['id']: p for p in prods}

    ids = [p['id'] for p in prods if p.get('category') == 'mixers']
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
        print('  %4d %-40s %s' % (pid, p['title'][:40],
                                  ' | '.join('%s=%s' % (f['label']['en'], f['value'])
                                             for f in p['facts'])))


main()
