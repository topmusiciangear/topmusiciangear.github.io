import json
p='data/products.json'
d=json.load(open(p,encoding='utf-8'))
pm={x['id']:x for x in d}

data = {
 197: {  # Rode PodMic
   "bestFor": {"en":"Podcast & broadcast","es":"Podcast y radio"},
   "facts": [
     {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"USB/XLR","label":{"en":"Output","es":"Salida"},"tone":"good"},
   ]
 },
 206: {  # Royer R-121
   "bestFor": {"en":"Guitar amps & brass","es":"Amplis y metales"},
   "facts": [
     {"icon":"microphone","value":"Ribbon","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Figure-8","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"135 dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"},
   ]
 },
 207: {  # Coles 4038
   "bestFor": {"en":"Drum overheads & strings","es":"Overheads y cuerdas"},
   "facts": [
     {"icon":"microphone","value":"Ribbon","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Figure-8","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"125 dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"},
   ]
 },
 208: {  # Neumann KM 184
   "bestFor": {"en":"Acoustic instruments & overheads","es":"Instrumentos acústicos y overheads"},
   "facts": [
     {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"13 dB-A","label":{"en":"Self-noise","es":"Ruido propio"},"tone":"good"},
   ]
 },
 209: {  # Austrian Audio OC818
   "bestFor": {"en":"Studio vocals & instruments","es":"Voz e instrumentos en estudio"},
   "facts": [
     {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Multi-pattern","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"9 dB-A","label":{"en":"Self-noise","es":"Ruido propio"},"tone":"good"},
   ]
 },
 210: {  # Sennheiser e 906
   "bestFor": {"en":"Guitar amps & snare","es":"Amplis y caja"},
   "facts": [
     {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"150+ dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"},
   ]
 },
 211: {  # Beyerdynamic M 201 TG
   "bestFor": {"en":"Snare, toms & broadcast","es":"Caja, toms y radio"},
   "facts": [
     {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Hypercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"146 dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"},
   ]
 },
 212: {  # Shure Beta 52A
   "bestFor": {"en":"Kick drum & bass amps","es":"Bombo y amplis de bajo"},
   "facts": [
     {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"174 dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"},
   ]
 },
 213: {  # Audix D6
   "bestFor": {"en":"Kick drum","es":"Bombo"},
   "facts": [
     {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"144 dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"},
   ]
 },
 214: {  # Sennheiser e 604
   "bestFor": {"en":"Toms & snare","es":"Toms y caja"},
   "facts": [
     {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"160 dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"},
   ]
 },
 215: {  # DPA 4099 CORE
   "bestFor": {"en":"Instruments (clip-on)","es":"Instrumentos (clip-on)"},
   "facts": [
     {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"142 dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"},
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
