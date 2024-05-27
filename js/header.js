const filterBtn = document.querySelector("#filter-btn");
const filterDialog = document.querySelector("#filter-dialog");
const searchForm = document.querySelector("#search-form");
const filterForm = document.querySelector("#form-dialog");
const newslist = document.querySelector("#news-list");
const searchParams = new URLSearchParams(window.location.search);

filterBtn.addEventListener("click", () => {
  filterDialog.showModal();
});

async function searchNews(params) {
  let url = `http://servicodados.ibge.gov.br/api/v3/noticias/${params}&qtd=10`;
  const data = await getJsonData(url);
  return data;
}

async function getJsonData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

document.addEventListener("DOMContentLoaded", async (event) => {
  if (window.location.search) {
    const data = await searchNews(window.location.search);
    const main = document.querySelector("main");
    const ul = document.createElement("ul");
    main.appendChild(ul);
    data.items.forEach((e) => {
      const dias = diferencaData(Date.parse(e.data_publicacao));
      //const img = gerarJsonImagens(e.imagens)
      const li = document.createElement("li");
      li.innerHTML = `
          <img src=${e.imagens} />
          <div class="news-detail-container">
              <div id="name-descr-container">
                <h2>${e.titulo}</h2>
                <p>${e.introducao}</p>
              </div>
              <div class="date-type-conainer">
                <p id="category">${e.tipo}</p>
                <p id="date">Publicado há ${
                  dias !== NaN ? dias + " dias" : "Hoje"
                }</p>
              </div>
            <a href=${e.link}>Leia mais</a>
          </div>`;
      ul.appendChild(li);
    });
  }
});

const diferencaData = (data) => {
  const dataAtual = new Date();
  const dataPublicacao = new Date(data);
  const diferenca = dataAtual - dataPublicacao;
  const dias = diferenca / (1000 * 60 * 60 * 24);
  return Math.floor(dias);
};

const gerarJsonImagens = (imagens) => {
  const imagensJson = JSON.parse(imagens);
  return `${imagensJson.image_intro}`;
};
