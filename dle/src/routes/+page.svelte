<script lang="ts">
	import './styles.css';
	import backgroundImage from "../assets/hxhtemp.png";
	import { goto, invalidateAll } from '$app/navigation'; // Ensure goto function is correctly imported
	import {InfoIcon, UserPlusIcon} from 'svelte-feather-icons'
	import {UserCheckIcon} from 'svelte-feather-icons'
	
	let showSettings
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
  
	export let data; // Assuming data is provided externally
  
	import {Auth} from '@supabase/auth-ui-svelte';
	import {ThemeSupa} from '@supabase/auth-ui-shared'
  
	let {supabase, session} = data;
	$: ({supabase,session} = data);
  
	// session is null, if session is null we have no user. if its not null, we have a user
	supabase.auth.onAuthStateChange(async(event, session) => {
	  if (event === "SIGNED_IN") {
		invalidateAll();
	  }
	  if (event === "SIGNED_OUT") {
		invalidateAll();
	  }
	});
  
	export async function load() {
	  const { data } = await supabase.from("Characters").select();
	  return {
		countries: data ?? [],
	  };
	}
  </script>
  
  <div class="min-h-screen relative">
	<!-- Background image with overlay -->
	 
	<div style="background-image: url({backgroundImage});" class="absolute inset-0 bg-cover bg-center">
		
	  <div class="absolute inset-0 bg-black opacity-70"></div> <!-- Overlay to darken -->

	  <!-- Top navigation -->
	  <div class="flex justify-center items-center h-20 md:h-16 sm:h-12">
	
		<button  class="fixed pr-36 z-20"><InfoIcon size="24" class="text-white "></InfoIcon></button>
		<button id="Title-Screen" class=" z-10 fixed text-3xl md:text-2xl sm:text-xl font-bold text-white" on:click={clickHomePage}>HXH DLE
			{#if session != null}
			<button class="fixed mr-auto ml-auto px-2" on:click={async () => { await supabase.auth.signOut() }}>	<UserCheckIcon class="text-white" strokeWidth="2" size="32" ></UserCheckIcon></button>
			{:else}
			<a href="/Login" class="fixed mr-auto ml-auto px-2 ">  	<UserPlusIcon class="text-white" strokeWidth="2" size="32" ></UserPlusIcon></a>
			{/if}
		</button>
		
	  </div>
  
	  <div class="flex flex-col items-center justify-center">
		<div class="fixed my-8 mx-40">
			

		  <button id="classic" class="justify-center border text-white font-bold py-2 px-4 rounded bg-black hover:bg-gray-700 text-lg mt-40" on:click={() => goto('/Classic')}>
			Classic
			<div><p class="text-xs">Get hints on every try</p></div>
		  </button>
		 
		</div>
		
	  </div>
	  
	  
	  <!-- Footer -->
	  <footer class="absolute bottom-0 left-0 right-0 p-2 text-center text-xs text-gray-600">
		<p>Pykroth</p >
		<p>@2024</p>
	  </footer>
	</div>
	
  
  </div>
  
  <style lang="postcss">
	#Title-Screen {
	  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
  
	@keyframes fade-up {
	  0% {
		opacity: 0;
		transform: translateY(30px) scale(.9);
	  }
	  100% {
		opacity: 1;
		transform: translateY(0px) scale(1);
	  }
	}
  
	@keyframes fade-up {
	  0% {
		opacity: 0;
		transform: translateY(-30px) scale(.9);
	  }
	  100% {
		opacity: 1;
		transform: translateY(0px) scale(1);
	  }
	}
  
	#classic {
	  animation: fade-up 2s;
	}

	:root {
        --scrollbar-width: 10px;
        --scrollbar-track-color: #f0f0f0;
        --scrollbar-thumb-color: #888;
    }

    :root::-webkit-scrollbar {
        width: var(--scrollbar-width);
    }

    :root::-webkit-scrollbar-track {
        background-color: var(--scrollbar-track-color);
    }

    :root::-webkit-scrollbar-thumb {
        background-color: var(--scrollbar-thumb-color);
    }
#parallelogram {
	width: 100px;
	height: 50px;
	transform: skew(20deg);
	background: black;
}
  </style>
  