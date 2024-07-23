import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ColumnDef } from "@tanstack/react-table";
import { EventService, TagService } from "../../../services";
import { ReusableTable } from "../../components/Table";
import { RootState } from "../../../reducers";
import { EventContext, FormState } from "../EventProvider";
import {
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Box,
	Chip,
	Card,
	Input,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import moment from "moment";

const StyledDiv = styled.div`
	display: flex;
	align-items: center;
`;

const StyledFormControl = styled(FormControl)`
	&& {
		min-width: 300px;
		margin-bottom: 10px;
		margin-right: 30px;
	}
`;

const StyledButton = styled(Button)`
	&& {
		border-radius: 10px;
		margin-right: 10px;
	}
`;

export const EventList = () => {
	const {
		setShowAddModal,
		dispatch,
		showCommentForm,
		setToaster,
		setIsDisabled,
		setSelectedTags,
	} = useContext(EventContext);
	const [events, setEvents] = useState([]);
	const [tags, setTags] = useState([]);
	const [search, setSearch] = useState("");
	const dispatchData = useDispatch();
	const userData = useSelector((state: RootState) => state.user.userData);

	const localData = JSON.parse(localStorage.getItem("loggedUserData"));

	const refreshState = useSelector(
		(state: RootState) => state.payload.reloadFetch
	);
	const navigate = useNavigate();

	const gotToViewPage = (id: string) => {
		navigate(`/events/${id}`);
	};
	const [tagName, setTagName] = React.useState([]);

	const handleChange = (event) => {
		setTagName(event.target.value);
	};
	const setFormData = (formData) => {
		const date = formData.date
			? moment(formData.date).format("YYYY-MM-DD")
			: "";
		const formInitial: FormState = {
			id: formData._id,
			title: formData.title,
			description: formData.description,
			organizer: formData.organizer,
			location: formData.location,
			date: date,
			time: formData.time,
		};

		Object.keys(formInitial).forEach((key) => {
			const value = formInitial[key];
			const fieldData = key as keyof FormState;
			dispatch({ type: "SET_FIELD", field: fieldData, value: value });
		});
		const tags = formData.tags.map((tag) => tag.name);

		setIsDisabled(false);
		setSelectedTags(tags);
		setShowAddModal(true);
	};

	const columns: ColumnDef<any, any>[] = [
		{
			accessorKey: "title",
			header: "Title",
		},
		{
			accessorKey: "description",
			header: "Description",
		},
		{
			accessorKey: "organizer",
			header: "Organizer",
		},
		{
			accessorKey: "location",
			header: "Location",
		},
		{
			accessorKey: "date",
			header: "Date",
			cell: (row: any) => {
				return row.row.original.date
					? moment(row.row.original.date).format("YYYY-MM-DD")
					: "";
			},
		},
		{
			accessorKey: "time",
			header: "Time",
		},
		{
			accessorKey: "tags",
			header: "Tags",
			cell: (row: any) => {
				return (
					<StyledDiv>
						{row.row.original.tags.map((e, index) => (
							<Chip size='small' color='primary' label={e.name} key={index} />
						))}
					</StyledDiv>
				);
			},
		},
		{
			accessorKey: "action",
			header: "Action",
			cell: (row) => {
				return (
					<StyledDiv>
						<StyledButton
							size='small'
							variant='contained'
							onClick={() => gotToViewPage(row.row.original._id)}>
							View
						</StyledButton>
						<StyledButton
							color='primary'
							size='small'
							variant='contained'
							onClick={() => setFormData(row.row.original)}>
							Edit
						</StyledButton>
						<StyledButton
							variant='contained'
							size='small'
							onClick={() => handleDelete(row.row.original._id)}
							color='secondary'>
							Delete
						</StyledButton>
						<StyledButton
							size='small'
							variant='contained'
							style={{
								background: "#b6cccf",
							}}
							onClick={() => showCommentForm(row.row.original._id, "", "")}>
							+Comment
						</StyledButton>
					</StyledDiv>
				);
			},
		},
	];

	const handleDelete = (eventId: any) => {
		EventService.delete(eventId)
			.then((res) => {
				setEvents(events.filter((event) => event._id !== eventId));
				setToaster({
					message: `Successfully deleted!`,
					status: "success",
					open: true,
				});
				dispatchData({
					type: "SET_FETCH_RELOAD_DATA",
					payload: !refreshState,
				});
			})
			.catch((err) => {
				setToaster({
					message: `Failed to delete!`,
					status: "error",
					open: true,
				});
			})
			.finally(() => {
				setShowAddModal(false);
			});
	};

	useEffect(() => {
		EventService.getAll(search, tagName).then((res) => {
			setEvents(res.data.records);
		});
		TagService.getAll().then((res) => {
			setTags(res.data.records);
		});
	}, [tagName, search, refreshState]);

	return (
		<Box padding={1}>
			<>
				<StyledFormControl>
					<TextField
						label='Search'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</StyledFormControl>
				<StyledFormControl>
					<InputLabel id='demo-mutiple-chip-label'>Tag</InputLabel>
					<Select
						labelId='demo-mutiple-chip-label'
						id='demo-mutiple-chip'
						multiple
						value={tagName}
						onChange={handleChange}
						input={<Input id='select-multiple-chip' />}
						renderValue={(selected) => (
							<div>
								{(selected as string[]).map((value) => (
									<Chip key={value} label={value} />
								))}
							</div>
						)}>
						{tags.map((tag) => (
							<MenuItem key={tag._id} value={tag.name}>
								{tag.name}
							</MenuItem>
						))}
					</Select>
				</StyledFormControl>
				{events.length > 0 ? (
					<ReusableTable data={events} columns={columns} />
				) : (
					<Card>No Events Found!</Card>
				)}
			</>
		</Box>
	);
};
