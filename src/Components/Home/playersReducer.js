export const INITIAL_STATE = {
	loading: false,
	error: false,
	players: [],
};

export const playersReducer = (state, action) => {
	switch (action.type) {
		case "API_START":
			return {
				loading: true,
				error: false,
				players: [],
			};
		case "API_SUCCESS":
			return {
				loading: false,
				error: false,
				players: action.payload,
			};
		case "API_ERROR":
			return {
				loading: false,
				error: true,
				players: [],
			};
		default:
			return state;
	}
};
