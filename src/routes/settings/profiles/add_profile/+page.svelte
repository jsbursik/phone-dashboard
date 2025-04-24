<script lang="ts">
	import CodeEditor from '$lib/code-editor/code-editor.svelte';

	import './add_profile.css';

	const codeValue =
		'# Paste your config here\n# For any dynamic values use "$value" format with $kebab_case\n$money\n$test';

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
		<CodeEditor bind:vars={varArr} language="phone_cfgs" value={codeValue} config={true} />
		<div style="padding-top: 1rem;">
			<div class="form-row">
				<label class="switch">
					<span class="label">Additional Files?</span>
					<input type="checkbox" />
					<span class="slider round"></span>
				</label>
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
