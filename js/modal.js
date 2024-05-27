const closeModalBtn = document.querySelector('#close-modal-btn')

closeModalBtn.addEventListener('click', (e) => {
    e.preventDefault()
    filterDialog.close()
})