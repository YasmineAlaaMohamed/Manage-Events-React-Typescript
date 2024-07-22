import { Outlet, Navigate } from "react-router-dom";

export const Protected: any = ({ children, ...rest }) => {
	const item = JSON.parse(localStorage.getItem("loggedUserData"));
	const token = item?.token;

	return token ? <Outlet /> : <Navigate to='/login' />;
};
