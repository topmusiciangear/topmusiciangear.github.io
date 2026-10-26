# -*- coding: utf-8 -*-
"""Quickfacts for the monitors category (43 products).

Two sub-schemes, because a subwoofer is not a monitor:

  Studio monitors  ->  Woofer / Power / Frequency response
  Subwoofers       ->  Woofer / Power / Max SPL
                       (falls back to Frequency response when the maker does
                       not publish SPL, e.g. the Yamaha HS8S)

Values come from the product tables in data/guides.json
(temp/specs_monitors.json). Long cells are shortened by DROPPING WORDS ONLY, so
the audit can check each value as a token subset of the cell it came from:

    "145W RMS (97W LF + 48W HF)"  ->  "145W RMS (97W + 48W)"
    "400W Class-D (1000W peak)"   ->  "400W Class-D"

Eleven products only appear in comparison guides that have no product table
(Genelec 8040B, ADAM S3H, Focal Trio11 Be, ATC SCM25A Mk2, Neumann KH 750 DSP,
Genelec 7050C, Neumann KH 810 II, ATC SCS120 Pro, Focal Sub12, Genelec 7370A,
Barefoot MicroSub45) plus the Focal Alpha 65 Evo. Their figures were read from
the manufacturer's own product page (genelec.com, neumann.com, adam-audio.com,
focal.com, atc.audio, barefootsound.com) and are marked MANUAL in the audit.
"""
import json

P_PATH = 'data/products.json'

MAXLEN = 28

I_WOOF, I_POWER, I_FREQ, I_SPL = 'speaker', 'gauge', 'freq', 'volumeHigh'

L_WOOF = {'en': 'Woofer', 'es': 'Woofer'}
L_POWER = {'en': 'Power', 'es': 'Potencia'}
L_FREQ = {'en': 'Frequency response', 'es': 'Respuesta de frecuencia'}
L_SPL = {'en': 'Max SPL', 'es': 'SPL máximo'}


def F(icon, value, label):
    return {'icon': icon, 'value': value, 'label': label, 'tone': 'good'}


def MON(driver, power, freq):
    """Studio monitor: Woofer / Power / Frequency response."""
    return [(I_WOOF, driver, L_WOOF),
            (I_POWER, power, L_POWER),
            (I_FREQ, freq, L_FREQ)]


def SUB(driver, power, spl):
    """Subwoofer: Woofer / Power / Max SPL."""
    return [(I_WOOF, driver, L_WOOF),
            (I_POWER, power, L_POWER),
            (I_SPL, spl, L_SPL)]


# pid: (bestFor en, bestFor es, [fact triples])
PLAN = {
    # ------------------------------------------------------------------- monitors
    19: ('Flat reference mixing', 'Mezcla plana de referencia', MON(
        '8"', '120W (75W + 45W)', '38 Hz – 30 kHz (-10 dB)')),
    20: ('Punchy rock & hip-hop', 'Rock y hip-hop con pegada', MON(
        '7" Kevlar', '145W RMS (97W + 48W)', '45 Hz – 36 kHz (±3 dB)')),
    21: ('Detailed nearfield mixing', 'Nearfield con detalle', MON(
        '7" MLM', '130W peak', '44 Hz – 41 kHz')),
    22: ('Small-room reference mixing', 'Referencia en salas pequeñas', MON(
        '6.5" / 165 mm', '90W bass + 90W treble', '48 Hz – 20 kHz (±2 dB)')),
    116: ('Compact nearfield mixing', 'Nearfield compacto', MON(
        '5"', '82W (41W + 41W)', '49 Hz – 20 kHz (±3 dB)')),
    117: ('Accurate on a budget', 'Preciso y económico', MON(
        '6.5"', '80W (40W + 40W)', '47 Hz – 21 kHz (±3 dB)')),
    180: ('Midfield detail and depth', 'Detalle y profundidad', MON(
        '2x 7" woofers', '1,350W total', '30 Hz – 50 kHz (-20 dB)')),
    181: ('Full-range mastering', 'Masterización completa', MON(
        '11" sub + 5" mid', '300W + 150W + 100W', '30 Hz – 40 kHz (±3 dB)')),
    199: ('Project-studio detail', 'Detalle en home studio', MON(
        '8"', '140W (60W + 40W + 40W)', '45 Hz – 21 kHz (±3 dB)')),
    222: ('Midfield truth for mixing', 'Referencia para mezclar', MON(
        '6.5" / 164 mm', '242W total', '47 Hz – 25 kHz')),
    302: ('Untreated desks', 'Escritorios sin tratar', MON(
        '3"', '50W RMS per speaker', '42 Hz – 22 kHz (-10 dB)')),
    303: ('Ultra-compact reference', 'Referencia ultracompacta', MON(
        '3"', '50W (25W + 25W)', '74 Hz – 20 kHz (±2.5 dB)')),
    304: ('Compact desktop pair', 'Par estéreo de escritorio', MON(
        '5.25" + 2 x 3.5"', '100W (sub) + 2 x 20W',
        '54 Hz – 21 kHz (±3 dB)')),
    305: ('DSP-corrected precision', 'Precisión con DSP', MON(
        '4" (100 mm)', '140W (90W + 50W)', '57 Hz – 21 kHz (±3 dB)')),
    306: ('Desktop near a bare wall', 'Escritorio junto a pared', MON(
        '3.5" aluminum', '240W peak (pair)', '45 Hz – 23.2 kHz (-6 dB)')),
    307: ('Wall-adjacent nearfield', 'Nearfield junto a pared', MON(
        '4.5"', '80W Class D', '40 Hz – 35 kHz')),
    308: ('Accurate bass, no treatment', 'Graves precisos sin tratar', MON(
        '2 × 3.5"', '200W RMS (pair)', '36 Hz – 32 kHz (-10 dB)')),
    331: ('Critical pro-studio mixing', 'Mezcla crítica en estudio', MON(
        'Dual 8.6 x 4 in obround', '550W (250W + 150W + 150W)',
        '38 Hz – 20 kHz (±1.5 dB)')),
    371: ('Affordable ribbon tweeter', 'Tweeter ribbon económico', MON(
        '5" polypropylene', '70W Class-D (50W + 20W)', '45 Hz – 25 kHz')),
    372: ('Pro reference monitoring', 'Referencia profesional', MON(
        '5" (130 mm)', '100W Class-D (50W + 50W)', '47 Hz – 25 kHz (-6 dB)')),
    632: ('Mix translation standard', 'Estándar de traducción', MON(
        '5" cone', '70W (45W + 25W)', '54 Hz – 30 kHz (-10 dB)')),
    633: ('Budget DSP controls', 'Controles DSP económicos', MON(
        '5" Kevlar', '55W RMS (35W + 20W)', '54 Hz – 30 kHz (±3 dB)')),
    645: ('Desk against the wall', 'Escritorio pegado a pared', MON(
        '6.5" Slatefiber', '85W (30W + 55W)', '40 Hz – 22 kHz (±3 dB)')),
    684: ('Budget wide sweet spot', 'Punto dulce amplio', MON(
        '5.25" woven composite', '80W (45W + 35W)', '48 Hz – 20 kHz')),
    1042: ('Cheapest true nearfield', 'Nearfield muy barato', MON(
        '3.5" woven composite', '50 W (2×25 W bi-amp)', '80 Hz – 20 kHz')),
    1043: ('Small desk starter pair', 'Par inicial pequeño', MON(
        '4.5" Black Kevlar', '50 W (2×25 W bi-amp)', '69 Hz – 22 kHz')),
    1046: ('Tiny desk speakers', 'Monitores mini de escritorio', MON(
        '3.5" woven', '50 W (2×25 W bi-amp)', '70 Hz – 20 kHz (-3 dB)')),
    1048: ('Budget 4.5-inch pair', 'Par de 4,5 pulgadas', MON(
        '4.5" woven', '50 W (2×25 W bi-amp)', '65 Hz – 20 kHz (-3 dB)')),
    1049: ('Bluetooth budget monitoring', 'Monitoreo con Bluetooth', MON(
        '3.5" glass fibre', '64 W (2x32 W, Class D)', '70 Hz – 20 kHz (±3 dB)')),
    1052: ('Cheap desk monitoring', 'Monitoreo económico', MON(
        '4" woofer', '50 W (2x25 W, Class AB)', '68 Hz – 20 kHz')),
    1054: ('Flax-cone nearfield mixing', 'Nearfield con cono Flax', MON(
        '6.5" Flax cone', '105W (80W + 25W)', '40 Hz – 35 kHz')),
    # ---------------------------------------------------------------- subwoofers
    191: ('Rock & hip-hop low end', 'Graves para rock y hip-hop', SUB(
        '10"', '160W Class-D', '117.2 dB (peak)')),
    192: ('Flat reference sub bass', 'Sub de referencia plano', [
        (I_WOOF, '8"', L_WOOF),
        (I_POWER, '150W', L_POWER),
        (I_FREQ, '22 Hz – 160 Hz', L_FREQ)]),
    193: ('Home studio low end', 'Graves para home studio', SUB(
        '10"', '130W Class-D', '104 dB (at 1m)')),
    300: ('Deep bass in small rooms', 'Graves en salas pequeñas', SUB(
        '2 x 6.5"', '400W Class-D', '120 dB (peak at 1m)')),
    301: ('Ultra-compact desktop sub', 'Sub de escritorio compacto', SUB(
        '6.5" + 2 radiators', '160W RMS', '106 dB (peak at 40 Hz)')),
    337: ('DSP sub for KH monitors', 'Sub DSP para monitores KH', SUB(
        '10" / 265 mm', '256W', '105 dB (half space)')),
    338: ('Compact sub for small rooms', 'Sub para salas pequeñas', SUB(
        '8" / 205 mm', '130W Class D', '≥103 dB')),
    468: ('Mastering-room deep bass', 'Graves para mastering', SUB(
        '10" / 265 mm', '180W', '109 dB (half space)')),
    470: ('High-output ATC sub', 'Sub ATC de alta salida', SUB(
        '15" / 375 mm', '300W Class AB', '113 dB cont. / 119 dB peak')),
    479: ('Focal sub for large rooms', 'Sub Focal para salas grandes', SUB(
        '13" / 33 cm', '600W class G', '125 dB peak')),
    480: ('SAM sub for big rooms', 'Sub SAM para salas grandes', SUB(
        '12" / 305 mm', '400W Class D', '≥113 dB short-term')),
    481: ('Dual-woofer compact sub', 'Sub compacto de doble cono', [
        (I_WOOF, '2x 8" aluminum', L_WOOF),
        (I_POWER, '500W', L_POWER),
        (I_FREQ, '25 Hz (-3 dB)', L_FREQ)]),
}


def main():
    p = json.load(open(P_PATH, encoding='utf-8'))
    by_id = {x['id']: x for x in p}

    missing = [i for i in PLAN if i not in by_id]
    if missing:
        raise SystemExit('unknown product ids: %s' % missing)

    warnings = []
    for pid, (en, es, facts) in PLAN.items():
        if len(facts) != 3:
            raise SystemExit('%s has %d facts' % (pid, len(facts)))
        prod = by_id[pid]
        prod['bestFor'] = {'en': en, 'es': es}
        prod['facts'] = [F(i, v, l) for (i, v, l) in facts]
        for txt in [en, es] + [v for (_i, v, _l) in facts]:
            if len(txt) > MAXLEN:
                warnings.append('%s %-3d %r' % (pid, len(txt), txt))

    open(P_PATH, 'w', encoding='utf-8', newline='').write(
        json.dumps(p, ensure_ascii=False, indent=2) + '\n')

    print('quickfacts set:', len(PLAN))
    if warnings:
        print('\nOVER %d chars:' % MAXLEN)
        for w in warnings:
            print('  ', w)
    else:
        print('all values fit in %d chars' % MAXLEN)


main()
