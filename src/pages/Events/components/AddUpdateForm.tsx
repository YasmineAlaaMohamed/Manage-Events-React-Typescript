import React, { useContext, useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";
import { EventContext } from "../EventProvider";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TagService } from "../../../services/TagService";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import moment from "moment";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
	Chip,
} from "@material-ui/core";

interface Tag {
	label: string;
}

const StyledTextDate = styled(TextField)`
	&& {
		margin-right: 20px;
	}
`;

export const AddUpdateForm = ({
	validationErrors,
	updateFormData,
	isDisabled,
	formData,
	setSelectedTags,
	loading,
	selectedTags,
}) => {
	const { setShowAddModal, submitAddUpdateForm } = useContext(EventContext);
	const [tags, setTags] = useState([]);
	useEffect(() => {
		TagService.getAll().then((res) => {
			setTags(res.data.records);
		});
	}, []);

	const handleTagChange = (event: React.ChangeEvent<{}>, newTags: Tag[]) => {
		setSelectedTags(newTags);
	};

	const isAdd = formData.id == "" ? true : false;
	return (
		<Dialog open={true} onClose={() => {}} aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>
				{isAdd ? "Add Event" : "Update Event"}
			</DialogTitle>
			<DialogContent>
				{loading ? (
					<CircularProgress />
				) : (
					<>
						<DialogContentText>
							When your event form is ready, click save to save any changes
							you’ve made
						</DialogContentText>
						<TextField
							id='title'
							required
							label='Title'
							value={formData.title}
							fullWidth
							error={validationErrors.title}
							helperText={validationErrors.title}
							onChange={(e) => updateFormData("title", e.target.value)}
						/>
						<TextField
							autoFocus
							margin='dense'
							required
							id='organizer'
							label='Organizer'
							value={formData.organizer}
							fullWidth
							error={validationErrors.organizer}
							helperText={validationErrors.organizer}
							onChange={(e) => updateFormData("organizer", e.target.value)}
						/>
						<TextField
							autoFocus
							margin='dense'
							id='location'
							label='Location'
							required
							value={formData.location}
							fullWidth
							error={validationErrors.location}
							helperText={validationErrors.location}
							onChange={(e) => updateFormData("location", e.target.value)}
						/>
						<StyledTextDate
							required
							id='date'
							type='date'
							label='Date'
							error={validationErrors.date}
							value={formData.date}
							helperText={validationErrors.date}
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{ min: moment().format("YYYY-MM-DD") }}
							onChange={(e) => updateFormData("date", e.target.value)}
						/>

						<TextField
							required
							id='time'
							type='time'
							label='Time'
							value={formData.time}
							error={validationErrors.time}
							helperText={validationErrors.time}
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{
								step: 300, // 5 min
							}}
							onChange={(e) => updateFormData("time", e.target.value)}
						/>
						<TextField
							required
							error={validationErrors.description}
							helperText={validationErrors.description}
							id='description'
							value={formData.description}
							multiline
							fullWidth
							label='Description'
							rows={4}
							onChange={(e) => updateFormData("description", e.target.value)}
						/>

						<Autocomplete
							multiple
							id='tags-filled'
							options={
								tags.length > 0 ? tags?.map((option) => option.name) : []
							}
							freeSolo
							value={selectedTags}
							onChange={handleTagChange}
							renderTags={(value, getTagProps) =>
								value?.map((option, index) => (
									<Chip
										variant='outlined'
										label={option}
										{...getTagProps({ index })}
									/>
								))
							}
							renderInput={(params) => (
								<TextField
									{...params}
									variant='filled'
									label=''
									placeholder='enter or choose tag'
								/>
							)}
						/>
					</>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setShowAddModal(false)} variant='contained'>
					Cancel
				</Button>
				<Button
					onClick={submitAddUpdateForm}
					color='primary'
					disabled={isDisabled}
					variant='contained'>
					{isAdd ? "Save" : "Update"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
