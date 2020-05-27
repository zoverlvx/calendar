const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

module.exports = function(server) {
	server.use(cors());
	server.use(helmet());
	server.use(express.json());
	server.use(express.urlencoded({extended: false}));
}
