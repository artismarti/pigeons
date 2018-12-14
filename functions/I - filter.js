// OUTSIDE OF SINGLE RENDER FUNCTION

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