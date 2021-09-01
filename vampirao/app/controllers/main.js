function index(req,res){
    res.render("main/index");
}

function sobre(req,res){
    res.render("main/sobre");
}

module.exports = {index,sobre};