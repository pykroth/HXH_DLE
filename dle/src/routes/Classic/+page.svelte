

<script lang="ts">
    import { Result } from "postcss";


let answer;
let clickSearch = true;
let searchText = '';
let guessCount = 0;

let hintText="Location: 3 More Tries Necessary"

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
    updatedGuesses(guessedResults);
  }

  function updatedGuesses(results: any[]) {
    guessedData = results;
  }

  function filterData(event) {
    
    const query = event.target.value.toLowerCase();
    const results = data.filter(item => {
        return item.Name.trim().toLowerCase().startsWith(query) && !item.Click;
    });
    const guessedResults = data.filter(item =>{return item.Click === true})
    if (query === "") {
      updateSearchResults([]); // Clear filteredData if query is empty
    }
    else
    {
        updateSearchResults(results);
        updatedGuesses(guessedResults);
    }
    

}


function Guess(result: any[])
{
    result.Click=true;
    searchText='';
    guessCount++;
    let hintCounter=3-guessCount;
    if(hintCounter>0)
    hintText="Location: " + hintCounter + " more tries necessary";
    else
    {
        hintText="Location: (Click to use)"
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
    const guessedResults = data.filter(item =>{return item.Click === true})


    if (query === "") {
      updateSearchResults([]); // Clear filteredData if query is empty
    }
    else
    {
        updateSearchResults(results);
        updatedGuesses(guessedResults);
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

<main>
    
    <div class="bg-gray-500 justify-center h-screen ">
		<div class="text-center text-white border border-black bg-black" >
            <a href="/">
			<button id="Title-Screen"> HXH DLE</button>
        </a>
        </div>
        <!--Hints-->
        <div class="transform translate-x-1/3 translate-y-14">
            <!-- 1/4 Left -->
            <button class="border border-black" on:click={revealLocation}>{hintText}</button>
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
<!--Display Guesses-->
<div class="fixed top-3/4 left-1/2 transform -translate-y-1/4 -translate-x-1/2">
    {#each guessedData as item}
    <table class="w-full">
        <tr class="self-center">
            <td class="w-1/2 {item.correctName ? 'bg-green-200' : 'bg-red-300'}">{item.Name}</td>
            <td class="w-1/2 {item.correctNen ? 'bg-green-200' : 'bg-red-300'}">{item.Nen}</td>
        </tr>
    </table>
{/each}

       
      
        
     
    
    </div>

    
</main>


