
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("events").del()
    .then(function () {
      // Inserts seed entries
      return knex("events").insert([
		{
			id: "unique1event",
			title: "Website Re-Design Plan",
			startDate: new Date(2020, 4, 22, 9, 30),
			endDate: new Date(2020, 4, 22, 11, 30),
			allDay: false
		},
		{
			id: "unique2event",
			title: "Book flights to san fran for sales trip",
			startDate: new Date(2020, 4, 22, 12, 0),
			endDate: new Date(2020, 4, 22, 13, 0),
			allDay: true
		},
		{
			id: "unique3event",
			title: "Install new router in dev room",
			startDate: new Date(2020, 4, 22, 14, 30),
			endDate: new Date(2020, 4, 22, 15, 30),
			allDay: false
		}
      ]);
    });
}
