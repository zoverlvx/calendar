const router = require("express").Router();
const getEvents = require("./getEvents.js");
const postEvent = require("./postEvent.js");
const deleteEvent = require("./deleteEvent.js");

router.get("/", getEvents);
router.post("/", postEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
