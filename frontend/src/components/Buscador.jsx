import React, { useState } from "react";
import api from "../services/api.js";
export default function Buscador({ setFiltro }) {
  const [marca, setMarca] = useState("");
  const [precio_max, setPrecioMax] = useState("");
  const [disponibilidad, setDisponibilidad] = useState(false);

  const handleSearch = () => {
    setFiltro({ marca, precio_max, disponibilidad });
  };

  return (
    <div className="mb-4 p-2 border rounded">
      <h2 className="font-bold mb-2">Buscar Coches</h2>
      <input placeholder="Marca" value={marca} onChange={e => setMarca(e.target.value)} className="border p-1 m-1"/>
      <input placeholder="Precio máximo" value={precio_max} onChange={e => setPrecioMax(e.target.value)} className="border p-1 m-1"/>
      <label className="m-1">
        <input type="checkbox" checked={disponibilidad} onChange={e => setDisponibilidad(e.target.checked)} /> Solo disponibles
      </label>
      <button onClick={handleSearch} className="bg-green-500 text-white px-2 py-1 rounded">Buscar</button>
    </div>
  );
}
