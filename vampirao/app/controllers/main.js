function index(req,res){
    res.render("main/index");
}

function sobre(req,res){
    res.render("main/sobre");
}

function cadastro(req,res){
    res.render("main/cadastro");
}
module.exports = {index,sobre,cadastro};