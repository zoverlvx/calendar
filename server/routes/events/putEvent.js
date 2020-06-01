const Events = require("../../models")("events");

module.exports = function(req, res) {
		const id = Number(req.params.id);
		const changes = req.body.changes;

		Events.update(id, changes)
			.then(function(data) {
				res.status(200).json(data);
			})
			.catch(error => res.status(500).json({"message": "Not able to update."}));

}
