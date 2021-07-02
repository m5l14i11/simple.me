<style type="text/scss">
  main {
    width: 100%;
    height: 100%;
  }
</style>

<script lang="ts">
  import Router from "./router/Router.svelte";
  import Route from "./router/Route.svelte";

  import Nav from "./Nav.svelte";
  import Home from "./Home.svelte";
  import Edu from "./Edu.svelte";
  import Build from "./Build.svelte";
  import Blog from "./Blog.svelte";

  export let url = "";
</script>

<main>
  <Nav />
  <Router url="{url}">
    <Route path="/" component="{Home}" />
    <Route path="/edu" component="{Edu}" />
    <Route path="/build" component="{Build}" />
    <Route path="/blog" component="{Blog}" />
  </Router>
</main>
