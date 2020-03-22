var accountSid = "AC719f03208c0453986dc0cb38c1f16d80";
var authToken = "1e73a977639ab3bec0a1c104cada6616";
var client = require("twilio")(accountSid, authToken);

module.exports = {
  sendSms(from, to, msg) {
    return new Promise(function(resolve, reject) {
      client.messages
        .create({ body: msg, from: from, to: to })
        .then(function(result) {
          resolve({ data: result });
        })
        .catch(function(err) {
          reject({ data: err });
        });
    });
  }
};
