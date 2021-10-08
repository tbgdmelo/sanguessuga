//controlador para as páginas sobre os centros...


const models = require("../models/index"); //import de todos os models
const Centro = models.Centro; 

async function index(req,res){
    try{
        if(req.route.methods.get && typeof(req.session.user) !== 'undefined'){ //se esta logado
            const centros = await Centro.findAll();
            res.render("centros/index", {
                centros: centros.map(centro=>centro.toJSON()), //envia para a view um json com oq foi encontrado no bd
                titulo: "Centros de doação",
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

module.exports = {index};