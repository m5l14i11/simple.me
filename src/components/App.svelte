<script lang="typescript">
  import { machine } from "../machines/MeMachine";
  import { useMachine } from "@xstate/svelte/lib/fsm";

  import Landing from "./Landing.svelte";
  import Me from "./Me.svelte";
  import Build from "./Build.svelte";
  import WriteUp from "./WriteUp.svelte";
</script>

<style type="text/scss">
  nav a {
    padding-right: 1rem;
  }
</style>

<main>
  <nav>
    <a href="/me" target="_blank" rel="noopener">Me</a>
    <a href="/build" target="_blank" rel="noopener">Build</a>
    <a href="/writeup" target="_blank" rel="noopener">WriteUp</a>
  </nav>
  <Router>
    <Route path="/" component={Landing} />
    <Route path="/me" component={Me} />
    <Route path="/build" component={Build} />
    <Route path="/writeup" component={WriteUp} />
  </Router>
</main>
