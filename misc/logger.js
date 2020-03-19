var Looger = require("../models/logger");
const getActualRequestDurationInMilliseconds = start => {
  const NS_PER_SEC = 1e9; //  convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const demoLogger = (req, res, next) => {
  const start = process.hrtime();
  const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
  var LoogerFields = {};
  LoogerFields.visitorip = req.ip;
  LoogerFields.host = req.hostname;
  LoogerFields.url = req.url;
  LoogerFields.method = req.method;
  LoogerFields.status = res.statusCode;
  LoogerFields.referrer = req.header("Referer");
  LoogerFields.useragent = req.get("user-agent");
  LoogerFields.durationInMilliseconds = durationInMilliseconds.toLocaleString();
  new Looger(LoogerFields).save().then(next());
};

module.exports = demoLogger;
