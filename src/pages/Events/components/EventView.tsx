import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EventService } from "../../../services/EventService";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EventProvider } from "../EventProvider";
import { EventDetails } from "./EventDetails";
import { RootState } from "../../../reducers";

export const EventView = () => {
	const [eventsDetails, setEventDetails] = useState(null);
	const params = useParams();
	const dispatchData = useDispatch();
	const refreshState = useSelector(
		(state: RootState) => state.payload.reloadFetch
	);

	useEffect(() => {
		EventService.get(params.id)
			.then((res) => {
				setEventDetails(res.data.records);
			})
			.catch((err) => console.error(err));
	}, [refreshState]);
	return (
		eventsDetails && (
			<EventProvider>
				<EventDetails
					dispatchData={dispatchData}
					eventsDetails={eventsDetails}
					refreshState={refreshState}
				/>
			</EventProvider>
		)
	);
};
