<script lang="typescript">
  import Router from "./router/Router.svelte";
  import Route from "./router/Route.svelte";
  import Link from "./router/Link.svelte";

  import Landing from "./Landing.svelte";
  import Me from "./Me.svelte";
  import Build from "./Build.svelte";
  import WriteUp from "./WriteUp.svelte";
</script>

<main>
  <nav>
    <Link to="/me">Me</Link>
    <Link to="/build">Build</Link>
    <Link to="/writeup">WriteUp</Link>
  </nav>
  <Router>
    <Route path="/" component={Landing} />
    <Route path="/me" component={Me} />
    <Route path="/build" component={Build} />
    <Route path="/writeup" component={WriteUp} />
  </Router>
</main>

<style type="text/scss">
  nav {
    padding-right: 1rem;
  }
</style>
