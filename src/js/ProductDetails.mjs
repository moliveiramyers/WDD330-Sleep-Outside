import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {}
        this.dataSource = dataSource;
    }


    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();

        document.getElementById("add-to-cart").addEventListener("click",
            this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];

        const existingItem = cartItems.find(item => item.Id === this.product.Id);

        if (existingItem) {
            existingItem.quantity += 1;
        }
        else {
            this.product.quantity = 1;
            cartItems.push(this.product);
        }
        
        setLocalStorage("so-cart", cartItems);
        alert(`${this.product.Name} added to cart!`);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}
function productDetailsTemplate(product) {
    document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
    document.querySelector("#p-brand").textContent = product.Brand.Name;
    document.querySelector("#p-name").textContent = product.NameWithoutBrand;

    const productImage = document.querySelector("#p-image");
    productImage.src = product.Images.PrimaryExtraLarge;
    productImage.alt = product.NameWithoutBrand;
    const euroPrice = new Intl.NumberFormat('de-DE',
        {
            style: 'currency', currency: 'EUR',
        }).format(Number(product.FinalPrice) * 0.85);
    document.querySelector("#p-price").textContent = `${euroPrice}`;
    document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
    document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

    document.getElementById("add-to-cart").dataset.id = product.Id;
}




