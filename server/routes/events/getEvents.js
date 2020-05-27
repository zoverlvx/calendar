const Events = require("../../models")("events");

module.exports = async function(req, res) {
	const data = await Events.find();
	res.status(200).json(data);
}
