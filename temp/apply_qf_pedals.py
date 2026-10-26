# -*- coding: utf-8 -*-
"""Quickfacts for the pedals category (42 products).

Values come from the product tables of the five pedal guides
(temp/specs_pedals_clean.json, collected by temp/qf_pedal_rows.py). The generic
collector was not used here because it scans every guide, so a pedal that also
appears in another category's table picked up a foreign "Power" cell (the DD-8
came back with "100 mA", the BD-2 with "20 mA").

Two sub-schemes:

  Stompboxes, loopers, tuners, multi-FX  ->  Type / Bypass / Current draw
      (37 products). Current draw is the spec pedalboard owners actually plan
      around, and it is consistent across all five tables. The "Power" row was
      rejected: some columns hold a current figure there instead of a voltage.

  Amp modelers in the best-amp-modelers table  ->  Type / Models / Battery
      (202, 203, 205, 258, 259). Their table has no bypass or current row, but it
      does list the model count and battery operation, which is what separates
      them. 258 and 259 have no Type row at all, so their type is written from
      the maker's own product description (TONEX ONE+ is an amp modeler and
      capture pedal; POD Go is a multi-effects/modeler) and marked MANUAL in the
      audit.

Values are shortened by DROPPING WORDS ONLY so the audit can check them as a
token subset of the table cell ("300+ Helix amps, cabs, effects" ->
"300+ Helix amps, cabs"). Current figures and battery strings are compared
exactly.

Run:  python temp/apply_qf_pedals.py
"""
import json

P_PATH = 'data/products.json'

MAXLEN = 28

I_TYPE, I_BYPASS, I_CURRENT = 'wave', 'signal', 'battery'
I_MODELS, I_BATTERY = 'layers', 'battery'

L_TYPE = {'en': 'Type', 'es': 'Tipo'}
L_BYPASS = {'en': 'Bypass', 'es': 'Bypass'}
L_CURRENT = {'en': 'Current draw', 'es': 'Consumo'}
L_MODELS = {'en': 'Models', 'es': 'Modelos'}
L_BATTERY = {'en': 'Battery', 'es': 'Batería'}


def F(icon, value, label):
    return {'icon': icon, 'value': value, 'label': label, 'tone': 'good'}


def PED(t, b, i):
    """Pedal: Type / Bypass / Current draw."""
    return [(I_TYPE, t, L_TYPE), (I_BYPASS, b, L_BYPASS), (I_CURRENT, i, L_CURRENT)]


def MOD(t, m, bat):
    """Amp modeler: Type / Models / Battery."""
    return [(I_TYPE, t, L_TYPE), (I_MODELS, m, L_MODELS), (I_BATTERY, bat, L_BATTERY)]


# pid: (bestFor en, bestFor es, [fact triples])
PLAN = {
    # ------------------------------------------------------- overdrive / distortion
    96: ('Classic mid-hump overdrive', 'Overdrive clásico con medios', PED(
        'Overdrive', 'Buffered', '8 mA')),
    133: ('Amp-like blues breakup', 'Rotura tipo ampli para blues', PED(
        'Overdrive', 'Buffered bypass', '8 mA')),
    134: ('Hard-clipping distortion', 'Distorsión clásica', PED(
        'Distortion', 'True bypass', '2 mA')),
    581: ('Amp-in-a-box crunch', 'Crunch tipo ampli', PED(
        'Overdrive', 'True / enhanced switchable', '8 mA')),
    582: ('Boost estilo Klon' if False else 'Transparent Klon-style boost',
          'Boost estilo Klon', PED(
              'Overdrive', 'Buffered / true bypass', '70 mA')),
    583: ('Low-gain transparent drive', 'Drive transparente', PED(
        'Overdrive', 'True bypass', '43 mA')),
    584: ('Op-amp hard distortion', 'Distorsión op-amp', PED(
        'Distortion', 'True bypass', '2.5 mA')),
    585: ('Boutique Blues Driver', 'Blues Driver de gama alta', PED(
        'Overdrive', 'Buffered', '18 mA')),
    # ------------------------------------------------------------- delay / reverb
    97: ('Compact delay powerhouse', 'Delay compacto todoterreno', PED(
        'Digital delay', 'Buffered', '65 mA')),
    100: ('Mash-pedal reverb', 'Reverb con pedal Mash', PED(
        'Digital reverb', 'True bypass', '150 mA')),
    135: ('Studio-grade reverbs', 'Reverbs de estudio', PED(
        'Multi-algorithm reverb', 'True / buffered selectable', '500 mA')),
    591: ('12 delay machines', '12 máquinas de delay', PED(
        'Delay', 'Buffered / true bypass', '300 mA')),
    592: ('Modular delay sandbox', 'Laboratorio de delay modular', PED(
        'Modular delay workstation', 'Buffered / true bypass', '300 mA')),
    593: ('Dual delay, studio FX', 'Delay doble de estudio', PED(
        'Delay / looper', 'Buffered', '150 mA')),
    594: ('14 delay engines', '14 motores de delay', PED(
        'Delay', 'Buffered', '400 mA')),
    595: ('Delay and spring reverb', 'Delay y reverb de muelle', PED(
        'Delay', 'Buffered / true bypass', '200 mA')),
    596: ('Tape delay + reverb', 'Delay de cinta + reverb', PED(
        'Delay + reverb combo', 'True bypass / trails', '75 mA')),
    597: ('Analog BBD warmth', 'Calidez analógica BBD', PED(
        'Analog delay (BBD)', 'True bypass', '26 mA')),
    598: ('Spring, plate, hall verbs', 'Reverbs spring, plate y hall', PED(
        'Reverb (Spring/Plate/Hall)', 'Buffered (trails)', '400 mA')),
    599: ('Compact Boss reverb', 'Reverb Boss compacto', PED(
        'Reverb (Spring/Plate/Hall)', 'Buffered', '400 mA')),
    # ------------------------------------------------------------------- looper
    200: ('Loops with drum machine', 'Loops con caja de ritmos', PED(
        'Loop station', 'True bypass', '170 mA')),
    201: ('One-knob looping', 'Looper de un solo mando', PED(
        'Looper', 'True bypass', '8 mA')),
    586: ('Two-track phrase looping', 'Loops de dos pistas', PED(
        'Multi-track looper', 'Buffered', '240 mA')),
    587: ('Stereo sync looping', 'Looping estéreo sincronizado', PED(
        'Stereo looper', 'True bypass', '100 mA')),
    588: ('Simple stereo looping', 'Looping estéreo sencillo', PED(
        'Stereo looper', 'True bypass', '75 mA')),
    590: ('Simple MXR looping', 'Looping sencillo de MXR', PED(
        'Multi-track looper', 'Buffered', '500 mA')),
    600: ('Long stereo loops', 'Loops estéreo largos', PED(
        'Stereo looper', 'Buffered', '150 mA')),
    601: ('Six-track live looping', 'Looping de seis pistas', PED(
        'Mono looper', 'True bypass', '50 mA')),
    # ---------------------------------------------------------- filter / tuner / FX
    98: ('Stage-standard tuning', 'Afinación de escenario', PED(
        'Chromatic tuner', 'Buffered', '40 mA')),
    99: ('The original wah sweep', 'El wah original', PED(
        'Wah', 'Hardwire', '1 mA')),
    136: ('Two phasers, one box', 'Dos phasers en uno', PED(
        'Phaser', 'True bypass', '4 mA')),
    443: ('Subtle analog phasing', 'Phasing analógico sutil', PED(
        'Phaser', 'True bypass', '5 mA')),
    # ------------------------------------------------------------ multi-FX / modelers
    204: ('Knob-driven multi-effects', 'Multiefectos de perillas', PED(
        'Multi-effects', 'Buffered', '190 mA')),
    577: ('Built-in expression pedal', 'Con pedal de expresión', PED(
        'Multi-FX / amp modeler', 'Buffered / true bypass', '500 mA')),
    578: ('Flagship tone, small box', 'Tono tope, formato compacto', PED(
        'Multi-FX / amp modeler', 'Buffered / true bypass', '1000 mA')),
    579: ('Capture + full rig', 'Captura y rig completo', PED(
        'Amp modeler / capture', 'Buffered / true bypass', '3000 mA')),
    580: ('Budget modeling workstation', 'Modelado económico completo', PED(
        'Multi-FX / amp modeler', 'Buffered / true bypass', '600 mA')),
    # ---------------------------------------------- amp-modeler guide (scheme B)
    202: ('Pedalboard amp modeling', 'Modelado en la pedalera', MOD(
        'Multi-effects / modeler', '300+ Helix amps, cabs', 'No')),
    203: ('Budget amp modeling', 'Modelado económico', MOD(
        'Multi-effects', '108 effects', '7 hours on 4x AA')),
    205: ('Touchscreen amp capture', 'Captura con pantalla táctil', MOD(
        'Multi-effects / modeler', '52 amps, 15 cabs', 'No')),
    258: ('Tone capture on a board', 'Captura de tono en pedal', MOD(
        'Amp modeler / capture', '420+ tone models', '1x 9V battery')),
    259: ('Simple Helix tones', 'Tono Helix simplificado', MOD(
        'Multi-effects / modeler', '200+ HX amps', 'No')),
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
