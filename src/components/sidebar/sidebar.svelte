<script lang="ts">
  import "./sidebar.css";

  import Icon from "@iconify/svelte";
  import ListItem from "./list-item/list-item.svelte";
  import Dropdown from "./dropdown/dropdown.svelte";
  import { colorMode, sidebarOpen } from "./sidebar.store";

  import { page } from "$app/state";

  function handleDarkMode() {
    colorMode.set(!$colorMode);
  }

  function toggleSidebar() {
    sidebarOpen.update((v) => !v);
  }
</script>

<nav id="sidebar" class={$sidebarOpen ? "" : "closed"}>
  <ul>
    <li>
      <span class="logo">Phone Dashboard</span>
      <button id="toggle-btn" onclick={toggleSidebar}>
        <Icon icon="fa6-solid:bars" class="inline" />
      </button>
    </li>
    <ListItem href="/" icon="fa6-solid:house" name="Dashboard" />
    <ListItem href="/phones" icon="fa6-solid:phone" name="Phones" />
    <Dropdown icon="fa6-solid:gear" name="Settings">
      <li class:active={page.url.pathname === "/settings/add-phone"}>
        <a href="/settings/add-phone">Add Phone</a>
      </li>
      <li class:active={page.url.pathname === "/settings/new-config"}>
        <a href="/settings/new-config">New Phone Config</a>
      </li>
    </Dropdown>
    <li>
      <button onclick={handleDarkMode}>
        <Icon icon={$colorMode ? "fa6-solid:sun" : "fa6-solid:moon"} class="inline" color={$colorMode ? "gold" : "white"} />
      </button>
    </li>
  </ul>
</nav>
