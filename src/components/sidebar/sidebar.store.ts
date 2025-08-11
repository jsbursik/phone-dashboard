import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const sidebarOpen = writable(false);

const initial = browser && localStorage.getItem("colorMode") === "true";

export const colorMode = writable(initial);

if (browser) {
  colorMode.subscribe((value) => {
    localStorage.setItem("colorMode", String(value));
    document.documentElement.setAttribute("data-theme", value ? "dark" : "light");
  });
}
