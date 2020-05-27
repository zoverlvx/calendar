import React, { useState } from "react";
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
import data from "./data";

export default function(props) {
	const [state, setState] = useState({
		data,
		currentViewName: "work-week"
	});
	function currentViewNameChange(currentViewName) {
		setState({...state, currentViewName});
	}
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
	const today = new Date();

	return (
		<Paper>
			<Scheduler
				data={state.data}
				height={660}
			>
				<ViewState 
					defaultCurrentDate={today}
					currentViewName={
						state.currentViewName
					}
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