import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { generalReducer } from "./generalReducer";

export const rootReducer = combineReducers({
	user: userReducer,
	payload: generalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
