function toLower(str){
    return str.toLowerCase();
}

function toUpper(str){
    return str.toUpperCase();
}

function checked(atual, value){
    if(atual==value){
        return "checked";
    }
    else{
        return "";
    }
}

function printError(errors, campo){
    let message;
    if(typeof(errors)!== 'undefined'){
        if(typeof(errors.original)!=='undefined'){
            if(errors.original.parameters[7] !== 'Invalid date'){
                errors.errors.forEach(error=>{
                    if(error.path === campo){
                        message=error.message;
                    }
                });
            }
        }
        else{
            errors.errors.forEach(error=>{
                if(error.path === campo){
                    message=error.message;
                }
            });
        }
    }
    return message;
}

function printErrorNascimento(errors){
    let message;
    if(typeof errors !== "undefined" && typeof(errors.original)!=='undefined' && errors.original.parameters[7] === 'Invalid date'){
        message = "Insira sua data de nascimento";
    }
    return message;
}

function printErrorEmail(errors, campo){
    let message;    
    if(typeof errors !== "undefined" && typeof(errors.original)!=='undefined' && errors.original.parameters[7] !== 'Invalid date'){
        errors.errors.forEach(error=>{
            var path = error.path;
            var pathreplace = "."
            var path = path.substring(path.indexOf(pathreplace)+pathreplace.length);
            if(path === campo){
                message = "Opa! Este e-mail é inválido ou já está em uso.";
            }
        });
    }
    return message;
}

function printErrorCPF(errors, campo){
    let message;
    if(typeof(errors)!== 'undefined'){
        if(typeof(errors.original)!=='undefined'){
            if(errors.original.parameters[7] !== 'Invalid date'){
                errors.errors.forEach(error=>{
                    if(error.path === campo){
                        message=error.message;
                    }
                });
            }
            else{
                console.log('terceiro CPF')
            }
        }
        else{
            errors.errors.forEach(error=>{
                if(error.path === campo){
                    message=error.message;
                }
            });
        }
    }
    if(typeof(errors)!== 'undefined'){
        if(typeof(errors.original)!=='undefined'){
            if(errors.original.sqlMessage.indexOf("Users.cpf")!=-1){
                message = "O CPF é inválido ou já existe um cadastro."
            }
        }
    }

    return message;
}


function printErrorEsqueciSenha(errorMsg){
    let message = errorMsg;    
    return message;
}

function printErrorSangue(errorMsg){
    let message = errorMsg;    
    return message;
}

function verificaLogin(user){
    // console.log(user)
    if(typeof(user)==='undefined'){
        return true;
    }
    else{
        return false;
    }
}

function getNomeSangue(id_sangue, nomesSangues){
    let nome;
    nomesSangues.forEach(sangue=>{
        if(sangue.id === id_sangue){
            nome=sangue.tipo;
        }
    });
    if(nome){
        return nome;
    }
    else{
        return "Tipo não encontrado";
    }
}

function nivelSangue(nivel){
    if(nivel==='Crítico'){
        return "width: 10%;"
    }
    else if(nivel==='Alerta'){
        return "width: 25%;"
    }
    else if(nivel==='Normal'){
        return "width: 75%;"
    }
    else if(nivel==='Ótimo'){
        return "width: 100%;"
    }
    else{
        return "width: 0%;"
    }
}

  

module.exports = { toLower, toUpper, checked, printError, printErrorEmail, printErrorCPF, 
    printErrorNascimento, printErrorEsqueciSenha, printErrorSangue, verificaLogin, getNomeSangue,nivelSangue};