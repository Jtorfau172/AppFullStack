exports.searchCoches = async (req, res) => {
  const { precio_max, marca, disponibilidad } = req.query;
  const filtro = {};

  if (precio_max) filtro.precio = { $lte: precio_max };
  if (marca) filtro.marca = marca;
  if (disponibilidad === "true") filtro.stock = { $gt: 0 };

  const coches = await Coche.find(filtro);
  res.json(coches);
};
