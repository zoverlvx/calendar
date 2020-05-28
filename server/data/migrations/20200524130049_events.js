
exports.up = function(knex) {
	return knex.schema
		.createTable("events", function(event) {
			event.increments("id")
				.notNullable()
				.primary();
			event.string("title")
				.notNullable();
			event.float("startDate")
				.notNullable();
			event.float("endDate")
				.notNullable();
			event.boolean("allDay")
				.notNullable()
				.defaultTo(false);
		});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("events");
};
