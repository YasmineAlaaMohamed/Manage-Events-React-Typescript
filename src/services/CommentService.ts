import { axiosClient } from "./axiosInstance";

const client = axiosClient(true);

export const CommentService = {
	save: async (eventId, content) => {
		try {
			return await client.post(`/comments`, {
				content: content,
				eventId: eventId,
			});
		} catch (error) {
			throw error;
		}
	},

	delete: async (id) => {
		try {
			return await client.delete(`/comments/${id}`);
		} catch (error) {
			throw error;
		}
	},

	update: async (eventId, commentId, content) => {
		try {
			return await client.put(`/comments/${commentId}`, {
				content: content,
				eventId: eventId,
			});
		} catch (error) {
			throw error;
		}
	},
};
