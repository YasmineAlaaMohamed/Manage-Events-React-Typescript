import { axiosClient } from "./axiosInstance";

const client = axiosClient(false);

export const UserService = {
	login: async (email, password) => {
		try {
			return await client.post(`/login`, {
				email: email,
				password: password,
			});
		} catch (error) {
			throw error;
		}
	},

	getInfo: async (token) => {
		try {
			return await client.get(`/users/${token}`);
		} catch (error) {
			throw error;
		}
	},

	register: async (formData) => {
		try {
			return await client.post(`/register`, formData);
		} catch (error) {
			throw error;
		}
	},
};
