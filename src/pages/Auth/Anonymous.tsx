import { Outlet, Navigate } from "react-router-dom";

export const Anonymous: any = () => {
	const item = JSON.parse(localStorage.getItem("loggedUserData"));
	const token = item?.accessToken;

	return token ? <Navigate to='/' replace /> : <Outlet />;
};
