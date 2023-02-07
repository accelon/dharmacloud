import QRCode from 'qrcode'

const layouts={
    'a4':{
        size:36,
        width:595,
        height:841,
        chargap:3,
        linewidth:1.5,
        // charframe:true,
        topmargin:30,
        rightmargin:30,
        leftmargin:30,
    }
}

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
const drawText=(ctx,t,x,y,w,h)=>{
    if (ctx instanceof CanvasRenderingContext2D) {
        y+=w*.8;
        ctx.fillText(t,x,y)
    } else {
        ctx.fontSize(36);
        ctx.font('DFKai-SB')
        ctx.text(t,x,y);
    }
}
const drawUnit=async (ctx,unit,x,y,w,h,vertical=false)=>{
    let {t}=unit;
    if (unit.type=='punc' && t!=='　') {
        if (vertical ) {
            if (~'。，：！？；'.indexOf(t) ){
                x+=h*0.6;
                y+=w*0.25;    
            } else {
                y+=w*0.25;
            }
            if (~'！：；？'.indexOf(t)) {
                // y-=w*0.5;
            }
            t=verticalPunc(t);
        }
        //「『（《」』）》﹁﹃︻︵︽﹂﹄︼︶︾ , pdf cannot draw correctly, create new page
        if (~'。，！？?；：'.indexOf(t)) {
            drawText(ctx,t,x,y,w,h)
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
            drawText(ctx,unit.t,x,y,w,h)
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
const drawPagenumber=(ctx,pagenumber,opts)=>{
    if (!ctx)return;
    const {width,height}=layouts[opts.layout];
    const {fontsize,fontname}=opts;
    setFont(ctx,16,'Courier');
    drawText(ctx,pagenumber,width/2,5, opts.fontsize,opts.fontsize);
    setFont(ctx,fontsize,fontname)
}
export const drawGrid=async (units,ctx,opts,start=0,pagenumber='')=>{
    const {fontsize,fontname,unit_h,unit_v} = opts;
    
    let {width,height,paper, size,
        topmargin,rightmargin,leftmargin,
        charframe,chargap,linewidth} =layouts[opts.layout];

    let p=start;

    clearPaper(ctx,width,height);
    setFont(ctx,fontsize,fontname)
    

    pagenumber&&drawPagenumber(ctx,pagenumber,opts);

    let x=0,y=0,w=size,h=size, unit;
    if (unit_h*1.5>unit_v) { //horizontal
        y=topmargin;
        for (let i=0;i<unit_h;i++) {
            x=leftmargin;
            for (let j=0;j<unit_v;j++) {
                if (charframe&&ctx) drawCharFrame(ctx,x,y,w,h);

                unit && ctx && await drawUnit(ctx,units[p],x,y,w,h);
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
                units[p] && ctx  && await drawUnit(ctx,units[p],x,y,w,h,true);                
                p++;
                while (units[p]&&!units[p].adv)  {
                    units[p] && ctx  && await drawUnit(ctx,units[p],x,y,w,h,true);                
                    p++;
                }
                 y+=(size+chargap);
            }
            x -=  Math.floor(size*linewidth);
        }
    }
    return p;
}