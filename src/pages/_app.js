import { useState, useEffect, useCallback } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import AuthProvider from '@/providers/auth-provider';
import Layout from '@/components/layout';
import { wrapper } from '@/redux/store';
import { fetchAuthUser } from '@/redux/slices/user';
import { togglePreloading } from '@/redux/slices/general';
import { TOKEN_COOKIE } from '@/services/constants';
import LocalStorage from '@/services/storage';
import '@/assets/scss/style.scss';
import 'react-toastify/dist/ReactToastify.css';

const storage = new LocalStorage();

export default function App({ Component, ...rest }) {
	const [loading, setLoading] = useState(true);

	const { store, props } = wrapper.useWrappedStore(rest);

	useEffect(() => {
		if (loading) {
			setLoading(false);
			if (storage.getItem(TOKEN_COOKIE)) {
				store.dispatch(fetchAuthUser());
			} else {
				store.dispatch(togglePreloading(false));
			}
		}
	}, [loading, store]);

	return (
		<Provider store={store}>
			<AuthProvider>
				<Layout>
					<Component {...props.pageProps} />
					<ToastContainer
						position="top-right"
						autoClose={8000}
						hideProgressBar={false}
						newestOnTop={false}
						draggable={false}
						pauseOnVisibilityChange
						closeOnClick
						pauseOnHover
					/>
				</Layout>
			</AuthProvider>
		</Provider>
	);
}
