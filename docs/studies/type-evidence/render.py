import sys, re, os, io, urllib.request
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
dl, out = sys.argv[1], sys.argv[2]
fams = sys.argv[3].split('|')
get = lambda u: urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent': UA}), timeout=20).read()
rows = []
for name in fams:
    p = os.path.join(dl, re.sub(r'\W', '_', name) + '.ttf')
    try:
        if not os.path.exists(p):
            css = get(f"https://fonts.googleapis.com/css2?family={name.replace(' ', '+')}").decode()
            url = re.search(r"/\* latin \*/[^}]*?url\((https://[^)]+)\)", css, re.S).group(1)
            f = TTFont(io.BytesIO(get(url))); f.flavor = None; f.save(p)
        rows.append((name, p))
    except Exception as e:
        print('fail', name, e)
W = 1400; RH = 92
img = Image.new('RGB', (W, RH * len(rows) + 10), 'white'); d = ImageDraw.Draw(img)
lab = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 17)
for i, (name, p) in enumerate(rows):
    y = 6 + i * RH
    d.text((10, y + 30), name, fill=(80, 80, 80), font=lab)
    d.text((270, y + 2), "0123456789   4 44 14 41", fill='black', font=ImageFont.truetype(p, 50))
    d.text((270, y + 62), "MH 12 AB 4471 · 14:41:04 · Rs 4,471 · 18°34′N · battery 41%", fill='black', font=ImageFont.truetype(p, 19))
    d.line((0, y + RH - 3, W, y + RH - 3), fill=(225, 225, 225))
img.save(out); print(len(rows), 'rendered ->', out)
