var express = require("express");
var router = express.Router();
var q = require("q");
var Subscriber = require("../../models/push_subscriber");
var pusher = require("../../misc/pusher");

router.post("/push-notification-all", function(req, res) {
  var payload = {
    title: req.body.title,
    message: req.body.message,
    url: req.body.url,
    ttl: 3600,
    icon: req.body.icon,
    image: req.body.image,
    badge: req.body.badge,
    tag: req.body.tag
  };
  Subscriber.find({}, function(err, subscriptions) {
    if (err) {
      console.error(`Error occurred while getting subscriptions`);
      res.status(500).json({
        error: "Technical error occurred"
      });
    } else {
      let parallelSubscriptionCalls = subscriptions.map(function(subscription) {
        pusher.sendPushNotification(subscription, payload);
      });
      q.allSettled(parallelSubscriptionCalls).then(function(pushResults) {
        console.info(pushResults);
      });
      res.json({
        data: "Push triggered"
      });
    }
  });
});

module.exports = router;
