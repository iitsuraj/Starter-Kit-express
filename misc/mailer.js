var nodemailer = require("nodemailer");
var config = require("../config/mail");
var smtpTransport = require("nodemailer-smtp-transport");
var transport = nodemailer.createTransport(
  smtpTransport({
    host: "mail.smtp2go.com", //in-v3.mailjet.com
    port: 2525, //587
    // secure: true, // true for 465, false for other ports
    // service: config.service,
    auth: {
      user: "suraj.saini.phe17@iitbhu.ac.in", //config.mailUserName,fa82115ba34174496af2a2f2921176bb
      pass: "Ss@9928466181" //config.mailPassword,852acaf637f69e5d9e487578e5846db7
    },
    tls: {
      rejectUnauthorized: false
    }
  })
);
module.exports = {
  sendEmail(from, to, subject, html) {
    return new Promise(function(resolve, reject) {
      transport.sendMail({ from, subject, to, html }, function(err, info) {
        if (err) reject(err);
        resolve(info);
      });
    });
  }
};
