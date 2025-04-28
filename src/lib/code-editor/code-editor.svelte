<script lang="ts">
	import './code-editor.css';
	import 'prism-code-editor/layout.css';
	import 'prism-code-editor/scrollbar.css';
	import 'prism-code-editor/themes/dracula.css';

	import './languages';

	import { onMount } from 'svelte';

	let {
		i: index = 0,
		vars = $bindable<string[]>([]),
		language: l = 'text',
		value: v = '',
		config = false,
		...props
	} = $props();

	let getVars: (str: string) => void;

	vars = [];

	if (props.config) {
		getVars = (code: string) => {
			const reg = /(?<!#.*)\$\S*/g;
			vars = [...new Set(code.match(reg) as string[])];
		};
	}

	async function createCodeEditor() {
		const { createEditor } = await import('prism-code-editor');

		const editor = createEditor(`#editor-${index}`, {
			language: l,
			value: v,
			onUpdate: getVars
		});
	}

	onMount(async () => {
		createCodeEditor();
	});
</script>

<div id={`editor-${index}`} class="code-editor"></div>
