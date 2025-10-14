<script lang="ts">
  import { Navbar, NavLink, ToastContainer, ModeToggle } from "@jsbursik/magic-ui";
  import { initAuthClient } from "@jsbursik/magic-ui";
  import { setContext } from "svelte";
  import { env } from "$env/dynamic/public";
  import "@jsbursik/magic-ui/styles";

  let { children, data } = $props();

  const authClient = initAuthClient(env.PUBLIC_BASE_URL || "http://localhost:5173");

  setContext("authClient", authClient);
</script>

<Navbar {authClient} user={data.user}>
  {#snippet publicLinks()}
    <NavLink href="/">Home</NavLink>
    <NavLink href="/css-demo">CSS Demo</NavLink>
  {/snippet}
  {#snippet authLinks()}
    <NavLink href="/secret">Secret</NavLink>
  {/snippet}
</Navbar>
<ModeToggle />

<main>
  {@render children()}
</main>

<ToastContainer />
