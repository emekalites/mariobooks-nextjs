import { useSelector } from 'react-redux';
import Head from 'next/head';
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import SvgAnimate from '@/components/svg-animate';

const Layout = ({ children }) => {
	const blocking = useSelector((state) => state.general.blocking);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<AppHeader />
			{children}
			<AppFooter />
			<div className="modal-backdrop fade"></div>
			{blocking && (
				<div className="vl-overlay vl-active vl-full-page">
					<div
						className="vl-background"
						style={{ background: 'rgb(27, 32, 36)', opacity: 0.4 }}
					></div>
					<div className="vl-icon">
						<SvgAnimate></SvgAnimate>
					</div>
				</div>
			)}
		</>
	);
};

export default Layout;
