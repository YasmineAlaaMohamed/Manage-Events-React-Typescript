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
		} catch (error) {
			throw error;
		}
	},

	get: async (id) => {
		try {
			return await client.get(`/events/${id}`);
		} catch (error) {
			throw error;
		}
	},

	delete: async (id) => {
		try {
			return await client.delete(`/events/${id}`);
		} catch (error) {
			throw error;
		}
	},

	save: async (formData) => {
		try {
			return await client.post(`/events`, formData);
		} catch (error) {
			throw error;
		}
	},

	update: async (formData) => {
		try {
			return await client.put(`/events/${formData.id}`, formData);
		} catch (error) {
			throw error;
		}
	},
};
