import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle, TrendingUp, Shield, Eye, Zap, BarChart3 } from "lucide-react";

const Benefits: React.FC = () => {
  const benefits = [
    { icon: <CheckCircle className="w-8 h-8 text-accent" />, title: "Rigor científico", description: "Metodología basada en machine learning con variables ponderadas y validación estadística continua." },
    { icon: <TrendingUp className="w-8 h-8 text-accent" />, title: "Análisis actualizado", description: "Datos actualizados constantemente con ajustes automáticos según resultados y tendencias de mercado." },
    { icon: <Zap className="w-8 h-8 text-accent" />, title: "Análisis de contexto", description: "Integración de lesiones, sanciones, rachas de forma y noticias relevantes para cada pronóstico." },
    { icon: <Shield className="w-8 h-8 text-accent" />, title: "Control de riesgo", description: "Sistema de gestión de stake optimizado con límites de riesgo y value betting sistemático." },
    { icon: <Eye className="w-8 h-8 text-accent" />, title: "Transparencia total", description: "Acceso completo al razonamiento, variables utilizadas y cálculos detrás de cada pronóstico." },
    { icon: <BarChart3 className="w-8 h-8 text-accent" />, title: "Comparación de cuotas", description: "Preconfigurado para Bet365 pero adaptable a cualquier casa de apuestas del mercado." }
  ];
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">No humo, <span className="text-accent">sí rigor</span></h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Nuestro sistema combina análisis estadístico avanzado con inteligencia artificial para ofrecerte pronósticos fundamentados y transparentes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border shadow-soft">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-lg" style={{background:"rgba(96,165,250,.12)", width:"fit-content"}}>
                  {benefit.icon}
                </div>
                <CardTitle className="text-xl font-semibold">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;