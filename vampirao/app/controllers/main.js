//controlador para as páginas simples do site como a home, sobre, campanhas etc...

function index(req,res){
    res.render("main/index", {
        titulo: "Home Page",
    });
}

function sobre(req,res){
    res.render("main/sobre", {
        titulo: "Sobre",
    });
}

module.exports = {index,sobre};