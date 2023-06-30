import {fetchFolioText,openPtk,writeChanged,nodefs} from 'ptk/nodebundle.cjs'

await nodefs;
const book=process.argv[3]||'bhaisajya';
const ptk=await openPtk('dc');

const [text]=await fetchFolioText(ptk,book);
const lines=text.join('\n').replace(/\^pb/g,'\n^pb').split('\n')
let nsentence=0,pb,out=[];
for (let i=0;i<lines.length;i++) {
    let line=lines[i];
    const m=line.match(/^\^pb(\d+)/);
    if (m) {
        pb=m[1];
        nsentence=0;
        line=line.slice(m[0].length);
        
    }
    out.push('\t'+ (nsentence?'#'+(nsentence+1):pb)+'\t'+line.replace(/\t/g,''));
    nsentence++;
}

writeChanged(book+'-folio.tsv',out.join('\n'),true)
