<script lang="ts">
	import ModelTable from '$lib/model-list/model-table.svelte';
	import CodeEditor from '$lib/code-editor/code-editor.svelte';
	import ProfileForm from '$lib/profile-form/profile-form.svelte';
</script>

<div class="container">
	<ModelTable />
</div>

<div class="container">
	<ProfileForm />
	<CodeEditor />
</div>
