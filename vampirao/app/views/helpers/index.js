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
    //console.log(Object.values(errors))
    if(typeof(errors)!== 'undefined'){
        errors.errors.forEach(error=>{
            if(error.path === campo){
                message=error.message;
            }
        });
    }
    return message;
}

function printErrorEmail(errors, campo){
    let message;    
    if(typeof errors !== "undefined"){
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
    if(typeof errors !== "undefined"){
        errors.errors.forEach(error=>{
            var path = error.path;
            var pathreplace = "."
            var path = path.substring(path.indexOf(pathreplace)+pathreplace.length);
            if(path === campo){
                message = "Este CPF é inválido ou já está em uso.";
            }
        });
    }
    return message;
}

module.exports = { toLower, toUpper, checked, printError, printErrorEmail, printErrorCPF};