const products = getAvailableProducts();
console.log("Products loaded:", products);

function renderProducts(products) {
  const productsList = document.getElementById("productsList");

  productsList.innerHTML = "";

  products.forEach(function (product) {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <div class="product-item">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">Price: $${product.price}</p>
        <p class="product-rating">Rating: ${product.rating}/10</p>
      </div>
    `;

    productsList.appendChild(listItem);
  });
}

renderProducts(products);
