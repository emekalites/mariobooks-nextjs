import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

import banner38 from '../assets/img/banner/banner-38.png';
import banner39 from '../assets/img/banner/banner-39.png';

const AppBanner = () => {
	return (
		<>
			<div className="slider-banner-area">
				<div className="container">
					<div className="row flex-row-reverse">
						<div className="col-lg-8 col-md-12">
							<div className="slider-area res-mrg-md-mb">
								<div
									className="slider-active-3 owl-carousel owl-dot-style"
									style={{ display: 'block' }}
								>
									<div className="single-slider-2 single-slider-bg-1 slider-height-18 d-flex align-items-center bg-img slider-overly-res">
										<div className="slider-content-7 slider-animated-1 ml-70">
											<h3 className="animated">New Arrivals</h3>
											<h1 className="animated">
												Book Shop <br />
												Find Your Book
											</h1>
											<div className="slider-btn-9 btn-hover">
												<Link className="animated" href="/#store">
													SHOP NOW
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-12">
							<div className="row">
								<div className="col-lg-12 col-md-6 col-sm-6">
									<div className="single-banner mb-30">
										<a>
											<Image src={banner38} alt="" priority={true} />
										</a>
									</div>
								</div>
								<div className="col-lg-12 col-md-6 col-sm-6">
									<div className="single-banner mb-30">
										<a>
											<Image src={banner39} alt="" priority={true} />
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AppBanner;
