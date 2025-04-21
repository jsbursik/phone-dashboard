<script lang="ts">
	import CodeEditor from '$lib/code-editor/code-editor.svelte';

	import './add_profile.css';

	let varArr: string[] = [];
</script>

<div class="container-row">
	<div class="container fit">
		<CodeEditor bind:vars={varArr} />
	</div>
	<div class="container fit">
		<h1>Variables:</h1>
		<ul class="var-list" style="color: var(--success-clr)">
			{#each varArr as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
</div>
