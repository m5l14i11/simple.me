<style type="text/scss">
  @import "../../styles/vars";

  a {
    display: block;
    padding: 20px;
    font-size: 1.2em;
    text-decoration: none;
    color: $color4;

    &:hover {
      background-color: $color2;
    }
  }

  @media only screen and (max-device-width: 812px) {
    a {
      font-size: 1em;
      padding: 20px;
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
