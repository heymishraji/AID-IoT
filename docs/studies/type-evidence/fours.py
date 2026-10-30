import sys, os, glob, re
from PIL import Image, ImageDraw, ImageFont
dl, out = sys.argv[1], sys.argv[2]
files = sorted(glob.glob(os.path.join(dl, '*.ttf')))
cols = 6; cw, ch = 230, 190
img = Image.new('RGB', (cols * cw, ((len(files) + cols - 1) // cols) * ch), 'white'); d = ImageDraw.Draw(img)
lab = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 15)
for i, p in enumerate(files):
    x, y = (i % cols) * cw, (i // cols) * ch
    d.text((x + 8, y + 6), os.path.basename(p)[:-4].replace('_', ' '), fill=(90, 90, 90), font=lab)
    d.text((x + 10, y + 26), "4 0", fill='black', font=ImageFont.truetype(p, 110))
    d.text((x + 10, y + 150), "4471 14:41", fill='black', font=ImageFont.truetype(p, 22))
    d.rectangle((x, y, x + cw - 1, y + ch - 1), outline=(225, 225, 225))
img.save(out); print(len(files), 'fonts')
