const filterBtn = document.querySelector("#filter-btn")
const filterDialog = document.querySelector('#filter-dialog')

filterBtn.addEventListener("click", () => {
    filterDialog.showModal()
})