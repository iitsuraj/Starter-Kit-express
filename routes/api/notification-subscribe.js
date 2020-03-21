var express = require("express");
var router = express.Router();
var Subscription = require("../../models/push_subscriber");

router.post("/push-subscribe", function(req, res) {
  var subscriptionModel = req.body;
  new Subscription(subscriptionModel)
    .save()
    .then(
      res.json({
        data: "Subscription saved."
      })
    )
    .catch(err => {
      console.error(`Error occurred while saving subscription. Err: ${err}`);
      res.status(500).json({
        error: "Technical error occurred"
      });
    });
});

module.exports = router;
