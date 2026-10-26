# -*- coding: utf-8 -*-
"""Quickfacts for the headphones category (29 products).

Scheme (over/on-ear): Type / Impedance / Driver size. Impedance decides whether a
phone, a laptop or an interface can drive the pair, and it is published in every
headphone table; type and driver size are the other two rows all five guides
share.

Exceptions, all from real published data:

  * Sennheiser HD 300 Pro (606) — its only table leaves Driver Size as "—", so
    the third fact is the published Weight.
  * Sennheiser IE 900 (268) and Shure SE846 Gen 2 (269) — in-ear monitors. The
    in-ear table has no impedance or driver row (it tracks wireless band, latency
    and range, which are "N/A (wired)" for these two), so they use
    Type / Driver / Frequency response: 269's type from the in-ear table, the
    rest from their own catalog descriptions (7 mm TrueResponse dynamic driver,
    5 Hz-48 kHz; four balanced-armature drivers, 15 Hz-20 kHz).
  * Audeze LCD-MX4 (177) — in no comparison table at all; its Type, Impedance and
    Driver size come from its catalog description (open-back planar, 106 mm
    drivers, 20 ohms).

Sennheiser HD 490 Pro (24) and HD 490 Pro Plus (1053) are separate SKUs with
separate prices, links and bundles, but the same headphone, so both carry the
same 38 mm / 130 ohm specs; only bestFor differs (the Plus adds the switchable
pads and the dearVR plugin).

Run:  python temp/apply_qf_headphones.py
"""
import json

P_PATH = 'data/products.json'
PLAN_PATH = 'temp/hp_plan.json'

# Facts that no table carries, taken from the product's own catalog description
# (already published on the site) or from the in-ear table.
MANUAL = {
    177: {'Type': 'Open-back planar', 'Impedance': '20 Ω',
          'Driver Size': '106 mm planar'},
    268: {'Type': 'Wired IEM (single dynamic)', 'Driver Size': '7 mm dynamic',
          'Frequency Response': '5 Hz – 48 kHz'},
    269: {'Type': 'Wired reference IEM (quad-BA)',
          'Driver Size': '4 balanced armature',
          'Frequency Response': '15 Hz – 20 kHz'},
}

LABELS = {
    'Type': ('headphones', {'en': 'Type', 'es': 'Tipo'}),
    'Impedance': ('gauge', {'en': 'Impedance', 'es': 'Impedancia'}),
    'Driver Size': ('cone', {'en': 'Driver size', 'es': 'Tamaño del driver'}),
    'Weight': ('weight', {'en': 'Weight', 'es': 'Peso'}),
    'Frequency Response': ('freq', {'en': 'Frequency response',
                                    'es': 'Respuesta de frecuencia'}),
}

BEST = {
    23: ('Closed-back tracking standard', 'El estándar cerrado para grabar'),
    24: ('Modern reference mixing', 'Mezcla de referencia actual'),
    25: ('Portable production and tracking', 'Producción y grabación portátil'),
    26: ('Classic budget tracking', 'Clásico para grabar sin gastar'),
    56: ('Open mixing and mastering', 'Mezcla y mastering en abierto'),
    57: ('Accurate tracking and monitoring', 'Grabación y monitoreo precisos'),
    177: ('Lightweight planar flagship', 'Planar de gama alta y ligero'),
    178: ('Planar flagship detail', 'Detalle planar de referencia'),
    198: ('Budget closed-back tracking', 'Cerrado económico para grabar'),
    268: ('Audiophile detail on the move', 'Detalle audiófilo en movimiento'),
    269: ('Reference IEM, stage and studio', 'IEM de referencia, directo y estudio'),
    419: ('Isolation for loud stages', 'Aislamiento para escenarios fuertes'),
    420: ('Neutral closed-back on a budget', 'Cerrado neutro y económico'),
    421: ('Closed detail for tracking', 'Cerrado con detalle para grabar'),
    422: ('Mid-price flat reference', 'Referencia plana a precio medio'),
    423: ('Featherlight open accuracy', 'Abierto ligero y preciso'),
    424: ('Mastering-grade open reference', 'Referencia abierta para mastering'),
    426: ('Analytical open-back on a budget', 'Abierto analítico y económico'),
    427: ('Entry open-back for detail', 'Abierto de entrada para detalle'),
    428: ('Budget semi-open accuracy', 'Semiabierto preciso y barato'),
    602: ('Open detail for mixing', 'Detalle abierto para mezclar'),
    603: ('High-end open analysis', 'Análisis abierto de gama alta'),
    604: ('Classic semi-open all-rounder', 'Semiabierto clásico todoterreno'),
    605: ('Closed Neumann neutrality', 'Neutralidad Neumann en cerrado'),
    606: ('Stage and broadcast monitoring', 'Monitoreo para directo y locución'),
    608: ('Detail for critical tracking', 'Detalle para grabaciones críticas'),
    609: ('First pair on a budget', 'Primer par económico'),
    1050: ('Planar mixing reference', 'Referencia planar para mezclar'),
    1053: ('Switchable pads + dearVR plugin', 'Almohadillas intercambiables + dearVR'),
}


def main():
    plan = json.load(open(PLAN_PATH, encoding='utf-8'))
    prods = json.load(open(P_PATH, encoding='utf-8'))
    by_id = {p['id']: p for p in prods}

    missing = [pid for pid in plan if int(pid) not in BEST]
    if missing:
        raise SystemExit('no bestFor for: %s' % missing)

    for pid_s, d in plan.items():
        pid = int(pid_s)
        p = by_id[pid]
        en, es = BEST[pid]
        p['bestFor'] = {'en': en, 'es': es}

        facts = []
        for row in d['rows']:
            val = MANUAL.get(pid, {}).get(row) or d['values'].get(row)
            if not val or val in ('—', 'None'):
                raise SystemExit('missing value %s %s' % (pid, row))
            icon, label = LABELS[row]
            facts.append({'icon': icon, 'value': val,
                          'label': {'en': label['en'], 'es': label['es']},
                          'tone': 'good'})
        p['facts'] = facts

    open(P_PATH, 'w', encoding='utf-8', newline='').write(
        json.dumps(prods, ensure_ascii=False, indent=2) + '\n')

    print('quickfacts set:', len(plan))
    for pid in sorted(int(x) for x in plan):
        f = by_id[pid]['facts']
        print('  %4d %-36s %s' % (pid, by_id[pid]['title'][:36],
                                  ' | '.join('%s=%s' % (x['label']['en'], x['value'])
                                             for x in f)))


main()
