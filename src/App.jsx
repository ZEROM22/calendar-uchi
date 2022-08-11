import React, {useCallback, useEffect, useState} from "react";
import Header from "./components/header/header";
import Week from "./components/calendar/week/week";
import Day from "./components/calendar/day/day";
import Footer from "./components/footer/footer";
import "./App.css";

function App({store}) {
	const [time, setTime] = useState(null);
	const [event, setEvent] = useState(null);
	const [day, setDay] = useState(new Date());
	const [week, setWeek] = useState(new Date());

	const callbacks = {
		addEvent: useCallback(() => {
			const event = window.prompt("Enter event:");
			store.addEvent(day, time, event);
			setTime(null);
		}, [day, time]),
		deleteEvent: useCallback(() => {
			store.deleteEvent(day, time);
			setTime(null);
		}, [day, time]),
	};

	useEffect(() => {
		setCurrentWeek();
	}, []);

	function setCurrentWeek() {
		if (new Date().getDay() > 1) setWeek(new Date(day.getFullYear(), day.getMonth(), day.getDate() - day.getDay() + 1));
		else if (new Date().getDay() === 1) setWeek(day);
		if (new Date().getDay() < 1) setWeek(new Date(day.getFullYear(), day.getMonth(), day.getDate() - 6));
	}

	function setCurrentDay() {
		setDay(new Date());
		setCurrentWeek();
	}

	function changeWeek(i) {
		if (i === "-") setWeek(new Date(week.getFullYear(), week.getMonth(), week.getDate() - 7));
		if (i === "+") setWeek(new Date(week.getFullYear(), week.getMonth(), week.getDate() + 7));
		setTime(null);
		setEvent(null);
	}

	function changeDay(day) {
		setDay(day);
		setTime(null);
		setEvent(null);
	}

	function selectTime(time) {
		setTime(time);
		setEvent(null);
	}

	function selectEvent(time, event) {
		setTime(time);
		setEvent(event);
	}

	function showEvent() {
		window.alert(event);
	}

	return (
		<div className="App">
			<div className="Content">
				<Header time={time} event={event} addEvent={callbacks.addEvent} showEvent={showEvent}/>
				<Week day={day} week={week} changeDay={changeDay} changeWeek={changeWeek}/>
				<Day time={time} events={store.getEvents(day)} selectTime={selectTime} selectEvent={selectEvent}/>
				<Footer event={event} setCurrentDay={setCurrentDay} deleteEvent={callbacks.deleteEvent}/>
			</div>
		</div>
	);
}

export default App;
