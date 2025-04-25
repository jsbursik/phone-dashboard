<script lang="ts">
	let { label = '', toggle, ...props } = $props();
</script>

<label class="switch">
	<span class="label">{label}</span>
	<input type="checkbox" onchange={toggle} />
	<span class="slider round"></span>
</label>
