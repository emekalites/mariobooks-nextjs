import Image from 'next/image';

import support1 from '../assets/img/icon-img/support-1.png';
import support2 from '../assets/img/icon-img/support-2.png';
import support3 from '../assets/img/icon-img/support-3.png';

const AppInfo = () => {
	return (
		<div className="support-area pt-70">
			<div className="container">
				<div className="row">
					<div className="col-lg-4 col-md-4 col-sm-6">
						<div className="support-wrap-2 support-padding-2 support-shape-3 mb-30 text-center">
							<div className="support-content-2">
								<Image className="animated" src={support1} alt="" />
								<h5>Free Shipping</h5>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-4 col-sm-6">
						<div className="support-wrap-2 support-padding-2 support-shape-3 mb-30 text-center">
							<div className="support-content-2">
								<Image className="animated" src={support2} alt="" />
								<h5>Support 24/7</h5>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-4 col-sm-6">
						<div className="support-wrap-2 support-padding-2 support-shape-3 mb-30 text-center">
							<div className="support-content-2">
								<Image className="animated" src={support3} alt="" />
								<h5>Money Return</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AppInfo;
