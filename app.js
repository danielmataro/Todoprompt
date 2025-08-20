/* ======================
   Configuración Stripe
   ======================
   Opción A) Payment Link (fácil): pon tu URL en PAYMENT_LINK_URL o en el atributo data-payment-link del botón.
   Opción B) Checkout con Price ID: pon tu clave publicable y el price_id creado en Stripe.
*/
const PAYMENT_LINK_URL = ""; // p.ej. "https://buy.stripe.com/abcd1234..."
const STRIPE_PUBLISHABLE_KEY = ""; // p.ej. "pk_live_xxx" o "pk_test_xxx"
const PRICE_ID = ""; // p.ej. "price_12345"
const SUCCESS_PATH = "/success.html";
const CANCEL_PATH = "/cancel.html";

/* Utilidades */
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

document.addEventListener("DOMContentLoaded", () => {
  // Año footer
  $("#year").textContent = new Date().getFullYear();

  // Tema
  const root = document.documentElement;
  const themeToggle = $("#themeToggle");
  const saved = localStorage.getItem("tp-theme");
  if (saved === "light") root.classList.add("light");
  themeToggle?.addEventListener("click", () => {
    root.classList.toggle("light");
    localStorage.setItem("tp-theme", root.classList.contains("light") ? "light" : "dark");
    themeToggle.textContent = root.classList.contains("light") ? "☀️" : "🌙";
  });
  themeToggle.textContent = root.classList.contains("light") ? "☀️" : "🌙";

  // Navegación móvil
  const navBtn = $(".nav-toggle");
  const navLinks = $("#nav-links");
  if (navBtn && navLinks) {
    navBtn.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navBtn.setAttribute("aria-expanded", String(open));
    });
  }

  // Vista previa blur
  const toggleBlurBtn = $("#toggle-blur");
  const preview = $("#preview");
  toggleBlurBtn?.addEventListener("click", () => {
    const isBlur = preview.classList.toggle("blur");
    toggleBlurBtn.setAttribute("aria-pressed", String(!isBlur));
  });

  // KPIs contador
  const counters = $$(".kpi-num");
  const animateCounters = () => {
    counters.forEach(el => {
      const to = Number(el.dataset.count || 0);
      const start = performance.now();
      const dur = 900 + Math.random()*600;
      const step = (t) => {
        const p = Math.min(1, (t - start) / dur);
        el.textContent = Math.round(to * p);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  };

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        if (e.target.classList.contains("metrics")) animateCounters();
        io.unobserve(e.target);
      }
    });
  }, { threshold: .15 });
  $$(".reveal").forEach(el => io.observe(el));

  // Carousel simple
  const slides = $("#slides");
  const dots = $("#dots");
  if (slides && dots) {
    const slideCount = slides.children.length;
    let idx = 0;
    for (let i=0; i<slideCount; i++){
      const b = document.createElement("button");
      if (i===0) b.classList.add("active");
      dots.appendChild(b);
    }
    const update = () => {
      slides.style.transform = `translateX(${-idx * (slides.children[0].offsetWidth + 18)}px)`;
      dots.querySelectorAll("button").forEach((d,i)=>d.classList.toggle("active", i===idx));
    };
    const next = () => { idx = (idx+1)%slideCount; update(); };
    let timer = setInterval(next, 3500);
    dots.addEventListener("click", (e)=>{
      if(e.target.tagName === "BUTTON"){
        idx = Array.from(dots.children).indexOf(e.target);
        update();
        clearInterval(timer);
        timer = setInterval(next, 3500);
      }
    });
    window.addEventListener("resize", update);
  }

  // Comprar
  const buyBtn = $("#buy-button");
  const status = $("#messages");

  const plAttr = buyBtn?.getAttribute("data-payment-link")?.trim();
  const paymentLink = (plAttr && plAttr.length > 5) ? plAttr : PAYMENT_LINK_URL;

  const canUseCheckout = STRIPE_PUBLISHABLE_KEY && PRICE_ID;

  buyBtn?.addEventListener("click", async () => {
    status.textContent = "";
    // Opción A: Payment Link
    if (paymentLink) {
      window.location.href = paymentLink;
      return;
    }
    // Opción B: Stripe Checkout con Price ID
    if (!canUseCheckout) {
      status.className = "msg error";
      status.textContent = "Configura Stripe (Payment Link o Price ID) antes de vender 🙏";
      console.warn("Falta PAYMENT_LINK_URL o STRIPE_PUBLISHABLE_KEY + PRICE_ID");
      return;
    }
    try {
      const stripe = Stripe(STRIPE_PUBLISHABLE_KEY, { locale: 'auto' });
      buyBtn.disabled = true;
      buyBtn.textContent = "Redirigiendo a Stripe…";

      const { error } = await stripe.redirectToCheckout({
        mode: 'payment',
        lineItems: [{ price: PRICE_ID, quantity: 1 }],
        allowPromotionCodes: true,
        successUrl: window.location.origin + SUCCESS_PATH,
        cancelUrl: window.location.origin + CANCEL_PATH,
        clientReferenceId: buyBtn.dataset.product || "TP-PRODUCT"
      });

      if (error) {
        status.className = "msg error";
        status.textContent = error.message || "No se pudo iniciar el pago.";
        buyBtn.disabled = false;
        buyBtn.textContent = "Comprar ahora";
      }
    } catch (e) {
      status.className = "msg error";
      status.textContent = "Error inesperado. Revisa la consola.";
      console.error(e);
      buyBtn.disabled = false;
      buyBtn.textContent = "Comprar ahora";
    }
  });
});
