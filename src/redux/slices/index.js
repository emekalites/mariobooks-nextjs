import generalReducer from './general';
import userReducer from './user';
import cartReducer from './cart';

const reducers = {
	general: generalReducer,
	user: userReducer,
	cart: cartReducer,
};

export default reducers;
