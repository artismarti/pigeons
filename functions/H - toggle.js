// OUTSIDE OF SINGLE RENDER FUNCTION

const trashButton = document.createElement('p')
    
let status = pigeon.eatsTrash ? 'Stop eating trash' : 'Eat more trash' 

trashButton.innerHTML = `<button>${status}</button>`
trashButton.id = `trash-btn-${pigeon.id}`
    
trashButton.addEventListener('click', togglePigeonTrash(pigeon))

// IF YOU WANT IT VISIBLE BY DEFAULT:
    // trashButton.style = 'width: 15rem; display: block;'
//IF YOU WANT IT HIDDEN UNTIL ACTION:
    // trashButton.style = 'width: 15rem; display: none;'

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

