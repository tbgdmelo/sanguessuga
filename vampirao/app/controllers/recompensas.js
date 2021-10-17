//controlador para as páginas simples do site como a home, sobre, campanhas etc...
const models = require("../models/index"); //import de todos os models
const User = models.User;
const Centro = models.Centro;
const Recompensa = models.Recompensa;
const Doacao = models.Doacao;
const Pedido = models.Pedido;


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
        else{
            res.redirect("/notfound");
        }
    }
    catch(error){
        res.redirect("/notfound");
    }
}
    

module.exports = {index, addRecompensa};