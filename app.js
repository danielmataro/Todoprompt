const PHONE_INTL = "34634633801";
const WHATSAPP_BASE = `https://wa.me/${PHONE_INTL}?text=`;

const defaultProducts = [
  {
    id: 1,
    name: "LaLiga Value Edge 25-26",
    description: "Asistente de apuestas con base de datos histórica de LaLiga y modelos de machine learning para ayudarte a decidir con mayor información.",
    price: 199.0,
    image: "laliga-value-edge.jpg"
  }
];

const grid = document.getElementById("gridProductos");
const yearEl = document.getElementById("year");
const ctaWhatsapp = document.getElementById("ctaWhatsapp");

yearEl.textContent = new Date().getFullYear();
ctaWhatsapp.href = WHATSAPP_BASE + encodeURIComponent("Hola, quiero hablar con TodoPrompt 🙂");

function formatPriceEUR(value) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);
}

function makeWhatsAppLink(product) {
  const msg = `Hola, quiero solicitar el producto "${product.name}" por ${formatPriceEUR(product.price)}.`;
  return WHATSAPP_BASE + encodeURIComponent(msg);
}

function render() {
  grid.innerHTML = defaultProducts.map(p => `
    <article class="card">
      <img src="${p.image}" alt="Imagen de ${p.name}" />
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p class="price">${formatPriceEUR(p.price)}</p>
        <a class="btn btn-primary" href="${makeWhatsAppLink(p)}" target="_blank">Pedir por WhatsApp</a>
      </div>
    </article>
  `).join("");
}

render();