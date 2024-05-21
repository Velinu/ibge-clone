const filterBtn = document.querySelector("#filter-btn")
const filterDialog = document.querySelector('#filter-dialog')
const searchForm = document.querySelector("#search-form")
const filterForm = document.querySelector("#form-dialog")
const newslist = document.querySelector("#news-list")
const searchParams = new URLSearchParams(window.location.search);


filterBtn.addEventListener("click", () => {
    filterDialog.showModal()
})

async function searchNews(params) {
    let url = `http://servicodados.ibge.gov.br/api/v3/noticias/${params}&qtd=10`
    const data = await getJsonData(url)
    return data
}

searchForm.addEventListener('submit', (e) => {
    const formData = new FormData(e.target)
    const busca = formData.get("term")
    
    searchParams.set('busca', busca)
})

filterForm.addEventListener('submit', (e) => {
    const formData = new FormData(e.target)
    console.log(formData)
    const de = formData.get("de");
    const ate = formData.get("ate");
    searchParams.set('de', de)
    searchParams.set('ate', ate)
    
})

async function getJsonData(url){
    console.log(url)
    const res = await fetch(url)
    const data  = await res.json()
    return data
}

function generateUrlParams(params){
    
}

document.addEventListener("DOMContentLoaded", async (event) => {
    if(window.location.search){const data = await searchNews(window.location.search)
        console.log(data)
        const main = document.querySelector('main')
        const ul = document.createElement('ul')
        main.appendChild(ul)
        data.items.forEach((e) => {
            const li = document.createElement("li")
            li.innerHTML = `<h1> ${e.titulo} </h1>`
            ul.appendChild(li)
        })}
    
  });