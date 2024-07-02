<script lang="ts">
export let data;
import {Auth} from '@supabase/auth-ui-svelte';
import {ThemeSupa} from '@supabase/auth-ui-shared'
import { goto } from '$app/navigation';
import backgroundImage from '$src/assets/hxhtemp.png';
let {supabase, session} = data
$: ({supabase,session} = data)
console.log(supabase);
console.log(session);

$: if(session)
{
    goto("/");
}
</script>


<div class="min-h-screen relative">
	<!-- Background image with overlay -->
	 
	<div style="background-image: url({backgroundImage});" class="absolute inset-0 bg-cover bg-center">
		
	  <div class="absolute inset-0 bg-black opacity-70"></div> <!-- Overlay to darken -->
  
	  <!-- Top navigation -->
	  <div class="flex justify-center items-center h-20 md:h-16 sm:h-12">
    
		<button id="Title-Screen" class=" fixed text-3xl md:text-2xl sm:text-xl font-bold text-white" on:click={() => goto('/')}>HXH DLE</button>
	  </div>
    <div class="flex justify-center items-center min-h-screen">
      <div class="flex flex-col items-center text-white font-bold z-10">
        <p>Create an account or login below!</p>
        <!-- Supabase Auth UI -->
        <Auth
          supabaseClient={supabase}
          theme="dark"
          appearance={{
            theme: ThemeSupa, 
            style: {
              input: "width:800px"
            }
          }}
        />
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

  </style>