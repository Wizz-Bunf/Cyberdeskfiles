function _init_() {
  loadJSON();
  limit_part();
}
_init_();

// Afficher les cartes depuis JSON
function loadJSON() {
  fetch('/CyberdeskV2/JS/data.json')
    .then(response => response.json())
    .then(data => {
      window.allData = data;
      const categorieURL = getCategorieDepuisURL();
      afficherCartes(categorieURL || 'Tous');
    })
    .catch(error => {
      console.error("Erreur de chargement JSON :", error);
    });
}

// Tous = defaut
document.addEventListener('DOMContentLoaded', () => {
  const btnTous = document.getElementById('btn-tous');
  if (btnTous) {
    btnTous.classList.add('active');
  }

  afficherCartes('Tous');

  // Affiche automatiquement le panier s’il y a un conteneur
  afficherPanier(); // utilisable sur Panier.html et Utilisateur.html
});


function getCategorieDepuisURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('categorie');
}

//Categorie des cartes
function afficherCartes(categorie) {
  const container = document.getElementById("card_container");
  if (!container || !window.allData) return;

  container.innerHTML = "";

  const dataToDisplay = (categorie === 'Tous')
    ? window.allData
    : window.allData.filter(item => item.category === categorie);

  if (dataToDisplay.length === 0) {
    container.innerHTML = "<p>Aucun élément trouvé pour cette catégorie.</p>";
    return;
  }

  dataToDisplay.forEach(element => {
    const carteHTML = `
      <div class="card">
        <a href="/CyberdeskV2/html/detailProduit.html?id=${element.id}">
          <h2>${element.name}</h2>
          <img class="image" src="/CyberdeskV2/image/${element.image}" alt="${element.name}">
          <p class="short_desc">${element.description}</p>
          <p class="category">${element.category}</p>
          <p class="sale_price">${element.sale_price} €</p>
        </a>
        <button class="ajout-panier" onclick="ajouterAuPanier(${element.id})">Ajouter au panier</button>
      </div>
    `;
    container.innerHTML += carteHTML;
  });

//Filtre
  const boutons = document.querySelectorAll('#filter-buttons button');
  boutons.forEach(btn => {
    if (btn.textContent === categorie) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}



// Panier!
function ajouterAuPanier(idProduit) {
  if (!window.allData) {
    alert("Données produits non disponibles !");
    return;
  }

  const produit = window.allData.find(p => p.id === idProduit);

  if (!produit) {
    alert("Produit introuvable.");
    return;
  }

  let panier = JSON.parse(localStorage.getItem("panier")) || [];

  const produitExistant = panier.find(item => item.id === produit.id);
  if (produitExistant) {
    produitExistant.quantite += 1;
  } else {
    panier.push({ ...produit, quantite: 1 });
  }

  localStorage.setItem("panier", JSON.stringify(panier));
  alert(`"${produit.name}" a été ajouté au panier.`);
}

// Contenu panier
function afficherPanier(containerId = "contenu-panier") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const panier = JSON.parse(localStorage.getItem("panier")) || [];

  if (panier.length === 0) {
    container.innerHTML = "<p>Votre panier est vide.</p>";
    return;
  }

  let total = 0;
  container.innerHTML = panier.map(produit => {
    total += produit.sale_price * produit.quantite;
    return `
      <div class="item-panier">
        <h3>${produit.name}</h3>
        <img src="/CyberdeskV2/image/${produit.image}" alt="${produit.name}" style="width:100px;">
        <p>Prix : ${produit.sale_price} €</p>
        <p>Quantité : ${produit.quantite}</p>
        <hr>
      </div>
    `;
  }).join('') + `<h3>Total : ${total.toFixed(2)} €</h3>`;
}


function viderPanier() {
  localStorage.removeItem("panier");
  location.reload();
}
