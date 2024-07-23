import React, { createContext, useState, useReducer } from "react";
import { CommentForm, AddUpdateForm } from "./components";
import { EventService, TagService } from "../../services";
import { Toaster } from "../components";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { useDispatch } from "react-redux";

export type FormState = {
	id: string;
	title: string;
	description: string;
	location: string;
	organizer: string;
	date: any;
	time: string;
};

type Action = { type: "SET_FIELD"; field: keyof FormState; value: string };
type ActionArray = [];
export const EventContext = createContext({
	showCommentModal: false,
	setShowCommentModal: (modalToShow: boolean) => {},
	setLoading: (modalToShow: boolean) => {},
	setShowAddModal: (showAddModal: boolean) => {},
	setEventId: (eventId: string) => {},
	submitAddUpdateForm: () => {},
	setToaster: (data: any) => {},
	showCommentForm: (
		eventId: string,
		commentId: string,
		comentContent: string
	) => {},
	dispatch: (data: Action) => {},
	setIsDisabled: (isDisabled: boolean) => {},
	setSelectedTags: (data: ActionArray) => {},
});

const initialState: FormState = {
	id: "",
	title: "",
	description: "",
	location: "",
	organizer: "",
	date: "",
	time: "",
};
const formReducer = (state: FormState, action: Action): FormState => {
	switch (action.type) {
		case "SET_FIELD":
			return {
				...state,
				[action.field]: action.value,
			};
		default:
			return state;
	}
};

export const EventProvider = ({ children }) => {
	const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
	const [showAddModal, setShowAddModal] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [validationErrors, setErrors] = useState({});
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [eventId, setEventId] = useState<string>("");
	const [commentId, setCommentId] = useState<string>("");
	const [commentContent, setCommentContent] = useState<string>("");
	const [toasterData, setToaster] = useState({
		message: "",
		status: "success",
		open: false,
	});
	const [selectedTags, setSelectedTags] = useState([]);
	const [formData, dispatch] = useReducer(formReducer, initialState);

	const dispatchData = useDispatch();

	const refreshState: any = useSelector(
		(state: RootState) => state.payload.reloadFetch
	);

	const showCommentForm = (
		eventId: string,
		commentId: string,
		commentContent: string
	) => {
		setEventId(eventId);
		setShowCommentModal(true);
		setCommentContent(commentContent);
		setCommentId(commentId);
	};

	const updateFormData = (field: keyof FormState, value: string) => {
		const newFormData = {
			...formData,
			[field]: value,
		};
		dispatch({ type: "SET_FIELD", field, value });
		validate(newFormData, field);
	};

	const validate = (newFormData, field) => {
		let errors: any = { ...validationErrors };
		let hasError = false;

		if (!newFormData[field].trim()) {
			errors = { ...validationErrors, [field]: `* ${field} is required.` };
		} else {
			errors[field] = null;
		}

		for (var key in newFormData) {
			if (!newFormData[key].trim() && key != "id") {
				hasError = true;
			}
		}

		hasError ? setIsDisabled(true) : setIsDisabled(false);
		setErrors(errors);
	};

	const submitAddUpdateForm = () => {
		const requestFormData = { ...formData, ...{ tags: selectedTags } };
		TagService.save(selectedTags).then((res) => {
			if (requestFormData.id != "") {
				EventService.update(requestFormData)
					.then((res) => {
						setLoading(false);
						setToaster({
							message: `${requestFormData.title} Successfully updated!`,
							status: "success",
							open: true,
						});
						dispatchData({
							type: "SET_FETCH_RELOAD_DATA",
							payload: !refreshState,
						});
					})
					.finally(() => {
						setShowAddModal(false);
					})
					.catch((err) => {
						setToaster({
							message: `Failed to update ${requestFormData.title}!`,
							status: "error",
							open: true,
						});
					});
			} else {
				EventService.save(requestFormData)
					.then((res) => {
						setToaster({
							message: `${requestFormData.title} Successfully saved!`,
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
							message: `Failed to save ${requestFormData.title}!`,
							status: "error",
							open: true,
						});
					})
					.finally(() => {
						setShowAddModal(false);
					});
			}
		});
	};

	return (
		<EventContext.Provider
			value={{
				showCommentModal,
				setShowCommentModal,
				setShowAddModal,
				submitAddUpdateForm,
				dispatch,
				setEventId,
				showCommentForm,
				setLoading,
				setToaster,
				setIsDisabled,
				setSelectedTags,
			}}>
			{showCommentModal && (
				<CommentForm
					eventId={eventId}
					content={commentContent}
					commentId={commentId}
					dispatchData={dispatchData}
					refreshState={refreshState}
				/>
			)}
			{showAddModal && (
				<AddUpdateForm
					validationErrors={validationErrors}
					updateFormData={updateFormData}
					formData={formData}
					isDisabled={isDisabled}
					setSelectedTags={setSelectedTags}
					selectedTags={selectedTags}
					loading={loading}
				/>
			)}

			{toasterData.open && (
				<Toaster toaster={toasterData} setToasterInfo={setToaster} />
			)}

			{children}
		</EventContext.Provider>
	);
};
