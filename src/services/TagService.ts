import { axiosClient } from "./axiosInstance";

const client = axiosClient(true);

export const TagService = {
	getAll: async () => {
		try {
			return await client.get(`/tags`);
		} catch (error) {
			throw error;
		}
	},

	save: async (formData) => {
		try {
			return await client.post(`/tags`, formData);
		} catch (error) {
			throw error;
		}
	},
};
