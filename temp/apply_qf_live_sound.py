# -*- coding: utf-8 -*-
"""Quickfacts for the live_sound category (45 products).

live_sound is not one product type, so the category uses four sub-schemes,
the same way the guitars category splits electrics / steel / parlour:

  PA speakers, wedges, columns  ->  Power / Max SPL / Coverage
  Subwoofers                    ->  Woofer / Power / Max SPL
  Mixers                        ->  Channels / Preamps / Connectivity
  IEM + wireless systems        ->  Range / Latency / Battery

Every value is taken from the product tables in data/guides.json
(temp/specs_live_sound.json). Long cells are shortened by DROPPING WORDS ONLY
(never adding), so the audit can verify each value as a token subset of the
cell it came from:

    "1100W dynamic (950W LF + 150W HF)"  ->  "1100W dynamic"
    "132 dB peak / 129 dB continuous"    ->  "132 dB peak"
    "12 analog (4 mono + 4 stereo)"      ->  "12 analog"

One product has no table of its own: the Sennheiser EW IEM G4 Stereo system
(349) shares the "EW IEM G4" column values of best-wireless-iems, whose
Range / Latency / Power rows read 300 ft / 0 ms (analog) / 2x AA.
"""
import json

P_PATH = 'data/products.json'
SPECS = 'temp/specs_live_sound.json'

MAXLEN = 28

I_POWER, I_SPL, I_COV = 'gauge', 'volumeHigh', 'cone'
I_WOOF, I_CH, I_PRE, I_CONN = 'speaker', 'sliders', 'layers', 'globe'
I_RANGE, I_LAT, I_BAT = 'signal', 'clock', 'battery'
I_TYPE, I_FREQ = 'sliders', 'freq'

L_POWER = {'en': 'Power', 'es': 'Potencia'}
L_SPL = {'en': 'Max SPL', 'es': 'SPL máximo'}
L_COV = {'en': 'Coverage', 'es': 'Cobertura'}
L_WOOF = {'en': 'Woofer', 'es': 'Woofer'}
L_CH = {'en': 'Channels', 'es': 'Canales'}
L_PRE = {'en': 'Preamps', 'es': 'Preamps'}
L_CONN = {'en': 'Connectivity', 'es': 'Conectividad'}
L_RANGE = {'en': 'Range', 'es': 'Alcance'}
L_LAT = {'en': 'Latency', 'es': 'Latencia'}
L_BAT = {'en': 'Battery', 'es': 'Batería'}
L_TYPE = {'en': 'Type', 'es': 'Tipo'}
L_FREQ = {'en': 'Frequency response', 'es': 'Respuesta de frecuencia'}


def F(icon, value, label):
    return {'icon': icon, 'value': value, 'label': label, 'tone': 'good'}


# pid: (bestFor en, bestFor es, [fact triples])
PLAN = {
    # ---------------------------------------------------------------- PA speakers
    105: ('Mobile DJs & solo gigs', 'DJ móvil y solistas', [
        (I_POWER, '1000W Class-D', L_POWER),
        (I_SPL, '127 dB peak', L_SPL),
        (I_COV, '90° x 60°', L_COV)]),
    106: ('Pro bands & DJs', 'Bandas y DJ pro', [
        (I_POWER, '2000W (peak)', L_POWER),
        (I_SPL, '132 dB', L_SPL),
        (I_COV, '75° axisymmetric', L_COV)]),
    108: ('High-output all-rounder', 'Todo terreno potente', [
        (I_POWER, '1100W dynamic', L_POWER),
        (I_SPL, '134 dB peak', L_SPL),
        (I_COV, '90° x 60°', L_COV)]),
    109: ('All-in-one column PA', 'Columna todo en uno', [
        (I_POWER, '2000W (peak)', L_POWER),
        (I_SPL, '131 dB', L_SPL),
        (I_COV, '140° x 40°', L_COV)]),
    151: ('Loud budget 15-inch', '15 pulgadas económico', [
        (I_POWER, '1400W (peak)', L_POWER),
        (I_SPL, '129 dB', L_SPL),
        (I_COV, '90° x 60°', L_COV)]),
    152: ('Street gigs & busking', 'Directo en la calle', [
        (I_POWER, '2000W', L_POWER),
        (I_SPL, '123 dB', L_SPL),
        (I_COV, '120° x 30°', L_COV)]),
    153: ('Light budget PA with bass', 'PA ligera con bajos', [
        (I_POWER, '2500W peak', L_POWER),
        (I_SPL, '132 dB peak', L_SPL),
        (I_COV, '90° x 60°', L_COV)]),
    154: ('Compact clean budget PA', 'Compacta y clara', [
        (I_POWER, '1000W dynamic', L_POWER),
        (I_SPL, '131 dB peak', L_SPL),
        (I_COV, '90° x 60°', L_COV)]),
    216: ('Maximum stage headroom', 'Máximo headroom', [
        (I_POWER, '2100W peak Class-D', L_POWER),
        (I_SPL, '130 dB', L_SPL),
        (I_COV, '100° x 70°', L_COV)]),
    217: ('Clubs & small outdoor gigs', 'Clubs y directos al aire', [
        (I_POWER, '700W Class-D', L_POWER),
        (I_SPL, '129 dB', L_SPL),
        (I_COV, '90° x 90°', L_COV)]),
    218: ('Budget wedge, solid bass', 'Cuña económica con bajos', [
        (I_POWER, '800W (peak)', L_POWER),
        (I_SPL, '128 dB', L_SPL),
        (I_COV, '90° x 60°', L_COV)]),
    219: ('Clean budget monitoring', 'Monitoreo limpio y económico', [
        (I_POWER, '1000W dynamic', L_POWER),
        (I_SPL, '129 dB peak', L_SPL),
        (I_COV, '90° x 90°', L_COV)]),
    493: ('Portable PA for small gigs', 'PA portátil para directos', [
        (I_POWER, '1300W (peak)', L_POWER),
        (I_SPL, '127 dB', L_SPL),
        (I_COV, '100° x 60°', L_COV)]),
    494: ('Coaxial all-rounder', 'Coaxial todo terreno', [
        (I_POWER, '1200W (peak)', L_POWER),
        (I_SPL, '126 dB', L_SPL),
        (I_COV, '90° x 50°', L_COV)]),
    495: ('Loud FOH for bands', 'FOH potente para bandas', [
        (I_POWER, '1200W (peak)', L_POWER),
        (I_SPL, '132 dB', L_SPL),
        (I_COV, '90° x 60°', L_COV)]),
    496: ('Tour-grade 15-inch', '15 pulgadas de gira', [
        (I_POWER, '1000W (peak)', L_POWER),
        (I_SPL, '133 dB', L_SPL),
        (I_COV, '90° x 50°', L_COV)]),
    497: ('Passive 15-inch FOH', '15 pasiva para etapas', [
        (I_POWER, '250W cont. / 1000W peak', L_POWER),
        (I_SPL, '129 dB', L_SPL),
        (I_COV, '90° x 50°', L_COV)]),
    499: ('Lightweight 12-inch', '12 pulgadas ligera', [
        (I_POWER, '175W cont. / 700W peak', L_POWER),
        (I_SPL, '125 dB', L_SPL),
        (I_COV, '90° x 60°', L_COV)]),
    500: ('Passive 12-inch, pro build', '12 pasiva robusta', [
        (I_POWER, '300W cont. / 1,200W peak', L_POWER),
        (I_SPL, '128 dB', L_SPL),
        (I_COV, '90° x 60°', L_COV)]),
    501: ('Live monitoring for bands', 'Monitoreo en directo', [
        (I_POWER, '1100W (peak)', L_POWER),
        (I_SPL, '125 dB', L_SPL),
        (I_COV, '60° x 40°', L_COV)]),
    502: ('15-inch FOH & monitors', '15 para FOH y monitores', [
        (I_POWER, '1600W (peak)', L_POWER),
        (I_SPL, '133 dB', L_SPL),
        (I_COV, '90° x 60°', L_COV)]),
    626: ('Battery-powered outdoors', 'Exteriores con batería', [
        (I_POWER, '400W (peak)', L_POWER),
        (I_SPL, '126 dB', L_SPL),
        (I_COV, '100° x 60°', L_COV)]),
    # ------------------------------------------------------------------- subwoofers
    233: ('Mid-size venues & cardioid', 'Salas medianas y cardioide', [
        (I_WOOF, '18" long-excursion', L_WOOF),
        (I_POWER, '3600W peak Class-D', L_POWER),
        (I_SPL, '136 dB', L_SPL)]),
    234: ('Rock & metal bands', 'Bandas de rock y metal', [
        (I_WOOF, '18" with 4" voice coil', L_WOOF),
        (I_POWER, '2500W peak / 1250W RMS', L_POWER),
        (I_SPL, '136 dB', L_SPL)]),
    235: ('Working live bands', 'Bandas en directo', [
        (I_WOOF, 'EVS-18L 18"', L_WOOF),
        (I_POWER, '1200W Class-D', L_POWER),
        (I_SPL, '132 dB', L_SPL)]),
    236: ('Events & weddings', 'Eventos y bodas', [
        (I_WOOF, '918SG 18" ferrite', L_WOOF),
        (I_POWER, '2000W peak / 1000W RMS', L_POWER),
        (I_SPL, '134 dB', L_SPL)]),
    237: ('Touring & deepest lows', 'Gira y bajos profundos', [
        (I_WOOF, '18" with 4" voice coil', L_WOOF),
        (I_POWER, '1020W dynamic', L_POWER),
        (I_SPL, '136 dB', L_SPL)]),
    630: ('Most punch per dollar', 'Máximo golpe por precio', [
        (I_WOOF, '18" woofer', L_WOOF),
        (I_POWER, '2500W (peak)', L_POWER),
        (I_SPL, '137 dB', L_SPL)]),
    631: ('Touring DJs & bands', 'DJ y bandas de gira', [
        (I_WOOF, '18" woofer', L_WOOF),
        (I_POWER, '1500W (peak)', L_POWER),
        (I_SPL, '131 dB', L_SPL)]),
    # ---------------------------------------------------------------------- mixers
    137: ('Simple analog mixer with FX', 'Mezcladora analógica con FX', [
        (I_CH, '10 (4 mic)', L_CH),
        (I_PRE, '4 D-PRE', L_PRE),
        (I_CONN, 'USB 2x2', L_CONN)]),
    138: ('Best value for house bands', 'Mejor valor para bandas', [
        (I_CH, '32 channels (up to 40)', L_CH),
        (I_PRE, '16 MIDAS', L_PRE),
        (I_CONN, 'USB, AES50, 16 out', L_CONN)]),
    139: ('Compact pro digital', 'Digital compacta y pro', [
        (I_CH, '48 total', L_CH),
        (I_PRE, '16 A&H', L_PRE),
        (I_CONN, 'USB, 2x dSnake, tablet', L_CONN)]),
    332: ('Mixer + recorder + interface', 'Mezcladora, grabadora y USB', [
        (I_CH, '10 (12-track SD recorder)', L_CH),
        (I_PRE, '8 x Ultra-HDDA', L_PRE),
        (I_CONN, 'USB-C 12-in/10-out', L_CONN)]),
    333: ('Analog warmth + USB', 'Calidez analógica + USB', [
        (I_CH, '10 (4 mono + 3 stereo)', L_CH),
        (I_PRE, '4 x GSPre', L_PRE),
        (I_CONN, 'USB 4x4 24-bit/96kHz', L_CONN)]),
    334: ('True SSL console sound', 'Sonido de consola SSL', [
        (I_CH, '12 analog', L_CH),
        (I_PRE, '4 x SuperAnalogue (+72dB)', L_PRE),
        (I_CONN, 'USB-C 16-in/16-out', L_CONN)]),
    335: ('Analog workflow, digital FX', 'Flujo analógico, FX digital', [
        (I_CH, '16 (8 mono + 4 stereo)', L_CH),
        (I_PRE, '8 x HiVolt', L_PRE),
        (I_CONN, 'USB stereo + XLR outs', L_CONN)]),
    658: ('Acoustic duos & weddings', 'Dúos acústicos y bodas', [
        (I_CH, '8 (ToneMatch presets)', L_CH),
        (I_PRE, '8 Bose with 48 V phantom', L_PRE),
        (I_CONN, 'USB interface + stand mount', L_CONN)]),
    # ------------------------------------------------------- IEM & wireless systems
    266: ('Duos & rehearsals', 'Dúos y ensayos', [
        (I_RANGE, '300 ft', L_RANGE),
        (I_LAT, '0 ms (analog)', L_LAT),
        (I_BAT, '2x AA', L_BAT)]),
    267: ('Working bands', 'Bandas en directo', [
        (I_RANGE, '300 ft', L_RANGE),
        (I_LAT, '0 ms (analog)', L_LAT),
        (I_BAT, '2x AA', L_BAT)]),
    347: ('Cable-free for beginners', 'Sin cables para empezar', [
        (I_RANGE, '27 m (90 ft)', L_RANGE),
        (I_LAT, '<5 ms', L_LAT),
        (I_BAT, 'Micro-USB rechargeable', L_BAT)]),
    348: ('Whole bands, 4 receivers', 'Bandas enteras, 4 receptores', [
        (I_RANGE, '90 ft', L_RANGE),
        (I_LAT, '<5 ms', L_LAT),
        (I_BAT, 'Micro-USB rechargeable', L_BAT)]),
    349: ('Touring professionals', 'Profesionales de gira', [
        (I_RANGE, '300 ft', L_RANGE),
        (I_LAT, '0 ms (analog)', L_LAT),
        (I_BAT, '2x AA', L_BAT)]),
    350: ('Stereo rehearsal monitoring', 'Monitoreo estéreo en ensayos', [
        (I_RANGE, '160 ft', L_RANGE),
        (I_LAT, '0 ms (analog)', L_LAT),
        (I_BAT, '2x AA', L_BAT)]),
    362: ('Growing bands on wireless', 'Bandas que crecen', [
        (I_RANGE, '100 m', L_RANGE),
        (I_LAT, '0 ms (analog)', L_LAT),
        (I_BAT, '2x AA', L_BAT)]),
    107: ('Live vocals & stage', 'Voz en directo', [
        (I_TYPE, 'Dynamic', L_TYPE),
        (I_FREQ, '50 Hz – 15 kHz', L_FREQ),
        (I_BAT, 'Up to 14 h (2 AA)', L_BAT)]),
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
