//controlador para as páginas simples do site como a home, sobre, campanhas etc...

function index(req,res){
    res.render("main/index", {
        titulo: "Home Page",
    });
}

function sobre(req,res){
    if(!req.session.user){
        res.redirect("notfound");
    }
    res.render("main/sobre", {
        titulo: "Sobre",
    });
}

function notfound(req,res){
    res.render("main/notfound",{
        titulo:"Not Found"
    });
}
    

module.exports = {index,sobre,notfound};