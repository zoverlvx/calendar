const router = require("express").Router();
const getEvents = require("./getEvents.js");
const postEvent = require("./postEvent.js");

router.get("/", getEvents);
router.post("/", postEvent);

module.exports = router;
