s = open('css/style.css', encoding='utf-8').read()

# Replace the mobile media query with grid approach
old = '''\@media (max-width: 640px) {
  .guide-section-mediabuy {
    flex-direction: row;
  }
  .guide-section-mediabuy > .guide-section-buy {
    flex: 1 1 100%;
    width: 100%;
    max-width: none;
    margin-top: 16px;
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
  }
}'''

new = '''\@media (max-width: 640px) {
  .guide-section-mediabuy {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    width: 100%;
  }
  .guide-section-mediabuy > .guide-section-buy {
    grid-column: 1 / -1;
    width: 100%;
    max-width: none;
    margin-top: 16px;
    order: 2;
  }
  .guide-section-mediabuy > .guide-section-imgs {
    width: 100%;
  }
  .guide-section-mediabuy .guide-section-img,
  .guide-section-mediabuy .guide-video-thumb {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: contain;
    margin: 0;
  }
}'''

if old in s:
    s = s.replace(old, new, 1)
    print('Replaced with grid approach')
else:
    print('Pattern not found')
    # Debug: show what we're looking for
    print('Looking for pattern starting at:', s.find(old[:50]) if old in s else 'not found')

# Write
open('css/style.css', 'w', encoding='utf-8', newline='').write(s)
print('CSS written')