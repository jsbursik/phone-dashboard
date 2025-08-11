<script lang="ts">
  import "../app.css";

  import ToastContainer from "$components/toast/toast-container.svelte";
  import Sidebar from "$components/sidebar/sidebar.svelte";

  let { children } = $props();
</script>

<Sidebar />

<main>
  {@render children()}
</main>

<ToastContainer />
