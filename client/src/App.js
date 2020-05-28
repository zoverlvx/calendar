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
	const [viewName, setViewName] = useState("work-week");

	useEffect(function() {

		async function fetchData() {
			const results = await axios.get("/api/events");
			setEvents(results.data);
		}

		fetchData();
	}, []);

	function currentViewNameChange(currentViewName) {
		setViewName(currentViewName);
	}

	function commitChanges({ added, changed, deleted }) {
		setEvents(function(state) {
			if (added) {
				
				added.id = state.length + 1;
				console.log("here is added: ", added);
				return [...state, added];
			
			} else if (changed) {
				
				return state.map(function(appointment) {
					return changed[appointment.id] 
						? {...appointment, ...changed[appointment.id]}
						: appointment;
				});

			} else if (deleted !== undefined) {
				/*
				const id = await axios.delete(`/api/events/${deleted}`)
				if (id) {
					return state.filter(function(appointment) {
						return appointment.id !== deleted;
					})
				} else {
					alert("Not able to delete appointment.")
				}
				*/
				console.log("here is the deleted key value: ", deleted);
				return state.filter(function(appointment) {
					return appointment.id !== deleted;
				});
			}
			return state;
		});
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
