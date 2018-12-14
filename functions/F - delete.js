// USE THIS TO HIDE CARD UNTIL PAGE RELOAD
    const hidePigeon = (pigeon) => {
        document.querySelector(`#id-${pigeon.id}`).style = 'display: none;'
    }

    const deletePigeonBtn = document.createElement('p')
            
    deletePigeonBtn.className = 'delete-btn'
    deletePigeonBtn.id = `delete-${pigeon.id}`
    deletePigeonBtn.innerHTML = `<button>Delete ${pigeon.name}</button>`

// IF YOU WANT IT VISIBLE BY DEFAULT:
        deletePigeonBtn.style = 'width: 15rem; display: block;'
//IF YOU WANT IT HIDDEN UNTIL ACTION:
        // deletePigeonBtn.style = 'width: 15rem; display: none;'

    deletePigeonBtn.addEventListener('click', () => { 
        hidePigeon(pigeon)
        deletePigeon(pigeon)
    })