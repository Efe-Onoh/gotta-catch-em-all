const searchBtn = document.getElementById('search-button')
const searchInput = document.getElementById('search-input')
const pokemonName = document.getElementById("pokemon-name")
const pokemonId = document.getElementById('pokemon-id')
const pokemonWeight = document.getElementById('weight')
const pokemonHeight = document.getElementById('height')
const pokemonType = document.getElementById('types')
const pokemonHp = document.getElementById('hp')
const pokemonAttack = document.getElementById('attack')
const pokemonDefense = document.getElementById('defense')
const pokemonSpecialAttack = document.getElementById('special-attack')
const pokemonSpecialDefense = document.getElementById('special-defense')
const pokemonSpeed = document.getElementById('speed')

const searchPokemon = async ()=>{
    const searchVal = searchInput.value.toLowerCase();

   const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon`)
   const allPokemon = await res.json()

   console.log("allPokemon", allPokemon)

const pokemon = allPokemon.results.find((pokemon)=>pokemon.id === parseInt(searchVal) || pokemon.name.toLowerCase() === searchVal)

console.log("pokemon", pokemon)

if(pokemon){
    fetch(pokemon.url.replace(/http/,"https"))
    .then(response => {
          console.log("response:",response)
          return response.json()
        
        })
        .then(data => {
          console.log("data:", data)

pokemonName.innerText = `${data.name.toUpperCase()}`;
pokemonId.innerText = `#${data.id}`;
pokemonWeight.innerText = `Weight: ${data.weight}`;
pokemonHeight.innerText = `Height: ${data.height}`;

const types = data.types.map(type => `<span>${type.type.name.toUpperCase()}</span>`).join(' ');

pokemonType.innerHTML = `${types}`;

pokemonHp.innerText = `${data.stats[0].base_stat}`;

pokemonAttack.innerText = `${data.stats[1].base_stat}`;

pokemonDefense.innerText = `${data.stats[2].base_stat}`;

pokemonSpecialAttack.innerText = `${data.stats[3].base_stat}`;

pokemonSpecialDefense.innerText = `${data.stats[4].base_stat}`;

pokemonSpeed.innerText = `${data.stats[5].base_stat}`; 

const spriteUrl = data.sprites.front_default;
                const spriteElement = `<div><img id="sprite" src="${spriteUrl}"></div>`;

pokemonName.innerHTML += spriteElement

})
.catch(error => {
            console.error('Error fetching data:', error);
});
}
else{
  alert('Pokemon not found!');
}
}

searchBtn.addEventListener('click',searchPokemon)