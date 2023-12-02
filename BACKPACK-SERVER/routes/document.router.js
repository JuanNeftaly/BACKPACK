const express = require("express");
const router = express.Router();
const ROLES = require("../data/roles.constants.json");
// const multer = require('multer');
// const path = require('path');
// const route = path.join(__dirname, '../uploads/');
// const upload = multer({ dest: route });

const { createDocumentValidator, idInParamsValidator } = require("../validators/document.validator");
const validateFields = require("../middlewares/index.middleware");

const { authentication, authorization } = require("../middlewares/auth.middlewares");

const documentController = require("../controllers/document.controller");

// /api/document/...

// Consumo
router.get("/", documentController.findAll);

router.get("/own",
  authentication,
  authorization(ROLES.USER),
  documentController.findOwn
);

router.get("/search", 
  documentController.findByMateria
);

router.get("/saved",
  authentication,
  authorization(ROLES.USER),
  documentController.findSavedDocuments
  
);

router.get("/user/:identifier", 
  idInParamsValidator,
  validateFields,
  documentController.findByUser
);

router.get("/:identifier",
  idInParamsValidator,
  validateFields,
  documentController.findOneById,
);

// Creacion y mantenimiento
router.post(["/", "/:identifier"],
  authentication,
  authorization(ROLES.USER),
  // upload.single('pdf'),
  createDocumentValidator,
  validateFields,
  documentController.save,
);

// Modificacion e interaccion
router.patch("/visibility/:identifier",
  authentication,
  authorization(ROLES.USER),
  idInParamsValidator,
  validateFields,
  documentController.toggleHidden
);

router.patch("/like/:identifier",
  authentication,
  authorization(ROLES.USER),
  idInParamsValidator,
  validateFields,
  documentController.likeADocument
);

router.patch("/save/:identifier",
  authentication,
  authorization(ROLES.USER),
  idInParamsValidator,
  validateFields,
  documentController.saveADocument
);

// Eliminar
router.delete("/:identifier",
  authentication,
  authorization(ROLES.USER),
  idInParamsValidator,
  validateFields,
  documentController.deleteById,
);

module.exports = router;