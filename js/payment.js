import { cart } from "../data/cart.js";
import { getProduct } from "../data/products.js";

/*Calculate Total Cheackout Price*/

export function renderSummary() {
  let productPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
  });

  // Convert to dollars
  const totalDollars = (productPriceCents / 100).toFixed(2);

  const paymentSummaryHTML = `
    <span class="total">Total: $${totalDollars}</span>
    <button class="btn-checkout">Proceed to Checkout</button>
  `;
  document.querySelector(".cart-summary").innerHTML = paymentSummaryHTML;
}
renderSummary();
