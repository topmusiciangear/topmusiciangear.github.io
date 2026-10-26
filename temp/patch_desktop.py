s=open('css/overrides.css',encoding='utf-8').read()
old = """  .guide-section-imgs {
    display: grid !important;
    grid-template-columns: auto 1fr 360px !important;
    gap: 4px !important;
    margin-top: 0 !important;
    width: 100% !important;
    overflow: visible !important;
    align-items: start !important;
  }
  .guide-section-imgs > div:first-child {
    grid-column: 1 !important;
  }
  .guide-section-quickfacts {
    grid-column: 2 !important;
    flex: 0 0 auto !important;
    width: 180px !important;
    height: 180px !important;
    padding: 8px 10px !important;
    gap: 4px !important;
  }"""
new = """  .guide-section-imgs {
    display: grid !important;
    grid-template-columns: 300px minmax(0, 1fr) 360px !important;
    gap: 4px !important;
    margin-top: 0 !important;
    width: 100% !important;
    overflow: visible !important;
    align-items: start !important;
  }
  .guide-section-imgs > div:first-child {
    grid-column: 1 !important;
  }
  .guide-section-imgs .guide-section-img,
  .guide-section-imgs .guide-video-thumb {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 1 / 1 !important;
    object-fit: contain !important;
  }
  .guide-section-quickfacts {
    grid-column: 2 !important;
    width: 100% !important;
    margin-right: 8px !important;
    flex: 0 0 auto !important;
  }"""
assert s.count(old)==1, "count "+str(s.count(old))
s=s.replace(old,new)
open('css/overrides.css','w',encoding='utf-8').write(s)
print("ok")
