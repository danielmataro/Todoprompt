import React from "react";
import { Button } from "./ui/button";

const FixedCTA: React.FC = () => {
  const handleCTAClick = () => {
    window.location.href = "mailto:todopromp@gmail.com?subject=Solicitud LaLiga Value Edge 25-26&body=Hola, estoy interesado en adquirir LaLiga Value Edge 25-26 por 29€. Por favor, envíenme las instrucciones de pago.";
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background" style={{backdropFilter:"blur(6px)", borderTop:"1px solid #1b1f2a", padding:"12px"}}>
      <div className="container">
        <Button onClick={handleCTAClick} variant="electric" size="lg" className="w-full">
          Obtener LaLiga Value Edge - 29€
        </Button>
      </div>
    </div>
  );
};

export default FixedCTA;