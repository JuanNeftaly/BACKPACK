const express = require('express');
const router = express.Router();
const ROLES = require("../data/roles.constants.json");
// const multer = require('multer');
// const path = require('path');
// const route = path.join(__dirname, '../uploads/');
// const upload = multer({ dest: route });

const { createMateriaValidator, idInParamsValidator } = require("../validators/materia.validator");
const validateFields = require("../middlewares/index.middleware");

const { authentication, authorization } = require("../middlewares/auth.middlewares");

const materiaController = require("../controllers/materia.controller");

// /api/materia/...

// Consumo
router.get("/", materiaController.findAll);

router.get("/carrera",
  authentication,
  materiaController.findByCarreer
);

// Creacion y mantenimiento
router.post(["/", "/:identifier"],
  // authentication,
  // authorization(ROLES.MOD),
  // upload.single('imagen'),
  createMateriaValidator,
  validateFields,
  materiaController.createMateria
);

// Eliminar
router.delete("/:identifier",
  // authentication,
  // authorization(ROLES.MOD),
  idInParamsValidator,
  validateFields,
  materiaController.deleteById
);

module.exports = router;