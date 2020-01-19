const dbMySQL = require("../database");
const ctrl = {};

ctrl.upload = async (req, res) => {
  const data = req.body;
  let key_old = [
    "Item",
    "N° de banco de ensayo",
    "# Medidor",
    "Q3 (L/h)",
    "Error Q3 (%)",
    "Q2 (L/h)",
    "Error Q2 (%)",
    "Q1 (L/h)",
    "Error Q1 (%)",
    "Ensayo de presión Estatica",
    "Fecha de ejecución",
    "N° Certificado",
    "Estado"
  ];
  let key_new = [
    "item",
    "nro_banco",
    "codigo_medidor",
    "q3",
    "error_q3",
    "q2",
    "error_q2",
    "q1",
    "error_q1",
    "ensayo_presion",
    "fecha_ejecucion",
    "certificado",
    "estado"
  ];

  data.forEach(element => {
    for (var i = 0; i < key_new.length; i++) {
      element[key_new[i]] = element[key_old[i]];
      delete element[key_old[i]];
    }
  });

  let keys = Object.keys(data[0]);
  let values = data.map(obj => keys.map(key => obj[key]));

  await dbMySQL.query(
    "INSERT INTO detalle_verificacion_medidores (" +
      keys.join(",") +
      ") VALUES ?",
    [values],
    (err, result) => {
      if (err) {
        res.json({ status: "error", message: err });
      }
      res.json({ status: "ok", message: "Datos insertados correctamente" });
    }
  );
};

ctrl.buscar = async (req, res) => {
  const search = req.params.search;
  await dbMySQL.query(
    "SELECT * FROM detalle_verificacion_medidores WHERE  codigo_medidor = ?",
    [search],
    (err, medicion) => {
      if (err) {
        res.json({ status: "error", message: err });
      }
      res.json({ status: "ok", medicion });
    }
  );
};

ctrl.actualizar = (req, res) => {
  var data = req.body;
  const { id } = req.body;
  delete data["id"];
  dbMySQL.query(
    "UPDATE detalle_verificacion_medidores SET ? WHERE id = ?",
    [data, id],
    (err, response) => {
      if (err) {
        res.json({ status: "error", message: err });
      }
      res.json({ status: "ok", response });
    }
  );
};

module.exports = ctrl;
