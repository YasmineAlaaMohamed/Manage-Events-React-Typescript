import { axiosClient } from "./axiosInstance";

const client = axiosClient(true);

export const CommentService = {
	save: async (eventId, content) => {
		return await client.post(`/comments`, {
			content: content,
			eventId: eventId,
		});
	},

	delete: async (id) => {
		return await client.delete(`/comments/${id}`);
	},

	update: async (eventId, commentId, content) => {
		return await client.put(`/comments/${commentId}`, {
			content: content,
			eventId: eventId,
		});
	},
};
