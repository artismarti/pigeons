const newPigeonBtn = document.querySelector('#new-pigeon-btn')
    
    let formPop = false
   
    newPigeonBtn.addEventListener('click', () => {
    formPop = !formPop

    if (formPop) {
      pigeonForm.style.display = 'block'
    } else {
      pigeonForm.style.display = 'none'
    }
  })
