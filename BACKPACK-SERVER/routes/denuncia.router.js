const express = require('express');
const router = express.Router();
const ROLES = require("../data/roles.constants.json");

const { createDenunciaValidator, idInParamsValidator } = require("../validators/denuncia.validator");
const validateFields = require("../middlewares/index.middleware");

const { authentication, authorization } = require("../middlewares/auth.middlewares");