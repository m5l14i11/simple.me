<script lang="ts" context="module">
  import { writable } from "svelte/store";
  import { createBrowserHistory } from "history";

  export const activeRoute = writable({ path: "", component: null });
  const history = createBrowserHistory();

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

  function navigate(e: Event) {
    // @ts-ignore
    const path = e.target.pathname;

    e.preventDefault();

    history.push(path);
  }

  export { navigate, register };
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  export let url = "";

  let unlisten = () => {};

  const setupPage = () => {
    unlisten = history.listen(({ location }) => {
      for (let [path, route] of Object.entries(routes)) {
        if (location.pathname == path) {
          $activeRoute = route;
        }
      }
    });

    if (url) history.replace(url);
  };

  onMount(setupPage);

  onDestroy(unlisten);
</script>

<slot />
