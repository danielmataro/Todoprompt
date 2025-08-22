// ===== Config =====
const EMAIL = "todoprompt@gmail.com";
const LS_KEY = "todoprompt_products_v1";

// Año dinámico
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Productos por defecto (si no hay nada guardado) =====
const defaultProducts = [
  {
    id: crypto.randomUUID(),
    name: "LaLiga Value Edge 25-26",
    description: "Asistente de apuestas con base de datos histórica de LaLiga y modelos de machine learning para ayudarte a decidir con mayor información.",
    price: 199.0,
    image: "laliga-value-edge.jpg"
  }
];

function getProducts(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    if(!raw) return [...defaultProducts];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [...defaultProducts];
  }catch(e){
    return [...defaultProducts];
  }
}
function saveProducts(list){
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

// ===== Estado =====
const grid = document.getElementById("gridProductos");
const emptyMsg = document.getElementById("emptyMsg");
const searchInput = document.getElementById("searchInput");
const structuredDataEl = document.getElementById("structured-data");

let state = { products: getProducts(), query: "" };

function formatPriceEUR(value) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(value);
}

// Botón 'Solicitar' → correo con asunto y cuerpo pre-rellenado
function makeMailLink(product){
  const subject = encodeURIComponent(`Solicitud de ${product.name}`);
  const body = encodeURIComponent(
    `Hola,\n\nMe interesa el producto "${product.name}" (${formatPriceEUR(product.price)}).\nPor favor, enviadme más información y cómo proceder.\n\nGracias.\n`
  );
  return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
}

const DEFAULT_IMAGE_SVG = encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'>
    <rect width='100%' height='100%' fill='#f3f4f6'/>
    <g font-family='system-ui, -apple-system, Segoe UI, Roboto, Arial' fill='#111827'>
      <text x='50%' y='48%' text-anchor='middle' font-size='26' font-weight='700'>Imagen del producto</text>
      <text x='50%' y='58%' text-anchor='middle' font-size='16' fill='#6b7280'>TodoPrompt</text>
    </g>
  </svg>
`);
const DEFAULT_IMAGE = `data:image/svg+xml;utf8,${DEFAULT_IMAGE_SVG}`;

function cardTemplate(p){
  const imgSrc = p.image && p.image.trim() ? p.image.trim() : DEFAULT_IMAGE;
  return `
    <article class="card reveal" data-name="${p.name.toLowerCase()}">
      <div class="card-media">
        <img src="${imgSrc}" alt="Imagen de ${p.name}" onerror="this.src='${DEFAULT_IMAGE}'">
      </div>
      <div class="card-body">
        <h3 class="card-title">${p.name}</h3>
        <p class="card-desc">${p.description}</p>
        <div class="card-foot">
          <span class="price">${formatPriceEUR(p.price)}</span>
          <a class="btn btn-primary" href="${makeMailLink(p)}">Solicitar</a>
        </div>
      </div>
    </article>
  `;
}

function render(){
  const q = state.query.trim().toLowerCase();
  const filtered = !q ? state.products : state.products.filter(p => (p.name + " " + (p.description || "")).toLowerCase().includes(q));
  grid.innerHTML = filtered.map(cardTemplate).join("");
  emptyMsg.hidden = filtered.length !== 0;

  // JSON-LD
  structuredDataEl.innerHTML = `
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "TodoPrompt",
      "url": location.origin + location.pathname,
      "logo": "logoblanco.jpg",
      "email": EMAIL
    })}</script>
    ${filtered.map(p => `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": p.name,
      "image": p.image || "",
      "description": p.description || "",
      "brand": { "@type": "Brand", "name": "TodoPrompt" },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "EUR",
        "price": Number(p.price).toFixed(2),
        "availability": "https://schema.org/InStock",
        "url": makeMailLink(p)
      }
    })}</script>`).join("")}
  `;

  // Activar animaciones de aparición
  observeReveal();
}

render();

// Búsqueda
searchInput.addEventListener("input", e => {
  state.query = e.target.value || "";
  render();
});

// Exportar / Importar
document.getElementById("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state.products, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "products.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
});
document.getElementById("importInput").addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const list = JSON.parse(text);
    if (!Array.isArray(list)) throw new Error("Formato incorrecto");
    const normalized = list.map(p => ({
      id: p.id || crypto.randomUUID(),
      name: String(p.name || "").trim(),
      description: String(p.description || ""),
      price: Number(p.price || 0),
      image: String(p.image || "")
    })).filter(p => p.name && !Number.isNaN(p.price));
    state.products = normalized;
    saveProducts(state.products);
    render();
    alert("Productos importados correctamente.");
  } catch (err) {
    alert("No se pudo importar el JSON. Revisa el formato.");
  } finally {
    e.target.value = "";
  }
});

// ----- Admin panel (añadir) -----
const adminPanel = document.getElementById("adminPanel");
const toggleAdminBtn = document.getElementById("toggleAdmin");
const closeAdminBtn = document.getElementById("closeAdmin");
const adminForm = document.getElementById("adminForm");

function openAdmin() {
  adminPanel.hidden = false;
  toggleAdminBtn.setAttribute("aria-expanded", "true");
}
function closeAdmin() {
  adminPanel.hidden = true;
  toggleAdminBtn.setAttribute("aria-expanded", "false");
}

toggleAdminBtn.addEventListener("click", () => {
  if (adminPanel.hidden) openAdmin(); else closeAdmin();
});
closeAdminBtn.addEventListener("click", closeAdmin);

adminForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(adminForm);
  const product = {
    id: crypto.randomUUID(),
    name: String(form.get("name") || "").trim(),
    description: String(form.get("description") || "").trim(),
    price: Number(form.get("price") || 0),
    image: String(form.get("image") || "").trim()
  };
  if (!product.name || Number.isNaN(product.price)) {
    alert("Completa nombre y precio correctamente.");
    return;
  }
  state.products.unshift(product);
  saveProducts(state.products);
  render();
  adminForm.reset();
  closeAdmin();
  alert("Producto añadido.");
});

// ----- Efectos “chulos” de transición (IntersectionObserver) -----
function observeReveal(){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal, .card").forEach(el=>observer.observe(el));
}
observeReveal();
