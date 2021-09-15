//controlador para todas as páginas referentes ao usuario

function cadastro(req,res){
    res.render("user/cadastro", {
        titulo: "Cadastro de usuário",
    })
}

module.exports = {cadastro};