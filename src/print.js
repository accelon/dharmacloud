import { parseOfftext } from "ptk/nodebundle.cjs";

export const textout=(doc,string,opts={})=>{
    let {x,y,fontsize,font}=opts;
    x=x||0,y=y||0,fontsize=fontsize||16;
  
}
export const printOfftext=(doc,lines)=>{
    for (let i=0;i<lines.length;i++) {
        const [text,tags]=parseOfftext(lines[i]);
        if (tags.length) console.log(tags)
    }
}