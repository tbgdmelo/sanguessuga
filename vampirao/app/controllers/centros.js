//controlador para as páginas sobre os centros...

const models = require("../models/index"); //import de todos os models
const Centro = models.Centro;
const Estoque = models.Estoque;
const Sangue = models.Sangue;

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

module.exports = { index, estoque };