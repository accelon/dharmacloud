import {nodefs,writeChanged,readTextContent, readTextLines, fromObj } from 'ptk/nodebundle.cjs'; //ptk/pali
await nodefs;
let clsmissmatch=0,zhmissmatch=0, lemmacount=0,repeatcount=0;
const parseDictLine=line=>{
    let [head,body]= line.split('：');
    if (!body) console.log(line)
    head=(head||'').replace(/\d+、/,'').trim();
    let  [lemma,root]=head.split(/[\(（]/);
    root=(root||'').replace(/[\)）]/,'').trim();

    let [cls,languages]=body.split('。');
    cls=(cls||'').trim().split(/[，、]/).join('|')
    let zh='',tb='',en='';
    if (!languages) {
        console.log(line)
    } else {
        [zh,tb,en]=languages.split('，');
    }
    tb=(tb||'').trim();
    en=en||'';
    
    const m= (tb||'').match(/([āŚa-z].+)/i);
    if (m) {
        en=m[1];
        tb=tb.slice(0,m.index);
        // console.log(en,tb)
    }

    if (zh.match(/[a-z]/)) {
        // console.log(zh)
    }
    lemma=lemma.trim();
    return {lemma,root,cls,zh,tb,en}
}
const lines=readTextLines('nissaya.off');
const sentences={};
let sents=[],dict={},dicts=[];
const linkwords=(sents,dictentries)=>{

}

const addField=(entry, fieldname, value)=>{
    if (value==entry[fieldname] ) return '';

    if (typeof entry[fieldname]=='string') {
        entry[fieldname]=[entry[fieldname]];
        entry[fieldname].push(value);
    } else {
        if (!entry[fieldname]) console.log(fieldname,value,entry)
        const at=entry[fieldname].indexOf(value);
        if (at==-1) {
            entry[fieldname].push(value);
        }
    }
}
for (let i=0;i<lines.length;i++) {
    const line=lines[i];
    if (~line.indexOf('^o')) {
        const parts=line.split(/\^o(\d+\.\d+)/);
        parts.shift();
        if (dicts.length) {
            linkwords(sents,dicts)
        }
        sents=[];
        dicts=[];
        for (let i=0;i<parts.length >>1;i++) {
            sentences[parts[i*2]]={text:parts[i*2+1], words:[] }
            sents.push(parts[i*2]);
        }
    } else if (line.match(/^\d+、/)) {
        const {lemma,root,cls,zh,tb,en}=parseDictLine(line);
        lemmacount++;
        if (!dict[lemma]) {
            dict[lemma]={lemma,root,cls,zh,tb,en,count:1};
        } else {
            const entry=dict[lemma];
            repeatcount++;
            // if (root!==entry.root) console.log(lemma,'root missmatch',entry.root,root);
            entry.count++;
            addField(entry,'cls',cls);
            addField(entry,'zh',zh);
            addField(entry,'tb',tb);
            addField(entry,'en',en);

            // if (cls!==entry.cls) {
            //     // console.log(lemma,'cls missmatch',entry.cls,cls);
            //     // clsmissmatch++;
            // }
            // if (zh!==entry.zh) {
            //     console.log(lemma,'zh missmatch',entry.zh,zh);
            //     zhmissmatch++;
            // }
            //if (tb!==entry.tb) console.log(lemma,'tb missmatch',entry.tb,tb);
            //if (en!==entry.en) console.log(lemma,'en missmatch',entry.en,en);
        }
        dicts.push(lemma);      
        // console.log(line)
    }
}
//  console.log(clsmissmatch,'clsmissmatch')
//  console.log(zhmissmatch,'zhmissmatch')
//  console.log(lemmacount,'lemmacount')
//  console.log(repeatcount,'repeatcount')

const arr=fromObj(dict,(a,b)=>[b.lemma+'\t'+b.count+'\t'+b.root+'\t'+b.zh+'\t'+b.cls]);

writeChanged('vcppdict.tsv',arr.join('\n'),true)
writeChanged('vcppdict.json',JSON.stringify(dict,'',' '),true)
// console.log(dict)