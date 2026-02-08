api.get("/coches/search", {
  params: {
    marca,
    precio_max,
    disponibilidad: true
  }
});
