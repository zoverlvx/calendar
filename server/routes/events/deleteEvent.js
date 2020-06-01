const Events = require("../../models")("events");

module.exports = function(req, res) {
		
		// convert id from params to type number
		const id = Number(req.params.id);
		// remove event from database by id number
		Events.remove(id)
			.then(function(isDeleted) { 
				// isDeleted is either 1 or 0
				if (isDeleted) {
					res.status(200).json({isDeleted});
				}
			})
			.catch(error => res.status(500).json(error));
}
