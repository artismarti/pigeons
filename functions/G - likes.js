// INSIDE OF THE SINGLE RENDER FUNCTION:
const likePigeonBtn = document.createElement('p')
    const likesEl = document.createElement('p')
        
    likesEl.id = `#likes-${pigeon.id}`
    likesEl.innerHTML = `${pigeon.likes} likes`

    likePigeonBtn.innerHTML = '<button>Boost ego</button>'

    likePigeonBtn.className = "like-btn"
    likePigeonBtn.id = `like-btn-${pigeon.id}`

//IF YOU WANT IT VISIBLE BY DEFAULT: 
        // likePigeonBtn.style = 'width: 15rem; display: block;'
//IF YOU WANT IT HIDDEN UNTIL ACTION:
        // likePigeonBtn.style = 'width: 15rem; display: none;'

    likePigeonBtn.addEventListener('click', () => {
        ++pigeon.likes;
        updatePigeon(pigeon)
        .then((serverPigeon) => {
            likesEl.innerText = `${serverPigeon.likes} likes`
            })
    });
