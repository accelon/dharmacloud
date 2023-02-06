<script>
    import Button from './comps/button.svelte';
import Paging from './comps/paging.svelte'
import {page,pagestarts} from './store.ts';

let from=0;
$: page.set(from)
</script>
<div>
    <Button>💾PDF</Button>
    <span>
        <Paging bind:from last={$pagestarts.length-1}/>
    </span>
</div>

