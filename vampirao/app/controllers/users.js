//controlador para todas as páginas referentes ao usuario


const models = require("../models/index"); //import de todos os models
const Sangue = models.Sangue; //utilizando apenas o model de sangue para exibir nos radios button

const User = models.User;

async function cadastro(req, res) {
    const sangues = await Sangue.findAll(); //recupera todos os registros da tabela sangues

    //verifica se foi uma requisição get, entao apenas exibe o formulário
    if (req.route.methods.get) {
        res.render("user/cadastro", {
            sangues: sangues.map(sangue => sangue.toJSON()), //envia para a view um json com oq foi encontrado no bd
            titulo: "Cadastro de usuário",
        });
    }
    else {
        try {
            await User.create({
                cpf: req.body.cpf,
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                nascimento: req.body.nascimento,
                email: req.body.email,
                senha: req.body.senha,
                pontuacao: 0,
                telefone: req.body.telefone,
                id_sangue: req.body.id_sangue
            })
            res.redirect("/");
        }
        catch (error) {
            //console.log("olha aquiiiiii")
            //console.log(error)

            res.render("user/cadastro", {
                errors: error,
                sangues: sangues.map(sangue => sangue.toJSON()),
                user: {
                    cpf: req.body.cpf,
                    nome: req.body.nome,
                    sobrenome: req.body.sobrenome,
                    nascimento: req.body.nascimento,
                    email: req.body.email,
                    senha: req.body.senha,
                    pontuacao: 0,
                    telefone: req.body.telefone,
                    id_sangue: req.body.id_sangue
                },
                titulo: "Cadastro de usuário",
            })
        }
    }
}

async function login(req, res) {
    if (req.route.methods.get) {
        res.render("user/login", {
            titulo: "Login",
        })
    }
    else {
        try {
            const user = await User.findOne({ where:{email: req.body.email, senha:req.body.senha } });
            
            if(!user){
                return res.render("user/login", {
                    message: "Sua conta ou senha está incorreta.",
                });
            }
            res.redirect("/");
        }
        catch (error) {
            console.log(error);
        }
    }
}
module.exports = { cadastro, login };