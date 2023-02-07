<script>
    import Button from './comps/button.svelte';
import Paging from './comps/paging.svelte'
import {page,pagestarts,bkname} from './store.ts';
import {printPDF} from './pdf.ts';

let from=0;
$: page.set(from);
export const print=()=>{
    printPDF(url=>{
        const ele=document.getElementById('downloadlink');
        ele.href=url;
        ele.download=$bkname+'.pdf';
        ele.click();
    })
}
</script>
<div>
    <Button onclick={print}>💾PDF</Button>
    <a href='#' target="_new" id="downloadlink"></a>
    <span>
        <Paging bind:from last={$pagestarts.length-1}/>
    </span>
</div>

