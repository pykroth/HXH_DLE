

<script lang="ts">
    import { Result } from "postcss";


let answer;
let clickSearch = true;
let searchText = '';

let guessedRight = false;
let data = [
    {
        Name: "Gon Freecs",
        Click: false,
        Nen: "Enhancer",
        correctName: false,
        correctNen: false

    },
    {
        Name: "Killua Zoldyc",
        Click: false,
        Nen: "Transmutor",
        correctName: false,
        correctNen: false
    },
    {
        Name: "Uvo",
        Click: false,
        Nen: "Enhancer",
        correctName: false,
        correctNen: false
    },
    {
        Name: "Kurapika Kurta",
        Click: false,
        Nen: "Manipulator, Special",
        correctName: false,
        correctNen: false

    },
    {
        Name: "Leorio",
        Click: false,
        Nen: "Emission",
        correctName: false,
        correctNen: false
    },
    {
        Name: "Netero",
        Click: false,
        Nen: "Emission",
        correctName: false,
        correctNen: false
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


 
</script>

<main>
    
    <div class="bg-gray-500 justify-center h-screen ">
		<div class="text-center text-white border border-black bg-black" >
            <a href="/">
			<button id="Title-Screen"> HXH DLE</button>
        </a>
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


