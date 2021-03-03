<script lang="ts">
  import { useMachine } from "@xstate/svelte/lib/fsm";
  import { machine } from "../machines/Me.machine";

  const { state } = useMachine(machine);

  $: context = $state.context;
</script>

<section>
  <h1>{context.greetings}</h1>
  <h2>{context.intro}</h2>
  <ul>
    {#each context.socials as item}
      <li>
        <a href={item.link} target="_blank" rel="noopener"> {item.name} </a>
      </li>
    {/each}
  </ul>
  <p>{context.outro}</p>
</section>

<style type="text/scss">
  $color1: #de3600;
  $color2: #ee0000;
  $color3: #fff;

  section {
    text-align: center;
    width: 100%;
    margin: 0 auto;
  }

  h1 {
    color: $color1;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  h2 {
    color: $color1;
    text-transform: capitalize;
    font-size: 3em;
    font-weight: 100;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: $color2;
    text-transform: capitalize;
    font-size: 1.5em;
    font-weight: 100;
  }

  p {
    color: #fff;
  }

  @media only screen and (max-device-width: 812px) {
    section {
      text-align: left;
      padding: 1em;
    }

    h1 {
      font-size: 3em;
    }

    h2 {
      font-size: 2em;
    }

    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    li {
      margin-right: 0.4em;
    }
  }
</style>
