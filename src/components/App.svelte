<script lang="typescript">
  import { machine } from "../machines/MeMachine";
  import { useMachine } from "@xstate/svelte/lib/fsm";

  import Landing from "./Landing.svelte";
  import Portfolio from "./Portfolio.svelte";
  import WriteUp from "./WriteUp.svelte";
</script>

<main>
  <nav>
    <a href="/" target="_blank" rel="noopener">Me</a>
    <a href="/portfolio" target="_blank" rel="noopener">Portfolio</a>
    <a href="/writeup" target="_blank" rel="noopener">WriteUp</a>
  </nav>
  <Router>
    <Route path="/" component={Landing} />
    <Route path="/portfolio" component={Portfolio} />
    <Route path="/writeup" component={WriteUp} />
  </Router>
</main>

<style type="text/scss">
  nav {
  }

  nav a {
    padding-right: 1rem;
  }
</style>
