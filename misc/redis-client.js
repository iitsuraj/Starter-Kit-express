const redis = require("redis");
const client = redis.createClient({
  port: 6379, // replace with your port
  host: "120.0.0.1", // replace with your hostanme or IP address
  password: "your password"
});
module.exports = client;
