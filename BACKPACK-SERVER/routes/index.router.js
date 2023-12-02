const express = require("express");
const router = express.Router();

const authRouter = require("./auth.router");
const documentRouter = require("./document.router");
const materiaRouter = require("./materia.router");
const userRouter = require("./user.router");

// /api/...
router.use("/auth", authRouter);
router.use("/document", documentRouter);
router.use("/materia", materiaRouter);
router.use("/user", userRouter);

module.exports = router;