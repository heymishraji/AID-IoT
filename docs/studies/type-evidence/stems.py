import sys, io, urllib.request
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont
import numpy as np
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
urls={'archivo':'https://fonts.gstatic.com/s/archivo/v25/k3kQo8UDI-1M0wlSfdnoLmvDIaI.woff2',
      'atk':'https://fonts.gstatic.com/s/atkinsonhyperlegiblenext/v7/NaPNcYPdHfdVxJw0IfIP0lvYFqijb-UxCtm5_wdGseiJn3q0pkZ_.woff2'}
paths={}
for k,u in urls.items():
    f=TTFont(io.BytesIO(urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':UA})).read())); f.flavor=None
    p=f'{sys.argv[1]}/{k}.ttf'; f.save(p); paths[k]=p
    print(k,'axes',[(a.axisTag,a.minValue,a.defaultValue,a.maxValue) for a in f['fvar'].axes],
          'hhea asc/desc/gap',f['hhea'].ascent,f['hhea'].descent,f['hhea'].lineGap,'upm',f['head'].unitsPerEm,
          'OS2 typo',f['OS/2'].sTypoAscender,f['OS/2'].sTypoDescender,'win',f['OS/2'].usWinAscent,f['OS/2'].usWinDescent,'useTypo',bool(f['OS/2'].fsSelection & (1<<7)))
SIZE=1000
def stem(path, wght, ch='H', scale=1.0):
    ft=ImageFont.truetype(path, int(SIZE*scale))
    axes=ft.get_variation_axes(); vals=[]
    for a in axes:
        n=a['name'] if isinstance(a['name'],str) else a['name'].decode()
        vals.append(wght if n.lower().startswith('weight') else a['default'])
    ft.set_variation_by_axes(vals)
    img=Image.new('L',(int(1400*scale),int(1400*scale)),255); d=ImageDraw.Draw(img); d.text((100,50),ch,font=ft,fill=0)
    a=np.array(img)<128; ys,xs=np.where(a); top,bot=ys.min(),ys.max()
    row=a[int(bot-(bot-top)*0.2)]; xs=np.where(row)[0]
    run=1
    for i in range(1,len(xs)):
        if xs[i]==xs[i-1]+1: run+=1
        else: break
    return run
S_ATK=0.698/0.668
print('weight  archivo_H  atk_H(x1.045)  archivo_n atk_n(x1.045)')
for w in [300,400,500,600,700]:
    print(w, stem(paths['archivo'],w), round(stem(paths['atk'],w)*S_ATK), stem(paths['archivo'],w,'n'), round(stem(paths['atk'],w,'n')*S_ATK))
print('mapping: archivo weight -> atkinson weight with equal H stem after scaling')
atk_tab={w:stem(paths['atk'],w)*S_ATK for w in range(200,801,10)}
for w in [300,400,500,600,700]:
    target=stem(paths['archivo'],w)
    best=min(atk_tab,key=lambda k:abs(atk_tab[k]-target))
    print(w,'->',best,'(stem',target,'vs',round(atk_tab[best]),')')
