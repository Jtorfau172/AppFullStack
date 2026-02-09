import React, { useState, useEffect } from "react";
import api from "../services/api.js";

export default function CochesForm() {
  const [concesionarios, setConcesionarios] = useState([]);
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    precio: "",
    stock: "",
    año: "",
    concesionario_id: ""
  });

  useEffect(() => {
    api.get("/concesionarios").then(res => setConcesionarios(res.data)).catch(() => {});
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/coches", {
        ...form,
        precio: Number(form.precio),
        stock: Number(form.stock),
        año: Number(form.año)
      });
      alert("Coche añadido!");
      setForm({ marca: "", modelo: "", precio: "", stock: "", año: "", concesionario_id: "" });
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al añadir coche");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-2 border rounded">
      <h2 className="font-bold mb-2">Añadir Coche</h2>
      <input name="marca" value={form.marca} onChange={handleChange} placeholder="Marca" className="border p-1 m-1"/>
      <input name="modelo" value={form.modelo} onChange={handleChange} placeholder="Modelo" className="border p-1 m-1"/>
      <input name="precio" type="number" value={form.precio} onChange={handleChange} placeholder="Precio" className="border p-1 m-1"/>
      <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" className="border p-1 m-1"/>
      <input name="año" type="number" value={form.año} onChange={handleChange} placeholder="Año" className="border p-1 m-1"/>
      <select name="concesionario_id" value={form.concesionario_id} onChange={handleChange} className="border p-1 m-1">
        <option value="">Selecciona concesionario</option>
        {concesionarios.map(c => <option key={c._id} value={c._id}>{c.nombre}</option>)}
      </select>
      <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Añadir</button>
    </form>
  );
}
