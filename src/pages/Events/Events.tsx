import { EventList, EventLayoutWrapper } from "./components";
import { EventProvider } from "./EventProvider";

export const Events = () => {
	return (
		<EventProvider>
			<EventLayoutWrapper>
				<EventList />
			</EventLayoutWrapper>
		</EventProvider>
	);
};
