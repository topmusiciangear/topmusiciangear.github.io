s = open('css/style.css', encoding='utf-8').read()

# 1. Ensure flex-direction is row but with wrap, and photos at 50%
old1 = '''@media (max-width: 640px) {
  .guide-section-mediabuy {
    flex-direction: column;
  }
  .guide-section-mediabuy > .guide-section-buy {
    flex: 1 1 auto;
    width: 100%;
    max-width: none;
  }
  .guide-section-mediabuy > .guide-section-imgs {
    width: 100%;
    justify-content: flex-start;
  }
  .guide-section-mediabuy .guide-section-img,
  .guide-section-mediabuy .guide-video-thumb {
    flex: none;
    min-width: 0;
    width: 120px;
    height: 120px;
  }'''

new1 = '''@media (max-width: 640px) {
  .guide-section-mediabuy {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .guide-section-mediabuy > .guide-section-buy {
    flex: 1 1 100%;
    width: 100%;
    max-width: none;
    order: 2;
    margin-top: 8px;
  }
  .guide-section-mediabuy > .guide-section-imgs {
    width: 50%;
  }
  .guide-section-mediabuy .guide-section-img,
  .guide-section-mediabuy .guide-video-thumb {
    flex: none;
    min-width: 0;
    width: 50%;
    height: 50%;
  }
  .guide-section-mediabuy > .guide-section-buy {
    flex-basis: 100%;
    order: 2;
  }'''

if old1 in s:
    s = s.replace(old1, new1, 1)
    print('1. Updated mobile media query with flex-wrap and 50% photos')
else:
    print('1. old1 not found, trying partial replace')
    # Try partial
    if '.guide-section-mediabuy{flex-direction:column}' in s:
        s = s.replace('.guide-section-mediabuy{flex-direction:column}', '.guide-section-mediabuy{flex-direction:row;flex-wrap:wrap}')
        print('1b. Changed flex-direction to row with wrap')

# 2. Verify photo width is 50%
if '.guide-section-img{width:50%}' in s or '.guide-section-mediabuy .guide-section-img{width:50%}' in s:
    print('2. Photo width already 50%')
else:
    print('2. Need to set photo width to 50%')

# Write
open('css/style.css', 'w', encoding='utf-8', newline='').write(s)
print('CSS written')

# Print verification
i = s.find('@media (max-width: 640px)')
if i >= 0:
    print()
    print('=== Mobile media query ===')
    print(s[i:i+600])