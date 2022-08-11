import React from "react";
import {cn as bem} from "@bem-react/classname";
import Button from "../ui/button/FramelessButton";
import "./index.css";
import styled from "styled-components";


export default function Header(props) {
	const cn = bem("Header");

	const Header = styled.h1`
		font-size: 20px;
		font-weight: normal;
	`;

	return (
		<header className={cn()}>
			<Header className={cn("item")}>Interview Calendar</Header>
			{props.time && !props.event
				? <Button style={{fontSize: 24}} className={cn("item")} onClick={props.addEvent}>+</Button>
				: null
			}
			{props.event
				? <Button style={{fontSize: 24}} className={cn("item")} onClick={props.showEvent}>?</Button>
				: null
			}
		</header>
	);
}

Header.defaultProps = {
	time: null,
	event: null
};
