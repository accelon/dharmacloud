<script>
import {onMount,onDestroy} from 'svelte'

import {initdata} from './initdata.ts'
import {splitUnit} from './units.ts';
import {cmhandle} from './store.ts'
let cmeditor;
let value=initdata;
const change=async (cm,obj)=>{
    await splitUnit(cm.doc.getValue())
}
splitUnit(value);
onMount(async ()=>{
    //await loadCodeMirror();
    const codeEle=document.querySelector('.code');
    if (!codeEle) return;
    if (!cmeditor) {
        cmeditor = new CodeMirror(codeEle, {
        value, theme:'ambiance',styleActiveLine:true
        })
        cmeditor.on("change",(cm,obj)=>change(cm,obj));
        cmhandle.set(cmeditor)
    }
    //setEditor(cmeditor);
});
onDestroy(()=>{
    //setEditor(null);
});
</script>
<div class="code"></div>