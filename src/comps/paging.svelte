<script>
export let from=0;
export let last;
const PAGESIZE=1;
import Button from './button.svelte';

const prev=()=>{
    from-=PAGESIZE
    if (from<0) from=0;
}
const next=()=>{
    if (from+1 < last) from+=PAGESIZE;
}
</script>
<Button onclick={prev}>{from+1}/</Button><Button onclick={next}>{last}</Button>
