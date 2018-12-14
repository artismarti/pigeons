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
