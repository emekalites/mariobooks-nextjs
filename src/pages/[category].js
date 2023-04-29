import Head from 'next/head';
import { useRouter } from 'next/router';
import AppBanner from '@/components/app-banner';
import AppStore from '@/components/app-store';
import AppAbout from '@/components/app-about';
import AppInfo from '@/components/app-info';
import AppContact from '@/components/app-contact';
import { request } from '@/services/utilities';

const Category = ({ data }) => {
	const router = useRouter();
	const category = router.query.category || 'entrepreneurship';

	return (
		<>
			<Head>
				<title>{`${category} - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
			</Head>
			<AppBanner />
			<AppStore categories={data} category={category} />
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

export default Category;
