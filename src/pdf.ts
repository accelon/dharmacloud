//import PDFDocument from "pdfkit/js/pdfkit.standalone.js";
// import {blobStream} from "./blob-stream.js";
import {printpagenumber, pagelayout,pagestarts,renderUnits } from "./store.ts";
import {unpackInt} from 'ptk'
import { layouts } from './layout.ts';

import {drawGrid} from './grid.ts'
import {get} from 'svelte/store'
export const printPDF=async (cb)=>{
  const doc = new PDFDocument({'margin':0,size:'A4'});
  const layout=layouts[get(pagelayout)];
  const fontdata=new Uint8Array( unpackInt(window.fonts[layout.fontname]));

  doc.registerFont('DFKai-SB',fontdata);

  const stream=doc.pipe(blobStream());

  const pagecount=get(pagestarts).length-2;
  const units=get(renderUnits);
  for (let i=0;i<pagecount;i++) {
    const pagenumber=get(printpagenumber)?i+1:'';
    await drawGrid(units,doc,get(pagelayout), get(pagestarts)[i], pagenumber);
    if (i<pagecount-1) doc.addPage();
  }
  
  doc.end();
  stream.on('finish',function(){
    // or get a blob URL for display in the browser
    const url = stream.toBlobURL('application/pdf');
    cb(url)
  });
}