<script lang="ts">
	import ModelTable from '$lib/model-list/model-table.svelte';
	import CodeEditor from '$lib/code-editor/code-editor.svelte';

	let toggle = false;
</script>

<div class="container">
	<ModelTable />

	<button onclick={() => (toggle = !toggle)}>toggle</button>
</div>

<div class={`container ${toggle ? '' : 'hidden'}`}>
	<CodeEditor />
</div>
