const filterBtn = document.querySelector("#filter-btn");
const filterDialog = document.querySelector("#filter-dialog");
const searchForm = document.querySelector("#search-form");
const filterForm = document.querySelector("#form-dialog");
const newslist = document.querySelector("#news-list");
const searchParams = new URLSearchParams(window.location.search);
const closeModalBtn = document.querySelector('#close-modal-btn')

closeModalBtn.addEventListener('click', (e) => {
    e.preventDefault()
    filterDialog.close()
})

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
    const data = await searchNews(window.location.search);
    const main = document.querySelector("main");
    const ul = document.createElement("ul");
    main.appendChild(ul);
    data.items.forEach(async (e) => {
      const dias = diferencaData(e.data_publicacao);
      const img = await gerarJsonImagens(e.imagens)
      const li = document.createElement("li");
      li.innerHTML = `
          <div class="news-card">
          <img src=${img} />
          <div class="news-detail-container">
              <div id="name-descr-container">
                <h2>${e.titulo}</h2>
                <p>${e.introducao}</p>
              </div>
              <div class="date-type-conainer">
                <p id="category">${e.tipo}</p>
                <p id="date">Publicado ${
                  dias === 0 ? "hoje" : dias === 1 ? "há 1 dia" : `há ${dias} dias`
                }</p>
              </div>
            <a href=${e.link} target=_blank>Leia mais</a>
          </div>
          </div>`;
      ul.appendChild(li);
    });
  });

const diferencaData = (data) => {
  const dataAtual = new Date();
  let sanatizeData = data.split(" ");
  const data2 = sanatizeData[0].split("/");
  const dataPublicacao = new Date(
    data2[2],
    data2[1] - 1,
    data2[0]
  );

  //const dataPublicacao = new Date(data);
  const diferenca = dataAtual - dataPublicacao;
  const dias = diferenca / (1000 * 60 * 60 * 24);
  return Math.floor(dias);
};

const gerarJsonImagens = (imagens) => {
  const imagensJson = JSON.parse(imagens);
  const img = `https://agenciadenoticias.ibge.gov.br/${imagensJson.image_intro}`
  return img;
};
