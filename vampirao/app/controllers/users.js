//controlador para todas as páginas referentes ao usuario

const models = require("../models/index"); //import de todos os models
const Sangue = models.Sangue; //utilizando apenas o model de sangue para exibir nos radios button

async function cadastro(req,res){
    const sangues = await Sangue.findAll(); //recupera todos os registros da tabela sangues
    res.render("user/cadastro", {
        sangues: sangues.map(sangue=>sangue.toJSON()), //envia para a view um json com oq foi encontrado no bd
        titulo: "Cadastro de usuário",
    })
}

module.exports = {cadastro};