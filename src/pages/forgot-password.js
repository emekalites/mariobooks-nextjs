import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { block } from '@/redux/slices/general';
import { request } from '@/services/utilities';
import AppMessage from '@/components/app-message';
import { useAuth } from '@/hooks/auth';

const ForgotPassword = () => {
	const [infoMessage, setInfoMessage] = useState('');

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
		reset,
	} = useForm({ defaultValues: { email: '' } });

	const dispatch = useDispatch();

	const auth = useAuth();

	async function onSubmit(data) {
		try {
			clearErrors('root.serverError');
			dispatch(block(true));
			const config = { method: 'POST', body: { ...data } };
			await request('auth/forgot-password', config);
			dispatch(block(false));
			reset();
			setInfoMessage('check your email to reset your password!');
		} catch (e) {
			console.log(e);
			const message = e?.message || 'server error!';
			setError('root.serverError', { type: 'custom', message });
			dispatch(block(false));
		}
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
							<li className="active">Recover Password</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="login-register-area pt-20 pb-100">
				<div className="container">
					<div className="row">
						<div className="col-lg-7 col-md-12 ms-auto me-auto">
							<div className="login-register-wrapper">
								<div className="tab-content">
									<div id="lg1" className="tab-pane active">
										<div className="login-form-container">
											<div className="login-register-form">
												<form onSubmit={handleSubmit(onSubmit)}>
													{errors.root?.serverError?.type === 'custom' && (
														<AppMessage
															message={errors.root.serverError?.message || ''}
															type="error"
														/>
													)}
													{errors.root?.serverError?.type === 'custom' && (
														<AppMessage
															message={errors.root.serverError?.message || ''}
															type="info"
														/>
													)}
													{infoMessage !== '' && (
														<AppMessage message={infoMessage} type="info" />
													)}
													<div className="form-group mb-4">
														<label htmlFor="email">Email address</label>
														<input
															id="email"
															className={`form-control ${
																errors.email ? 'is-invalid' : ''
															}`}
															{...register('email', { required: true })}
															placeholder="Enter your email address"
															type="email"
														/>
														{errors.email && (
															<span className="help-block invalid-feedback">
																enter your email address
															</span>
														)}
													</div>
													<div className="button-box">
														<button type="submit">
															<span>Recover Password</span>
														</button>
													</div>
													<div className="button-box mt-4">
														<div className="text-center">
															<Link href="/login">
																Remembered your password? Login
															</Link>
														</div>
													</div>
												</form>
											</div>
										</div>
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

export default ForgotPassword;
