<script lang="ts">
	import CodeEditor from '$lib/code-editor/code-editor.svelte';

	import './add_profile.css';

	let varArr: string[] = [];
</script>

<div class="container-row">
	<div class="container fit">
		<div class="form-group" style="margin: 1rem auto;">
			<div class="form-row">
				<span class="form-control">
					<label for="model">Model:</label>
					<input type="text" id="model" />
				</span>
			</div>
		</div>
		<CodeEditor bind:vars={varArr} />
		<div style="padding-top: 1rem;">
			<div class="form-row">
				<button class="btn btn-primary" style="margin-left: auto">Submit</button>
			</div>
		</div>
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
