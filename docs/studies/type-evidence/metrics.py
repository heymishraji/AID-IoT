import sys
from fontTools.ttLib import TTFont
for p in sys.argv[1:]:
    f=TTFont(p); gs=f.getGlyphSet(); upm=f['head'].unitsPerEm
    from fontTools.pens.boundsPen import BoundsPen
    def h(g):
        b=BoundsPen(gs); gs[f.getBestCmap()[ord(g)]].draw(b); return b.bounds[3]/upm
    def w(g): return f['hmtx'][f.getBestCmap()[ord(g)]][0]/upm
    print(p.split('/')[-1], 'fig4 h=%.3f'%h('4'), 'H=%.3f'%h('H'), 'x=%.3f'%h('x'), 'digit adv=%.3f'%w('4'))
