const dbMysql = require("../database");
const ctrl = {};

ctrl.guardar = async (req, res) => {
  const data = req.body;
  await dbMysql.query(
    "INSERT INTO detalle_archivos_importados SET ?",
    [data],
    (err, resp) => {
      if (err) {
        res.json({ status: "error", message: err });
      }
      res.json({ status: "ok", resp });
    }
  );
};

ctrl.buscar = async (req, res) => {
  const value = req.params.value;
  const field = req.params.field;
  await dbMysql.query(
    "SELECT * FROM detalle_archivos_importados WHERE  ?? = ?",
    [field, value],
    (err, importacion) => {
      if (err) {
        res.json({ status: "error", message: err });
      }
      res.json({ status: "ok", importacion });
    }
  );
};

ctrl.eliminar = async (req, res) => {
  const name = req.params.name;
  await dbMysql.query(
    "DELETE FROM detalle_archivos_importados WHERE  nombre = ?",
    name,
    (err, nameFileEliminado) => {
      if (err) {
        res.json({ status: "error", message: err });
      }
      dbMysql.query(
        "DELETE FROM detalle_verificacion_medidores WHERE nombre_file = ?",
        name,
        (err, medidorEliminado) => {
          if (err) {
            res.json({ status: "error", message: err });
          }
          res.json({ status: "ok", datos: medidorEliminado });
        }
      );
    }
  );
};

ctrl.obtenerTabla = async (req, res) => {
  await dbMysql.query(
    "select t1.*, t2.* from detalle_archivos_importados t1 " +
      "inner join " +
      "(select nombre_file," +
      "sum(case  when estado = 'CONFORME' then 1 else 0 end) as conforme, " +
      "sum(case  when estado = 'NO CONFORME' then 1 else 0 end) as noconforme, " +
      "sum(case  when (codigo_prescinto is not null or codigo_prescinto != '') then 1 else 0 end) as etiquetado " +
      "from detalle_verificacion_medidores " +
      "group by nombre_file) t2 " +
      "on t1.nombre = t2.nombre_file",
    (err, importaciones) => {
      if (err) {
        res.json({ status: "error", message: err });
      }
      res.json({ status: "ok", importaciones });
    }
  );
};

module.exports = ctrl;
