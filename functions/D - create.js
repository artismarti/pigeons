// OUTSIDE OF THE SINGLE RENDER FUNCTION

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

