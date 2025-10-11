import { renderListWithTemplate }
    from "./utils.mjs";
import ProductData, { getAllProducts } from "./ProductData.mjs";



function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="../product_pages/?product=${product.Id}">
            <img src="${product.Images.PrimaryExtraLarge}" alt="${product.Name}">
            <h2>${product.Brand.Name}</h2>
            <h3>${product.Name}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`
}

// export default class ProductList {
//     constructor(category, dataSource, listElement) {
//         this.category = category;
//         this.dataSource = dataSource;
//         this.listElement = listElement;
//     }

    export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
        let list = [];

        if (this.category) {
            try {
                // Try fetching from backend first
                list = await this.dataSource.getData(this.category);
            } catch (err) {
                console.warn("Backend search failed, falling back to local JSON:", err);

                // Fallback: filter local JSON
                const allProducts = await getAllProducts();
                const lowerSearch = this.category.toLowerCase();

                list = allProducts.filter(p => {
                    const colorText = (p.Colors?.map(c => c.ColorName).join(" ") || "").toLowerCase();
                    const text = `${p.Name || ""} ${p.NameWithoutBrand || ""} ${p.Brand?.Name || ""} ${p.Category || ""} ${colorText} ${p.DescriptionHtmlSimple || ""}`.toLowerCase();
                    return text.includes(lowerSearch);
                });
            }
        } else {
            // No category specified: load all products locally
            list = await getAllProducts();
        }

        console.log("Filtered list:", list);
        this.renderList(list);

        document.querySelector(".title").textContent = this.category || "All Products";
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}



    // async init() {
    //     // console.log("Search term in ProductList:", this.category);
        
    //     // console.log("List fetched:", list);
        

    //     let list = [];
    //     if (this.category) {
    //         list = await this.dataSource.getData(this.category);
    //     }
    //     else {
    //         list = await this.dataSource.getAllProducts();

    //     }
    //     const searchTerm = this.category?.toLowerCase();
    //     // console.log("First product sample:", list[0]);
    //     // console.log("Keys:", Object.keys(list[0]));


    //     if (searchTerm) {
    //         const lowerSearch = searchTerm.toLowerCase();
    //         list = list.filter(param => {
    //             const searchMatch = `${param.Name || ""} ${param.Brand?.Name || ""} ${param.Category || ""} ${param.Colors?.join(" ") || ""} ${param.DescriptionHtmlSimple || ""}`.toLowerCase();
    //             return searchMatch.includes(lowerSearch);
    //         });
        
    //     }
    //       console.log("Filtered list:", list);

    //     this.renderList(list);
    //     document.querySelector(".title").textContent = this.category || "All Products";
    // }

 