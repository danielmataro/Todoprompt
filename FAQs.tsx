import React from "react";
import { SimpleAccordion } from "./ui/accordion";

const FAQs: React.FC = () => {
  const faqs = [
    { question: "¿Qué casa de apuestas soporta?", answer: "Está preconfigurado para Bet365, pero es completamente adaptable a cualquier casa de apuestas. El manual incluye instrucciones para modificar las fuentes de cuotas." },
    { question: "¿Qué tipo de apuestas cubre el sistema?", answer: "Se especializa exclusivamente en mercado 1X2 (victoria local, empate, victoria visitante) de LaLiga. Esta especialización permite mayor precisión que sistemas generalistas." },
    { question: "¿Cuánto capital necesito para empezar?", answer: "El sistema incluye gestión de bankroll adaptable a cualquier capital. Recomendamos un capital inicial adecuado para aplicar correctamente la estrategia de stakes sugerida." },
    { question: "¿Hay soporte técnico disponible?", answer: "Sí, ofrecemos soporte por email para dudas sobre implementación y configuración. Tiempo de respuesta típico: 24–48 horas." }
  ];
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Preguntas <span className="text-accent">frecuentes</span></h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Resolvemos las dudas más comunes sobre nuestro sistema de pronósticos.</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <SimpleAccordion items={faqs} />
        </div>
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">¿Tienes más preguntas?</p>
          <a href="mailto:todopromp@gmail.com?subject=Consulta%20TodoPrompt%20LaLiga" className="text-accent">Contáctanos: todopromp@gmail.com</a>
        </div>
      </div>
    </section>
  );
};

export default FAQs;