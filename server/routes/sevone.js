const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/sevone");

router.get("/v1/devices", ctrl.getDevice);
router.get("/v1/devices/:id/object", ctrl.getObjectDevice);
router.get(
  "/v1/devices/:idDevice/object/:idObject/indicators",
  ctrl.getIndicators
);
router.get(
  "/v1/devices/:idDevice/object/:idObject/indicators/:idIndicators/data",
  ctrl.getData
);

module.exports = router;
