const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/lote");
const ctrl2 = require("../controllers/registros");
const ctrl3 = require("../controllers/importaciones");

router.put("/actualizar/:id", ctrl.actualizar);
router.post("/upload_lote", ctrl.upload);
router.get("/buscar/lote/:search/:field", ctrl.buscar);
//detalle de excel importados
router.get("/obtener/importaciones", ctrl3.obtenerTabla);
router.post("/guardar/importacion", ctrl3.guardar);
router.get("/buscar/importacion/:value/:field", ctrl3.buscar);
//registro de codigo de prescintos
router.get("/ultimoid/registro", ctrl2.getlastid);
router.get("/buscar/registro/:id", ctrl2.buscarid);
router.post("/guardar/codigo/registro", ctrl2.guardarCodigo);
router.put("/cerrar/registro", ctrl2.cerrarRegistro);
router.get("/lista/registro", ctrl2.obtenerListaNumerosRegistros);

module.exports = router;
