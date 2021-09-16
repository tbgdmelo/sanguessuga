//controlador para todas as páginas referentes ao usuario


const models = require("../models/index"); //import de todos os models
const Sangue = models.Sangue; //utilizando apenas o model de sangue para exibir nos radios button

const User = models.User;

async function cadastro(req,res){
    const sangues = await Sangue.findAll(); //recupera todos os registros da tabela sangues

    //verifica se foi uma requisição get, entao apenas exibe o formulário
    if(req.route.methods.get){
        res.render("user/cadastro", {
            sangues: sangues.map(sangue=>sangue.toJSON()), //envia para a view um json com oq foi encontrado no bd
            titulo: "Cadastro de usuário",
        });
    }
    else{
        await User.create({
            cpf: req.body.cpf,
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            nascimento: req.body.nascimento,
            email: req.body.email,
            senha: req.body.senha,
            id_sangue: req.body.id_sangue
        })
        res.redirect("/");
    }
}

module.exports = {cadastro};