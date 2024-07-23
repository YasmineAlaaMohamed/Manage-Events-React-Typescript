// LoginForm.tsx

import React, { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import styled from "styled-components";
import { UserService } from "../../services/UserService";
import { useDispatch } from "react-redux";
import { setUserData } from "../../actions";
import { useNavigate } from "react-router-dom";
const logo = require("../../assets/user.png");

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	margin: auto;
`;

const StyledImg = styled.img`
	height: 200px;
	width: 200px;
	align: center;
	margin-left: 33%;
`;

const StyledTypo = styled(Typography)`
	text-align: center;
	margin-left: -20px;
`;

const StyledDiv = styled.div`
	text-align: center;
	margin-top: 50px;
`;
export const LoginForm = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("loggedUserData") != null) {
			navigate(`/events`);
		}
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		UserService.login(email, password)
			.then((res) => {
				const token = res.data.token;
				UserService.getInfo(res.data.token).then((res) => {
					const userDetails: any = {
						name: res.data.name,
						email: res.data.email,
						token: token,
					};
					dispatch(setUserData(userDetails));
					navigate(`/events`);
				});
			})
			.catch((err) => {
				setError("Invalid credentials");
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormContainer>
				<StyledImg src={logo} alt='Image' />
				<StyledTypo color='textSecondary' variant='h4'>
					Sign In
				</StyledTypo>
				<Typography color='secondary' variant='h6'>
					{error}
				</Typography>
				<TextField
					label='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					type='password'
					label='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button color='primary' type='submit'>
					Login
				</Button>
			</FormContainer>
			<StyledDiv>
				<Button
					onClick={() => {
						navigate("/register");
					}}
					color='primary'>
					Not a member? sign up
				</Button>
			</StyledDiv>
		</form>
	);
};
