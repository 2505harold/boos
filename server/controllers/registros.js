const dbMysql = require("../database");
const ctrl = {};

ctrl.getlastid = async (req, res) => {
  await dbMysql.query(
    "select max(id) from detalle_registro_prescintos",
    (error, lastid) => {
      if (error) {
        res.json({ status: "error", message: error });
      }
      res.json({ status: "ok", id: lastid[0]["max(id)"] });
    }
  );
};

ctrl.buscarid = async (req, res) => {
  const id = req.params.id;
  await dbMysql.query(
    "select * from detalle_registro_prescintos where id = ?",
    [id],
    (error, registro) => {
      if (error) {
        res.send({ status: "error", message: error });
      }
      res.send({ status: "ok", registro });
    }
  );
};

ctrl.guardarCodigo = async (req, res) => {
  const { codigo_apertura, fecha_apertura } = req.body;
  await dbMysql.query(
    "INSERT INTO detalle_registro_prescintos SET ?",
    [req.body],
    (error, result) => {
      if (error) {
        res.json({ status: "error", message: error });
      }
      res.json({ status: "ok", message: "Datos insertados correctamente" });
    }
  );
};

ctrl.cerrarRegistro = async (req, res) => {
  const { codigo_registro } = req.body;
  delete req.body["codigo_registro"];
  await dbMysql.query(
    "UPDATE detalle_registro_prescintos SET ? where codigo_apertura = ?",
    [req.body, codigo_registro],
    (error, result) => {
      if (error) {
        res.json({ status: "error", message: error });
      }
      res.json({ status: "ok", message: "Datos insertados correctamente" });
    }
  );
};

module.exports = ctrl;
