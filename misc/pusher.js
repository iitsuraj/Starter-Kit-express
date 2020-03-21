var webPush = require("web-push");
// const vapidKeys = webPush.generateVAPIDKeys();
// webPush.setVapidDetails(
//   "mailto:example@yourdomain.org",
//   vapidKeys.publicKey,
//   vapidKeys.privateKey
// );
module.exports = {
  sendPushNotification(subscription, payload) {
    return new Promise(function(resolve, reject) {
      var pushSubscription = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth
        }
      };
      var pushPayload = JSON.stringify(payload);
      var pushOptions = {
        vapidDetails: {
          subject: "http://localhost:3000",
          privateKey: "UG9tl4mE8d57PsaGk4bEKkUZU4Xp09m-H6rp1JZKCFI",
          publicKey:
            "BMiBp3lvCa9hJurodtvtZqavPnBMg1j33o4rxV_pm8J5c6NGVAVoLpHahJoqi88zyqmTZsGsZdqrqlPe8Enehog"
        },
        TTL: payload.ttl,
        headers: {}
      };
      webPush
        .sendNotification(pushSubscription, pushPayload, pushOptions)
        .then(function(value) {
          resolve({
            status: true,
            endpoint: subscription.endpoint,
            data: value
          });
        })
        .catch(function(err) {
          reject({
            status: false,
            endpoint: subscription.endpoint,
            data: err
          });
        });
    });
  }
};
