//import PDFDocument from "pdfkit/js/pdfkit.standalone.js";
// import {blobStream} from "./blob-stream.js";
import {printpagenumber, pagesetting,pagestarts,renderUnits } from "./store.ts";
import {unpackInt} from 'ptk'
import {drawGrid} from './grid.ts'
import {get} from 'svelte/store'
export const printPDF=async (cb)=>{
  const doc = new PDFDocument({'margin':0});
  const stream=doc.pipe(blobStream());
  const setting=get(pagesetting);

  doc.registerFont('DFKai-SB',new Uint8Array( unpackInt(window.fonts[setting.fontname])));

  const pagecount=get(pagestarts).length-2;
  const units=get(renderUnits);
  for (let i=0;i<pagecount;i++) {
    const pagenumber=get(printpagenumber)?i+1:'';
    await drawGrid(units,doc,get(pagesetting), get(pagestarts)[i], pagenumber);
    if (i<pagecount-1) doc.addPage();
  }
  
  doc.end();
  stream.on('finish',function(){
    // or get a blob URL for display in the browser
    const url = stream.toBlobURL('application/pdf');
    cb(url)
  });
}