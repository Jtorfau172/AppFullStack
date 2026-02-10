import React, { useEffect, useState } from "react";
import api from "../services/api.js";

export default function CochesList({ filtro }) {
  const [coches, setCoches] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoPrecio, setNuevoPrecio] = useState("");

  const fetchCoches = async () => {
    try {
      const params = {};
      if (filtro.marca) params.marca = filtro.marca;
      if (filtro.precio_max) params.precio_max = filtro.precio_max;
      if (filtro.disponibilidad) params.disponibilidad = true;

      const res = await api.get("/coches/search", { params });
      setCoches(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoches();
  }, [filtro]);

  const handleEliminar = async id => {
    if (!window.confirm("Eliminar coche?")) return;
    await api.delete(`/coches/${id}`);
    fetchCoches();
  };

  const handleEditarPrecio = async (id) => {
    try {
      await api.put(`/coches/${id}`, { precio: Number(nuevoPrecio) });
      setEditandoId(null);
      setNuevoPrecio("");
      fetchCoches();
    } catch (err) {
      alert("Error al actualizar precio");
    }
  };

  return (
    <div className="mb-4">
      <h2 className="font-bold mb-2">Inventario de Coches</h2>
      <table className="border w-full">
        <thead>
          <tr>
            <th className="border px-1">Marca</th>
            <th className="border px-1">Modelo</th>
            <th className="border px-1">Precio</th>
            <th className="border px-1">Stock</th>
            <th className="border px-1">Año</th>
            <th className="border px-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {coches.map(c => (
            <tr key={c._id}>
              <td className="border px-1">{c.marca}</td>
              <td className="border px-1">{c.modelo}</td>
              <td className="border px-1">{c.precio}</td>
              <td className="border px-1">{c.stock}</td>
              <td className="border px-1">{c.año}</td>
              <td className="border px-1">
                {editandoId === c._id ? (
                  <>
                    <input
                      value={nuevoPrecio}
                      onChange={e => setNuevoPrecio(e.target.value)}
                      type="number"
                      className="border p-1 w-24 m-1"
                    />
                    <button onClick={() => handleEditarPrecio(c._id)} className="bg-green-500 text-white px-1 py-0.5 rounded m-1">Guardar</button>
                    <button onClick={() => setEditandoId(null)} className="bg-gray-500 text-white px-1 py-0.5 rounded m-1">Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setEditandoId(c._id); setNuevoPrecio(c.precio); }} className="bg-yellow-500 text-white px-1 py-0.5 rounded m-1">Editar Precio</button>
                    <button onClick={() => handleEliminar(c._id)} className="bg-red-500 text-white px-1 py-0.5 rounded m-1">Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
