const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const whitelist = ["localhost:3000"];

module.exports = function(server) {
	server.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Headers", 
			"Origin, X-Requested-With, Content-Type, Accept"
		);
		next();
	});
	/*
	server.use(cors({
		origin: function(origin, cb) {
			// allow requests with no origin.
			if (!origin) return cb(null, true);
			// if it's not on the whitelist, reject it.
			if (whitelist.indexOf(origin) === -1) {
				const message = "The CORS policy for this origin doesn't" 
					+ " allow access from this particular origin";
				return cb(new Error(message), false);
			}
			return cb(null, true);
		}
	}));
	*/
	server.use(helmet());
	server.use(express.json());
	server.use(express.urlencoded({extended: false}));
}
