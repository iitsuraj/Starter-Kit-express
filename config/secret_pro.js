module.exports = {
  database: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
  secretKey: process.env.SECRET_KEY,
  pushNotificationPrivateKey: process.env.PUSH_NOTIFICATION_PRIVATE_KEY,
  pushNotificationPublicKey: process.env.PUSH_NOTIFICATION_PUBLIC_KEY
};
