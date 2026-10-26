p = 'css/style.css'
s = open(p, encoding='utf-8').read()

# Desktop rule: already width:160px height:160px at line 2545-2549. Add flex:none
old1 = ".guide-section-mediabuy .guide-section-img,\n.guide-section-mediabuy .guide-video-thumb {\n  width: 160px;\n  height: 160px;\n}"
new1 = ".guide-section-mediabuy .guide-section-img,\n.guide-section-mediabuy .guide-video-thumb {\n  width: 160px;\n  height: 160px;\n  flex: none;\n}"
assert s.count(old1) == 1, s.count(old1)
s = s.replace(old1, new1, 1)

# Mobile rule: replace flex:1 1 0 width:auto height:auto aspect-ratio with fixed 120px
old2 = """  .guide-section-mediabuy .guide-section-img,
  .guide-section-mediabuy .guide-video-thumb {
    flex: 1 1 0;
    min-width: 0;
    width: auto;
    height: auto;
    aspect-ratio: 1 / 1;
  }"""
new2 = """  .guide-section-mediabuy .guide-section-img,
  .guide-section-mediabuy .guide-video-thumb {
    flex: none;
    min-width: 0;
    width: 120px;
    height: 120px;
  }"""
assert s.count(old2) == 1, s.count(old2)
s = s.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8', newline='').write(s)
print('done')
