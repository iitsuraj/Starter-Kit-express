var app = require("./app");

var server = require("http").createServer(app);

var port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(port);
});
