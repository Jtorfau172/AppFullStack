import React, { useEffect, useState } from "react";
import api from "../services/api.js";

export default function HistorialVentas() {
  const [ventas, setVentas] = useState([]);

  const fetchHistorial = async () => {
    try {
      const res = await api.get("/ventas/historial");
      setVentas(res.data);
    } catch (err) {
      console.error("Error cargando historial:", err);
    }
  };

  useEffect(() => {
    fetchHistorial();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm("Eliminar venta y revertir stock?")) return;
    try {
      await api.delete(`/ventas/${id}`);
      fetchHistorial();
    } catch (err) {
      alert("Error al eliminar venta");
    }
  };

  return (
    <div className="mb-4 p-2 border rounded">
      <h2 className="font-bold mb-2">Historial de Ventas</h2>
      {ventas.length === 0 ? (
        <p className="text-gray-500">No hay ventas registradas.</p>
      ) : (
        <table className="border w-full">
          <thead>
            <tr>
              <th className="border px-1">Fecha</th>
              <th className="border px-1">Cliente</th>
              <th className="border px-1">Coche</th>
              <th className="border px-1">Precio Final</th>
              <th className="border px-1">Método de Pago</th>
              <th className="border px-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map(v => (
              <tr key={v._id}>
                <td className="border px-1">{new Date(v.fecha).toLocaleDateString()}</td>
                <td className="border px-1">{v.cliente_id?.nombre || "Cliente eliminado"}</td>
                <td className="border px-1">{v.coche_id?.modelo || "Coche eliminado"}</td>
                <td className="border px-1">{v.precio_final} EUR</td>
                <td className="border px-1">{v.metodo_pago}</td>
                <td className="border px-1">
                  <button onClick={() => handleEliminar(v._id)} className="bg-red-500 text-white px-1 py-0.5 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
