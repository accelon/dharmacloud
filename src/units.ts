import {pagesetting,renderUnits,pagestarts,bkname } from './store.ts'
import {parseOfftext,CJKRangeName,splitUTF32Char} from 'ptk'
import {get} from 'svelte/store';
import { drawGrid } from './grid.ts';
const calPage=async (units)=>{
    let p=0,out=[0];
    while (p<units.length) {
        p=await drawGrid(units,null,get(pagesetting),p);
        out.push(p);
    }
    out.push(p);
    return out;    
}
export const splitUnit=async (value)=>{

    const [text,tags]=parseOfftext(value);
    const chars=splitUTF32Char(text);
    let ntag=0, lineoff=0,ck='',tag, 
    inverse=false,closeat=0;
    const units=[];
    for (let i=0;i<chars.length;i++) {
        const ch=chars[i];
        const cjkrange=CJKRangeName(ch);
        tag=tags[ntag];
        if (closeat==i) {
            inverse=false;
            closeat=-1;
        }
        if (tag?.choff==i) {
            if (tag.name=='ck') {
                ck=tag.attrs.id;
                inverse=true;
                closeat=tag?.choff+tag?.width;
            } else if (tag.name=='bk') {
                bkname.set(tag.attrs.id);
            }
            ntag++;
            lineoff=0;
        }

        if (cjkrange) {

            units.push({adv:true,t:ch,inverse});
        } else {
            if (ch=='\n') {
                if (i&& chars[i-1]!=='\n') {
                    units.push({adv:true, t:'https://dharma.github.io/?'+ck+':'+lineoff ,  type:'qrcode'})
                }
                lineoff++;
            }
            units.push({adv:false,t:ch,type:'punc'});
        }
    }
    renderUnits.set(units);
    const starts= await calPage(units);
    pagestarts.set(starts);
}