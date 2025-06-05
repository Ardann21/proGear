import { products } from "../data/products.js";
import { addToCart } from "../data/cart.js";
import { updateCartQuantity } from "../js/main.js";

// 1. Build the HTML string
let productsHTML = "";
products.forEach((product) => {
  productsHTML += `
    <div class="product-card" >
      <a style="text-decoration: none;" href="product.html?id=${product.id}">
        <img src="${product.image}" alt="${product.name}" />
        <h4">${product.name}</h4>
        <p class="price">$${(product.priceCents / 100).toFixed(2)}</p>
      </a>
      <button class="js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

// 2. Inject into the shop page
const productsContainer = document.querySelector(".products-js");
productsContainer.innerHTML = productsHTML;

// 3. Wire up “Add to Cart” buttons
document.querySelectorAll(".js-add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.productId;
    addToCart(id);
    updateCartQuantity();
  });
});

// 4. Update cart badge
updateCartQuantity();

const container = document.querySelector(".products-js");

// Build and insert product cards for a given category
export function renderCards(category = "Bundles & Packages") {
  var list = [];
  // explicit if/else instead of ternary
  if (category !== undefined && category !== "") {
    for (var i = 0; i < products.length; i++) {
      if (products[i].category === category) {
        list.push(products[i]);
      }
    }
  } else {
    list = products;
  }

  container.innerHTML = list
    .map(
      (p) => `
        <div class="product-card" data-category="${p.category}">
          <a style="text-decoration:none;" href="product.html?id=${p.id}">
            <img src="${p.image}" alt="${p.name}" />
            <h4>${p.name}</h4>
            <p class="price">$${(p.priceCents / 100).toFixed(2)}</p>
          </a>
          <button class="js-add-to-cart" data-id="${p.id}">Add to Cart</button>
        </div>
      `
    )
    .join("");
}

// Delegate Add-to-Cart clicks
container.addEventListener("click", (event) => {
  if (event.target.matches(".js-add-to-cart")) {
    addToCart(event.target.dataset.id);
    updateCartQuantity();
  }
});

renderCards();
updateCartQuantity();
