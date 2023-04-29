import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
		total: 0,
	},
	reducers: {
		add: (state, action) => {
			const _items = [action.payload, ...state.items];

			state.items = _items;
			state.total = _items.reduce((total, { amount }) => total + amount, 0);
		},
		remove: (state, action) => {
			const _items = [...state.items.filter((c) => c.id !== action.payload.id)];

			state.items = _items;
			state.total = _items.reduce((total, { amount }) => total + amount, 0);
		},
		clear: (state, action) => {
			state.items = [];
			state.total = 0;
		},
	},
});

export const { add, remove, clear } = cartSlice.actions;

export default cartSlice.reducer;
