//controlador para as páginas simples do site como a home, sobre, campanhas etc...
const models = require("../models/index"); //import de todos os models
const Recompensa = models.Recompensa;


async function index(req , res){
    try{
        if(req.route.methods.get && typeof(req.session.user) !== 'undefined' && req.session.user.isAdmin){ //se esta logado
            res.render("recompensas/index", {
                titulo: "Recompensas ativas",
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
                valor: req.body.valor
            });
            res.render("recompensas/index",{
                titulo: "Recompensas ativas",
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
    

module.exports = {index, addRecompensa};