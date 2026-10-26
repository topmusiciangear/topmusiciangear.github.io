# -*- coding: utf-8 -*-
"""Quickfacts for the plugins category (70 products).

Fact scheme: Type / Format / third fact.

The third fact follows a fixed priority chain, exactly like the microphones use
(self-noise -> max SPL -> frequency range -> pattern):

    Copy protection -> Latency -> Platforms

`Platforms` is the last resort because 64 of the plugin tables say the same
thing ("macOS & Windows"); it is still accurate, just less informative.

Values come from the plugin tables in data/guides.json (temp/specs_plugins.json).
Type labels are shortened by DROPPING WORDS ONLY (never adding), so the audit
can verify every value is a token subset of the table cell.

Verified against the manufacturer for the eight products that no plugin table
covers (iZotope, Sonible, Mastering The Mix, Eventide, Celemony, Synchro Arts):

* RX 12 Advanced  audio repair suite / VST3, AU, AAX (+ARA)   izotope.com/products/rx
* Neutron 5       mixing plug-in suite / AU, VST3, AAX        izotope.com/products/neutron
* smart:EQ 4      "the intelligent equalizer" / VST, VST3, AU, AAX,
                  authorization "machine-based or iLok"        sonible.com/smarteq4
* smart:limit     "content-aware limiter" / VST, VST3, AU, AAX,
                  authorization "machine-based or iLok"        sonible.com/smartlimit
* MIXVAULT        "Immersive EQ" / AU, VST3, AAX (no VST2)     masteringthemix.com
* H3000 Band Delays MK II  8-band filtered delay / AAX, VST2, VST3, AU,
                  "iLok Account Required. No physical dongle"  eventideaudio.com
* Melodyne 5 Essential  pitch correction / engine formats of Melodyne 5 (+ARA)
* RePitch 2 Standard    vocal tuning / AU, VST3, AAX 64-bit   synchroarts.com/repitch
"""
import json

P_PATH = 'data/products.json'
SPECS = 'temp/specs_plugins.json'

# ---------------------------------------------------------------- icon helper
I_TYPE, I_FMT, I_COPY, I_LAT, I_CPU, I_PLAT = (
    'sliders', 'compactDisc', 'lock', 'gauge', 'chip', 'globe')

L_TYPE = {'en': 'Type', 'es': 'Tipo'}
L_FMT = {'en': 'Format', 'es': 'Formato'}
L_COPY = {'en': 'Copy protection', 'es': 'Protección anticopia'}
L_LAT = {'en': 'Latency', 'es': 'Latencia'}
L_CPU = {'en': 'CPU load', 'es': 'Carga de CPU'}
L_PLAT = {'en': 'Platforms', 'es': 'Plataformas'}

THIRD = {
    'copy': (I_COPY, L_COPY),
    'lat': (I_LAT, L_LAT),
    'cpu': (I_CPU, L_CPU),
    'plat': (I_PLAT, L_PLAT),
}

# CPU cells are shortened by dropping words only ("High (3 engines + modulation)"
# -> "High (3 engines)"), same subset discipline as Type/Format.
CPU_SHORT = {
    'High (multiple instances heavy)': 'High',
    'High (3 engines + modulation)': 'High (3 engines)',
}


def F(icon, value, label):
    return {'icon': icon, 'value': value, 'label': label, 'tone': 'good'}


# pid: (bestFor en, bestFor es, type, format, third)
# third = None -> automatic chain from the table; or ('copy'|'lat'|'plat', value)
PLAN = {
    29: ('One-stop mixing toolkit', 'Kit de mezcla completo',
         '14 plug-ins', 'VST2/VST3/AU/AAX', None),
    30: ('AI-assisted mastering', 'Masterización asistida',
         'Mastering suite', 'VST2/VST3/AU/AAX', None),
    32: ('Creative color & character', 'Color y carácter creativo',
         'Multi-FX bundle', 'VST2/VST3/AU/AAX/CLAP', None),
    60: ('Classic FET compression', 'Compresión FET clásica',
         'Compressor plug-in', 'VST2/VST3/AU/AAX', None),
    61: ('Transparent bus compression', 'Compresión de bus limpia',
         'Compressor', 'VST2/VST3/AU/AAX', None),
    62: ('Surgical EQ anywhere', 'EQ quirúrgico en todo',
         'Dynamic/parametric EQ', 'VST2/VST3/AU/AAX', None),
    63: ('Clean to aggressive comp', 'De limpia a agresiva',
         'Compressor', 'VST2/VST3/AU/AAX', None),
    119: ('SSL bus glue', 'Pegamento de bus SSL',
          'Buss compressor', 'VST2/VST3/AU/AAX', None),
    120: ('Vocal tuning & editing', 'Afinación vocal precisa',
          'Pitch correction & editing', 'VST3/AU/AAX + ARA', None),
    121: ('UAD sound, no hardware', 'Sonido UAD sin hardware',
          'Emulation suite', 'VST2/VST3/AU/AAX', None),
    122: ('Advanced audio repair', 'Reparación de audio avanzada',
          'Audio repair suite', 'VST3/AU/AAX', ('plat', 'macOS & Windows')),
    123: ('Massive instruments & FX', 'Instrumentos y FX masivos',
          'Bundle (Kontakt-based)', 'VST2/VST3/AU/AAX', None),
    238: ('Huge ambient spaces', 'Espacios ambient enormes',
          'Algorithmic Reverb', 'VST2/AU/AAX (no VST3/CLAP)', None),
    374: ('Rhythmic shaping & stutter', 'Forma rítmica y stutter',
          'Rhythmic Modulation Suite', 'VST2/VST3/AU/AAX/CLAP', None),
    375: ('Instant lo-fi color', 'Color lo-fi inmediato',
          'Lo-Fi / Character Processor', 'VST2/VST3/AU/AAX/CLAP', None),
    376: ('Half-speed textures', 'Texturas a media velocidad',
          'Time-Stretch / Pitch Effect', 'VST2/VST3/AU/AAX/CLAP', None),
    377: ('Modulated multi-FX', 'Multi-FX modulado',
          'Dual-Engine Creative Delay', 'VST2/VST3/AU/AAX/CLAP', None),
    378: ('Natural vocal doubles', 'Dobles vocales naturales',
          'Vocal doubler', 'VST3/AU/AAX', None),
    379: ('SSL 4000 E channel', 'Canal SSL 4000 E',
          'Channel strip (72ch TMT)', 'VST2/VST3/AU/AAX', None),
    380: ('Glitch & micro-rhythms', 'Glitch y microrritmos',
          'Step-Sequenced Multi-FX', 'VST2/VST3/AU/AAX/CLAP', None),
    381: ('AI mixing suite', 'Suite de mezcla con IA',
          'Mixing plugin suite', 'VST3/AU/AAX', ('plat', 'macOS & Windows')),
    382: ('Theory & chord writing', 'Teoría y acordes',
          'Music theory workstation', 'VST2/VST3/AU/AAX', None),
    383: ('AI EQ for fast mixing', 'EQ con IA para mezclar',
          'Intelligent EQ', 'VST/VST3/AU/AAX', ('copy', 'Machine or iLok')),
    384: ('AI limiting for masters', 'Limitación con IA',
          'Content-aware limiter', 'VST/VST3/AU/AAX', ('copy', 'Machine or iLok')),
    385: ('Reference your mixes', 'Comparar con referencias',
          'Immersive EQ', 'VST3/AU/AAX', ('plat', 'macOS & Windows')),
    386: ('Multiband distortion', 'Distorsión multibanda',
          'Multiband Distortion', 'VST2/VST3/AU/AAX', None),
    387: ('Evolving spatial textures', 'Texturas espaciales',
          'Spatial / Reverb (3 engines)', 'VST2/VST3/AU/AAX/CLAP', None),
    389: ('8-band filtered delays', 'Delays filtrados de 8 bandas',
          '8-band filtered delay', 'VST2/VST3/AU/AAX', ('copy', 'iLok account')),
    390: ('Juno-style chorus', 'Chorus estilo Juno',
          'Chorus (Juno-106 modeling)', 'VST2/VST3/AU/AAX/CLAP', None),
    392: ('Complex delay patterns', 'Patrones de delay',
          'Delay (23 models)', 'VST2/VST3/AU/AAX/CLAP', None),
    394: ('Harmonic animation', 'Animación armónica',
          'Harmonic Spectral Processor', 'VST2/VST3/AU/AAX/CLAP', None),
    472: ('One-knob harshness control', 'Dureza con un solo mando',
          'Spectral compressor', 'VST2/VST3/AU/AAX', None),
    473: ('Transparent clipping', 'Clipping transparente',
          'Clipper / limiter', 'VST2/VST3/AU/AAX', None),
    474: ('Mix reference checking', 'Comparar con referencias',
          'Reference & metering tool', 'VST2/VST3/AU/AAX', None),
    527: ('Rhythmic echoes & spaces', 'Ecos rítmicos y espacios',
          'Delay + reverb generator', 'VST/VST3/AU/AAX', None),
    1001: ('Visual sound design', 'Diseño sonoro visual',
           'Wavetable + granular', 'VST2/VST3/AU/AAX', None),
    1002: ('Vintage analog warmth', 'Calidez analógica vintage',
           'Virtual analog', 'VST2/VST3/AU/AAX', None),
    1003: ('Modular sound design', 'Diseño sonoro modular',
           'Semi-modular softsynth', 'VST2/VST3/AU/AAX', None),
    1004: ('EDM production powerhouse', 'Potencia para producir EDM',
           'Wavetable workstation', 'VST2/VST3/AU/AAX', None),
    1005: ('Trance leads & basses', 'Leads y bajos de trance',
           'Polyphonic subtractive synth', 'VST2/VST3/AU/AAX', None),
    1006: ('Aggressive basses & leads', 'Bajos y leads agresivos',
           'Wavetable synthesizer', 'VST2/VST3/AU/AAX', None),
    1007: ('Theory & chord writing', 'Teoría y acordes',
           'Music theory workstation', 'VST2/VST3/AU/AAX', None),
    1008: ('Playable MIDI from loops', 'MIDI tocable desde loops',
           'MIDI sampler and remixer', 'VST/VST3/AU/AAX', None),
    1009: ('Fast grooves from loops', 'Grooves rápidos con loops',
           'Loop sequencer', 'VST/VST3/AU/AAX', None),
    1010: ('AI drum patterns', 'Patrones de batería con IA',
           'AI drum pattern generator', 'VST/VST3/AU/AAX', None),
    1011: ('Generative melodies', 'Melodías generativas',
           'Generative MIDI sequencer', 'VST/VST3/AU/AAX', None),
    1012: ('Pitch reshaping in audio', 'Remapeo de tono',
           'Polyphonic pitch mapper', 'VST2/VST3/AU/AAX', None),
    1013: ('Concert grand realism', 'Realismo de gran concierto',
           'Sampled Model D grand', 'VST/VST3/AU/AAX', None),
    1014: ('Piano library platform', 'Plataforma de librerías',
           'Sampler platform', 'VST3/AU/AAX', None),
    1015: ('Vintage keys & synths', 'Teclados y synths vintage',
           '45 modeled instruments suite', 'VST2/VST3/AU/AAX', None),
    1016: ('Pop & songwriter pianos', 'Pianos pop y de autor',
           'Sampled grand/upright/EP', 'VST/AU/AAX', None),
    1017: ('Intimate felt piano', 'Piano de fieltro íntimo',
           'Felt + concert grand', 'VST3/AU/AAX via Kontakt', None),
    1018: ('Piano-to-synth morphing', 'Piano que muta a synth',
           'Hybrid acoustic grand', 'VST2/VST3/AU/AAX', None),
    1019: ('Huge amp & pedal range', 'Amplia gama de amps',
           'Amp & effects modeling', 'VST2/VST3/AU/AAX', None),
    1020: ('Component amps + DynIR', 'Amps por componentes',
           'Amp modeler + FX', 'VST3/AU/AAX', None),
    1021: ('Legendary rock room tone', 'Sala de rock legendaria',
           'Studio room emulation', 'VST3/AU/AAX', None),
    1022: ('British valve crunch', 'Crunch de válvulas británico',
           'Single-amp valve simulator', 'VST3/AU/AAX', None),
    1023: ('Official Marshall stack tone', 'Tono oficial Marshall',
           'Marshall amp suite', 'VST/VST3/AU/AAX', None),
    1025: ('Spectral audio repair', 'Reparación espectral',
           'Audio repair suite', 'VST3/AU/AAX', None),
    1027: ('Natural AI de-essing', 'De-esser natural con IA',
           'AI de-esser', 'VST2/VST3/AU/AAX', None),
    1028: ('Everyday cleanup on a budget', 'Limpieza diaria económica',
           '4-tool restoration suite', 'VST/VST3/AU/AAX', None),
    1030: ('De-reverb for bad rooms', 'Quitar reverb de salas',
           'De-reverb processor', 'VST/VST3/AU/AAX', None),
    1032: ('Budget vocal correction', 'Corrección vocal económica',
           'Pitch correction', 'VST3/AU/AAX + ARA', ('plat', 'macOS & Windows')),
    1034: ('Manual mastering control', 'Masterización manual',
           'Mastering bundle, 4 plugins', 'VST2/VST3/AU/AAX', None),
    1035: ('Fast vocal alignment', 'Alineación vocal rápida',
           'Vocal alignment plugin', 'VST3/AU/AAX', None),
    1036: ('Large vocal production', 'Producción vocal compleja',
           'Vocal production suite', 'Standalone + VST3/AU/AAX', None),
    1038: ('Broadcast true-peak limiting', 'True-peak para broadcast',
           'True-peak limiter', 'VST2/VST3/AU/AAX', None),
    1039: ('Tuning + alignment bundle', 'Pack afinación + alineación',
           'Vocal production bundle', 'VST3/AU/AAX', None),
    1040: ('Fast daily vocal tuning', 'Afinación vocal diaria',
           'Vocal tuning', 'VST3/AU/AAX', ('plat', 'macOS & Windows')),
    1041: ('Complete AI vocal chain', 'Cadena vocal con IA',
           '13-module vocal suite', 'VST3/AU/AAX', None),
}

MAXLEN = 28


def pick_third(pid, specs):
    s = specs.get(str(pid)) or {}
    for kind, key in (('copy', 'copyprot'), ('lat', 'latency'),
                      ('cpu', 'cpu'), ('plat', 'platforms')):
        vals = s.get(key) or []
        if vals:
            v = vals[0]
            if kind == 'cpu':
                v = CPU_SHORT.get(v, v)
            return kind, v
    return 'plat', 'macOS & Windows'


def main():
    specs = json.load(open(SPECS, encoding='utf-8'))
    p = json.load(open(P_PATH, encoding='utf-8'))
    by_id = {x['id']: x for x in p}

    missing = [i for i in PLAN if i not in by_id]
    if missing:
        raise SystemExit('unknown product ids: %s' % missing)

    warnings = []
    counts = {'copy': 0, 'lat': 0, 'cpu': 0, 'plat': 0}
    for pid, (en, es, ptype, fmt, third) in PLAN.items():
        if third is None:
            kind, value = pick_third(pid, specs)
        else:
            kind, value = third
        counts[kind] += 1
        icon, label = THIRD[kind]
        facts = [F(I_TYPE, ptype, L_TYPE), F(I_FMT, fmt, L_FMT),
                 F(icon, value, label)]
        for k in (ptype, fmt, value, en, es):
            if len(k) > MAXLEN:
                warnings.append('%s  %-6s %r (%d)' % (pid, 'len', k, len(k)))
        prod = by_id[pid]
        prod['bestFor'] = {'en': en, 'es': es}
        prod['facts'] = facts

    open(P_PATH, 'w', encoding='utf-8', newline='').write(
        json.dumps(p, ensure_ascii=False, indent=2) + '\n')

    print('quickfacts set:', len(PLAN))
    print('third fact mix:', counts)
    if warnings:
        print('\nOVER %d chars:' % MAXLEN)
        for w in warnings:
            print('  ', w)
    else:
        print('all values fit in %d chars' % MAXLEN)


main()
