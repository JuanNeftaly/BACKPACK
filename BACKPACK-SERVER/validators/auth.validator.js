const { body } = require("express-validator");

const validators = {};

// const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,32}$/

validators.registerValidator = [
  body("username")
    .notEmpty().withMessage("username is required")
    .isLength({ min: 1, max: 100 }).withMessage("username format incorrect"),
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Email format incorrect"),
  body("carrera")
    .notEmpty().withMessage("Carrera is required")
    .isLength({ min: 4, max: 100 }).withMessage("Carrera format incorrect"),
  body("password")
    .notEmpty().withMessage("Password is required")
    
    // .matches(passwordRegexp).withMessage("Password format incorrect"),  
];

module.exports = validators;