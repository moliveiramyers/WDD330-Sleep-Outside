// CheckoutProcess.mjs
import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemSubTotal();
        this.calculateOrderTotal();
    }

    // Convert FormData to a JS object
    formDataToJSON(formElement) {
        const formData = new FormData(formElement);
        const convertedJSON = {};
        formData.forEach((value, key) => {
            convertedJSON[key] = value;
        });
        return convertedJSON;
    }

    // Package cart items into the format the server expects
    packageItems(items) {
        return items.map((item) => ({
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: item.quantity || 1
        }));
    }

    // Calculate subtotal of items in the cart
    calculateItemSubTotal() {
        const summaryElement = document.querySelector(
            `${this.outputSelector} #cartTotal`
        );
        const itemNumElement = document.querySelector(
            `${this.outputSelector} #numberItems`
        );

        const totalQuantity = this.list.reduce((sum, item) => sum + (item.quantity || 1), 0);

        itemNumElement.innerText = totalQuantity;;

        this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice * (item.quantity), 0);

        summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    }

    calculateOrderTotal() {
        const totalQuantity = this.list.reduce((sum, item) => sum + (item.quantity || 1), 0);


        this.tax = this.itemTotal * 0.06;
        this.shipping = totalQuantity > 0 ? 10 + (totalQuantity - 1) * 2 : 0;
        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const taxEl = document.querySelector(`${this.outputSelector} #tax`);
        const shippingEl = document.querySelector(`${this.outputSelector} #shipping`);
        const totalEl = document.querySelector(`${this.outputSelector} #total`);

        taxEl.innerText = `$${this.tax.toFixed(2)}`;
        shippingEl.innerText = `$${this.shipping.toFixed(2)}`;
        totalEl.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    // Handle checkout submission
    async checkout(form) {
        const orderData = this.formDataToJSON(form);

        // Add order metadata
        orderData.orderDate = new Date().toISOString();
        orderData.items = this.packageItems(this.list);
        orderData.orderTotal = this.orderTotal.toFixed(2);
        orderData.tax = this.tax.toFixed(2);
        orderData.shipping = this.shipping.toFixed(2);

        try {
            const service = new ExternalServices();
            const response = await service.checkout(orderData);
            alert("✅ Order placed successfully!");
            localStorage.removeItem(this.key);
            form.reset();
            window.location.href = "/confirmation.html";
        } catch (err) {
            console.error("Checkout error:", err);
            alert("❌ There was a problem submitting your order. Please try again.");
        }
    }
}


