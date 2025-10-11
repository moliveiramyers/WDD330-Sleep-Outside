import { getLocalStorage } from "./utils.mjs";
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
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSubTotal() {
        // calculate and display the total dollar amount of the items in the cart, and the number of items.
        let total = 0;
        let itemCount = 0

        this.list.forEach(item => {
            total += item.price * item.quatity;
            itemCount += item.quatity;
        });
        this.item.itemTotal = total;

        const subtotalEl = document.querySelector(`${this.outputSelector} #cartTotal`);
        const itemCountEl = document.querySelector(`${this.outputSelector} #numberItems`);


        if (subtotalEl) subtotalEl.textContent = `$${this.itemTotal.toFixed(2)}`;
        if (itemCountEl) itemCountEl.textContent = itemCount;
    }

    calculateOrderTotal() {
        // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
        const taxRate = 0.06;
        const baseShipping = 10;
        const extraPerItem = 2;
        const itemsCount = this.list.reduce((sum, item) => sum + item.quantity, 0);

        this.tax = (this.itemTotal * taxRate)
        this.shipping = itemsCount > 0 ? baseShipping + (itemsCount - 1) * extraPerItem : 0;
        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const taxEl = document.querySelector(`${this.outputSelector} #tax`);
        const shippingEl = document.querySelector(`${this.outputSelector} #shipping`);
        const totalEl = document.querySelector(`${this.outputSelector} #total`);


         if (taxEl) taxEl.textContent = `$${this.tax.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `$${this.shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${this.orderTotal.toFixed(2)}`;
  
    }
}