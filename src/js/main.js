import { loadHeaderFooter, } from "./utils.mjs";
import { initSearch } from "./search.mjs";


document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM loaded...");
  await loadHeaderFooter();
  console.log("header/footer loaded...");
  initSearch();
});