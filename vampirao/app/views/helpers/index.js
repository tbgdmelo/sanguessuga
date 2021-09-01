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
    //console.log(errors.errors);
    if(typeof(errors)!== 'undefined'){
        errors.errors.forEach(error=>{
            if(error.path === campo){
                message=error.message;
            }
        });
    }
    return message;
}

module.exports = { toLower, toUpper, checked, printError};