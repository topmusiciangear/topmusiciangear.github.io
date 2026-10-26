import json

def patch(batch, pid, old, new):
    p = 'temp/enrich_batches/out_%s.json' % batch
    d = json.load(open(p, encoding='utf-8'))
    hit = 0
    for x in d:
        if x['id'] == pid:
            assert x['add_en'] == old, x['add_en']
            x['add_en'] = new
            hit += 1
    assert hit == 1
    json.dump(d, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('patched', batch, pid)

patch('11', 580,
      'Tone Capture samples your own gear, and the tri-voice synth needs no special pickup.',
      'Tone Capture samples existing gear, and the tri-voice synth needs no special pickup.')
patch('12', 579,
      'Dual expression inputs and full MIDI control an entire rig around your captures.',
      'Dual expression inputs and full MIDI control an entire rig around its captures.')
