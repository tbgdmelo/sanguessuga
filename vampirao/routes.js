const express = require("express");
const centrosController = require("./app/controllers/centros");
const vampiraoController = require("./app/controllers/vampirao");
const usersController = require("./app/controllers/users");
const adminController = require("./app/controllers/admin");
const mainController = require("./app/controllers/main");
const router = express.Router();

router.get("/",mainController.index);
router.get("/sobre",mainController.sobre);
router.get("/cadastro",mainController.cadastro);

module.exports = router;