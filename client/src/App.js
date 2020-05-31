import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { 
	ViewState,
	EditingState,
	IntegratedEditing
} from "@devexpress/dx-react-scheduler";
import {
	Scheduler,
	DayView,
	WeekView,
	MonthView,
	Appointments,
	Toolbar,
	DateNavigator,
	TodayButton,
	ViewSwitcher,
	AppointmentTooltip,
	AppointmentForm,
	ConfirmationDialog
} from "@devexpress/dx-react-scheduler-material-ui";

export default function(props) {
	const [events, setEvents] = useState([]);
	
	// sets default view to work week
	const [viewName, setViewName] = useState("work-week");

	useEffect(function() {
		// gets appointments from database
		async function fetchData() {
			const results = await axios.get("/api/events");
			setEvents(results.data);
		}

		fetchData();
	}, []);

	// changes view of calendar
	function currentViewNameChange(currentViewName) {
		setViewName(currentViewName);
	}

	function commitChanges({ 
		added, 
		changed, 
		deleted 
	}) {
		if (added) {
			axios.post("/api/events", added)
				.then(response => setEvents([...events, response.data]))
				.catch(error => console.log(error));

		} else if (changed) {
			console.log("changed");
		} else if (deleted) {
			const deletedId = deleted;
			axios.delete(`/api/events/${deletedId}`)
				.then(function(response) {
					if(response.data.id) {
						setEvents(function(state) {
							return state.filter(function(appointment) {
								return appointment.id !== deletedId
							})
						})
					}
				})
				.catch(error => console.log(error));
		}
		/*setEvents(async function(state) {
			if (added) {
				const response = await axios.post("/api/events", added);
				return [...state, response.data];
			} else if (changed) {
				return state.map(function(appointment) {
					return changed[appointment.id] 
						? {...appointment, ...changed[appointment.id]}
						: appointment;
				});

			} else if (deleted !== undefined) {
				axios.delete(`/api/events/${deleted}`)
					.then(function(res) {
						console.log("res.data.id: ", res.data.id);
						return state.filter(function(appointment) {
							return appointment.id !== res.data.id
						})
					}).catch(error => console.log(error))

			}
			return state;
		});*/
	}
	
	const today = new Date();

	if (events.length === 0) return <div>Loading...</div>;

	return (
		<Paper>
			<Scheduler
				data={events}
				height={660}
			>
				<ViewState 
					defaultCurrentDate={today}
					currentViewName={viewName}
					onCurrentViewNameChange={
						currentViewNameChange
					}
				/>
				<EditingState 
					onCommitChanges={commitChanges}
				/>
				<IntegratedEditing />

				<WeekView 
					name="work-week"
					displayName="Work Week"
					excludedDays={[0, 6]}
					startDayHour={8}
					endDayHour={17}
				/>
				<MonthView />
				<DayView 
					startDayHour={8}
					endDayHour={17}
				/>
				<ConfirmationDialog />
				<Toolbar />
				<DateNavigator />
				<TodayButton />
				<ViewSwitcher />
				<Appointments />
				<AppointmentTooltip 
					showCloseButton
					showOpenButton
				/>
				<AppointmentForm 
					//appointmentData
				/>
			</Scheduler>
		</Paper>
	);
}
