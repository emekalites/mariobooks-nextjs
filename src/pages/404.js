import Link from 'next/link';

const Custom404 = () => {
	return (
		<>
			<div className="breadcrumb-area pt-35 pb-35 bg-gray-3">
				<div className="container">
					<div className="breadcrumb-content text-center">
						<ul>
							<li>
								<Link href="/">Home</Link>
							</li>
							<li className="active">404 Page</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="error-area pt-40 pb-100">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-7 col-lg-8 text-center">
							<div className="error">
								<h1>404</h1>
								<h2>OPPS! PAGE NOT BE FOUND</h2>
								<p>
									Sorry but the page you are looking for does not exist, have
									been removed, name changed or is temporarily unavailable.
								</p>
								<Link href="/" className="error-btn">
									Back to home
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Custom404;
