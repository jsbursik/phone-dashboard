<script lang="ts">
	let { field = 'Input', value = $bindable(), ...props } = $props();

	const fieldID = field.replace(/\s+/g, '-').toLowerCase();
</script>

<span class="form-control">
	<label for={fieldID}>{field}:</label>
	<input type="text" id={fieldID} name={fieldID} />
</span>
