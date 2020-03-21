var express = require("express");
var router = express.Router();
var q = require("q");
var fs = require("fs");
var Subscriber = require("../../models/push_subscriber");
var User = require("../../models/user");
var pusher = require("../../misc/pusher");
var keys = require("../../config/secret");
var mailer = require("../../misc/mailer");
router.post("/push-notification-all", function(req, res) {
  var payload = {
    title: req.body.title,
    message: req.body.message,
    url: req.body.url,
    ttl: 1000,
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
        pusher.sendPushNotification(subscription, payload, keys).catch(err => {
          Subscriber.findByIdAndDelete({ _id: err.id }).exec();
        });
      });
      q.allSettled(parallelSubscriptionCalls)
        .then(function(pushResults) {
          // console.info(pushResults);
        })
        .catch(function(err) {
          console.log(err);
        });
      res.json({
        data: "Push triggered"
      });
    }
  });
});

var readHTMLFile = function(path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function(err, html) {
    if (err) {
      throw err;
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

router.post("/email-notification-all", function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      console.error(`Error occurred while getting subscriptions`);
      res.status(500).json({
        error: "Technical error occurred"
      });
    } else {
      let parallelSubscriptionCalls = users.map(function(user) {
        readHTMLFile(req.body.html, function(err, html) {
          mailer
            .sendEmail(req.body.from, user.email, req.body.subject, html)
            .catch(err => console.log(err));
        });
      });
      q.allSettled(parallelSubscriptionCalls)
        .then(function(pushResults) {
          console.info(pushResults);
        })
        .catch(function(err) {
          console.log(err);
        });
      res.json({
        data: "Email triggered"
      });
    }
  });
});

module.exports = router;
