const express = require("express");
const router = express.Router();
const ROLES = require("../data/roles.constants.json");

const userController = require("../controllers/user.controller");

router.get("/", 
  // authentication,
  // authorization(ROLES.MOD),
  userController.findAll
);

router.delete("/:identifier", 
  // authentication,
  // authorization(ROLES.MOD),
  userController.deleteById
);

module.exports = router;