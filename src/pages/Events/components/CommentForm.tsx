import React, { useContext, useState } from "react";

import {
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
} from "@material-ui/core";

import { EventContext } from "../EventProvider";
import { CommentService } from "../../../services/CommentService";

export const CommentForm = ({
	eventId,
	content,
	commentId,
	dispatchData,
	refreshState,
}) => {
	const { setShowCommentModal, setToaster } = useContext(EventContext);
	const [isDidabled, setIsDisabled] = useState<boolean>(content ? false : true);
	const [commentContent, setCommentContent] = useState<string>("");
	const submitCommentForm = () => {
		if (commentId) {
			CommentService.update(eventId, commentId, commentContent)
				.then((res) => {
					setShowCommentModal(false);
					setToaster({
						message: `Comment Successfully updated!`,
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
						message: `Failed to create comment!`,
						status: "error",
						open: true,
					});
				});
		} else {
			CommentService.save(eventId, commentContent)
				.then((res) => {
					setShowCommentModal(false);
					setToaster({
						message: `Comment Successfully created!`,
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
						message: `Failed to create comment!`,
						status: "error",
						open: true,
					});
				});
		}
	};

	const validate = (val: string) => {
		if (!val.trim()) {
			setIsDisabled(true);
			setCommentContent("");
		} else {
			setIsDisabled(false);
			setCommentContent(val);
		}
	};

	return (
		<Dialog
			open={true}
			onClose={() => setShowCommentModal(false)}
			aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>
				`{commentId ? "Update Comment" : "Add Comment"}`
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					When your comment form is ready, click save to save any changes you’ve
					made
				</DialogContentText>
				<TextField
					autoFocus
					margin='dense'
					id='Comment'
					label='Comment'
					fullWidth
					defaultValue={content}
					onChange={(e) => validate(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setShowCommentModal(false)} variant='contained'>
					Cancel
				</Button>
				<Button
					onClick={submitCommentForm}
					color='primary'
					disabled={isDidabled}
					variant='contained'>
					{commentId ? "Update" : "Save"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
