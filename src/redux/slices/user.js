import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		profile: null,
	},
	reducers: {
		loginUser: (state, action) => {
			state.profile = action.payload;
		},
		logoutUser: () => {
			return initialState;
		},
	},
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
