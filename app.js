const PAYMENT_LINK_URL = ""; // pega aquí tu Payment Link de Stripe

document.addEventListener("DOMContentLoaded", () => {
  const buyBtn = document.getElementById("buy-button");
  const status = document.getElementById("messages");

  buyBtn.addEventListener("click", () => {
    if(PAYMENT_LINK_URL){
      window.location.href = PAYMENT_LINK_URL;
    } else {
      status.textContent = "⚠️ Configura tu Payment Link en app.js";
    }
  });
});