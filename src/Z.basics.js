// USUAL CONSTANTS
    const pigeonForm = document.querySelector('.container')
    const nameInput =  document.querySelector('#new-name')
    const imgInput = document.querySelector('#new-img')
    const trashInput = document.querySelector('#eats-trash')
    
    const pigeonContainer = document.querySelector('#pigeon-collection')

// ASSIGN URL TO CONSTANT
    const pigeonUrl = 'http://localhost:3000/pigeons'

// IF YOU NEED A DEFAULT TOGGLE ON PAGE LOAD
    let filterTrashEaters = false

// ################################################################

// RENDERING THINGS ON PAGE
const addPigeon = pigeon => {
        const pigeonItem = document.createElement('div')
        const pigeonInfo = document.createElement('div')
        const editForm = document.createElement('form')
        const pigeonImg = document.createElement('img')
        const pigeonName = document.createElement('h2')
        const trashLabel = document.createElement('h4')

        let status = pigeon.eatsTrash ? 'Stop eating trash' : 'Eat more trash'

        pigeonInfo.innerHTML = `
        <p id=likes-${pigeon.id}>${pigeon.likes} likes</p>
        <button class="action-btn" id="edit-${pigeon.id}">Edit ${pigeon.name}</button>
        <button class="action-btn" id="trash-btn-${pigeon.id}">${status}</button>
        <button class="action-btn" id="like-btn-${pigeon.id}">Boost ego</button>
        <button class="action-btn" id="delete-${pigeon.id}">Delete ${pigeon.name}</button>
        `

        trashLabel.innerText = `${pigeon.eatsTrash ? 'eats trash' : 'does not eat trash'}`
        trashLabel.style.color = `${pigeon.eatsTrash ? 'limegreen' : 'red'}`
        trashLabel.id = `trash-${pigeon.id}`
        
        pigeonName.innerText = `${pigeon.name}`
        pigeonName.id = `name-${pigeon.id}`

        pigeonImg.src = `${pigeon.image}`
        pigeonImg.id = `image-${pigeon.id}`

        pigeonInfo.id = `actionBlock-${pigeon.id}`
        
        pigeonItem.className = 'card'
        pigeonItem.id = `id-${pigeon.id}`

        
// IF THERE IS AN EDIT FORM:
        editForm.style.display = 'none'
        editForm.id = `editForm-${pigeon.id}`
        editForm.innerHTML = `
        <input type="text" id="edit-name-${pigeon.id}" value=${pigeon.name}>
        <input type="text" id="edit-img-${pigeon.id}" value=${pigeon.image}>
        <input type="submit" id="edit-trash-${pigeon.id}" value="Update Pigeon" class="submit">
        `

        editForm.addEventListener('submit', (event) => {
            event.preventDefault()
            const editNameInput = document.querySelector(`#edit-name-${pigeon.id}`)
            const editImgInput = document.querySelector(`#edit-img-${pigeon.id}`)
            const editTrashInput = document.querySelector(`#edit-trash-${pigeon.id}`)

            pigeon = {
                id: parseInt(pigeon.id),
                name: editNameInput.value,
                image: editImgInput.value,
                eatsTrash: editTrashInput.checked,
                likes: parseInt(pigeon.likes)
            }
            updatePigeon(pigeon)
                .then((serverPigeon) => {
                    pigeonName.innerHTML = `${serverPigeon.name}`
                    pigeonImg.src = `${serverPigeon.image}`
                  })
            displayPigeonDetails(pigeon, 'closed')
        })    

        pigeonImg.addEventListener('click', () => {
            displayPigeonDetails(pigeon, 'view')
        })

        pigeonContainer.appendChild(pigeonItem)


    
    pigeonItem.appendChild(pigeonName)
    pigeonItem.appendChild(trashLabel)
    pigeonItem.appendChild(pigeonImg)
    pigeonItem.appendChild(editForm)
    pigeonItem.appendChild(pigeonInfo)
    
    }

// ################################################################

// BATCH RENDERING
    const addPigeons = pigeons => {
        pigeons.forEach(addPigeon)
        pigeons.forEach(addButtonList)
    }
// ################################################################
    
// BUTTON FUNCTIONS 
const addButtonList = pigeon => {
    const likePigeonBtn = document.querySelector(`#like-btn-${pigeon.id}`)
    const likesEl = document.querySelector(`#likes-${pigeon.id}`)
    likePigeonBtn.addEventListener('click', () => {
        ++pigeon.likes;
        updatePigeon(pigeon)
        .then((serverPigeon) => {
            likesEl.innerText = `${serverPigeon.likes} likes`
          })
    });

    const editPigeonBtn = document.querySelector(`#edit-${pigeon.id}`)
    editPigeonBtn.addEventListener('click', () => {
        displayPigeonDetails(pigeon, 'edit')
    })

    const trashButton = document.querySelector(`#trash-btn-${pigeon.id}`)
    let status = pigeon.eatsTrash ? 'Stop eating trash' : 'Eat more trash' 
    trashButton.addEventListener('click', togglePigeonTrash(pigeon))


    const deletePigeonBtn = document.querySelector(`#delete-${pigeon.id}`)
    deletePigeonBtn.addEventListener('click', () => { 
        hidePigeon(pigeon)
        deletePigeon(pigeon)
    })
}    
    
// IF THERE IS A DELETE BUTTON
    const hidePigeon = (pigeon) => {
        document.querySelector(`#id-${pigeon.id}`).style = 'display: none;'
    }
    
// IF THERE IS A 'CREATE NEW' FORM/BUTTON

    pigeonForm.addEventListener('submit', (event) => {
        event.preventDefault()
        pigeon = {
            name: nameInput.value,
            image: imgInput.value,
            eatsTrash: trashInput.checked,
            likes: 0
        }

        createPigeon(pigeon)
            .then(serverPigeon => addPigeon(serverPigeon))

        document.querySelector('.pigeon-form').reset()
    })

//################################################################ 
// FETCHING
//################################################################ 

// CREATE
    const createPigeon = pigeon => 
        fetch(pigeonUrl, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pigeon)
        })
        .then(resp => resp.json())

// READ
    const getPigeons = () => 
        fetch(pigeonUrl)
        .then(resp => resp.json())

// UPDATE
    const updatePigeon = pigeon => 
        fetch((pigeonUrl + `/${pigeon.id}`), {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json',
                Accept: "application/json" },
            body: JSON.stringify(pigeon)
    })
    .then(resp => resp.json())

// DELETE
    const deletePigeon = pigeon =>
        fetch((pigeonUrl + `/${pigeon.id}`), {
        method: 'DELETE'
    })

//################################################################ 
// FANCY DISPLAY:

    const displayPigeonDetails = (pigeon, action) => {
        const pigeonAction = document.querySelector(`#actionBlock-${pigeon.id}`)
        const pigeonButtons = pigeonAction.querySelectorAll('.action-btn')

        const pigeonEditForm = document.querySelector(`#editForm-${pigeon.id}`)
                
        pigeonAction.appendChild(pigeonEditForm)

        for (button of pigeonButtons) {
            if (action === 'view') {
                button.style.display = 'block'
                pigeonEditForm.style.display = 'none'
            } else if (action === 'edit') {
                button.style.display = 'none'
                pigeonEditForm.style.display = 'block'
            } else {
                button.style.display = 'none'
                pigeonEditForm.style.display = 'none'
            }
        }
    }
// TOGGLING
    const togglePigeonTrash = pigeon => event => {
        const trashEl = document.querySelector(`#trash-${pigeon.id}`)
        const trashBtn = document.querySelector(`#trash-btn-${pigeon.id}`)
        
        pigeon.eatsTrash = !pigeon.eatsTrash;
        status = pigeon.eatsTrash ? 'Stop eating trash' : 'Eat more trash'
        
        displayPigeonDetails(pigeon, 'closed')
        updatePigeon(pigeon)
            .then(serverPigeon => {
                trashEl.innerHTML = `${serverPigeon.eatsTrash ? 'eats trash' : 'does not eat trash'}`
                trashEl.style.color = `${serverPigeon.eatsTrash ? 'limegreen' : 'red'}`
                trashBtn.innerHTML = `<button>${serverPigeon.eatsTrash ? 'Stop eating trash' : 'Eat more trash'}</button>`
            })
    }
// FILTERING

    const pigeonFilterButton = document.querySelector('#eats-trash-filter')
    pigeonFilterButton.innerHTML = filterTrashEaters ? 'Trash Filter: ON' : 'Trash Filter: OFF'
    

    const toggleFilterStatus = event => {
        filterTrashEaters = !filterTrashEaters
        pigeonFilterButton.innerHTML = filterTrashEaters ? 'Trash Filter: ON' : 'Trash Filter: OFF'
        const pigeonCards = document.querySelectorAll('.card')
        for (pig of pigeonCards) {pig.remove()}
        refreshPigeons()
    }

    const refreshPigeons = () => {
        getPigeons()
            .then(pigeons => addPigeons(pigeons.filter(pigeon => filterTrashEaters ? pigeon.eatsTrash : true)))   
    }

    pigeonFilterButton.addEventListener('click', toggleFilterStatus)

// TO GET SOMETHING TO POP OPEN
    const newPigeonBtn = document.querySelector('#new-pigeon-btn')
    
    let formPop = false
   
    newPigeonBtn.addEventListener('click', () => {
    formPop = !formPop

    if (formPop) {
      pigeonForm.style.display = 'block'
    } else {
      pigeonForm.style.display = 'none'
    }
  })

// ONLY DIRECT COMMAND
    refreshPigeons()
