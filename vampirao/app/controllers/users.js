//controlador para todas as páginas referentes ao usuario


const models = require("../models/index"); //import de todos os models
const Sangue = models.Sangue; //utilizando apenas o model de sangue para exibir nos radios button

const User = models.User;

const crypto = require('crypto');

const mailer = require("../modules/mailer");

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
            res.render("main/index", {
                titulo: "Home Page",
                modal: "ClickBotao()"
            });
        }
        catch (error) {
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

async function esqueciSenha(req, res) {
    if (req.route.methods.get) {
        res.render("user/esqueci_senha", {
            titulo: "Recuperação de senha",
        })
    }
    else {
        try {
            const user = await User.findOne({ where: { email: req.body.email } });
            //console.log('veio user');
            //console.log(user);
            if (user === null) {
                res.render("user/esqueci_senha", {
                    titulo: "Recuperação de senha",
                    errorMsg: "Não há nenhum cadastro para este e-mail!"
                })
            }
            else {
                //prosseguir com os passos para enviar o link

                try {

                    const token = crypto.randomBytes(20).toString("hex");

                    const now = new Date();
                    now.setHours(now.getHours() + 1);

                    await User.findOne({ where: { email: req.body.email } });

                    try {
                        await User.update({
                            passwordResetToken: token,
                            passwordResetExpires: now,
                        }, { where: { email: req.body.email } });

                        const user = await User.findOne({ where: { email: req.body.email } });
                        //console.log(req.body.email);
                        const email = req.body.email;
                        const nome = user.nome;
                        const sobrenome = user.sobrenome;

                        try {
                            await mailer.sendMail({
                                to: req.body.email,
                                from: 'sng.resetpass@gmail.com',
                                template: 'auth/esqueci_senha',
                                context: { token, email, nome, sobrenome },
                                subject: 'Link para reset de senha'
                            })
                        } catch (error) {
                            console.log(error)
                            if (error)
                                return res.status(400).send({ error: 'Cannot send forgot password email' })
                        }

                        res.render("user/esqueci_senha", {
                            titulo: "Recuperação de senha",
                            modal: "ClickBotao()"
                        });
                    }
                    catch (error) {
                        console.log('erro na atualizacao dos tokens');
                    }
                    console.log(token, now)
                }
                catch (error) {
                    console.log("tive um erro de recup email");
                    console.log(error);
                }


            }
        }
        catch (errors) {
            console.log(errors);
        }
    }
}

async function reset_senha(req, res) {
    if (req.route.methods.get) {
        const token = req.params.token;
        try {
            const user = await User.findOne({ where: { passwordResetToken: token } });
            const now = new Date();
            if (now > new Date(user.passwordResetExpires)) {
                res.redirect("../tokenexpired");
            }
        }
        catch (error) {
            if (error)
                console.log(error);
            return res.status(400).send({ error: 'User undefined' })
        }

        res.render("user/reset_senha", {
            titulo: "Reset de senha",
            token: req.params.token
        })
    }
    else {
        const token = req.params.token;
        try {
            const user = await User.findOne({ where: { passwordResetToken: token } });
            try {
                await User.update({
                    senha: req.body.senha,
                }, { where: { passwordResetToken: token } });

                res.render("user/login", {
                    titulo: "Login",
                    modal: "ClickBotao()"
                });
            }
            catch (error) {
                return res.status(400).send({ error: 'Cannot update new password' })
            }
        }
        catch (error) {
            console.log(error)
            if (error)
                return res.status(400).send({ error: 'Cannot send new password' })
        }
    }
}

function tokenexpired(req, res) {
    res.render("user/tokenexpired");
}

async function perfil(req, res) {
    try {
        if (req.route.methods.get && req.session.user !== 'undefined') {
            const id = req.params.id;
            const user = await User.findOne({ where: { id: id } });
            const sanguineo = await Sangue.findOne({ where: { id: user.id_sangue } });
            if (req.session.user.id == id) {
                res.render("user/perfil", {
                    titulo: "Meu Perfil",
                    id: user.id,
                    nome: user.nome,
                    sobrenome: user.sobrenome,
                    tipoSanguineo: sanguineo.tipo,
                    pontuacao: user.pontuacao
                });
            }
            else {
                res.redirect("/notfound");
            }
        }
    }
    catch (error) {
        res.redirect("/notfound");
    }
}

async function login(req, res) {
    if (req.route.methods.get) {
        if (!req.session.user) { //nao há um user logado
            res.render("user/login", {
                titulo: "Login",
            });
        }
    }
    else {
        try {
            const user = await User.findOne({ where: { email: req.body.email, senha: req.body.senha } });

            if (!user) {
                return res.render("user/login", {
                    message: "Sua conta ou senha está incorreta.",
                });
            }
            req.session.user = user;
            res.redirect("perfil/" + user.id);
        }
        catch (error) {
            console.log(error);
        }
    }
}

async function deslogar(req, res) {
    console.log(req.session.user);
    req.session.user = undefined;
    res.redirect("/")
}

async function atualizar(req, res) {
    const sangues = await Sangue.findAll(); //r
    if (req.route.methods.get && req.session.user !== 'undefined' && !req.session.user.isAdmin && req.session.user.id == req.params.id) {
        const id = req.params.id;
        const user = await User.findOne({ where: { id: id } });
        let nascimento = user.nascimento.split('-').reverse().join('/');

        res.render("user/alteracaoUsuario", {
            titulo: "Atualização de cadastro",
            id,
            nome: user.nome,
            sobrenome: user.sobrenome,
            pontuacao: user.pontuacao,
            cpf: user.cpf,
            nascimento: user.nascimento,
            email: user.email,
            telefone: user.telefone,
            id_sangue: user.id_sangue,
            senha: user.senha,
            sangues: sangues.map(sangue => sangue.toJSON()),
        });
    }
    else if(req.route.methods.post && req.session.user !== 'undefined' && !req.session.user.isAdmin && req.session.user.id == req.params.id) {
        try {
            const user = await User.findOne({ where: { id: req.params.id } });
            await User.update(
                {
                    id: req.body.id,
                    nome: req.body.nome,
                    sobrenome: req.body.sobrenome,
                    cpf: req.body.cpf,
                    nascimento: req.body.nascimento,
                    email: req.body.email,
                    senha: req.body.senha,
                    pontuacao: req.body.pontuacao,
                    telefone: req.body.telefone,
                    id_sangue: req.body.id_sangue,
                    isAdmin: 0
                },
                { where: { id: req.params.id } }
            )

            const sanguineo = await Sangue.findOne({ where: { id: req.body.id_sangue } });
            res.render("user/perfil", {
                titulo: "Perfil",
                id: req.params.id,
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                tipoSanguineo: sanguineo.tipo,
                pontuacao: user.pontuacao,
                modal: "ClickBotao2()"
            })

        }
        catch (error) {
            console.log(error);
        }
    }
    else{
        res.redirect("/notfound");
    }
}

module.exports = { cadastro, esqueciSenha, reset_senha, tokenexpired, perfil, login, deslogar, atualizar };