import React, { useContext } from "react";
import styled from "styled-components";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { EventContext } from "../EventProvider";

const StyledButton = styled(Button)`
	&& {
		border-radius: 3px;
		margin-left: 100px;
		float: right;
		color: #fff;
	}
`;

const StyledAddButton = styled(Button)`
	&& {
		border-radius: 5px;
	}
`;

const StyledWrapper = styled.div`
	display: inline-block;
	width: 100%;
`;
const StyledContainer = styled.div`
	width: 100%;
`;

const LeftElement = styled.div`
	float: left;
`;
const RightElement = styled.div`
	float: right;
`;

export const EventLayoutWrapper = ({ children }) => {
	const navigate = useNavigate();
	const { setShowAddModal } = useContext(EventContext);

	const logout = (e: React.FormEvent) => {
		localStorage.removeItem("loggedUserData");
		navigate(`/login`);
	};

	return (
		<StyledContainer>
			<AppBar position='static'>
				<Toolbar>
					<StyledWrapper>
						<LeftElement>
							<Typography variant='h6'>
								Manage Events{" "}
								<StyledAddButton
									color='default'
									variant='contained'
									onClick={() => setShowAddModal(true)}
									size='small'>
									<AddIcon />
								</StyledAddButton>
							</Typography>
						</LeftElement>
						<RightElement>
							<Typography variant='h6'>
								<StyledButton onClick={logout} size='small'>
									logout
								</StyledButton>
							</Typography>
						</RightElement>
					</StyledWrapper>
				</Toolbar>
			</AppBar>
			{children}
		</StyledContainer>
	);
};
