//controlador para as páginas simples do site como a home, sobre, campanhas etc...
const models = require("../models/index"); //import de todos os models
const User = models.User;
const Centro = models.Centro;
const Recompensa = models.Recompensa;
const Pedido = models.Pedido;

async function cadastrarVampirao(req, res) {
    try {
        if (req.route.methods.get && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) { //se esta logado e como admin
            res.render("centros/cadastro", {
                titulo: "Adicionar Vampirao",
            });
        }
        else if (req.route.methods.post && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) {
            try {
                await Centro.create({
                    nome: req.body.nome,
                    telefone: req.body.telefone,
                    endereco: req.body.endereco,
                    vampirao: 1
                });
            }
            catch (error) {
                res.render("centros/cadastro", {
                    errors: error,
                    vampirao: {
                        nome: req.body.nome,
                        telefone: req.body.telefone,
                        endereco: req.body.endereco,
                        vampirao: 1
                    },
                    titulo: "Adicionar Vampirão",
                })
            }
            const usersAmount = await User.count();
            const centrosAmount = await Centro.count({
                where: {
                    vampirao: 1
                }
            });
            const recompensaAmount = await Recompensa.count();
            const pedidoAmount = await Pedido.count();
            res.render("admin/index", {
                titulo: "Dashboard Admin",
                usersAmount: usersAmount,
                centrosAmount: centrosAmount,
                recompensaAmount: recompensaAmount,
                pedidoAmount: pedidoAmount,
            });
        }
        else {
            res.redirect("/notfound");
        }
    }
    catch (error) {
        res.redirect("/notfound");
    }
}

async function index(req, res) {
    try {
        if (req.route.methods.get && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) { //se esta logado e como admin
            const vampiroes = await Centro.findAll({
                where: {
                    vampirao: 1
                }
            });
            res.render("centros/vampiroes", {
                vampiroes: vampiroes.map(centro => centro.toJSON()),
            });
        }
        else {
            res.redirect("/notfound");
        }
    }
    catch (error) {
        res.redirect("/notfound");
    }

}
async function update(req, res) {
    try {
        if (req.route.methods.get && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) { //se esta logado e como admin
            const vampirao = await Centro.findOne({ where: { id: req.params.id, vampirao: 1 } });
            if (!vampirao) {
                res.redirect("/notfound");
            }
            res.render("centros/update", {
                nome_vampirao: vampirao.nome,
                tel_vampirao: vampirao.telefone,
                end_vampirao: vampirao.endereco,
                id_vampirao: vampirao.id,
            });
        }
        else if (req.route.methods.post && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) {
            try {
                await Centro.update({
                    id: req.body.id,
                    nome: req.body.nome,
                    endereco: req.body.endereco,
                    telefone: req.body.telefone,
                    vampirao: 1,
                }, { where: { id: req.params.id, vampirao: 1 } });
                res.redirect("../index");
            }
            catch (error) {
                res.render("centros/update", {
                    id_vampirao: req.body.id,
                    nome_vampirao: req.body.nome,
                    end_vampirao: req.body.endereco,
                    tel_vampirao: req.body.telefone,
                    errors: error
                });
            }
        }
        else {
            res.redirect("/notfound");
        }
    }
    catch (error) {
        res.redirect("/notfound");
    }

}

async function remove(req, res) {
    try {
        if (req.route.methods.get && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) { //se esta logado e como admin
            const vampiroes = await Centro.findAll({
                where: {
                    vampirao: 1
                }
            });
            res.render("centros/vampiroes", {
                modal: "ClickBotao()",
                vampiroes: vampiroes.map(centro => centro.toJSON()),
                id: req.params.id,
            });
        }
        else if (req.route.methods.post && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) {
            try {
                const vampirao = await Centro.findOne({where: {id:req.params.id, vampirao:1}});
                
                if(vampirao){
                    await vampirao.destroy();
                }
                else{
                    res.redirect("/notfound");
                }
                res.redirect("../../vampiroes/index");
            }
            catch (error) {
                console.log(error)
            }
        }
        else {
            res.redirect("/notfound");
        }
    }
    catch (error) {
        res.redirect("/notfound");
    }
}
module.exports = { cadastrarVampirao, index, update, remove };