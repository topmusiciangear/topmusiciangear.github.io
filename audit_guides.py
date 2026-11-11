import re, os, json
base = r'C:\Users\Daniel\projects\topmusiciangear\guides'
slugs = [
"best-mic-for-podcasting.html",
"best-overdrive-distortion.html",
"guitar-bass-amps.html",
"best-synth-vsts.html",
"precision-vs-jazz.html",
"best-daw-for-beginners.html",
"best-beginner-electric-guitar.html",
"best-plugins.html",
"mixing-plugins.html",
"beginner-bass-guitars.html",
"guitar-pedals.html",
"best-microphone.html",
"best-headphones-for-mixing.html",
"vocal-plugins.html",
"best-reverb-delay.html",
"best-audio-repair-plugins.html",
"best-samplers-drum-computers.html",
"fender-guide.html",
"monitor-setup.html",
"best-guitar-plugins.html",
"best-bass-amps.html",
"channel-strip-plugins.html",
"best-looper-pedals.html",
"studio-subwoofers-setup.html",
"fender-bass-guide.html",
"streaming-interfaces.html",
"best-ribbon-mics.html",
"best-synthesizers.html",
"best-nylon-guitars-for-beginners.html",
"di-box.html",
"pro-daw.html",
"tuners-bass-guitar.html",
"open-headphones.html",
]
def analyze(path):
    txt = open(path, encoding='utf-8', errors='ignore').read()
    card_count = len(re.findall(r'<div class="guide-product-card"', txt))
    tables = re.findall(r'<table[^>]*class="[^"]*product[^"]*"[^>]*>(.*?)</table>', txt, flags=re.S|re.I)
    cols = None
    if tables:
        header = re.search(r'<thead>.*?</thead>', tables[0], flags=re.S|re.I)
        if header:
            ths = re.findall(r'<th', header.group(0))
            cols = len(ths)
        else:
            first_row = re.search(r'<tr>(.*?)</tr>', tables[0], flags=re.S|re.I)
            if first_row:
                cells = re.findall(r'<t[dh]', first_row.group(1))
                cols = len(cells)
    verdict_products = re.findall(r'<div class="verdict-product[^"]*">', txt)
    verdict_items = re.findall(r'class="[^"]*verdict-pros-cons-item[^"]*"', txt)
    verdict_count = max(len(verdict_products), len(verdict_items))
    titles = re.findall(r'<h3 class="guide-product-card-title">([^<]+)</h3>', txt)
    verdict_titles = re.findall(r'<h3 class="verdict-product-title">([^<]+)</h3>', txt)
    seen=set()
    all_titles=[]
    for t in titles+verdict_titles:
        t=t.strip()
        if t and t not in seen:
            seen.add(t)
            all_titles.append(t)
    return {
        'cards': card_count,
        'table_cols': cols,
        'verdict_products': verdict_count,
        'titles': all_titles
    }
results={}
for s in slugs:
    p=os.path.join(base,s)
    if os.path.exists(p):
        results[s]=analyze(p)
    else:
        results[s]={'error':'missing'}
print(json.dumps(results, indent=2))
