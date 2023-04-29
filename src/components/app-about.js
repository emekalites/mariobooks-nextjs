import React from 'react';

const AppAbout = () => {
	return (
		<div id="about" className="welcome-area pt-100">
			<div className="container">
				<div className="welcome-content text-center">
					<h5>{process.env.NEXT_PUBLIC_APP_NAME}</h5>
					<h1>About the Author</h1>
					<p>The Author, John Doe, is writer.</p>
					<p>
						John is known to be a voracious reader, a prolific author, a
						brilliant communicator, entrepreneur as well as a Life-Coach. He
						writes proficiently in three categories namely: Christian
						Inspirational Books, Entrepreneurship for the youths and Kiddies
						Literature.
					</p>
					<p>
						However, he is passionate about the things of the Spirit and the
						Life of Interiority.This burning desire in him has birthed
						Life-Transforming books and exhortative articles.
					</p>
					<p>
						His exhilarating writings radiate such an unalloyed spirituality
						revealing the Riches of our Faith, the Life of Interiority and the
						Heart of Christ to humanity. His books helps to infuse and inculcate
						a deeper conversion in Christ as many lives have been positively
						transformed by his inspirational writings by the Grace of God.
					</p>
					<h1>Vision of Mariobooks Platform</h1>
					<p>Leading all souls to the Loving Heart of Jesus the Christ.</p>
					<h1>Mission Statement</h1>
					<p>
						Being a Leading Global Voice of Transformation through the dynamic
						instrumentality of the Pen!
					</p>
					<h1>Our Purpose</h1>
					<p>Preparing the People of God for their Thrones!</p>
				</div>
			</div>
		</div>
	);
};

export default AppAbout;
