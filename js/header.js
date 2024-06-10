const filterBtn = document.querySelector("#filter-btn");
const filterDialog = document.querySelector("#filter-dialog");
const searchForm = document.querySelector("#search-form");
const filterForm = document.querySelector("#form-dialog");
const searchInput = document.querySelector("#search-input");
const newslist = document.querySelector("#news-list");
const searchParams = new URLSearchParams(window.location.search);
const closeModalBtn = document.querySelector('#close-modal-btn')

closeModalBtn.addEventListener('click', (e) => {
  filterDialog.close();
  e.preventDefault();
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
