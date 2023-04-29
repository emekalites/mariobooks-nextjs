import { createSlice } from '@reduxjs/toolkit';
import { request } from '@/services/utilities';
import { togglePreloading } from '@/redux/slices/general';

export const fetchAuthUser = () => async dispatch => {
	try {
		const rs = await request('auth/user');
		dispatch(loginUser(rs.result.user));
		dispatch(togglePreloading(false));
	} catch (e) {
		dispatch(logoutUser());
		dispatch(togglePreloading(false));
	}
};

const initialState = { profile: null };

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginUser: (state, action) => {
			state.profile = action.payload;
		},
		setUser: (state, action) => {
			state.profile = action.payload;
		},
		logoutUser: () => {
			return initialState;
		},
	},
});

export const { loginUser, setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
