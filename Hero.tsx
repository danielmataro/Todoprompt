import React from "react";
import { Button } from "./ui/button";
import realStadium from "../assets/real-stadium.jpg";
import todoPromptLogo from "../assets/todoprompt-logo.png";

const Hero: React.FC = () => {
  const handleCTAClick = () => {
    window.location.href = "mailto:todopromp@gmail.com?subject=Solicitud LaLiga Value Edge 25-26&body=Hola, estoy interesado en adquirir LaLiga Value Edge 25-26 por 29€. Por favor, envíenme las instrucciones de pago.";
  };
  const scrollToAcquire = () => {
    document.getElementById('adquirir')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section className="relative min-h-screen" style={{display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center"}}>
      <div className="absolute inset-0 z-0">
        <img src={realStadium} alt="Estadio de fútbol profesional LaLiga" className="w-full h-auto" loading="eager" />
        <div className="absolute inset-0" style={{background:"rgba(10,11,14,.75)"}}></div>
      </div>
      <div className="relative z-10 container text-primary-foreground">
        <div className="mb-8">
          <img src={todoPromptLogo} alt="TodoPrompt Logo" className="mx-auto" style={{width:160,height:160}} />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          LaLiga Value Edge 25-26
          <span className="block text-accent">Pronósticos 1X2 con IA</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-primary-foreground/90">
          Sistema profesional de pronósticos 1X2 para Primera División.
          <span className="block mt-2">Inteligencia artificial + análisis integral + value betting.</span>
        </p>
        <div style={{display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center"}}>
          <Button onClick={handleCTAClick} variant="electric" size="xl" className="shadow-electric">
            Obtener el paquete ahora - 29€
          </Button>
          <Button onClick={scrollToAcquire} variant="outline-light" size="xl">
            Ver más detalles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;