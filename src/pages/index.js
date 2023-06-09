import Head from 'next/head';
import AppBanner from '@/components/app-banner';
import AppStore from '@/components/app-store';
import AppAbout from '@/components/app-about';
import AppInfo from '@/components/app-info';
import AppContact from '@/components/app-contact';
import { request } from '@/services/utilities';

const Home = ({ data }) => {
	return (
		<>
			<Head>
				<title>{`Home - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
			</Head>
			<AppBanner />
			<AppStore categories={data} category="entrepreneurship" />
			<AppAbout />
			<AppInfo />
			<AppContact />
		</>
	);
};

export async function getServerSideProps() {
	const rs = await request('categories');
	return { props: { data: rs.result } };
}

export default Home;
