import { cart, removeCart, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { renderSummary } from "../js/payment.js";

// Toggle mobile menu
const btn = document.getElementById("mobile-menu-toggle");
const menu = document.getElementById("mobile-menu");

btn.addEventListener("click", () => {
  btn.classList.toggle("open");
  menu.classList.toggle("open");
});

/*mobile dropdown*/
const dropdown = document.getElementsByClassName("shop-m-toggle");

for (let i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    this.classList.toggle("open");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

let innerHTMLcart = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  innerHTMLcart += `
      <div class="cart-item js-cart-item-container-${matchingProduct.id}">
        <img src="${matchingProduct.image}" alt="Adjustable Bench">
        <div class="item-details">
          <h4>${matchingProduct.name}</h4>
          <p class="price">$${matchingProduct.priceCents / 100}</p>
        </div>
        <div class="quantity-controls">
          <span>
              Quantity: <span class="quantity-label js-quantity-label-${
                matchingProduct.id
              }">${cartItem.quantity}</span>
            </span>
            
            <input class="quantity-input js-quantity-input-${
              matchingProduct.id
            }">
            <span class="save-quantity-link link-primary js-save-link"
              data-product-id="${matchingProduct.id}">
              Save
            </span>
          <button ><i class="fa-solid fa-trash delete-js" data-product-id="${
            matchingProduct.id
          }"></i></button>
        </div>
        
      </div>
  `;
});
document.querySelector(".added-cart-items").innerHTML = innerHTMLcart;
updateCartQuantity();

/****Remove cart Function */

document.querySelectorAll(".delete-js").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeCart(productId);

    const itemContainer = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    itemContainer.remove();
    renderSummary();
    updateCartQuantity();
  });
});

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  /*Show Cart Quantity into Cart Icon*/
  document.querySelector(".num-p").innerHTML = cartQuantity;
}

document.querySelectorAll(".js-save-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;

    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );

    const newQuantity = Number(quantityInput.value);
    updateQuantity(productId, newQuantity);

    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    quantityLabel.innerHTML = newQuantity;

    updateCartQuantity();
    updateQuantity(productId, newQuantity);
    renderSummary();
  });
});
