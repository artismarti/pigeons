const addPigeon = pigeon => {
    const pigeonItem = document.createElement('div')
    const pigeonInfo = document.createElement('div')
    const editForm = document.createElement('form')
    const pigeonImg = document.createElement('img')
    const pigeonName = document.createElement('h2')
    const trashLabel = document.createElement('h4')

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

     
    pigeonItem.appendChild(pigeonName)
    pigeonItem.appendChild(trashLabel)
    pigeonItem.appendChild(pigeonImg)
    pigeonItem.appendChild(likesEl)

    pigeonInfo.appendChild(editPigeonBtn)
    pigeonInfo.appendChild(trashButton)
    pigeonInfo.appendChild(likePigeonBtn) 
    pigeonInfo.appendChild(deletePigeonBtn)
    
    pigeonItem.appendChild(editForm)

    pigeonItem.appendChild(pigeonInfo)
    
}


// BATCH RENDERING
    const addPigeons = pigeons => {
        pigeons.forEach(addPigeon)
    }