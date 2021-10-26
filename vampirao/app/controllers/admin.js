//controlador para as páginas simples do site como a home, sobre, campanhas etc...
const models = require("../models/index"); //import de todos os models
const { estoque } = require("./centros");
const User = models.User;
const Centro = models.Centro;
const Recompensa = models.Recompensa;
const Sangue = models.Sangue;
const Pedido = models.Pedido;
const Estoque = models.Estoque;


async function index(req, res) {
    try {
        if (req.route.methods.get && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) { //se esta logado
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

async function indexEstoque(req, res) {
    try {
        if (req.route.methods.get && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) { //se esta logado
            const centros = await Centro.findAll({ where: { vampirao: 0 } });

            res.render("centros/showestoques", {
                centros: centros.map(centro => centro.toJSON()),
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

async function updateEstoque(req, res) {
    try {
        if (req.route.methods.get && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) { //se esta logado
            const centro = await Centro.findOne({ where: { id: req.params.id } });
            const estoque = await Estoque.findAll({ where: { id_centro: req.params.id } });
            const sanguineos = await Sangue.findAll();
            if (!centro || estoque.length === 0) {
                res.redirect("/notfound");
            }
            res.render("centros/updateestoque", {
                nome_centro: centro.nome,
                estoques: estoque.map(estoque => estoque.toJSON()),
                sanguineos: sanguineos.map(sangue => sangue.toJSON()),
                id_centro: req.params.id
            });
        }
        else if (req.route.methods.post && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) {
            try {
                for (let i = 0; i < req.body.quantidade.length; i = i + 1) {
                    await Estoque.update({
                        id: req.body.id[i],
                        id_centro: req.body.id_centro,
                        id_sangue: req.body.id_sangue[i],
                        quantidade: req.body.quantidade[i],
                        updatedAt: new Date(),
                    }, { where: { id: req.body.id[i], id_centro: req.body.id_centro } });
                }
                const centro = await Centro.findOne({ where: { id: req.params.id } });
                const estoque = await Estoque.findAll({ where: { id_centro: req.params.id } });
                const sanguineos = await Sangue.findAll();
                if (!centro || estoque.length === 0) {
                    res.redirect("/notfound");
                }
                res.render("centros/afterupdate", {
                    nome_centro: centro.nome,
                    estoques: estoque.map(estoque => estoque.toJSON()),
                    sanguineos: sanguineos.map(sangue => sangue.toJSON()),
                    modal: "ClickBotao()"
                });
            }
            catch (error) {
                console.log("error na atualizacao do estoque");
                res.redirect("/notfound");
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

module.exports = { index, indexEstoque, updateEstoque };