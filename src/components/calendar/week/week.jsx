import React from "react";
import {cn as bem} from "@bem-react/classname";
import "./index.css";
import DayButton from "../../ui/button/DayButton";
import FramelessButton from "../../ui/button/FramelessButton";

export default function Week(props) {
	const cn = bem("Week");

	const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];//Воскресенье - 0
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const days = [<div className={cn("item-day")} key={0}/>];

	let daysCounter = props.week;
	let limit = new Date(props.week.getFullYear(), props.week.getMonth(), props.week.getDate() + 7);
	while (daysCounter.getDate() !== limit.getDate()) {
		const getDate = daysCounter.getDate();
		const isCurrent = daysCounter.toLocaleDateString() === props.day.toLocaleDateString() ? "current" : "";
		const closuresDay = daysCounter;
		days.push(
			<div className={cn("item-day")} key={getDate}>
				<div key={"w" + getDate} className={"n"}>
					{dayNames[daysCounter.getDay()][0]}
				</div>
				<div key={"d" + getDate} className={"s"}>
					<DayButton className={isCurrent} onClick={() => props.changeDay(closuresDay)}>{getDate}</DayButton>
				</div>
			</div>
		);
		daysCounter = new Date(daysCounter.getFullYear(), daysCounter.getMonth(), daysCounter.getDate() + 1);
	}

	return (
		<div className={cn()}>
			<div className={cn("day")}>
				{days.map(day => day)}
			</div>
			<div className={cn("month")}>
				<div className={cn("item-month l")}>
					<FramelessButton style={{fontWeight: "bold", fontSize: 16}} onClick={() => props.changeWeek("-")}>{"<"}</FramelessButton>
				</div>
				<div className={cn("item-month c")}>
					{monthNames[props.week.getMonth()] + " " + props.week.getFullYear()}
				</div>
				<div className={cn("item-month r")}>
					<FramelessButton style={{fontWeight: "bold", fontSize: 16}} onClick={() => props.changeWeek("+")}>{">"}</FramelessButton>
				</div>
			</div>
		</div>
	);
}
