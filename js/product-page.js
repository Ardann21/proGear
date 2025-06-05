import { getProduct } from "../data/products.js";
import { addToCart } from "../data/cart.js";
import { updateCartQuantity } from "../js/main.js";

// 1. Read the `id` query-param from the URL:
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// 2. Fetch the product data:
const product = getProduct(productId);

if (!product) {
  // If no match, show an error
  document.querySelector(".detail-container").innerHTML =
    "<p>Product not found.</p>";
} else {
  // 3. Populate image, name, price
  const mainImg = document.querySelector(".main-img");
  mainImg.src = product.image;

  document.querySelector(".bread-name").textContent = product.name;
  document.querySelector(".product-name").textContent = product.name;
  document.querySelector(".description-sec").textContent = product.desc;
  document.getElementById("product-spec").innerHTML = product.spec;

  document.querySelector(".price").textContent = `$${(
    product.priceCents / 100
  ).toFixed(2)}`;

  // 4. Wire up “Add to Cart” to respect the quantity input:
  document.querySelector(".js-add-to-cart").addEventListener("click", () => {
    const qtyInput = document.getElementById("qty");
    const qty = Math.max(1, qtyInput.value || 1);

    // Call addToCart once per unit:
    for (let i = 0; i < qty; i++) {
      addToCart(productId);
    }
    updateCartQuantity();
  });
}
