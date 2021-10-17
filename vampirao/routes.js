const express = require("express");
const centrosController = require("./app/controllers/centros");
const vampiraoController = require("./app/controllers/vampirao");
const usersController = require("./app/controllers/users");
const adminController = require("./app/controllers/admin");
const mainController = require("./app/controllers/main");
const recompensaController = require("./app/controllers/recompensas");
const router = express.Router();

router.get("/",mainController.index);
router.get("/sobre",mainController.sobre);
router.get("/cadastro",usersController.cadastro);

router.get("/cadastro",usersController.cadastro);
router.post("/cadastro", usersController.cadastro);

router.get("/esqueci_senha", usersController.esqueciSenha);
router.post("/esqueci_senha", usersController.esqueciSenha);

router.post("/reset_senha/:token", usersController.reset_senha);
router.get("/reset_senha/:token", usersController.reset_senha);
router.get("/tokenexpired", usersController.tokenexpired);

router.get("/login",usersController.login);
router.post("/login",usersController.login);

router.get("/sair", usersController.deslogar);

router.get("/notfound", mainController.notfound);

router.get("/campanhas", mainController.campanhas);

//Páginas que precisam de autenticacao para acessar
router.get("/perfil/:id", usersController.perfil);
router.get("/centros/index", centrosController.index);
router.get("/centros/:id", centrosController.estoque);

//Rotas do admin
router.get("/admin/index", adminController.index);
router.get("/admin/centros/cadastro", vampiraoController.cadastrarVampirao);
router.post("/centros/cadastro", vampiraoController.cadastrarVampirao);
router.get("/admin/vampiroes/index", vampiraoController.index);
router.get("/admin/vampiroes/update/:id", vampiraoController.update);
router.post("/admin/vampiroes/update/:id", vampiraoController.update);
router.get("/admin/vampiroes/remove/:id", vampiraoController.remove);
router.post("/admin/vampiroes/remove/:id", vampiraoController.remove);
router.get("/admin/recompensas/index", recompensaController.index);
router.get("/admin/recompensas/add", recompensaController.addRecompensa);

module.exports = router;