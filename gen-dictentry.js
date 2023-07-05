import {readTextLines, writeChanged,nodefs, fromObj, alphabetically0} from 'ptk/nodebundle.cjs'
await nodefs;

const dictentries=[
{csv:'dc.wikipedia.csv',flag:1} ,//create by ptk listwords dc-dump.txt zhwikiepdia
{csv:'dc.fgdzd.csv',flag:2},
{csv:'dc.dfb.csv',flag:4},
]
const out={};
dictentries.forEach(e=>{
    const data=readTextLines(e.csv);
    for (let i=0;i<data.length;i++) {
        const key=data[i].split(',')[0];
        if (!out [key]) {
            out[key] = e.flag
        } else {
            out[key] += e.flag
        }
    }
})

const arr=fromObj(out,(a,b)=>[a,b]).filter(it=>it[1]>1).sort(alphabetically0).map(it=>it[0]+'\t'+it[1]);
arr.unshift('^:<name=entries preload=true>key	dict=number')
writeChanged('off/zentries.tsv',arr.join('\n'),true);

