<script lang="ts">
	import './styles.css';
	let tempVar=false;
	function clickHomePage()
	{
		tempVar=true;
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
    ]
  </script>



<main>
	<!--The very top of the screen which leads to home-page-->
	<div class="bg-gray-500 justify-center h-screen ">
		<div class="text-center text-white border border-black bg-black" >
			<button id="Title-Screen" on:click={clickHomePage}>HXH DLE</button>
			<div class="fixed top-1/4 left-1/2 transform -translate-x-1/2">
				<a href="/Classic">
				<button class="border border-black text-white font-bold py-2 px-4 rounded">
				  Classic Button
				</button>
				</a>
			  </div>
			
			  
		</div>
		
	</div>
	<div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
        <input type="text" id="searchInput" placeholder="Search..." class="mx-auto my-auto">
    </div>

</main>






<style>
#Title-Screen
	{
		font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

	}
</style>

