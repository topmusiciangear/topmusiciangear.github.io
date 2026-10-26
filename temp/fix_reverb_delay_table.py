# -*- coding: utf-8 -*-
"""Repair the last columns of best-reverb-delay's product table.

The MXR Carbon Copy and Universal Audio Golden Reverberator columns were
misaligned: almost every row held the other pedal's value, so the page showed a
Carbon Copy as a "Delay + reverb combo" with a "UAFX app" and a "Starlight +
Golden engines" standout, and a Golden Reverberator as a "100% analog BBD" delay.

Step 1 swaps every cell between those two columns (EN + ES), which restores the
Carbon Copy to its real description (analog BBD, true bypass, 9V with optional
battery, analog audio path, Mix/Regen/Delay knobs, 600 ms + modulation) and the
Golden Reverberator to a UA-engine reverb pedal.

Step 2 repairs the three cells the swap alone cannot fix:
  * Golden Reverberator type: after the swap it inherits a duplicated
    "Delay + reverb combo" (that text belongs to the Del-Verb), so it is set to
    "Reverb (Spring/Plate/Hall)".
  * Golden Reverberator standout: its own text ("Spring 65, Plate 140,
    Hall 224") was sitting in the Boss RV-200 column, so it is moved back.
  * Boss RV-200: keeps its own type but needs its own standout
    (the model list above was not its), plus its DSP cell was showing
    "UAFX dual-engine" (a UA engine on a Boss pedal) and its bypass/controls
    cells mentioned a UAFX app it does not have.
  * Del-Verb DSP cell read "—" although it runs the Starlight + Golden engines.

Sources: jimdunlop.com M169 product page ("three-knob layout that controls
Delay, Mix, and Regen... completely analog audio path... True bypass... 600ms"),
and the table's own Type/Controls rows for the RV-200.

Run:  python temp/fix_reverb_delay_table.py
"""
import json

G_PATH = 'data/guides.json'
GUIDE = 'best-reverb-delay'

CC = 'MXR M169 Carbon Copy'
GR = 'Universal Audio Golden Reverberator'
DV = 'Universal Audio Del-Verb'
BOSS = 'Boss RV-200'

# rows whose cells are swapped between the two misaligned columns
SWAP_ROWS = ['Type', 'Controls', 'Bypass', 'Power', 'Current Draw',
             'DSP / Processing', 'Size', 'Standout Feature']


def main():
    guides = json.load(open(G_PATH, encoding='utf-8'))
    g = next(x for x in guides if x['id'] == GUIDE)
    pt = g['productTable']
    cols = [c['title'] for c in pt['columns']]
    icc, igr, iboss, idv = (cols.index(CC), cols.index(GR),
                            cols.index(BOSS), cols.index(DV))

    swapped = 0
    for row in pt['rows']:
        if row['label'] not in SWAP_ROWS:
            continue
        a, b = row['values'][icc], row['values'][igr]
        if not isinstance(a, dict) or not isinstance(b, dict):
            continue
        row['values'][icc], row['values'][igr] = b, a
        swapped += 1

    # --- targeted repairs ---------------------------------------------------
    def setcell(label, idx, value, value_es=None):
        row = next(r for r in pt['rows'] if r['label'] == label)
        cell = row['values'][idx]
        if not isinstance(cell, dict):
            raise SystemExit('%s cell is not a dict' % label)
        cell['value'] = value
        if value_es is not None and 'value_es' in cell:
            cell['value_es'] = value_es
        return cell

    # Golden Reverberator: inherited the Del-Verb's type through the swap
    setcell('Type', igr, 'Reverb (Spring/Plate/Hall)', 'Reverb (Spring/Plate/Hall)')
    # its real standout was sitting in the RV-200 column
    setcell('Standout Feature', igr, 'Spring 65, Plate 140, Hall 224',
            'Spring 65, Plate 140, Hall 224')
    # Del-Verb runs the Starlight + Golden engines
    setcell('DSP / Processing', idv, 'UAFX dual-engine', 'UAFX dual-engine')
    # Boss RV-200 had a UA engine, a UA app and the Golden's model list
    setcell('Standout Feature', iboss, 'Spring/plate/hall + A/B/C memories',
            'Spring/plate/hall + memorias A/B/C')
    setcell('DSP / Processing', iboss, '—', '—')
    setcell('Controls', iboss, 'Knobs + A/B/C switch', 'Perillas + switch A/B/C')
    setcell('Bypass', iboss, 'Buffered', 'Buffered')

    open(G_PATH, 'w', encoding='utf-8', newline='').write(
        json.dumps(guides, ensure_ascii=False, indent=2) + '\n')

    print('rows swapped:', swapped)
    for lab in SWAP_ROWS + ['Type', 'Bypass', 'Power', 'Standout Feature',
                            'DSP / Processing']:
        row = next((r for r in pt['rows'] if r['label'] == lab), None)
        if not row:
            continue
        vals = [row['values'][i] for i in (idv, icc, igr, iboss)]
        print('%-18s' % lab, ' | '.join(str(v.get('value')) for v in vals))


main()
