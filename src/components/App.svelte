<script>
	export let name;
	export let intro;
	export let socials;
	export let outro;
</script>

<style>
	main {
		text-align: center;
		width: 100%;
		margin: 0 auto;
		padding: 2em;
	}

	h1 {
		color: #de3600;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	h2 {
		color: #de3600;
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
		color: #ee0000;
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
	<h1>Hello {name}!</h1>
	<h2>{intro}</h2>
	<ul>
		{#each socials as item}
			<li>
				<a target="_blank" rel="noopener" href={item.link}>
					{item.name}
				</a>
			</li>
		{/each}
	</ul>
	<div>{outro}</div>
</main>
