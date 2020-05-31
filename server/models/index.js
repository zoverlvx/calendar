const db = require("../data/dbConfig.js");

// table: string
module.exports = function (table) {
	
	// returns entire table contents
	function find () {
		return db(table); // object[]
	}

	// finds item by id
	// id: number
	async function findById(id) {
		return await db(table).where({id}).first(); // object
	}

	// adds item to database
	// item: object
	async function add(item) {
		const [id] = await db(table).insert(item);
		const value = await findById(id);
		return value; // object with the newly created item with id (number)
	}

	function remove(id) {
		return db(table).where({id}).del();
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
		findAllBy,
		remove
	};
}
