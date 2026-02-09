import React, { useState } from "react";
import api from "../services/api.js";

export default function ClientesForm({ onCreado }) {
  const [form, setForm] = useState({ dni: "", nombre: "", email: "", telefono: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/clientes", form);
      alert("Cliente creado!");
      setForm({ dni: "", nombre: "", email: "", telefono: "" });
      if (onCreado) onCreado();
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al crear cliente");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-2 border rounded">
      <h2 className="font-bold mb-2">Añadir Cliente</h2>
      <input name="dni" value={form.dni} onChange={handleChange} placeholder="DNI" className="border p-1 m-1" />
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="border p-1 m-1" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-1 m-1" />
      <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" className="border p-1 m-1" />
      <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Añadir</button>
    </form>
  );
}
