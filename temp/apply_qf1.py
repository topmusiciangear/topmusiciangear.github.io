import json
p='data/products.json'
d=json.load(open(p,encoding='utf-8'))
pm={x['id']:x for x in d}

data = {
 1: {  # Shure SM7B
   "bestFor": {"en":"Broadcast, podcast & vocals","es":"Radio, podcast y voz"},
   "facts": [
     {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"180+ dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"},
   ]
 },
 2: {  # Neumann U 87 Ai
   "bestFor": {"en":"Studio vocals & instruments","es":"Voz e instrumentos en estudio"},
   "facts": [
     {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"3 patterns","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"12 dB-A","label":{"en":"Self-noise","es":"Ruido propio"},"tone":"good"},
   ]
 },
 3: {  # Rode NT1 5th Gen
   "bestFor": {"en":"Home studio vocals","es":"Voz en home studio"},
   "facts": [
     {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"4 dB-A","label":{"en":"Self-noise","es":"Ruido propio"},"tone":"good"},
   ]
 },
 4: {  # AKG C414 XLII
   "bestFor": {"en":"Studio vocals & instruments","es":"Voz e instrumentos en estudio"},
   "facts": [
     {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"9 patterns","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"6 dB-A","label":{"en":"Self-noise","es":"Ruido propio"},"tone":"good"},
   ]
 },
 5: {  # Shure SM57
   "bestFor": {"en":"Instruments, amps & snare","es":"Instrumentos, amplis y caja"},
   "facts": [
     {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"150+ dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"},
   ]
 },
 50: {  # Shure SM58
   "bestFor": {"en":"Live vocals","es":"Voz en directo"},
   "facts": [
     {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"150+ dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"},
   ]
 },
}

for pid, qf in data.items():
    prod = pm[pid]
    prod['bestFor'] = qf['bestFor']
    prod['facts'] = qf['facts']
    print("Updated", pid, prod['title'])

json.dump(d, open(p,'w',encoding='utf-8'), ensure_ascii=False, indent=2)
print("done")
