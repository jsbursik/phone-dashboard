<script lang="ts">
	import './code-editor.css';
	import 'prism-code-editor/layout.css';
	import 'prism-code-editor/scrollbar.css';
	import 'prism-code-editor/themes/dracula.css';

	import './languages';

	import { onMount } from 'svelte';

	let {
		i: index = 0,
		vars = $bindable(<string[]>[]),
		language: l = 'text',
		value: v = '',
		config = false,
		...props
	} = $props();

	let updateVars: (code: string) => void = () => {};

	if (props.config) {
		updateVars = (code) => {
			const reg = /(?<!#.*)\$\S*/g;
			const match = code.match(reg) ? (code.match(reg) as string[]) : [];
			vars = [...new Set(match)];
		};
	}

	async function createCodeEditor() {
		const { createEditor } = await import('prism-code-editor');

		const editor = createEditor(`#editor-${index}`, {
			language: l,
			value: v,
			onUpdate: updateVars
		});
	}

	async function nameEditor() {
		const textArea = document.querySelector(`#editor-${index} textarea`);
		textArea?.setAttribute('name', `editor-${index}`);
	}

	onMount(async () => {
		await createCodeEditor();
		await nameEditor();
	});
</script>

<div id={`editor-${index}`} class="code-editor"></div>
