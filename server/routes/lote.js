const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/lote");
const ctrl2 = require("../controllers/registros");

router.put("/actualizar/:id", ctrl.actualizar);
router.post("/upload_lote", ctrl.upload);
router.get("/buscar/:search", ctrl.buscar);
//registro de codigo de prescintos
router.get("/ultimoid/registro", ctrl2.getlastid);
router.get("/buscar/registro/:id", ctrl2.buscarid);
router.post("/guardar/codigo/registro", ctrl2.guardarCodigo);
router.put("/cerrar/registro", ctrl2.cerrarRegistro);

module.exports = router;
