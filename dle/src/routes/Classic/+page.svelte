

<script lang="ts">
    import { Result } from "postcss";
 import { fade } from 'svelte/transition';
import { onMount } from "svelte";
import { supabase } from "$lib/supabaseClient";
import guessedRightImage1 from "../../assets/hxhgif.gif"

  // Function to determine if an item is newly added
  function isNewItem(index) {
    return index >= guessedData.length - 1;
  }
  let characterList: any[]=[];
  let loading = true;
  let error = null;
  let answer:any[];
  let error2=null;
  let loading2 = true;

  onMount(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('Characters')
        .select('*');

      if (fetchError) {
        error = 'Error fetching characters: ' + fetchError.message;
      } else {
        characterList = data;
      }
      updateTable();
    } catch (err) {
      error = 'Unexpected error: ' + err.message;
    } finally {
      loading = false;
    }

  });
  
  
  onMount(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('current_random_character')
        .select('*');

      if (fetchError) {
        error2 = 'Error fetching characters: ' + fetchError.message;
      } else {
        answer = data;
      }
      updateTable();
    } catch (err) {
      error2 = 'Unexpected error: ' + err.message;
    } finally {
      loading2 = false;
    }
  });



  
  


let clickSearch = true;
let searchText = '';
let guessCount = 0;

let hintText="Debut Arc: 3 More Tries Necessary"

let guessedRight = false;


let filteredData: any[] = [];
let guessedData: any[] = [];

//Picks random number
function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateTable()
{
    

    for(let i = 0; i<characterList.length; i++)
    {

        
    if(characterList[i].Name == answer[0].name)
    {
  
        characterList[i].correctName = true;
    }
    if(characterList[i].Nen == answer[0].nen)
    {
        characterList[i].correctNen = true;
    }
}
}

function updateSearchResults(results: any[]) {
    filteredData = results;
    const guessedResults = characterList.filter(item =>{return item.Click === true})
    
  }



  function filterData(event) {
    
    const query = event.target.value.toLowerCase();
    const results = characterList.filter(item => {
        return item.Name.trim().toLowerCase().startsWith(query) && !item.Click;
    });
    
    if (query === "") {
      updateSearchResults([]); // Clear filteredData if query is empty
    }
    else
    {
        updateSearchResults(results);
        
    }
    

}


function Guess(result: any[])
{
    result.Click=true;
    searchText='';
    guessCount++;
   // console.log(answer)
   // guessedData.push(result);
    guessedData = [...guessedData, result];
    let hintCounter=3-guessCount;
    if(hintCounter>0)
    hintText="Debut Arc: " + hintCounter + " more tries necessary";
    else
    {
        hintText="Debut Arc: (Click to use)"
    }
   
    
    if(result.Name == answer[0].name)
    {
      
        guessedRight = true;
        clickSearch = false;
    }
    const query = event.target.value.toLowerCase();
    const results = characterList.filter(item => {
        return item.Name.toLowerCase().includes(query) && (item.Click === false);
    });
   


    if (query === "") {
      updateSearchResults([]); // Clear filteredData if query is empty
    }
    else
    {
        updateSearchResults(results);
       
    }
   
   
}



function revealLocation()
{
   // console.log(answer)
    if(3-guessCount <=0)
    {
        hintText=answer[0].debut_arc;
        
    }

}
updateTable();

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  $: if (guessedRight) {
    // Using setTimeout to ensure the DOM updates before scrolling
    setTimeout(() => scrollToSection('guessedRight'), 0);
  }

</script>

<main class="main min-h-screen bg-gray-100 text-gray-800 relative ">
    <div id="fullpage" class="flex flex-col justify-center items-center h-screen w-full relative bg-teal-600">
        <div id="nav" class="text-center text-white bg-gray-200 p-4 w-full border-b-2 border-black">
            <a href="/">
                <button id="Title-Screen" class="text-center text-2xl font-bold">HXH DLE</button>
            </a>
        </div>
        <!--Hints-->
        <div class="flex justify-center mt-8">
            <button class="border border-black px-4 py-2 bg-white hover:bg-gray-200 transition-colors duration-200" on:click={revealLocation}>
                {hintText}
            </button>
        </div>
        <!--Code for guessing Right-->
        
        <!--Searchbar and list of results-->
        <div class="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-3/4">
            <input bind:value={searchText} type="text" id="searchInput" class="w-full px-4 py-2 text-black border border-gray-300 rounded focus:outline-none focus:border-blue-500" on:input={filterData}  style="pointer-events: {guessedRight ? 'none' : 'auto'}">
            {#if filterData.length > 0}
            <ul class="mt-2 bg-white border border-gray-300 rounded shadow-lg ">
                {#each filteredData as item}
                <li>
                    <button class="w-full text-left px-4 py-2 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200" on:click={() => Guess(item)} >
                        {item.Name}
                    </button>
                </li>
                {/each}
            </ul>
            {/if}
        </div>
    </div>  
    <div class="relative top-[-250px] left-1/2 transform -translate-x-1/2 w-3/4 overflow-y-auto">
        {#each [...guessedData].reverse() as item, index}
        <table class="w-full table-relative mt-2">
            <tr class="self-center" in:fade="{{ duration: 500, delay: (guessedData.length - index - 1) * 500 }}">
                <td class="w-1/2 p-2 {item.correctName ? 'bg-green-200' : 'bg-red-300'}">{item.Name}</td>
                <td class="w-1/2 p-2 {item.correctNen ? 'bg-green-200' : 'bg-red-300'}">{item.Nen}</td>
            </tr>
        </table>
        {/each}
    </div>
    <div>
      {#if guessedRight}
<div class="flex justify-center">
  <div class="size-1/12 text-center bg-green-200 rounded -translate-y-1.5" id="guessedRight">
    <img src={guessedRightImage1} alt="image1" class="p-2">
    You Guessed Right
  
  </div>
</div>

{/if}
      
    </div>
    
</main>
<footer class="bg-gray-800 text-white p-4 text-center text-xs" id="section-1">
    <p>Jordan Pho</p>
    <p>@2024</p>
</footer>
<style lang="postcss">
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

    #Title-Screen {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: black;
    }
</style>
