<script lang="ts">
	import ModelTable from '$lib/model-list/model-table.svelte';
	import CodeEditor from '$lib/code-editor/code-editor.svelte';
	import Icon from '@iconify/svelte';

	let toggle = $state(false);
</script>

<div class="container">
	<h1>Phone Profiles</h1>
	<ModelTable />
	<button class="btn" style="justify-self: right; margin-top: 4rem; margin-bottom: 0;"
		>Add Profile</button
	>
</div>

<div class={`container sliding-container ${toggle ? '' : 'hidden'}`}>
	<CodeEditor />
</div>
