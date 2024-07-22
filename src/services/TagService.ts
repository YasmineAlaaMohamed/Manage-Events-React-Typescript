import { axiosClient } from "./axiosInstance";

const client = axiosClient(true);

export const TagService = {
	getAll: async () => {
		return await client.get(`/tags`);
	},
};
