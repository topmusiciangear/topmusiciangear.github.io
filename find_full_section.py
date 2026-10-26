f = 'guides/at2020-vs-p120.html'
with open(f, encoding='utf-8') as fh:
    c = fh.read()

# Find the first guide-section and show full structure
idx = c.find('class="guide-section">')
if idx >= 0:
    # Find the end of this section (next guide-section or end of guide)
    next_section = c.find('class="guide-section">', idx+100)
    if next_section >= 0:
        section = c[idx:next_section]
    else:
        section = c[idx:idx+5000]
    print(section[:3000])