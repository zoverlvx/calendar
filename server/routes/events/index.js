const router = require("express").Router();
const getEvents = require("./getEvents.js");

router.get("/", getEvents);

module.exports = router;
