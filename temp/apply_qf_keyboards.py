# -*- coding: utf-8 -*-
"""Quickfacts for the keyboards category (32 products).

Four sub-schemes, each taken from the comparison table that belongs to that
sub-type (see temp/qf_kb_collect.py for the collector and the column matching):

  piano       (7)  Keyboard Action / Polyphony / Weight
  stage       (9)  Keys & Action / Weight / Sound Engines
  synth       (9)  Type / Keys / Polyphony
  controller  (7)  Keys / Connectivity / Weight

Values are copied verbatim from the tables; nothing is re-typed, so the
quickfacts stay anchored to the published comparison data. Nine values run past
the tidy 28-character mark (e.g. "USB-C, MIDI In/Out, 4 pedal inputs"), but they
are the real cell text and the card wraps, so they are kept rather than shortened
into something the table does not say.

Sequential Prophet-10 and Moog Muse are in no comparison table. Their Type /
Keys / Polyphony come from their own catalog description (10-voice, 61-key Fatar
with velocity and aftertouch; 8-voice, 61-key) and the audit marks them MANUAL.

Run:  python temp/apply_qf_keyboards.py
"""
import json

P_PATH = 'data/products.json'
PLAN_PATH = 'temp/kb_plan.json'

MAXLEN = 28

L_ACTION = {'en': 'Keyboard action', 'es': 'Acción del teclado'}
L_KEYS_ACT = {'en': 'Keys & action', 'es': 'Teclas y acción'}
L_KEYS = {'en': 'Keys', 'es': 'Teclas'}
L_POLY = {'en': 'Polyphony', 'es': 'Polifonía'}
L_WEIGHT = {'en': 'Weight', 'es': 'Peso'}
L_ENGINES = {'en': 'Sound engines', 'es': 'Motores de sonido'}
L_TYPE = {'en': 'Type', 'es': 'Tipo'}
L_CONN = {'en': 'Connectivity', 'es': 'Conectividad'}

ICON_ACTION = 'keyboard'
ICON_KEYS = 'keyboard'
ICON_POLY = 'layers'
ICON_WEIGHT = 'weight'
ICON_ENGINES = 'wave'
ICON_TYPE = 'chip'
ICON_CONN = 'globe'

FACT_META = {
    'Keyboard Action': (ICON_ACTION, L_ACTION),
    'Keys & Action': (ICON_ACTION, L_KEYS_ACT),
    'Keys': (ICON_KEYS, L_KEYS),
    'Polyphony': (ICON_POLY, L_POLY),
    'Weight': (ICON_WEIGHT, L_WEIGHT),
    'Sound Engines': (ICON_ENGINES, L_ENGINES),
    'Type': (ICON_TYPE, L_TYPE),
    'Connectivity': (ICON_CONN, L_CONN),
}

# bestFor, en + es
BEST = {
    # ------------------------------------------------------------ digital pianos
    571: ('Slim apartment piano', 'Piano fino para pisos pequeños'),
    572: ('First serious piano, small budget', 'Primer piano serio y asequible'),
    140: ('Compact home piano, CFX sound', 'Piano doméstico compacto con CFX'),
    141: ('Best portable practice feel', 'El portátil con mejor tacto'),
    565: ('Console with real escapement', 'Consola con escape real'),
    573: ('Affordable furniture console', 'Consola de mueble asequible'),
    567: ('Living-room console that lasts', 'Consola para el salón, para años'),
    # ------------------------------------------------------------ stage keyboards
    11: ('Pro touring and versatility', 'Directo profesional y versátil'),
    637: ('Piano realism, hybrid rigs', 'Realismo de piano, rigs híbridos'),
    638: ('Organ and rock stages', 'Órgano y escenarios de rock'),
    639: ('Huge live orchestrations', 'Orquestaciones enormes en vivo'),
    640: ('Live sequencing and setlists', 'Secuencias y setlists en vivo'),
    641: ('Lightweight vintage tone', 'Sonido vintage y poco peso'),
    642: ('Seven-engine stage piano', 'Piano de directo con 7 motores'),
    643: ('Your plugins, on stage', 'Tus plugins, en el escenario'),
    644: ('Battery gigging on a budget', 'Directo con pilas y sin gastar'),
    # -------------------------------------------------------------------- synths
    142: ('Analog poly on a budget', 'Poli analógico sin arruinarte'),
    143: ('Fat mono bass and leads', 'Bajos y leads mono con cuerpo'),
    174: ('Huge analog pads and leads', 'Pads y leads analógicos enormes'),
    475: ('Cheap hybrid, endless tones', 'Híbrido barato y muy versátil'),
    476: ('Warm pads, studio or stage', 'Pads cálidos, estudio o directo'),
    477: ('Deep sound design', 'Diseño de sonido a fondo'),
    478: ('Compact pro poly with split', 'Poli profesional y compacto'),
    175: ('Legendary analog poly', 'Poli analógico legendario'),
    176: ('Flagship Moog polysynth', 'El poli insignia de Moog'),
    # --------------------------------------------------------------- controllers
    13: ('DAW work with Analog Lab', 'Producción en DAW con Analog Lab'),
    14: ('Composing inside Komplete', 'Componer dentro de Komplete'),
    323: ('Beats anywhere', 'Beats en cualquier sitio'),
    324: ('Ultra-portable DAW control', 'Control de DAW ultraligero'),
    325: ('Piano practice in the DAW', 'Practicar piano en el DAW'),
    363: ('Ableton-focused production', 'Producción centrada en Ableton'),
    370: ('Standalone practice and jams', 'Practicar y tocar sin ordenador'),
}


def main():
    plan = json.load(open(PLAN_PATH, encoding='utf-8'))
    prods = json.load(open(P_PATH, encoding='utf-8'))
    by_id = {p['id']: p for p in prods}

    missing_best = [i for i in plan if str(i) not in {str(k) for k in BEST}
                    and int(i) not in BEST]
    if missing_best:
        raise SystemExit('no bestFor for: %s' % missing_best)

    over = []
    for pid_s, d in plan.items():
        pid = int(pid_s)
        prod = by_id[pid]
        en, es = BEST[pid]
        prod['bestFor'] = {'en': en, 'es': es}

        facts = []
        for row in d['rows']:
            val = d['values'][row]
            if val is None:
                raise SystemExit('missing value %s %s' % (pid, row))
            icon, label = FACT_META[row]
            facts.append({'icon': icon, 'value': val,
                          'label': {'en': label['en'], 'es': label['es']},
                          'tone': 'good'})
            if len(val) > MAXLEN:
                over.append((pid, row, len(val), val))
        prod['facts'] = facts

    open(P_PATH, 'w', encoding='utf-8', newline='').write(
        json.dumps(prods, ensure_ascii=False, indent=2) + '\n')

    print('quickfacts set:', len(plan))
    print('over %d chars: %d (kept verbatim, they wrap)' % (MAXLEN, len(over)))
    for pid, row, n, val in sorted(over, key=lambda x: -x[2]):
        print('   %3d %-16s %2d  %s' % (pid, row, n, val))


main()
