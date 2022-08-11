import React from "react";
import "./index.css";
import {cn as bem} from "@bem-react/classname";
import Button from "../ui/button/FramelessButton";

export default function Footer(props) {
	const cn = bem("Footer");

	return (
		<div className={cn()}>
			<Button className={cn("item")} onClick={() => props.setCurrentDay()}>Today</Button>
			{props.event ? <Button className={cn("item")} onClick={() => props.deleteEvent()}>Delete</Button> : null}
		</div>
	);
}

Footer.defaultProps = {
	event: null
};