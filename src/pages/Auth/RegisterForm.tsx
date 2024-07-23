// RegisterForm.tsx
import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/UserService";

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50%;
	margin: auto;
`;

const StyledDiv = styled.div`
	text-align: center;
	margin-top: 10px;
`;

const StyledTypo = styled(Typography)`
	text-align: center;
	margin-left: -20px;
	padding-top: 50px;
`;

const StyledText = styled(TextField)`
	&& {
		margin-bottom: 10px;
	}
`;

export const RegisterForm: React.FC = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		UserService.register(formData)
			.then((res) => {
				navigate(`/login`);
			})
			.catch((err) => {});
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormContainer>
				<StyledTypo color='textSecondary' variant='h3'>
					Sign Up
				</StyledTypo>
				<StyledText
					name='name'
					label='Name'
					value={formData.name}
					onChange={handleChange}
					required
					fullWidth
				/>
				<StyledText
					name='email'
					type='email'
					label='Email'
					value={formData.email}
					onChange={handleChange}
					required
					fullWidth
				/>
				<StyledText
					name='password'
					type='password'
					label='Password'
					value={formData.password}
					onChange={handleChange}
					required
					fullWidth
				/>
				<Button type='submit'>Register</Button>
			</FormContainer>
			<StyledDiv>
				<Button
					onClick={() => {
						navigate("/login");
					}}
					color='primary'>
					Already a member? sign In
				</Button>
			</StyledDiv>
		</form>
	);
};
