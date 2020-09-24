<script>
	export let name;
	export let intro;
	export let socials;
	export let outro;
</script>

<main>
	<h1>Hello {name}!</h1>
	<h2>{intro}</h2>
	<ul>
		{#each socials as item, i}
			<li>
				<a target="_blank" href="{item.link}">
					{item.name}
				</a>
			</li>
		{/each}
	</ul>
	<div>{outro}</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	h2 {
		color: #ff3100b5;
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
		color: #ff0000;
		text-transform: capitalize;
		font-size: 1.5em;
		font-weight: 100;
	}

	div {
		color: #fff;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>