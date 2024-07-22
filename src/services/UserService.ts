import { axiosClient } from "./axiosInstance";

const client = axiosClient(false);

export const UserService = {
	login: async (email, password) => {
		return await client.post(`/login`, {
			email: email,
			password: password,
		});
	},

	getInfo: async (token) => {
		return await client.get(`/users/${token}`);
	},
};
