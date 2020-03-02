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

ctrl.obtenerTabla = async (req, res) => {
  await dbMysql.query(
    "select t1.*, t2.* from detalle_archivos_importados t1 " +
      "inner join " +
      "(select nombre_file," +
      "sum(case  when estado = 'CONFORME' then 1 else 0 end) as conforme, " +
      "sum(case  when estado = 'NO CONFORME' then 1 else 0 end) as noconforme " +
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

// ctrl.obtenerTabla = async (req, res) => {
//   await dbMysql.query(
//     "SELECT * FROM detalle_archivos_importados order by fecha_subida desc",
//     (err, importaciones) => {
//       if (err) {
//         res.json({ status: "error", message: err });
//       }
//       res.json({ status: "ok", importaciones });
//     }
//   );
// };

module.exports = ctrl;
