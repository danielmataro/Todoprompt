// Año dinámico
document.getElementById("year").textContent = new Date().getFullYear();

// Productos (sin número de teléfono y con botón 'Solicitar')
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
const emptyMsg = document.getElementById("emptyMsg");

function formatPriceEUR(value) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);
}

// Botón 'Solicitar' → correo con asunto y cuerpo pre-rellenado
function makeMailLink(product){
  const subject = encodeURIComponent(`Solicitud de ${product.name}`);
  const body = encodeURIComponent(
    `Hola,\n\nMe interesa el producto "${product.name}" (${formatPriceEUR(product.price)}).\nPor favor, enviadme más información y cómo proceder.\n\nGracias.\n`
  );
  return `mailto:todoprompt@gmail.com?subject=${subject}&body=${body}`;
}

function cardTemplate(p){
  return `
    <article class=\"card reveal\">
      <div class=\"card-media\">
        <img src=\"${p.image}\" alt=\"Imagen de ${p.name}\" onerror=\"this.style.opacity=0.2\">
      </div>
      <div class=\"card-body\">
        <h3 class=\"card-title\">${p.name}</h3>
        <p class=\"card-desc\">${p.description}</p>
        <div class=\"card-foot\">
          <span class=\"price\">${formatPriceEUR(p.price)}</span>
          <a class=\"btn btn-primary\" href=\"${makeMailLink(p)}\">Solicitar</a>
        </div>
      </div>
    </article>
  `;
}

function render(){
  if(!defaultProducts.length){
    emptyMsg.hidden = false;
    grid.innerHTML = \"\";
    return;
  }
  emptyMsg.hidden = true;
  grid.innerHTML = defaultProducts.map(cardTemplate).join(\"\");  
  observeReveal();
}

render();

// ----- Efectos “chulos” de transición (IntersectionObserver) -----
function observeReveal(){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add(\"reveal-visible\");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(\".reveal, .card\").forEach(el=>observer.observe(el));
}

observeReveal();
