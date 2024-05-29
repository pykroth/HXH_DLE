

<script lang="ts">
    import { Result } from "postcss";
 import { fade } from 'svelte/transition';

  // Function to determine if an item is newly added
  function isNewItem(index) {
    return index >= guessedData.length - 1;
  }

let answer;
let clickSearch = true;
let searchText = '';
let guessCount = 0;

let hintText="Debut Arc: 3 More Tries Necessary"

let guessedRight = false;
let data = [
    {
        Name: "Gon Freecs",
        Click: false,
        Nen: "Enhancer",
        correctName: false,
        correctNen: false,
        DebutArc: "Hunter Exam"

    },
    {
        Name: "Killua Zoldyc",
        Click: false,
        Nen: "Transmutor",
        correctName: false,
        correctNen: false,
        DebutArc: "Hunter Exam"
    },
    {
        Name: "Uvo",
        Click: false,
        Nen: "Enhancer",
        correctName: false,
        correctNen: false,
        DebutArc: "Phantom Troupe Arc"
    },
    {
        Name: "Kurapika Kurta",
        Click: false,
        Nen: "Conjuration, Special",
        correctName: false,
        correctNen: false,
        DebutArc: "Hunter Exam"

    },
    {
        Name: "Leorio",
        Click: false,
        Nen: "Emission",
        correctName: false,
        correctNen: false,
        DebutArc: "Hunter Exam"
    },
    {
        Name: "Netero",
        Click: false,
        Nen: "Emission",
        correctName: false,
        correctNen: false,
        DebutArc: "Hunter Exam"
    },
    {
        Name: "Hisoka",
        Click: false,
        Nen: "Transmutor",
        correctName: false,
        correctNen: false,
        DebutArc: "Hunter Exam"
    },
    {
        Name: "Illumi",
        Click: false,
        Nen: "Manipulator",
        correctName: false,
        correctNen: false,
        DebutArc: "Hunter Exam"
    },
    {
        Name: "Pokkle",
        Click: false,
        Nen: "Emission",
        correctName: false,
        correctNen: false,
        DebutArc: "Hunter Exam"
    },
    {
        Name: "Hanzo",
        Click: false,
        Nen: "Unknown",
        correctName: false,
        correctNen: false,
        DebutArc: "Hunter Exam"
    },
    {
        Name: "Ponzu",
        Click: false,
        Nen: "Manipulator",
        correctName: false,
        correctNen: false,
        DebutArc: "Hunter Exam"
    },
    {
        Name: "Mito",
        Click: false,
        Nen: "None",
        correctName: false,
        correctNen: false,
        DebutArc: "Hunter Exam"
    },
    {
        Name: "Meruem",
        Click: false,
        Nen: "Special",
        correctName: false,
        correctNen: false,
        DebutArc: "Chimera Ant Arc"
    },
    {
        Name: "Pitou",
        Click: false,
        Nen: "Special",
        correctName: false,
        correctNen: false,
        DebutArc: "Chimera Ant Arc"
    },
    {
        Name: "Shiapouf",
        Click: false,
        Nen: "Manipulator",
        correctName: false,
        correctNen: false,
        DebutArc: "Chimera Ant Arc"
    },
    {
        Name: "Menthuthuyoupi",
        Click: false,
        Nen: "Transmutor",
        correctName: false,
        correctNen: false,
        DebutArc: "Chimera Ant Arc"
    },
    {
        Name: "Kite",
        Click: false,
        Nen: "Conjuration",
        correctName: false,
        correctNen: false,
        DebutArc: "Chimera Ant Arc"
    }
    

];

let filteredData: any[] = [];
let guessedData: any[] = [];

//Picks random number
function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickChar()
{
    let answerNumber = getRandomInt(0,data.length-1);
    answer = data[answerNumber];
    

}

function updateSearchResults(results: any[]) {
    filteredData = results;
    const guessedResults = data.filter(item =>{return item.Click === true})
    
  }



  function filterData(event) {
    
    const query = event.target.value.toLowerCase();
    const results = data.filter(item => {
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
   // guessedData.push(result);
    guessedData = [...guessedData, result];
    let hintCounter=3-guessCount;
    if(hintCounter>0)
    hintText="Debut Arc: " + hintCounter + " more tries necessary";
    else
    {
        hintText="Debut Arc: (Click to use)"
    }
    if(result.Click==true)
    {
        console.log("THIS IS TRUE");
    }
    
    if(result == answer)
    {
        guessedRight = true;
        clickSearch = false;
    }
    const query = event.target.value.toLowerCase();
    const results = data.filter(item => {
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
pickChar();

for(let i = 0; i<data.length; i++)
{
    if(data[i].Name == answer.Name)
    {
        data[i].correctName = true;
    }
    if(data[i].Nen == answer.Nen)
    {
        data[i].correctNen = true;
    }
}

function revealLocation()
{
    if(3-guessCount <=0)
    {
        hintText=answer.DebutArc;
    }

}


 
</script>

<main class="main" id="main">
    
    <div class="bg-gray-500 justify-center h-screen w-full">

		<div class="text-center text-white border border-black bg-black" >
            <a href="/">
			<button id="Title-Screen"> HXH DLE</button>
        </a>
        </div>
        <!--Hints-->
        <div class="flex justify-center">
            <button class="border border-black ml-15 mt-12" on:click={revealLocation}> <!-- Adjust the ml-* value as needed -->
                {hintText}
            </button>
        </div>
         
        <!--Code for guessing Right-->
        {#if guessedRight}
        <div class="fixed -top-1/8 left-1/2 transform -translate-x-1/2">You Guessed Right</div>
        {/if}
        <!--Searchbar and list of results-->
        <div class="fixed top-1/4 left-1/2 transform -translate-x-1/2">
        <input bind:value={searchText} type="text" id="searchInput" placeholder="Search..." class="mx-auto my-auto text-black {clickSearch ? '':'pointer-events-none'}"  on:input={filterData}>
        {#if filterData.length > 0}
        <ul>
            {#each filteredData as item}
            <li>
            <button class="border border-black border-1 text-center"  on:click={() =>Guess(item)}>{item.Name}</button>
        </li>
        {/each}
        
        </ul>
      
      {/if}
       
    </div>

</div>  
<div class="fixed top-3/4 left-1/2 transform -translate-y-1/4 -translate-x-1/2">
    {#each [...guessedData] as item, index}
    <table class="w-full table-fixed">
      <tr class="self-center" in:fade="{{ duration: 500, delay: (guessedData.length - index - 1) * 500 }}">
        <td class="w-1/2 {item.correctName ? 'bg-green-200' : 'bg-red-300'}">{item.Name}</td>
        <td class="w-1/2 {item.correctNen ? 'bg-green-200' : 'bg-red-300'}">{item.Nen}</td>
      </tr>
    </table>
  {/each}
  
</div>

<footer class="bg-black">
    <p class="text-white  text-xs">Jordan Pho</p>
    <p class="text-white text-xs">@2024</p>
</footer>
    
</main>


<style lang="postcss">
    :root {
  /* Scrollbar width */
  --scrollbar-width: 10px;
  /* Scrollbar track color */
  --scrollbar-track-color: #f0f0f0;
  /* Scrollbar thumb color */
  --scrollbar-thumb-color: #888;
}

/* Style the scrollbar */
:root::-webkit-scrollbar {

  width: var(--scrollbar-width);
}

/* Style the scrollbar track */
:root::-webkit-scrollbar-track {
    
  background-color: var(--scrollbar-track-color);
}

/* Style the scrollbar thumb */
:root::-webkit-scrollbar-thumb {
    
  background-color: var(--scrollbar-thumb-color);
}



</style>