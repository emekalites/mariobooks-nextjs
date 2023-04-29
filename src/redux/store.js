import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { createWrapper } from 'next-redux-wrapper';

import rootReducer from './slices';

let middlewares = [];

if (process.env.NODE_ENV !== 'production') {
	const logger = createLogger({ collapsed: true });

	middlewares = [...middlewares, logger];
}

const makeStore = (context) =>
	configureStore({
		devTools: process.env.NODE_ENV !== 'production',
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(middlewares),
		reducer: rootReducer,
	});

export const wrapper = createWrapper(makeStore);
