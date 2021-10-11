//controlador para as páginas simples do site como a home, sobre, campanhas etc...
const models = require("../models/index"); //import de todos os models
const User = models.User;
const Centro = models.Centro;
const Recompensa = models.Recompensa;
const Pedido = models.Pedido;

async function cadastrarVampirao(req , res){
    try{
        if(req.route.methods.get && typeof(req.session.user) !== 'undefined' && req.session.user.isAdmin){ //se esta logado e como admin
            res.render("centros/cadastro", {
                titulo: "Adicionar Vampirao",
            });
        }
        else if(req.route.methods.post){
            const usersAmount = await User.count();
            const centrosAmount = await Centro.count({
                where:{
                    vampirao:1
                }
            });
            const recompensaAmount = await Recompensa.count();
            const pedidoAmount = await Pedido.count();

            await Centro.create({
                nome: req.body.nome,
                telefone: req.body.telefone,
                endereco: req.body.endereco,
                vampirao: 1
            });
            res.render("admin/index", {
                titulo: "Dashboard Admin",
                usersAmount: usersAmount,
                centrosAmount: centrosAmount,
                recompensaAmount: recompensaAmount,
                pedidoAmount: pedidoAmount,
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
    

module.exports = {cadastrarVampirao};