const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyContainer = document.querySelector('#toy-collection');
const nameInput = document.querySelector('#new-name');
const imgInput = document.querySelector('#new-img');
const likeBtn = document.querySelectorAll('.like-btn'); 

let addToy = false

// YOUR CODE HERE
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// OR HERE!
const populateToy = toy => {
  const toyItem = document.createElement('div')
  const toyBtn = document.createElement('button')
  
  toyItem.className = 'card'
  toyItem.id = toy.id
  toyItem.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} />
    <p id = likes-${toy.id}>${toy.likes} likes</p>
    `
    
  toyBtn.className = "like-btn"
  toyBtn.id = `${toy.id}`
  toyBtn.innerText = "Like <3"

  toyBtn.addEventListener('click', () => {
    ++toy.likes;
    updateLikes(`${toy.id}`, `${toy.likes}`)
      .then(servtoy => updateToy(servtoy))
  });

  toyItem.appendChild(toyBtn)
  toyContainer.appendChild(toyItem);
}

const updateToy = toy => {
  const toyPEl = document.querySelector(`#likes-${toy.id}`)
  toyPEl.innerHTML = `${toy.likes} likes`
}

const populateToys = toys => {
  toys.forEach(toy => populateToy(toy))
}

toyForm.addEventListener('submit', (event) => {
  event.preventDefault()
    toy = {
      name: nameInput.value,
      image: imgInput.value,
      likes: 0
    }
  createToy(toy)
      .then(serverToy => populateToy(serverToy))
})

const getToys = () => 
  fetch('http://localhost:3000/toys/')
    .then(resp => resp.json())
    .then(toys => populateToys(toys))

const createToy = toy => 
  fetch('http://localhost:3000/toys', {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
  })
  .then(resp => resp.json())

const updateLikes = (id, likes) => 
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json',
      Accept: "application/json" },
    body: JSON.stringify({"likes": likes})
  })
  .then(resp => resp.json())

getToys()