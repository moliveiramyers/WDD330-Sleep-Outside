import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// function productCardTemplate() {
//     return `<li class="product-card">
//     <a href="product_pages/index.html?product=">
//       <img src="" alt="Image of ">
//       <h2 class="card__brand"></h2>
//       <h3 class="card__name"></h3>
//       <p class="product-card__price">$</p>
//     </a>
//   </li>`;
// }

const listElement = document.querySelector(".product-list");

const dataSource = new ProductData("tents");
const productList = new ProductList("tents", dataSource, listElement);
productList.init();


// renderList(list) {
//     this.listElement.innerHTML = "";
//     const htmlStrings = listElement.map(productCardTemplate);
//     this.listElement.insertAdjacentHTML("afterBegin", htmlStrings.join(""));
// }