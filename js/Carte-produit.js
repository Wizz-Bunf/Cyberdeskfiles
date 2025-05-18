function _init_() {
    fetch('/js/data.json')
        .then(response => response.json())
        .then(data => {
            window.allData = data;
            const categorieURL = getCategorieDepuisURL(); // 🔍
            afficherCartes(categorieURL || 'Tous'); // Défaut = "Tous"
        })
;
}
_init_();

function getCategorieDepuisURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('categorie');
} 

function afficherCartes(categorie) {
    const container = document.getElementById("card_container");
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
                <a href="/html/Produit.html?id=${element.id}">
                    <h2>${element.name}</h2>
                    <img class="image" src="/image/${element.image}" alt="${element.name}">
                    <p class="short_desc">${element.short_desc}</p>
                    <p class="category">${element.category}</p>
                    <p class="sale_price">${element.sale_price} €</p>
                </a>
                <button class="ajout-panier" onclick="ajouterAuPanier(${element.id})">Ajouter au panier</button>

            </div>
        `;
        container.innerHTML += carteHTML;
    });

    const boutons = document.querySelectorAll('#filter-buttons button');
    boutons.forEach(btn => {
        if (btn.textContent === categorie) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}



function currentProduct(product){
    sessionStorage.setItem('product', JSON.stringify(product));
    console.log(product, 'zej^foiEZJTOIEZJ')
}

function getQueryParam(param){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function displayDataProduct() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        console.error('Aucun ID de produit trouvé dans l\'URL.');
        return;
    }

    const product = window.allData.find(item => item.id === productId);

    if (!product) {
        console.error('Produit non trouvé.');
        return;
    }

    // Afficher les informations du produit
    document.getElementById('product_name').textContent = product.name;
    document.getElementById('product_image').src = `/image/${product.image}`;
    document.getElementById('product_description').textContent = product.short_desc;
    document.getElementById('product_category').textContent = product.category;
    document.getElementById('product_price').textContent = `${product.sale_price} €`;
}

document.addEventListener('DOMContentLoaded', displayDataProduct);
/*Produit detail*/

const element = document.getElementById('product_name');
if (element) {
    element.innerHTML = product.name;
} else {
    console.error('Élément #product_name introuvable.');
}


function ajouterAuPanier(id) {
    const panier = JSON.parse(sessionStorage.getItem('panier')) || [];
    const produit = window.allData.find(item => item.id === id);

    if (produit) {
        const index = panier.findIndex(item => item.id === id);
        if (index !== -1) {
            panier[index].quantite++;
        } else {
            panier.push({ ...produit, quantite: 1 });
        }
        sessionStorage.setItem('panier', JSON.stringify(panier));
        mettreAJourPanier();
    }
}


function mettreAJourPanier() {
    const panier = JSON.parse(sessionStorage.getItem('panier')) || [];
    const totalArticles = panier.reduce((total, item) => total + item.quantite, 0);
    const panierIcon = document.querySelector('.panier span');
    if (panierIcon) {
        panierIcon.textContent = totalArticles;
    }
}


document.addEventListener('DOMContentLoaded', mettreAJourPanier);

function afficherPanier() {
    const panier = JSON.parse(sessionStorage.getItem('panier')) || [];
    const container = document.getElementById('panier_container');
    container.innerHTML = '';

    if (panier.length === 0) {
        container.innerHTML = '<p>Votre panier est vide.</p>';
    } else {
        panier.forEach(item => {
            const articleHTML = `
                <div class="article">
                    <h3 id="product_name">${item.name}</h3>
                    <p>Quantité: ${item.quantite}</p>
                    <p>Prix unitaire: ${item.sale_price} €</p>
                    <p>Total: ${item.sale_price * item.quantite} €</p>
                    <button onclick="supprimerArticle(${item.id})">Supprimer</button>
                </div>
            `;
            container.innerHTML += articleHTML;
        });
    }
}

function supprimerArticle(id) {
    let panier = JSON.parse(sessionStorage.getItem('panier')) || [];
    panier = panier.filter(item => item.id !== id);
    sessionStorage.setItem('panier', JSON.stringify(panier));
    afficherPanier();
    mettreAJourPanier();
}

document.addEventListener('DOMContentLoaded', afficherPanier);



