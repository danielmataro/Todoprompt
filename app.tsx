import React from "react";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import WhatIncludes from "./components/WhatIncludes";
import Acquire from "./components/Acquire";
import FAQs from "./components/FAQs";
import FixedCTA from "./components/FixedCTA";

const App: React.FC = () => {
  return (
    <div>
      <Hero />
      <div className="section">
        <Benefits />
      </div>
      <div className="section">
        <WhatIncludes />
      </div>
      <div className="section" id="adquirir">
        <Acquire />
      </div>
      <div className="section">
        <FAQs />
      </div>
      <FixedCTA />
      <footer className="container footer p-6">
        © {new Date().getFullYear()} todoprompt.com — Contacto: <a href="mailto:todopromp@gmail.com">todopromp@gmail.com</a>
      </footer>
    </div>
  )
};

export default App;