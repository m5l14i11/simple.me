<style type="text/scss">
  @import "../../styles/vars";

  a {
    display: block;
    padding: 20px;
    font-size: 1.2rem;
    text-decoration: none;
    color: $color4;

    &:hover {
      background-color: $color2;
    }
  }
</style>

<script lang="ts">
  import { navigate } from "./Router.svelte";
  export let to = "";
</script>

<a href="{to}" on:click="{navigate}" target="_blank" rel="noopener noreferrer">
  <slot />
</a>
