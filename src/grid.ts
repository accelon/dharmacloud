import QRCode from 'qrcode'
import { layouts } from './layout.ts';


const drawCharFrame=(ctx,x,y,w,h)=>{
    if (ctx instanceof CanvasRenderingContext2D) {
        ctx.strokeRect(x,y,w,h);
    } else {
        ctx.rect(x,y,w,h).stroke();
    }
}
const verticalPunc=t=>{
    let at= '「『（【〔《'.indexOf(t);
    if (~at) {
        return '﹁﹃︵︻︹︽'.charAt(at);
    }
    
    at= '」』）】〕》'.indexOf(t);
    if (~at) {
        return '﹂﹄︶︼︺︾'.charAt(at);
    }    
    return t;
}
const genQRCode=async(text,x=0,y=0)=>{
    const str=await QRCode.toString(text,{
    type:'svg'});
    const qrwidth=1;
    let svgpath=str.match(/0" d="(.+?)"/)[1].replace(/[\d\.]+/g, (m)=>parseFloat(m)*qrwidth)
    
    svgpath=svgpath.replace(/M(\d+) (\d+)/g,(m,m1,m2)=>{
      return 'M'+(parseFloat(m1)+x)+' '+(parseFloat(m2)+y)
    });

    return svgpath;
}
const drawSVG=(ctx,svg)=>{
    if (ctx instanceof CanvasRenderingContext2D) {
        const path = new Path2D(svg)
        ctx.stroke(path) ;
    } else {
        ctx.path(svg).stroke();
    }
}
const drawText=(ctx,t,x,y,w,h,layout)=>{
    setFont(ctx,layout.fontsize,layout.fontname);
    if (ctx instanceof CanvasRenderingContext2D) {
        y+=w*.8;
        ctx.fillText(t,x,y)
    } else {
        ctx.text(t,x,y);
    }
}
const drawUnit=async (ctx,unit,x,y,w,h,layout)=>{
    let {t}=unit, fontratio=1;
    if (unit.type=='punc' && t!=='　') {
        if (layout.vertical ) {
            t=verticalPunc(t);
            if (~'。，：！？；'.indexOf(t) ){
                x+=h*0.6;
                y+=w*0.5;    
            } else {
                y+=w*0.5;
            }
            if (~'「『」』﹁﹃﹂﹄'.indexOf(t)) {
                
                if (~'﹂﹄'.indexOf(t)) {
                    y+=w*0.1;
                }
            }
            if (~'！？'.indexOf(t)) {
                x+=h*0.15;
                y-=w*0.15;
                fontratio=0.6;
            }
            
        }
        //「『（《」』）》﹁﹃︻︵︽﹂﹄︼︶︾ , pdf cannot draw correctly, create new page
        if (~'。，！？?；：「『」』﹁﹃﹂﹄'.indexOf(t)) {
            const fontsize=layout.fontsize;
            layout.fontsize=fontsize*fontratio;
            drawText(ctx,t,x,y,w,h,layout);
            layout.fontsize=fontsize;
        }
    } else if (unit.type=='qrcode') {
        if (unit.t) {            
            const svgdata=await genQRCode(unit.t,x,y);
            drawSVG(ctx,svgdata);
 
        }
    } else {
        if (unit.t) {
            if (unit.inverse) {
                drawCharFrame(ctx,x,y,w,h);
            }
            drawText(ctx,unit.t,x,y,w,h,layout)
        }
    
    }
}
const clearPaper=(ctx,width,height)=>{
    if (!ctx)return;
    if (ctx instanceof CanvasRenderingContext2D) {
        ctx.fillStyle='white';
        ctx.fillRect(0,0,width,height)
        ctx.fillStyle='black';       
    }
}

const setFont=(ctx,fontsize,fontname)=>{
    if (!ctx)return;
    if (ctx instanceof CanvasRenderingContext2D) {
        ctx.font=fontsize+'px '+fontname;
    } else {      
        ctx.fontSize(fontsize);
        ctx.font(fontname);
    }
}
const drawPagenumber=(ctx,pagenumber,layout)=>{
    if (!ctx)return;
    const {width,height,fontsize,fontname}=layout;
    setFont(ctx,16,'Courier');
    drawText(ctx,pagenumber,width/2,5, layout);
    setFont(ctx,fontsize,fontname)
}
export const drawGrid=async (units,ctx,layoutname,start=0,pagenumber='')=>{
    const layout=layouts[layoutname];
    let {width,height,paper, size,
        fontsize,fontname,unit_h,unit_v,
        topmargin,rightmargin,leftmargin,
        charframe,chargap,linewidth} = layout;

    let p=start;

    clearPaper(ctx,width,height);
    setFont(ctx,fontsize,fontname)
    
    pagenumber&&drawPagenumber(ctx,pagenumber,layout);

    let x=0,y=0,w=size,h=size, unit;
    if (unit_h*1.5>unit_v) { //horizontal
        y=topmargin;
        for (let i=0;i<unit_h;i++) {
            x=leftmargin;
            for (let j=0;j<unit_v;j++) {
                if (charframe&&ctx) drawCharFrame(ctx,x,y,w,h);

                unit && ctx && await drawUnit(ctx,units[p],x,y,w,h,layout);
                p++;
                unit=units[p];
                while (unit && !unit.adv) {
                    p++;
                    unit=units[p];    
                }
                x+=size+chargap;
            }
            y+= Math.floor(size*linewidth);
        }
    } else {
        x=width-size-rightmargin;
        for (let i=0;i<unit_h;i++) {
            y=topmargin;
            for (let j=0;j<unit_v;j++){
                if (charframe&&ctx) drawCharFrame(ctx,x,y,w,h);
                units[p] && ctx  && await drawUnit(ctx,units[p],x,y,w,h,layout);                
                p++;
                while (units[p]&&!units[p].adv)  {
                    units[p] && ctx  && await drawUnit(ctx,units[p],x,y,w,h,layout);                
                    p++;
                }
                 y+=(size+chargap);
            }
            x -=  Math.floor(size*linewidth);
        }
    }
    return p;
}