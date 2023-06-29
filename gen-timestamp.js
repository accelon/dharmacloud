/*
from: https://docs.google.com/spreadsheets/d/1MVVBbS60aHA1QfQrj9n9ghuUiy5rx6F1rNDBKFa2Ti8/edit#gid=532868174
*/
import { venxinding,dharmadrum,venjianhui,jiangxun,yangdeshi} from './timestamp_vcpp.js'
import { fayewong_pph} from './timestamp_pph.js'
import { fayewongzhang_pphs} from './timestamp_pphs.js'
import {writeChanged,nodefs} from 'ptk/nodebundle.cjs'
await nodefs
const parseTime=str=>{
    let m=0,s=0;
    if (~str.indexOf(':')) {
        [m,s]=str.trim().split(':');
    } else {
        m=str.slice(0,2);
        s=str.slice(2);
    }
    return parseInt(m)*60+parseInt(s);
}
const out=['^:<name=timestamp preload=true>youtube\tbookid\tperformer\ttimestamp=numbers']
const dump=(book,_tracks)=>{
    let prev=0;
    for (let n in _tracks) {
        const lines=_tracks[n].split(/\r?\n/);
        const youtubeid=lines.shift();
        const authorname=lines.shift();
        prev=parseTime(lines[0]);
        const times=[];
        times.push(prev);
        for (let j=1;j<lines.length;j++) {
            const t=parseTime(lines[j]);
            if (t<prev) {
                throw "wrong time stamp "+lines[j];
            }
            times.push(t);
            prev=t;
            
        }
        out.push(youtubeid+'\t'+book+'\t'+authorname+'\t'+times.join(','));
    }
}


const tracks={
    'vcpp_kumarajiva':{venxinding,dharmadrum,venjianhui,jiangxun,yangdeshi},
    'pph':{fayewong:fayewong_pph},
    'pphs':{fayewongzhang:fayewongzhang_pphs},
};
for (let book in tracks) {
    dump(book,tracks[book])
}
writeChanged('off/timestamp.tsv', out.join('\n') ,true)
