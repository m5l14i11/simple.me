<script context="module">
  import { writable } from "svelte/store";
  import page from "page";

  export const activeRoute = writable({});

  const routes = {};

  function register(route) {
    routes[route.path] = route;
  }

  function navigate(e) {
    e.preventDefault();
    const path = e.target.pathname;
    page.show(path);
  }

  export { navigate, register };
</script>

<script>
  import { onMount, onDestroy } from "svelte";

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
