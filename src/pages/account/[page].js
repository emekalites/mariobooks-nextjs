import Link from 'next/link';
import { useRouter } from 'next/router';
import Settings from '@/components/settings';
import Purchases from '@/components/purchases';
import Downloads from '@/components/downloads';

const Account = () => {
	const router = useRouter();

	const { page } = router.query;

	if (!['settings', 'purchases', 'downloads'].includes(page)) {
		router.push('/404');
	}

	return (
		<>
			<div className="breadcrumb-area pt-35 pb-35 bg-gray-3">
				<div className="container">
					<div className="breadcrumb-content text-center">
						<ul>
							<li>
								<Link href="/">Home</Link>
							</li>
							<li className="active">Account</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="description-review-area pb-90 pt-50">
				<div className="container">
					<div className="description-review-wrapper">
						<div className="description-review-topbar nav">
							<Link
								className={page === 'settings' ? 'active' : ''}
								href="/account/settings"
							>
								Account Settings
							</Link>
							<Link
								className={page === 'purchases' ? 'active' : ''}
								href="/account/purchases"
							>
								Purchases
							</Link>
							<Link
								className={page === 'downloads' ? 'active' : ''}
								href="/account/downloads"
							>
								Downloads
							</Link>
						</div>
						<div className="tab-content description-review-bottom">
							<div id="des-details2" className="tab-pane active">
								{page === 'settings' && <Settings />}
								{page === 'purchases' && <Purchases />}
								{page === 'downloads' && <Downloads />}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Account;
