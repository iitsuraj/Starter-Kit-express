exports.isAdmin = function(req, res, next) {
  if (req.user.role === "admin") {
    return next();
  }
  res.json({ message: "unauthorized for this operation" });
};

exports.isServiceProvider = function(req, res, next) {
  if (req.user.role === "serviceprovider") {
    return next();
  }
  res.json({ message: "unauthorized for this operation" });
};
