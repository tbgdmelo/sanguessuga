//controlador para as páginas sobre os centros...

function index(req,res){
    res.render("centros/index", {
        titulo: "Centros de doação",
    });
}

module.exports = {index};