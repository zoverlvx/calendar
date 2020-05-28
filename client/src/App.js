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
	/*
	const [state, setState] = useState({
		data: [],
		currentViewName: "work-week"
	});
	*/
	const [events, setEvents] = useState([]);
	const [viewName, setViewName] = useState("work-week")

	console.log("events before request: ", events);

	useEffect(function() {

		async function fetchData() {
			const results = await axios.get("/api/events");
			setEvents(results.data);
		}

		fetchData();
	}, []);
	
	console.log("events after request: ", events);

	function currentViewNameChange(currentViewName) {
		setViewName(currentViewName);
	}

	/*	
	function commitChanges({ added, changed, deleted }) {
		setState(function(state) {
			const {data} = state;
			let newData;
			if (added) {
				// axios.post("/postingendpoint", added)
				//   .then(response => console.log(response))
				//   .catch(error => alert(error))
				console.log("here is added: ",added);
				newData = [...data, {...added}];
				// id is handled on the backend and will return the new object
			} else if (changed) {
				newData = data.map(function(appointment) {
					return changed[appointment.id] 
						? {...appointment, ...changed[appointment.id]}
						: appointment;
				});
				console.log("here is the new data after change: ", newData);
				console.log("here is changed: ", changed);

			} else if (deleted !== undefined) {
				newData = data.filter(function(appointment) {
					return appointment.id !== deleted;
				});
				console.log("here is deleted: ", deleted);
			}
			return {...state, data: newData};
		})
	}
	*/
	function commitChanges() {
		alert("hello");
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
				<DayView />
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
