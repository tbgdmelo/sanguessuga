//controlador para todas as páginas referentes ao usuario


const models = require("../models/index"); //import de todos os models
const Sangue = models.Sangue; //utilizando apenas o model de sangue para exibir nos radios button

const User = models.User;
const Doacao = models.Doacao;
const Centro = models.Centro;
const Declaracao = models.declaracao;
const Recompensa = models.Recompensa;

const crypto = require('crypto');

const bcrypt = require('bcryptjs');

const mailer = require("../modules/mailer");
const doacao = require("../models/doacao");

async function cadastro(req, res) {
    const sangues = await Sangue.findAll(); //recupera todos os registros da tabela sangues
    //verifica se foi uma requisição get, entao apenas exibe o formulário
    if (req.route.methods.get) {
        res.render("user/cadastro", {
            sangues: sangues.map(sangue => sangue.toJSON()), //envia para a view um json com oq foi encontrado no bd
            titulo: "Cadastro de usuário",
            cadastro: "active"
        });
    }
    else {
        try {
            const senha = await bcrypt.hash(req.body.senha, 10);
            await User.create({
                cpf: req.body.cpf,
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                nascimento: req.body.nascimento,
                email: req.body.email,
                senha: senha,
                pontuacao: 0,
                telefone: req.body.telefone,
                id_sangue: req.body.id_sangue,
                isAdmin: false
            })
            res.render("main/index", {
                titulo: "Home Page",
                modal: "ClickBotao()",
                inicio: "active"
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
                cadastro: "active"
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

                        const email = req.body.email;
                        const nome = user.nome;
                        const sobrenome = user.sobrenome;

                        try {
                            await mailer.sendMail({
                                to: req.body.email,
                                from: 'sng.resetpass@gmail.com',
                                template: 'auth/esqueci_senha',
                                context: { token, email, nome, sobrenome, recuperacao:true },
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
            const senha = await bcrypt.hash(req.body.senha, 10);
            try {
                await User.update({
                    senha: senha,
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
        if (req.route.methods.get && req.session.user !== 'undefined' && !req.session.user.isAdmin) {
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
                    pontuacao: user.pontuacao,
                    meuperfil: "active"
                });
            }
            else {
                res.redirect("/notfound");
            }
        }
        else {
            res.redirect("/notfound");
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
            const user = await User.findOne({ where: { email: req.body.email } });

            if (!await bcrypt.compare(req.body.senha, user.senha)) {
                return res.render("user/login", {
                    message: "Sua conta ou senha está incorreta.",
                    titulo: "Login"
                });
            }
            if (!user) {
                return res.render("user/login", {
                    message: "Sua conta ou senha está incorreta.",
                    titulo: "Login"
                });
            }
            req.session.user = user;
            if (!user.isAdmin) {
                res.redirect("perfil/" + user.id);
            }
            else {
                res.redirect("admin/index");
            }
        }
        catch (error) {
            console.log(error);
            return res.render("user/login", {
                message: "Sua conta ou senha está incorreta.",
                titulo: "Login"
            });
        }
    }
}

async function deslogar(req, res) {
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
            senha: "",
            sangues: sangues.map(sangue => sangue.toJSON()),
            editarperfil: "active"
        });
    }
    else if (req.route.methods.post && req.session.user !== 'undefined' && !req.session.user.isAdmin && req.session.user.id == req.params.id) {
        try {
            const user = await User.findOne({ where: { id: req.params.id } });
            const senha = await bcrypt.hash(req.body.senha, 10);
            await User.update(
                {
                    id: req.body.id,
                    nome: req.body.nome,
                    sobrenome: req.body.sobrenome,
                    cpf: req.body.cpf,
                    nascimento: req.body.nascimento,
                    email: req.body.email,
                    senha: senha,
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
                modal: "ClickBotao2()",
                meuperfil: "active"
            })

        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        res.redirect("/notfound");
    }
}

async function doacoes(req, res) {
    try {
        if (req.route.methods.get && req.session.user !== 'undefined' && !req.session.user.isAdmin) {
            const id = req.params.id;
            if (req.session.user.id == id) {
                const cpf_user = req.session.user.cpf;
                const doacoes = await Doacao.findAll({ where: { cpf_user: cpf_user } });
                const centros = await Centro.findAll();

                const dc = doacoes.map(doacao => doacao.toJSON());

                for (var i = 0; i < dc.length; i++) {
                    if (!dc[i].agendado) {
                        const declaracao = await Declaracao.findOne({
                            where: {
                                cpf_user: cpf_user,
                                id: dc[i].id_declaracao
                            }
                        });
                        const buffer = new Buffer.from(declaracao.file);
                        const url = 'data:application/pdf' + ';' + 'base64' + ',' + buffer.toString('base64');
                        dc[i].link = url;
                    }
                }

                res.render("user/doacoes", {
                    doacoes: dc,
                    centros: centros.map(centro => centro.toJSON()),
                });
            }
            else {
                res.redirect("/notfound");
            }
        }
        else {
            res.redirect("/notfound");
        }
    }
    catch (error) {
        res.redirect("/notfound");
    }
}

async function resgatar(req, res) {
    if (req.route.methods.post && req.session.user !== 'undefined' && !req.session.user.isAdmin) {
        const recompensa = await Recompensa.findOne({ where: { id: req.params.id } });
        const usuario = await User.findOne({ where: { cpf: req.session.user.cpf } });

        if (usuario.pontuacao >= recompensa.valor) {
            //faz o resgate se tiver pontos suficientes
            try {
                //atualiza a pontuacao
                await User.update({
                    pontuacao: usuario.pontuacao - recompensa.valor
                }, { where: { cpf: req.session.user.cpf } });
                try {
                    //deleta a recompensa resgatada
                    let rec_nome = recompensa.nome;
                    let rec_codigo = recompensa.codigo;
                    if (recompensa) {
                        await recompensa.destroy();
                    }
                    const recompensas = await Recompensa.findAll();
                    res.render("recompensas/listar", {
                        recompensas: recompensas.map(recompensa => recompensa.toJSON()),
                        modal: "ClickBotao()",
                        msg: "Recompensa resgatada com sucesso. Seu código de resgate é: "+recompensa.codigo+ ". Salve este código e acesse a plataforma correspondente para resgatar.",
                    });
                    try {
                            await mailer.sendMail({
                                to: req.session.user.email,
                                from: 'sng.resetpass@gmail.com',
                                template: 'auth/esqueci_senha',
                                context: {
                                    nome: req.session.user.nome, 
                                    sobrenome:req.session.user.sobrenome,
                                    recuperacao:false,
                                    codigo: rec_codigo,
                                    nome_recomp: rec_nome
                                },
                                subject: 'Código de recompensa',
                                
                            })
                        } catch (error) {
                            console.log(error)
                            if (error)
                                return res.status(400).send({ error: 'Cannot send forgot password email' })
                        }
                }
                catch (e) {
                    console.log("Falha na destruicao do objeto");
                    console.log(e);
                    res.redirect("/notfound");
                }
            }
            catch (e) {
                console.log("Falha na atualizqação dos pontos");
                console.log(e);
                res.redirect("/notfound");
            }
        }
        else {
            const recompensas = await Recompensa.findAll();
            res.render("recompensas/listar", {
                recompensas: recompensas.map(recompensa => recompensa.toJSON()),
                modal: "ClickBotao()",
                msg: "Você não possui pontos suficientes para resgatar esta recompensa."
            });
        }
    }
}

module.exports = {
    cadastro, esqueciSenha, reset_senha, tokenexpired, perfil, login,
    deslogar, atualizar, doacoes, resgatar
};