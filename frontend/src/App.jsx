import React, { useState } from "react";
import ConcesionariosForm from "./components/ConcesionariosForm";
import ClientesForm from "./components/ClientesForm";
import CochesForm from "./components/CochesForm";
import Buscador from "./components/Buscador";
import CochesList from "./components/CochesList";
import RegistroVenta from "./components/RegistroVenta";
import HistorialVentas from "./components/HistorialVentas";

function App() {
  const [filtro, setFiltro] = useState({});
  const [key, setKey] = useState(0);

  const refrescar = () => setKey(k => k + 1);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Panel del Concesionario</h1>
      <ConcesionariosForm onCreado={refrescar} />
      <ClientesForm onCreado={refrescar} />
      <CochesForm key={"coches-" + key} />
      <Buscador setFiltro={setFiltro} />
      <CochesList filtro={filtro} key={"list-" + key} />
      <RegistroVenta key={"venta-" + key} />
      <HistorialVentas key={"historial-" + key} />
    </div>
  );
}

export default App;
