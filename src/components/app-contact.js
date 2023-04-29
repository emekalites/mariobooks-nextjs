import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { block } from '@/redux/slices/general';
import { request } from '@/services/utilities';
import SocialApps from '@/components/social-apps';

const AppContact = () => {
	const [inputs, setInputs] = useState({});

	const [sent, setSent] = useState('');
	const [error, setError] = useState('');

	const dispatch = useDispatch();

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();

			setError('');
			setSent('');

			if ((inputs?.name || '') === '') {
				setError('enter your name');
				return;
			}

			if ((inputs?.email || '') === '') {
				setError('enter email address');
				return;
			}

			if ((inputs?.message || '') === '') {
				setError('enter your message');
				return;
			}

			dispatch(block(true));
			const config = { method: 'POST', body: { ...inputs } };
			const rs = await request('support', config);
			dispatch(block(false));
			if (rs.result && rs.result.email) {
				setInputs({});
				setSent('message sent, we shall reply as soon as possible.');
			} else {
				setError('error, could not send message');
			}
		} catch (e) {
			console.log(e);
			setError('error, could not send message');
			dispatch(block(false));
		}
	};

	return (
		<div id="contact" className="contact-area pt-100 pb-100">
			<div className="container">
				<div className="custom-row-2">
					<div className="col-lg-4 col-md-5">
						<div className="contact-info-wrap">
							<div className="single-contact-info">
								<div className="contact-icon">
									<i className="fa fa-whatsapp"></i>
								</div>
								<div className="contact-info-dec">
									<p>
										+2349000000000
										<br />
										(Whatsapp Only)
									</p>
								</div>
							</div>
							<div className="single-contact-info">
								<div className="contact-icon">
									<i className="fa fa-globe"></i>
								</div>
								<div className="contact-info-dec">
									<p>
										<a href="mailto:john@doe.com">john@doe.com</a>
									</p>
									<p>
										<a href="mailto:mariobooks2022@gmail.com">
											mariobooks@gmail.com
										</a>
									</p>
								</div>
							</div>
							<div className="contact-social text-center">
								<h3>Follow Us</h3>
								<SocialApps />
							</div>
						</div>
					</div>
					<div className="col-lg-8 col-md-7">
						<div className="contact-form">
							<div className="contact-title mb-30">
								<h2>Get In Touch</h2>
								<p>
									For more enquiries, production and distribution of books (hard
									copy), please feel free to contact the Author directly via the
									details provided below:
								</p>
							</div>
							<form className="contact-form-style" onSubmit={handleSubmit}>
								{sent !== '' && (
									<div className="alert alert-success">{sent}</div>
								)}
								{error !== '' && (
									<div className="alert alert-danger">{error}</div>
								)}
								<div className="row">
									<div className="col-lg-6">
										<input
											name="name"
											placeholder="Name*"
											type="text"
											value={inputs.name || ''}
											onChange={handleChange}
										/>
									</div>
									<div className="col-lg-6">
										<input
											name="email"
											placeholder="Email*"
											type="email"
											value={inputs.email || ''}
											onChange={handleChange}
										/>
									</div>
									<div className="col-lg-12">
										<textarea
											name="message"
											placeholder="Your Message*"
											value={inputs.message || ''}
											onChange={handleChange}
										></textarea>
										<button className="submit" type="submit">
											SEND
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AppContact;
