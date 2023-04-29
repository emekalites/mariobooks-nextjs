import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '@/hooks/auth';
import { loginUser, logoutUser } from '../redux/slices/user';
import { ACCOUNT_COOKIE, TOKEN_COOKIE } from '@/services/constants';
import LocalStorage from '@/services/storage';
import toast from '@/services/toast';

const storage = new LocalStorage();

const AuthProvider = ({ children }) => {
	const user = useSelector(state => state.user.profile);

	const dispatch = useDispatch();

	const setTokens = data => {
		const user = data.user;
		dispatch(loginUser(user));
		storage.setItem(TOKEN_COOKIE, data.token);
	};

	const logout = callback => {
		dispatch(logoutUser());
		storage.removeItem(TOKEN_COOKIE);
		toast({ type: 'success', message: 'user logged out!' });
		callback();
	};

	return (
		<AuthContext.Provider value={{ user, login: setTokens, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
