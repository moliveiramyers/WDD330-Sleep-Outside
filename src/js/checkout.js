import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  const order = new CheckoutProcess("so-cart", ".checkout-summary");
  order.init();

  const zip = document.querySelector("#zip");
  if (zip) {
    zip.addEventListener("blur", order.calculateOrderTotal.bind(order));
  }

  const submitBtn = document.querySelector("#checkoutSubmit");
  if (submitBtn) {
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const form = document.forms["checkout"];
      const ok = form.checkValidity();
      form.reportValidity();

      if (ok) {
        order.checkout(form);
      } else {
        console.warn("Form validation failed.");
      }
    });
  } else {
    console.error("Submit button not found!");
  }
});
