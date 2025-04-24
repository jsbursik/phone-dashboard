<script lang="ts">
	import './code-editor.css';
	import 'prism-code-editor/layout.css';
	import 'prism-code-editor/scrollbar.css';
	import 'prism-code-editor/themes/dracula.css';

	import './languages';

	import { onMount } from 'svelte';

	let {
		vars = $bindable(),
		language: l = 'text',
		value: v = '',
		config = false,
		...props
	} = $props();

	let onU: (str: string) => void;

	if (props.config) {
		onU = (code: string) => {
			const reg = /(?<!#.*)\$\S*/g;
			vars = [...new Set(code.match(reg) as string[])];
		};
	}

	vars = [];

	async function createCodeEditor() {
		const { createEditor } = await import('prism-code-editor');

		const editor = createEditor('#editor', {
			language: l,
			value: v,
			onUpdate: onU
		});
	}

	onMount(async () => {
		createCodeEditor();
	});
</script>

<div id="editor"></div>
