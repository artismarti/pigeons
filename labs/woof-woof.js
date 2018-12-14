const dogsURl = 'http://localhost:3000/pups'
const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const dogFilterButton = document.querySelector('#good-dog-filter')

let filterGoodDogs = false

const getAllDogs = () => fetch(dogsURl)
    .then(res => res.json())

const renderDogs = dogs => {
    dogBar.innerHTML = ''
    dogs.forEach(renderDog)
}

const renderDog = dog => {
    const dogSpan = document.createElement('span')

    dogSpan.innerText = dog.name

    dogBar.appendChild(dogSpan)

    dogSpan.addEventListener('click', handleDogClick(dog))
}

const handleDogClick = dog => {
    return event => {
        displayDogDetails(dog)
    }
}

const displayDogDetails = dog => {
    dogInfo.innerHTML = `
        <img src=${dog.image}>
        <h2>${dog.name}</h2>
    `
    const goodButton = document.createElement('button')

    goodButton.innerText = dog.isGoodDog ? 'Bad dog' : 'Good dog'

    dogInfo.appendChild(goodButton)

    goodButton.addEventListener('click', toggleDogGoodness(dog))

}

const toggleDogGoodness = dog => event => {
    dog.isGoodDog = !dog.isGoodDog;
    displayDogDetails(dog)
    updateDogInBackend(dog)
        .then(refreshDogsInBar)
}

const updateDogInBackend = dog => fetch(`${dogsURl}/${dog.id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(dog)
})


const toggleFilterStatus = event => {
    filterGoodDogs = !filterGoodDogs
    refreshDogsInBar()
}

const refreshDogsInBar = () => {
    getAllDogs()
        .then(dogs => renderDogs(dogs.filter(d => filterGoodDogs ? d.isGoodDog : true)))
}

dogFilterButton.addEventListener('click', toggleFilterStatus)

refreshDogsInBar()