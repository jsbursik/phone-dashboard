<script lang="ts">
  import { getContext } from "svelte";
  import { invalidateAll } from "$app/navigation";
  import { createAuthClient } from "better-auth/svelte";
  import { goto } from "$app/navigation";

  import { Input } from "@jsbursik/magic-ui";
  import { toastStore } from "@jsbursik/magic-ui";

  const authClient = getContext<ReturnType<typeof createAuthClient>>("authClient");

  let email = $state("");
  let emailValid = $state(false);
  let password = $state("");
  let passValid = $state(false);

  let isValid = $derived(emailValid && passValid);

  let loading = false;

  async function handleLogin(e: Event) {
    e.preventDefault();
    loading = true;

    const response = await authClient.signIn.email({
      email,
      password,
    });

    if (response.error) {
      toastStore.show(response.error.message || "Login failed", "danger");
      loading = false;
      return;
    }

    // Redirect after successful login
    await invalidateAll();
    toastStore.show("Login successful!", "success");
    goto("/");
    loading = false;
  }
</script>

<div class="auth-container">
  <div class="card">
    <form class="stack" onsubmit={handleLogin}>
      <h1 class="center-text">Login</h1>
      <div>
        <label for="email">Email:</label>
        <Input type="email" name="email" id="email" bind:value={email} bind:valid={emailValid} placeholder="email@example.com" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <Input type="password" name="password" id="password" bind:value={password} bind:valid={passValid} placeholder="Enter Your Password" required />
      </div>
      <div>
        <button type="submit" class="m-auto w-100" style="margin-top: 1rem;" disabled={!isValid}>Login</button>
      </div>
    </form>
  </div>
  <div class="center-text">
    <a href="/signup">Don't have an account?</a>
  </div>
</div>
