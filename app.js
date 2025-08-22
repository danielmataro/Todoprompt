// Año dinámico
document.getElementById("year").textContent = new Date().getFullYear();

// WhatsApp preparado (no se muestra número en la página, pero se usa para el enlace)
const PHONE_INTL = "34634633801"; // +34 634 633 801
const WHATSAPP_BASE = `https://wa.me/${PHONE_INTL}?text=`;
const productName = "LaLiga Value Edge 25-26";
const price = "29€";
const msg = `Hola, quiero solicitar el producto \"${productName}\" por ${price}.`;

document.getElementById("btnSolicitar").href = WHATSAPP_BASE + encodeURIComponent(msg);

// Efecto 'reveal' al hacer scroll
function observeReveal(){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
}
observeReveal();
