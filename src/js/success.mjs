import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const payload = JSON.parse(sessionStorage.getItem("so-order-success"));

if (payload) {
    const message = document.getElementById("success-message");
    message.innerHTML = `
    <p>Thank you — your order #${payload.id} is confirmed!</p>
    <p>Total items: ${payload.totalQuantity}</p>
    <p>Order total: $${payload.orderTotal}</p>
    <p>Tax: $${payload.tax}</p>
    <p>Shipping: $${payload.shipping}</p>
  `;

    const itemsList = document.createElement("ul");
    payload.items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.quantity} × ${item.name} - $${item.price}`;
        itemsList.appendChild(li);
    });
    message.appendChild(itemsList);

    sessionStorage.removeItem("so-order-success");
}
