const db = require("../data/dbConfig.js");

// table: string
module.exports = function (table) {
	
	// returns entire table contents
	function find () {
		return db(table); // object[]
	}

	// finds item by id
	// id: number
	function findById(id) {
		return db(table).where({id}).first(); // object
	}

	// adds item to database
	// item: object
	async function add(item) {
		await db(table).insert(item, "id");
		return await db(table).select("*").where("id", item.id);
	}

	// finds all instances of item by property of item
	// property: object
	function findAllBy(property) {
		return db(table).where(property);
	}

	return {
		find,
		findById,
		add,
		findAllBy
	};
}
