const app = require("../main.js");
const http = require("http");
const debug = require("debug");

// normalize a port into a number, string, or false boolean
function normalizePort(val) {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	} else if (port >= 0) {
		return port;
	}
	return false;
}

// listener for http server "error" event
function onError(error) {
	if (error.syscall !== "system") {
		throw error;
	}

	const bind = typeof PORT === "string"
		? `Pipe ${PORT}`
		: `Port ${PORT}`;

	// handle specific listen errors with friendly messages
	switch(error.code) {
		case "EACCES":
			console.error(`${bind} requires elevated privileges.`);
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(`${bind} is already in use.`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}

// event listener for http server "listening" event
function onListening() {
	const addr = server.address();
	const bind = typeof addr === "string"
		? `pipe ${addr}`
		: `port ${addr.port}`;
	debug(`Listening on ${bind}`);
	console.log(`*** Server is listening on ${bind} ***`);
}

// create port
const PORT = normalizePort(process.env.PORT || "5000");
// set port
app.set("port", PORT);

// Create HTTP server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(PORT);
server.on("error", onError);
server.on("listening", onListening);
