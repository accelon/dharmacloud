<script>
import SplitPane  from './3rdparty/splitpane.svelte';
import Preview from './preview.svelte'
import EditorMain from './editormain.svelte';
import {panepos} from './store.ts'
</script>
<div class="wrapper">
<SplitPane type="horizontal" bind:pos={$panepos}>
    <div slot="a">
        <EditorMain/>
    </div>
    <div slot="b">
        <Preview/>
    </div>
</SplitPane>
</div>

<style>
.wrapper {height: 97vh}
</style>
