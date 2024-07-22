import { axiosClient } from "./axiosInstance";

const client = axiosClient(true);

export const EventService = {
	getAll: async (params, tags = []) => {
		let searchQuery = "";
		if (params) {
			searchQuery += `&params=${params}`;
		}
		if (tags.length > 0) {
			tags.forEach((tag) => {
				searchQuery += `&tag=${tag}`;
			});
		}
		try {
			return await client.get(`/events?${searchQuery}`);
		} catch (e) {
			console.error(e);
		}
	},

	get: async (id) => {
		try {
			return await client.get(`/events/${id}`);
		} catch (e) {
			console.error(e);
		}
	},

	delete: async (id) => {
		try {
			return await client.delete(`/events/${id}`);
		} catch (e) {
			console.error(e);
		}
	},

	save: async (formData) => {
		try {
			return await client.post(`/events`, formData);
		} catch (e) {
			console.error(e);
		}
	},

	update: async (formData) => {
		try {
			return await client.put(`/events/${formData.id}`, formData);
		} catch (e) {
			console.error(e);
		}
	},
};
