import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import AuthProvider from '@/providers/auth-provider';
import Layout from '@/components/layout';
import { wrapper } from '@/redux/store';
import '@/assets/scss/style.scss';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, ...rest }) {
	const { store, props } = wrapper.useWrappedStore(rest);

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
