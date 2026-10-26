s = open('css/style.css', encoding='utf-8').read()

# Exact pattern from the file
old = '''@media (max-width: 640px) {
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
    width: 50%;
    height: 50%;
  }
}'''

new = '''@media (max-width: 640px) {
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

count = s.count(old)
print(f'Pattern found {count} times')
if count > 0:
    s = s.replace(old, new, 1)
    open('css/style.css', 'w', encoding='utf-8', newline='').write(s)
    print('CSS updated successfully')
else:
    print('Pattern NOT found - showing what we have:')
    # Try partial replacement
    i = s.find('@media (max-width: 640px)')
    if i >= 0:
        print(s[i:i+500])