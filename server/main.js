const server = require("express")();
const configureServer = require("./config/configureServer.js");

// configures middlewares for server
configureServer(server);

// routes
// const instructors = require("./routes/instructors");
const events = require("./routes/events");

// server.use("/api/instructors", instructors);
server.use("/api/events", events);

server.get("/", function (req, res) {
	res.status(200).json({
		message: "Server is running."
	});
});

module.exports = server;
