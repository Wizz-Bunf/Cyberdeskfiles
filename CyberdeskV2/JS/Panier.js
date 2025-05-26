function afficherPanier(containerId = "contenu-panier") {
      const panier = JSON.parse(localStorage.getItem("panier")) || [];
      const container = document.getElementById(containerId);

      if (!container) return;

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
            <img src="/CyberdeskV2/image/${produit.image}" style="width:100px;">
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

    document.addEventListener("DOMContentLoaded", function () {
      afficherPanier();
    });