<script lang="ts">
	import CodeEditor from '$lib/code-editor/code-editor.svelte';
	import InputField from '~/lib/form-components/input-field.svelte';
	import Switch from '~/lib/form-components/switch.svelte';

	import './add_profile.css';
	import FloatingButton from '~/lib/floating-button/floating-button.svelte';

	const codeValue =
		'# Paste your config here\n# For any dynamic values use "$value" format with $kebab_case\n$money\n$test';

	let varArr: string[] = [];

	let editors = [
		{
			vars: [],
			value: codeValue,
			language: 'phone_cfgs',
			config: true
		}
	];

	function addEditor() {
		editors.push({
			vars: [],
			value: `#This code editor will maintain the same highlighting logic even if your file differes in structure.\n${counter++}`,
			language: 'phone_cfgs',
			config: true
		});
	}

	// function handleSwitch(index: number) {
	// 	if (!editors[index].additionalFile) {
	// 		editors[index].additionalFile = true;
	// 		editors = [
	// 			...editors,
	// 			{
	// 				vars: [],
	// 				value: `#This code editor will maintain the same highlighting logic even if your file differes in structure.\n${counter++}`,
	// 				language: 'phone_cfgs',
	// 				additionalFile: false,
	// 				config: true
	// 			}
	// 		];
	// 	} else {
	// 		editors[index].additionalFile = false;
	// 		editors.splice(index, 1);
	// 	}
	// }
</script>

{#each editors as editor, index}
	<div class="container-row">
		<div class="container fit">
			<div class="form-group">
				<div class="form-row" style="justify-content: center">
					<InputField field={index == 0 ? 'Model' : 'File name'} />
				</div>
			</div>
			<CodeEditor
				value={editor.value}
				bind:vars={editor.vars}
				language={editor.language}
				config={editor.config}
				i={index}
			/>
		</div>
		{#if index == 0}
			<div class="container fit">
				<h1>Variables:</h1>
				<ul class="var-list" style="color: var(--success-clr)">
					{#each varArr as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
{/each}

<FloatingButton icon="plus" bottom="1rem" right="8rem" text="Add another file" func={addEditor} />
<FloatingButton icon="thumbs-up" bottom="1rem" right="1rem" text="Submit" />
