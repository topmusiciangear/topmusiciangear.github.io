s = open('css/style.css', encoding='utf-8').read()

# 1. Make sure flex-direction is row in mobile
old1 = """@media (max-width: 640px) {
  .guide-section-mediabuy {
    flex-direction: column;
  }"""
new1 = """@media (max-width: 640px) {
  .guide-section-mediabuy {
    flex-direction: row;
  }"""
if old1 in s:
    s = s.replace(old1, new1, 1)
    print('1. Changed flex-direction to row')
else:
    print('1. old1 not found')

# 2. Change buy section to be 100% width with margin-top to push it down
old3 = """  .guide-section-mediabuy > .guide-section-buy {
    flex: 1 1 50%;
    width: 50%;
    max-width: none;
  }"""
new3 = """  .guide-section-mediabuy > .guide-section-buy {
    flex: 1 1 100%;
    width: 100%;
    max-width: none;
    margin-top: 16px;
  }"""
if old3 in s:
    s = s.replace(old3, new3, 1)
    print('3. Changed buy section to 100% with margin-top')
else:
    print('3. old3 not found')

# 4. Photo + img should be 50% (already set, just verify)
old4 = """  .guide-section-mediabuy .guide-section-img,
  .guide-section-mediabuy .guide-video-thumb {
    flex: none;
    min-width: 0;
    width: 50%;
    height: 50%;
  }"""
# Keep as is

# Write the file
open('css/style.css', 'w', encoding='utf-8', newline='').write(s)
print('CSS written successfully')

# Print the mobile media query for verification
i = s.find('@media (max-width: 640px)')
if i >= 0:
    print()
    print('=== Mobile media query ===')
    print(s[i:i+500])