function _init_() {
    loadJSON();
    limit_part();
}
_init_();

function loadJSON() {
    fetch('/CyberdeskV2/JS/data.json')
        .then(response => response.json())
        .then(data => {
            window.allData = data;
            const categorieURL = getCategorieDepuisURL();
            afficherCartes(categorieURL || 'Tous');
        })

}

document.addEventListener('DOMContentLoaded', () => {
    // Sélectionner le bouton "Tous" et l'ajouter à la classe "active"
    const btnTous = document.getElementById('btn-tous');
    if (btnTous) {
        btnTous.classList.add('active');
    }

    // Appeler la fonction pour afficher les cartes de la catégorie "Tous"
    afficherCartes('Tous');
});

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

    // Gérer l'état actif des boutons de filtre
    const boutons = document.querySelectorAll('#filter-buttons button');
    boutons.forEach(btn => {
        if (btn.textContent === categorie) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}


function limit_part() {
    const currentUser = JSON.parse(sessionStorage.getItem("current_user"));
    if (currentUser && currentUser.type === "part") {
        document.getElementById("Btn-SE").style.display = "none";
        document.getElementById("Btn-BU").style.display = "none";
    }
}
