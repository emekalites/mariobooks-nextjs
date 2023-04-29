import Link from 'next/link';
import Image from 'next/image';
import SocialApps from '@/components/social-apps';
import logo from '../assets/img/logo/logo.png';

const AppFooter = () => {
	return (
		<footer className="footer-area footer-white">
			<div className="footer-top pt-80 pb-60 text-center bg-gray-2">
				<div className="container">
					<div className="footer-logo">
						<Link href="/">
							<Image alt="" src={logo} />
						</Link>
					</div>
					<p>Preparing the People of God for their Thrones!</p>
					<div className="footer-social">
						<SocialApps />
					</div>
				</div>
			</div>
			<div className="footer-bottom text-center">
				<div className="container">
					<div className="copyright-2 copyright-gray">
						<p>
							© 2023
							<Link href="/"> {process.env.NEXT_PUBLIC_APP_NAME}.</Link> All
							Rights Reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default AppFooter;
