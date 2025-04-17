<script lang="ts">
	import './code-editor.css';
	import 'prism-code-editor/layout.css';
	import 'prism-code-editor/scrollbar.css';
	import 'prism-code-editor/themes/dracula.css';

	import './languages';
	import { txt } from './example';

	import { onMount } from 'svelte';

	let vars: string[] = [];

	async function createCodeEditor() {
		const { createEditor } = await import('prism-code-editor');

		const editor = createEditor('#editor', {
			language: 'phone_cfgs',
			value: txt,
			onUpdate: (c) => {
				const reg = /\$\{([^}]+)\}/g;
				console.log(c.match(reg));
			}
		});
	}

	onMount(async () => {
		createCodeEditor();
	});
</script>

<div id="editor"></div>
