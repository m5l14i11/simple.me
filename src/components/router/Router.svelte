<script lang="ts" context="module">
  import { writable } from "svelte/store";
  import page from "page";

  export const activeRoute = writable({ path: "", component: null });

  interface IRoute {
    path: string;
    component: any;
  }

  interface IRoutes {
    [x: string]: IRoute;
  }

  const routes: IRoutes = {};

  function register(route: IRoute) {
    routes[route.path] = route;
  }

  function navigate(e: MouseEvent) {
    //@ts-ignore
    const path = e.target.pathname;

    e.preventDefault();
    page.show(path);
  }

  export { navigate, register };
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  export let url = null;

  const setupPage = () => {
    for (let [path, route] of Object.entries(routes)) {
      page(path, () => ($activeRoute = route));
    }

    page.start({ dispatch: process.browser });

    if (url) page.show(url);
  };

  onMount(setupPage);

  onDestroy(page.stop);
</script>

<slot />
