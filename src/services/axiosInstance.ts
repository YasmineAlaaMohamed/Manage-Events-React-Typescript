import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

export const axiosClient = (applyAuth = true): AxiosInstance => {
	const headers = {
		"Content-Type": "application/json",
	};
	const client = axios.create({
		baseURL: "http://localhost:8080",
		headers,
		timeout: 60000,
		withCredentials: false,
	});

	client.interceptors.request.use((config: any) => {
		const locatStorgaeData = JSON.parse(localStorage.getItem("loggedUserData"));

		config.headers = {};
		if (applyAuth) {
			config.headers.Authorization = `Bearer ${locatStorgaeData?.token}`;
		}
		return config;
	});

	client.interceptors.response.use(
		(response: AxiosResponse) => {
			return response;
		},
		(error: AxiosError) => {
			try {
				const { response } = error;
				if (response?.status === 401) {
					localStorage.removeItem("loggedUserData");
				}
			} catch (e) {
				console.error(e);
			}
			throw error;
		}
	);

	return client;
};
