const Events = require("../../models")("events");

module.exports = function(req, res) {
		const id = Number(req.params.id);
		Events.remove(id)
			.then(function(deletedId) { 
				
				if (typeof(deletedId) === "number") {
					console.log("here's the deleted id from db: ", deletedId)
					res.status(200).json({id: deletedId});
				}
			})
			.catch(error => res.status(500).json(error));

}
