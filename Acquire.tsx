import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const features = [
  "4 datasets clave (histórico + actual + jugadores + ajuste)",
  "Prompt maestro de orquestación",
  "Manual de configuración paso a paso",
  "Comparación de cuotas (Bet365 preconfigurable)",
  "Gestión de stake (Kelly fraccionado opcional)",
  "Aprendizaje y recalibración continua"
];

const guarantees = [
  { title: "Transparencia total", description: "Cada pick va con su razonamiento, variables y supuestos — sin humo." , icon: <span>🔍</span>},
  { title: "Control del riesgo", description: "Estrategia de banca y límites definidos para proteger tu capital." , icon: <span>🛡️</span>},
  { title: "Adaptable", description: "Fuentes y parámetros editables para ajustarlo a tu forma de trabajar." , icon: <span>🧩</span>}
];

const Acquire: React.FC = () => {
  const handleCTAClick = () => {
    window.location.href = "mailto:todopromp@gmail.com?subject=Solicitud LaLiga Value Edge 25-26&body=Hola, estoy interesado en adquirir LaLiga Value Edge 25-26 por 29€. Por favor, envíenme las instrucciones de pago.";
  };
  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Adquiere <span className="text-accent">LaLiga Value Edge 25-26</span></h2>
          <p className="text-xl text-muted-foreground">Pago único • Sin suscripciones</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Card className="shadow-electric border">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold mb-2">Paquete Completo</CardTitle>
              <div className="text-6xl font-bold text-accent mb-2">29€</div>
              <p className="text-muted-foreground">Entrega por email</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span>✅</span>
                  <span>{feature}</span>
                </div>
              ))}
              <div className="pt-6">
                <Button onClick={handleCTAClick} variant="electric" size="xl" className="w-full">
                  Obtener acceso ahora
                </Button>
              </div>
              <p className="text-center text-sm text-muted-foreground pt-4">
                Recibirás la documentación completa en tu email tras confirmación del pago.
              </p>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">¿Por qué elegir TodoPrompt?</h3>
            {guarantees.map((g, index) => (
              <Card key={index} className="border rounded-l-none">
                <CardHeader className="flex items-center">
                  <div className="p-2 rounded-lg" style={{background:"rgba(96,165,250,.12)"}}>{g.icon}</div>
                  <CardTitle className="text-lg" style={{marginLeft:12}}>{g.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{g.description}</p>
                </CardContent>
              </Card>
            ))}
            <div className="card p-6">
              <h4 className="font-semibold mb-2 text-accent">Proceso de compra:</h4>
              <ol className="text-sm text-muted-foreground" style={{paddingLeft:18}}>
                <li>Haz clic en "Obtener acceso ahora".</li>
                <li>Se abrirá tu cliente de email con el mensaje prellenado.</li>
                <li>Envía el email y recibirás instrucciones de pago.</li>
                <li>Tras confirmar el pago, recibirás acceso completo.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Acquire;