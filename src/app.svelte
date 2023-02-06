<script>
import SplitPane  from './3rdparty/splitpane.svelte';
import Preview from './preview.svelte'
import EditorMain from './editormain.svelte';
import {panepos,renderUnits} from './store.ts'

</script>
<div class="wrapper">
<SplitPane type="horizontal" bind:pos={$panepos}>
    <div slot="a">
        <EditorMain />
    </div>
    <div slot="b">
        <Preview units={$renderUnits}/>
    </div>
</SplitPane>
</div>

<style>
.wrapper {height: 97vh}
</style>
