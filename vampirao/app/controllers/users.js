//controlador para todas as páginas referentes ao usuario


const models = require("../models/index"); //import de todos os models
const Sangue = models.Sangue; //utilizando apenas o model de sangue para exibir nos radios button

const User = models.User;

const crypto = require('crypto');

const mailer = require("../modules/mailer");

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
                
                try{

                    const token = crypto.randomBytes(20).toString("hex");

                    const now = new Date();
                    now.setHours(now.getHours()+1);

                    await User.findOne({ where: {email: req.body.email} });

                    try{
                        await User.update({
                            passwordResetToken: token,
                            passwordResetExpires: now,
                        },{ where: {email: req.body.email} });
                        
                        console.log(req.body.email);
                        const email = req.body.email;
                        try {
                            await mailer.sendMail({
                                to: req.body.email,
                                from: 'tbgdmelo@gmail.com',
                                template: 'auth/esqueci_senha',
                                context: {token, email}
                            })
                        }catch(error){
                            console.log(error)
                            if(error)
                                return res.status(400).send({error: 'Cannot send forgot password email'})
                        }
                        
                        res.render("user/esqueci_senha",{
                            titulo: "Recuperação de senha",
                            modal: "ClickBotao()"
                        });
                    }
                    catch(error){
                        console.log('erro na atualizacao dos tokens');
                    }
                    console.log(token, now)
                }
                catch(error){
                    console.log("tive um erro de recup email");
                    console.log(error);
                }

                
            }
        }
        catch(errors){
            console.log(errors);
        }
    }
}

async function reset_senha(req, res){
    if(req.route.methods.get){
        res.render("user/reset_senha",{
            titulo: "Reset de senha",
            token: req.params.token
        })
    }
    else{
        const token= req.params.token;
        try{
            const user = await User.findOne({ where: {passwordResetToken: token} });
            try{
                await User.update({
                    senha: req.body.senha,
                },{ where: {passwordResetToken: token} });

                /*res.render("user/login",{
                    titulo: "LOGIN",
                    modal: "ClickBotao()"
                });*/
            }
            catch(error){
                if(error)
                console.log(error);
                return res.status(400).send({error: 'Cannot update new password'})
            }
        }
        catch(error){
            console.log(error)
            if(error)
                return res.status(400).send({error: 'Cannot send new password'})
        }
    }
}

function login(req, res){
    res.render("user/login");
}

module.exports = {cadastro, esqueciSenha, reset_senha, login};