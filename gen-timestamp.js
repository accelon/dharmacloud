/*
from: https://docs.google.com/spreadsheets/d/1MVVBbS60aHA1QfQrj9n9ghuUiy5rx6F1rNDBKFa2Ti8/edit#gid=532868174
*/
import { venxinding,dharmadrum,venjianhui,jiangxun,yangdeshi,
    vcpp_xuanzang,vcpp_yijing,
    fayewong_youtube,fayewong_qq} from './timestamp_vcpp.js'
import { fayewong_pph} from './timestamp_pph.js'
import { fayewongzhang_pphs,sanskrit_pphs, sanskrit_pphs_sanskrit
    ,jackychang_pphs,kanhojp_pphs,kanhozh_pphs,chant_pphs} from './timestamp_pphs.js'
import {ddm_bhaisajya,zhanyuan_bhaisajya, bhaisajya_huiping} from './timestamp_bhaisajya.js'
import {xincheng_amtb_xuanzang} from './timestamp_amtb_xuanzang.js'
import {ksitigarbha1,ksitigarbha2} from './timestamp_ksitigarbha.js'

import {writeChanged,nodefs} from 'ptk/nodebundle.cjs'
await nodefs
const parseTime=str=>{
    let m=0,s=0,h=0;
    if (~str.indexOf(':')) {
        [m,s]=str.trim().split(':');
    } else {
        h=str.slice(0, str.length-4);
        m=str.slice(str.length-4,str.length-2);
        s=str.slice(str.length-2);
    }
    const t=(parseInt(h)||0)*3600+parseInt(m)*60+parseInt(s);
    return t;
}
const zhout=['^:<name=timestamp preload=true>vid\tvideohost\tbookid\tperformer\ttimestamp=numbers']
const skout=['^:<name=timestamp_sanskrit preload=true>vid\tvideohost\tbookid\tperformer\ttimestamp=numbers']
const dump=(book,_tracks,out)=>{
    let prev=0;
    for (let n in _tracks) {
        const lines=_tracks[n].split(/\r?\n/);
        const videohost=lines.shift();
        const videoid=lines.shift();
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
        out.push(videoid+'\t'+videohost+'\t'+book+'\t'+authorname+'\t'+times.join(','));
    }
}


const tracks={
   'amtb_xuanzang':{xincheng_amtb_xuanzang},
    'vcpp':{venxinding,dharmadrum,venjianhui,jiangxun,yangdeshi,fayewong_qq,fayewong_youtube},
    'vcpp_xuanzang':{vcpp_xuanzang},
    'vcpp_yijing':{vcpp_yijing},
    'pph':{fayewong:fayewong_pph},
    'pphs':{fayewongzhang:fayewongzhang_pphs,sanskrit_pphs,jackychang_pphs,kanhojp_pphs,kanhozh_pphs,chant_pphs},
    'bhaisajya':{ddm_bhaisajya,zhanyuan_bhaisajya,bhaisajya_huiping},
'ksitigarbha1':{ksitigarbha1},
'ksitigarbha2':{ksitigarbha2}
}
const sktracks={
    'pphs':{sanskrit_pphs_sanskrit,sanskrit_pphs_sanskrit2:sanskrit_pphs_sanskrit},
}
for (let book in tracks) {
    dump(book,tracks[book],zhout)
}
writeChanged('off/timestamp.tsv', zhout.join('\n') ,true)

for (let book in sktracks) {
    dump(book,sktracks[book],skout)
}
writeChanged('off/timestamp_sanskrit.tsv', skout.join('\n') ,true)

