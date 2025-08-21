import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import realData from "../assets/real-data.jpg";

const WhatIncludes: React.FC = () => {
  const includes = [
    { icon: <span>📊</span>, title: "Estadísticas temporada pasada", description: "Métricas históricas clave (xG, tiros, posesión útil, PPDA, balón parado, etc.)." },
    { icon: <span>📈</span>, title: "Resultados temporada actual", description: "Datos actualizados para calibración y contexto de forma reciente." },
    { icon: <span>🧑‍🤝‍🧑</span>, title: "Listado de jugadores", description: "Plantillas, lesiones, sanciones y rotaciones probables." },
    { icon: <span>⚙️</span>, title: "Ajuste de temporada", description: "Parámetros de inicio de curso, cargas de minutos y calendario." },
    { icon: <span>🧠</span>, title: "Prompt maestro", description: "Instrucciones completas para orquestar el análisis y la toma de decisiones." },
    { icon: <span>📘</span>, title: "Manual de configuración", description: "Guía paso a paso para implementar el sistema y ajustar el riesgo a tu perfil." }
  ];
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-electric">
              <img src={realData} alt="Análisis de datos LaLiga Value Edge" className="w-full h-auto" loading="lazy" />
              <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(96,165,250,.2), transparent)"}}></div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Qué <span className="text-accent">incluye</span></h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Paquete completo LaLiga Value Edge 25-26 con todos los elementos necesarios para implementar un sistema profesional de pronósticos deportivos.
            </p>
            <div className="grid grid-cols-1 gap-6">
              {includes.map((item, index) => (
                <Card key={index} className="border rounded-l-none">
                  <CardHeader className="flex items-center">
                    <div className="p-2 rounded-lg" style={{background:"rgba(96,165,250,.12)"}}>{item.icon}</div>
                    <CardTitle className="text-lg" style={{marginLeft:12}}>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIncludes;