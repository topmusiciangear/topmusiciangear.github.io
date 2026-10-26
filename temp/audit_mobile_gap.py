import re, sys

html = open('guides/at2020-vs-p120.html', encoding='utf-8', errors='ignore').read()

# Encuentra todos los bloques guide-section-mediabuy
matches = list(re.finditer(r'<div class="guide-section-mediabuy">', html))
print(f"Total bloques guide-section-mediabuy: {len(matches)}")

for i, m in enumerate(matches[:3]):
    start = m.start()
    end = start + 2500
    block = html[start:end]
    print(f"\n=== BLOQUE {i+1} (chars {start}-{end}) ===")
    
    # Extraer el div guide-section-buy completo
    buy_match = re.search(r'<div class="guide-section-buy">.*?</div>\s*</div>', block, re.DOTALL)
    if buy_match:
        print(buy_match.group(0)[:2000])
        print("...")
    else:
        print(block[:2000])
