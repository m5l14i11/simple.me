<script lang="typescript">
	import { machine } from '../machines/MeMachine'
	import { useMachine } from '@xstate/svelte/lib/fsm';

	const { state } = useMachine(machine);
</script>

<style type="text/scss">
	$color1: #de3600;
	$color2: #ee0000;
	$color3: #fff;

	main {
		text-align: center;
		width: 100%;
		margin: 0 auto;
		padding: 2em;
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

	div {
		color: #fff;
	}

	@media only screen and (max-device-width: 812px) {
		main {
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

<main>
	<h1>{$state.context.greetings}</h1>
	<h2>{$state.context.intro}</h2>
	<ul>
		{#each $state.context.socials as item}
			<li>
				<a target="_blank" rel="noopener" href={item.link}>
					{item.name}
				</a>
			</li>
		{/each}
	</ul>
	<div>{$state.context.outro}</div>
</main>
