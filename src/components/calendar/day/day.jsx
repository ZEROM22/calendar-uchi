import React from "react";
import {cn as bem} from "@bem-react/classname";
import "./index.css";

export default function Day(props) {
	const cn = bem("Day");

	const table = [];
	for (let i = 0; i < 24; i++) {
		const col = [];
		col.push(
			<td className={cn("table-td")} key={"time" + i}>
				<div className={cn("table-time")}>
					{i < 10 ? "0" + i : i}:00
				</div>
			</td>
		);
		for (let j = 0; j < 7; j++) {
			let className = "table-item";
			if (j === 0) className += " item-first";
			else if (j === 6) className += " item-last";

			if ((i * 7) + j + 1 === props.time) className += " item-selected";

			let callback = null;
			if (props.events[(i * 7) + j + 1]) {
				className += " item-event";
				callback = () => props.selectEvent((i * 7) + j + 1, props.events[(i * 7) + j + 1]);
			} else callback = () => props.selectTime((i * 7) + j + 1);

			col.push(
				<td className={cn("table-td")} key={(i * 7) + j}>
					<button className={cn(className)} onClick={callback}/>
				</td>
			);
		}
		table.push(<tr className={cn("table-tr")} key={"tr" + i}>{col}</tr>);
	}

	return (
		<div className={cn()}>
			<table className={cn("table")}>
				<tbody>
				{table}
				</tbody>
			</table>
		</div>
	);
}

Day.defaultProps = {
	events: {}
};