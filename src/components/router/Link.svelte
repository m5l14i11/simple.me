<script>
    import { navigate } from "./Router.svelte";
    export let to = "/";
</script>

<a href={to} on:click={navigate} target="_blank" rel="noopener">
    <slot />
</a>
