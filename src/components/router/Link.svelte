<script lang="ts">
    import { navigate } from "./Router.svelte";
    export let to = "";
</script>

<a href={to} on:click={navigate} target="_blank" rel="noopener">
    <slot />
</a>

<style type="text/scss">
    a {
        display: flex;
        padding: 1rem;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: #ee0000;

        &:hover {
            opacity: 0.8;
        }
    }
</style>
