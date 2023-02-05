<script>
import {onMount} from 'svelte'
import QRCode from 'qrcode';

const drawQRCode=async (text,x=0,y=0)=>{
  const str=await QRCode.toString(text,{
    errorCorrectionLevel: 'L' ,type:'svg'});
  const qrwidth=1;
  let svgpath=str.match(/0" d="(.+?)"/)[1].replace(/[\d\.]+/g, (m)=>parseFloat(m)*qrwidth)
  
  svgpath=svgpath.replace(/M(\d+) (\d+)/g,(m,m1,m2)=>{
    return 'M'+(parseFloat(m1)+x)+' '+(parseFloat(m2)+y)
  });

  return svgpath;
}
onMount(async ()=>{
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
   
    const svgdata=await drawQRCode('https://ACCELON.GITHUB.IO/CM:DG:2451',210,25);
    const svgdata2=await drawQRCode('https://dharma.github.io/abcsdawdafffff',20,70);

    ctx.lineWidth=1;
    const path = new Path2D(svgdata)
    const path2 = new Path2D(svgdata2)
    // let path1 = new Path2D();
    // path1.rect(10, 10, 100, 100);

    // let path2 = new Path2D(path1);
    // path2.moveTo(220, 60);
    // path2.arc(170, 60, 50, 0, 2 * Math.PI);

    //ctx.stroke(path2);
    ctx.stroke(path)
    ctx.stroke(path2)

    ctx.font='32px DFKai-SB'
    ctx.fillText('如是我聞一時  佛在舍衛城祇樹給孤獨園',20,50)
})
</script>


<canvas id="canvas" width="595" height="841" style="background:white">
</canvas>