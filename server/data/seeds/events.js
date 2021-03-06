
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("events").del()
    .then(function () {
      // Inserts seed entries
      return knex("events").insert([
		{
			id: 0,
			title: "Website Re-Design Plan",
			startDate: new Date("2020-5-22-9:30"),
			endDate: new Date("2020-5-22-11:30"),
			allDay: false
		},
		{
			id: 1,
			title: "Book flights to san fran for sales trip",
			startDate: new Date("2020-5-22-12:00"),
			endDate: new Date("2020-5-22-13:00"),
			allDay: true
		},
		{
			id: 2,
			title: "Install new router in dev room",
			startDate: new Date("2020-5-22-14:30"),
			endDate: new Date("2020-5-22-15:30"),
			allDay: false
		}
      ]);
    });
}
