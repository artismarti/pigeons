// INSIDE OF THE SINGLE RENDER FUNCTION: 
    editForm.style.display = 'none'
    editForm.id = `editForm-${pigeon.id}`
    editForm.innerHTML = `
    <input type="text" id="edit-name-${pigeon.id}" value=${pigeon.name}>
    <input type="text" id="edit-img-${pigeon.id}" value=${pigeon.image}>
    <input type="submit" id="edit-trash-${pigeon.id}" value="Update Pigeon" class="submit">
    `

    const editPigeonBtn = document.createElement('p')
            
    editPigeonBtn.className = 'edit-btn'
    editPigeonBtn.id = `edit-${pigeon.id}`
    editPigeonBtn.innerHTML = `<button>Edit ${pigeon.name}</button>`

// IF YOU WANT IT VISIBLE BY DEFAULT:
    editPigeonBtn.style = 'width: 15rem; display: block;'
//IF YOU WANT IT HIDDEN UNTIL ACTION:
    // editPigeonBtn.style = 'width: 15rem; display: none;'

    editPigeonBtn.addEventListener('click', () => {
        displayPigeonDetails(pigeon, 'edit')
    })

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
