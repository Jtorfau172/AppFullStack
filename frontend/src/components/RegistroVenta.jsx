import React, { useState, useEffect } from "react";
import api from "../services/api.js";

export default function RegistroVenta() {
  const [clientes, setClientes] = useState([]);
  const [coches, setCoches] = useState([]);
  const [form, setForm] = useState({ cliente_id: "", coche_id: "", metodo_pago: "" });

  useEffect(() => {
    const fetchData = async () => {
      const resC = await api.get("/clientes"); // Debes crear endpoint clientes si no existe
      setClientes(resC.data);
      const resCo = await api.get("/coches/search");
      setCoches(resCo.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/ventas", form);
      alert("Venta registrada!");
      setForm({ cliente_id: "", coche_id: "", metodo_pago: "" });
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al registrar venta");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 border rounded">
      <h2 className="font-bold mb-2">Registrar Venta</h2>
      <select value={form.cliente_id} onChange={e => setForm({...form, cliente_id:e.target.value})}>
        <option value="">Selecciona cliente</option>
        {clientes.map(c => <option key={c._id} value={c._id}>{c.nombre}</option>)}
      </select>
      <select value={form.coche_id} onChange={e => setForm({...form, coche_id:e.target.value})}>
        <option value="">Selecciona coche</option>
        {coches.map(c => <option key={c._id} value={c._id}>{c.marca} {c.modelo}</option>)}
      </select>
      <input placeholder="Método de pago" value={form.metodo_pago} onChange={e => setForm({...form, metodo_pago:e.target.value})}/>
      <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Registrar</button>
    </form>
  );
}
