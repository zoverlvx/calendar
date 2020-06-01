import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { 
	ViewState,
	EditingState,
	IntegratedEditing,
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
	ConfirmationDialog,
	DragDropProvider,
	EditRecurrenceMenu
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
			// added is an object of the data to post to the db
			axios.post("/api/events", added)
				.then(response => setEvents(function(state) {
					return [...state, response.data];
				}))
				.catch(error => console.log(error));

		} else if (changed) {
			// changed is an object with a property named after the id
			// of the updated event. With the corresponding property of the 
			// changed item
			// e.g. changed: {12: {title: "I changed this"}}

			
			const id = Number(Object.keys(changed)[0]);
			
			const changes = changed[id];
			
			axios.put(`/api/events/${id}`, {changes})
				.then(function(response) {
					setEvents(function(state) {
						return state.map(function(event) {
							if (event.id === id) {
								return {...response.data};
							}
							return event;
						})
					})
				})
				.catch(error => console.log(error));

		} else if (deleted) {
			// deleted is the id of the event to be deleted
			// it's type number

			const deletedId = deleted;
			axios.delete(`/api/events/${deletedId}`)
				.then(function(response) {
					
					const {isDeleted} = response.data;

					if(isDeleted) {
						setEvents(function(state) {
							return state.filter(function(appointment) {
								return appointment.id !== deletedId
							})
						})
					}
				})
				.catch(error => console.log(error));
		}
	}
	
	const today = new Date();

	// if events haven't come in from the server yet
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
				<EditRecurrenceMenu />
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
				<DragDropProvider 
					allowDrag={() => true}
				/>
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
