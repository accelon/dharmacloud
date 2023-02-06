import QRCode from 'qrcode'

const layouts={
    'a4':{
        size:36,
        width:595,
        height:841,
        chargap:3,
        linewidth:1.5,
        // charframe:true,
        topmargin:50,
        rightmargin:30,
        leftmargin:30,
    }
}

const drawCharFrame=(ctx,x,y,w,h)=>{
    ctx.strokeRect(x,y,w,h);
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
const drawQRCode=async(text,x=0,y=0)=>{
    const str=await QRCode.toString(text,{
    type:'svg'});
    const qrwidth=1;
    let svgpath=str.match(/0" d="(.+?)"/)[1].replace(/[\d\.]+/g, (m)=>parseFloat(m)*qrwidth)
    
    svgpath=svgpath.replace(/M(\d+) (\d+)/g,(m,m1,m2)=>{
      return 'M'+(parseFloat(m1)+x)+' '+(parseFloat(m2)+y)
    });

    return svgpath;
  }
const drawUnit=async (ctx,unit,x,y,w,h,vertical=false)=>{
    let {t}=unit;
    if (unit.type=='punc' && t!=='　') {
        if (vertical ) {
            if (~'。，：！？；'.indexOf(t) ){
                x+=h*0.5;
                y+=w*0.5;    
            } else {
                y+=w*0.5;
            }
            if (~'！：；？'.indexOf(t)) {
                y-=w*0.5;
            }
            t=verticalPunc(t);
        }
        if (~'。，！？?；：「『（《」』）》﹁﹃︻︵︽﹂﹄︼︶︾'.indexOf(t)) {
            ctx.fillText(t,x,y+w*0.8)            
        }
    } else if (unit.type=='qrcode') {
        if (unit.t) {            
            const svgdata=await drawQRCode(unit.t,x,y);
            const path = new Path2D(svgdata)
            ctx.stroke(path)    
        }
    } else {

        if (unit.t) {
            if (unit.inverse) {
                ctx.fillStyle='silver';
                ctx.fillRect(x,y,w,h);
                ctx.fillStyle='white';
                ctx.fillText(unit.t,x,y+w*0.8)
                ctx.fillStyle='black';
            }  else {
                ctx.fillText(unit.t,x,y+w*0.8)
            }
            ctx.fillText(unit.t,x,y+w*0.8)
        }
    
    }
}

export const drawGrid=async (units,ctx,opts,start=0)=>{
    const {font,unit_h, unit_v} = opts;
    if (ctx && font) ctx.font=opts.font;
    const {width,height,paper, size,
        topmargin,rightmargin,leftmargin,
        charframe,chargap,linewidth} =layouts[opts.layout];

    let p=start;

    if (ctx) {
        ctx.fillStyle='white';
        ctx.fillRect(0,0,width,height)
        ctx.fillStyle='black';    
    }

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