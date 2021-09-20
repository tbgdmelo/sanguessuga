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

router.get("/cadastro",usersController.cadastro);
router.post("/cadastro", usersController.cadastro);

router.get("/esqueci_senha", usersController.esqueciSenha);
router.post("/esqueci_senha", usersController.esqueciSenha);

router.post("/reset_senha/:token", usersController.reset_senha);
router.get("/reset_senha/:token", usersController.reset_senha);
router.get("/tokenexpired", usersController.tokenexpired);

router.get("/perfil/:id", usersController.perfil);

router.get("/login",usersController.login);
router.post("/login",usersController.login);

module.exports = router;