function toLower(str) {
    return str.toLowerCase();
}

function toUpper(str) {
    return str.toUpperCase();
}

function checked(atual, value) {
    if (atual == value) {
        return "checked";
    }
    else {
        return "";
    }
}

function printError(errors, campo) {
    let message;
    if (typeof (errors) !== 'undefined') {
        if (typeof (errors.original) !== 'undefined') {
            if (errors.original.parameters[7] !== 'Invalid date') {
                errors.errors.forEach(error => {
                    if (error.path === campo) {
                        message = error.message;
                    }
                });
            }
        }
        else {
            errors.errors.forEach(error => {
                if (error.path === campo) {
                    message = error.message;
                }
            });
        }
    }
    return message;
}

function printErrorNascimento(errors) {
    let message;
    if (typeof errors !== "undefined" && typeof (errors.original) !== 'undefined' && errors.original.parameters[7] === 'Invalid date') {
        message = "Insira sua data de nascimento";
    }
    return message;
}

function printErrorEmail(errors, campo) {
    let message;
    if (typeof errors !== "undefined" && typeof (errors.original) !== 'undefined' && errors.original.parameters[7] !== 'Invalid date') {
        errors.errors.forEach(error => {
            var path = error.path;
            var pathreplace = "."
            var path = path.substring(path.indexOf(pathreplace) + pathreplace.length);
            if (path === campo) {
                message = "Opa! Este e-mail é inválido ou já está em uso.";
            }
        });
    }
    return message;
}

function printErrorCPF(errors, campo) {
    let message;
    if (typeof errors !== "undefined" && typeof (errors.original) !== 'undefined' && errors.original.parameters[7] !== 'Invalid date') {
        errors.errors.forEach(error => {
            var path = error.path;
            var pathreplace = "."
            var path = path.substring(path.indexOf(pathreplace) + pathreplace.length);
            
            if (path === campo) {
                
                message = "CPF já está em uso.";
            }
        });
    }
    
    return message;
}


function printErrorEsqueciSenha(errorMsg) {
    let message = errorMsg;
    return message;
}

function printErrorSangue(errorMsg) {
    let message = errorMsg;
    return message;
}

function verificaLogin(user) {
    // console.log(user)
    if (typeof (user) === 'undefined') {
        return true;
    }
    else {
        return false;
    }
}

function getNomeSangue(id_sangue, nomesSangues) {
    let nome;
    nomesSangues.forEach(sangue => {
        if (sangue.id === id_sangue) {
            nome = sangue.tipo;
        }
    });
    if (nome) {
        return nome;
    }
    else {
        return "Tipo não encontrado";
    }
}

function nivelSangue(nivel) {
    if (nivel === 'Crítico') {
        return "width: 10%;"
    }
    else if (nivel === 'Alerta') {
        return "width: 25%;"
    }
    else if (nivel === 'Normal') {
        return "width: 75%;"
    }
    else if (nivel === 'Ótimo') {
        return "width: 100%;"
    }
    else {
        return "width: 0%;"
    }
}

function nomeRecomp(nome) {
    if (nome === "Desconto 10") {
        return "Desconto de R$ 10,00 na loja X"
    }
    else if (nome === "Vale-Compras 50") {
        return "Vale-Compras de R$ 50,00 na loja X"
    }
    else if (nome === "Gift Card Google 15") {
        return "Gift Card GooglePlay de R$ 15,00"
    }
    else if (nome === "Gift Card Google 50") {
        return "Gift Card GooglePlay de R$ 50,00"
    }
    else if (nome === "Gift Card Spotify 17") {
        return "Gift Card Spotify de R$ 18,00"
    }
    else if (nome === "Gift Card NETFLIX 50") {
        return "Gift Card NETFLIX de R$ 50,00"
    }
    else if (nome === "Gift Card iFood 50") {
        return "Gift Card iFood de R$ 50,00"
    }
}

function nomeCentro(id, centros) {
    let nome = "";
    centros.forEach(element => {
        if (element.id === id) {
            nome = element.nome;
        }
    });
    return nome;
}

function formatarData(data) {
    console.log(data)
    return data.slice(-2) + "/" + data.slice(5, 7) + "/" + data.slice(0, 4);
}

function colorMedal(nivel){
    if(nivel=="Bronze"){
        return "goldenrod";
    }
    else if(nivel=="Prata"){
        return "silver";
    }
    else if(nivel=="Ouro"){
        return "gold"
    }
    else if(nivel=="Diamante"){
        return "slateblue"
    }
}

function verificaAdmin(user){
    if(user.centro=="Administrador"){
        return true;
    }
    else{
        return false;
    }
}

module.exports = {
    toLower, toUpper, checked, printError, printErrorEmail, printErrorCPF,
    printErrorNascimento, printErrorEsqueciSenha, printErrorSangue, verificaLogin, getNomeSangue,
    nivelSangue, nomeRecomp, nomeCentro, formatarData, colorMedal, verificaAdmin
};