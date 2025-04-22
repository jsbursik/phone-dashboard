<script lang="ts">
	import './code-editor.css';
	import 'prism-code-editor/layout.css';
	import 'prism-code-editor/scrollbar.css';
	import 'prism-code-editor/themes/dracula.css';

	import './languages';

	import { onMount } from 'svelte';

	let { vars = $bindable(), ...props } = $props();

	vars = [];

	async function createCodeEditor() {
		const { createEditor } = await import('prism-code-editor');

		const editor = createEditor('#editor', {
			language: 'phone_cfgs',
			value:
				'# Paste your config here\n# For any dynamic values use "$value" format with $kebab_case\n$money\n$test',
			onUpdate: (code) => {
				const reg = /(?<!#.*)\$\S*/g;
				vars = code.match(reg) as string[];
			}
		});
	}

	onMount(async () => {
		createCodeEditor();
	});
</script>

<div id="editor"></div>
