const { body, param } = require("express-validator");

const validators = {};

validators.createDenunciaValidator = [
  param("identifier")
    .optional()
    .notEmpty().withMessage("Identifier is required")
    .isMongoId().withMessage("Identifier must be a Mongo Id"),
  body("title")
    .notEmpty().withMessage("Title is required"),
  body("document")
    .notEmpty().withMessage("Document is required"),
];

validators.idInParamsValidator = [
  param("identifier")
    .notEmpty().withMessage("Identifier is required")
    .isMongoId().withMessage("Identifier must be a Mongo Id"),
];

module.exports = validators;