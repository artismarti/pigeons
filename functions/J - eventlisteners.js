// FORM SUBMISSION:
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

// MAKE WHOLE CARD CLICKABLE:
    pigeonItem.addEventListener('click', () => {
        displayPigeonDetails(pigeon, 'view')
    })

    pigeonContainer.appendChild(pigeonItem)

// MAKE IMAGE CLICKABLE
    pigeonImg.addEventListener('click', () => {
        displayPigeonDetails(pigeon, 'view')
    })

    pigeonContainer.appendChild(pigeonItem)

// EDIT EVENT
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
    
// LIKE EVENT
    likePigeonBtn.addEventListener('click', () => {
        ++pigeon.likes;
        updatePigeon(pigeon)
        .then((serverPigeon) => {
            likesEl.innerText = `${serverPigeon.likes} likes`
        })
    });

// DELETE EVENT
    deletePigeonBtn.addEventListener('click', () => { 
        hidePigeon(pigeon)
        deletePigeon(pigeon)
    })

// TOGGLE EVENT
    trashButton.addEventListener('click', togglePigeonTrash(pigeon))