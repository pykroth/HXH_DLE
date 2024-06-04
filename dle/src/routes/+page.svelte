<script lang="ts">
	import './styles.css';
	let tempVar = false;
	function clickHomePage() {
		tempVar = true;
		console.log(tempVar);
	}

	//For different parts of website 
	let screenlinks = [
		{
			"name": "Home",
			"link": "/home"
		},
		{
			"name": "Classic",
			"link": "/Classic"
		}
	];
</script>

<main class="min-h-screen flex flex-col items-center bg-teal-600">
	<!-- Top of the screen leading to home page -->
	<div id="nav" class="w-full bg-gray-200 p-4 border-b-2 border-black text-center">
		<button id="Title-Screen" class="text-3xl font-bold text-black" on:click={clickHomePage}>HXH DLE</button>
	</div>

	<!-- Central content -->
	<div class="flex flex-col items-center justify-center flex-grow">
		<div class="my-8">
			<a href="/Classic">
				<button id="classic" class="border border-black text-white font-bold py-2 px-4 rounded bg-gray-800 hover:bg-gray-700 transition-colors duration-200">
					Classic Button
				</button>
			</a>
		</div>
	</div>
</main>

<style lang="postcss">
	#Title-Screen {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	@keyframes fade-up
	{
		0%{
			opacity:0;
			transform:translateY(30px) scale(.9);
		}
		100%
		{
			opacity:1;
			transform:translateY(0px) scale(1);
		}
	}
	@keyframes fade-up
	{
		0%{
			opacity:0;
			transform:translateY(-30px) scale(.9);
		}
		100%
		{
			opacity:1;
			transform:translateY(0px) scale(1);
		}

	}
	#classic{
		animation:fade-up 2s;
	}
</style>
