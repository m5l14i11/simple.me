<style type="text/scss">
  .sticky {
    position: fixed;
    top: 0;
    margin: 0;
  }

  nav {
    margin-bottom: 2rem;
  }

  ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>

<script lang="ts">
  import Router from "./router/Router.svelte";
  import Route from "./router/Route.svelte";
  import Link from "./router/Link.svelte";

  import Landing from "./Landing.svelte";
  import Me from "./Me.svelte";
  import Build from "./Build.svelte";
  import Blog from "./Blog.svelte";

  export let url = "";
</script>

<main>
  <div class="sticky">
    <nav>
      <ul>
        <li><Link to="/me">Me</Link></li>
        <li><Link to="/build">Build</Link></li>
        <li><Link to="/blog">Blog</Link></li>
      </ul>
    </nav>
  </div>
  <Router url="{url}">
    <Route path="/" component="{Landing}" />
    <Route path="/me" component="{Me}" />
    <Route path="/build" component="{Build}" />
    <Route path="/blog" component="{Blog}" />
  </Router>
</main>
