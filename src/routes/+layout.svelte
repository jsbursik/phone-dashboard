<script lang="ts">
	let { children } = $props();

	import Sidebar from '$lib/sidebar/sidebar.svelte';
	import '../app.css';
</script>

<Sidebar />

<main>
	{@render children()}
</main>
