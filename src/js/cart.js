import { getLocalStorage, setLocalStorage, loadHeaderFooter, cartCount } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  const total = calculateCartTotal(cartItems);

  if (cartItems.length > 0) {
    document.querySelector(".list-footer").classList.remove("hide");

    document.querySelector(".list-total").innerHTML = `$${total.toFixed(2)}`;
  }
  addRemoveListeners();

}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider" data-id="${item.Id}">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryExtraLarge}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="remove-item">Remove</button>
</li>`;

  return newItem;
}

function calculateCartTotal(items) {
  return items.reduce((sum, item) => {
    return sum + Number(item.FinalPrice)*item.quantity;
  }, 0);

}
function addRemoveListeners() {
  const button = document.querySelectorAll(".remove-item");
  button.forEach((btn) => {
    btn.addEventListener("click", (remove) => {
      const id = remove.target.closest("li").dataset.id;
      removeFromCart(id);
    });
  });
}

function removeFromCart(productId){
  let cartItems = getLocalStorage("so-cart");
  const itemIndex = cartItems.findIndex((item) => item.Id === productId);

  if (itemIndex > -1) {
    if (cartItems[itemIndex].quantity > 1) {
      cartItems[itemIndex].quantity -= 1;
    }
    else {
      cartItems.splice(itemIndex, 1);
    }
  }
  setLocalStorage("so-cart", cartItems)
  renderCartContents();
}
renderCartContents();
