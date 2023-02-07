import {packInt,
    ptk_version,glob,meta_cbeta,nodefs,writeChanged,readTextContent, readTextLines, escapePackedStr } from 'ptk/nodebundle.cjs'; //ptk/pali
import {readFileSync} from 'fs';
await nodefs;
const buf=Array.from(new Uint8Array(readFileSync('fonts/kaiu.ttf').buffer));

const str=escapePackedStr(packInt(buf));
writeChanged('dist/kaiu.js','window.fonts={"DFKai-SB":`'+str+'`}',true);


