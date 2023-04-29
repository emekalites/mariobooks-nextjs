import { createSlice } from '@reduxjs/toolkit';

export const generalSlice = createSlice({
	name: 'general',
	initialState: {
		blocking: false,
	},
	reducers: {
		block: (state, action) => {
			state.blocking = action.payload;
		},
	},
});

export const { block } = generalSlice.actions;

export default generalSlice.reducer;
