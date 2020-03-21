var webPush = require("web-push");
module.exports = {
  sendPushNotification(subscription, payload, keys) {
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
          subject: "https://iitsuraj.github.io",
          privateKey: keys.pushNotificationPrivateKey,
          publicKey: keys.pushNotificationPublicKey
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
            id: subscription._id,
            data: err
          });
        });
    });
  }
};
