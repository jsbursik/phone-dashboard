<script lang="ts">
	import CodeEditor from '$lib/code-editor/code-editor.svelte';
	import InputField from '~/lib/form-components/input-field.svelte';
	import InfoTip from '~/lib/info-tip/info-tip.svelte';

	import Icon from '@iconify/svelte';

	import { editors, addEditor, removeEditor, getVars } from './state.svelte';

	import './add_profile.css';
</script>

{#each editors as editor, index (editor.id)}
	<div class="container-row">
		<div class="container fit">
			{#if index !== 0}
				<button class="btn-close" onclick={() => removeEditor(editor.id)}
					><Icon icon="fa6-solid:x" class="inline" /></button
				>
			{/if}
			<div class="form-group">
				<div class="form-row" style="justify-content: center">
					<InputField
						field={index === 0 ? 'Model' : 'File name'}
						index={index !== 0 ? index - 1 : 0}
					/>
					{#if index === 0}
						<InfoTip
							tooltip="Just the model name in this field - how you would like it to appear in the profile menu. If your phone supports a common config, place that down below as an additional file with the appropriate name and extension."
						/>
					{:else}
						<InfoTip
							tooltip="Enter the full name of the file with extension. Existing variables can be used like '$mac.boot' if it should be dynamically named"
						/>
					{/if}
				</div>
			</div>
			<CodeEditor
				value={editor.value}
				bind:vars={editor.vars}
				language={editor.language}
				config={editor.config}
				i={index}
			/>
			{#if index == editors.length - 1}
				<div style="margin: 1rem 0 0 auto">
					<button class="btn btn-primary" onclick={() => addEditor()}>
						<Icon icon="fa6-solid:plus"></Icon>
						Add File
					</button>
					<button class="btn btn-primary">
						<Icon icon="fa6-solid:thumbs-up"></Icon>
						Submit
					</button>
				</div>
			{/if}
		</div>
		{#if index == 0}
			<div class="container fit">
				<h1>Variables:</h1>
				<ul class="var-list" style="color: var(--success-clr)">
					{#each getVars() as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
{/each}
