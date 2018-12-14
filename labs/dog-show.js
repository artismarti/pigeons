const dogTable = document.querySelector('#table-body')
const dogForm = document.querySelector('#dog-form')
const nameInput =  document.querySelector('#name')
const breedInput = document.querySelector('#breed')
const sexInput = document.querySelector('#sex')
const idInput = document.querySelector('#id')
const dogUrl = 'http://localhost:3000/dogs'

const addDog = dog => {
    const dogRow = document.createElement('tr')
    const editBtn = document.createElement('button')
    
    editBtn.class = 'btn-success'
    editBtn.style = 'width: 100%'
    editBtn.id = `edit-${dog.id}`
    editBtn.innerHTML = 'Edit'
    
    dogRow.id = `dogs-${dog.id}`
    dogRow.innerHTML = `   
        <tr class="padding">
        <td id="name-${dog.id}">${dog.name}</td>
        <td id="breed-${dog.id}">${dog.breed}</td>
        <td id="sex-${dog.id}">${dog.sex}</td>
        </tr>
    `
    

    editBtn.addEventListener('click', () => {
        nameInput.value = dog.name
        breedInput.value = dog.breed
        sexInput.value = dog.sex
        idInput.value = dog.id
    });

    dogTable.appendChild(dogRow)
}

dogForm.addEventListener('submit', (event) => {
    event.preventDefault()
    dog = {
        id: parseInt(idInput.value),
        name: nameInput.value,
        breed: breedInput.value,
        sex: sexInput.value
      }
    updateInfo(dog)
        .then(updateDog)
})

const updateDog = dog => {
    const dogNm = document.querySelector(`#name-${dog.id}`)
    const dogBrd = document.querySelector(`#breed-${dog.id}`)
    const dogSx = document.querySelector(`#sex-${dog.id}`)
    
    dogNm.innerHTML = `${nameInput.value}`
    dogBrd.innerHTML = `${breedInput.value}`
    dogSx.innerHTML = `${sexInput.value}`

    dogForm.reset()
}

const addDogs = dogs => {
    dogs.forEach(addDog)
}

const getDogs = () => {
    fetch(dogUrl)
    .then(resp => resp.json())
    .then(addDogs)
}

const updateInfo = dog => 
    fetch((dogUrl + `/${dog.id}`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json',
            Accept: "application/json" },
        body: JSON.stringify(dog)
    })
    .then(resp => resp.json())

getDogs()