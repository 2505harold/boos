const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/lote");

router.put("/actualizar/:id", ctrl.actualizar);
router.post("/upload_lote", ctrl.upload);
router.get("/buscar/:search", ctrl.buscar);

module.exports = router;
