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
            const img = gerarJsonImagens(e.imagens)
            const li = document.createElement("li")
            li.innerHTML = `
            <img src=${e.imagens} />
            <div class="news-detail-container">
            <div id="name-descr-container">
              <h2>${e.titulo}</h2>
              <p>${e.introducao}</p>
            </div>
            <div class="date-type-conainer">
              <p id="category">${e.tipo}</p>
              <p id="date">Publicado há ${diferencaData(Date.parse(e.data_publicacao.toDate))}</p>
            </div>
  
            <button><a href=${e.link}>Leia mais</a></button>
          </div>`
            ul.appendChild(li)
        })}
    
  });

  const diferencaData = (data) => {
    const dataAtual = new Date()
    const dataPublicacao = new Date(data)
    const diferenca = dataAtual - dataPublicacao
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24))
    console.log(data)
    return dias
  }

  const gerarJsonImagens = (imagens) => {
    const imagensJson = JSON.parse(imagens)
    return imagensJson.image_intro
    
  }