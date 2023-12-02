const { body, param } = require("express-validator");

const validators = {};

validators.createMateriaValidator = [
  param("identifier")
    .optional()
    .notEmpty().withMessage("Identifier is required")
    .isMongoId().withMessage("Identifier must be a Mongo Id"),
  body("codigo")
    .notEmpty().withMessage("Nombre is required"),
  body("name")
    .notEmpty().withMessage("Carrera is required"),
  body("carreras")
    .notEmpty().withMessage("Codigo is required"),  
];

validators.idInParamsValidator = [
  param("identifier")
    .notEmpty().withMessage("Identifier is required")
    .isMongoId().withMessage("Identifier must be a Mongo Id"),
];

module.exports = validators;