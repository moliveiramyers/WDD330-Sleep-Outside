// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
//   const htmlStrings = list.map(template);
//   // if clear is true we need to clear out the contents of the parent.
//   if (clear) {
//     parentElement.innerHTML = "";
//   }
//   parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
// }

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template)
  if (clear) { this.listElement.innerHTML = ""; };
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  // const htmlStrings = list.map(template)
  // if (clear) { this.listElement.innerHTML = ""; };
  // parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTamplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("main-footer");
  

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTamplate, footerElement);

  cartCount();

}

export function cartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const count = cartItems.reduce((total, item) => {
    return total + (item.quantity || 1); 
  }, 0);

  const countElement = document.getElementById("cart-count");
  if (countElement) {
    countElement.textContent = count;
  }
  
}