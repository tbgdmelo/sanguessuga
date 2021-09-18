const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const {host, port, user, pass} = require("../../config/mail.json");
const path = require("path");

const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user,
      pass
    }
  });


transport.use('compile',hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./app/resources/mail/'),
    extName: '.html'
}))


module.exports = transport;

