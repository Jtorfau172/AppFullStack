import React, { useState } from "react";
import api from "../services/api.js";

export default function ConcesionariosForm({ onCreado }) {
  const [form, setForm] = useState({ nombre: "", ubicacion: "", CIF: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/concesionarios", form);
      alert("Concesionario creado!");
      setForm({ nombre: "", ubicacion: "", CIF: "" });
      if (onCreado) onCreado();
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al crear concesionario");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-2 border rounded">
      <h2 className="font-bold mb-2">Añadir Concesionario</h2>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="border p-1 m-1" />
      <input name="ubicacion" value={form.ubicacion} onChange={handleChange} placeholder="Ubicación" className="border p-1 m-1" />
      <input name="CIF" value={form.CIF} onChange={handleChange} placeholder="CIF" className="border p-1 m-1" />
      <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Añadir</button>
    </form>
  );
}
