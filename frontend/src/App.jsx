import React, { useState } from "react";
import CochesList from "./components/CochesList";
import CochesForm from "./components/CochesForm";
import RegistroVenta from "./components/RegistroVenta";
import Buscador from "./components/Buscador";

function App() {
  const [filtro, setFiltro] = useState({});

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Panel del Concesionario</h1>
      <CochesForm />
      <Buscador setFiltro={setFiltro} />
      <CochesList filtro={filtro} />
      <RegistroVenta />
    </div>
  );
}

export default App;

