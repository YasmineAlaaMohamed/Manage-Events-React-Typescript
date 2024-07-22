import { UserActionTypes } from "../types/user";

export const setUserData = (userData) => {
	localStorage.setItem("loggedUserData", JSON.stringify(userData));

	return {
		type: UserActionTypes.SET_USER_DATA,
		payload: userData,
	};
};
