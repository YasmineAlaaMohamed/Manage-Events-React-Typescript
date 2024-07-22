import React, { useState, FC } from "react";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export const Toaster = ({ toaster, setToasterInfo }) => {
	const handleClose = () => {
		setToasterInfo({
			open: false,
		});
	};

	return (
		<Snackbar
			open={toaster.open}
			autoHideDuration={3000}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			onClose={handleClose}
			message={toaster.message}>
			<Alert onClose={handleClose} severity={toaster.status}>
				{toaster.message}
			</Alert>
		</Snackbar>
	);
};
