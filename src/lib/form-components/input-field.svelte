<script lang="ts">
	let { field = 'Input', value = $bindable(), index: i = 0, ...props } = $props();

	let fieldID = field.replace(/\s+/g, '-').toLowerCase();
	if (fieldID !== 'model') {
		fieldID += '-' + i;
	}
</script>

<span class="form-control">
	<label for={fieldID}>{field}:</label>
	<input type="text" id={fieldID} name={fieldID} />
</span>
