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

	export let data;
import {Auth} from '@supabase/auth-ui-svelte';
import {ThemeSupa} from '@supabase/auth-ui-shared'
    import { goto, invalidateAll } from '$app/navigation';

let {supabase, session} = data
$: ({supabase,session} = data)  

// session is null, if session is null we have no user. if its not null, we have a user

supabase.auth.onAuthStateChange(async(event, session)=> {
	if(event==="SIGNED_IN")
{
	invalidateAll();
}
if(event==="SIGNED_OUT"){

invalidateAll();
}
})

</script>

<main class="min-h-screen flex flex-col items-center bg-teal-600">
	<!-- Top of the screen leading to home page -->
	<div id="nav" class="w-full bg-gray-200 p-4 border-b-2 border-black text-center">
		<button id="Title-Screen" class="text-3xl font-bold text-black" on:click={clickHomePage}>HXH DLE</button>
		{#if session !=null}
		
		<button class="fixed right-11 border border-black bg-teal-600 font-bold py-2 px-4 rounded" on:click={async ()=> {await supabase.auth.signOut()}}>Logout</button>
		{:else}
		<a href="/Login"><button class="fixed right-11">Login</button></a>
		{/if}
		
	</div>
	<div>
		{#if session !=null}
		<span id="welcome"class="text-black tex-tlg">Welcome {session.user.email}</span>
		{/if}
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
	#welcome{
		font:bold;
		animation:fade-up 2s;
	}
</style>
