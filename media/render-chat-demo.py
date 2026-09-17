from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import json, textwrap
import argparse
parser=argparse.ArgumentParser(description='Render the fictional FDEOps chat walkthrough (requires Pillow).')
parser.add_argument('--font',required=True,help='Path to a monospace TrueType font')
args=parser.parse_args()
ROOT=Path(__file__).resolve().parents[1]
FONT=args.font
W,H=1280,760
BG='#090c0d'; PANEL='#101617'; FG='#ededed'; MUTED='#9daaad'; GREEN='#22ff9c'
def font(size): return ImageFont.truetype(FONT,size)
def draw_scene(scene,index,reveal=True,typed=None):
 im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im)
 d.text((48,28),'FDEOps',font=font(27),fill=GREEN)
 d.text((202,34),'Customer work, in your AI coding agent',font=font(20),fill=FG)
 d.rounded_rectangle((32,86,1248,669),radius=15,fill=PANEL,outline='#344044',width=1)
 for x,c in [(57,'#ef7069'),(80,'#eabd5b'),(103,'#55bd7b')]:d.ellipse((x,108,x+12,120),fill=c)
 d.text((149,104),'agent / '+scene['customer'],font=font(18),fill=MUTED)
 d.line((33,142,1247,142),fill='#344044')
 d.text((64,175),'YOU',font=font(18),fill=GREEN)
 y=211
 for line in textwrap.wrap(scene['prompt'] if typed is None else typed,width=70):
  d.text((64,y),line,font=font(26),fill=FG);y+=38
 y+=28
 if typed is None: d.text((64,y),'FDE',font=font(18),fill=GREEN)
 y+=36
 if reveal:
  for para in scene['answer'].split('\n'):
   for line in textwrap.wrap(para,width=72):
    assert y<625, (scene['customer'],y)
    d.text((64,y),line,font=font(25),fill=FG);y+=35
   y+=12
 elif typed is None:d.text((64,y),'Reading the customer record...',font=font(23),fill=MUTED)
 d.text((48,693),f"{index+1:02d} / 03   {scene['label']}",font=font(20),fill=GREEN)
 d.text((48,728),'Fictional engagements | Actual agent output, shortened | No production actions',font=font(15),fill=MUTED)
 return im
scenes=json.loads((ROOT/'media/chat-demo.json').read_text())['scenes']
frames=[];dur=[]
for n,s in enumerate(scenes):
 for end in range(4,len(s['prompt']),5):
  frames.append(draw_scene(s,n,False,s['prompt'][:end]));dur.append(60)
 frames.extend([draw_scene(s,n,False),draw_scene(s,n)]);dur.extend([500,8500])

draw_scene(scenes[0],0).save(ROOT/'media/chat-demo.png')
frames[0].save(ROOT/'media/chat-demo.gif',save_all=True,append_images=frames[1:],duration=dur,loop=0,optimize=True)
print('Rendered',len(frames),'frames',sum(dur)/1000,'seconds')
