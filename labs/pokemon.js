// get th stuff we need
const formEl = document.querySelector('#poke-form')
const nameInput = document.querySelector('#name')
const imageInput = document.querySelector('#image')
const pokeListEl = document.querySelector('#poke-list')

// add a single pokemon to the page
const addPokemon = pokemon => {
  const pokeItem = document.createElement('li')
  pokeItem.className = 'poke-item'
  pokeItem.id = pokemon.id
  pokeItem.innerHTML = `
    <h3>${pokemon.name}</h3>
    <img src="${pokemon.image}" />
  `
  pokeItem.addEventListener('click', () => {
    pokeItem.remove()
    deletePokemon(pokemon.id)
  })
  pokeListEl.appendChild(pokeItem)
}

// use the above function multiple times
const addPokemons = pokemons => {
  pokemons.forEach(pokemon => addPokemon(pokemon))
}


// listen to the form submission
formEl.addEventListener('submit', event => {
  event.preventDefault()

  // create a pokemon object
  const pokemon = {
    name: nameInput.value,
    image: imageInput.value
  }

  // create a pokemon on the server, *then* put it on the page
  createPokemon(pokemon)
    .then(serverPokemon => addPokemon(serverPokemon))
    .catch(() => alert('Unable to create pokemon. Check your internet connection.'))
  
  formEl.reset()
})

// GET all pokes from the server
const getPokemons = () =>
  fetch('http://localhost:3000/pokemons')
    .then(resp => resp.json())

// POST a new pokemon to the server
const createPokemon = pokemon =>
  fetch('http://localhost:3000/pokemons', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pokemon)
  }).then(resp => resp.json())

// DELETE a pokemon from the server
const deletePokemon = id =>
  fetch(`http://localhost:3000/pokemons/${id}`, {
    method: 'DELETE'
  }).then(resp => console.log(resp))
    .catch(err => alert(err))

// GET all the pokemons, *then* put them on the page upon load
getPokemons()
  .then(addPokemons)