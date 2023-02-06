<script>
import {onMount} from 'svelte'
import QRCode from 'qrcode';
import {drawGrid}  from './grid.ts';
import {pagesetting,pagestarts,page} from './store.ts'
export let units;
let ctx;

onMount(async ()=>{
    const canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

   
    // const svgdata=await drawQRCode('https://ACCELON.GITHUB.IO/CM:DG:2451xxxxx',210,23);
    // const svgdata2=await drawQRCode('https://dharma.github.io/abcsdawdafffff',20,70);

    // ctx.lineWidth=1;
    // const path = new Path2D(svgdata)
    // const path2 = new Path2D(svgdata2)
    // let path1 = new Path2D();
    // path1.rect(10, 10, 100, 100);

    // let path2 = new Path2D(path1);
    // path2.moveTo(220, 60);
    // path2.arc(170, 60, 50, 0, 2 * Math.PI);

    //ctx.stroke(path2);
    // ctx.stroke(path)
    // ctx.stroke(path2)

    // ctx.font='32px DFKai-SB'
    // ctx.fillText('如是我聞一時佛在舍衛城祇樹給孤獨',20,50)
    
    // const units='如是我聞一時佛在舍衛城祇樹給孤獨園與大比丘僧千二百五十人'.split('').map(it=>{
    //     return {adv:true,t:it}
    // })
    
    //unit_h:14,unit_v:14,  horizontal
    //            vertical
    
})
$: ctx&&units&& drawGrid(units,ctx,$pagesetting, $pagestarts[$page]);
</script>


<canvas id="canvas" width="595" height="841" style="background:white">
</canvas>