from PIL import Image

prod = Image.open('temp/mackie_transparent.png').convert('RGBA')
W, H = 1000, 750
card = Image.new('RGBA', (W, H), (26, 26, 26, 255))

p = prod.copy()
p.thumbnail((W, H), Image.LANCZOS)
card.alpha_composite(p, ((W - p.width) // 2, (H - p.height) // 2))
card.convert('RGB').save('temp/mackie_on_dark.jpg', quality=92)

# zoom on the top-left edge of the left speaker to look for a white halo
zoom = prod.crop((40, 200, 240, 320)).resize((600, 360), Image.NEAREST)
bg = Image.new('RGBA', zoom.size, (26, 26, 26, 255))
bg.alpha_composite(zoom)
bg.convert('RGB').save('temp/mackie_edge_zoom.jpg', quality=92)
print('ok')
