// create form to create new monster

const formDiv = document.querySelector('#create-monster');
const formEl = document.createElement('form');
const nameInput = document.createElement('input');
const ageInput = document.createElement('input');
const descInput = document.createElement('input');
const createBtn = document.createElement('button');

formEl.id = 'create-monster';

nameInput.type = 'text';
nameInput.id = 'name';
nameInput.placeholder = 'name...';

ageInput.type = 'text';
ageInput.id = 'age';
ageInput.placeholder = 'age...';

descInput.type = 'text';
descInput.id = 'description';
descInput.placeholder = 'description';

createBtn.id = 'create-monster-btn'
createBtn.innerText = 'Create';

formEl.append(nameInput, ageInput, descInput, createBtn);
formDiv.appendChild(formEl);

// add monster to the page

const addMonster = monster => {
    const monsterItem = document.createElement('div')
    monsterItem.id = monster.id
    monsterItem.className = 'monster-item'
    monsterItem.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.description}</p>
    `
    monsterContainer.appendChild(monsterItem);
}

const addMonsters = monsters => {
    monsters.forEach(monster => addMonster(monster))
}

// save monster to API

formEl.addEventListener('submit', function(){event => {
    event.preventDefault()

    const monster = {
        name: nameInput.value,
        age: ageInput.value,
        description: descInput.value
    }

    createMonster(monster)
    
    formEl.reset()
}})

//first page load lists 50 monsters

const monsterContainer = document.querySelector('#monster-container');

const getMonsters = (page) => {
    const monsterList = document.querySelectorAll('.monster-item');
    for (monster of monsterList) { 
        monster.remove()
    }
    
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(resp => resp.json())
        .then(monsters => addMonsters(monsters))
    currentPage = page;
}
let currentPage = 1;
getMonsters(currentPage)

// create monster

const createMonster = monster => {
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(monster),
    })
    .then(resp => resp.json())
}
    
//'forward' and 'back' buttons

document.getElementById('forward').addEventListener('click', function (){getMonsters(`${parseInt(currentPage) + 1}`);});
document.getElementById('back').addEventListener('click', function(){getMonsters(`${parseInt(currentPage) - 1}`);});
