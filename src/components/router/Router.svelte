<script context="module">
  import { writable } from "svelte/store";

  export const activeRoute = writable({});

  const routes = {};

  export function register(route) {
    routes[route.path] = route;
  }
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  import page from "page";

  const setupPage = () => {
    for (let [path, route] of Object.entries(routes)) {
      page(path, () => ($activeRoute = route));
    }

    page.start();
  };

  onMount(setupPage);

  onDestroy(page.stop);
</script>

<slot />
