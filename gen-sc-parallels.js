import {fromObj,nodefs,writeChanged,readTextContent, unique } from 'ptk/nodebundle.cjs'; //ptk/pali
await nodefs;
import {mapaddress} from './mapaddress.js'
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
    ['agmu',/ea([\d\.]+)/,'','']  //卷 經
]

const out={};
const parallels=JSON.parse(readTextContent(fn));

/*

  "parallels": ["sn7.6","sa-2.100","sa1186-1187"]

  目前連號經只會 取第一個


.replace(/"sa(\d+)\-(\d+)"/g,(m,m1,m2)=>{
    const from=parseInt(m1);//將sa連號分解成多個，之後好處理
    const to=parseInt(m2);
    const out=[];
    for (let i=from;i<=to;i++) {
        out.push('"sa'+i+'"');
    }
    return out.join(',');
}));
*/

writeChanged('convert.txt',JSON.stringify(parallels,'',' '))
const makeAddress=(entry,name,id)=>{
    if (name=='agmss') return 'bk#agmss.n#'+id;
    else if (name=='agms') {
        const ids=id.split('-')
        return ids.map(id=>'bk#agms.n#'+id).join(',');
    }
    else if (name=='agmu') {
        const [pin,n]=id.split('.');
        return 'bk#agmu.ck#'+pin+'.n#'+n;
    } else if (name=='agmd') {
        return 'bk#agmd.ck#'+id;
    } else if (name=='agmm') {
        return 'bk#agmm.ck#'+id;
    }
    return entry;
}
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
        const entry=entries[j];
        let count=0;
        for (let k=0;k<patterns.length;k++) {
            const m=entry.match(patterns[k][1]);
            if (m) {
                
                patterns[k][2]=m[1];
                patterns[k][3]=makeAddress(entry,patterns[k][0],m[1]);
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
                let scraw=patterns[l][3];
                if (~scraw.indexOf('#t')) {
                    scraw=mapaddress[scraw];
                    //console.log(name,key,scraw)
                }
                par.push(scraw);
            }
        }
        
        const par2=par.filter(it=>!!it);
        if (par2.length) {
            if (!out[name]) out[name]=[];
            if (!out[name][key]) out[name][key]=[];
            out[name][key].push( ...par );
        }
    }
}


for (let name in out) {
    const arr=fromObj(out[name],(a,b)=>a+'\t' +unique(b.filter(it=>!!it)).join(','));
    arr.sort();
    arr.unshift('^:<name=par_'+name+' preload=true>id	parallels')
    writeChanged( 'off/parallels-'+name+'.tsv',arr.join('\n'),true)
}
