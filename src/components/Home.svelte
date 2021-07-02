<style type="text/scss">
  @import "../styles/vars";
  @import "../styles/layout";

  h1 {
    color: $color3;
    text-transform: uppercase;
    font-size: 5em;
    font-weight: 400;
  }

  h2 {
    color: $color4;
    text-transform: capitalize;
    font-size: 4em;
    font-weight: 400;
  }

  .title {
    color: $color2;
  }

  p {
    color: $color1;
  }

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  a {
    color: $color4;
    text-transform: capitalize;
    font-size: 1.5em;
    font-weight: 300;
    background-color: darken($color2, 30);
    display: block;
    margin-right: 20px;
    padding: 20px 10px;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  @media only screen and (max-device-width: 812px) {
    h1 {
      font-size: 3.4em;
      margin: 0.8em 0;
    }

    h2 {
      font-size: 2.3em;
      margin: 0.6em 0;
    }

    a {
      display: block;
      font-size: 1em;
      padding: 10px 5px;
      margin-right: 5px;
    }
  }
</style>

<script lang="ts">
  import { useMachine } from "@xstate/svelte/lib/fsm";
  import { machine } from "../machines/Me.machine";

  const { state } = useMachine(machine);

  $: context = $state.context;
</script>

<section>
  <h1>{context.greetings}</h1>
  <h2>{context.intro}</h2>
  <h2 class="title">{context.title}</h2>
  <ul>
    {#each context.socials as item}
      <li>
        <a href="{item.link}" target="_blank" rel="noopener noreferrer"> {item.name} </a>
      </li>
    {/each}
  </ul>
  <p>{context.outro}</p>
</section>
