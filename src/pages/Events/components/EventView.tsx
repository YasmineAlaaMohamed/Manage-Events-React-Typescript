import React, { useEffect, useState } from "react";

import { EventService } from "../../../services/EventService";

import { useParams } from "react-router-dom";
import { EventProvider } from "../EventProvider";
import { EventDetails } from "./EventDetails";

export const EventView = () => {
	const [eventsDetails, setEventDetails] = useState(null);
	const params = useParams();

	useEffect(() => {
		EventService.get(params.id)
			.then((res) => {
				setEventDetails(res.data.records);
			})
			.catch((err) => console.error(err));
	}, []);
	return (
		eventsDetails && (
			<EventProvider>
				<EventDetails eventsDetails={eventsDetails} />
			</EventProvider>
		)
	);
};
