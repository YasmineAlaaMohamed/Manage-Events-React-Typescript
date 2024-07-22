/* eslint-disable import/no-cycle */
import { Events } from "./pages/Events";
import { EventView } from "./pages/Events/components/EventView";
export const routes = [
	{
		link: "/events",
		component: Events,
	},
	{
		link: "/events/:id",
		component: EventView,
	},
];
