var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LoogerSchema = new Schema(
  {
    visitorip: { type: String, required: true },
    host: { type: String, required: true },
    url: { type: String, required: true },
    method: { type: String, required: true },
    status: { type: Number, required: true },
    referrer: { type: String },
    useragent: { type: String },
    durationInMilliseconds: { type: String }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updateAt"
    }
  }
);

module.exports = mongoose.model("Logger", LoogerSchema);
