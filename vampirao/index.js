const sass = require("node-sass-middleware");
const handlebars = require("express-handlebars");
const express = require("express");
const router = require("./routes");
const app = express();

app.engine("handlebars", handlebars({
    helpers: require(`${__dirname}/app/views/helpers`),
}));

app.set("view engine", "handlebars");
app.set("views", `${__dirname}/app/views`);

app.use(sass({
    src:`${__dirname}/public/scss`,
    dest:`${__dirname}/public/css`,
    outputStyle: 'compressed',
    prefix: '/css'
}));

app.use("/css", express.static(`${__dirname}/public/css`));
app.use("/img", express.static(`${__dirname}/public/img`));
app.use("/webfonts", express.static(`${__dirname}/node_modules/@fortawesome/fontawesome-free/webfonts`));

app.use("/js", [
    express.static(__dirname+'/node_modules/jquery/dist/'),
    express.static(__dirname+'/node_modules/popper.js/dist/umd'),
    express.static(__dirname+'/node_modules/bootstrap/dist/js'),
    express.static(__dirname+'/public/js'),
]);

app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(3000, function(){
    console.log("express iniciado na porta 3000");
})

