
import {openPtk, nodefs,fetchFolioText, parseOfftext} from 'ptk/nodebundle.cjs'
await nodefs;

const ptk=await openPtk('dc')


for (let i=1;i<78;i++) {
    const [raw]=await fetchFolioText(ptk,'vcpp_kumarajiva',i);

    while (raw.length>5) raw.pop();
    for (let j=0;j<raw.length;j++){
        const [text,tags]=parseOfftext(raw[j].replace(/\t/g,''));
        console.log('\t',(j==0?i:'#'+(j+1)),'\t',text)
    }
}
