const { body, param } = require("express-validator");

const validators = {};

validators.createDocumentValidator = [
  param("identifier")
    .optional()
    .notEmpty().withMessage("Identifier is required")
    .isMongoId().withMessage("Identifier must be a Mongo Id"),
  body("title")
    .notEmpty().withMessage("Title is required"),
  body("materia")
    .notEmpty().withMessage("Materia is required"),
  body("temas")
    .notEmpty().withMessage("Temas is required")
    .isString().withMessage("Temas must be an String"),
  body("clasificacion")
    .notEmpty().withMessage("Clasificacion is required"),
  body("annioPublicacion")
    .notEmpty().withMessage("Year is required"),
  body("cicloPublicacion")
    .notEmpty().withMessage("Ciclo is required"),
];

validators.idInParamsValidator = [
  param("identifier")
    .notEmpty().withMessage("Identifier is required")
    .isMongoId().withMessage("Identifier must be a Mongo Id"),
];

module.exports = validators;