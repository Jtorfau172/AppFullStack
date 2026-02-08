import React, { useState } from "react";
import api from "../services/api.js";

export default function CochesForm() {
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    precio: "",
    stock: "",
    año: "",
    concesionario_id: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/coches", form);
      alert("Coche añadido!");
      setForm({ marca: "", modelo: "", precio: "", stock: "", año: "", concesionario_id: "" });
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al añadir coche");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-2 border rounded">
      <h2 className="font-bold mb-2">Añadir Coche</h2>
      {["marca","modelo","precio","stock","año","concesionario_id"].map(field => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field}
          className="border p-1 m-1"
        />
      ))}
      <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Añadir</button>
    </form>
  );
}
