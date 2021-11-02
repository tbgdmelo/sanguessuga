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

function notfound(req,res){
    res.render("main/notfound",{
        titulo:"Not Found"
    });
}

function campanhas(req,res){
    res.render("main/campanhas", {
        titulo: "Campanhas",
    });
}
    
function comoDoar(req,res){
    res.render("main/comodoar");
}

module.exports = {index,sobre,notfound, campanhas, comoDoar};