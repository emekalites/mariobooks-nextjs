import { createSlice } from '@reduxjs/toolkit';

export const generalSlice = createSlice({
	name: 'general',
	initialState: {
		preloading: true,
		blocking: false,
	},
	reducers: {
		togglePreloading: (state, action) => {
			state.preloading = action.payload;
		},
		block: (state, action) => {
			state.blocking = action.payload;
		},
	},
});

export const { togglePreloading, block } = generalSlice.actions;

export default generalSlice.reducer;
