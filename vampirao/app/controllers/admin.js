//controlador para as páginas simples do site como a home, sobre, campanhas etc...
const models = require("../models/index"); //import de todos os models
const { estoque } = require("./centros");
const User = models.User;
const Centro = models.Centro;
const Recompensa = models.Recompensa;
const Sangue = models.Sangue;
const Pedido = models.Pedido;
const Estoque = models.Estoque;
const Declaracao = models.declaracao;
const Doacao = models.Doacao;


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

function calculaPontos(nivel) {
    if (nivel === 'Ótimo') return 50
    else if (nivel === 'Normal') return 100
    else if (nivel === 'Alerta') return 150
    else if (nivel === 'Crítico') return 250
}

async function uploadDeclaracao(req, res) {
    try {
        const centros = await Centro.findAll({ where: { vampirao: 0 } });
        if (req.route.methods.get && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) { //se esta logado
            res.render("admin/document", {
                centros: centros.map(centro => centro.toJSON()),
            });
        }
        else if (req.route.methods.post && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) {
            try {
                const user = await User.findOne({ where: { cpf: req.body.cpf } });
                if (!user) {
                    res.render("admin/document", {
                        msg: "O cpf é inválido ou não há um usuário com este CPF cadastrado. Tente novamente.",
                        centros: centros.map(centro => centro.toJSON()),
                    });
                }

                const doacao = await Doacao.findOne({ where: { id: req.body.id_declaracao } });
                if (!doacao) {
                    res.render("admin/document", {
                        centros: centros.map(centro => centro.toJSON()),
                        msg_doacao: "O código da declaração está incorreto, tente novamente."
                    });
                }
                else {
                    try {
                        const user = await User.findOne({ where: { cpf: req.body.cpf } });
                        const nivel = await Estoque.findOne({
                            where: {
                                id_centro: req.body.id_centro,
                                id_sangue: user.id_sangue
                            }
                        });

                        const pontos = await calculaPontos(nivel.quantidade);

                        await User.update({
                            pontuacao: user.pontuacao + pontos
                        }, { where: { cpf: req.body.cpf } });

                        const declaracao = await Declaracao.create({
                            cpf_user: "018.795.232-99",
                            fileName: req.file.originalname,
                            fileExt: req.file.mimetype,
                            file: req.file.buffer
                        });

                        await Doacao.update({
                            id_declaracao: declaracao.id
                        }, { where: { id: req.body.id_declaracao } });


                    }
                    catch (e) {
                        console.log("falhou no banco");
                        console.log(e);
                    }
                    res.render("admin/document", {
                        modal: "ClickBotao()",
                        cpf: req.body.cpf,
                        centros: centros.map(centro => centro.toJSON()),
                    });
                }
            }
            catch (error) {
                console.log("error no envio da declaracao");
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
module.exports = { index, indexEstoque, updateEstoque, uploadDeclaracao };