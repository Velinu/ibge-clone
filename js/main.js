

//window.location.search = "busca=&tipo=release&qtd=5&de=&ate=";
document.addEventListener("DOMContentLoaded", async () => {
    filterDialog.close();

    if (!window.location.search) {
      window.location.search = "busca=&tipo=release&qtd=5&de=&ate=&page=1";
  }
    
    const data = await searchNews(window.location.search);
    console.log(window.location.search)
    addPagination(data, 5, window.location.search);
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
                <p id="category">#${e.editorias}</p>
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

  const addPagination = (data, currentPage, params) => {
    const urlParams = new URLSearchParams(params);
    const pagination = document.querySelector("#pagination");
    const totalPages = Math.ceil(data.totalPages / 10);
    const startPage = Math.max(1, currentPage - 4);
    const endPage = Math.min(totalPages, currentPage + 10);
  
    for (let i = startPage; i <= endPage; i++) {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = i;
      button.style.backgroundColor = i === currentPage ? "#4682b4" : "initial";
      button.onclick = () => {
        urlParams.set("page", i);
        window.location.search = urlParams.toString();
      };
      
      li.appendChild(button);
      pagination.appendChild(li);
    }
  }