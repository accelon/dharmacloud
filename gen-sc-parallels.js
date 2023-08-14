import {packInt,
    ptk_version,glob,meta_cbeta,nodefs,writeChanged,readTextContent, readTextLines, escapePackedStr } from 'ptk/nodebundle.cjs'; //ptk/pali
await nodefs;

const fn='parallels.json';
if (!fs.existsSync(fn)){
    const res=await fetch('https://raw.githubusercontent.com/suttacentral/sc-data/master/relationship/parallels.json');
    writeChanged(fn ,await res.text());

}
const patterns=[
    ['agms',/sa(\d+)/, '',''], // name, reg, key ,raw
    ['agmss',/sa\-2\.(\d+)/, '',''],
    ['agmm',/ma(\d+)/,'',''] ,
    ['agmd',/da(\d+)/,'',''] ,
    ['agmu',/ea(\d+)\.(\d+)/,'','']  //卷 經
]

const out={};
const parallels=JSON.parse(readTextContent(fn));

const resetpatterns=()=>{
    for (let i=0;i<patterns.length;i++) {
        patterns[i][2]='';
        patterns[i][3]='';
    }
}
for (let i=0;i<parallels.length;i++) {
    const entries=parallels[i].parallels;
    if (!entries||!entries.length)continue;
    
    resetpatterns();
    
    for (let j=0;j<entries.length;j++) {
        const entry=entries[j]
        let count=0;
        for (let k=0;k<patterns.length;k++) {
            const m=entry.match(patterns[k][1]);
            if (m) {
                patterns[k][2]=m[1];
                patterns[k][3]=entry;
                count++;
            }
        }
        if (!count) continue;    
    }
    for (let k=0;k<patterns.length;k++) {
        const [name,reg,key,raw]=patterns[k];
        const par=[]
        if (!raw[0]||raw[0]=='~') continue;
        else {
            
            for (let l=0;l<patterns.length;l++) {
                if (l==k) continue;
                par.push(patterns[l][3]);
            }
        }
        if (!out[name]) out[name]=[];
        out[name].push([ key +'\t'+ par.filter(it=>!!it).join(',') ]);
    }

}
for (let name in out) {
    writeChanged( 'off/parallels-'+name+'.tsv',out[name].sort().join('\n'),true)
}
