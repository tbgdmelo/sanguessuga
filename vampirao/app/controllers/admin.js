//controlador para as páginas simples do site como a home, sobre, campanhas etc...

async function index(req , res){
    try{
        if(req.route.methods.get && typeof(req.session.user) !== 'undefined' && req.session.user.isAdmin){ //se esta logado
            res.render("admin/index", {
                titulo: "Dashboard Admin",
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