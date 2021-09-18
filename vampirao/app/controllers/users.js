//controlador para todas as páginas referentes ao usuario


const models = require("../models/index"); //import de todos os models
const Sangue = models.Sangue; //utilizando apenas o model de sangue para exibir nos radios button

const User = models.User;

const crypto = require('crypto');

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
        try{
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
        catch (error){
            //console.log("olha aquiiiiii")
            //console.log(error)
            
            res.render("user/cadastro",{
                errors: error,
                sangues: sangues.map(sangue=>sangue.toJSON()),
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

async function esqueciSenha(req, res){
    if(req.route.methods.get){
        res.render("user/esqueci_senha",{
            titulo: "Recuperação de senha",
        })
    }
    else{
        try{
            const user = await User.findOne({ where:{email: req.body.email } });
            //console.log('veio user');
            //console.log(user);
            if(user===null){
                res.render("user/esqueci_senha",{
                    titulo: "Recuperação de senha",
                    errorMsg: "Não há nenhum cadastro para este e-mail!"
                })
            }
            else{
                //prosseguir com os passos para enviar o link
                res.render("user/esqueci_senha",{
                    titulo: "Recuperação de senha",
                    modal: "ClickBotao()"
                });
                /*try{

                    const token = crypto.randomBytes(20).toString("hex");

                    const now = new Date();
                    now.setHours(now.getHours()+1);

                    await User.findOne({ where: {email: req.body.email} })

                    try{
                        await User.update({
                            passwordResetToken: token,
                            passwordResetExpires: now,
                        },{ where: {email: req.body.email} });
                        res.redirect("/");
                    }
                    catch(error){
                        console.log('erro na atualizacao dos tokens');
                    }
                    console.log(token, now)
                }
                catch(error){
                    console.log("tive um erro de recup senha");
                    console.log(error);
                    res.redirect("/");
                }*/
            }
        }
        catch(errors){
            console.log(errors);
        }
    }
}

module.exports = {cadastro, esqueciSenha};