const fs = require('fs');
const path = require('path');
const {Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, Footer, PageNumber, ExternalHyperlink,
  LevelFormat, AlignmentType, TableOfContents, ImageRun} = require('docx');
const root = path.resolve(__dirname, '../..');
const output = process.argv[2];
if (!output) throw new Error('Usage: node build.cjs /path/to/portfolio.docx');
const clean = s => s.replace(/\*\*/g, '').replace(/`/g, '');
function runs(s) {
  const result = []; let start = 0;
  const links = /\[([^\]]+)\]\(([^)]+)\)/g; let match;
  while ((match = links.exec(s))) {
    if (match.index > start) result.push(new TextRun(clean(s.slice(start, match.index))));
    if (/^https?:\/\//.test(match[2])) result.push(new ExternalHyperlink({link: match[2], children:[new TextRun({text:clean(match[1]), style:'Hyperlink'})]}));
    else result.push(new TextRun(clean(match[1]) + ' (' + match[2] + ')'));
    start = links.lastIndex;
  }
  if (start < s.length) result.push(new TextRun(clean(s.slice(start))));
  return result;
}
function table(lines) {
  const cells = lines.filter(l => !/^\|[\s:|-]+\|$/.test(l)).map(l => l.trim().replace(/^\||\|$/g,'').split('|').map(s=>s.trim()));
  const count = Math.max(...cells.map(r=>r.length));
  const widths = Array(count).fill(Math.floor(9026/count)); widths[count-1] += 9026-widths.reduce((a,b)=>a+b,0);
  const border = {style:BorderStyle.SINGLE,size:3,color:'DCE2E0'};
  return new Table({width:{size:9026,type:WidthType.DXA},columnWidths:widths,
    rows:cells.map((row,i)=>new TableRow({tableHeader:i===0, children:widths.map((width,j)=>new TableCell({
      width:{size:width,type:WidthType.DXA},margins:{top:90,bottom:90,left:100,right:100},
      borders:{top:border,bottom:border,left:border,right:border},
      shading:{fill:i===0?'E8EFEC':'FFFFFF',type:ShadingType.CLEAR},
      children:[new Paragraph({children:runs(row[j]||''),spacing:{after:70}})]
    }))}))});
}
function parse(markdown, project) {
  const lines=markdown.split(/\r?\n/); const out=[]; let para=[];
  const flush=()=>{if(para.length){out.push(new Paragraph({children:runs(para.join(' ')),spacing:{after:130}}));para=[];}};
  for(let i=0;i<lines.length;i++) {
    const l=lines[i];
    if(l.startsWith('```')) {
      flush(); const type=l.slice(3).trim(); const code=[];
      while(++i<lines.length && !lines[i].startsWith('```')) code.push(lines[i]);
      if(type==='mermaid') {
        if (project) out.push(new Paragraph({children:[new ImageRun({type:'png',data:fs.readFileSync(path.join(root,'projects','diagrams',project+'.png')),transformation:{width:540,height:346},altText:{title:project+' workflow',description:'Simplified workflow; detailed behavior and limitations follow.',name:project+'-workflow'}})],spacing:{after:130}}));
      } else for(const row of code) out.push(new Paragraph({children:[new TextRun({text:row||' ',font:'Courier New',size:17})],spacing:{after:25},shading:{fill:'F3F5F4',type:ShadingType.CLEAR}}));
      continue;
    }
    if(l.startsWith('|')) {flush();const rows=[l];while(i+1<lines.length && lines[i+1].startsWith('|'))rows.push(lines[++i]);out.push(table(rows));out.push(new Paragraph({text:''}));continue;}
    const h=l.match(/^(#{1,3})\s+(.+)$/);
    if(h){flush();out.push(new Paragraph({heading:[HeadingLevel.HEADING_1,HeadingLevel.HEADING_2,HeadingLevel.HEADING_3][h[1].length-1],pageBreakBefore:h[1].length===1,children:runs(h[2]),keepNext:true}));if(project==='EREVNA' && /architecture/i.test(h[2])) out.push(new Paragraph({children:[new ImageRun({type:'png',data:fs.readFileSync(path.join(root,'projects','diagrams',project+'.png')),transformation:{width:540,height:346},altText:{title:project+' workflow',description:'Simplified workflow; detailed behavior follows.',name:project+'-workflow'}})]}));continue;}
    const bullet=l.match(/^[-*]\s+(.+)$/);
    if(bullet){flush();out.push(new Paragraph({numbering:{reference:'bullets',level:0},children:runs(bullet[1]),spacing:{after:100}}));continue;}
    if(/^\d+\.\s+/.test(l)){flush();out.push(new Paragraph({children:runs(l),spacing:{after:100}}));continue;}
    if(!l.trim()){flush();continue;}
    para.push(l.trim());
  }
  flush();return out;
}
const children=[
  new Paragraph({children:[new TextRun({text:'RAM',size:24,bold:true,color:'365C4B'})],spacing:{after:300}}),
  new Paragraph({children:[new TextRun({text:'AI Engineering Project Portfolio',size:48,bold:true})],spacing:{after:200}}),
  new Paragraph({children:[new TextRun({text:'Technical briefs, verified changes and interview preparation',size:26,color:'52635D'})],spacing:{after:400}}),
  new Paragraph({text:'Scope: four public repositories. Prepared from inspected code and recorded checks. Tests and local demos are distinguished from live-provider evaluation and production deployment.'}),
  new Paragraph({text:'Repository owner: github.com/ramshetty01. Verification scope and remaining delivery work are recorded for each project.'}),
  new Paragraph({text:'Document snapshot: 11 November 2026. Pull-request status may change after this snapshot.'}),
  new TableOfContents('Contents',{hyperlink:true,headingStyleRange:'1-2'}),
  ...parse(fs.readFileSync(path.join(root,'PROJECT_PORTFOLIO.md'),'utf8'))
];
for(const name of ['EREVNA','PRODUCTION-RAG','realtime-voice-ai-lab','multiagent-software-team'])
  children.push(...parse(fs.readFileSync(path.join(root,'projects',name+'.md'),'utf8'),name));
const doc=new Document({creator:'Ram',title:'AI Engineering Project Portfolio',description:'Code-backed project briefs and verification evidence',
  styles:{default:{document:{run:{font:'Arial',size:21},paragraph:{spacing:{line:280}}}},paragraphStyles:[
    {id:'Heading1',name:'Heading 1',basedOn:'Normal',next:'Normal',quickFormat:true,run:{font:'Arial',size:34,bold:true},paragraph:{outlineLevel:0,spacing:{before:260,after:220}}},
    {id:'Heading2',name:'Heading 2',basedOn:'Normal',next:'Normal',quickFormat:true,run:{font:'Arial',size:26,bold:true},paragraph:{outlineLevel:1,spacing:{before:240,after:130}}},
    {id:'Heading3',name:'Heading 3',basedOn:'Normal',next:'Normal',quickFormat:true,run:{font:'Arial',size:23,bold:true},paragraph:{outlineLevel:2,spacing:{before:180,after:100}}}
  ]},numbering:{config:[{reference:'bullets',levels:[{level:0,format:LevelFormat.BULLET,text:'•',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:360,hanging:180}}}}]}]},
  sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:1200,bottom:1200,left:1440,right:1440}}},
    footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.RIGHT,children:[new TextRun({text:'Ram | Project portfolio | ',size:17,color:'52635D'}),new TextRun({children:[PageNumber.CURRENT],size:17})]})]})},children}]
});
Packer.toBuffer(doc).then(buffer=>{fs.writeFileSync(output,buffer);console.log('Created '+output);});
