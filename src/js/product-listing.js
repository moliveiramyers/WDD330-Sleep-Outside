import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam,  } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const search = getParam("search")
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category || search, dataSource, listElement);
console.log("Search term:", category || search);
console.log("URL search param:", search);
console.log("URL category param:", category);

myList.init();

