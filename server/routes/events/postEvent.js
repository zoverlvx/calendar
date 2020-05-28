const Events = require("../../models")("events");

module.exports = async function(req, res) {
	const title = 
		typeof(req.body.title) === "string" && req.body.title.trim().length > 0
		? req.body.title.trim()
		: false;
	// Date.parse returns the milliseconds since Jan 1 1970
	// if the string is a correct date. Otherwise it returns NaN
	const startDate = Date.parse(req.body.startDate)
		? req.body.startDate
		: false;
	const endDate = Date.parse(req.body.endDate)
		? req.body.endDate
		: false;
	const allDay = typeof(req.body.allDay) === "boolean"
		? req.body.allDay
		: false;

	if (title && startDate && endDate) {
		const packet = {
			title,
			startDate,
			endDate,
			allDay,
		};
		console.log("packet submitted: ", packet);
		
		const value = await Events.add(packet);
		console.log("value in post endpoint: ", value);

			/*
			.then(newEvent => {
				console.log("success: ", newEvent)
				res.status(201).json(newEvent)
			})
			.catch(error => res.status(500).json(error));
			*/

	} else {
		res.status(500).json({"message": "Unable to add event."})
	}
}
