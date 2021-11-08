//controlador para as páginas simples do site como a home, sobre, campanhas etc...
const models = require("../models/index"); //import de todos os models
const Recompensa = models.Recompensa;


async function index(req , res){
    try{
        if(req.route.methods.get && typeof(req.session.user) !== 'undefined' && req.session.user.isAdmin){ //se esta logado
            const recompensas = await Recompensa.findAll();
            res.render("recompensas/index", {
                titulo: "Recompensas ativas",
                recompensas: recompensas.map(recompensa => recompensa.toJSON()),
            });
        }
        else{
            res.redirect("/notfound");
        }
    }
    catch(error){
        res.redirect("/notfound");
    }
}

async function addRecompensa(req , res){
    try{
        if(req.route.methods.get && typeof(req.session.user) !== 'undefined' && req.session.user.isAdmin){ //se esta logado
            res.render("recompensas/cadastrar", {
                titulo: "Cadastrar Recompensa",
            });
        }
        else if(req.route.methods.post && typeof(req.session.user) !== 'undefined' && req.session.user.isAdmin){
            await Recompensa.create({
                nome: req.body.nome,
                valor: req.body.valor,
                codigo: req.body.codigo
            });
            const recompensas = await Recompensa.findAll();
            res.render("recompensas/index",{
                titulo: "Recompensas ativas",
                recompensas: recompensas.map(recompensa => recompensa.toJSON()),
            });
        }
        else{
            res.redirect("/notfound");
        }
    }
    catch(error){
        res.redirect("/notfound");
    }
}

async function remove(req, res) {
    try {
        if (req.route.methods.get && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) { //se esta logado e como admin
            const recompensas = await Recompensa.findAll();
            res.render("recompensas/index", {
                modal: "ClickBotao()",
                recompensas: recompensas.map(recompensa => recompensa.toJSON()),
                id: req.params.id,
            });
        }
        else if (req.route.methods.post && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) {
            try {
                const recompensa = await Recompensa.findOne({where: {id:req.params.id}});
                
                if(recompensa){
                    await recompensa.destroy();
                }
                else{
                    res.redirect("/notfound");
                }
                res.redirect("../../recompensas/index");
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
    
async function update(req, res) {
    try {
        if (req.route.methods.get && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) { //se esta logado e como admin
            const recompensa = await Recompensa.findOne({ where: { id: req.params.id} });
            if (!recompensa) {
                res.redirect("/notfound");
            }
            res.render("recompensas/update", {
                nome_recompensa: recompensa.nome,
                val_recompensa: recompensa.valor,
                id_recompensa: recompensa.id,
                cod_recompensa: recompensa.codigo
            });
        }
        else if (req.route.methods.post && typeof (req.session.user) !== 'undefined' && req.session.user.isAdmin) {
            try {
                await Recompensa.update({
                    id: req.body.id,
                    nome: req.body.nome,
                    valor: req.body.valor,
                    codigo: req.body.codigo
                }, { where: { id: req.params.id} });
                res.redirect("../index");
            }
            catch (error) {
                res.render("recompensas/update", {
                nome_recompensa: req.body.nome,
                val_recompensa: req.body.telefone,
                id_recompensa: req.body.id,
                cod_recompensa: req.body.codigo,
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

async function listarRecompensas(req, res){
    try{
        if(req.route.methods.get && req.session.user !== 'undefined' && !req.session.user.isAdmin){
            const recompensas = await Recompensa.findAll();
            res.render("recompensas/listar",{
                recompensas: recompensas.map(recompensa => recompensa.toJSON()),
            });
        }
        else{
            res.redirect("/notfound");
        }
    }
    catch (error) {
        res.redirect("/notfound");
    }
}

module.exports = {index, addRecompensa, remove, update, listarRecompensas};