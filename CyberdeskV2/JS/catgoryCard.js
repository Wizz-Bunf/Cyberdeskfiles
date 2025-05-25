fetch('/CyberdeskV2/JS/catgoryCard.json')
  .then(response => response.json())
  .then(dov => {
    categoryCard(dov);
  })


function categoryCard(category) {
    let carteC = document.getElementById("CarteCategory");
     (carteC.innerHTML = '')
     category.forEach(element => {
    carteC.innerHTML += `
      <div class="carteCadre">
        <div><img src="/CyberdeskV2/img/${element.image}" alt="${element.name}" class="categoryPic"></div>
        <h3>${element.name}</h3>
        <button><a href="/CyberdeskV2/HTML/${element.link}">Voir plus<a/></button>
      </div>
    `;}
     )}

