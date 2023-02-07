<script>
    import Button from './comps/button.svelte';
import Paging from './comps/paging.svelte'
import {page,pagestarts,bkname,printpagenumber} from './store.ts';
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
$: console.log($printpagenumber)
</script>
<div class="toolbar">
    雲端注釋預覽
    <a href='https://dharmacloud.github.io' target="_new" id="downloadlink"> </a>
    <span>
        <Paging bind:from last={$pagestarts.length-1}/>
    </span>
    <label>頁碼<input type="checkbox" bind:checked={$printpagenumber} caption="x"/></label>
    <Button onclick={print}>💾PDF</Button>

</div>


<style>
.toolbar {user-select: none;}
</style>