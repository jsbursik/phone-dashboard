<script lang="ts">
	import { basicEditor } from 'prism-code-editor/setups';
	import 'prism-code-editor/prism/languages/markup';

	import { onMount } from 'svelte';

	let container: HTMLDivElement;
	let codeEditor: HTMLDivElement;

	onMount(() => {
		codeEditor = document.createElement('div');
		codeEditor.id = 'code-editor';
		container.appendChild(codeEditor);

		const editor = basicEditor(
			'#code-editor',
			{
				language: 'markup',
				theme: 'github-dark'
			},
			() => console.log('Ready')
		);
	});

	export const csr = false;
</script>

<div bind:this={container} class="container">Hello World</div>
