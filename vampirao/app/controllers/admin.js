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
            const usersAmount = await User.count();
            const centrosAmount = await Centro.count({
                where:{
                    vampirao:1
                }
            });
            const recompensaAmount = await Recompensa.count();
            const doacaoAmount = await Doacao.count();
            const pedidoAmount = await Pedido.count();
            res.render("admin/index", {
                titulo: "Dashboard Admin",
                usersAmount: usersAmount,
                centrosAmount: centrosAmount,
                recompensaAmount: recompensaAmount,
                doacaoAmount: doacaoAmount,
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
    

module.exports = {index};