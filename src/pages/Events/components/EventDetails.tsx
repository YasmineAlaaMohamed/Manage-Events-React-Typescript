import React, { useContext } from "react";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CalendarTodayTwoToneIcon from "@material-ui/icons/CalendarTodayTwoTone";
import Paper from "@material-ui/core/Paper";
import ChatBubbleOutlineTwoToneIcon from "@material-ui/icons/ChatBubbleOutlineTwoTone";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import GroupAddTwoToneIcon from "@material-ui/icons/GroupAddTwoTone";
import InfoTwoToneIcon from "@material-ui/icons/InfoTwoTone";
import Avatar from "@material-ui/core/Avatar";
import { EventContext } from "../EventProvider";
import styled from "styled-components";
import {
	Grid,
	ButtonGroup,
	Typography,
	Button,
	Box,
	Card,
	IconButton,
} from "@material-ui/core";
import { CommentService } from "../../../services/CommentService";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
const StyledTab = styled(Tab)`
	&& {
		width: 400px;
	}
`;
const StyledAvatar = styled(Avatar)`
	&& {
		margin-top: 27px;
		margin-left: 12px;
	}
`;

const StyledText = styled.p`
	color: #4367f7;
`;

const StyledTextDateWrapper = styled.span`
	color: #000;
	padding-right: 40px;
`;

const StyledTitleWrapper = styled.span`
	color: #000;
	font-weight: bold;
`;

export const EventDetails = ({ eventsDetails }) => {
	const [value, setValue] = React.useState("1");
	const { showCommentForm } = useContext(EventContext);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleDelete = (commentId: any) => {
		CommentService.delete(commentId).then((res) => {});
	};
	return (
		<Card variant='outlined'>
			<CardContent>
				<Box component='h1'>
					<CalendarTodayTwoToneIcon />
					{eventsDetails?.title}{" "}
					<Button
						onClick={() => showCommentForm(eventsDetails._id, "", "")}
						size='small'
						variant='contained'>
						Add Comment
					</Button>
				</Box>

				<TabContext value={value}>
					<AppBar position='static'>
						<TabList onChange={handleChange} aria-label='simple tabs example'>
							<StyledTab value='1' icon={<InfoTwoToneIcon />} label='Details' />
							<StyledTab
								value='2'
								icon={<ChatBubbleOutlineTwoToneIcon />}
								label='Comments'
							/>
							<StyledTab
								value='3'
								icon={<GroupAddTwoToneIcon />}
								label='participant'
							/>
						</TabList>
					</AppBar>
					<TabPanel value='1'>
						<Typography color='textSecondary'>
							<StyledTitleWrapper>Description:</StyledTitleWrapper>{" "}
							{eventsDetails?.description}
						</Typography>
						<Typography color='textSecondary'>
							<StyledTitleWrapper>Location: </StyledTitleWrapper>
							{eventsDetails?.location}
						</Typography>
						<Typography color='textSecondary'>
							<StyledTitleWrapper>Organizer:</StyledTitleWrapper>{" "}
							{eventsDetails?.organizer}
						</Typography>
						<Typography color='textSecondary'>
							<StyledTitleWrapper>Date:</StyledTitleWrapper>{" "}
							{moment(eventsDetails?.date).format("YYYY-MM-DD")}
						</Typography>
						<Typography color='textSecondary'>
							<StyledTitleWrapper>Time: </StyledTitleWrapper>
							{eventsDetails?.time}
						</Typography>
					</TabPanel>
					<TabPanel value='2'>
						{eventsDetails?.comments.map((item, index) => (
							<Paper>
								<Grid container wrap='nowrap' spacing={2}>
									<Grid item>
										<StyledAvatar>
											{item.userId.name.charAt(0).toUpperCase() +
												item.userId.name.charAt(1).toUpperCase()}
										</StyledAvatar>
									</Grid>
									<Grid item xs zeroMinWidth>
										<Typography>
											<StyledText>
												{item.userId.name + " "}
												<StyledTextDateWrapper>
													{moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
												</StyledTextDateWrapper>

												<ButtonGroup
													size='small'
													variant='outlined'
													aria-label='Basic button group'>
													<IconButton
														onClick={() =>
															showCommentForm(
																eventsDetails._id,
																item._id,
																item.content
															)
														}
														color='primary'
														component='span'>
														<EditIcon />
													</IconButton>

													<IconButton
														onClick={() => {
															handleDelete(item._id);
														}}
														color='secondary'
														aria-label='Delete'
														component='span'>
														<DeleteIcon />
													</IconButton>
												</ButtonGroup>
											</StyledText>
											{item.content}{" "}
										</Typography>
									</Grid>
								</Grid>
							</Paper>
						))}
					</TabPanel>
					<TabPanel value='3'>
						{" "}
						<div>
							<Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
							<Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
							<Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
						</div>
					</TabPanel>
				</TabContext>
			</CardContent>

			<CardActions></CardActions>
		</Card>
	);
};
