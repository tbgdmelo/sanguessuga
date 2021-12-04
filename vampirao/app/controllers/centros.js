//controlador para as páginas sobre os centros...

const models = require("../models/index"); //import de todos os models
const Centro = models.Centro;
const Estoque = models.Estoque;
const Sangue = models.Sangue;
const Doacao = models.Doacao;
const User = models.User;

async function cadastrarCentro(req, res) {
    try {
        if (req.route.methods.get && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) { //se esta logado e como admin
            res.render("centros/cadastroCentros", {
                titulo: "Adicionar Centro de doação",
            });
        }
        else if (req.route.methods.post && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) {
            console.log(req.body)
            try {
                await Centro.create({
                    nome: req.body.nome,
                    telefone: req.body.telefone,
                    endereco: req.body.endereco,
                    vampirao: 0
                });
            }
            catch (error) {
                res.render("centros/cadastroCentros", {
                    errors: error,
                    vampirao: {
                        nome: req.body.nome,
                        telefone: req.body.telefone,
                        endereco: req.body.endereco,
                        vampirao: 0
                    },
                    titulo: "Adicionar Centro de doação",
                })
            }
            const usersAmount = await User.count();
            const centrosAmount = await Centro.count({
                where: {
                    vampirao: 0
                }
            });
            res.redirect("/admin/centros/lista");
        }
        else {
            res.redirect("/notfound");
        }
    }
    catch (error) {
        res.redirect("/notfound");
    }
}

async function lista(req, res) {
    try {
        if (req.route.methods.get && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) { //se esta logado e como admin
            const centros = await Centro.findAll({
                where: {
                    vampirao: 0
                }
            });
            res.render("centros/lista", {
                vampiroes: centros.map(centro => centro.toJSON()),
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
        if (req.route.methods.get && typeof (req.session.user) !== 'undefined') { //se esta logado
            const centros = await Centro.findAll();
            res.render("centros/index", {
                centros: centros.map(centro => centro.toJSON()), //envia para a view um json com oq foi encontrado no bd
                titulo: "Centros de doação",
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

async function estoque(req, res) {
    try {
        if (req.route.methods.get && typeof (req.session.user) !== 'undefined') { //se esta logado
            const id_centro = req.params.id;
            const centro = await Centro.findOne({ where: { id: id_centro } });

            if (!centro || typeof (centro) === 'undefined') {
                res.redirect("/notfound");
            }

            const estoques = await Estoque.findAll({ where: { id_centro: id_centro } });
            const sanguineos = await Sangue.findAll();
            res.render("centros/estoque", {
                titulo: "Estoque " + centro.nome,
                estoques: estoques.map(estoque => estoque.toJSON()),
                nome_centro: centro.nome,
                sanguineos: sanguineos.map(sangue => sangue.toJSON())
            });
        }
        else {
            res.redirect("/notfound");
        }
    }
    catch (error) {
        console.log(error)
        res.redirect("/notfound");
    }
}

async function agendar(req, res) {
    try {
        if (req.route.methods.get && typeof (req.session.user) !== 'undefined') {
            const id_centro = req.params.id;
            const centro = await Centro.findOne({ where: { id: id_centro } });

            if (!centro || typeof (centro) === 'undefined') {
                res.redirect("/notfound");
            }
            let data = new Date();
            let dia = data.getDate();
            if (dia < 10) {
                dia = '0' + dia;
            }
            let dataFormatada = ((data.getFullYear())) + "-" + ((data.getMonth() + 1)) + "-" + dia;

            res.render("centros/agendar", {
                nome_centro: centro.nome,
                data: dataFormatada
            });
        }
        else if (req.route.methods.post && typeof (req.session.user) !== 'undefined') {
            try {
                const agendados = await Doacao.findAll({ where: { cpf_user: req.session.user.cpf, agendado: 1 } });
                console.log(agendados);
                if (agendados.length === 0) {
                    const doa = await Doacao.create({
                        data: req.body.dia,
                        hora: req.body.hora,
                        cpf_user: req.session.user.cpf,
                        id_centro: req.params.id,
                        agendado: 1
                    });
                    const id = req.session.user.id;
                    const user = await User.findOne({ where: { id: id } });
                    const sanguineo = await Sangue.findOne({ where: { id: user.id_sangue } });
                    if (req.session.user.id == id) {
                        res.render("user/perfil", {
                            titulo: "Meu Perfil",
                            id: user.id,
                            nome: user.nome,
                            sobrenome: user.sobrenome,
                            tipoSanguineo: sanguineo.tipo,
                            pontuacao: user.pontuacao,
                            modal: "ClickBotao3()",
                            id_doacao: doa.id
                        });
                    }
                    else {
                        res.redirect("/notfound");
                    }
                }
                else {
                    const id_centro = req.params.id;
                    const centro = await Centro.findOne({ where: { id: id_centro } });

                    if (!centro || typeof (centro) === 'undefined') {
                        res.redirect("/notfound");
                    }
                    let data = new Date();
                    let dataFormatada = ((data.getFullYear())) + "-" + ((data.getMonth() + 1)) + "-" + data.getDate();

                    res.render("centros/agendar", {
                        nome_centro: centro.nome,
                        data: dataFormatada,
                        msg: "Você já possui uma doação agendada."
                    });
                }
            }
            catch (e) {
                res.redirect("/notfound");
                console.log(e);
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

async function update(req, res) {
    try {
        if (req.route.methods.get && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) { //se esta logado e como admin
            const vampirao = await Centro.findOne({ where: { id: req.params.id, vampirao: 0 } });
            if (!vampirao) {
                res.redirect("/notfound");
            }
            res.render("centros/updateCentros", {
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
                    vampirao: 0,
                }, { where: { id: req.params.id, vampirao: 0 } });
                res.redirect("../lista");
            }
            catch (error) {
                res.render("centros/updateCentros", {
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
                    vampirao: 0
                }
            });
            res.render("centros/lista", {
                modal: "ClickBotao()",
                vampiroes: vampiroes.map(centro => centro.toJSON()),
                id: req.params.id,
            });
        }
        else if (req.route.methods.post && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) {
            try {
                const vampirao = await Centro.findOne({where: {id:req.params.id, vampirao:0}});
                
                if(vampirao){
                    await vampirao.destroy();
                }
                else{
                    res.redirect("/notfound");
                }
                res.redirect("/admin/centros/lista");
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

module.exports = {cadastrarCentro, lista, index, estoque, agendar,remove, update };