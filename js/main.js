import { cart } from "../data/cart.js";

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

/*Accordion menu enable-disable*/
const accordion = document.getElementsByClassName("accordion");

for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    const panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

/*Regenareate the Products inside Shop page */

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  /*Show Cart Quantity into Cart Icon*/
  document.querySelector(".num-p").innerHTML = cartQuantity;
}

updateCartQuantity();
