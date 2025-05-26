document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get('id')); // Conversion en nombre

  if (isNaN(productId)) {
    console.error('ID de produit invalide dans l\'URL.');
    return;
  }

  fetch('/CyberdeskV2/JS/data.json')
    .then(response => response.json())
    .then(data => {
      const product = data.find(item => item.id === productId);

      if (!product) {
        console.error('Produit non trouvé.');
        return;
      }

      document.getElementById('product_name').textContent = product.name;
      document.getElementById('product_image').src = `/CyberdeskV2/image/${product.image}`;
      document.getElementById('product_description').textContent = product.description;
      document.getElementById('product_category').textContent = product.category;
      document.getElementById('product_price').textContent = `${product.sale_price} €`;
      
    })
    .catch(error => console.error('Erreur lors du chargement des données :', error));
});