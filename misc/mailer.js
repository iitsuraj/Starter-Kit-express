var nodemailer = require("nodemailer");
var config = require("../config/mail");
var smtpTransport = require("nodemailer-smtp-transport");
var transport = nodemailer.createTransport(
  smtpTransport({
    host: "",
    port: 2525,
    // secure: true, // true for 465, false for other ports
    // service: config.service,
    auth: {
      user: "", //config.mailUserName,
      pass: "" //config.mailPassword,
    },
    tls: {
      rejectUnauthorized: false
    }
  })
);
module.exports = {
  sendEmail(from, to, bcc, replyTo, subject, html, attachments) {
    return new Promise(function(resolve, reject) {
      transport.sendMail(
        { from, subject, to, bcc, replyTo, html, attachments },
        function(err, info) {
          if (err) reject(err);
          resolve(info);
        }
      );
    });
  }
};
