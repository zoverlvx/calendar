const router = require("express").Router();
const getEvents = require("./getEvents.js");
const postEvent = require("./postEvent.js");
const deleteEvent = require("./deleteEvent.js");
const putEvent = require("./putEvent.js");

router.get("/", getEvents);
router.post("/", postEvent);
router.delete("/:id", deleteEvent);
router.put("/:id", putEvent);

module.exports = router;
